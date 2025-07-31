// src/hooks/useAttendance.js
import { useState, useEffect, useRef } from "react";
import axios from "axios";

// Hook này quản lý việc điểm danh tự động
export function useAttendance(apiUrl, isSessionActive) {
  const [attendance, setAttendance] = useState([]);

  const sessionActiveRef = useRef(isSessionActive);
  sessionActiveRef.current = isSessionActive;

  useEffect(() => {
    const fetchAttendance = () => {
      if (sessionActiveRef.current) {
        axios
          .get(`${apiUrl}/api/attendance/live`)
          .then((response) => setAttendance(response.data))
          .catch((error) =>
            console.error("Lỗi khi lấy dữ liệu điểm danh!", error)
          );
      } else {
        setAttendance([]);
      }
    };

    fetchAttendance();

    const intervalId = setInterval(fetchAttendance, 5000);

    // Dọn dẹp
    return () => clearInterval(intervalId);
  }, [apiUrl, isSessionActive]);

  return { attendance };
}
