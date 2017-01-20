/* RIA/egzamen
 *
 * /src/controllers/system/error.js - Controller for system error
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 20/01/2017
*/

import { error } from "../../core/utils/api.js";

export default function( oRequest, oResponse ) {
    error( oRequest, oResponse, { "message": "There is an error !" } );
}
