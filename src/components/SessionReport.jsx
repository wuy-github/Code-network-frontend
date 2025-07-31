// src/components/SessionReport.jsx
import React from "react";

function SessionReport({ report }) {
  if (!report) {
    return null;
  }

  // Tách sinh viên thành 2 danh sách có mặt và vắng mặt
  const presentStudents = report.filter((s) => s.status === "Có mặt");
  const absentStudents = report.filter((s) => s.status === "Vắng mặt");

  return (
    <section className="session-report">
      <h2>Kết quả Điểm danh Cuối cùng</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          textAlign: "left",
        }}
      >
        <div>
          <h4>Sinh viên Có mặt ({presentStudents.length})</h4>
          <ul>
            {presentStudents.map((student) => (
              <li key={student.student_id}>
                {student.student_id} - {student.full_name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Sinh viên Vắng mặt ({absentStudents.length})</h4>
          <ul>
            {absentStudents.map((student) => (
              <li key={student.student_id}>
                {student.student_id} - {student.full_name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default SessionReport;
