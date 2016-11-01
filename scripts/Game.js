/**
 * Game Singleton MAIN
 * 
 * @copyright: (C) 2014-2016 Kibble Games Inc in cooperation with Vancouver Film School.  All Rights Reserved.
 * @author:    Scott Henshaw {@link mailto:shenshaw@vfs.com} 
 * @version:   1.2.0
 * 
 * @summary:   Framework Singleton Class to contain a web app
 * 
 */
'use strict';

// Constants
var SECONDS_AS_MS = 1000;   
var TARGET_FPS = 60;
var TARGET_MS_PER_TICK = SECONDS_AS_MS / TARGET_FPS;
var UPDATE_MIN_MS = 2000;


var gameInstance = null;

class Game {
	
    constructor() {
        /**
        We will return this entire class as an object        
        @params:  none
        @returns: Game Class - used as a singleton            
        */
        if (gameInstance != null)
            return gameInstance;
        
        gameInstance = this;
        
        this.__private__ = new WeakMap();

        let privateData = {
            // the local object contains all the private members used in this class
                
            tick: 0,  // Start with tick 0
            start: null
        }
        this.__private__.set( this, privateData );
    
    
        $('#nickname-form').on('submit', function( event ) {
            
            event.preventDefault();
            
            var request = $(this).serialize();                
            $.post('server/login', request )
                .then( ( data ) => {
                    
                    let result = $.parseJSON( data );
                    if (result.error)
                        return;
                    
                    $('#results-area').html( result.msg );    
                });
        });
        
        return gameInstance;
    }
        

    iterate() {
		// This is the simplest loop possible. - use Game.js for an app that needs a more complex render loop
        let _m = this.__private__.get( this );
        
        interval = setInterval( function() {
        	
        	_m.update();
        	_m.render();
        	
        }, TARGET_MS_PER_TICK );
	}
    	
    	
	run() {
	    	    
        let _m = this.__private__.get( this );

	    let frame = ( timestamp ) => {
            
            if (!_m.start) 
                _m.start = timestamp;
            
            let progress = timestamp - _m.start;
            this._update( progress );
            this._render( progress )
            
            if (progress < UPDATE_MIN_MS)
                window.requestAnimationFrame( frame );
        }
	    
	    window.requestAnimationFrame( frame );
	}

	
	_update( timestamp ) {
        //Update the app/simulation model 

    }

    
    _render( timestamp ) {
        // Refresh the view - canvas and dom elements
        
    }
        
}  // Run the unnamed function and assign the results to app for use.




// ===================================================================
// MAIN
// Define the set of private methods that you want to make public and return them
$(document).ready( () => {

    let game = new Game();
    game.run();

});

