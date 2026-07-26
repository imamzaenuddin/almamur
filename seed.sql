-- Seed TikTok Videos
INSERT INTO tiktok_videos (judul, url_video, thumbnail, views, likes) VALUES 
('Keutamaan Sholat Subuh Berjamaah', 'https://www.tiktok.com/@masjidalmamur/video/1', 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=500&q=80', '1.2K', '450'),
('Suasana Tadarus Al-Quran bada Subuh di Masjid Al-Ma''mur', 'https://www.tiktok.com/@masjidalmamur/video/2', 'https://images.unsplash.com/photo-1609599006353-e629aaab315d?w=500&q=80', '3.4K', '1200'),
('Cuplikan Kajian Ahad Pagi bersama Ustadz, Sangat Menenangkan Hati 🤲', 'https://www.tiktok.com/@masjidalmamur/video/3', 'https://images.unsplash.com/photo-1574936145840-28808d77a0b6?w=500&q=80', '856', '120'),
('Persiapan Berbagi Iftar Gratis untuk Jamaah. Mari Berlomba dalam Kebaikan! 🍱', 'https://www.tiktok.com/@masjidalmamur/video/4', 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=500&q=80', '5.2K', '340');

-- Seed Galeri
INSERT INTO galeri (judul, gambar_url, deskripsi) VALUES 
('Tampak Depan Masjid', 'https://images.unsplash.com/photo-1564121211835-e88c852648ab?w=800&q=80', 'Fasad depan Masjid Jami'' Al-Ma''mur yang megah dan estetik.'),
('Kajian Rutin Ahad Pagi', 'https://images.unsplash.com/photo-1574936145840-28808d77a0b6?w=800&q=80', 'Jamaah antusias mengikuti kajian rutin setiap hari Ahad pagi di ruang utama masjid.'),
('TPA Anak-anak', 'https://images.unsplash.com/photo-1584553421349-355dbcb32ee3?w=800&q=80', 'Kegiatan belajar membaca Al-Quran anak-anak di lingkungan masjid.'),
('Fasilitas Tempat Wudhu', 'https://images.unsplash.com/photo-1552656967-798d46a11def?w=800&q=80', 'Tempat wudhu pria yang senantiasa dijaga kebersihannya demi kenyamanan jamaah.');

-- Seed Pengurus DKM
INSERT INTO pengurus_dkm (nama, jabatan, foto_url, urutan) VALUES 
('H. Ahmad Fauzi', 'Ketua DKM', 'https://randomuser.me/api/portraits/men/32.jpg', 1),
('Ust. Budi Santoso', 'Wakil Ketua', 'https://randomuser.me/api/portraits/men/44.jpg', 2),
('Ir. Supriyadi', 'Sekretaris', 'https://randomuser.me/api/portraits/men/62.jpg', 3),
('H. Muhammad Ridwan', 'Bendahara', 'https://randomuser.me/api/portraits/men/22.jpg', 4),
('Ust. Hasan Basri', 'Seksi Dakwah', 'https://randomuser.me/api/portraits/men/15.jpg', 5);

-- Tambah 1 dummy Berita lengkap dengan SEO
INSERT INTO berita (judul, slug, ringkasan, isi_konten, id_kategori, id_penulis, status, meta_title, meta_description, meta_keywords) VALUES 
('Pentingnya Memakmurkan Masjid di Era Modern', 'pentingnya-memakmurkan-masjid-era-modern', 'Masjid bukan hanya tempat sholat, tetapi pusat peradaban umat yang harus dimakmurkan oleh para pemuda.', '<p>Di era modern ini, peran masjid sangat penting tidak hanya sebagai tempat ibadah mahdhah, tetapi juga sebagai pusat kegiatan sosial dan pendidikan umat. Hal ini menuntut kesadaran kita semua, khususnya para pemuda untuk terus aktif di masjid.</p><p>Mari kita bersama-sama memakmurkan Masjid Al-Ma''mur dengan berbagai kegiatan positif.</p>', 1, 1, 'published', 'Pentingnya Memakmurkan Masjid di Era Modern - Artikel', 'Masjid bukan hanya tempat sholat, tetapi pusat peradaban umat. Mari makmurkan masjid kita dengan kegiatan positif.', 'memakmurkan masjid, peradaban islam, kajian masjid, pemuda hijrah');
