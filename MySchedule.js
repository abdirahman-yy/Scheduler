function changeimg(name, txt) {
    var theimage = document.getElementById("image");
    theimage.src = name;
    theimage.alt = txt;
  }

  function placeholder(name, txt, id, boolean) {
    var theimage = document.getElementById(id);
    theimage.src = name;
    theimage.alt = txt;
    theimage.hidden = boolean;
  }

  function inAndOut() {
    var button = document.getElementById('button');
    var theimage = document.getElementById('image');
    if (button.value == "Come back!") {
      fadeIn();
      button.value = "Go away!";
    } else {
      fadeOut();
      button.value = "Come back!";
    }
    button.innerHTML = button.value;
    
    function fadeIn() {
      var opacity = 0;
      var intervalId = setInterval(function() {
        opacity += 0.1;
        theimage.style.opacity= opacity;
        if (opacity >= 1) clearInterval(intervalId);
      }, 250);
    }
      
    function fadeOut() {
      var opacity = 1;
      var intervalId = setInterval(function() {
        opacity -= 0.1;
        theimage.style.opacity=opacity;
        if (opacity <= 0) clearInterval(intervalId);
      }, 250);
    }
  }

  function initMap() {
      var location = {lat: 44.9727, lng: -93.23540000000003};
      var map = new google.maps.Map(document.getElementById("map"), {center: location, zoom: 14});
      var directionDisplay = new google.maps.DirectionsRenderer();
      var directionService = new google.maps.DirectionsService();
      var geocoder = new google.maps.Geocoder();
      let mark = "";
      var eventName = document.getElementsByClassName("eventName");
      var eventLocation = document.getElementsByClassName("eventLocation");
      var eventDay = document.getElementsByClassName("eventDay");
      var eventTime = document.getElementsByClassName("eventTime");
      
      for (var i = 0; i < eventLocation.length; i++) {
        mark = eventName[i].textContent + ", " + eventDay[i].textContent + ", " + eventTime[i].textContent + ", " + eventLocation[i].textContent;
        innerGecoder(eventLocation[i].textContent, mark);
      }

      function innerGecoder(eventLocation, mark) {
        geocoder.geocode({'address': eventLocation}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            const icon = {
              url: 'img/Goldy.png',
              scaledSize: new google.maps.Size(45, 45),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(0, 0)
            };
            var marker = new google.maps.Marker({
              map: map, 
              position: results[0].geometry.location,
              title: mark,
              icon: icon
            });
            var infoWindow = new google.maps.InfoWindow({
              content: mark
            });
            marker.addListener("click", function() {
              infoWindow.open(map, marker);
            });
            iGlobal++;
          } else {
            alert("error: " + status);
          }
        });
      }
    }

  function toLocation(position) {
    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer();
    let transportationType = document.querySelector('input[name="transportation"]:checked').value;
    let userDestination = document.getElementById('directions').value;
    let userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude };
    directionsRenderer.setMap(map);
    let sideBar = document.getElementById("sidebar")
    directionsRenderer.setPanel(sideBar);
    let request = {
      origin: userLocation,
      destination: userDestination,
      travelMode: transportationType
    };
    directionsService.route(request, function(result, status) {
    if (status === 'OK') {
      directionsRenderer.setDirections(result);
    } else  {
        alert("error")
    }
  });
  };

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(toLocation);
    } else {
        alert("error")
    }
  }
