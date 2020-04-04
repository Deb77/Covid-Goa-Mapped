
    //MAP INITIALISATION
    var map;
    const GOA_BOUNDS={
                      north: 15.83,
                      south: 14.92,
                      west: 73.6,
                      east: 74.36,
                      };
    function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 15.4, lng: 73.8},
          zoom: 13,
          restriction: {
            latLngBounds: GOA_BOUNDS,
            strictBounds: false,
          },
          options: {
            clickableIcons: true
          },
          mapTypeId: 'roadmap'
        });
        
            // Create the search box and link it to the UI element.
            var input = document.getElementById('pac-input');
            var searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.LEFT_TOP].push(input);

            // Bias the SearchBox results towards current map's viewport.
            map.addListener('bounds_changed', function() {
              searchBox.setBounds(map.getBounds());
            });

            var markers = [];
            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener('places_changed', function() {
              var places = searchBox.getPlaces();

              if (places.length == 0) {
                return;
              }

              // Clear out the old markers.
              markers.forEach(function(marker) {
                marker.setMap(null);
              });
              markers = [];

              // For each place, get the icon, name and location.
              var bounds = new google.maps.LatLngBounds();
              places.forEach(function(place) {
                if (!place.geometry) {
                  console.log("Returned place contains no geometry");
                  return;
                }
                var icon = {
                  url: place.icon,
                  size: new google.maps.Size(71, 71),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
                  scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                  map: map,
                  icon: icon,
                  title: place.name,
                  position: place.geometry.location
                }));

                if (place.geometry.viewport) {
                  // Only geocodes have viewport.
                  bounds.union(place.geometry.viewport);
                } else {
                  bounds.extend(place.geometry.location);
                }
              });
              map.fitBounds(bounds);
            });


            //SETTING MARKER ON CLICK ON MAP
                                        var markersArray = [];

                                        // add a click event handler to the map object
                                        google.maps.event.addListener(map, "click", function(event)
                                        {
                                            // place a marker
                                            placeMarker(event.latLng);

                                            document.getElementById("Latt").value = event.latLng.lat();
                                            document.getElementById("Long").value = event.latLng.lng();
                                        });

                                        function placeMarker(location) {
                                        // first remove all markers if there are any
                                        deleteOverlays();

                                        var marker = new google.maps.Marker({
                                            position: location, 
                                            map: map
                                        });

                                        // add marker in markers array
                                        markersArray.push(marker);

                                        //map.setCenter(location);
                                        }

                                        // Deletes all markers in the array by removing references to them
                                        function deleteOverlays() {
                                        if (markersArray) {
                                            for (i in markersArray) {
                                                markersArray[i].setMap(null);
                                            }
                                        markersArray.length = 0;
                                        }
                                        }
          }
