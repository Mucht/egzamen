/* RIA/egzamen
 *
 * /static/modules/components/export-details.js - Terminal details vue components
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 23/01/2017
*/

import Vue from "vue";
import reqwest from "reqwest";

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
            <div class="loading" v-if="!loaded">
                <p>loading…</p>
            </div>
            <div class="error" v-if="loaded && error">
                <p>
                    <strong>Error:</strong>
                    {{ error.message }}
                </p>
            </div>
            <div v-if="loaded">
                <h2>Détails d'une export</h2>
                <strong>{{ export.name }}</strong>
                <address>{{ export.address }}</address>
                <p>{{ export.state }}</p>
                <p>{{ export.hours }}</p>
            </div>
            <router-link to="/">&lsaquo; retour</router-link>
        </div>
    `,
    mounted() {
        console.log( "Détails d'une export:", this.$route.params.id );
        // NOTE: needs refactor!
        reqwest( {
            "url": `/exports/${ this.$route.params.id }`,
            "method": "get",
            "data": {},
            "error": ( oError ) => {
                this.loaded = true;
                this.error = oError.message;
            },
            "success": ( oResponse ) => {
                console.log( oResponse );
                this.loaded = true;
                this.export = oResponse.data;
            },
        } );
    },
} );

export default oExportDetails;
