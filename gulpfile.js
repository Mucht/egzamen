/* ria/egzamen
 *
 * /gulpfile.js - gulp tasks
 *
 * Coded by Mathieu Claessens
 * started at 19/01/2017
*/

/* eslint-disable */

"use strict";

var
gulp = require( "gulp" ),
gEslint = require( "gulp-eslint" ),
gBabel = require( "gulp-babel" ),
gUtil = require( "gulp-util" ),
Mongo = require( "mongodb" ),
ObjectID = Mongo.ObjectID,
MongoClient = Mongo.MongoClient;

gulp.task( "lint", function(){
    return gulp
        .src( "src/**/*.js" )
        .pipe( gEslint() )
        .pipe( gEslint.format() );
} );

gulp.task( "build", function(){
  return gulp
    .src( "src/**/*.js" )
    .pipe( babel() )
    .pipe( gulp.dest( "bin" ) );
} );

gulp.task( "reset-db", function( fNext ){
    // 1. Check if INSIDE vagrant
    // 2. drop database
    // 3. parse & fill export.json
} );

gulp.task( "watch", function(){
    gulp.watch( "src/**/*.js", [ "build" ] );
} );

gulp.task( "default", [ "build" ] );

gulp.task( "work", [ "build", "watch" ] );
