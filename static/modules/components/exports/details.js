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

let oExportDetails = Vue.component( "export-details", {
    "data": function() {
        return {
            "loaded": false,
            "terminal": {},
            "error": null,
        };
    },
    "template": `
        <div class="export-details">
            <router-link to="/">&lsaquo; retour</router-link>
            <div class="loading" v-if="!loaded">
                <p>loading…</p>
            </div>
            <div class="error" v-if="loaded && error">
                <p>
                    <strong>Error:</strong> {{ error }}
                </p>
            </div>
            <div v-if="loaded">
                <h2>{{ export.name }}</h2>
                <address>{{ export.address }}</address>
                <p>{{ export.state }}</p>
                <p>{{ export.hours }}</p>
            </div>
        </div>
    `,
    "methods": {
        fetchInfos( sExportID ) {
            return getLocation()
                .then( ( { coords } ) => {
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
                    let oExport = oResponse.data;

                    this.loaded = true;
                    this.export = oExport;
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
