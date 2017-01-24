/* RIA/egzamen
 *
 * /static/modules/utils/promise-location.js - Promised geolocation
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 24/01/2017
*/

// Allow us to use navigator.geolocation.getCurrentPosition with Promise
import Promise from "bluebird";

const DEFAULT_OPTIONS = { "enableHightAccuracy": true };

export default function( oOptions = {} ) {
    return new Promise( ( fResolve, fError ) => {
        navigator.geolocation.getCurrentPosition( fResolve, fError, Object.assign( {}, DEFAULT_OPTIONS, oOptions ) );
    } );
}
