/**
 * App Singleton MAIN 
 * 
 * @copyright: (C) 2014-2016 Kibble Games Inc in cooperation with Vancouver Film School. All Rights Reserved. 
 * @author: Scott Henshaw {@link mailto:shenshaw@vfs.com} 
 * @version: 1.2.0 
 * 
 * @summary: Framework Singleton Class to contain a web app
 * 
 */
'use strict';

// Constants
var SECONDS_AS_MS = 1000;   
var TARGET_FPS = 60;
var TARGET_MS_PER_TICK = SECONDS_AS_MS / TARGET_FPS;
var UPDATE_MIN_MS = 2000;

var appInstance = null;

class App {

    constructor() {
	    
        if (appInstance != null)
            return appInstance;
        
        appInstance = this;
        
        // the local object contains all the private members used in this class             
        // Do some initialization of the member variables for the app
	    this.__private__ = new WeakMap();
	    let privateData = {

            done:   false,
            userId: 0
	    };
	    this.__private__.set( this, privateData );
	    
	    
        // Define the Event handlers for the app
        $('#nickname-form').on('submit', ( event ) => {
            
            event.preventDefault();
            
            let _m = this.__private__.get( this );
            
            // Do your thing here when the user presses the submit button on this form.           
            let us_requestParams = $(event.target).serialize();            
            $.post('server/login/', us_requestParams)
                .then( ( data ) => {
                    
                    // this callback is triggered WHEN we get a response                        
                    var response = $.parseJSON( data );
                    
                    if (!response.error) {
                        
                        _m.userId = response.id;
                        // Use an ES6 trick to parameterize a string
                        $('#results-area').html(`Welcome ${response.nick-name}, ${response.msg} <br/>`);
                    }
                });
        });
        
        $("#validate-form").on('submit', ( event ) => {            
            /*
             Note the calls in the handler MUST use the app class to 
             reference the post/response calls so that they can be 
             resolved at run time
             */
            event.preventDefault();
            
            let us_requestParams = $(event.target).serialize();
            
            // Note: the trailing slash IS important
            $.post( "server/validate/", us_requestParams )                
                .then( ( data ) => { 
                    
                    // this callback is triggered WHEN we get a response                        
                    var response = $.parseJSON( data );
                    
                    // compose the view markup based on JSON data we recieved
                    var markup = "Favorite beverage: " + response.favorite_beverage;
                    markup += "<br />Favorite restaurant: " + response.favorite_restaurant;
                    markup += "<br />Gender: " + response.gender;
                    markup += "<br />JSON: " + response.json;
            
                    // Display the markup in the result section
                    $("#results-area").html( markup );
            
                    // Pop an alert to let the user know that the result is computed
                    console.log(`Form submitted successfully.\nReturned json: ${response.json}` );                    
                });
            return false;
        });
        
        return appInstance;
	}	
        
        
	run() {
        // Run the app
		let _m = this.__private__.get( this ); 
		// One way to make private things easier to read as members
	    
		while (!_m.done) {
			
			this._updateData();			
			this._refreshView();			
			
		}
	};    	
	
	
	_updateData() {
        // Update the app/simulation model
    	// is the app finished running?
    	let _m = this.__private__.get( this );
    	_m.done = true;
    }
        
	
	// Refresh the view - canvas and dom elements
    _refreshView() { }        
	
}  // Run the unnamed function and assign the results to app for use.


// ===================================================================
// MAIN
// Define the set of private methods that you want to make public and return
// them
$(document).ready( function() {

    let app = new App();
    app.run();

});
