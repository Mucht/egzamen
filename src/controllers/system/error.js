/* RIA/egzamen
 *
 * /src/controllers/system/error.js - Controller for system error
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 20/01/2017
*/

export default function( oRequest, oResponse ) {
    oResponse.status( 500 ).json( {
        "url": oRequest.url,
        "timestamp": Date.now(),
        "data": false,
        "error": {
            "message": "There's an error!",
        },
    } );
}
