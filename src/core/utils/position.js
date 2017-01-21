/* RIA/egzamen
 *
 * /src/core/utils/position.js - Position checker utility
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 21/01/2017
*/

export default function( iLatitude, iLongitude ) {
    if ( isNaN( iLatitude ) || isNaN( iLongitude ) ) {
        return false;
    }

    if ( iLatitude < -90 || iLatitude > 90 ) {
        return false;
    }

    if ( iLongitude < -180 || iLongitude > 180 ) {
        return false;
    }

    return {
        "latitude": iLatitude,
        "longitude": iLongitude,
    };
}
