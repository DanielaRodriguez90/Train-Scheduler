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

  //clic listener for button adding new train
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    //grab train inputs on form
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(),"H:M").format("H:M");
    var frequency = $("#frequency-input").val().trim();

    ///create new train obj

    var newTrain ={
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

    ///push newTrain obj to firebase
    database.ref().push(newTrain);

    //console.log
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    alert("New Train Added, With Destination To:" + "_" + newTrain.destination);

    // clear all inputs
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });

  