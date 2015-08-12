$( function() {
console.log('hello');

$( '.new-goal' ).on('submit', function( event ) {
  event.preventDefault();
  console.log("yippeee")
});



// this creates the goal object used when choosing a ride

var RideGoal = function(time, distance, gain){
	this.time 			= time;
	this.distance 		= distance;
	this.gain			= gain;
}



// -------  nav bar links  --------------------

// --------------------------------------------


// submit goals, hide the form and show the matching list of rides, Didn't get working.


$('.goal-submit').on('click', function(){
	// $('.new-goal').addClass('hide');
	// $('#ride-list').removeClass('hide');	


	var rideTime = $('#rideTime').val();
	var rideDistance = $('#rideDistance').val();
	var rideElevation = $('#rideElevation').val();
	console.log( rideTime );

	var newGoal = new RideGoal(rideTime, rideDistance, rideElevation);
	rideList.push(newGoal)

	var goalVals =[rideTime, rideDistance, rideSpeed, rideElevation, 'zz'];
	
	var table = document.getElementById("ride-list");

	// for (var i = 1, row; row = table.rows[i]; i++) {
	//    //iterate through rows
	//    //rows would be accessed using the "row" variable assigned in the for loop
	//    for (var j = 0, col; col = row.cells[j]; j++) {
	//      //iterate through columns
	//      //columns would be accessed using the "col" variable assigned in the for loop
	     
	     
		 //    for (var i = 1, row; row = table.rows[i]; i++) {
		 //    //iterate through rows
		 //    //rows would be accessed using the "row" variable assigned in the for loop
		   
			// 	for (var j = 1, col; col = row.cells[j] ; j++) {
			//     	//iterate through columns
			//     	//columns would be accessed using the "col" variable assigned in the for loop
			//     	var v = $(col).data('id');
			//     	var gV = goalVals[(j - 1)]
			//      		console.log(gV)
			//      		console.log(v)
			//     	if (v != goalVals[(j)] ) {
			//      		// $(row).addClass('hide')
			    
	  //    			}
	     
	  //  			}  
			// }
});




// if cancel is clicked on new goal
$('.goal-cancel').on('click', function(){
	$('.choice-box').removeClass('hide').addClass('show')
	$('.new-goal').removeClass('show').addClass('hide')
	console.log('yoyoyo');
});

// hide main choice box and show set goal form on submit

$('.log-ride').on('click', function(){
	$('.choice-box').removeClass('show').addClass('hide')
	$('.new-goal').removeClass('show').addClass('hide')
	$('.rideDetail').removeClass('show').addClass('hide')
	$('#ride-list').removeClass('show').addClass('hide')
	$('.new-ride').removeClass('hide')
});

// submit the new ride log and return to main choice box
$('.log-submit').on('click', function(){
	$('.new-ride').addClass('hide')
	$('.choice-box').removeClass('hide').addClass('show')

});

// if cancel is clicked on new-ride

$('.log-cancel').on('click', function(){
	$('.choice-box').removeClass('hide').addClass('show')
	$('.new-ride').removeClass('show').addClass('hide')
});



// ----- Show Ride Detail ----------------

$('.name').on('click', function(){
	 var $style = $(this).closest("tr")   // Finds the closest row <tr> 
                       .find(".style")     // Gets a descendent with class="nr"
                       .text();         // Retrieves the text within <td>

     var $name = $(this).closest("tr").find(".nme").text();
     var $time = $(this).closest("tr").find(".time").text();
     var $dist = $(this).closest("tr").find(".dist").text();
     var $spd = $(this).closest("tr").find(".spd").text();
     var $el = $(this).closest("tr").find(".el").text();
     var $desc = $(this).closest("tr").find(".desc").text();


    $("#ride-style").text($style); // update name
    $("#ride-nme").text($name); // update time
    $("#ride-time").text($time); // update distance
    $("#ride-dist").text($dist); // update speed
    $("#ride-spd").text($spd); // update elevation gain
    $("#ride-el").text($el); // update elevation gain
    $("#ride-desc").text($desc); // update description

	$('.rideDetail').removeClass('hide').addClass('show') // show the ride list
});

$('.close-button').on('click', function(){
	$('.rideDetail').removeClass('show').addClass('hide')
});


// ---- These event handlers append the map to the corresponding ride ---------



$('.rain').on('click', function(){
	$('iframe').remove()
	$('#map-canvas').prepend("<iframe height='100%' width='100%' frameborder='0' allowtransparency='true' scrolling='no' src='https://www.strava.com/activities/340692547/embed/8f41d00459c7fb2c77f58a0cc76d3336f4127931'></iframe>")
});

$('.lyons').on('click', function(){
	$('iframe').remove()
	$('#map-canvas').prepend("<iframe height='100%' width='100%' frameborder='0' allowtransparency='true' scrolling='no' src='https://www.strava.com/activities/339121473/embed/a78e0a2919b55136b04e84c95450555e6e9e3c33'></iframe>")
});

$('.breath').on('click', function(){
	$('iframe').remove()
	$('#map-canvas').prepend("<iframe height='100%' width='100%' frameborder='0' allowtransparency='true' scrolling='no' src='https://www.strava.com/activities/338553942/embed/13aa5e48a5484ded0448d84db6d7ac1a8a125e8b'></iframe>")
});

$('.marshall').on('click', function(){
	$('iframe').remove()
	$('#map-canvas').prepend("<iframe height='100%' width='100%' frameborder='0' allowtransparency='true' scrolling='no' src='https://www.strava.com/activities/330252085/embed/8a87fac9b9db8a558d79a5fa2ae1da82de8a4cee'></iframe>")
});

$('.hipster').on('click', function(){
	$('iframe').remove()
	$('#map-canvas').prepend("<iframe height='100%' width='100%' frameborder='0' allowtransparency='true' scrolling='no' src='https://www.strava.com/activities/205406823/embed/f07015b075960b5f4e64d77974d745086aeae726'></iframe>")
});

$('.forrest').on('click', function(){
	$('iframe').remove()
	$('#map-canvas').prepend("<iframe height='100%' width='100%' frameborder='0' allowtransparency='true' scrolling='no' src='https://www.strava.com/activities/226782722/embed/76cfe7c90e8614325971f84616ed31bc5c33c9d6'></iframe>")
});

$('.shamrock').on('click', function(){
	$('iframe').remove()
	$('#map-canvas').prepend("<iframe height='100%' width='100%' frameborder='0' allowtransparency='true' scrolling='no' src='https://www.strava.com/activities/100141781/embed/ec1115db98c95f73bbdbfb8cc45efb4076fc3f65'></iframe>")
});








// ------------  Leaflet Maps ------------------

// var map = L.map('map-canvas').setView([40.0274, -105.2519], 13);

// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     maxZoom: 18,
//     id: 'ahanlon.88373a80',
//     accessToken: 'pk.eyJ1IjoiYWhhbmxvbiIsImEiOiI1ZWJiMjc0MDNmZmI0ZWMxZDljZjNmNzBmZWI4NzhhZSJ9.xhJwrXxKBZZys2mTd0-1GQ'
// }).addTo(map);


// --------------------------------------------------------------------------


// -------------- Started to build objects, decided to fake it ---------------

var rideList = [

];








  
});
