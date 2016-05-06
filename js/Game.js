/*
 * Game Singleton MAIN
 * 
 * @copyright: (C) 2014 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 * @author:    Scott Henshaw {@link mailto:shenshaw@vfs.com} 
 * @version:   1.1.0
 * 
 * @summary:   Framework Singleton Class to contain a web app
 * 
 */
var game = (function() {
	
	// Constants
    function GameClass() {
        /*
            Define a class inside this closure.  We will return this entire class as
            an object
            
            @params:  none
            @returns: Game Class - used as a singleton
            
        */
        
    	// Constants
    	var SECONDS_AS_MS = 1000;	
    	var TARGET_FPS = 60;
        var TARGET_MS_PER_TICK = SECONDS_AS_MS / TARGET_FPS;
        var UPDATE_MIN_MS = 2000;
        
        var local = {
            // the local object contains all the private members used in this class
                
            tick: 0,  // Start with tick 0
            start: null,
        };	
        var self = this;
	
        self.init = function() {
       	
        	// Do some initialization of the member variables for the app
        	// Create controllers to manage model objects and link them to DOM view elements
            
            // Define the Event handlers for the app
            $('#nickname-form').on('submit', function( event ) {
                
                event.preventDefault();
                
                var request = "action=login&" + $(this).serialize();                
                $.post('server.php', request )
                    .then( function( data ) {
                        
                        var result = $.parseJSON( data );
                        if (result.error)
                            return;
                        
                        $('#results-area').html( result.msg );    
                        
                    });
            });
    	}	
	

        
        local.iterate = function() {
    		// This is the simplest loop possible. - use Game.js for an app that needs a more complex render loop
            interval = setInterval( function() {
            	
            	local.update();
            	local.render();
            	
            }, TARGET_MS_PER_TICK );
    	}
    	
    	
    	
    	local.frame = function( timestamp ) {
    	    
    	    if (!local.start) 
    	        local.start = timestamp;
    	    
    	    var progress = timestamp - local.start;
    	    local.update( progress );
    	    local.render( progress )
    	    
    	    if (progress < UPDATE_MIN_MS)
    	        window.requestAnimationFrame( local.frame );
    	}
    	
    	
    	
    	self.run = function() {
    	
    	    window.requestAnimationFrame( local.frame );
    	}

    	
	
    	local.update = function( timestamp ) {
            //Update the app/simulation model 
    
        }
    
        
        local.render = function( timestamp ) {
            // Refresh the view - canvas and dom elements
            
        }
        
    }    
    return new GameClass();
	
})();  // Run the unnamed function and assign the results to app for use.




// ===================================================================
// MAIN
// Define the set of private methods that you want to make public and return them
$(document).ready( function() {

    game.init();
    game.run();

});

