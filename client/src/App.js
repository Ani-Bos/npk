import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router, Route, Routes
} from 'react-router-dom';

import DashBoard from './pages/DashBoard';

import Home from './components/Home';
import Navbar from './components/Navbar';
import Blog from './pages/Blog';
import Login from './pages/Login';
// import Navbar from './components/Navbar'
import Activity from './components/Activity';
import LabelBottomNavigation from './components/BelowNavigation';
import GetOtp from './components/GetOtp';
import Profile from './components/Profile';
import { UserAuthContextProvider } from './context/tasks/UserAuthContext';
import Developer from './pages/Developer';
import DiseasePredictor from './pages/DiseasePredictor';
import DisesasePredRes from './pages/DisesasePredRes';
import Recommended_Crop from './pages/Recommended_Crop';
import Chat from './pages/Chat';
import DynamicCard from './components/DynamicCard';
import DroughPredictor from './pages/DroughPredictor';
import Community from './pages/Community';
import Room from './components/Room';
function App() {
  const [extraDetails, setExtraDetails] = useState({nitrogen:50.55,phosphrous:53.36,potassium:48.14,ph:0.77})
  useEffect(() => {
   
    // eslint-disable-next-line
}, [])


const host="http://localhost:5000"
const [updatedisease, setUpdatedisease] = useState([]);
const [cropdata, setCropdata] = useState({})
const [change, setChange] = useState(false)

  return (
   
    <UserAuthContextProvider>
      <Router>
        <Navbar />
        <Chat />
        {/* <DynamicCard/> */}
        <Routes>
          <Route exact path="/GetOtp" element={<GetOtp host={host}/>} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login host={host}/>} />
          <Route exact path="/blog" element={<Blog />} />
          <Route exact path="/dev" element={<Developer />} />
          <Route exact path="/activity" element={<Activity host={host}/>} />
          <Route exact path="/profile" element={<Profile host={host} />} />
          <Route exact path="/droughtPredictor" element={<DroughPredictor host={host} />} />
          <Route exact path="/community" element={<Community host={host} />} />
          <Route exact path="/room" element={<Room host={host} />} />
          <Route
            exact
            path="/dashboard"
            element={
              <DashBoard
                cropdata={cropdata}
                change={change}
                host={host}
                setCropdata={setCropdata}
              />
            }
          />
          <Route
            exact
            path="/disease_predictor"
            element={<DiseasePredictor host={host} setUpdatedisease={setUpdatedisease} />}
          />
          <Route
            exact
            path="/disease_predictor_result"
            element={<DisesasePredRes host={host} diseasedata={updatedisease} />}
          />
          <Route
            exact
            path="/recommended_crop"
            element={
              <Recommended_Crop
                setExtraDetails={setExtraDetails}
                setChange={setChange}
                host={host}
                extraDetails={extraDetails}
                cropdata={cropdata}
                setCropdata={setCropdata}
              />
            }
          />
        </Routes>
        <LabelBottomNavigation/>
      </Router>
    </UserAuthContextProvider>
  );
}

export default App;
