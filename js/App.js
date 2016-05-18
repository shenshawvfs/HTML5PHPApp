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
var app = (function() {

	function AppClass() {
	    
        // the local object contains all the private members used in this class             
	    var __private__ = {
            done: false
	    };
	    var my = __private__;
	    
        this.init = function() {       	
        	// Do some initialization of the member variables for the app
    
        	// Create controllers to manage model objects and link them to DOM
            // view elements
            
            // Define the Event handlers for the app
            
            // What do you want to do on form submission?
            $('.nickname-form').on('submit', function( event ) {
                event.preventDefault();
                
                // Do your thing here when the user presses the submit button on this form.
                var command = { 'action': 'validate' }; 
                var formData = $(this).serialize();
                var requestParamString = $.param( command ) + "&" + formData;
                
            });
            
            $(".default-form").on('submit', function( event ) {
                
                /*
                 Note the calls in the handler MUST use the app class to 
                 reference the post/response calls so that they can be 
                 resolved at run time
                 */
                event.preventDefault();
                
                var formData = $(this).serialize();
                var requestParamString = formData;
                
                $.post( "server/simple_server.php", requestParamString )
                
                    .then( function( data ) {
                        
                        // this callback is triggered WHEN we get a response
                        
                        var response = $.parseJSON( data );
                        
                        // compose the view markup based on JSON data we recieved
                        var markup = "Favorite beverage: " + response.favorite_beverage;
                        markup += "<br />Favorite restaurant: " + response.favorite_restaurant;
                        markup += "<br />Gender: " + response.gender;
                        markup += "<br />JSON: " + response.json;
                
                        // Display the markup in the result section
                        $(".the-return").html( markup );
                
                        // Pop an alert to let the user know that the result is computed
                        alert("Form submitted successfully.\nReturned json: " + response.json );                    
                    });
                return false;
            });
    	}	
        
        
    	this.run = function() {
            // Run the app
    		var m = __private__; // One way to make private things easier to read as members
    	    
    		while (!m.done) {
    			
    			updateData();			
    			refreshView();			
    			
    		}
    	};    	
    	
    	
    	function updateData() {
            // Update the app/simulation model
        	// is the app finished running?
        	__private__.done = true;
        }
            
    	// Refresh the view - canvas and dom elements
        function refreshView() { }        
    }
	
	return new AppClass; 	
})();  // Run the unnamed function and assign the results to app for use.


// ===================================================================
// MAIN
// Define the set of private methods that you want to make public and return
// them
$(document).ready( function() {

    app.init();
    app.run();

});
