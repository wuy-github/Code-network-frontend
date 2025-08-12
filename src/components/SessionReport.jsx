// src/components/SessionReport.jsx
import React from "react";

function SessionReport({ report }) {
  // Logic không đổi: nếu không có report thì không hiển thị gì
  if (!report) {
    return null;
  }

  // Logic không đổi: Tách sinh viên thành 2 danh sách
  const presentStudents = report.filter((s) => s.status === "Có mặt");
  const absentStudents = report.filter((s) => s.status === "Vắng mặt");

  return (
    // Sử dụng card để nhất quán với các component khác
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      {/* Tiêu đề card */}
      <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
        Kết quả Điểm danh Cuối cùng
      </h2>
      {/* Bố cục lưới, 2 cột trên màn hình vừa và lớn, 1 cột trên màn hình nhỏ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cột Sinh viên Có mặt */}
        <div>
          <h4 className="font-bold text-green-400 mb-2">
            Sinh viên Có mặt ({presentStudents.length})
          </h4>
          <ul className="space-y-2 text-sm max-h-60 overflow-y-auto pr-2">
            {presentStudents.map((student) => (
              <li
                key={student.student_id}
                className="bg-gray-700/50 p-2 rounded-md"
              >
                {student.student_id} - {student.full_name}
              </li>
            ))}
          </ul>
        </div>
        {/* Cột Sinh viên Vắng mặt */}
        <div>
          <h4 className="font-bold text-red-400 mb-2">
            Sinh viên Vắng mặt ({absentStudents.length})
          </h4>
          <ul className="space-y-2 text-sm max-h-60 overflow-y-auto pr-2">
            {absentStudents.map((student) => (
              <li
                key={student.student_id}
                className="bg-gray-700/50 p-2 rounded-md"
              >
                {student.student_id} - {student.full_name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SessionReport;
