import mysql from 'mysql2/promise';

async function seed() {
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'awdx',
        database: 'almamurweb'
    });
    
    try {
        await conn.query(`INSERT IGNORE INTO kategori (id, nama_kategori, slug) VALUES 
            (1, 'Kajian', 'kajian'),
            (2, 'Kegiatan', 'kegiatan'),
            (3, 'Pengumuman', 'pengumuman')
        `);
        
        await conn.query(`INSERT IGNORE INTO users (id, nama, email, password, role) VALUES 
            (1, 'Admin Masjid', 'admin@almamur.org', '123456', 'admin')
        `);
        
        console.log("Seeded default categories and users.");
    } catch (e) {
        console.error(e);
    } finally {
        await conn.end();
    }
}
seed();
