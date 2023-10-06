import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from './BottomNav';
import Onprogress from './Onprogress';
import Completed from './Completed';

function App() {
  return (
    <div className='App'>
      <Router>
      <div className="min-h-screen flex flex-col">
        {/* Konten Utama Aplikasi */}
        <div className="flex-grow">
          <Routes>
            <Route path="/onprogress" element={<Onprogress />} />
            <Route path="/completed" element={<Completed />} />
            {/* Tambahkan rute-rute lainnya jika ada */}
          </Routes>
        </div>
      
        {/* Navigasi Bottom Footer */}
        <BottomNav />
      </div>
    </Router>
    </div>
  );
}

export default App;
