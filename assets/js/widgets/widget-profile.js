/*

*Project Name: Calibre Admin Bootstrap Template;
*Author: Lancecoder;
*Website: lancecoder.com;
*Filename: widgets/widget-profile.js;

*/


"use strict";


$(document).ready(function(){
	
	profile_carousel();

	$(window).resize(function(){
		profile_carousel();
	});
});


function profile_carousel() {
	$('.profile-owl-carousel').owlCarousel({
	    margin:10,
	    loop:true,
	    autoWidth:true,
	    autoplay:true,
    	autoplayTimeout:3000,
	    items:1,
	    responsiveClass:true
	});
}