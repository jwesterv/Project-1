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

var auth = firebase.auth();

auth.signInWithEmailAndPassword(email, pass);

auth.createUserWithEmailAndPassword(email, pass);

auth.onAuthStateChanged(firebaseUser => { });

//Gathering elements from form data

var txtEmail = $("#txtEmail")
var txtPassword = $("#txtPassword")
var btnLogin = $("#btnLogin")
var btnSignUp = $("#btnSignUp")
var btnLogout = $("#btnLogout")

//Signup Event

$("btnSignUp").click(function () {
  //email and password retrieval
  var email = txtEmail.value;
  var pass = txtPassword.value;
  var auth = firebase.auth();

  //Sign Up
  var promise = auth.signUpWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
});

//Login event

$("btnLogIn").click(function () {
  //email and password retrieval
  var email = txtEmail.value;
  var pass = txtPassword.value;
  var auth = firebase.auth();

  //Sign In
  var promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
});

//Log out

btnLogout.addEventListener("click", e => {
  fire.auth().signOut();
})

//Listener
firebase.auth().onAuthStateChanged(function (firebaseUser) {
  if (firebaseUser) {
    console.log(firebaseUser);
    // User is signed in.
    var displayName = firebaseUser.displayName;
    var email = firebaseUser.email;
    var emailVerified = firebaseUser.emailVerified;
    var photoURL = firebaseUser.photoURL;
    var isAnonymous = firebaseUser.isAnonymous;
    var uid = firebaseUser.uid;
    var providerData = firebaseUser.providerData;
    btnLogout.classList.remove("hide");
  }
  else {
    //User is signed out
    console.log("not logged in")
  }
})



