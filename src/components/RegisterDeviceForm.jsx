// src/components/RegisterDeviceForm.jsx
import React from "react";

function RegisterDeviceForm({ onSubmit, studentIdInput, setStudentIdInput }) {
  // The component's logic remains unchanged.
  // It still receives props and handles form submission as before.
  return (
    // The form no longer needs its own section or h2,
    // as the parent page (StudentPage) now provides the title and card structure.
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Nhập MSSV của bạn để điểm danh"
        value={studentIdInput}
        onChange={(e) => setStudentIdInput(e.target.value)}
        required
        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
      />
      <button
        type="submit"
        className="w-full font-bold py-2 px-4 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 bg-sky-600 text-white hover:bg-sky-700"
      >
        Điểm danh
      </button>
    </form>
  );
}

export default RegisterDeviceForm;
