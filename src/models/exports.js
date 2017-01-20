/* RIA/egzamen
 *
 * /src/models/exports.js - Model for exports
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 19/01/2017
*/

import { db } from "../core/mongodb";

export default function() {
    return db.collection( "exports" );
}
