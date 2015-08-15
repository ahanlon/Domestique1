
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

    strava.athlete.listActivities({},function(err, payload) {
        if(!err) {
            console.log(payload);
            var activity = payload;
            res.render('ridelist', {rides: activity});
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