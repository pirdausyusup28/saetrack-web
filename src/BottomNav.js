import React from 'react';
import { Link } from 'react-router-dom';

function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-500 p-4 flex justify-around border-t border-gray-300">
      <Link to="/onprogress" className="text-white-500 hover:text-white-700 focus:outline-none">
        <i className="fa fa-spinner"></i> ONPROGRESS
      </Link>
      <Link to="/completed" className="text-white-500 hover:text-white-700 focus:outline-none">
        <i className="fa fa-check-square-o"></i> COMPLETED
      </Link>
      <button className="text-white-500 hover:text-white-700 focus:outline-none">
        LOGOUT
      </button>
    </div>
  );
}

export default BottomNav;
