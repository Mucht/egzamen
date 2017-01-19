/* RIA/egzamen
 *
 * /src/models/exports.js - Model for exports
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 19/01/2017
*/

import { db } from "../core/mongodb";

let oExports = db.collection( "exports" );

export default oExports;
