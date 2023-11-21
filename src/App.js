import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Checkout from './Components/Checkout';
import Login from './Components/Login';
import Payment from './Components/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function App() {

  // Load the Stripe.js library with your publishable key
  const stripePromise = loadStripe('pk_test_51ODPWcSBh8ydk88l4qI4a25yoH1LjTKnuDpl2u4Z2W7xeE1MjKb6ElElcW2sqMDyVGUX3sirChVXKPHGUnFwfpLf008U6JnK6V');


  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/payment'
            element={
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
