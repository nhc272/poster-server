// server.js

// 1. IMPORT CÁC THƯ VIỆN CẦN THIẾT
const express = require('express');

// 2. KHỞI TẠO ỨNG DỤNG EXPRESS
const app = express();

// Middleware để express có thể đọc được dữ liệu JSON gửi lên từ client
app.use(express.json());

// 3. ĐỊNH NGHĨA CÁC ROUTE (Tuyến đường)

// =================================================================
// == ĐÂY LÀ ĐOẠN CODE QUAN TRỌNG NHẤT ĐỂ SỬA LỖI "Cannot GET /" ==
// =================================================================
// Route cho trang chủ (đường dẫn '/')
app.get('/', (req, res) => {
  // Gửi về một dòng thông báo đơn giản
  res.status(200).send('<h1>Chào mừng đến với FPT Poster Server</h1><p>Server đang hoạt động bình thường.</p>');
});


// =================================================================
// == VÍ DỤ VỀ CÁC ROUTE API CỦA BẠN ==
// =================================================================
// Hãy thay thế các route ví dụ này bằng các route thật trong dự án của bạn

// Ví dụ một route GET để lấy danh sách poster
app.get('/api/posters', (req, res) => {
  // (Ở đây sẽ là code logic để lấy dữ liệu từ database)
  const posters = [
    { id: 1, title: 'Poster 1', author: 'Người tạo 1' },
    { id: 2, title: 'Poster 2', author: 'Người tạo 2' }
  ];
  res.status(200).json(posters);
});

// Ví dụ một route POST để tạo poster mới
app.post('/api/posters', (req, res) => {
  const newPoster = req.body;
  // (Ở đây sẽ là code logic để lưu newPoster vào database)
  console.log('Đã nhận được poster mới:', newPoster);
  res.status(201).json({
    message: 'Tạo poster thành công!',
    data: newPoster
  });
});


// 4. KHỞI ĐỘNG SERVER

// Lấy cổng từ biến môi trường của Render, nếu không có thì mặc định là 3000 (để chạy ở máy bạn)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server đang lắng nghe tại http://localhost:${PORT}`);
});
