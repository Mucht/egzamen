/* RIA/egzamen
 *
 * /static/modules/main.js - Main entry file
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 23/01/2017
*/

import Vue from "vue";

let oApp = new Vue( {
    "el": "#app",
    "template": `
        <div class="box">
            <p>{{ slogan }}</p>
            <ul>
                <li v-for="teammate in teammates">
                    <strong>{{ teammate.heroName }}</strong>
                    <span>( {{ teammate.realName }} )</span>
                </li>
            </ul>
            <p>Voulez vous savoir qui se cache derrière le masque d'Iron Man ?</p>
            <strong v-if="secret">Tony Stark</strong>
            <button v-on:click="revealSecret">{{ reveal.value }}</button>
        </div>
    `,
    "data": {
        "slogan": "Ses co-équipiers :",
        "secret": false,
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
        "reveal": {
            "show": "Reveal the secret",
            "hide": "Hide the secret",
            "value": "Reveal the secret",
        },
    },
    "methods": {
        "revealSecret": function() {
            this.secret = !this.secret;
            this.reveal.value = this.secret ? this.reveal.hide : this.reveal.show;
        },
    },
} );

oApp.$mount( "#app" );
