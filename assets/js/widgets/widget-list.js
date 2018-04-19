/*

*Project Name: Calibre Admin Bootstrap Template;
*Author: Lancecoder;
*Website: lancecoder.com;
*Filename: widgets/widget-list.js;

*/


"use strict";


var $opened_icon = "icon-minus";
var $closed_icon = "icon-plus";

$(document).ready(function(){

	open_first_vertical_step();

	$(".list-widget .list-vertical-step .circle").on("click", function(){
		var $this = $(this);
		var $list_vertical_step = $this.parent().parent();
		var $body = $list_vertical_step.find(".body");
		if(!$body.is(":visible")) {
			$body.slideDown(function(){
				$this.find("span").addClass($opened_icon).removeClass($closed_icon);
				$list_vertical_step.addClass('show');
			});
		}else{
			$body.slideUp(function(){
				$this.find("span").addClass($closed_icon).removeClass($opened_icon);
				$list_vertical_step.removeClass('show');
			});
		}

	});


	$(".list-widget .search-wrapper > .icon-magnifier").on("click", function(){
		var search = $(this).parent().find(".search");
		search.show();
		search.focus();
		
	});

	$('.list-widget .search-wrapper > .search').focus(function()
	{
		var screen_width = getViewport(1, 0);
		var val_width = '200px'

		if(screen_width<400) {
			val_width = '100px'
		}

	    $(this).animate({ 
	    	width: val_width
	    }, 100);
	}).blur(function()
	{
	    $(this).animate({ 
	    	width: '0'
	    }, 100);
	});

});


function open_first_vertical_step() {
	var cntr = 0;
	$.each($(".list-widget .list-vertical-step"), function(){
		if(cntr==0) {
			var $this = $(this);
			var $body = $this.find(".body");
			var $circle = $this.find(".circle>span");
			$body.show(function(){
				$this.addClass("show");
				$circle.addClass($opened_icon);
			});
		}
		cntr++;
	});
}