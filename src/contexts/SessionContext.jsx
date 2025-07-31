// src/contexts/SessionContext.jsx
import React, { createContext, useContext } from "react";
import { useSession } from "../hooks/useSession.js"; // Import hook bạn đã tạo

// Tạo một Context mới
const SessionContext = createContext();

// Tạo một component "Provider" để bao bọc ứng dụng
export function SessionProvider({ children, apiUrl, setMessage }) {
  const sessionData = useSession(apiUrl, setMessage);

  return (
    <SessionContext.Provider value={sessionData}>
      {children}
    </SessionContext.Provider>
  );
}

// SỬA LỖI: Thêm dòng bình luận này để tắt cảnh báo của ESLint
// eslint-disable-next-line react-refresh/only-export-components
export function useSessionContext() {
  return useContext(SessionContext);
}
