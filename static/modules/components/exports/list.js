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
            <div class="loading" v-if="!loaded">
                <p>loading…</p>

            </div>
            <div class="error" v-if="loaded && error">
                <p>
                    <strong>Error:</strong> {{ error }}
                </p>
            </div>
            <ul>
                <li v-for="elt in exports">
                    <router-link :to="'/' + elt.id">
                        <h3>{{ elt.name }}</h3>
                        <strong>Actuellement : {{ state }}</strong>
                        <span v-if="!elt.openState">fermé</span>
                        <span v-if="elt.openState">ouvet</span>
                        <address>{{ elt.address }}</address>
                    </router-link>
                </li>
            </ul>
        </div>
    `,
    mounted() {
        this.updateExports();
    },
    "methods": {
        updateExports() {
            // User position
            return getLocation()
                .then( ( { coords } ) => {
                    // Get export at position
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
