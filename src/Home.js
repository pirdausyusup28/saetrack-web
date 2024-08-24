import React from 'react';
import logo from './image/logo.png';
// import { Link } from 'react-router-dom';
// import './Login.css'; // Impor file CSS untuk gaya tambahan

function Home() {
    const descriptionStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
        width:'35vh'
    };
  return (
    <div className="" style={descriptionStyle}>
        <img src={logo} alt="Sae Track Logo" className="logo" style={{ height:'120px' }} />
    </div>
  );
}

export default Home;
