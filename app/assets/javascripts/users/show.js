document.getElementById('upload-avatar').addEventListener('change', function(event) {
	var image = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(file) {
    document.getElementById('avatar').setAttribute("src", "/uploading.gif");
  }
  reader.readAsDataURL(image);

	$("#myForm").submit();
});