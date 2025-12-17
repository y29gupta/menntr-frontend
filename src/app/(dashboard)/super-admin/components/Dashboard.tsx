import React from 'react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Super Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to the Menntr campus management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Institutions</h3>
          <p className="text-3xl font-bold text-blue-600">24</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Users</h3>
          <p className="text-3xl font-bold text-green-600">1,432</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">License Requests</h3>
          <p className="text-3xl font-bold text-orange-600">8</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">System Health</h3>
          <p className="text-3xl font-bold text-green-600">98%</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
