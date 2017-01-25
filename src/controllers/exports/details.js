/* RIA/egzamen
 *
 * /src/controllers/banks/details.js - Controllers for exports details
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 20/01/2017
*/

import getExports from "../../models/exports.js";
import { send, error } from "../../core/utils/api";
import { ObjectID } from "mongodb";
import distance from "jeyo-distans";
import checkPosition from "../../core/utils/position.js";

export default function( oRequest, oResponse ) {

    let sExportID = ( oRequest.params.id || "" ).trim(),
        oCurrentPosition;

    if ( !sExportID ) {
        error( oRequest, oResponse, "Invalid ID !", 400 );
    }

    oCurrentPosition = checkPosition( +oRequest.query.latitude, +oRequest.query.longitude );

    getExports()
        .findOne( {
            "_id": new ObjectID( sExportID ),
            "deleted_at": null,
        } )
        .then( ( oExport ) => {

            if ( !oExport ) {
                return error( oRequest, oResponse, "Unknown Export", 404 );
            }

            let { _id, name, slug, latitude, longitude, address, hours } = oExport,
                oCleanExport,
                bOpenState = false,
                iCurrentDay = new Date().getDay(),
                iCurrentHour = new Date().getHours() + ( new Date().getMinutes() / 60 );

            if ( iCurrentHour >= hours[ iCurrentDay ][ 0 ] && iCurrentHour <= hours[ iCurrentDay ][ 1 ] ) {
                bOpenState = true;
            }

            oCleanExport = {
                "id": _id,
                "openState": bOpenState,
                name, slug, latitude, longitude, address, hours,
            };

            if ( oCurrentPosition ) {
                oCleanExport.distance = distance( oCurrentPosition, oCleanExport ) * 1000;
            }

            send( oRequest, oResponse, oCleanExport );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );
}
