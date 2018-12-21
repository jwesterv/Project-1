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
initDb();
var uiConfig = {
    signInSuccessUrl: '<https://jwesterv.github.io/Project-1/d_board.html>',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: '<your-tos-url>',
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
        window.location.assign('<your-privacy-policy-url>');
    }
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);