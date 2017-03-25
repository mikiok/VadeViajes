document.getElementById('sign-up-avatar').addEventListener('change', function(event) {
	var image = event.target.files[0];
  var reader = new FileReader();
  reader.onload = function(file) {
    document.getElementById('preview-avatar').setAttribute("src", file.target.result);
  }
  reader.readAsDataURL(image);
});