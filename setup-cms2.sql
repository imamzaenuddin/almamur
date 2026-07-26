INSERT INTO profil_masjid (nama_masjid, alamat)
SELECT "Masjid Jami' Al-Ma'mur", "Jl. Bintara XIV, RT.002/RW.009, Bintara, Kec. Bekasi Bar., Kota Bks, Jawa Barat 17134"
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM profil_masjid LIMIT 1);

CREATE TABLE IF NOT EXISTS pengurus_dkm (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  jabatan VARCHAR(100) NOT NULL,
  foto_url VARCHAR(255) NULL,
  urutan INT DEFAULT 0
);
