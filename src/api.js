// src/api.js

import axios from "axios";

// 1. Tạo một "instance" của axios
const api = axios.create({
  // Bạn có thể đặt baseURL ở đây để không phải gõ lại ở mọi nơi
  baseURL: "http://192.168.1.184:5000", // Hãy chắc chắn đây là IP của backend
});

// 2. Thiết lập "Interceptor" - Người can thiệp
// Đoạn code này sẽ chạy TRƯỚC MỖI REQUEST được gửi đi từ instance 'api'
api.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem("token");

    // Nếu có token, đính kèm nó vào header Authorization
    if (token) {
      // Backend sẽ đọc header này để xác thực
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    // Trả về config đã được sửa đổi để request tiếp tục được gửi đi
    return config;
  },
  (error) => {
    // Xử lý lỗi nếu có
    return Promise.reject(error);
  }
);

// 3. Export instance đã được cấu hình
export default api;
