import { useEffect,useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import TaskState from './context/tasks/TaskState'
import DashBoard from './pages/DashBoard';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Blog from './pages/Blog';
import Navbar from './components/Navbar'
import Home from './components/Home'
// import Navbar from './components/Navbar'
import DiseasePredictor from './pages/DiseasePredictor';
import GetOtp from './components/GetOtp'
import { UserAuthContextProvider } from './context/tasks/UserAuthContext'
import ProtectedRoute from './components/ProtectedRoute';
import DisesasePredRes from './pages/DisesasePredRes';
import Recommended_Crop from './pages/Recommended_Crop';
function App() {
  const [extraDetails, setExtraDetails] = useState({nitrogen:50.55,phosphrous:53.36,potassium:48.14})
  useEffect(() => {
   
    // eslint-disable-next-line
}, [])
const [updatedisease, setUpdatedisease] = useState([]);

const host="http://localhost:5000";
  return (
    // <TaskState>
    //   <Router>
    //     <Navbar />
    //     <Routes>
    //       <Route exact path="/GetOtp" element={<GetOtp />} />
    //       <Route exact path="/" element={<Home />} />
    //       <Route exact path="/login" element={<Login />} />
    //       <Route exact path="/blog" element={<Blog />} />
    //       <Route exact path="/dashboard" element={<DashBoard />} />
    //       <Route
    //         exact
    //         path="/disease_predictor"
    //         element={<DiseasePredictor />}
    //       />
    //     </Routes>
    //   </Router>
    // </TaskState>
    <UserAuthContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/GetOtp" element={<GetOtp />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/blog" element={<Blog />} />
          <Route exact path="/dashboard" element={<DashBoard />} />
          <Route
            exact
            path="/disease_predictor"
            element={<DiseasePredictor setUpdatedisease={setUpdatedisease}/>}
          />
          <Route
            exact
            path="/disease_predictor_result"
            element={<DisesasePredRes diseasedata={updatedisease}/>}
          />
          <Route
            exact
            path="/recommended_crop"
            element={<Recommended_Crop />}
          />
        
        </Routes>
      </Router>
    </UserAuthContextProvider>
  );
}

export default App;
