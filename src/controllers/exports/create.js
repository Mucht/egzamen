/* RIA/egzamen
 *
 * /src/controllers/exports/create.js - Create export controllers
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 21/01/2017
*/

import getExports from "../../models/exports.js";
import { send, error } from "../../core/utils/api.js";
import checkPosition from "../../core/utils/position.js";

export default function( oRequest, oResponse ) {

    const POST = oRequest.body;

    // get data form POST
    let iLatitude = +POST.latitude,
        iLongitude = +POST.longitude,
        sAddress = ( POST.address || "" ).trim(),
        sName = ( POST.name || "" ).trim(),
        oPosition = checkPosition( iLatitude, iLongitude ),
        oExport = {},
        aHours = POST.hours,
        sSlug = ( POST.name || "" ).trim()
            .replace( " ", "-" )
            .toLowerCase();

    // Checking if position is valid
    if ( !oPosition ) {
        return error( oRequest, oResponse, "Invalid position", 400 );
    }

    // If so => store data
    oExport = {
        "latitude": oPosition.latitude,
        "longitude": oPosition.longitude,
        "created_at": new Date(),
        "updated_at": new Date(),
    };

    sName && ( oExport.name = sName );
    sSlug && ( oExport.slug = sSlug );
    sAddress && ( oExport.address = sAddress );
    aHours && ( oExport.hours = aHours );

    // Create the new one
    getExports()
        .insertOne( oExport )
        .then( () => {
            send( oRequest, oResponse, {
                "id": oExport._id,
                "name": oExport.name || null,
                "slug": oExport.slug || null,
                "address": oExport.address || null,
                "latitude": oExport.latitude,
                "longitude": oExport.longitude,
                "hours": oExport.hours,
            }, 201 );
        } )
        .catch( ( oError ) => error( oRequest, oResponse, oError ) );

}
