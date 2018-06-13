//session checker---------------------------------------------
$(document).ready(function(){
	var urlRoot = 'http://35.202.86.61/office-management/';
	//$("span.line").peity("line",{ width: 200 });
//dashboard call----------------------------------	
var token=localStorage.getItem('token');	
if(token!=null){
	$.ajax({
		async: true,
		crossDomain: true,
		url:urlRoot+'current_user',
		type:'GET',
		datatype:'JSON',
		headers: {
			"Authorization": "Bearer "+token,
			"content-type": "application/json",
			"cache-control": "no-cache",
			"X-CSRFToken":csrftoken
		},
		success:function(data){
			if(data){
				$('.name').html(data.name);
				console.log(data);
				console.log(data.name);
				$('#profile').attr('href','profile.html');
				$('.name').html(data.name);
				$('.position').html(data.designation);
				console.log(data);
			}
			else{
				console.log($(location).attr('href').substring($(location).attr('href').lastIndexOf('/')+1));
				$(location).attr('href','login.html?src='+$(location).attr('href').substring($(location).attr('href').lastIndexOf('/')+1));
			}	
		},
		error:function(error){
			$(location).attr('href','login.html?src='+$(location).attr('href').substring($(location).attr('href').lastIndexOf('/')+1));
			// console.log(error.responseText);
			
		}
	});
}
//dashboard call ends--------------------------------

//logout---------------------------------------------
$(document).on('click','#logout',function(){
	$.ajax({
		async:true,
		crossDomain:true,
		url:urlRoot+'logout',
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