// src/hooks/useSession.js
import { useState, useEffect } from "react";
import api from "../api";

// Hook này quản lý mọi thứ liên quan đến phiên điểm danh
export function useSession(apiUrl, setMessage) {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionReport, setSessionReport] = useState(null);
  // Lấy trạng thái phiên từ server khi hook được sử dụng lần đầu
  useEffect(() => {
    api
      .get(`${apiUrl}/api/session/status`)
      .then((response) => setIsSessionActive(response.data.is_active))
      .catch((error) => console.error("Lỗi khi lấy trạng thái phiên!", error));
  }, [apiUrl]);

  // Hàm bắt đầu phiên
  const handleStartSession = () => {
    setMessage("");
    api
      .post(`${apiUrl}/api/session/start`)
      .then((response) => {
        setIsSessionActive(true);
        setSessionReport(null);
        setMessage(response.data.message);
      })
      .catch((error) =>
        setMessage(error.response?.data?.error || "Lỗi kết nối đến server.")
      );
  };

  // Hàm kết thúc phiên
  const handleStopSession = () => {
    setMessage("");
    api
      .post(`${apiUrl}/api/session/stop`)
      .then((response) => {
        console.log(
          "Dữ liệu nhận được từ API /api/session/stop:",
          response.data
        );
        setIsSessionActive(false);
        setSessionReport(response.data.report);
        setMessage(response.data.message);
      })
      .catch((error) =>
        setMessage(error.response?.data?.error || "Lỗi kết nối đến server.")
      );
  };

  // Trả về state và các hàm điều khiển để App.jsx có thể sử dụng
  return {
    isSessionActive,
    sessionReport,
    handleStartSession,
    handleStopSession,
  };
}
