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

(function() {
    
// Constants
var SECONDS_AS_MS      = 1000;   
var TARGET_FPS         = 60;
var TARGET_MS_PER_TICK = SECONDS_AS_MS / TARGET_FPS;
var UPDATE_MIN_MS      = 2000;


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
        
        // the local object contains all the private members used in this class             
        this['private'] = {
            data:    new WeakMap(),
            members: ( key, value ) => {
                if (value != undefined) 
                    this.private.data.set( key, value );
                return this.private.data.get( key );
            }
        };
        
        // the local object contains all the private members used in this class       
        let my = this.private.members( this, {
            
            tick:  0,  // Start with tick 0
            start: null
        });
    
    
        $('#nickname-form').on('submit', ( event ) => {
            
            event.preventDefault();
            
            let request = $(event.target).serialize();                
            $.post('server/login', request )
                .then( ( data ) => {
                    
                    let result = $.parseJSON( data );
                    if (result.error)
                        return;
                    
                    $('#results-area').html( result.msg );    
                });
        });
        
        // Async/Await version
        /*
        $('#nickname-form').on('submit', async ( event ) => {
            
            event.preventDefault();
            
            let request = $(event.target).serialize();                
            let data = await $.post('server/login', request );
            
            let result = $.parseJSON( data );
            if (result.error)
                return;
            
            $('#results-area').html( result.msg );    
        });
        */

        return gameInstance;
    }
        

    iterate() {
		// This is the simplest loop possible. - use Game.js for an app that needs a more complex render loop
        let my = this.private.members( this );
        
        interval = setInterval( ( event ) => {
        	
        	this.update();
        	this.render();
        	
        }, TARGET_MS_PER_TICK );
	}
    	
    	
    oneFrame( timestamp ) {
        let my = this.private.members( this );
        
        if (!my.start) 
            my.start = timestamp;
        
        let progress = timestamp - my.start;
        this.update( progress );
        this.render( progress )
        
        if (progress < UPDATE_MIN_MS)
            window.requestAnimationFrame( ( deltaT ) => { this.oneFrame( deltaT ); } );
    }
    
	run() {
	    	    
	    window.requestAnimationFrame( ( deltaT ) => { this.oneFrame( deltaT ); } );
	}

	
	update( timestamp ) {
        //Update the app/simulation model 

    }

    
    render( timestamp ) {
        // Refresh the view - canvas and dom elements
        
    }
        
}



// ===================================================================
// MAIN
// Define the set of private methods that you want to make public and return them
$(document).ready( ( event ) => {

    let game = new Game();
    game.run();

});


})();



