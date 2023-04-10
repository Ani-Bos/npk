// import "./App.css";
import { useState, useEffect } from "react";

function Weather() {
  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState();
  const fetchWeather = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((e)=>{
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${e.coords.latitude}&lon=${e.coords.longitude}&appid=1ae67afbcfd2c8ace165befd341a1d70`
              )
                .then((res) => res.json())
                .then((data) => setWeather(data))
                .catch((error) => console.log(error.message));
        });
      } else {
       alert( "Geolocation is not supported by this browser.");
      }
   
  };

  useEffect(() => {
   fetchWeather();
    
  }, [])
  
  return (
    <>
   
        <div className="card  text-black font-bold  grid  grid-cols-2 items-center ">
        
          <div>
          <img
            src={`http://openweathermap.org/img/w/${weather?.weather[0]?.icon}.png`}
            alt=""
            className="w-[100px] m-auto"
          />
          <h2 className="text-xl font-bold mb-2 text-center">{weather?.main?.temp}&deg;</h2>
          <p className="text-center">{weather?.weather[0]?.main}</p></div>
          <h4 className="text-xl text-center">{weather?.name}</h4>
          
        </div>
      
     </>
  );
}

export default Weather;