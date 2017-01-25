/* RIA/egzamen
 *
 * /src/controllers/exports/list.js - Controller for exports list
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 21/01/2017
*/

import getExports from "../../models/exports.js";
import { send, error } from "../../core/utils/api.js";
import distance from "jeyo-distans";
import checkPosition from "../../core/utils/position.js";

const ARC_KM = 0.009259, // 1 décimale de lat/lng vaut X km.
    DEFAULT_RADIUS = 5,
    MAX_RADIUS = 20;

export default function( oRequest, oResponse ) {
    let oCurrentPosition = checkPosition( +oRequest.query.latitude, +oRequest.query.longitude ),
        iSearchRadius = +oRequest.query.radius;

    // Checking if the position is valid
    if ( !oCurrentPosition ) {
        return error( oRequest, oResponse, "Invalid Position !", 400 );
    }

    // check & cap radius
    isNaN( iSearchRadius ) && ( iSearchRadius = DEFAULT_RADIUS );
    ( iSearchRadius < DEFAULT_RADIUS ) && ( iSearchRadius = DEFAULT_RADIUS );
    ( iSearchRadius > MAX_RADIUS ) && ( iSearchRadius = MAX_RADIUS );

    // convertion
    iSearchRadius *= ARC_KM;

    getExports()
        // Find objects within the good radius
        .find( {
            "latitude": {
                "$gt": oCurrentPosition.latitude - iSearchRadius,
                "$lt": oCurrentPosition.latitude + iSearchRadius,
            },
            "longitude": {
                "$gt": oCurrentPosition.longitude - iSearchRadius,
                "$lt": oCurrentPosition.longitude + iSearchRadius,
            },
        } )
        // store the objects
        .toArray()
        // Get data we want
        .then( ( aExports = [] ) => {
            let aCleanExports,
                bOpenState = false,
                iCurrentDay = new Date().getDay(),
                iCurrentHour = new Date().getHours() + ( new Date().getMinutes() / 60 );

            aCleanExports = aExports.map( ( { _id, name, slug, latitude, longitude, address, hours } ) => {
                // Checking if it is open or not
                if ( iCurrentHour >= hours[ iCurrentDay ][ 0 ] && iCurrentHour <= hours[ iCurrentDay ][ 1 ] ) {
                    bOpenState = true;
                }

                return {
                    "id": _id,
                    "openState": bOpenState,
                    "distance": distance( oCurrentPosition, { latitude, longitude } ) * 1000,
                    name, slug, latitude, longitude, address,
                };
            } );

            // Sorting objects by distance
            aCleanExports.sort( ( oExportOne, oExportTwo ) => oExportOne.distance - oExportTwo.distance );
            send( oRequest, oResponse, aCleanExports );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );
}
