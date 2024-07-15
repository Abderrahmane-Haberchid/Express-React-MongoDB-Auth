import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import "bootstrap/dist/css/bootstrap.css"
import Register from './pages/Register';
import PrivateRoute from './pages/PrivateRoute';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
         <Routes>
          <Route element={<Login />} path='/' />
          <Route element={<Register />} path='/register' />
          
          <Route path='/home' element={<PrivateRoute />} />
         </Routes>
      </Router>
    </div>
  );
}

export default App;
