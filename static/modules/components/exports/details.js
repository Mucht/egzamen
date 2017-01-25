/* RIA/egzamen
 *
 * /static/modules/components/export/details.js - Terminal details vue components
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 23/01/2017
*/

import Vue from "vue";
import reqwest from "reqwest";
import getLocation from "../../utils/location-manager.js";
import getReadableSchedule from "../../utils/schedule-manager.js";

let oExportDetails = Vue.component( "export-details", {
    "data": function() {
        return {
            "loaded": false,
            "export": {},
            "error": null,
        };
    },
    "template": `
        <div class="export-details">
            <p class="slogan">Fiche détaillée</p>
            <router-link to="/">&lsaquo; retour</router-link>
            <div class="loading" v-if="!loaded">
                <p>Chargement de la fiche…</p>
            </div>
            <div class="error" v-if="loaded && error">
                <p>
                    <strong>Error:</strong> {{ error }}
                </p>
            </div>
            <div v-if="loaded">
                <div class="header">
                    <h2 class="title">{{ resto.name }}</h2>
                    <strong>Actuellement : </strong>
                    <span v-if="!resto.openState">fermé</span>
                    <span v-if="resto.openState">ouvert</span>
                </div>
                <section class="address">
                    <h3>Adresse</h3>
                    <address>{{ resto.address }}</address>
                </section>
                <section class="coords">
                    <h3>Distance</h3>
                    <p>{{ resto.distance }}m</p>
                </section>
                <section class="schedule">
                    <h3>Horaire</h3>
                    <table>
                        <tbody>
                            <tr>
                                <th>Jour</th>
                                <th>Ouverture</th>
                                <th>Fermeture</th>
                            </tr>
                            <tr>
                                <td>Lundi</td>
                                <td>{{ resto.hours[ 0 ][ 0 ] }}</td>
                                <td>{{ resto.hours[ 0 ][ 1 ] }}</td>
                            </tr>
                            <tr>
                                <td>Mardi</td>
                                <td>{{ resto.hours[ 1 ][ 0 ] }}</td>
                                <td>{{ resto.hours[ 1 ][ 1 ] }}</td>
                            </tr>
                            <tr>
                                <td>Mercredi</td>
                                <td>{{ resto.hours[ 2 ][ 0 ] }}</td>
                                <td>{{ resto.hours[ 2 ][ 1 ] }}</td>
                            </tr>
                            <tr>
                                <td>Jeudi</td>
                                <td>{{ resto.hours[ 3 ][ 0 ] }}</td>
                                <td>{{ resto.hours[ 3 ][ 1 ] }}</td>
                            </tr>
                            <tr>
                                <td>Vendredi</td>
                                <td>{{ resto.hours[ 4 ][ 0 ] }}</td>
                                <td>{{ resto.hours[ 4 ][ 1 ] }}</td>
                            </tr>
                            <tr>
                                <td>Samedi</td>
                                <td>{{ resto.hours[ 5 ][ 0 ] }}</td>
                                <td>{{ resto.hours[ 5 ][ 1 ] }}</td>
                            </tr>
                            <tr>
                                <td>Dimanche</td>
                                <td>{{ resto.hours[ 6 ][ 0 ] }}</td>
                                <td>{{ resto.hours[ 6 ][ 1 ] }}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    `,
    mounted() {
        // Call the function below
        this.fetchInfos( this.$route.params.id );
    },
    "methods": {
        // Define the function to get data we want
        fetchInfos( sExportID ) {
            // get current possition
            return getLocation()
                .then( ( { coords } ) => {
                    // set route info & position from navigator
                    return reqwest( {
                        "url": `/exports/${ sExportID }`,
                        "method": "get",
                        "data": {
                            "latitude": coords.latitude,
                            "longitude": coords.longitude,
                        },
                    } );
                } )
                .then( ( oResponse ) => {
                    // update local data - vue refresh the DOM
                    let oExport = oResponse.data;

                    this.loaded = true;
                    this.resto = oExport;
                    // Formating the hours table to be readable
                    getReadableSchedule( this.resto.hours );
                } )
                .catch( this.showError );
        },
        showError( { message } ) {
            this.loaded = true;
            this.error = message;
        },
    },
} );

export default oExportDetails;
