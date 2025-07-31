// src/components/AttendanceTable.jsx
import React from "react";

function AttendanceTable({ attendance }) {
  return (
    <section>
      <h2>Bảng Điểm danh Trực tiếp</h2>
      <table>
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ và Tên</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((student) => (
            <tr key={student.student_id}>
              <td>{student.student_id}</td>
              <td>{student.full_name}</td>
              <td
                style={{
                  color: student.status === "Có mặt" ? "lightgreen" : "salmon",
                }}
              >
                {student.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default AttendanceTable;
