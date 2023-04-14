import { GoogleMap,useLoadScript,Marker } from "@react-google-maps/api";
import {useEffect,useState} from 'react'
function Map(){
const {isloaded}=useLoadScript({
    googleMapsApiKey:"sbv"
})
const [center, setCenter] = useState({lat:0, lon:0})
useEffect(() => {
 
    navigator.geolocation.getCurrentPosition((e)=>{
           let cent={lat:e.coords.latitude,lon:e.coords.longitude}
           setCenter(cent);
           
    })

}, [])
console.log(center)
if(!isloaded)return <div>Loading...</div>
return(
    <GoogleMap zoom={10} mapContainerClassName="w-[100vw] h-[20vh]" center={center}>
<Marker position={center}/>
    </GoogleMap>
)
}
export default Map