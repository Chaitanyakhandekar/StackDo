import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signip';
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';

function App() {

  return (
    <div className=" w-[100vw] h-[100vh]">
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
    </div>
  );
}

export default App;