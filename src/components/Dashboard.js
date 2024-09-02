import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Dashboard.css';

function Dashboard() {
  return (
    <>
    <div className="dashboard-container">
      <h1 className="dashboard-title">School Management System</h1>
       <img src="https://tse4.mm.bing.net/th?id=OIP.wdkiB1wHUA0o58Y0VM1RPAHaDm&pid=Api&P=0&h=180" />
      <div className="dashboard-options">
        <Link to="/students" className="dashboard-link">Manage Students</Link>
        <Link to="/teachers" className="dashboard-link">Manage Teachers</Link>
        </div>
       </div>
        <img className='img-2' src="https://m.media-amazon.com/images/I/81m90ZqaYvL.jpg"/>
       </>
  );
}

export default Dashboard;
