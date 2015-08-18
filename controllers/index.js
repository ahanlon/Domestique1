// Convert seconds to hh:mm:ss
function fromSeconds(seconds, showHours) {
if(showHours) {
var hours = Math.floor(seconds / 3600);
seconds = seconds - hours * 3600;
}
var minutes = (Math.floor(seconds/60) < 10) ? "0" + Math.floor(seconds/60) : Math.floor(seconds/60); var seconds = (seconds % 60 > 9) ? seconds % 60 : "0" + seconds % 60;

if(showHours) {
var timestring = hours+":"+minutes+":"+seconds;
} else {
var timestring = minutes+":"+seconds;
}
return timestring;
}



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
    strava.athlete.listActivities({'page':1, 'per_page':150},function(err, payload) {
        if(!err) {
            console.log(goal.location_city);
          // create function to filter strava data based on user 'choose ride' parameters
            var rideMatch = function(obj){ 
              if (obj.type === 'Ride'){
                if (goal.location_city.toLowerCase() === obj.location_city.toLowerCase() || goal.location_city.toLowerCase() === ''){
                  if (goal.location_state.toLowerCase() === obj.location_state.toLowerCase() || goal.location_state.toLowerCase() === ''){
                    if (obj.moving_time >= (parseInt(goal.moving_time[0])*60) && obj.moving_time <= (parseInt(goal.moving_time[1])*60)
                     || goal.moving_time[0] === 'NaN'){
                      if (obj.distance >= (parseInt(goal.distance[0])*1609.34) && obj.distance <= (parseInt(goal.distance[1])*1609.34) 
                        || goal.distance[0] === 'NaN'){
                        if (obj.total_elevation_gain >= (parseInt(goal.total_elevation_gain[0])*0.3048) && obj.total_elevation_gain <= (parseInt(goal.total_elevation_gain[1])*0.3048)
                          || goal.total_elevation_gain[0] === 'NaN'){

                            //converting time to hh:mm:ss
                            obj.moving_time = fromSeconds(obj.moving_time, true);
                            // converting distance from meters to miles
                            obj.distance = (obj.distance / 1609.34).toFixed(1);
                            // converting distance from meters to feet
                            obj.total_elevation_gain = (obj.total_elevation_gain / 0.3048).toFixed(0);

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
            }
            
            var activity = payload.filter(rideMatch);
            console.log(activity);
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