/*

*Project Name: Calibre Admin Bootstrap Template;
*Author: Lancecoder;
*Website: lancecoder.com;
*Filename: forms/forms.js;

*/


"use strict";


$(document).ready(function(){

	"use strict";

	try 
	{

		

		if($(".inputag-2").length > 0) {

	        var names = new Bloodhound({
	            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
	            queryTokenizer: Bloodhound.tokenizers.whitespace,
	            prefetch: {
	            url: '../../assets/data/names.json',
	                filter: function(list) {
	                    return $.map(list, function(cityname) {
	                    return { name: cityname }; });
	                }
	            }
	        });

	        names.initialize();

	        $('.inputag-2').tagsinput({
	            typeaheadjs: {
	                name: 'names',
	                displayKey: 'name',
	                valueKey: 'name',
	                source: names.ttAdapter()
	            }
	        });
	    }


	    if($(".inputag-3").length > 0) {
	        var cities = new Bloodhound({
	            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('text'),
	            queryTokenizer: Bloodhound.tokenizers.whitespace,
	            prefetch: '../../assets/data/cities.json'
	        });

	        cities.initialize();

	        var elt = $('.inputag-3');
	        elt.tagsinput({
	            itemValue: 'value',
	            itemText: 'text',
	            typeaheadjs: {
	                name: 'cities',
	                displayKey: 'text',
	                source: cities.ttAdapter()
	            }
	        });
	        elt.tagsinput('add', { "value": 1 , "text": "Amsterdam"   , "continent": "Europe"    });
	        elt.tagsinput('add', { "value": 4 , "text": "Washington"  , "continent": "America"   });
	        elt.tagsinput('add', { "value": 7 , "text": "Sydney"      , "continent": "Australia" });
	        elt.tagsinput('add', { "value": 10, "text": "Beijing"     , "continent": "Asia"      });
	        elt.tagsinput('add', { "value": 13, "text": "Cairo"       , "continent": "Africa"    });
	    }


	    if($(".inputag-4").length > 0) {
	        var cities = new Bloodhound({
	            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('text'),
	            queryTokenizer: Bloodhound.tokenizers.whitespace,
	            prefetch: '../../assets/data/cities.json'
	        });
	        cities.initialize();

	        var elt = $('.inputag-4');
	        elt.tagsinput({
	            tagClass: function(item) {
	            switch (item.continent) {
	                case 'Europe'   : return 'label label-primary';
	                case 'America'  : return 'label label-danger label-important';
	                case 'Australia': return 'label label-success';
	                case 'Africa'   : return 'label label-default';
	                case 'Asia'     : return 'label label-warning';
	            }
	            },
	            itemValue: 'value',
	            itemText: 'text',
	            typeaheadjs: {
	                name: 'cities',
	                displayKey: 'text',
	                source: cities.ttAdapter()
	            }
	        });

	        elt.tagsinput('add', { "value": 1 , "text": "Amsterdam"   , "continent": "Europe"    });
	        elt.tagsinput('add', { "value": 4 , "text": "Washington"  , "continent": "America"   });
	        elt.tagsinput('add', { "value": 7 , "text": "Sydney"      , "continent": "Australia" });
	        elt.tagsinput('add', { "value": 10, "text": "Beijing"     , "continent": "Asia"      });
	        elt.tagsinput('add', { "value": 13, "text": "Cairo"       , "continent": "Africa"    });
	    }

	}
	catch(error) {
		console.log("Error occured: "+ error.message);
	}
     
});