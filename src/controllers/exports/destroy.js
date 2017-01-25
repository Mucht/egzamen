/* RIA/egzamen
 *
 * /src/controllers/exports/destroy.js - Delet export controller
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 21/01/2017
*/

import { ObjectID } from "mongodb";
import { send, error } from "../../core/utils/api.js";
import getExports from "../../models/exports.js";

export default function( oRequest, oResponse ) {

    let oExportID;

    // Checking if the ID is valid
    try {
        oExportID = new ObjectID( oRequest.params.id );
    } catch ( oError ) {
        return error( oRequest, oResponse, new Error( "Invalid ID!" ), 400 );
    }

    // If so => process the deletion
    getExports()
        .deleteOne( {
            "_id": oExportID,
        } )
        .then( ( { deletedCount } ) => {
            if ( deletedCount === 1 ) {
                return send( oRequest, oResponse, null, 204 );
            }

            return error( oRequest, oResponse, "Unknown deletion error", 500 );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );

}
