import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'

import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import NewPassword from './components/user/NewPassword';

import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser } from './actions/userActions';
import store from './store'
import ForgotPassword from './components/user/ForgotPassword';

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
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

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
