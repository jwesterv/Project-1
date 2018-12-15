

//Global Vars
//========================
var database;



//Main
//====================

$(document).ready(function () {
  initDb();
  initMap();
  latLong();
  console.log(database.ref());

});



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


function initMap() 
{
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: -34.397, lng: 150.644}
  });
  var geocoder = new google.maps.Geocoder();
// function initMap() {

//   providerLat = 40.785091;
//   providerLong = -73.968285;
//   var providerLoc = { lat: providerLat, lng: providerLong };
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: providerLoc,
//     zoom: 16
//   });


  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
}
// {

//   providerLat = 40.785091;
//   providerLong = -73.968285;
//   var providerLoc = { lat: providerLat, lng: providerLong };
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: providerLoc,
//     zoom: 8
//   });
 

//   infoWindow = new google.maps.InfoWindow;
//   // Try HTML5 geolocation.
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function (position) {
//       var pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };

//       infoWindow.setPosition(pos);
//       infoWindow.setContent('Location found.');
//       infoWindow.open(map);
//       map.setCenter(pos);
//     }, function () {
//       handleLocationError(true, infoWindow, map.getCenter());
//     });
//   } else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
//   }
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(browserHasGeolocation ?
//     'Error: The Geolocation service failed.' :
//     'Error: Your browser doesn\'t support geolocation.');
//   infoWindow.open(map);


// }


//Creating a marker from user input

function geocodeAddress(geocoder, resultsMap) {
  var address = $('#address-input').val.trim;
  geocoder.geocode({'address-input': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}



// function latLong() {


//   database.ref().set(
//     {
//       lat: map.center.lat(),
//       lng: map.center.lng()

function mapsDb() {




}




  
// }


function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

geocodeAddress();

