import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BottomNav from './BottomNav';
import Onprogress from './Onprogress';
import Completed from './Completed';
import Home from './Home';
import './App.css';

function Rute() {
  return (
    <div className='App' style={{ backgroundColor: 'gainsboro' }}>
      <div className="flex flex-col min-h-screen items-center justify-center">
        <Home />
        {/* Logo Container */}
        {/* <div className='logo-container'> */}
          {/* <h1 style={{ marginTop: '20px', fontWeight: 'bold' }}>TRIBATAMA LOGISTIK</h1> */}
        {/* </div> */}

        <div className="flex-grow">
          <Routes>
            <Route path="/onprogress" element={<Onprogress />} />
            <Route path="/completed" element={<Completed />} />
          </Routes>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default Rute;
