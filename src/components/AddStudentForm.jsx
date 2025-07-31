// src/components/AddStudentForm.jsx
import React from "react";

function AddStudentForm({
  onSubmit,
  newStudentId,
  setNewStudentId,
  newStudentName,
  setNewStudentName,
}) {
  return (
    <section>
      <h2>Thêm Sinh viên mới</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Nhập MSSV mới"
          value={newStudentId}
          onChange={(e) => setNewStudentId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nhập Họ và Tên"
          value={newStudentName}
          onChange={(e) => setNewStudentName(e.target.value)}
        />
        <button type="submit">Thêm sinh viên</button>
      </form>
    </section>
  );
}

export default AddStudentForm;
