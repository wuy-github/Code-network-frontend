// src/hooks/useStudents.js
import { useState, useEffect, useCallback } from "react";
import api from "../api";

// Hook này quản lý mọi thứ liên quan đến danh sách sinh viên
export function useStudents(apiUrl, setMessage) {
  const [students, setStudents] = useState([]);
  const [newStudentId, setNewStudentId] = useState("");
  const [newStudentName, setNewStudentName] = useState("");
  const [studentIdInput, setStudentIdInput] = useState("");

  // Lấy danh sách sinh viên
  const fetchStudents = useCallback(() => {
    api
      .get(`${apiUrl}/api/students`)
      .then((response) => setStudents(response.data))
      .catch((error) =>
        console.error("Lỗi khi lấy danh sách sinh viên!", error)
      );
  }, [apiUrl]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleAddStudent = (event) => {
    event.preventDefault();
    setMessage("");
    if (!newStudentId || !newStudentName) {
      setMessage("Vui lòng nhập đủ MSSV và Họ tên để thêm.");
      return;
    }
    api
      .post(`${apiUrl}/api/students`, {
        student_id: newStudentId,
        full_name: newStudentName,
      })
      .then((response) => {
        setMessage(response.data.message);
        fetchStudents();
        setNewStudentId("");
        setNewStudentName("");
      })
      .catch((error) =>
        setMessage(error.response?.data?.error || "Lỗi kết nối đến server.")
      );
  };

  // Xử lý đăng ký thiết bị
  const handleRegister = (event) => {
    event.preventDefault();
    setMessage("");
    if (!studentIdInput) {
      setMessage("Vui lòng nhập MSSV để đăng ký.");
      return;
    }
    api
      .post(`${apiUrl}/api/register`, { student_id: studentIdInput })
      .then((response) => {
        setMessage(response.data.message);
        fetchStudents();
      })
      .catch((error) =>
        setMessage(error.response?.data?.error || "Lỗi kết nối đến server.")
      );
  };

  return {
    students,
    newStudentId,
    setNewStudentId,
    newStudentName,
    setNewStudentName,
    studentIdInput,
    setStudentIdInput,
    handleAddStudent,
    handleRegister,
  };
}
