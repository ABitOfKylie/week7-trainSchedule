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
		// }
		alert(train + "added to the fleet!");
		// Change what is saved in firebase
		database.ref().push({  //database.ref().set({??? difference? set writes over?
			train: train,
			dest: dest,
			firstT: firstT,
			freq:freq
		});

		$("#nameinput").val("");
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
	database.ref().on("child_added", function(snapshot) {

		console.log(snapshot.val());

		console.log(snapshot.val().train);
		console.log(snapshot.val().dest);
		console.log(snapshot.val().firstT);
		console.log(snapshot.val().freq);

		var tr = ("<tr>");
		var td = ("<td>");
		// var tbody $(<td>).html(variable train)

		$("tbody").append(tr);   /// ? id for tbody
		$("tr").append(td, train);
		$("tr").append(td);
		$("tr").append(td);
		$("tr").append(td);
		$("tr").append(td);
		// Change the HTML // fix table - them $("#name"),$("#dest")etc for each field
		// maybe .append instd of html
		//$("#displayedData").append(snapshot.val().name + " | " + snapshot.val().dest + " | " + snapshot.val().firstT) + " | " +(snapshot.val().freq);
		// Change the HTML to reflect
	$("#name").append(snapshot.val().train); //into each td of table
	$("#dest").append(snapshot.val().dest);
	$("#firstT").append(snapshot.val().firstT);
	$("#freq").append(snapshot.val().freq);
	$("#next").append(next);
	$("#minAway").append(minAway); //will it work with next var calc at top?

	//play audio Train_Honk_Honk

	//$("h1").show("slide", {direction: "right"}, 3000);
	//$("h1").fadeOut; //want to send right and have it come back from the left to center, 

// alt 2 - var div =$("h1");
// 			div.animate({width: 500px, opacity '0.4'}, "slow");
// 			div.animate({width: 170px, opacity '0.9'}, "slow");

// alt 3	var div =$("h1");
// 			div.animate({height: 300px, opacity '0.4'}, "slow");
// 			div.animate({width: 300px, opacity '0.8'}, "slow");
// 			div.animate({height: 100px, opacity '0.4'}, "slow");
// 			div.animate({width: 100px, opacity '0.8'}, "slow");



	},

	function(errorObject){
		console.log("The read failed" + errorObject.code);

	});


