/**
 * Two options for including modules:
 *
 * 1. Just require() it
 * 	- Will be compiled in to one JS file
 * 	- Best for modules used on a large proportion of pages
 *
 * Example:
 *
 * require('your-thing')
 *
 * 2. Async loaded
 * 	- Best for modules used in only a couple of instances
 * 	- Will be compiled in to a separate JS file that is async loaded based on a
 * 		condition
 *
 *  Example:
 *
 *  if([your test e.g. for DOM element presence]) {
 *  	require.ensure([], function(require) {
 *    	const YourThing = require('your-thing')
 *
 * 			[do stuff with YourThing]
 *  	})
 *  }
 *
 *  if (document.querySelector('.cookies') !== null){
 *    require.ensure([], function(require) {
 *      const Cookies = require('./base/cookies');
 *	    let cookiesContainer = document.querySelector('.cookies');
 *		  new Cookies(cookiesContainer);
 *    }, 'cookies');
 *   }
 **/

 require('core-js/fn/array/for-each')
