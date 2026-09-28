// ไฟล์: api/get-poster.js (Image Proxy Serverless Function)

module.exports = async (req, res) => {
    // 1. ดึง URL ของรูปโปสเตอร์จาก Query String ที่เว็บส่งมา
    const posterUrl = req.query.url;

    if (!posterUrl) {
        return res.status(400).send('Error: Missing url parameter');
    }

    try {
        // 2. เป็นตัวแทนไปดูดรูปมาจาก TMDB
        const response = await fetch(decodeURIComponent(posterUrl));
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 3. กำหนด Header ยืนยันว่าเป็นไฟล์ภาพ
        const contentType = response.headers.get('content-type');
        res.setHeader('Content-Type', contentType);

        // 🔴 ทีเด็ด: กำหนด Header ให้ iOS ยอมรับ (CORS Allow-Origin) 🔴
        // เมื่อส่งออกจาก Proxy นี้ iOS จะมองว่าเป็นข้อมูลปลอดภัย
        res.setHeader('Access-Control-Allow-Origin', '*');

        // 4. ส่งข้อมูลรูปภาพกลับไปให้เว็บ
        res.status(200).send(buffer);

    } catch (error) {
        console.error('Proxy Error:', error);
        res.status(500).send('Error fetching image');
    }
};