/* RIA/egzamen
 *
 * /src/controllers/system/ping.js - Controller for system pushing
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 20/01/2017
*/

import { send } from "../../core/utils/api.js";

export default function( oRequest, oResponse ) {
    send( oRequest, oResponse, true );
}
