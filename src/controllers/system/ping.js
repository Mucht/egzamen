/* RIA/egzamen
 *
 * /src/controllers/system/ping.js - Controller for system pushing
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 20/01/2017
*/

export default function( oRequest, oResponse ) {
    oResponse.json( {
        "url": oRequest.url,
        "timestamp": Date.now(),
        "data": true,
        "error": false,
    } );
}
