/* RIA/egzamen
 *
 * /static/modules/components/exports/list.js - Exports list Vue component
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 24/01/2017
*/

import Vue from "vue";
import reqwest from "reqwest";
import getLocation from "../../utils/location-manager.js";

let oExportsList = Vue.component( "exports-list", {
    "data": function() {
        return {
            "loaded": false,
            "exports": [],
            "error": null,
        };
    },
    "template": `
        <div class="exports-list">
            <p class="slogan">Un Quick tout près?</p>
            <div class="loading" v-if="!loaded">
                <p>Chargement de la liste…</p>

            </div>
            <div class="error" v-if="loaded && error">
                <p>
                    <strong>Error:</strong> {{ error }}
                </p>
            </div>
            <ul class="list">
                <li class="listElt" v-for="elt in exports">
                    <h3>{{ elt.name }}</h3>
                    <p class="state">
                        <strong>Actuellement : {{ state }}</strong>
                        <span v-if="!elt.openState">fermé</span>
                        <span v-if="elt.openState">ouvet</span>
                    </p>
                    <section>
                        <h3>Adresse</h3>
                        <address>{{ elt.address }}</address>
                    </section>
                    <router-link :to="'/' + elt.id">
                        Plus d'info
                    </router-link>
                </li>
            </ul>
        </div>
    `,
    mounted() {
        // Calling function below
        this.updateExports();
    },
    "methods": {
        // defining function
        updateExports() {
            // Get current position
            return getLocation()
                .then( ( { coords } ) => {
                    // Get objects at position
                    return reqwest( {
                        "url": "/exports",
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
                    this.exports = oExport;
                } )
                .catch( this.showError );
        },
        showError( { message } ) {
            this.loaded = true;
            this.error = message;
        },
    },
} );

export default oExportsList;
