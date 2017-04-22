
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
    var circus = new google.maps.LatLng(33.8128659,-84.3627253);
    var circusBound = new google.maps.LatLng(33.8528659,-84.4627253); 

    map = new google.maps.Map(document.getElementById('map'), {
        center: circus,
        zoom: 15
      });

    request = {
      location: circus,
      radius: '500',
      query: 'The Creative Circus'
    };
    var startingBounds = new google.maps.LatLngBounds(circus, circusBound);
    var options = {
      bounds: startingBounds,
      types: ['establishment']
    }
    autocomplete = new google.maps.places.Autocomplete(document.querySelector('.the-input'), startingBounds);

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
  }
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(results);
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      newResults = results;
    }
  }


  content = ""


