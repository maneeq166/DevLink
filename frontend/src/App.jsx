import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path="/" element={<Home/>} ></Route>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/signin' element={<Signin/>} ></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App