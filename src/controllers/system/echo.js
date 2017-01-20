/* RIA/egzamen
 *
 * /src/controllers/system/echo.js - Controller for system echo
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 20/01/2017
*/

import { send } from "../../core/utils/api.js";

export default function( oRequest, oResponse ) {
    let sEcho = oRequest.query.echo || "Hello world !";

    send( oRequest, oResponse, sEcho );
}
