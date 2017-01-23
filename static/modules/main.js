/* RIA/egzamen
 *
 * /static/modules/main.js - Main entry file
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 23/01/2017
*/

import Vue from "vue";

Vue.component( "teammates-list", {
    "props": [ "elements" ],
    "template": `
        <ul>
            <li v-for="teammate in elements">
                <strong>{{ teammate.heroName }}</strong>
                <span>( {{ teammate.realName }} )</span>
            </li>
        </ul>
    `,
} );

Vue.component( "secret", {
    "props": [ "content" ],
    "data": function() {
        return {
            "reveal": {
                "show": "Reveal the secrets!",
                "hide": "Hide the secrets!",
                "value": "Reveal the secrets!",
            },
            "state": false,
        };
    },
    "template": `
        <div>
            <p>Voulez vous savoir qui se cache derrière le masque d'Iron Man ?</p>
            <strong v-if="state">{{ content }}</strong>
            <button v-on:click="revealSecret">{{ reveal.value }}</button>
        </div>
    `,
    "methods": {
        "revealSecret": function() {
            this.state = !this.state;
            this.reveal.value = this.state ? this.reveal.hide : this.reveal.show;
        },
    },
} );

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
