$(document).ready(function(){
	$("span.line").peity("line",{ width: 200 });
	
//formdata----------------------------
	var formdata='';
	$.ajax({
		async: true,
		crossDomain: true,
		url:urlRoot+'common/form-data',
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
//formdata call ends------------------------------
//dashboard call----------------------------------	
	$.ajax({
		async: true,
		crossDomain: true,
		url:'http://35.202.86.61/office-management/employees/dashboard',
		type:'GET',
		datatype:'JSON',
		headers: {
			"content-type": "application/json",
			"cache-control": "no-cache"
		  },
		success:function(data){
			if(data!=null){
				$('.name').html(data.name);
				console.log(data);
				console.log(data.name);
//employee call--------------------------
				$.ajax({
					async: true,
					crossDomain: true,
					url:urlRoot+'employees/'+data.id+'/',
					type:'GET',
					datatype:'JSON',
					headers: {
						"content-type": "application/json",
						"cache-control": "no-cache"
					  },
					success:function(data2){
						if(data!=null){
							$('.name').html(data2.name);
							$('.position').html(formdata.designations.find(function(desig){
								return desig.id===data2.designation;
							}).designation);
							$('#profile').attr('href','profile.html');
							
						}	
					},
					error:function(error){
						console.log(error.responseText)
					}
				});
//employee call ends---------------------------------
			}
			else{
				var urL = 'http://35.202.86.61/office-management-ui/login.html';
				$(location).attr('href',urL);
			}	
		},
		error:function(error){
			console.log(error.responseText)
		}
	});
//dashboard call ends---------------------


//logout----------------
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
	});
//logout done-------------------
});