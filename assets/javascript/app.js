//Global Vars

//========================
var database;
var providerLat;
var providerLong;

var user = {
  userId: 0,
  isProvider: false,
  first: "", // google first name
  middle: "", // google middle name
  last: "", // google last name
  email: "", // google email
  phone: 800-123-4567,
  region: "", // google region
  pic: "assets/images/pic.png", // google profile picture
  width: 100, // picture width
  height: 100, // picture height
  make: "Tesla",
  model: "",
  hasCable: "",

};

var station = {
  isOpen: false,
  waitTime: 0,
  inUse: false,
  marker: "newObj",
  services: false,
  numSockets: 0
  
};

var socket = {
  type: ""
};

var charger = {
  type: "",
  numSockets: 1
};




//Main
//====================

$(document).ready(function () {
  initDb();
  // gl();
  providerMap(40.785091, -73.968285);

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
  //}

  //click handler for switching from userDash to providerDash and vice-versa
  $(document).on("click", "#switch", function() {
    switchDash();
  });
  //switch from user dash to provider dash, and vice-versa
  function switchDash(){
    if (window.location === "userDash url") { //TODO: add url for userDash
      window.location = "providerDash url"; //TODO: add url for providerDash
    } else if (window.location === "providerDash url") { //TODO: add url for providerDash
      window.location = "userDash url"; //TODO: add url for userDash
    }
  }
  //grab from form and send to database
  function sendUserInfo(){
    //grab inputs from account info form
      var first = $("#firstName-input").val().trim();
      var last = $("#lastName-input").val().trim();
      var model = $("#model-input").val().trim();
      var email = $("#email-input").val().trim();
      var phone = $("#phone-input").val().trim();
      //send new user values to firebase
      database.ref(this.user).set({
        first: first,
        last: last,
        email: email,
        phone: phone,
        model: model
      });

      //if user is a provider as well, then we need to grab and send more values to firebase
      if (isProvider) {
        var address = $("#address-input").val().trim();
        var socketType = $("#type-input").val().trim();//type of socket?
        var numSockets = $("#socket-input").val().trim();//how many sockets in charger  
        
        //send station info to firebase
        database.ref(station).set({
          numSockets: numSockets,
        });

        //send charger info to firebase
        database.ref(socket).set({
          type: socketType,
        });
      }

    }

  //append provider info on dash in cards
  function appendProviderInfo(){
    //grab info from firebase
    database.ref(this.user).on("value", function(snapshot){
      var first = snapshot.val().first;
      var last = snapshot.val().last;
      var address = snapshot.val().address;
      var phone = snapshot.val().phone;
      var pic = snapshot.val().pic;
      
    });

    console.log("First name: " + first);
    console.log("Last name: " + last);
    console.log("Address: " + address);
    console.log("Phone number: " + phone);

    database.ref(this.charger).on("value", function(snapshot){
      var type = snapshot.val().type;
    });
    //log charger type
    console.log("Charger type: " + type);

    //append info to provider cards
    $("#provider-pic").append(pic);
    $("#provider-name").text(first + " " + last);
    $("#provider-phone").text(phone);
    $("#provider-address").text(address);
    $("#charger-type").append(type);
  }

});