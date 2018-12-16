//Global Vars
//========================
var database;
var providerLat;
var providerLong;
var user = [{
  userId: 0,
  isProvider: false,
  first: "", // google first name
  middle: "", // google middle name
  last: "", // google last name
  email: "", // google email
  region: "", // google region
  pic: "assets/images/pic.png", // google profile picture
  width: 100, // picture width
  height: 100, // picture height
  make: "",
  hasCable: "",

}];




//Main
//====================

$(document).ready(function () {
  initDb();
  providerMap(40.785091, -73.968285);
  geocodeAddress();

  console.log(database.ref());





  //Functions
  //==================

  function initDb() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyC6eAPWuYgz1OEsS8mvrkNfu4XYduyD5aE",
      authDomain: "project1-8e6c3.firebaseapp.com",
      databaseURL: "https://project1-8e6c3.firebaseio.com",
      projectId: "project1-8e6c3",
      storageBucket: "project1-8e6c3.appspot.com",
      messagingSenderId: "853012909302"
    };
    firebase.initializeApp(config);
    database = firebase.database();
  }


  function providerMap(providerLat, providerLong) {

    var providerLoc = { lat: providerLat, lng: providerLong };
    var providerMap = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: providerLoc
    });
    var geocoder = new google.maps.Geocoder();
    console.log(geocoder);



    document.getElementById('submit').addEventListener('click', function () {
      geocodeAddress(geocoder, providerMap);
    });



  }

  function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({ 'address': address }, function gg(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
        console.log(marker.position.lat());
        console.log(marker.position.lng());
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  function gl() {

    // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var map, infoWindow;
  
        map = new google.maps.Map(document.getElementById('map2'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 6
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }



    {



    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);


    }
  }

  //Set data to Firebase
  //   database.ref().set(
  //     {
  //       lat: map.center.lat(),
  //       lng: map.center.lng()

  



});