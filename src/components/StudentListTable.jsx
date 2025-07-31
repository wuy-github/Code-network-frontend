// src/components/StudentListTable.jsx
import React from "react";

function StudentListTable({ students }) {
  return (
    <section>
      <h2>Danh sách Sinh viên</h2>
      <table>
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ và Tên</th>
            <th>Địa chỉ MAC</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.student_id}>
              <td>{student.student_id}</td>
              <td>{student.full_name}</td>
              <td>{student.mac_address || "Chưa đăng ký"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default StudentListTable;
