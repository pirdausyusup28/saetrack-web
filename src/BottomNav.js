import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Impor file CSS untuk gaya tambahan

function BottomNav() {
    const descriptionStyle = {
        backgroundColor: 'orange',
        fontWeight: 'bold',
    };
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around p-4 border-t border-gray-300 container-bottom" style={descriptionStyle}>
        <Link to="/onprogress" className="transition-transform duration-300 transform text-white-500 focus:outline-none hover:scale-105">
            <i className="fa fa-spinner"></i> ONPROGRESS
        </Link>
        <Link to="/completed" className="transition-transform duration-300 transform text-white-500 focus:outline-none hover:scale-105">
            <i className="fa fa-check-square-o"></i> COMPLETED
        </Link>
        <Link to="/" className="transition-transform duration-300 transform text-white-500 focus:outline-none hover:scale-105">
            <i className="fa fa-check-square-o"></i> LOGOUT
        </Link>
    </div>
  );
}

export default BottomNav;
