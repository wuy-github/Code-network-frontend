// src/components/RegisterDeviceForm.jsx
import React from "react";

function RegisterDeviceForm({ onSubmit, studentIdInput, setStudentIdInput }) {
  return (
    <section>
      <h2>Đăng ký Thiết bị (Chỉ khi phiên mở)</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Nhập MSSV của bạn"
          value={studentIdInput}
          onChange={(e) => setStudentIdInput(e.target.value)}
        />
        <button type="submit">Đăng ký</button>
      </form>
    </section>
  );
}

export default RegisterDeviceForm;
