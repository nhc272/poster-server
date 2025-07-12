// 1. KHAI BÁO THƯ VIỆN VÀ KHỞI TẠO APP
const express = require('express');
const app = express();
// Dòng này rất quan trọng để server đọc được dữ liệu JSON client gửi lên
app.use(express.json());

// =============================================================
// == DATABASE GIẢ (FAKE DATABASE) ==
// Thay vì dùng database thật, ta dùng 1 mảng để lưu dữ liệu.
// Mỗi khi server khởi động lại, dữ liệu này sẽ được reset về ban đầu.
// =============================================================
let posters = [
  { id: 1, title: 'Poster Mẫu 1', author: 'AI Assistant', imageUrl: 'https://via.placeholder.com/150' },
  { id: 2, title: 'Poster Mẫu 2', author: 'AI Assistant', imageUrl: 'https://via.placeholder.com/150' }
];
let nextId = 3; // Dùng để tự động tạo ID cho poster mới

// =============================================================
// == CÁC API HOÀN CHỈNH (KHÔNG CÓ DẤU "..." NỮA) ==
// =============================================================

// API 1: TRANG CHỦ
// Khi truy cập vào trang web chính, nó sẽ hiện ra dòng này.
app.get('/', (req, res) => {
  res.status(200).send('<h1>Server đã chạy!</h1><p>Hãy dùng các tool như Postman để thử API.</p>');
});

// API 2: LẤY TOÀN BỘ danh sách posters
// Truy cập vào đường dẫn /api/posters để xem kết quả
app.get('/api/posters', (req, res) => {
  res.status(200).json(posters);
});

// API 3: TẠO MỘT POSTER MỚI
// Gửi yêu cầu POST tới /api/posters với dữ liệu JSON
app.post('/api/posters', (req, res) => {
  // Lấy dữ liệu từ client gửi lên (ví dụ từ Postman)
  const { title, author, imageUrl } = req.body;

  // Kiểm tra xem có đủ thông tin bắt buộc không
  if (!title || !author) {
    // Nếu thiếu, trả về lỗi 400
    return res.status(400).json({ message: 'Lỗi: Cần phải có title và author' });
  }

  // Tạo một đối tượng poster mới
  const newPoster = {
    id: nextId,
    title: title,
    author: author,
    imageUrl: imageUrl || 'https://via.placeholder.com/150' // Nếu không có ảnh thì dùng ảnh mặc định
  };

  // Thêm poster mới vào "database giả"
  posters.push(newPoster);
  nextId++; // Tăng ID lên cho lần tạo tiếp theo

  // Trả về cho client biết đã tạo thành công
  res.status(201).json(newPoster);
});

// =============================================================
// == KHỞI ĐỘNG SERVER (giữ nguyên) ==
// =============================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang lắng nghe tại http://localhost:${PORT}`);
});
