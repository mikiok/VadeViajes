function initMap() {

	var http = new XMLHttpRequest();
	http.open("GET", "http://ip-api.com/json", true);

	http.onreadystatechange = function(){

		if(http.readyState == 3){
			console.log("Loading...");
		}

		if(http.readyState == 4){
			document.getElementsByClassName('modal-body')[0].innerHTML = `<div id="map"></div>`;
			var loc = JSON.parse(http.response);

			console.log(loc);
			var map = new google.maps.Map(document.getElementById('map'), {
				minZoom: 1,
				center: {lat: parseFloat(loc.lat), lng: parseFloat(loc.lon)},
				zoom: 8
			});

			var input = document.createElement("input");
			input.type="text";
			input.id="pac-input";
			input.className="controls";
			input.placeholder="Enter a location";

			var autocomplete = new google.maps.places.Autocomplete(input);
			autocomplete.bindTo('bounds', map);

			map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

			var geocoder = new google.maps.Geocoder;
			var infowindow = new google.maps.InfoWindow();
			var marker = new google.maps.Marker({
				map: map
			});

			autocomplete.addListener('place_changed', function() {
				infowindow.close();
				var place = autocomplete.getPlace();
				if (!place.geometry) {
					return;
				}

				if (place.geometry.viewport) {
					map.fitBounds(place.geometry.viewport);
				} else {
					map.setCenter(place.geometry.location);
					map.setZoom(17);
				}
			});

			var marker;
			google.maps.event.addListener(map, 'click', function(event) {
				placeMarker(event.latLng);
				geocodeLatLng(geocoder, event.latLng);
			});

			function placeMarker(location) {
				removeMarker(marker);
				marker = new google.maps.Marker({
					position: location, 
					map: map
				});
				document.getElementById("latitude").value = marker.position.lat().toFixed(3);
				document.getElementById("longitude").value = marker.position.lng().toFixed(3);
			}

			function removeMarker(marker) {
				marker.setMap(null);
			}

			function geocodeLatLng(geocoder, position) {
				var latlng = {lat: position.lat(), lng: position.lng()};
				geocoder.geocode({'location': latlng}, function(results, status) {
					if (status === 'OK') {
						if (results[1]) {
							document.getElementById("cityName").value = results[1].address_components[1].long_name;
						}
					}
				});
			}

			google.maps.event.addListener(map, 'center_changed', function() {
				checkBounds(map);
			});

			function checkBounds(map) {

				var latNorth = map.getBounds().getNorthEast().lat();
				var latSouth = map.getBounds().getSouthWest().lat();
				var newLat;

				if(latNorth<85 && latSouth>-85)
					return;
				else {
					if(latNorth>85 && latSouth<-85)
						return;
					else {
						if(latNorth>85)
							newLat =  map.getCenter().lat() - (latNorth-85);
						if(latSouth<-85)
							newLat =  map.getCenter().lat() - (latSouth+85);
					}
				}
				if(newLat) {
					var newCenter= new google.maps.LatLng( newLat ,map.getCenter().lng() );
					map.setCenter(newCenter);
				}   
			}
		}
	};
	http.send();
}

function initLocationsMap() {
	var tripId = document.getElementById('tripInformation').getAttribute('data-id');
	var http = new XMLHttpRequest();
	http.open("GET", `/trips/${tripId}.json`, true);

	http.onreadystatechange = function(){
		if(http.readyState == 3){
			console.log("Loading...");
		}

		if(http.readyState == 4){
			var locs = JSON.parse(http.response);
			var length = locs.length;
			var labels = 'BCDEFGHIJKLMNOPQRSTUVWXYZ';
			var labelIndex = 0;
			var directionsService = new google.maps.DirectionsService;
			var directionsDisplay = new google.maps.DirectionsRenderer();

			var locationsMap = new google.maps.Map(document.getElementById('locationsMap'), {
				zoom: 8,
				minZoom: 2,
				scrollwheel: false
			});

			var bounds = new google.maps.LatLngBounds();

			directionsDisplay.setMap(locationsMap);

      for (var i = 1; i < (length - 1); i++){
        placeMarker(locs[i]);
      }

			locationsMap.fitBounds(bounds);
			calculateAndDisplayRoute(directionsService, directionsDisplay);


			var marker = new google.maps.Marker({
				map: locationsMap
			});

			function placeMarker(location) {
				marker = new google.maps.Marker({
					position: {lat: parseFloat(location.latitude), lng: parseFloat(location.longitude)}, 
					label: labels[labelIndex++ % labels.length],
					map: locationsMap
				});
				var place = new google.maps.LatLng(parseFloat(location.latitude), parseFloat(location.longitude));
				bounds.extend(place);
			}



			google.maps.event.addListener(locationsMap, 'center_changed', function() {
				checkBounds(locationsMap);
			});

			function checkBounds(locationsMap) {

				var latNorth = locationsMap.getBounds().getNorthEast().lat();
				var latSouth = locationsMap.getBounds().getSouthWest().lat();
				var newLat;

				if(latNorth<85 && latSouth>-85)
					return;
				else {
					if(latNorth>85 && latSouth<-85)
						return;
					else {
						if(latNorth>85)
							newLat =  locationsMap.getCenter().lat() - (latNorth-85);
						if(latSouth<-85)
							newLat =  locationsMap.getCenter().lat() - (latSouth+85);
					}
				}
				if(newLat) {
					var newCenter= new google.maps.LatLng( newLat ,locationsMap.getCenter().lng() );
					locationsMap.setCenter(newCenter);
				}   
			}

      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var waypts = [];
        for (var i = 1; i < (length - 1); i++){
          waypts.push({
            location: new google.maps.LatLng(parseFloat(locs[i].latitude), parseFloat(locs[i].longitude)),
            stopover: true
          });
        }

        directionsService.route({
          origin: new google.maps.LatLng(parseFloat(locs[0].latitude), parseFloat(locs[0].longitude)),
          destination: new google.maps.LatLng(parseFloat(locs[length-1].latitude), parseFloat(locs[length-1].longitude)),
          waypoints: waypts,
          travelMode: 'DRIVING',
          //optimizeWaypoints: true,
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert("No routes avaliable");
            directionsDisplay.setDirections(response);
          }
        });
      }
		}
	};
	http.send();
}
;
