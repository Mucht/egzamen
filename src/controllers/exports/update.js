/* RIA/egzamen
 *
 * /src/controllers/exports/update.js - Controller for export update
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 21/01/2017
*/

import { ObjectID } from "mongodb";
import getExport, { checkExport } from "../../models/exports.js";
import { send, error } from "../../core/utils/api.js";
import distance from "jeyo-distans";
import checkPosition from "../../core/utils/position.js";

const MAX_MOVE_DISTANCE = 1;

export default function( oRequest, oResponse ) {
    // 1. Get values
    const POST = oRequest.body;

    let oExportID,
        sAddress = ( POST.address || "" ).trim(),
        iLatitude = POST.latitude,
        iLongitude = POST.longitude,
        oPosition,
        aModifications = [],
        aHours = POST.hours,
        sName = ( POST.name || "" ).trim(),
        sSlug = ( POST.name || "" ).trim()
            .replace( " ", "-" )
            .toLowerCase();
    // Checking if the ID is valid
    try {
        oExportID = new ObjectID( oRequest.params.id );
    } catch ( oError ) {
        return error( oRequest, oResponse, new Error( "invalid ID!" ), 400 );
    }

    // 2. Check if export exists
    getExport()
        .findOne( {
            "_id": oExportID,
        } )
        .then( ( oExport ) => {
            if ( !oExport ) {
                return error( oRequest, oResponse, new Error( "Export not found" ), 404 );
            }

        // 3. Check values
            // 3a. check position
            if ( iLatitude != null && iLongitude != null ) {
                oPosition = checkPosition( +iLatitude, +iLongitude );

                if ( !oPosition ) {
                    return error( oRequest, oResponse, new Error( "Invalid position" ), 400 );
                }
                // if position different than old position, check move distance
                if ( oExport.latitude !== oPosition.latitude || oExport.longitude !== oPosition.longitude ) {
                    if ( distance( oPosition, oExport ) > MAX_MOVE_DISTANCE ) {
                        return error( oRequest, oResponse, new Error( "Displacement is too big" ), 400 );
                    }

                    oExport.latitude = oPosition.latitude;
                    oExport.longitude = oPosition.longitude;
                    aModifications.push( "latitude", "longitude" );
                }
            }
            // 3b. Check address
            if ( sAddress ) {
                oExport.address = sAddress;
                aModifications.push( "address" );

            }

            // 3c. check name
            if ( sName ) {
                oExport.name = sName;
                oExport.slug = sSlug;
                aModifications.push( "name", "slug" );
            }

            // 3c. check hours
            if ( aHours ) {
                oExport.hours = aHours;
                aModifications.push( "hours" );
            }

            // 4. Apply changes
            return checkExport( oExportID )
                .then( () => {

                    let oModificationsToApply = {};

                    if ( aModifications.length === 0 ) {
                        return error( oRequest, oResponse, new Error( "No changes" ), 400 );
                    }

                    aModifications.forEach( ( sPropertyName ) => {
                        oModificationsToApply[ sPropertyName ] = oExport[ sPropertyName ];
                    } );

                    oModificationsToApply.updated_at = new Date();

                    return getExport()
                        .updateOne( {
                            "_id": oExport._id,
                        }, {
                            "$set": oModificationsToApply,
                        } )
                        .then( ( { matchedCount, modifiedCount } ) => {
                            if ( matchedCount !== 1 || modifiedCount !== 1 ) {
                                return error( oRequest, oResponse, new Error( "Unknown save error" ), 500 );
                            }

                            return send( oRequest, oResponse, null, 204 );
                        } );
                } );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );
}
