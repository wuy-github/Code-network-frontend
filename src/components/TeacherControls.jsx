// src/components/TeacherControls.jsx
import React from "react";

// Component này chỉ chịu trách nhiệm cho khu vực điều khiển của giảng viên.
// Nó nhận trạng thái và các hàm xử lý từ component cha (App.jsx) qua props.
function TeacherControls({ isSessionActive, onStart, onStop }) {
  return (
    <section className="teacher-controls">
      <h2>Bảng điều khiển Giảng viên</h2>
      <div>
        <button onClick={onStart} disabled={isSessionActive}>
          Bắt đầu Điểm danh
        </button>
        <button onClick={onStop} disabled={!isSessionActive}>
          Kết thúc Điểm danh
        </button>
      </div>
      <p>
        Trạng thái Phiên:
        <span
          style={{
            color: isSessionActive ? "lightgreen" : "salmon",
            fontWeight: "bold",
          }}
        >
          {isSessionActive ? " ĐANG MỞ" : " ĐANG ĐÓNG"}
        </span>
      </p>
    </section>
  );
}

export default TeacherControls;
