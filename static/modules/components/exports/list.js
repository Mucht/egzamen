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
            .then( () => {
                // update local data - vue refresh the DOM
                this.loaded = true;
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
