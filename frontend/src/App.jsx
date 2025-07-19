import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import Signup from './pages/Signup';
const App = () => {
  return (
    <BrowserRouter>
    <Routes>

        <Route path="/" element={<Home/>} ></Route>
        <Route path='/login' element={<Signup/>} />
    
    </Routes>
    </BrowserRouter>
  )
}

export default App