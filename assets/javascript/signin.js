
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCxuCT-Jluu-CpSjayF7zlGUC-GAJIGQ4E",
    authDomain: "trainschedule-ae13e.firebaseapp.com",
    databaseURL: "https://trainschedule-ae13e.firebaseio.com",
    storageBucket: "trainschedule-ae13e.appspot.com",
  };
  firebase.initializeApp(config);


    // fb says btnLogin.addEventListener('click', e=>{       });
    // they also use const instead of val
$("#login").on("click", function(){

		// Get inputs from 'form'
		const name = $('#name').val().trim(); 
		const pass= $('#pass').val().trim(); 
		
		console.log(name);
		console.log(pass);
		
		alert(name + " , you have been added to the club");
		
		const auth = firebase.auth();
// SignIn
		const promise = auth.signInWithEmailAndPassword (name, pass);
		promise.catch (e => console.log(e.message));

		// database.ref().push({  //database.ref().set({??? difference? 
		// 	name: name,
		// 	pass: pass,
			
		// });

		$("#name").val("");  // clears form fields
		$("#pass").val("");
		$("#firstTinput").val("");
		$("#freqinput").val("");

		return false;
	});
	// why does btnlogout work and $(#btnlogout) does not??? is the addEventListener?
	//btnlogout.addEventListener('click', e=>{
		$("#btnlogout").on("click", function () {
		firebase.auth().signOut();

	});

	$("#SignUP").on("click", function(){

		// Get inputs from 'form'
		const name = $('#name').val().trim(); 
		const pass= $('#pass').val().trim(); 
		
		console.log(name);
		console.log(pass);
		
		alert(name + " , you have signed up");
		
		const auth = firebase.auth();

		const promise = auth.createUserWithEmailAndPassword (name,pass);
		promise.catch (e => console.log(e.message));
	});

	//Add a realtime listener.
		firebase.auth().onAuthStateChanged(firebaseUser =>{
			if(firebaseUser){
				console.log (firebaseUser);
				btnlogout.classList.remove('hide');
			} else {
				console.log('not logged in');
				btnlogout.classList.add('hide');
			}
		});
