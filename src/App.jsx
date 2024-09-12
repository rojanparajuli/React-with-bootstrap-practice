import { useState } from 'react'
// import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import MaterialDetail from './Pages/MaterialDetail';
import MaterialList from './Pages/MaterialList';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <NavBar /> */}
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<MaterialList />} />
      <Route path="/material/:id" element={<MaterialDetail />} >

        </Route>
      </Routes>
    </BrowserRouter>
    {/* <Footer/> */}
    </>
  )
}

export default App
