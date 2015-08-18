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

$('.new-goal').on('submit', function(e){
	e.preventDefault();

	// getting the data-id from the choose-ride form and converting to values to match what is needed for strava api calls
	var rideCity = $('#ridecity').val();
	var rideState = $('#ridestate').val();
	var rideTime = $('#rideTime option:selected').val().split('-'); // convert mins to seconds *60
	var rideDistance = $('#rideDistance option:selected').val().split('-'); // convert miles to meters *1609.34
	var rideElevation = $('#rideElevation option:selected').val().split('-'); // convert feet to meters *0.3048


	var toInt = function(array){
		var min, max;
		array.forEach(function(x,i){
			i===0?min=parseInt(x):max=parseInt(x)})
		return [min, max];
	}
	var rideTimeInt = toInt(rideTime);
	var rideDistanceInt = toInt(rideDistance);
	var rideElevationInt = toInt(rideElevation);


	var goalVals = new RideGoal(rideCity, rideState, rideTimeInt, rideDistanceInt, rideElevationInt);
	newGoal.push(goalVals)

	console.log( newGoal );
	
	$.ajax({
		method: 'POST',
		url: '/ridelist',
		data: goalVals, 
		success: function(data){
			window.location.href = data;
		}
	})


});

// ----- Show Ride Detail ----------------

$('.name').on('click', function(){
     var $name = $(this).closest("tr").find(".name").text();
     var $time = $(this).closest("tr").find(".time").text();
     var $dist = $(this).closest("tr").find(".dist").text();
     var $el = $(this).closest("tr").find(".el").text();
     var $loc = $(this).closest("tr").find(".loc").text();


    $("#ride-nme").text($name); // update name
    $("#ride-time").text($time); // update time
    $("#ride-dist").text($dist); // update distance
    $("#ride-el").text($el); // update elevation gain
    $("#ride-loc").text($loc); // update location


	$('.rideDetail').removeClass('hide') // show the ride list
});

$('.close-button').on('click', function(){
	$('.rideDetail').addClass('hide')
});


//----------------map code---------------
L.mapbox.accessToken = 'pk.eyJ1IjoiYWhhbmxvbiIsImEiOiI1ZWJiMjc0MDNmZmI0ZWMxZDljZjNmNzBmZWI4NzhhZSJ9.xhJwrXxKBZZys2mTd0-1GQ';
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([40, -74.50], 9);






});


