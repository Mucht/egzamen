/* RIA/egzamen
 *
 * /static/modules/components/exports-list.js - Export-list.js
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 24/01/2017
*/

import Vue from "vue";
import reqwest from "reqwest";

const GEOLOCALISATION_OPTIONS = { "enableHightAccurency": true };

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
                    <strong>Error:</strong>
                    {{ error.message }}
                </p>
            </div>
            <ul v-if="loaded">
                <li v-for="elt in exports">
                    <router-link :to="'/' + elt.id">
                        <strong>{{ elt.name }}</strong>
                        <span>{{ elt.state }}</span>
                        <address>{{ elt.address }}</address>
                    </router-link>
                </li>
            </ul>
        </div>
    `,
    "methods": {
        updateExports() {
            // User position
            navigator.geolocation.getCurrentPosition( this.geoSuccess, this.showError, GEOLOCALISATION_OPTIONS );
        },
        geoSuccess( { coords } ) {
            console.log( "position: ", coords );
            // Export position
            reqwest( {
                "url": "/exports",
                "method": "get",
                "data": {
                    "latitude": coords.latitude,
                    "longitude": coords.longitude,
                },
                "success": this.ajaxSuccess,
                "error": this.showError,
            } );
        },
    },
    ajaxSuccess( oResponse ) {
        console.log( "response: ", oResponse );
        this.laoded = true;
        this.exports = oResponse.data;
    },
    showError( oError ) {
        this.laoded = true;
        this.error = oError;
    },
} );

export default oExportsList;
