// src/pages/LoginPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Import hook chúng ta vừa tạo

function LoginPage() {
  // Logic không đổi
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  // Logic không đổi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await auth.login(username, password);
      navigate("/teacher");
    } catch (err) {
      setError("Tên đăng nhập hoặc mật khẩu không đúng.");
      console.error("Lỗi đăng nhập:", err);
    }
  };

  return (
    // Container để căn giữa form
    <div className="flex justify-center items-center mt-16">
      {/* Card chứa form đăng nhập */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        {/* Tiêu đề */}
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Đăng nhập Giảng viên
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input cho username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Tên đăng nhập
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Tên đăng nhập"
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />
          </div>
          {/* Input cho password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            />
          </div>
          {/* Nút đăng nhập */}
          <button
            type="submit"
            className="w-full font-bold py-3 px-4 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 bg-sky-600 text-white hover:bg-sky-700"
          >
            Đăng nhập
          </button>
        </form>
        {/* Hiển thị thông báo lỗi */}
        {error && (
          <div className="p-4 mt-6 rounded-md text-center bg-red-900/50 border-red-700 text-red-300">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
