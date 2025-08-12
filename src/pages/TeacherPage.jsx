// src/pages/TeacherPage.jsx
import React from "react";
import { useSessionContext } from "../contexts/SessionContext";
import { useStudents } from "../hooks/useStudents";
import { useAttendance } from "../hooks/useAttendance";

import TeacherControls from "../components/TeacherControls";
import AddStudentForm from "../components/AddStudentForm";
import AttendanceTable from "../components/AttendanceTable";
import StudentListTable from "../components/StudentListTable";
import SessionReport from "../components/SessionReport";

// Note: You'll need to pass 'messageType' from your App component
// or manage it within a dedicated context for this to work perfectly.
// For now, we'll assume a simple message display.
function TeacherPage({ apiUrl, message, setMessage, messageType }) {
  // Lấy dữ liệu phiên từ Context (Logic không đổi)
  const {
    isSessionActive,
    sessionReport,
    handleStartSession,
    handleStopSession,
  } = useSessionContext();

  // Lấy dữ liệu sinh viên từ hook (Logic không đổi)
  const {
    students,
    newStudentId,
    setNewStudentId,
    newStudentName,
    setNewStudentName,
    handleAddStudent,
  } = useStudents(apiUrl, setMessage);

  // Lấy dữ liệu điểm danh từ hook (Logic không đổi)
  const { attendance } = useAttendance(apiUrl, isSessionActive);

  // === PHẦN GIAO DIỆN ĐÃ ĐƯỢC THIẾT KẾ LẠI ===
  return (
    // Container chính với khoảng cách giữa các phần tử con
    <div className="space-y-8">
      <TeacherControls
        isSessionActive={isSessionActive}
        onStart={handleStartSession}
        onStop={handleStopSession}
      />

      {/* Hiển thị thông báo với style */}
      {message && (
        <div
          className={`p-4 rounded-md ${
            messageType === "error"
              ? "bg-red-900/50 border-red-700 text-red-300"
              : "bg-green-900/50 border-green-700 text-green-300"
          }`}
        >
          {message}
        </div>
      )}

      {/* Bố cục dạng lưới cho các phần nội dung chính */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cột chính, chiếm 2/3 không gian trên màn hình lớn */}
        <div className="lg:col-span-2 space-y-8">
          {sessionReport ? (
            <SessionReport report={sessionReport} />
          ) : (
            <AttendanceTable attendance={attendance} />
          )}
          <StudentListTable students={students} />
        </div>

        {/* Cột phụ, chiếm 1/3 không gian, chứa form thêm sinh viên */}
        <div className="lg:col-span-1">
          <AddStudentForm
            onSubmit={handleAddStudent}
            newStudentId={newStudentId}
            setNewStudentId={setNewStudentId}
            newStudentName={newStudentName}
            setNewStudentName={setNewStudentName}
          />
        </div>
      </div>
    </div>
  );
}

export default TeacherPage;
