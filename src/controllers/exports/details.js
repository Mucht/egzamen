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

export default function( oRequest, oResponse ) {

    let sExportID = ( oRequest.params.id || "" ).trim();

    if ( !sExportID ) {
        error( oRequest, oResponse, "Invalid ID !", 400 );
    }

    getExports()
        .findOne( {
            "_id": new ObjectID( sExportID ),
            "deleted_at": null,
        } )
        .then( ( { _id, name, latitude, longitude, address, hours } ) => {
            let oCleanExport;

            if ( !_id ) {
                return error( oRequest, oResponse, "Unknown Export", 404 );
            }

            oCleanExport = {
                "id": _id,
                name, latitude, longitude, address, hours,
            };

            send( oRequest, oResponse, oCleanExport );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );
}
