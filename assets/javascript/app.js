

//Global Vars
//========================
var database;










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


function initMap() {
  
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 33.645, lng: -117.835 },
    zoom: 8
    
  });
  
  console.log(map);
}

function latLong() {
  database.ref().set(
    {
    lat: map.center.lat(),
    lng: map.center.lng()

  })
  console.log(map.center.lat());
  console.log(map.center.lng());
};





//Main
//====================

$(document).ready(function () {
  initDb();
  initMap();
  latLong(database);
  console.log(database.ref());

});




