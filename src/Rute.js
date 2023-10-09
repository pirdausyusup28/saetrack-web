import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BottomNav from './BottomNav';
import Onprogress from './Onprogress';
import Completed from './Completed';

function Rute() {
  return (
    <div className='App'>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <Routes>
              <Route path="/onprogress" element={<Onprogress />} />
              <Route path="/completed" element={<Completed />} />
            </Routes>
          </div>
        
          {/* Navigasi Bottom Footer */}
          <BottomNav />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default Rute;
