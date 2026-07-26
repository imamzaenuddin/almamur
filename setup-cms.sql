-- Tambah kolom SEO ke tabel berita (abaikan error jika sudah ada)
ALTER TABLE berita 
ADD COLUMN meta_title VARCHAR(255) NULL,
ADD COLUMN meta_description TEXT NULL,
ADD COLUMN meta_keywords VARCHAR(255) NULL;

-- Ubah enum role di tabel users
ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'pengurus', 'penulis') DEFAULT 'pengurus';

-- Buat tabel tiktok_videos
CREATE TABLE IF NOT EXISTS tiktok_videos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  judul VARCHAR(255) NOT NULL,
  url_video VARCHAR(255) NOT NULL,
  thumbnail VARCHAR(255) NULL,
  views VARCHAR(50) NULL,
  likes VARCHAR(50) NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Buat tabel galeri
CREATE TABLE IF NOT EXISTS galeri (
  id INT AUTO_INCREMENT PRIMARY KEY,
  judul VARCHAR(255) NOT NULL,
  gambar_url VARCHAR(255) NOT NULL,
  deskripsi TEXT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Buat tabel profil_masjid
CREATE TABLE IF NOT EXISTS profil_masjid (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama_masjid VARCHAR(255) NOT NULL,
  alamat TEXT NULL,
  visi TEXT NULL,
  misi TEXT NULL,
  sejarah LONGTEXT NULL,
  telepon VARCHAR(50) NULL,
  email VARCHAR(100) NULL,
  google_maps_link TEXT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert profil default jika masih kosong
INSERT INTO profil_masjid (nama_masjid, alamat)
SELECT "Masjid Jami' Al-Ma'mur", "Jl. Bintara XIV, RT.002/RW.009, Bintara, Kec. Bekasi Bar., Kota Bks, Jawa Barat 17134"
WHERE NOT EXISTS (SELECT 1 FROM profil_masjid LIMIT 1);

-- Buat tabel pengurus_dkm
CREATE TABLE IF NOT EXISTS pengurus_dkm (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  jabatan VARCHAR(100) NOT NULL,
  foto_url VARCHAR(255) NULL,
  urutan INT DEFAULT 0
);
