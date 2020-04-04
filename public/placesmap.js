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
        clickableIcons: false
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
      }



function updateDate() {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", '/', true);
    xhr.send();
    var date= new Date();
    document.getElementById("last_open").innerHTML = `last open on ${date.getDate()}/ ${date.getMonth()} /${date.getFullYear()}`;
}

var infowindow = new google.maps.InfoWindow();
//to add infowindow for each marker
function set_markers(array) {

    for (var i = 0; i < array.length; i++) {

        var location = array[i];
        var myLatLng = new google.maps.LatLng(location.latitude , location.longitude);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: location.shop_name
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(
              `<div id="bodyContent">
                <p>
                  <strong>Shopname: </strong> </br>
                  <strong>Home Delivery: </strong> </br>
                  <strong>Items Sold: </strong> </br>
                  <strong>Phone Number: </strong> </br>
                  <i id="last_open">last open on ${this.last_open.getDate()} /${this.last_open.getMonth()} /${this.last_open.getFullYear()} 
                   </i> </br></br>
                  <a href="javascript:updateDate()"><strong>Was the shop open today?</strong></a>
                </p>                
              </div>`
            );
            infowindow.open(map, this);
        });
    }
}
