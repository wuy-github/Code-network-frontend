// src/contexts/AuthContext.jsx

import React, { createContext, useState } from "react";
import axios from "axios";

// Thay đổi quan trọng: Thêm "export" ở đây để file khác có thể dùng.
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// PHẦN 2: Tạo "Nhà cung cấp" (Provider)
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = async (username, password) => {
    const response = await axios.post(
      "http://192.168.1.184:5000/api/teacher/login",
      {
        username,
        password,
      }
    );
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
    }
    return response;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// LƯU Ý: Chúng ta đã XÓA HOÀN TOÀN hook "useAuth" khỏi file này.
