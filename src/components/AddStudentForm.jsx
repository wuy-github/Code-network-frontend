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
    // Sử dụng các class của Tailwind để tạo card
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      {/* Tiêu đề của card */}
      <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
        Thêm Sinh viên mới
      </h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Input đã được thiết kế */}
        <input
          type="text"
          placeholder="Nhập MSSV mới"
          value={newStudentId}
          onChange={(e) => setNewStudentId(e.target.value)}
          required
          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
        />
        {/* Input đã được thiết kế */}
        <input
          type="text"
          placeholder="Nhập Họ và Tên"
          value={newStudentName}
          onChange={(e) => setNewStudentName(e.target.value)}
          required
          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
        />
        {/* Button đã được thiết kế */}
        <button
          type="submit"
          className="w-full font-bold py-2 px-4 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 bg-sky-600 text-white hover:bg-sky-700"
        >
          Thêm sinh viên
        </button>
      </form>
    </div>
  );
}

export default AddStudentForm;
