
  	var socket = io.connect('https://notification-server1.herokuapp.com');
	  socket.emit('authentication', { token : localStorage.getItem('token') });

	socket.on('notification', function (data) {
		let p_tag = document.createElement('p');
		let notification = document.createTextNode(data.notification);
		p_tag.appendChild(notification)
		document.getElementById("notif").appendChild(p_tag); 
	});