
// adding strava api
var strava = require('strava-v3');
var goalVals = goalVals;

// Simple index controller
var indexController = {

  // Handle incoming requests for the '/' route
  index: function(req, res){

    // Since this route requires authentication,
    // called out in app.js, we have access to the
    // logged-in user's document from the database
    // via the injected "req.user" variable
    res.render('index', {
      user: req.user
    });
  },
  ridelist: function(req, res){
    rideGoal = {
      location_city:        $('#ridecity').val(),
      location_state:       $('#ridestate').val(),
      moving_time:          ($('#rideTime option:selected').attr('data-id')*60), // convert mins to seconds
      distance:              ($('#rideDistance option:selected').attr('data-id')*1609.34), // convert miles to meters
      total_elevation_gain: ($('#rideElevation option:selected').attr('data-id')*0.3048), // convert feet to meters
    }

    strava.activities.get(rideGoal,function(err, payload) {
        if(!err) {
            console.log(payload);
            var activity = payload;
            // res.render('ridelist', {rides: activity});
        }
        else {
            console.log(err);
            res.send(err);
        }
    });

  },

  ridedetail: function(req, res){
    res.render('ridedetail');
  }
};

// Export our index control
module.exports = indexController;