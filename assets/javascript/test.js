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

var provider = new firebase.auth.GoogleAuthProvider();