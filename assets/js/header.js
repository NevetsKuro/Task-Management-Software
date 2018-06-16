//session checker---------------------------------------------
$(document).ready(function(){
	var urlRoot = 'http://35.202.86.61/office-management/';
//dashboard call----------------------------------	
var token=localStorage.getItem('token');	

	$.ajax({
		async: true,
		crossDomain: true,
		url:urlRoot+'current_user',
		type:'GET',
		headers: {
			"content-type": "application/json",
			"cache-control": "no-cache",
			"X-CSRFToken":csrftoken,
			"Authorization":"Bearer "+token
		},
		processdata:false,
		data: "{\n    \"note\": \"stringchanged\",\n    \"status\": \"P\",\n    \"date\": \"2018-06-13\",\n    \"time\": \"02:30:00\",\n    \"employee\": 1,\n    \"sub_task\": null\n}",
		success:function(user){
			if(user){
				$('.name').html(user.name);
				console.log(user);
				console.log(user.name);
				$('#profile').attr('href','profile.html');
				$('.name').html(user.name);
				$('.position').html(user.designation);
				console.log(user);
			}
			else{
				console.log($(location).attr('href').substring($(location).attr('href').lastIndexOf('/')+1));
				$(location).attr('href','login.html?src='+$(location).attr('href').substring($(location).attr('href').lastIndexOf('/')+1));
			}	
		},
		error:function(error){
			$(location).attr('href','login.html?src='+$(location).attr('href').substring($(location).attr('href').lastIndexOf('/')+1));
			console.log(error.responseText);
			
		}
	});

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