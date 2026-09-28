// ไฟล์: api/search-movies.js (API Key Proxy for Movie Search)

module.exports = async (req, res) => {
    const movieName = req.query.query;
    if (!movieName) {
        return res.status(400).json({ error: 'Missing query parameter' });
    }

    // 🔴 ROOT CAUSE FIX: ดึง API Key จาก Environment Variable ของ Vercel 🔴
    const apiKey = process.env.TMDB_API_KEY;

    try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}&language=en-US&page=1`;
        const response = await fetch(url);
        const data = await response.json();

        // ส่งผลการค้นหากลับไปให้เว็บ
        res.status(200).json(data);
    } catch (error) {
        console.error('Search API Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};