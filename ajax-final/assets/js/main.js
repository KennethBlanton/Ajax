console.log("Hello World from main.js!");
var results;
var TheCounted = (function(){
	function getResults(place) {
		var url = "https://thecountedapi.com/api/counted?state=" + place;
		console.log(url);
		$.ajax({
		  url: url,
		  method: 'GET',
		}).done(function(result) {
			console.log(result)
			console.log(place);
			GoogleModule.populate(result, place);
		}).fail(function(err) {
		  throw err;
		});
	}
	var shared = {};
	shared = {
		getResults:getResults
	}
	return shared

})();

var GoogleModule = (function() {
	var shared = {};
	var map;
	var geocoder;
	function initMap() {
		geocoder = new google.maps.Geocoder();
		var ccLatlng = {
			lat: 33.813415,
			lng: -84.361841,
		}  
	  	map = new google.maps.Map(document.getElementById('map'), {
	    	center: ccLatlng,
	    	zoom: 8
	  	});

	  // var stuff= createMarker("test",ccLatlng.lat, ccLatlng.lng);
	  autoComplete();

    }

    function createMarker (tweet, lat, lng) {

    	var infowindow = new google.maps.InfoWindow ({
          content: tweet,
        });

    	var marker = new google.maps.Marker ({
          position: {lat:lat, lng:lng},
          map: map
        });

        marker.addListener ( "click", function () {
          infowindow.open ( map, marker );
        });
    }
    function createMarkerAddress(data) {
    	var address = data.address + ',' + data.state;
			var content = '<p>Address:' + address+
						 '</p><p> Age:' + data.age+
						 '</p><p> Armed:' + data.armed+
						 '</p><p> Cause:' + data.cause+
						 '</p><p> Name:' + data.name+
						 '</p><p> Race:' + data.race;

			geocoder.geocode( { 'address': address}, function(result, status) {
      			if (status == 'OK') {
	        		var marker = new google.maps.Marker({
        				map: map,
       					position: result[0].geometry.location
   					 })
	        		var infowindow = new google.maps.InfoWindow ({
          				content: content,
        			});
        			marker.addListener ( "click", function () {
          				infowindow.open ( map, marker );
        			});
		        		
		       		
		       		
		        	
      			} 
			});
    }
    function autoComplete() {
    	var input = document.getElementById('input');
    	var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);
        autocomplete.addListener('place_changed', function() {
          var place = autocomplete.getPlace();
          results = TheCounted.getResults(place.address_components[0].short_name);
          console.log(google.maps.places);
          if (!place.geometry) {
            return;
          }
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(8);
          }
          var marker = new google.maps.Marker({
          	position: place.geometry.location,
          	map:map
          })
          marker.setPosition(place.geometry.location);
          marker.setVisible(false);

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }

          // infowindowContent.children['place-icon'].src = place.icon;
          // infowindowContent.children['place-name'].textContent = place.name;
          // infowindowContent.children['place-address'].textContent = address;
          // infowindow.open(map, marker);
        });
    }
    function populate(results, place) {
    	console.log(results);
    	var data = results;
    	for (var j = data.length - 1; j >= 0; j--) {
    		createMarkerAddress(data[j])		
    	}
    }

   	shared = {
   		init: initMap,
   		createMarker:createMarker,
   		auto:autoComplete,
   		populate:populate
	}
	return shared;

}());





