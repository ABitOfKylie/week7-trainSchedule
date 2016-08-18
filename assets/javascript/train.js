 // Initialize firebase
  var config = {
    apiKey: "AIzaSyCxuCT-Jluu-CpSjayF7zlGUC-GAJIGQ4E",
    authDomain: "trainschedule-ae13e.firebaseapp.com",
    databaseURL: "https://trainschedule-ae13e.firebaseio.com",
    storageBucket: "trainschedule-ae13e.appspot.com",
  };
  	firebase.initializeApp(config);		// 

	var database = firebase.database();   // reference to db service

	// var myFirebaseRef = new firebase("https://trainschedule-ae13e.firebaseio.com/");

// Variables and set initial values
//-------------------------
	var train = "";
	var dest = "";
	var firstT = "03:30"; //first time train runs
	var freq = 3; //frequency
	// First Time (pushed back 1 year to make sure it comes before current time)
	var firstTConverted = moment(firstT,"hh:mm").subtract(1, "years");
		console.log(firstTConverted); 
	// Current Time
	var currentTime = moment();
	console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

	// Difference between the times
	var diffTime = moment().diff(moment(firstTConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

	// Time apart (remainder)
	var tRemainder = diffTime % freq;
	console.log(tRemainder);

	// Minute Until Train
	var minAway = freq - tRemainder;
	console.log("MINUTES TILL TRAIN: " + minAway);

	// Next Train
	var next = moment().add(minAway, "minutes")
	console.log("ARRIVAL TIME: " + moment(next).format("hh:mm"))	

	$("#time").html("Crazy time: " + firstTConverted);



// click function when new train info submitted
//_________________________________________

	$("#time").html("Crazy time: " + currentTime);

	$("#addTrain").on("click", function(){

		// Get inputs from 'form'
		train = $('#nameinput').val().trim(); 
		dest= $('#destinput').val().trim(); 
		firstT = $('#firstTinput').val().trim(); 
		freq = $('#freqinput').val().trim(); 

		console.log(train);
		console.log(dest);
		console.log(firstT);
		console.log(freq);

		// in ex. they create var train = $("#nameinput").val().trim();
		// then create a local temp object for holding employee/train data
		// var newTrain = {
		// 	name: train,
		// 	dest: dest,
		// 	etc
		// } and thereafter database.ref().push(newTrain);
		alert(train + " added to the fleet!");
		// Change what is saved in firebase
		database.ref().push({  //database.ref().set({??? difference? set writes over?
			train: train,
			dest: dest,
			firstT: firstT,
			freq:freq
		});

		$("#nameinput").val("");  // clears form fields
		$("#destinput").val("");
		$("#firstTinput").val("");
		$("#freqinput").val("");

		return false;
	});


// database.ref().set({}   Store click data to Firebase - Save new value to Firebase
//-------------------------

	// database.ref().set({
	// 	clickCount: clickCounter
	// });

//retrieve data from db .on("value",function(snapshot){} anytime something changes
	database.ref().on("child_added", function(childSnapshot) {

		console.log(childSnapshot.val());

		var train = childSnapshot.val().train;
		var dest = childSnapshot.val().dest;
		var firstT= childSnapshot.val().firstT;
		var freq = childSnapshot.val().freq;
		// var next = 
		// var minAway = 

// moment.unix (seconds since the Unix Epoch
// moment().toString() // "Sat Apr 30 2016 16:59:46 GMT-0500"
// moment().toNow(); timeago/relative time moment([2007,0,29]).toNow();
// var a = moment([2007,0,28]) and var b=moment([2007,0,29])
		//train info
		console.log(train);
		console.log(dest);
		console.log(firstT);
		console.log(freq);
		// console.log(next);
		// console.log(minAway);

$("#trainTable > tbody").append("<tr><td>"+ train + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + next + "</td><td>" + minAway + "</td></tr>");


		// var tbody $(<td>).html(variable train)
},	function (errorObject){
		console.log("The read failed" + errorObject.code);

	
});
// 

	


