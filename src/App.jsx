// src/App.jsx

import React, { useState } from "react";
// Thêm useLocation để xác định route đang active
import { Routes, Route, Link, useLocation } from "react-router-dom";

// Import các provider và component cần thiết
import { SessionProvider } from "./contexts/SessionContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { useAuth } from "./hooks/useAuth.js";

import TeacherPage from "./pages/TeacherPage";
import StudentPage from "./pages/StudentPage";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Xóa import App.css vì chúng ta sẽ dùng Tailwind hoàn toàn
// import "./App.css";

// --- Component Header riêng để code gọn gàng hơn ---
function Header() {
  // Giả sử useAuth có cung cấp token và hàm logout
  const { token, logout } = useAuth();
  const location = useLocation();

  // Hàm để xác định class cho link đang active
  const getLinkClass = (path) => {
    return location.pathname.startsWith(path)
      ? "bg-sky-600 text-white"
      : "text-gray-300 hover:bg-gray-700 hover:text-white";
  };

  return (
    <header className="w-full mb-8">
      <div className="flex justify-between items-center bg-gray-800 p-4 rounded-xl shadow-lg">
        <h1 className="text-xl sm:text-2xl font-bold text-sky-400">
          Hệ thống Điểm danh
        </h1>
        <nav className="flex items-center  space-x-2 sm:space-x-4">
          <Link
            to="/teacher"
            className={`px-3 py-2 text-sm sm:text-base font-medium rounded-md transition-colors !text-white ${getLinkClass(
              "/teacher"
            )}`}
          >
            Trang Giảng viên
          </Link>
          <Link
            to="/student"
            className={`px-3 py-2 text-sm sm:text-base font-medium rounded-md transition-colors !text-white ${getLinkClass(
              "/student"
            )}`}
          >
            Trang Sinh viên
          </Link>
          {/* Nút đăng xuất chỉ hiện khi đã đăng nhập */}
          {token && (
            <button
              onClick={logout}
              className="px-3 py-2 text-sm sm:text-base font-medium bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Đăng xuất
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

// --- Component App chính ---
function App() {
  // Logic state không đổi
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const apiUrl = "http://192.168.1.184:5000";

  // Tạo một hàm helper để các component con có thể hiển thị thông báo
  // và tự động ẩn đi sau 5 giây
  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(""), 5000);
  };

  return (
    // AuthProvider phải bọc ngoài cùng để Header có thể dùng useAuth
    <AuthProvider>
      <SessionProvider apiUrl={apiUrl} setMessage={showMessage}>
        {/* Layout chính của toàn bộ ứng dụng */}
        <div className="min-h-screen bg-gray-900 text-gray-300 font-sans flex flex-col items-center">
          {/* === SỬA LỖI Ở ĐÂY: Xóa class max-w-6xl === */}
          <div className="w-full p-4 sm:p-6 lg:p-8">
            <Header />
            <main>
              <Routes>
                {/* Route trang chủ */}
                <Route
                  path="/"
                  element={
                    <div className="text-center mt-20">
                      <h2 className="text-3xl font-bold text-white">
                        Chào mừng đến với Hệ thống Điểm danh
                      </h2>
                      <p className="mt-4 text-lg text-gray-400">
                        Vui lòng chọn vai trò của bạn ở thanh điều hướng trên
                        cùng.
                      </p>
                    </div>
                  }
                />
                {/* Các route khác không đổi logic, chỉ truyền thêm props */}
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/student"
                  element={
                    <StudentPage
                      apiUrl={apiUrl}
                      message={message}
                      setMessage={showMessage}
                      messageType={messageType}
                    />
                  }
                />
                <Route path="/teacher" element={<ProtectedRoute />}>
                  <Route
                    index
                    element={
                      <TeacherPage
                        apiUrl={apiUrl}
                        message={message}
                        setMessage={showMessage}
                        messageType={messageType}
                      />
                    }
                  />
                </Route>
              </Routes>
            </main>
          </div>
        </div>
      </SessionProvider>
    </AuthProvider>
  );
}

export default App;
