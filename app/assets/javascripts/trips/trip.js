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
			printusers();
		}
	};
	http.send();
}
function printUsers(users){



	var array = ($.map(users, function (value) {
		if(value.avatar == "/avatars/original/missing.png"){
			var avatar = "https://www.gravatar.com/avatar/0?d=mm&f=y&s=40x40";
		}else{
			var avatar = value.avatar;
		}
		return {
			label: value.fullname,
			value: value.id,
			avatar: avatar
		}
	}));


	
	users.forEach(function(user){
		var outputUser= `<div class='user'> <img class='avatar' 
			src='/system/users/avatars/000/000/001/common/Screenshot_from_2017-02-15_14-49-50.png?1491216693' 
			alt='Screenshot from 2017 02 15 14 49 50'> Miguel Sánchez-Brunete Álvarez 
			<form class='button_to' method='post' action='/trips/9/add_user.1'>
				<input class='add-user-button' type='submit' value='Add'>
				<input type='hidden' name='authenticity_token' 
				value='ZxNxS5pcujYJNwb+QXaPQOTi11qnLHb2O/TqLjNFrx4DQlRRXn0XKvMMx0JdNW5CLHIbo9Dh4EQem9NZhEsNrw=='>
			</form> 
			</div>`
	});
}
