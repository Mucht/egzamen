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

let oRouter = new VueRouter( {
    "routes": [
        { "path": "/", "component": ExportsList },
        { "path": "/:id", "component": ExportsDetails },
    ],
} );

let oApp = new Vue( {
    "template": `
        <div class="wrapper">
            <header>
                <h1>Egzamen</h1>
            </header>
            <main>
                <router-view></router-view>
            <main>
            <footer>
                <a href="https://github.com/Mucht/egzamen">Le github</a>
            </footer>
        </div>
    `,
    "router": oRouter,
} );

oApp.$mount( "#app" );
