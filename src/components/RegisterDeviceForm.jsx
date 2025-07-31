// src/components/RegisterDeviceForm.jsx
import React from "react";

function RegisterDeviceForm({ onSubmit, studentIdInput, setStudentIdInput }) {
  return (
    <section>
      <h2>Nhập mã sinh viên để điểm danh (Chỉ khi phiên mở)</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Nhập MSSV của bạn"
          value={studentIdInput}
          onChange={(e) => setStudentIdInput(e.target.value)}
        />
        <button type="submit">Điểm danh </button>
      </form>
    </section>
  );
}

export default RegisterDeviceForm;
