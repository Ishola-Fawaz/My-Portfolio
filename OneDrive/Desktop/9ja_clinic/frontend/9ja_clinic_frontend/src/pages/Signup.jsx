// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Phone, Lock, Heart } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    matric: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    agrees: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showRoleSelect, setShowRoleSelect] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.role) newErrors.role = "Please select your role.";
    if (!formData.matric) newErrors.matric = "Matric number is required.";
    if (!formData.email) newErrors.email = "Valid email is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 chars.";
    if (!formData.agrees) newErrors.agrees = "You must agree to terms.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Redirect based on role
      const route = formData.role === "admin"
        ? "/admin"
        : formData.role === "professional"
          ? "/professional"
          : "/dashboard";
      navigate(route, { replace: true });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white backdrop-blur-sm bg-opacity-80 p-8 rounded-3xl shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl mb-4 shadow-lg">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Create Your Dókítà Account</h1>
          <p className="text-sm text-gray-600">Sign up to access your healthcare dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role toggle */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setShowRoleSelect(prev => !prev)}
              className="text-sm text-blue-600 hover:none"
            >
              {showRoleSelect ? "Hide role ▼" : "Select your role ▼"}
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

          {/* Standard fields */}
          {["matric", "email", "phone", "password"].map((field) => {
            const Icon = field === "matric" ? User
              : field === "email" ? Mail
              : field === "phone" ? Phone
              : Lock;

            return (
              <div key={field} className="space-y-2">
                <label htmlFor={field} className="block text-sm font-semibold text-gray-700 capitalize">
                  {field === "matric" ? "Matric Number" : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <div className="relative">
                  <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
                {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
              </div>
            );
          })}

          {/* Terms checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="agrees"
              checked={formData.agrees}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-sm text-gray-700">
              I agree to the{" "}
              <Link to="/terms" className="text-blue-600 hover:underline">Terms of Use</Link> and{" "}
              <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
            </label>
          </div>
          {errors.agrees && <p className="text-red-500 text-xs mt-1">{errors.agrees}</p>}

          <button
            type="submit"
            disabled={!formData.agrees || isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl text-lg disabled:opacity-50"
          >
            {isLoading ? "Signing up..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
