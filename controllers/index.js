
// adding strava api
var strava = require('strava-v3');

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

  storegoal: function(req, res){
    req.session.goal = req.body;
    res.send('/ridelist');

  },

  ridelist: function(req, res){
    var goal = req.session.goal;
    console.log(goal);

    // get data from strava
    strava.athlete.listActivities({},function(err, payload) {
        if(!err) {
            console.log(goal.location_city);
          // create function to filter strava data based on user 'choose ride' parameters
            var rideMatch = function(obj){ 
              if (goal.location_city === obj.location_city){
                if (goal.location_state === obj.location_state){
                  if (obj.moving_time >= (parseInt(goal.moving_time[0])*60) && obj.moving_time <= (parseInt(goal.moving_time[1])*60)){
                    if (obj.distance >= (parseInt(goal.distance[0])*1609.34) && obj.distance <= (parseInt(goal.distance[1])*1609.34)){
                      if (obj.total_elevation_gain >= (parseInt(goal.total_elevation_gain[0])*0.3048) && obj.total_elevation_gain <= (parseInt(goal.total_elevation_gain[1])*0.3048)){

                        return true;
                      }
                      else {
                        return false;
                      }

                    }
                  }
                }
              }
            }

            var activity = payload.filter(rideMatch);
            // var activity = payload;
            res.render('ridelist', {rides: activity, 
                                    goal: req.session.goal});
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