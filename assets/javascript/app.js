// Initialize Firebase
var config = {
    apiKey: "AIzaSyBDePTrOsNhOnorUCJS5lvr00vfBUfO35g",
    authDomain: "train-scheduler-d38ac.firebaseapp.com",
    databaseURL: "https://train-scheduler-d38ac.firebaseio.com",
    projectId: "train-scheduler-d38ac",
    storageBucket: "train-scheduler-d38ac.appspot.com",
    messagingSenderId: "321445096848"
  };

  firebase.initializeApp(config);

  //set database as a variable
  var database = firebase.database();