/* RIA/egzamen
 *
 * /static/modules/utils/time-manager.js - Time manager
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 24/01/2017
*/

// exported function. Formating row data into readable schedule.
export default function( aData ) {
    let aDataSplited = [],
        iDay,
        iHour,
        sFormated;

    aData.forEach( ( aDay, i ) => {
        iDay = i;
        aDay.forEach( ( iRow, j ) => {
            iHour = j;
            // Splite the row data at the "." to separate hours from minutes
            aDataSplited = iRow.toString().split( "." );

            // Cheking if ther is 2 digits
            if ( aDataSplited.length > 2 || aDataSplited.length === null ) {
                sFormated = "Wrong hour Format !";

                return sFormated;
            }

            // If so => Formating row data into readable data
            if ( aDataSplited.length === 2 ) {
                aDataSplited[ 1 ] *= 6;
                sFormated = aDataSplited[ 0 ] + "h" + aDataSplited[ 1 ]
            } else {
                sFormated = aDataSplited[ 0 ] + "h00";
            }
            // Store formated data
            aData[ iDay ][ iHour ] = sFormated;
        } );
    } );
}
