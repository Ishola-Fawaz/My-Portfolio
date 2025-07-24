import React from "react";

export default function AdminDashboard() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, Admin! Here you can manage users, appointments, and settings.</p>
      {/* Add admin-specific widgets: user management, analytics, etc. */}
    </div>
  );
}
