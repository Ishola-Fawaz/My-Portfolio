import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminSignup() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // validate...
    // on success:
    navigate("/admin", { replace: true });
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Admin Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Admin email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full py-2 border rounded px-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          className="w-full py-2 border rounded px-3"
        />
        <button className="w-full py-2 bg-blue-600 text-white rounded">Sign Up</button>
      </form>
    </div>
  );
}
