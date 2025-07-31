// src/App.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

// Import các component con đã tạo
import TeacherControls from "./components/TeacherControls";
import AddStudentForm from "./components/AddStudentForm";
import RegisterDeviceForm from "./components/RegisterDeviceForm";
import AttendanceTable from "./components/AttendanceTable";
import StudentListTable from "./components/StudentListTable";

function App() {
  // =================================================================
  // == PHẦN 1: QUẢN LÝ STATE VÀ LOGIC
  // =================================================================
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [studentIdInput, setStudentIdInput] = useState("");
  const [message, setMessage] = useState("");
  const [newStudentId, setNewStudentId] = useState("");
  const [newStudentName, setNewStudentName] = useState("");
  const [isSessionActive, setIsSessionActive] = useState(false);

  const apiUrl = "http://192.168.1.149:5000";

  const sessionActiveRef = useRef(isSessionActive);
  sessionActiveRef.current = isSessionActive;

  // Lấy danh sách sinh viên
  const fetchStudents = () => {
    axios
      .get(`${apiUrl}/api/students`)
      .then((response) => setStudents(response.data))
      .catch((error) =>
        console.error("Lỗi khi lấy danh sách sinh viên!", error)
      );
  };

  // Lấy dữ liệu điểm danh
  const fetchAttendance = () => {
    if (sessionActiveRef.current) {
      axios
        .get(`${apiUrl}/api/attendance/live`)
        .then((response) => setAttendance(response.data))
        .catch((error) =>
          console.error("Lỗi khi lấy dữ liệu điểm danh!", error)
        );
    } else {
      setAttendance([]);
    }
  };

  // useEffect để thiết lập tất cả khi ứng dụng tải lần đầu
  useEffect(() => {
    const fetchSessionStatus = () => {
      axios
        .get(`${apiUrl}/api/session/status`)
        .then((response) => setIsSessionActive(response.data.is_active))
        .catch((error) =>
          console.error("Lỗi khi lấy trạng thái phiên!", error)
        );
    };
    fetchSessionStatus();
    fetchStudents();
    const intervalId = setInterval(fetchAttendance, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // Hàm cho giảng viên: Bắt đầu phiên
  const handleStartSession = () => {
    setMessage("");
    axios
      .post(`${apiUrl}/api/session/start`)
      .then((response) => {
        setIsSessionActive(true);
        setMessage(response.data.message);
        fetchAttendance();
      })
      .catch((error) =>
        setMessage(error.response?.data?.error || "Lỗi kết nối đến server.")
      );
  };

  // Hàm cho giảng viên: Kết thúc phiên
  const handleStopSession = () => {
    setMessage("");
    axios
      .post(`${apiUrl}/api/session/stop`)
      .then((response) => {
        setIsSessionActive(false);
        setMessage(response.data.message);
      })
      .catch((error) =>
        setMessage(error.response?.data?.error || "Lỗi kết nối đến server.")
      );
  };

  // Xử lý thêm sinh viên
  const handleAddStudent = (event) => {
    event.preventDefault();
    setMessage("");
    if (!newStudentId || !newStudentName) {
      setMessage("Vui lòng nhập đủ MSSV và Họ tên để thêm.");
      return;
    }
    axios
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
    axios
      .post(`${apiUrl}/api/register`, { student_id: studentIdInput })
      .then((response) => {
        setMessage(response.data.message);
        fetchStudents();
      })
      .catch((error) =>
        setMessage(error.response?.data?.error || "Lỗi kết nối đến server.")
      );
  };

  // =================================================================
  // == PHẦN 2: RENDER GIAO DIỆN (Sử dụng các component con)
  // =================================================================
  return (
    <div className="App">
      <header className="App-header">
        {/* Component điều khiển của giảng viên */}
        <TeacherControls
          isSessionActive={isSessionActive}
          onStart={handleStartSession}
          onStop={handleStopSession}
        />
        <hr />

        {/* Component form thêm sinh viên */}
        <AddStudentForm
          onSubmit={handleAddStudent}
          newStudentId={newStudentId}
          setNewStudentId={setNewStudentId}
          newStudentName={newStudentName}
          setNewStudentName={setNewStudentName}
        />

        {/* Component form đăng ký thiết bị */}
        <RegisterDeviceForm
          onSubmit={handleRegister}
          studentIdInput={studentIdInput}
          setStudentIdInput={setStudentIdInput}
        />

        {/* Hiển thị thông báo chung */}
        {message && <p className="message">{message}</p>}
        <hr />

        {/* Component bảng điểm danh */}
        <AttendanceTable attendance={attendance} />

        <hr />

        {/* Component bảng danh sách sinh viên */}
        <StudentListTable students={students} />
      </header>
    </div>
  );
}

export default App;
