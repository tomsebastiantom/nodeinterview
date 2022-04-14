const express = require("express");
const axios = require("axios");
const app = express();

app.get("/routes", (req, res) => {
  axios
    .get("https://us-central1-dds-rts.cloudfunctions.net/routes")
    .then((response) => {
      res.json(response.data);
      res.end(); //end the response
    });
});

app.get("/trips", (req, res) => {
  axios
    .get("https://us-central1-dds-rts.cloudfunctions.net/trips")
    .then((response) => {
      res.json(response.data);
      res.end(); //end the response
    });
});

app.get("/report", async (req, res) => {
  try {
    // please find routes with less than 3 trips
    // Hint: trip's orginalRouteId are pointing to route's id.
  
   // get the trips and routes from api
     const trips =  await axios.get("https://us-central1-dds-rts.cloudfunctions.net/trips")
     const routes = await axios.get("https://us-central1-dds-rts.cloudfunctions.net/routes")
      
     totaltrips={}

  // loop through the trips and store the orginalRouteId id in a object
    trips.data.data.forEach(trip => {
        console.log(trip.attributes.originalRouteId)
        if(trip.attributes.originalRouteId!=null){
            if(totaltrips[trip.attributes.originalRouteId]==undefined){
                totaltrips[trip.attributes.originalRouteId]=1
            }
            else{
                totaltrips[trip.attributes.originalRouteId]+=1
            }
        }
    });
     
    requiredroutes = []
    
    // loop through the routes and check if the route has less than 3 trips
    routes.data.data.forEach(route => {
        if(totaltrips[route.id]<3){
            requiredroutes.push(route)
             }});


    res.json(routes.data.data);         
    res.end();
  } catch (error) {
    return res.send(`Error on getting report`);
  }

  
});

app.listen(8080, () => {
  console.log("server running on 8080");
}); //the server object listens on port 8080