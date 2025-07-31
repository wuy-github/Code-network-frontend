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

function TeacherPage({ apiUrl, message, setMessage }) {
  // Lấy dữ liệu phiên từ Context
  const {
    isSessionActive,
    sessionReport,
    handleStartSession,
    handleStopSession,
  } = useSessionContext();

  // Lấy dữ liệu sinh viên từ hook (chỉ dùng các phần liên quan đến quản lý)
  const {
    students,
    newStudentId,
    setNewStudentId,
    newStudentName,
    setNewStudentName,
    handleAddStudent,
  } = useStudents(apiUrl, setMessage);

  // Lấy dữ liệu điểm danh từ hook
  const { attendance } = useAttendance(apiUrl, isSessionActive);

  return (
    <>
      <TeacherControls
        isSessionActive={isSessionActive}
        onStart={handleStartSession}
        onStop={handleStopSession}
      />
      <hr />
      <AddStudentForm
        onSubmit={handleAddStudent}
        newStudentId={newStudentId}
        setNewStudentId={setNewStudentId}
        newStudentName={newStudentName}
        setNewStudentName={setNewStudentName}
      />
      {message && <p className="message">{message}</p>}
      <hr />
      {sessionReport ? (
        <SessionReport report={sessionReport} />
      ) : (
        <AttendanceTable attendance={attendance} />
      )}
      <hr />
      <StudentListTable students={students} />
    </>
  );
}

export default TeacherPage;
