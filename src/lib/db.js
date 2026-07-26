import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: import.meta.env.DB_HOST || 'localhost',
    user: import.meta.env.DB_USER || 'root',
    password: import.meta.env.DB_PASSWORD || '',
    database: import.meta.env.DB_NAME || 'almamurweb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export async function getPublishedBerita(limit = 6) {
    const [rows] = await pool.query(
        `SELECT b.id, b.judul, b.slug, b.ringkasan, b.gambar_utama, b.created_at, b.views, k.nama_kategori, u.nama as penulis 
         FROM berita b 
         JOIN kategori k ON b.id_kategori = k.id 
         JOIN users u ON b.id_penulis = u.id 
         WHERE b.status = 'published' 
         ORDER BY b.created_at DESC 
         LIMIT ?`, 
         [limit]
    );
    return rows;
}

export async function getBeritaBySlug(slug) {
    const [rows] = await pool.query(
        `SELECT b.*, k.nama_kategori, u.nama as penulis 
         FROM berita b 
         JOIN kategori k ON b.id_kategori = k.id 
         JOIN users u ON b.id_penulis = u.id 
         WHERE b.slug = ? AND b.status = 'published'`,
        [slug]
    );
    return rows[0];
}

export async function incrementViews(id) {
    await pool.query('UPDATE berita SET views = views + 1 WHERE id = ?', [id]);
}

export async function getTiktokVideos() {
    const [rows] = await pool.query('SELECT * FROM tiktok_videos ORDER BY created_at DESC');
    return rows;
}

export async function getGaleri() {
    const [rows] = await pool.query('SELECT * FROM galeri ORDER BY created_at DESC');
    return rows;
}

export async function getProfilMasjid() {
    const [rows] = await pool.query('SELECT * FROM profil_masjid LIMIT 1');
    return rows[0] || null;
}

export async function getPengurusDkm() {
    const [rows] = await pool.query('SELECT * FROM pengurus_dkm ORDER BY urutan ASC');
    return rows;
}
