// src/App.jsx

import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

// Import các provider và component cần thiết
import { SessionProvider } from "./contexts/SessionContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import TeacherPage from "./pages/TeacherPage";
import StudentPage from "./pages/StudentPage";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  // Hãy chắc chắn đây là IP của backend server
  const apiUrl = "http://192.168.1.184:5000";

  return (
    // 1. Bọc toàn bộ ứng dụng trong <AuthProvider>
    // Điều này đảm bảo mọi component bên trong đều có thể truy cập AuthContext
    <AuthProvider>
      <SessionProvider apiUrl={apiUrl} setMessage={setMessage}>
        <div className="App">
          <header className="App-header">
            <nav>
              <Link to="/teacher">Trang Giảng viên</Link> |{" "}
              <Link to="/student">Trang Sinh viên</Link>
            </nav>
            <hr />

            {/* 2. Cấu hình lại các Route */}
            <Routes>
              {/* Route mặc định */}
              <Route
                path="/"
                element={
                  <div>
                    <h2>Chào mừng đến với Hệ thống Điểm danh</h2>
                    <p>Vui lòng chọn vai trò của bạn ở trên.</p>
                  </div>
                }
              />

              {/* 3. Thêm route cho trang Đăng nhập */}
              <Route path="/login" element={<LoginPage />} />

              {/* Route cho sinh viên vẫn công khai như cũ */}
              <Route
                path="/student"
                element={
                  <StudentPage
                    apiUrl={apiUrl}
                    message={message}
                    setMessage={setMessage}
                  />
                }
              />

              {/* 4. Bảo vệ route của giáo viên */}
              <Route path="/teacher" element={<ProtectedRoute />}>
                {/* Nếu qua được "Người Gác Cổng", trang TeacherPage sẽ được hiển thị */}
                <Route
                  index
                  element={
                    <TeacherPage
                      apiUrl={apiUrl}
                      message={message}
                      setMessage={setMessage}
                    />
                  }
                />
              </Route>
            </Routes>
          </header>
        </div>
      </SessionProvider>
    </AuthProvider>
  );
}

export default App;
