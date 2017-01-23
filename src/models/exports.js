/* RIA/egzamen
 *
 * /src/models/exports.js - Model for exports
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 19/01/2017
*/

import Promise from "bluebird";
import { db } from "../core/mongodb";
import { ObjectID } from "mongodb";

let fCheckExport;

fCheckExport = function( sExportID ) {
    let oExportID;

    if ( !sExportID ) {
        return Promise.resolve( false );
    }

    try {
        oExportID = new ObjectID( sExportID );
    } catch ( oError ) {
        return Promise.reject( new Error( "Invalid Export ID !" ) );
    }

    return db.collection( "exports" )
        .findOne( {
            "_id": oExportID,
        } )
        .then( ( oExport ) => {
            if ( oExport ) {
                return Promise.resolve( true );
            }

            return Promise.reject( new Error( "Unknown Export !" ) );
        } );
};

export default function() {
    return db.collection( "exports" );
}

export {
    fCheckExport as checkExport,
};
