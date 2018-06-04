//session checker---------------------------------------------
$(document).ready(function(){
	var urlRoot = 'http://35.202.86.61/office-management/';
	//$("span.line").peity("line",{ width: 200 });
//dashboard call----------------------------------	
	$.ajax({
		async: true,
		crossDomain: true,
		url:urlRoot+'employees/dashboard',
		type:'GET',
		datatype:'JSON',
		headers: {
			"content-type": "application/json",
			"cache-control": "no-cache",
		},
		success:function(data){
			if(data.name!='' || data.title!=null){
				$('.name').html(data.name);
				console.log(data);
				console.log(data.name);
				$('#profile').attr('href','profile.html');
				$('.name').html(data.name);
				$('.position').html(data.designation);
			}
			else{
				console.log($(location).attr('href').substring($(location).attr('href').lastIndexOf('/')+1));
				$(location).attr('href','login.html?src='+$(location).attr('href').substring($(location).attr('href').lastIndexOf('/')+1));
			}	
		},
		error:function(error){
			console.log(error.responseText);
		}
	});
//dashboard call ends--------------------------------

//logout---------------------------------------------
$(document).on('click','#logout',function(){
	$.ajax({
		async:true,
		crossDomain:true,
		url:urlRoot+'employees/logout',
		type:'GET',
		headers: {
			"content-type": "application/json",
			"cache-control": "no-cache"
		},
		success:function(data){
			$(location).attr('href','login.html');
		},
		error:function(error){
			console.log(error.responseText);
		}	
	});
});
//logout done-----------------------------------------
});
//session checker---------------------------------------------------