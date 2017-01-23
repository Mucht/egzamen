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
        .pipe( gBabel() )
        .pipe( gulp.dest( "bin" ) );
} );

gulp.task( "views", function(){
    return gulp
        .src( "src/views/**" )
        .pipe( gulp.dest( "bin/views" ) );
} );

gulp.task( "reset-db", function( fNext ){
    // 1. Check if INSIDE vagrant
    if ( process.env.USER !== "vagrant" ) {
        gUtil.beep();
        gUtil.log( gUtil.colors.red( "This task must be runned from INSIDE the vagrant box damn it !" ) );
        return fNext();
    }
    // Connect to the MongoDB
    MongoClient.connect( "mongodb://127.0.0.1:27017/egzamen", function( oError, oDB ){

        if ( oError ) {
            gUtil.beep();
            return fNext( oError );
        }

        // 2. drop database
        oDB.dropDatabase()
           .then( function(){
               // 3. parse & fill export.json
               var aExports = require( __dirname + "/data/export.json" );

               return oDB.collection( "exports" ).insertMany( aExports );
           } )
           .then( function(){
               oDB.close();
               gUtil.log( gUtil.colors.green( "GG ! The DB has been resetted !" ) );
               fNext();
           } )
           .catch( function( oError ){
              //If error => desconnect the DB
              oDB.close();
              fNext( oError );
           } )
    } );
} );

gulp.task( "watch", function(){
    gulp.watch( "src/**/*.js", [ "build" ] );
    gulp.watch( "src/wiexs/**", [ "views" ] );
} );

gulp.task( "default", [ "build", "views" ] );

gulp.task( "work", [ "build", "views", "watch" ] );
