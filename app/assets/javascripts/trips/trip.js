$(document).ready( function(){

	document.getElementsByClassName("new-location")[0].addEventListener('click', function(){
		$('.new-location-modal').modal("show");
		$('.new-location-modal').off('shown.bs.modal').on('shown.bs.modal', function () {
			initMap();
		});
	});

	document.getElementById("initDate").addEventListener('change', function(){
		document.getElementById("endDate").value = document.getElementById("initDate").value;
		document.getElementById("endDate").min = document.getElementById("initDate").value;
	});

	$('.new-location-modal').on('hidden.bs.modal', function () {
		document.getElementsByClassName('new-location-modal-body')[0].innerHTML = `<img id="loadingMap" src="/loading.gif" style="display: block;">`;
		document.getElementById("latitude").value = "";
		document.getElementById("longitude").value = "";
		document.getElementById("cityName").value = "";
	});

	document.getElementById("add-location").addEventListener("click", function(){
		$('.new-location-modal').modal("hide");
	});


	document.getElementsByClassName("addUser")[0].addEventListener('click', function(){
		$('.add-user-modal').modal("show");
	});

	document.getElementsByClassName("accept-delete-users")[0].addEventListener('click', function(){
		window.location.reload();
	});

	document.getElementsByClassName("accept-add-users")[0].addEventListener('click', function(){
		window.location.reload();
	});

	document.getElementsByClassName("deleteUser")[0].addEventListener('click', function(){
		$('.delete-user-modal').modal("show");
	});


	Array.from(document.getElementsByClassName("add-user-button")).forEach(function(element) {
    element.addEventListener('click', function(){
	    $.notify("User added", "success");
	  });
  });

  Array.from(document.getElementsByClassName("delete-user-button")).forEach(function(element) {
    element.addEventListener('click', function(){
	    $.notify("User deleted", "success");
	  });
  });
});
initLocationsMap();

function filterUsers() {

	var http = new XMLHttpRequest();
	http.open("GET", "/users.json", true);

	http.onreadystatechange = function(){

		if(http.readyState == 3){
			console.log("Loading...");
		}

		if(http.readyState == 4){
			var users = JSON.parse(http.response);
			//printUsers(users);
		}
	};
	http.send();
}
function printUsers(users){
	users.forEach(function(value){
		if(value.avatar == "/avatars/original/missing.png"){
			var avatar = "https://www.gravatar.com/avatar/0?d=mm&f=y&s=40x40";
		}else{
			var avatar = value.avatar;
		}
		var outputUser= `<div class='user'> <img class='avatar' 
			src="` + avatar + `" >`+ value.fullname + `
			<form class='button_to' method='post' action='/trips/9/add_user.` + value.id + `'>
				<input class='add-user-button' type='submit' value='Add'>
				<input type='hidden' name='authenticity_token' 
				value="<%= form_authenticity_token %>">
			</form> 
			</div>`;
		document.getElementsByClassName('filtered-users')[0].innerHTML += outputUser;
	});
}
