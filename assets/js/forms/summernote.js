/*

*Project Name: Calibre Admin Bootstrap Template;
*Author: Lancecoder;
*Website: lancecoder.com;
*Filename: forms/summernote.js;

*/


"use strict";


$(document).ready(function(){
	try {

		$('.summernote-airmode').summernote({
		  	airMode: true
		});

		$('.summernote').summernote();

	}	
	catch(err) {
	    console.log(err)
	}
});