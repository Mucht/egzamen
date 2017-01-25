/* RIA/egzamen
 *
 * /static/modules/main.js - Main entry file
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 23/01/2017
*/

import Vue from "vue";
import VueRouter from "vue-router";
import ExportsList from "./components/exports/list.js";
import ExportsDetails from "./components/exports/details.js";

Vue.use( VueRouter );

let oRouter, oApp;

oRouter = new VueRouter( {
    "routes": [
        { "path": "/", "component": ExportsList },
        { "path": "/:id", "component": ExportsDetails },
    ],
} );

oApp = new Vue( {
    "template": `
        <div class="wrapper">
            <header>
                <h1>RIA - Egzamen</h1>
                <router-view></router-view>
            <main>
            <footer>
                <a href="https://github.com/Mucht/egzamen">Accès au GitHub</a>
            </footer>
        </div>
    `,
    "router": oRouter,
} );

oApp.$mount( "#app" );
