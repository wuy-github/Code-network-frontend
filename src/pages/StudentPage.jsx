// src/pages/StudentPage.jsx
import React from "react";
import { useSessionContext } from "../contexts/SessionContext";
import { useStudents } from "../hooks/useStudents"; // Vẫn dùng hook này để lấy logic đăng ký

import RegisterDeviceForm from "../components/RegisterDeviceForm";

function StudentPage({ apiUrl, message, setMessage }) {
  // Lấy trạng thái phiên từ Context để biết có được điểm danh không
  const { isSessionActive } = useSessionContext();

  // Lấy các state và hàm cần thiết cho việc đăng ký
  const { studentIdInput, setStudentIdInput, handleRegister } = useStudents(
    apiUrl,
    setMessage
  );

  return (
    <>
      <h2>Trang Điểm danh Sinh viên</h2>
      <p>
        Trạng thái Phiên:
        <span
          style={{
            color: isSessionActive ? "lightgreen" : "salmon",
            fontWeight: "bold",
          }}
        >
          {isSessionActive
            ? " ĐANG MỞ - Vui lòng đăng ký!"
            : " ĐANG ĐÓNG - Vui lòng chờ giảng viên mở phiên."}
        </span>
      </p>
      <hr />
      <RegisterDeviceForm
        onSubmit={handleRegister}
        studentIdInput={studentIdInput}
        setStudentIdInput={setStudentIdInput}
      />
      {message && <p className="message">{message}</p>}
    </>
  );
}

export default StudentPage;
