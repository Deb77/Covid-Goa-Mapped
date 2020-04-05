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
            infowindow.setContent('<h3>' + this.title + '</h3>');
            infowindow.open(map, this);
        });
    }
}