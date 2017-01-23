/* RIA/egzamen
 *
 * /static/modules/main.js - Main entry file
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 23/01/2017
*/

import Vue from "vue";
import "./components/teammates-list.js";
import "./components/secret.js";

let oApp = new Vue( {
    "template": `
        <div class="box">
            <p>{{ slogan }}</p>
            <teammates-list v-bind:elements="teammates"></teammates-list>
            <secret v-bind:content="secret"></secret>
        </div>
    `,
    "data": {
        "slogan": "Ses co-équipiers :",
        "secret": "Tony Stark",
        "teammates": [
            {
                "heroName": "Captain America",
                "realName": "Steve Rogers",
            },
            {
                "heroName": "Hulk",
                "realName": "Bruce Banner",
            },
            {
                "heroName": "Hawkeye",
                "realName": "Clint Barton",
            },
            {
                "heroName": "Black Widow",
                "realName": "Natasha Romanoff",
            },
        ],

    },
} );

oApp.$mount( "#app" );
