$(document).ready(function(){
	var formdata='';
	$.ajax({
		async: true,
		crossDomain: true,
		url:urlRoot+'contacts/form-data',
		type:'GET',
		datatype:'JSON',
		headers: {
			"content-type": "application/json",
			"cache-control": "no-cache"
		  },
		success:function(data){
			if(data!=null){
				formdata=data;
			}	
		},
		error:function(error){
			console.log(error.responseText)
		}
	});
	$.ajax({
		async: true,
		crossDomain: true,
		url:urlRoot+'employees/1/',
		type:'GET',
		datatype:'JSON',
		headers: {
			"content-type": "application/json",
			"cache-control": "no-cache"
		  },
		success:function(data){
			if(data!=null){
				$('.name').html(data.name);
				$('.position').html(formdata.designations.find(function(desig){
					return desig.id===data.designation;
				}).designation);
				$('#profile').attr('href','profile.html');
				$(document).on('click','#logout',function(){
					$.ajax({
						async:true,
						crossDomain:true,
						url:'http://35.202.86.61/office-management/employees/logout',
						type:'GET',
						headers: {
							"content-type": "application/json",
							"cache-control": "no-cache"
						  },
						success:function(data){
							var urL = 'http://35.202.86.61/office-management-ui/login.html';
                        	$(location).attr('href',urL);
						}	
					});
				})
			}	
		},
		error:function(error){
			console.log(error.responseText)
		}
	});
	//$("span.line").peity("line",{ width: 200 });
	// $.ajax({
	// 	async: true,
	// 	crossDomain: true,
	// 	url:'http://35.202.86.61/office-management/employees/dashboard',
	// 	type:'GET',
	// 	datatype:'JSON',
	// 	headers: {
	// 		"content-type": "application/json",
	// 		"cache-control": "no-cache"
	// 	  },
	// 	success:function(data){
	// 		if(data!=null){
	// 			$('.name').html(data.name);
	// 			console.log(data);
	// 			console.log(data.name);
	// 		}	
	// 	},
	// 	error:function(error){
	// 		console.log(error.responseText)
	// 	}
	// });
});