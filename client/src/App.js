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
import DisesasePredRes from './pages/DisesasePredRes';
function App() {

  useEffect(() => {
   
    // eslint-disable-next-line
}, [])
const [updatedisease, setUpdatedisease] = useState([]);

const host="http://localhost:5000";
  return (
    <TaskState>
      <Router>
        <Navbar/>
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
        
        </Routes>
      </Router>
    </TaskState>
  );
}

export default App;
