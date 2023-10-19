import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'

import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';

import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';

import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser } from './actions/userActions';
import store from './store';
import axios from 'axios';

// Payment
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser())

    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      setStripeApiKey(data.stripeApiKey)
    }

    getStripeApiKey();

  }, [])

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
              <Route path = "/" Component={Home} exact />
              <Route path = "/search/:keyword" Component={Home} />
              <Route path = "/product/:id" Component={ProductDetails} exact />
              
              <Route path = "/cart" Component={Cart} exact />
              <Route path = "/shipping" 
                element={
                  <ProtectedRoute>
                    <Shipping />
                  </ProtectedRoute>
                } exact 
              />
              <Route path = "/order/confirm" 
                element={
                  <ProtectedRoute>
                    <ConfirmOrder />
                  </ProtectedRoute>
                } exact 
              />
              <Route path = "/success" 
                element={
                  <ProtectedRoute>
                    <OrderSuccess />
                  </ProtectedRoute>
                } exact 
              />
              {stripeApiKey &&                 
                <Route path = "/payment" 
                  element={
                    <Elements stripe={loadStripe(stripeApiKey)}>
                      <ProtectedRoute>
                        <Payment />
                      </ProtectedRoute>
                    </Elements>
                    } exact 
                />
              }

              <Route path = "/login" Component={Login} />
              <Route path = "/register" Component={Register} />
              <Route path = "/password/forgot" Component={ForgotPassword} exact/>
              <Route path = "/password/reset/:token" Component={NewPassword} exact/>
              <Route path = "/me" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } exact 
              />
              <Route path = "/me/update" 
                element={
                  <ProtectedRoute>
                    <UpdateProfile />
                  </ProtectedRoute>
                } exact 
              />
              <Route path = "/password/update" 
                element={
                  <ProtectedRoute>
                    <UpdatePassword />
                  </ProtectedRoute>
                } exact 
              />

              <Route path = "/orders/me" 
                element={
                  <ProtectedRoute>
                    <ListOrders />
                  </ProtectedRoute>
                } exact 
              />
              <Route path = "/order/:id" 
                element={
                  <ProtectedRoute>
                    <OrderDetails />
                  </ProtectedRoute>
                } exact 
              />

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
