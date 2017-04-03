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
		window.location.reload();
	});
});
initLocationsMap();
