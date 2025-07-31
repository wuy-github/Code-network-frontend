// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { SessionProvider } from "./contexts/SessionContext.jsx";
import TeacherPage from "./pages/TeacherPage";
import StudentPage from "./pages/StudentPage";

import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const apiUrl = "http://192.168.1.149:5000";

  return (
    <SessionProvider apiUrl={apiUrl} setMessage={setMessage}>
      <div className="App">
        <header className="App-header">
          {/* Tạo thanh điều hướng đơn giản */}
          <nav>
            <Link to="/teacher">Trang Giảng viên</Link> |{" "}
            <Link to="/student">Trang Sinh viên</Link>
          </nav>
          <hr />

          {/* Định nghĩa các route */}
          <Routes>
            <Route
              path="/teacher"
              element={
                <TeacherPage
                  apiUrl={apiUrl}
                  message={message}
                  setMessage={setMessage}
                />
              }
            />
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
          </Routes>
        </header>
      </div>
    </SessionProvider>
  );
}

export default App;
