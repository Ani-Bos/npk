import React,{useEffect} from 'react'
import ee from '@google/earthengine' 
// import privateKey from '../static/privateKey.json'
import axios from 'axios'
function DroughPredictor() {
  
    
    // var initialize = function() {
    //     ee.initialize(null, null, function() {
           
    //       // ... run analysis ...
    //     }, function(e) {
    //       console.error('Initialization error: ' + e);
    //     });
    //   };
    // ee.data.authenticateViaOauth('426063422297-h0p58afom3meclsfmutg216690b9qbnh.apps.googleusercontent.com', initialize, function(e) {
    //     console.error('Authentication error: ' + e);
    //   }, null, function() {
    //     ee.data.authenticateViaPopup(initialize);
    //   });
      // ee.data.authenticateViaOauth("426063422297-h0p58afom3meclsfmutg216690b9qbnh.apps.googleusercontent.com");
      // // ee.data.authenticateViaPrivateKey(privateKey);
      
      // ee.initialize();
      
      // // Run an Earth Engine script.
      // var image = new ee.Image('srtm90_v4');
      // image.getMap({min: 0, max: 1000}, function(map) {
      //   console.log(map);
      // });
      
      // Authenticate using an OAuth pop-up.
    
const getmap=async()=>{
  const mapimg=await axios.get('http://localhost:5001/ok');
  const data=mapimg?.data;
  // const image=window.URL.createObjectURL(data?.map?.image);
  // console.log(data?.map,image)
  // console.group(data)
  

  // Display all metadata.
//  console.log('All metadata:', image);
}
useEffect(() => {
  getmap();

}, [])

  return (
    <div>DroughPredictor</div>
  )
}

export default DroughPredictor