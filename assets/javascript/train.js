 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCxuCT-Jluu-CpSjayF7zlGUC-GAJIGQ4E",
    authDomain: "trainschedule-ae13e.firebaseapp.com",
    databaseURL: "https://trainschedule-ae13e.firebaseio.com",
    storageBucket: "trainschedule-ae13e.appspot.com",
  };
  	firebase.initializeApp(config);		// 

	var database = firebase.database();   // reference to db service
};

	var myFirebaseRef = new Firebase("https://trainschedule-ae13e.firebaseio.com/");

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
	var tRemainder = diffTime % tFreq;
	console.log(tRemainder);

	// Minute Until Train
	var minAway = freq - tRemainder;
	console.log("MINUTES TILL TRAIN: " + minAway);

	// Next Train
	var next = moment().add(minAway, "minutes")
	console.log("ARRIVAL TIME: " + moment(next).format("hh:mm"))	



// click function when new train info submitted
//_________________________________________

	$("#addTrain").on("click", function(){

		// Get inputs from 'form'
		train = $('#nameinput').val().trim(); 
		dest= $('#destinput').val().trim(); 
		firstT = $('#firstTinput').val().trim(); 
		freq = $('#freqinput').val().trim(); 


		// Change what is saved in firebase
		database.ref().push({  //database.ref().set({??? difference? set writes over?
			train: train,
			dest: dest,
			firstT: firstT
			freq:freq
		})

		return false;
	});



// database.ref().set({}   Store click data to Firebase - Save new value to Firebase
//-------------------------

	// database.ref().set({
	// 	clickCount: clickCounter
	// });

//retrieve data from db .on("value",function(snapshot){} anytime something changes
		database.ref().on("value", function(snapshot) {

		console.log(snapshot.val());

		console.log(snapshot.val().name);
		console.log(snapshot.val().dest);
		console.log(snapshot.val().firstT);
		console.log(snapshot.val().freq);

	});
		// Change the HTML // fix table - them $("#name"),$("#dest")etc for each field
		// maybe .append instd of html
		//$("#displayedData").append(snapshot.val().name + " | " + snapshot.val().dest + " | " + snapshot.val().firstT) + " | " +(snapshot.val().freq);
		// Change the HTML to reflect
	$("#name").append(snapshot.val().name); //into each td of table
	$("#dest").append(snapshot.val().dest);
	$("#firstT").append(snapshot.val().firstT);
	$("#freq").append(snapshot.val().freq);
	$("#next").append(next);
	$("#minAway").append(minAway);


	},

	function(errorObject){
		console.log("The read failed" + errorObject.code);

	};


