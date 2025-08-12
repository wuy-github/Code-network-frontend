// src/components/TeacherControls.jsx
import React from "react";

// Component này chỉ chịu trách nhiệm cho khu vực điều khiển của giảng viên.
// Logic nhận props và hoạt động không thay đổi.
function TeacherControls({ isSessionActive, onStart, onStop }) {
  return (
    // Bọc toàn bộ component trong một card để nhất quán
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      {/* Tiêu đề của card */}
      <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
        Bảng điều khiển Giảng viên
      </h2>
      {/* Container cho các nút bấm, tự động xếp chồng trên màn hình nhỏ */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {/* Nút Bắt đầu */}
        <button
          onClick={onStart}
          disabled={isSessionActive}
          className="w-full font-bold py-2 px-4 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 bg-sky-600 text-white hover:bg-sky-700 disabled:bg-sky-800 disabled:text-gray-400 disabled:cursor-not-allowed focus:ring-sky-500"
        >
          Bắt đầu Điểm danh
        </button>
        {/* Nút Kết thúc */}
        <button
          onClick={onStop}
          disabled={!isSessionActive}
          className="w-full font-bold py-2 px-4 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 bg-red-600 text-white hover:bg-red-700 disabled:bg-red-800 disabled:text-gray-400 disabled:cursor-not-allowed focus:ring-red-500"
        >
          Kết thúc Điểm danh
        </button>
      </div>
      {/* Hiển thị trạng thái phiên */}
      <p className="text-center text-gray-400">
        Trạng thái Phiên:
        {/* Dùng class của Tailwind thay cho inline style */}
        <span
          className={`font-bold ml-2 ${
            isSessionActive ? "text-green-400" : "text-red-400"
          }`}
        >
          {isSessionActive ? "● ĐANG MỞ" : "● ĐANG ĐÓNG"}
        </span>
      </p>
    </div>
  );
}

export default TeacherControls;
