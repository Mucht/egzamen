/* RIA/egzamen
 *
 * /src/controllers/system/echo.js - Controller for system echo
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 20/01/2017
*/

export default function( oRequest, oResponse ) {
    let sEcho = oRequest.query.echo || "Hello world !";

    oResponse.send( {
        "url": oRequest.url,
        "timestamp": Date.now(),
        "data": sEcho,
        "error": false,
    } );
}
