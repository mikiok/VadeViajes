$('button[class*="trips"]').on('click', function(){
  $('button[class*="trips"]').removeClass('selected');
  var trip = "." + this.className.toString();
  trip = trip.split('-')[0] + "container-" + trip.split("-")[1];
  console.log(trip);
  $(this).addClass('selected');
  $('div[class*="tripscontainer"]').css("display","none");
  $(trip).css("display","block");
});

document.getElementsByClassName("new-trip")[0].addEventListener('click', function(){
	$('.new-trip-modal').modal("show");
});
document.getElementById('upload-avatar').addEventListener('change', function(event) {
	var image = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(file) {
    document.getElementById('avatar').setAttribute("src", "/uploading.gif");
  }
  reader.readAsDataURL(image);

	$(".edit_user").submit();
});

document.querySelector(".trip-initdate").addEventListener('change', function(){
  document.querySelector(".trip-enddate").setAttribute("min", this.value);
});