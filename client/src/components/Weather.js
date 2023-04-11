// import "./App.css";
import { useState, useEffect } from "react";

function Weather() {
  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState();
  const fetchWeather = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((e)=>{
            fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${e.coords.latitude}&lon=${e.coords.longitude}&appid=1ae67afbcfd2c8ace165befd341a1d70&units=metric`
              )
                .then((res) => res.json())
                .then((data) => {setWeather(data);console.log(data)})
                .catch((error) => console.log(error.message));
        });
      } else {
       alert( "Geolocation is not supported by this browser.");
      }
   
  };

  useEffect(() => {
   fetchWeather();
    
  }, [])
  let date=new Date().toDateString();
  return (
    <>
   
        <div className="card bg-gray-100 text-black font-bold  grid  grid-cols-2 items-center">
        
          <div className="flex flex-col justify-center pb-3">
          <img
            src={`http://openweathermap.org/img/w/${weather?.weather[0]?.icon}.png`}
            alt=""
            className="w-[50px] m-auto"
          />
          <h2 className="text-md font-bold text-center ">{weather?.main?.temp}&deg;</h2>
          <p className="text-center">{weather?.weather[0]?.main}</p></div>
          <div>
          <h4 className="text-md text-center">{weather?.name}</h4>
            <div className="text-md text-center"> {date}</div>
          </div>
          
        </div>
      
     </>
  );
}

export default Weather;