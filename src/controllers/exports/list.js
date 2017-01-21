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
        .find( {
            "latitude": {
                "$gt": oCurrentPosition.latitude - iSearchRadius,
                "$lt": oCurrentPosition.latitude + iSearchRadius,
            },
            "longitude": {
                "$gt": oCurrentPosition.longitude - iSearchRadius,
                "$lt": oCurrentPosition.longitude + iSearchRadius,
            },
            "deleted_at": null,
        } )
        .toArray()
        .then( ( aExports = [] ) => {
            let aCleanExports;

            aCleanExports = aExports.map( ( { name, slug, latitude, longitude, address } ) => ( {
                name, slug, address, latitude, longitude,
            } ) );

            // sort by distance
            aCleanExports.sort( ( oExportOne, oExportTwo ) => oExportOne.distance - oExportTwo.distance );
            send( oRequest, oResponse, aCleanExports );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );
}
