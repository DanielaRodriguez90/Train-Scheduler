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
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    //grab train inputs on form
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(), "HH:mm").format("HH:mm");
    var frequency = parseInt($("#frequency-input").val().trim());

    ///create new train obj

    var newTrain = {
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

    alert("New Train Added, With Destination To:" + " " + newTrain.destination);

    // clear all inputs
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
});

//adding a row to html file/pulling info from firebase
database.ref().on("child_added", function (childSnapShot) {
    console.log(childSnapShot.val());

    //store values into variables
    var trainName = childSnapShot.val().name;
    var destination = childSnapShot.val().destination;
    var firstTrain = childSnapShot.val().firstTrain;
    var frequency = childSnapShot.val().frequency;

    //console.logs
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    //list of variables to calculate nextArrival and minsAway

    var timeConverted = moment(firstTrain, "hh:mm");
     //current time variable
    var currentTime = moment();
    console.log(currentTime);
    var timeDiff = moment().diff(moment(timeConverted), "minutes");
    var remainder = timeDiff % frequency;
    var minsAway = frequency - remainder;


    //console.log everything
    console.log(timeConverted);
    console.log(timeDiff);
    console.log(remainder);
    console.log(minsAway);

    //nextArrival 
    var nextTrain = moment().add(minsAway, "minutes").format("mm");
    var arrivalTime = moment().add(nextTrain, "m").format("hh:mm A");

    
    //console.log 
    console.log(nextTrain);
    console.log(arrivalTime);

    //create new table row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(arrivalTime),
        $("<td>").text(nextTrain),
    );

    //append the new row
    $("#schedule-table > tbody").append(newRow);
    });