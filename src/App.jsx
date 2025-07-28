// file: src/App.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [studentIdInput, setStudentIdInput] = useState("");
  const [message, setMessage] = useState("");

  const apiUrl = "http://192.168.100.51:5000";

  // Hàm để lấy danh sách sinh viên
  const fetchStudents = () => {
    axios
      .get(`${apiUrl}/api/students`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Có lỗi khi lấy danh sách sinh viên!", error);
      });
  };

  // Hàm  để lấy dữ liệu điểm danh
  const fetchAttendance = () => {
    axios
      .get(`${apiUrl}/api/attendance/live`)
      .then((response) => {
        setAttendance(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy dữ liệu điểm danh!", error);
      });
  };

  useEffect(() => {
    fetchStudents();
    fetchAttendance();
    const intervalId = setInterval(fetchAttendance, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // Hàm xử lý việc nhấn nút đăng ký
  const handleRegister = (event) => {
    event.preventDefault();
    setMessage("");
    if (!studentIdInput) {
      setMessage("Vui lòng nhập Mã số sinh viên.");
      return;
    }

    axios
      .post(`${apiUrl}/api/register`, { student_id: studentIdInput })
      .then((response) => {
        setMessage(response.data.message);
        fetchStudents();
      })
      .catch((error) => {
        // Xử lý khi API trả về lỗi
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          // Nếu có thông báo lỗi cụ thể từ server
          setMessage(error.response.data.error);
        } else {
          setMessage("Lỗi kết nối đến server. Vui lòng thử lại.");
        }
        console.error("Lỗi khi đăng ký:", error); // In lỗi đầy đủ ra console để xem
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Phần đăng ký */}
        <section>
          <h2>Đăng ký Thiết bị</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Nhập MSSV của bạn"
              value={studentIdInput}
              onChange={(e) => setStudentIdInput(e.target.value)}
            />
            <button type="submit">Đăng ký</button>
          </form>

          {message && <p>{message}</p>}
        </section>

        <hr />

        {/* Phần hiển thị danh sách */}
        <section>
          <h1>Bảng Điểm danh Trực tiếp</h1>
          <table>
            <thead>
              <tr>
                <th>MSSV</th>
                <th>Họ và Tên</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((student) => (
                <tr key={student.student_id}>
                  <td>{student.student_id}</td>
                  <td>{student.full_name}</td>
                  <td
                    style={{
                      color:
                        student.status === "Có mặt" ? "lightgreen" : "salmon",
                    }}
                  >
                    {student.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <hr />

        {/* Phần hiển thị danh sách sinh viên đã đăng ký */}
        <section>
          <h1>Danh sách Sinh viên Đã đăng ký</h1>
          <table>
            <thead>
              <tr>
                <th>MSSV</th>
                <th>Họ và Tên</th>
                <th>Địa chỉ MAC</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.student_id}>
                  <td>{student.student_id}</td>
                  <td>{student.full_name}</td>
                  <td>{student.mac_address || "Chưa đăng ký"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </header>
    </div>
  );
}

export default App;
