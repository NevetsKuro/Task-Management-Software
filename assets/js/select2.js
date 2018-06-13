/*

*Project Name: Calibre Admin Bootstrap Template;
*Author: Lancecoder;
*Website: lancecoder.com;
*Filename: forms/select2.js;

*/


"use strict";


$(document).ready(function(){
	$(".select2").select2({
	  placeholder: 'Select ...',
        allowClear: true
	});

	$(".select2-multiple").select2({
        placeholder: 'Select....',
        allowClear: true
    }).on('select2-open', function() {
        // Adding Custom Scrollbar
        // $(this).data('select2').results.addClass('overflow-hidden').perfectScrollbar();
    });


    $(".js-data-example-ajax").select2({
      ajax: {
        url: "https://api.github.com/search/repositories",
        dataType: 'json',
        delay: 250,
        data: function (params) {
          return {
            q: params.term, // search term
            page: params.page
          };
        },
        processResults: function (data, page) {
          // parse the results into the format expected by Select2.
          // since we are using custom formatting functions we do not need to
          // alter the remote JSON data
          return {
            results: data.items  
          };
        },
        cache: true
      },
      escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
      minimumInputLength: 1,
      templateResult: formatRepo, // omitted for brevity, see the source of this page
       templateSelection: formatRepoSelection // omitted for brevity, see the source of this page  
        
    });
});


function formatRepo (repo) {
    if (repo.loading) return repo.text;

    var markup = '<div class="clearfix">' +
    '<div class="col-sm-1">' +
    '<img src="' + repo.owner.avatar_url + '" style="max-width: 100%" />' +
    '</div>' +
    '<div clas="col-sm-10">' +
    '<div class="clearfix">' +
    '<div class="col-sm-6">' + repo.full_name + '</div>' +
    '<div class="col-sm-3"><i class="fa fa-code-fork"></i> ' + repo.forks_count + '</div>' +
    '<div class="col-sm-2"><i class="fa fa-star"></i> ' + repo.stargazers_count + '</div>' +
    '</div>';

    if (repo.description) {
      markup += '<div>' + repo.description + '</div>';
    }

    markup += '</div></div>';

    return markup;
  }

  function formatRepoSelection (repo) {
    return repo.full_name || repo.text;
  }