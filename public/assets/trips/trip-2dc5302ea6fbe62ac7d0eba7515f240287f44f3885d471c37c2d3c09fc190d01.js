$(document).ready( function(){

	document.getElementsByClassName("new-location")[0].addEventListener('click', function(){
		$('.modal').modal("show");
		$('.modal').off('shown.bs.modal').on('shown.bs.modal', function () {
			initMap();
		});
	});

	$('.modal').on('hidden.bs.modal', function () {
		document.getElementsByClassName('modal-body')[0].innerHTML = `<img id="loadingMap" src="/loading.gif" style="display: block;">`;
		document.getElementById("latitude").value = "";
		document.getElementById("longitude").value = "";
		document.getElementById("cityName").value = "";
	});

	document.getElementById("add-location").addEventListener("click", function(){
		$('.modal').modal("hide");
		window.location.reload();
	});

	document.getElementById("initDate").addEventListener("change", function(){

	});
});
initLocationsMap();
