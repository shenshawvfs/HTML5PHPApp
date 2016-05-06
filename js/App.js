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
	    
	    var __private__ = {
	        // the local object contains all the private members used in this class	            
            done: false
	    };
	    var my = __private__;
	    
        this.init = function() {       	
        	// Do some initialization of the member variables for the app
    
        	// Create controllers to manage model objects and link them to DOM
            // view elements
            
            // Define the Event handlers for the app
    	}	
        
        
    	this.run = function() {
            // Run the app
    		
    		while (!done) {
    			
    			my.updateData();			
    			my.refreshView();			
    			
    		}
    	};    	
    	
    	
        my.updateData = function() {
            // Update the app/simulation model
        	// is the app finished running?
        	done = true;
        }
    
        
        my.refreshView = function() {
            // Refresh the view - canvas and dom elements
        	
        }
        
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
