import logo from './logo.png';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Rute from './Rute';
import Onprogress from './Onprogress';
import Completed from './Completed';
// import BottomNav from './BottomNav';

function App() {
  return (
    <div className='App'>
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/rute" element={<Rute />} />
        <Route path="/onprogress" element={<Onprogress />} />
        <Route path="/completed" element={<Completed />} />
        {/* <Route path="/BottomNav" element={<BottomNav />} /> */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;
