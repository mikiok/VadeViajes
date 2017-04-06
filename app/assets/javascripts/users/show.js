$('button').on('click', function(){
  $('button').removeClass('selected');
  var trip = "." + this.className.toString() + "-list";
  $(this).addClass('selected');
  $('ul[class*="list"]').css("display","none");
  $(trip).css("display","block");
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