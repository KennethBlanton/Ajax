var map;
var service;
var infowindow;
var info = '2620 paces view';
var request;
var newResults;
document.querySelector('form').addEventListener("submit", function(e){
  e.preventDefault();
  request.query = document.querySelector('.the-input').value;
  console.log('hit');
  console.log(info);
  service.textSearch(request, callback);
})

function createMarker(place) {
  var infowindow = new google.maps.InfoWindow({
    content: place.name
  });
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}
function initialize() {
  var pyrmont = new google.maps.LatLng(33.8128659,-84.3627253);

  map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

  request = {
    location: pyrmont,
    radius: '500',
    query: 'The Creative Circus'
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log(results);
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
    newResults = results;
  }
}


content = ""