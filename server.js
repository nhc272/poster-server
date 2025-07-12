const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' })); // Tăng giới hạn dữ liệu nhận vào

app.post('/render', async (req, res) => {
    console.log("-> Nhận được yêu cầu render poster...");
    const data = req.body;

    try {
        let html = await fs.readFile(__dirname + '/template.html', 'utf8');

        // Thay thế các placeholder bằng dữ liệu thật
        for (const key in data) {
            html = html.replace(new RegExp(`{{${key}}}`, 'g'), data[key]);
        }
        
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        const page = await browser.newPage();
        
        await page.setViewport({ width: 1280, height: 914 });
        await page.setContent(html, { waitUntil: 'networkidle0' });

        const posterElement = await page.$('#poster-preview');
        if (!posterElement) {
            await browser.close();
            return res.status(500).send('Không tìm thấy element #poster-preview trong template.');
        }

        const imageBuffer = await posterElement.screenshot({ type: 'png' });
        
        await browser.close();

        res.set('Content-Type', 'image/png');
        res.send(imageBuffer);
        console.log("-> Đã render và gửi ảnh thành công!");

    } catch (error) {
        console.error("Lỗi nghiêm trọng khi render:", error);
        res.status(500).send('Lỗi server khi render ảnh.');
    }
});

app.listen(PORT, () => {
    console.log(`Server đang lắng nghe tại http://localhost:${PORT}`);
});