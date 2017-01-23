/* RIA/egzamen
 *
 * /static/modules/components/teammates-list.js - Vue component about teammates
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
