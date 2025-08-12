// src/components/AttendanceTable.jsx
import React from "react";

function AttendanceTable({ attendance }) {
  return (
    // Sử dụng các class của Tailwind để tạo card
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      {/* Tiêu đề của card */}
      <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
        Bảng Điểm danh Trực tiếp
      </h2>
      {/* Container cho bảng để có thể cuộn ngang trên màn hình nhỏ */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          {/* Header của bảng */}
          <thead className="bg-gray-700/50 text-gray-300 uppercase text-sm">
            <tr>
              <th className="p-3">MSSV</th>
              <th className="p-3">Họ và Tên</th>
              <th className="p-3 text-center">Trạng thái</th>
            </tr>
          </thead>
          {/* Body của bảng */}
          <tbody className="divide-y divide-gray-700">
            {/* Kiểm tra nếu có dữ liệu thì mới map, không thì hiển thị thông báo */}
            {attendance.length > 0 ? (
              attendance.map((student) => (
                <tr key={student.student_id} className="hover:bg-gray-700/50">
                  <td className="p-3 font-mono">{student.student_id}</td>
                  <td className="p-3">{student.full_name}</td>
                  <td className="p-3 text-center">
                    {/* Dùng span và class để tạo tag trạng thái thay vì inline style */}
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        student.status === "Có mặt"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              // Thông báo khi không có dữ liệu
              <tr>
                <td colSpan="3" className="text-center p-6 text-gray-500">
                  Chưa có dữ liệu điểm danh...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceTable;
