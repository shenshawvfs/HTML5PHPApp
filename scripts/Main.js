/**
 * @name:      MAIN 
 * @copyright: (C) 2014-2019 Kibble Online Inc in cooperation with Vancouver Film School. All Rights Reserved. 
 * @author:    Scott Henshaw {@link mailto:shenshaw@vfs.com} 
 * @version:   2.2.0 
 */
'use strict';

// [SH] Choose one, delete the other...
import App from './App.js';
//import App from './Game.js';

// KISS just load the right thing and tell it to run...
$(document).ready( async event => {  App.run() });
