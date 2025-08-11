// src/pages/LoginPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Import hook chúng ta vừa tạo

function LoginPage() {
  // Tạo các state để lưu trữ giá trị từ ô input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Lấy hàm login từ AuthContext thông qua hook useAuth
  const auth = useAuth();
  // Dùng hook của React Router để điều hướng trang
  const navigate = useNavigate();

  // Hàm này sẽ được gọi khi người dùng nhấn nút "Đăng nhập"
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn trình duyệt tải lại trang khi submit form
    setError(""); // Xóa lỗi cũ

    try {
      // Gọi hàm login đã định nghĩa trong AuthContext
      await auth.login(username, password);
      // Nếu login thành công, chuyển hướng người dùng đến trang của giáo viên
      navigate("/teacher");
    } catch (err) {
      // Nếu có lỗi (sai mật khẩu, sai username), hiển thị thông báo
      setError("Tên đăng nhập hoặc mật khẩu không đúng.");
      console.error("Lỗi đăng nhập:", err);
    }
  };

  return (
    <div>
      <h2>Đăng nhập cho Giảng viên</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Tên đăng nhập"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mật khẩu"
            required
          />
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
      {/* Nếu có lỗi thì hiển thị ở đây */}
      {error && <p style={{ color: "salmon" }}>{error}</p>}
    </div>
  );
}

export default LoginPage;
