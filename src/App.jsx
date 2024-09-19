import { useState } from 'react';
import { BrowserRouter, Routes, Route, useParams, useLocation } from "react-router-dom";
import NavBar from './Components/NavBar';
import MaterialList from './Pages/MaterialList';
import Login from './Pages/login_page';
import Signup from './Pages/sign_up';
import Logout from './Pages/logout';
import ProtectedRoute from './Components/ProtectedRoute';
import Profile from './Pages/profile_screen';

function App() {
  const location = useLocation(); 
  const showNavBar = !['/login', '/signup,', '/profile'].includes(location.pathname);
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  return (
    <>
      {showNavBar && <NavBar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path ="/profile" element = {<Profile/>}/>
        <Route path="" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MaterialList />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
