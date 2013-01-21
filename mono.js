/*
 * MonoJS v1.0.1
 * http://github.com/akkara/MonoJS
 *
 * Copyright (c) 2013 Kadir Yardımcı
 * Licensed under the MIT license.
 */

(function($){

	$.fn.extend({

		mono: function (o,f) {

			// Options
			o = $.extend({
				// Main color for lighten colors
				color : '#ffffff',
				// Second color for darken colors
				black : '#000000',
				// Max width/height for speed process:
				// Image natural sizes will be kept
				// But new image datas will be fitted as
				bounce : 700,
				// Fade in speed:
				speed : 1000,
				// Hide images on failer
				hide : false
			},o) ;
			
			var error = 0 ;
			
			// Prepare for canvas support tests
			var tc = document.createElement('canvas') ;
			
			// Check canvas support
			if (typeof tc.toDataURL != 'function') {
				error = 1 ;
				
			} else {
				// Check Android Froyo canvas problem
				var ti = document.createElement('img') ;
				tc.width = 1 ; tc.height = 1 ;
				ti.src = tc.toDataURL("this/jpeg") ;
				if (ti.src == 'data:,') {
					error = 2 ; } }
			
			// Problem?
			if (error) {
			
				// Hide when failed
				if (o.hide) {
					$(this).css('opacity',0) ; }
	
				// Check callback
				if (typeof f == 'function') {
					// Return error code
					f(this,error) ; }
				
				// Sayonara
				return this ; }
			
			// Prepare main color
			var r = parseInt(o.color.substr(1,2),16) ;
			var g = parseInt(o.color.substr(3,2),16) ;
			var b = parseInt(o.color.substr(5,2),16) ;

			// Prepare second color
			var r2 = parseInt(o.black.substr(1,2),16) ;
			var g2 = parseInt(o.black.substr(3,2),16) ;
			var b2 = parseInt(o.black.substr(5,2),16) ;

			// Color indexes
			var R = 0, G = 1, B = 2 ;

			// Collect deferred objects
			var j = [] ;
			
			// Start to handle
			this.each(function(){

				// Shorthands
				var img = this, obj = $(img) ;

				// Deferred as a JS beauty
				var d = $.Deferred() ;
				j.push(d) ;

				// Hide image
				obj.css('opacity',0) ;

				// Wait until load
				j.push(obj.one('load',function(){

					// Check sizes
					var iw = cw = this.width ;
					var ih = ch = this.height ;
					if (iw > o.bounce || ih > o.bounce) {
						if (iw > ih) {
							ch = (iw*o.bounce)/ih ;
							cw = o.bounce ;
						} else {
							cw = (ih*o.bounce)/iw ;
							ch = o.bounce ; } }

					// Create a on-the-fly canvas element
					var el = document.createElement('canvas') ;
					el.width = cw ; el.height = ch ;
					var ctx = el.getContext('2d') ;

					// Draw image onto it
					ctx.drawImage(img,0,0,cw,ch) ;
					var dat = ctx.getImageData(0,0,cw,ch) ;
					var px = dat.data ;
					var length = px.length ;

					// Start to progress
					for (var i=0 ; i < length ; i+=4) {
						var ratio = px[i+R]*0.3+px[i+G]*0.59+px[i+B]*0.11 ;
						px[i+R] = (((r-r2)/255)*ratio)+r2 ;
						px[i+G] = (((g-g2)/255)*ratio)+g2 ;
						px[i+B] = (((b-b2)/255)*ratio)+b2 ; }

					// Update color byte array
					ctx.putImageData(dat,0,0) ;
					
					// Keep old image source
					$.data(obj,'src',img.src) ;

					// Update image source as byte array
					img.src = el.toDataURL("this/jpeg") ;

					// Fire diferred
					d.resolve() ;
					
					// Show image
					if (o.speed) {
						obj.delay(100).animate({opacity:1},o.speed) ;
					} else {
						obj.delay(100).css('opacity',1) ; }

				})) ;
				
			}) ;

			// Check callback
			if (typeof f == 'function') {
				$.when.apply(null,j).then(function(){
					// Return true for success
					f(this,true) ;
				}) ; }

			// Sayonara
			return this ;

		}

	}) ;

})(jQuery) ;



























