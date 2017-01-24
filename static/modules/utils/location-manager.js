/* RIA/egzamen
 *
 * /static/modules/utils/location-manager.js - Location manager
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 24/01/2017
*/

// The idea is to have a function that we can call and will returns the current user's location, with a Promise, and… fast. So the following code will keep the last position for 60 seconds, as cache.
import Promise from "bluebird";

const DEFAULT_OPTIONS = { "enableHightAccurency": true },
    TTL = 60*1000; // 1 min

let oLastPosition;

export default function( oOptions = {} ) {
    if ( oLastPosition && Date.now() - oLastPosition.timestamp < TTL ) {
        return Promise.resolve( oLastPosition );
    }

    return new Promise( function( fResolve, fReject ) {
        navigator.geolocation.getCurrentPosition( ( ( oPosition ) => fResolve( oLastPostion = oPosition ) ), fReject, Object.assign( {}, DEFAULT_OPTIONS, oOptions ) );
    } );
};
