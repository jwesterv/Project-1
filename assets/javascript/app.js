//Global Vars

//========================
var database;
var providerLat;
var providerLong;

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
        lat: "40.785091", //latitude of the station
        lng: "-73.968285" // longitude of the station
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
console.log(user.provider.station.charger.numSockets);





//Main
//====================

$(document).ready(function () {
  initDb();
  // gl();
  providerMap(40.785091, -73.968285);

  $("#pushUser").on("click", function(){
    $("#user").empty();
    pushUser();
  }
    );

    $("#pullUser").on("click", function(){
      $("#user").empty();
      pullUser();
    }
      );
 
  

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
    console.log(geocoder);
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
      center: { lat: -34.397, lng: 150.644 },
      zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
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
    // Set data to Firebase
    database.ref().push(
      {
        user: user,


      })

  }



  function pushMarker() {
    var myLatLng = {lat: -25.363, lng: 131.044};

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


});