// src/pages/StudentPage.jsx
import React from "react";
import { useSessionContext } from "../contexts/SessionContext";
import { useStudents } from "../hooks/useStudents"; // Vẫn dùng hook này để lấy logic đăng ký

import RegisterDeviceForm from "../components/RegisterDeviceForm";

// Thêm prop messageType để có thể tạo style cho thông báo lỗi/thành công
function StudentPage({ apiUrl, message, setMessage, messageType }) {
  // Lấy trạng thái phiên từ Context để biết có được điểm danh không (Logic không đổi)
  const { isSessionActive } = useSessionContext();

  // Lấy các state và hàm cần thiết cho việc đăng ký (Logic không đổi)
  const { studentIdInput, setStudentIdInput, handleRegister } = useStudents(
    apiUrl,
    setMessage
  );

  return (
    // Container để căn giữa nội dung
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-900">
      {/* Card chính chứa toàn bộ nội dung */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-lg">
        {/* Tiêu đề của trang */}
        <h2 className="text-xl font-bold text-white mb-4 text-center border-b border-gray-700 pb-2">
          Trang Điểm danh Sinh viên
        </h2>

        {/* Hiển thị trạng thái phiên */}
        <p className="text-center text-lg my-6">
          Trạng thái Phiên:
          <span
            className={`font-bold ml-2 ${
              isSessionActive ? "text-green-400" : "text-red-400"
            }`}
          >
            {isSessionActive ? "● ĐANG MỞ" : "● ĐANG ĐÓNG"}
          </span>
        </p>

        {/* Hiển thị form đăng ký nếu phiên mở, ngược lại thì hiển thị thông báo */}
        {isSessionActive ? (
          <RegisterDeviceForm
            onSubmit={handleRegister}
            studentIdInput={studentIdInput}
            setStudentIdInput={setStudentIdInput}
          />
        ) : (
          <p className="text-center text-yellow-400 bg-yellow-900/50 p-4 rounded-md">
            Vui lòng chờ giảng viên mở phiên điểm danh.
          </p>
        )}

        {/* Hiển thị thông báo với style */}
        {message && (
          <div
            className={`p-4 mt-6 rounded-md text-center ${
              messageType === "error"
                ? "bg-red-900/50 border-red-700 text-red-300"
                : "bg-green-900/50 border-green-700 text-green-300"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentPage;
