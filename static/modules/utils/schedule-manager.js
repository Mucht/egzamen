/* RIA/egzamen
 *
 * /static/modules/utils/time-manager.js - Time manager
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 24/01/2017
*/

export default function( aData ) {
    let aDataSplited = [],
        iDay,
        iHour,
        sFormated;

    aData.forEach( ( aElt, i ) => {
        iDay = i;
        aElt.forEach( ( iElt, j ) => {
            iHour = j;
            aDataSplited = iElt.toString().split( "." );

            if ( aDataSplited.length > 2 || aDataSplited.length === null ) {
                sFormated = "Wrong hour Format !"
                
                return sFormated;
            }

            if ( aDataSplited.length === 2 ) {
                aDataSplited[ 1 ] *= 6;
                sFormated = aDataSplited[ 0 ] + "h" + aDataSplited[ 1 ]
            } else {
                sFormated = aDataSplited[ 0 ] + "h00";
            }
            aData[ iDay ][ iHour ] = sFormated;
        } );
    } );
}
