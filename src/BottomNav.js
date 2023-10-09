import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Impor file CSS untuk gaya tambahan

function BottomNav() {
    const descriptionStyle = {
        backgroundColor: '#ff9104',
        fontWeight: 'bold',
    };
  return (
    <div className="container-bottom fixed bottom-0 left-0 right-0 p-4 flex justify-around border-t border-gray-300" style={descriptionStyle}>
        <Link to="/onprogress" className="text-white-500 focus:outline-none hover:scale-105 transform transition-transform duration-300">
            <i className="fa fa-spinner"></i> ONPROGRESS
        </Link>
        <Link to="/completed" className="text-white-500 focus:outline-none hover:scale-105 transform transition-transform duration-300">
            <i className="fa fa-check-square-o"></i> COMPLETED
        </Link>
        <button className="text-white-500 focus:outline-none hover:scale-105 transform transition-transform duration-300">
            LOGOUT
        </button>
    </div>
  );
}

export default BottomNav;
