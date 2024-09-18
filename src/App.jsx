import { useState } from 'react'
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import NavBar from './Components/NavBar';
import MaterialList from './Pages/MaterialList';
import Login from './Pages/login_page';
import Signup from './Pages/sign_up';
import Logout from './Pages/logout';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  console.log(window.location.pathname);
  const showNavBar = !['/login', '/signup'].includes(location.pathname);

  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // console.log(typeof(isAuthenticated))\
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';



  return (
    <>
    {showNavBar && <NavBar />}
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<MaterialList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <MaterialList />
          </ProtectedRoute>
          } />

        </Routes>
      </BrowserRouter>
      {/* <Footer/> */}
    </>
  )
}

export default App
