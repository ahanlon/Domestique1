$( function() {
console.log('hello');

$( '.new-goal' ).on('submit', function( event ) {
  event.preventDefault();
  console.log("yippeee")
});



// this creates the goal object used when choosing a ride

var RideGoal = function(location_city, location_state, moving_time, distance, total_elevation_gain){
	this.location_city			= location_city;
	this.location_state			= location_state;
	this.moving_time 			= moving_time;
	this.distance 				= distance;
	this.total_elevation_gain	= total_elevation_gain;
}

var newGoal = [];

$('.goal-submit').on('click', function(){


	// getting the data-id from the choose-ride form and converting to values to match what is needed for strava api calls
	var rideCity = $('#ridecity').val();
	var rideState = $('#ridestate').val();
	var rideTime = ($('#rideTime option:selected').attr('data-id')*60); // convert mins to seconds
	var rideDistance = ($('#rideDistance option:selected').attr('data-id')*1609.34); // convert miles to meters
	var rideElevation = ($('#rideElevation option:selected').attr('data-id')*0.3048); // convert feet to meters

	var goalVals = new RideGoal(rideCity, rideState, rideTime, rideDistance, rideElevation);
	newGoal.push(goalVals)

	var goalVals = {location_city: rideCity, location_state: rideState, moving_time: rideTime, distance: rideDistance, total_elevation_gain: rideElevation};
	console.log( newGoal );
	
	// var table = document.getElementById("ride-list");


});

// ----- Show Ride Detail ----------------

$('.name').on('click', function(){

	// var $ride = $(this).closest('tr').attr('#{ride.id}');	
	// console.log($ride);



	 // var $style = $(this).closest("tr")   // Finds the closest row <tr> 
  //                      .find(".style")     // Gets a descendent with class="nr"
  //                      .text();         // Retrieves the text within <td>

  //    var $name = $(this).closest("tr").find(".nme").text();
  //    var $time = $(this).closest("tr").find(".time").text();
  //    var $dist = $(this).closest("tr").find(".dist").text();
  //    var $spd = $(this).closest("tr").find(".spd").text();
  //    var $el = $(this).closest("tr").find(".el").text();
  //    var $desc = $(this).closest("tr").find(".desc").text();


  //   $("#ride-style").text($style); // update name
  //   $("#ride-nme").text($name); // update time
  //   $("#ride-time").text($time); // update distance
  //   $("#ride-dist").text($dist); // update speed
  //   $("#ride-spd").text($spd); // update elevation gain
  //   $("#ride-el").text($el); // update elevation gain
  //   $("#ride-desc").text($desc); // update description

	$('.rideDetail').removeClass('hide') // show the ride list
});

$('.close-button').on('click', function(){
	$('.rideDetail').addClass('hide')
});






});


