// src/components/ProtectedRoute.jsx

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Component này hoạt động như một người gác cổng
function ProtectedRoute() {
  // 1. Hỏi người gác cổng: "Đã có vé (token) chưa?"
  const { token } = useAuth();

  // 2. Người gác cổng ra quyết định:
  // Nếu CÓ vé (token), cho phép đi tiếp vào các route con (dùng <Outlet />).
  // Nếu KHÔNG có vé, đẩy về trang /login.
  return token ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
