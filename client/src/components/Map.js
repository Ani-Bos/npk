import { MapContainer, TileLayer,Popup,Marker } from 'react-leaflet'
import {useEffect,useState} from 'react'
function Map(){

const [center, setCenter] = useState({lat:0, lon:0})
useEffect(() => {
 
    navigator.geolocation.getCurrentPosition((e)=>{
           let cent={lat:e.coords.latitude,lon:e.coords.longitude}
           setCenter(cent);
           
    })

}, [])
console.log(center)
return(
    <MapContainer zoom={10}  center={[center?.lat,center?.lon]}>
<TileLayer className='leaflet-container'
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
   />
 <Marker position={[center?.lat,center?.lon]}>
      <Popup>
        I am a pop-up!
      </Popup>
  </Marker>
    </MapContainer>
)
}
export default Map