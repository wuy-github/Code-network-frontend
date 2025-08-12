// src/components/StudentListTable.jsx
import React from "react";

function StudentListTable({ students }) {
  return (
    // Bọc trong card để nhất quán
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      {/* Tiêu đề card */}
      <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
        Danh sách Sinh viên
      </h2>
      {/* Container cho phép cuộn dọc nếu danh sách quá dài */}
      <div className="overflow-y-auto max-h-96">
        <table className="w-full text-left">
          {/* Header của bảng, dính ở trên khi cuộn */}
          <thead className="bg-gray-700/50 text-gray-300 uppercase text-sm sticky top-0">
            <tr>
              <th className="p-3">MSSV</th>
              <th className="p-3">Họ và Tên</th>
              <th className="p-3">Địa chỉ MAC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {students.map((student) => (
              <tr key={student.student_id} className="hover:bg-gray-700/50">
                <td className="p-3 font-mono">{student.student_id}</td>
                <td className="p-3">{student.full_name}</td>
                <td className="p-3 font-mono text-cyan-400">
                  {/* Logic không đổi, chỉ thêm style cho trường hợp rỗng */}
                  {student.mac_address || (
                    <span className="text-gray-500">Chưa đăng ký</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentListTable;
