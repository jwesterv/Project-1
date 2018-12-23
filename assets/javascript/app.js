//Global Vars

//========================
var database;


var user = {
  userId: 0,
  isProvider: false,
  first: "John", // google first name
  middle: "", // google middle name
  last: "Doe", // google last name
  email: "jdoe@me.com", // google email
  phone: "800-555-1212",
  region: "New York", // google region
  pic: "assets/images/pic.png", // google profile picture
  width: 100, // picture width
  height: 100, // picture height
  make: "Tesla", //make of the user's car
  hasCable: "no", // if user has a cable
  provider: { //main provider object 
    station: { //main station object
      marker: { //google marker for the station
        region: "New York", // region of the station
        lat: 40.785091, //latitude of the station
        lng: -73.968285 // longitude of the station
      },
      hasCable: "no", //does station have a cable
      isOpen: false, //is the station open for business
      waitTime: 0, //what is the waittime for the station
      services: false, //other available services at the station
      totalSockets: 0, //total available sockets at the station
      charger: { //charger on the station
        numSockets: 1, //number of sockets on the charger
        inUse: false //is the charger in use
      }
    }
  }

};





//Main
//====================

$(document).ready(function () {
  initDb();
  gl();
  $("#providerLoc").on("click", function () {
    providerMap();
  });

  $("#pushUser").on("click", function () {
    $("#user").empty();
    pushUser();
  }
  );

  $("#pullUser").on("click", function () {
    $("#user").empty();
    pullUser();
  }
  );



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


function providerMap(providerLat, providerLong) {

  providerLat = user.provider.station.marker.lat;
  providerLong = user.provider.station.marker.lng;

  var providerLoc = { lat: providerLat, lng: providerLong };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: providerLoc,

  });

  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function () {
    geocodeAddress(geocoder, map);
  });



}

function geocodeAddress(geocoder, resultsMap) {
  console.log(geocoder);
  console.log(user);
  var address = document.getElementById('address').value;

  geocoder.geocode({ 'address': address }, function (results, status) {
  
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
     
      });
      console.log(marker.position.lat());
      console.log(marker.position.lng());
      console.log(user.provider.station.marker.lat);
     // console.log(marker.position.lat());
     
  database.ref("user2").push(
    {
      lat: marker.position.lat(),
      lng: marker.position.lng(),

    });
    console.log(database.ref("user2").child.key);
    console.log(marker.position.lat());
        console.log(user.provider.station.marker.lat);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function gl() {

  var map, infoWindow;

  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6
  });
  infoWindow = new google.maps.InfoWindow;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function () {
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

function pullUser() {
  database.ref().on("child_added", function (snapshot) {
    var data = snapshot.val();
    var newRow = $("<div class='row'>");
    console.log(data);
    var colName = "<div class='col'>" + data.user.first + " " + data.user.last + "</div> ";
    var colemail = "<div class='col'>" + data.user.email + "</div> ";
    var colphone = "<div class='col'>" + data.user.phone + "</div> ";

    newRow.append(colName, colemail, colphone);
    $("#user").append(newRow);

  })
}
function pushUser() {
  // push data to Firebase
  database.ref().push(
    {
      user: user,


    })
console.log(database.ref().child().key);
}



function pushMarker() {
  var myLatLng = { lat: -25.363, lng: 131.044 };

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
}


