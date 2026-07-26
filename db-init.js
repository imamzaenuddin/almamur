import mysql from 'mysql2/promise';

async function initDB() {
    console.log('Connecting to database almamurweb...');
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'awdx',
        database: 'almamurweb'
    });

    try {
        console.log('Connected to MySQL database.');

        // Tabel Kategori
        await connection.query(`
            CREATE TABLE IF NOT EXISTS kategori (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nama_kategori VARCHAR(100) NOT NULL,
                slug VARCHAR(100) NOT NULL UNIQUE,
                INDEX idx_slug (slug)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);
        console.log('Tabel kategori berhasil dibuat / diverifikasi.');

        // Tabel Users
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nama VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role ENUM('admin', 'penulis') DEFAULT 'penulis',
                INDEX idx_email (email)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);
        console.log('Tabel users berhasil dibuat / diverifikasi.');

        // Tabel Berita
        await connection.query(`
            CREATE TABLE IF NOT EXISTS berita (
                id INT AUTO_INCREMENT PRIMARY KEY,
                judul VARCHAR(255) NOT NULL,
                slug VARCHAR(255) NOT NULL UNIQUE,
                ringkasan TEXT,
                isi_konten LONGTEXT NOT NULL,
                gambar_utama VARCHAR(255),
                id_kategori INT NOT NULL,
                id_penulis INT NOT NULL,
                status ENUM('draft', 'published') DEFAULT 'draft',
                views INT DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                
                FOREIGN KEY (id_kategori) REFERENCES kategori(id) ON DELETE RESTRICT ON UPDATE CASCADE,
                FOREIGN KEY (id_penulis) REFERENCES users(id) ON DELETE RESTRICT ON UPDATE CASCADE,
                
                INDEX idx_status_created (status, created_at DESC),
                INDEX idx_slug (slug),
                INDEX idx_kategori (id_kategori),
                INDEX idx_views (views DESC)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);
        console.log('Tabel berita berhasil dibuat / diverifikasi.');
        
        console.log('Database initialization completed.');

    } catch (err) {
        console.error('Error during database initialization:', err);
    } finally {
        await connection.end();
    }
}

initDB();
