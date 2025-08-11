// src/hooks/useAttendance.js

import { useState, useEffect } from "react";
import { io } from "socket.io-client"; // Import thư viện socket.io-client

// Hook này bây giờ quản lý kết nối WebSocket thay vì gọi API
export function useAttendance(apiUrl, isSessionActive) {
  const [attendance, setAttendance] = useState([]);

  // useEffect sẽ quản lý vòng đời của kết nối WebSocket
  useEffect(() => {
    // Nếu phiên không hoạt động, chúng ta không làm gì cả và đảm bảo
    // bảng điểm danh trống.
    if (!isSessionActive) {
      setAttendance([]);
      return;
    }

    // 1. KHỞI TẠO KẾT NỐI:
    // Chỉ khi isSessionActive là true, chúng ta mới tạo kết nối tới server.
    const socket = io(apiUrl, {
      // Tùy chọn này giúp kết nối lại nếu bị mất mạng tạm thời
      reconnection: true,
      reconnectionAttempts: 5,
    });

    // 2. LẮNG NGHE SỰ KIỆN:
    // Đây là các "tai" của frontend, luôn chờ tín hiệu từ server.

    // Sự kiện 'connect' được kích hoạt khi kết nối thành công.
    // Rất hữu ích để kiểm tra (debug).
    socket.on("connect", () => {
      console.log("LOG: Đã kết nối tới WebSocket server với ID:", socket.id);
    });

    // Sự kiện quan trọng nhất: 'update_attendance'.
    // Tên này phải TRÙNG KHỚP với tên bạn đã đặt trong hàm socketio.emit() ở backend.
    socket.on("update_attendance", (data) => {
      // Khi nhận được dữ liệu mới, cập nhật state.
      // React sẽ tự động render lại bảng điểm danh với dữ liệu mới.
      console.log("LOG: Nhận được dữ liệu điểm danh mới.");
      setAttendance(data);
    });

    // Lắng nghe sự kiện khi phiên kết thúc từ backend
    socket.on("session_stopped", () => {
      console.log("LOG: Server báo phiên đã kết thúc. Xóa bảng điểm danh.");
      setAttendance([]);
    });

    // Bắt lỗi kết nối
    socket.on("connect_error", (err) => {
      console.error("ERROR: Lỗi kết nối WebSocket:", err.message);
    });

    // 3. DỌN DẸP KẾT NỐI:
    // Hàm return trong useEffect sẽ được gọi khi component bị "hủy"
    // hoặc khi isSessionActive thay đổi từ true -> false.
    // Việc này CỰC KỲ QUAN TRỌNG để tránh kết nối thừa và rò rỉ bộ nhớ.
    return () => {
      console.log("LOG: Ngắt kết nối WebSocket.");
      socket.disconnect();
    };

    // useEffect sẽ chạy lại mỗi khi một trong các giá trị trong mảng này thay đổi.
  }, [apiUrl, isSessionActive]);

  // Hook vẫn trả về `attendance` như cũ.
  // Component `TeacherPage` không cần biết dữ liệu này đến từ đâu.
  return { attendance };
}
