// ไฟล์: api/fetch-movie-details.js (API Key Proxy for Movie Details)

module.exports = async (req, res) => {
    const movieId = req.query.movie_id;
    if (!movieId) {
        return res.status(400).json({ error: 'Missing movie_id parameter' });
    }

    // 🔴 ROOT CAUSE FIX: ดึง API Key จาก Environment Variable ของ Vercel 🔴
    const apiKey = process.env.TMDB_API_KEY;

    try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}&include_image_language=en,null`;
        const response = await fetch(url);
        const data = await response.json();

        // ส่งรายละเอียดหนังกลับไปให้เว็บ
        res.status(200).json(data);
    } catch (error) {
        console.error('Fetch Details API Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};