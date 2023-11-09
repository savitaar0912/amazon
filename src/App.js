import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Checkout from './Components/Checkout';
import Login from './Components/Login';

function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/login' element={<Login/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
