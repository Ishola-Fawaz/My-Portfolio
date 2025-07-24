// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Heart } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    matric: "",
    email: "",
    password: "",
    role: "", // no default; require explicit selection
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showRoleSelect, setShowRoleSelect] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.role) newErrors.role = "Please select a role.";
    if (!formData.matric) newErrors.matric = "Matric number is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be 6+ characters.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const route = formData.role === "admin"
        ? "/admin"
        : formData.role === "professional"
        ? "/professional"
        : "/dashboard";
      navigate(route, { replace: true });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white backdrop-blur-sm bg-opacity-80 p-8 rounded-3xl shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl w-16 h-16 mb-4 shadow-lg">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Welcome Back</h1>
          <p className="text-sm text-gray-600">Log in to your Dókítà account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role toggle & radio buttons */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setShowRoleSelect(prev => !prev)}
              className="text-sm text-blue-600 hover:none"
            >
              {showRoleSelect ? "Hide roles ▲" : "Select your role ▼"}
            </button>
            {showRoleSelect && (
              <div className="flex space-x-4 mt-2">
                {["admin", "professional", "user"].map((r) => (
                  <label key={r} className="flex items-center space-x-1">
                    <input
                      type="radio"
                      name="role"
                      value={r}
                      checked={formData.role === r}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-cyan-600"
                    />
                    <span className="capitalize text-gray-700">{r}</span>
                  </label>
                ))}
              </div>
            )}
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
          </div>

          {/* Matric, Email, Password */}
          {["matric", "email", "password"].map((field) => (
            <div key={field} className="space-y-2">
              <label htmlFor={field} className="block text-sm font-semibold text-gray-700 capitalize">
                {field === "matric" ? "Matric Number" : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <div className="relative">
                {field === "matric" && (
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                )}
                {field === "email" && (
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                )}
                {field === "password" && (
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                )}
                <input
                  type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                  name={field}
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 ${
                    errors[field] ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"
                  }`}
                  placeholder={`Enter your ${field === "matric" ? "matric number" : field}`}
                />
              </div>
              {errors[field] && (
                <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl text-lg disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 flex justify-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-medium hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
