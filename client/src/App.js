import { useEffect } from 'react';
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
import DiseasePredictor from './pages/DiseasePredictor';
function App() {
  useEffect(() => {
   
    // eslint-disable-next-line
}, [])

const host="http://localhost:5000";

  return (
    <TaskState>
    <Router>
   <Navbar/>
   <Routes>
      <Route exact path='/' element={<Landing/> }/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/blog' element={<Blog/>}/>
      <Route exact path='/dashboard' element={<DashBoard/>}/>
      <Route exact path='/disease_predictor' element={<DiseasePredictor/>}/>
   </Routes>
   
   </Router>
    </TaskState>
  );
}

export default App;
