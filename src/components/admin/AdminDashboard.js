import React from 'react';
import AdminHeader from './AdminHeader';

export default function AdminDashboard() {
  return (
    <div>
      <AdminHeader />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <div style={{ marginBottom: '50px' }}>
          <h1>Welcome to DrMax Supply Pharmacy System</h1>
          <img
            style={{ width: '500px', height: '300px'  }}
            src="../drmax_dashboard.jpg"
            className="img-fluid"
            alt="Phone image"
          />
        </div>
      </div>
    </div>
  );
}



