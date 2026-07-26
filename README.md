# Portal Web Masjid Al-Ma'mur

Sistem Informasi dan Manajemen Konten Terpadu (CMS) untuk Masjid Jami' Al-Ma'mur, dibangun menggunakan [Astro](https://astro.build/) dengan styling [Tailwind CSS](https://tailwindcss.com/) dan database MySQL.

## Fitur Utama
- **Frontend Interaktif:** Desain antarmuka berkelas premium (glassmorphism & animasi).
- **Manajemen Berita & Kegiatan:** Publikasi kajian dan informasi secara mudah dengan dukungan SEO.
- **Galeri Foto:** Penyimpanan visualisasi kegiatan masjid.
- **Profil & Susunan Pengurus:** Kustomisasi profil, logo, visi-misi, serta daftar anggota DKM.
- **Dakwah via TikTok:** Integrasi video slider dari konten-konten dakwah.
- **Sistem Upload Tersentralisasi:** Pengunggahan gambar dan logo langsung ke dalam server.

---

## 🚀 Panduan Instalasi (Server / VPS)

Panduan ini berisi langkah-langkah untuk melakukan *deploy* aplikasi ini ke lingkungan server atau VPS (Linux/Ubuntu).

### 1. Persyaratan Sistem (*Prerequisites*)
Pastikan server Anda sudah terinstal:
- **Node.js** (Minimal v18+)
- **NPM** (Bawaan Node.js)
- **MySQL / MariaDB** Server
- **PM2** (Untuk menjalankan aplikasi di *background*): `npm install -g pm2`
- **Git**

### 2. Kloning Repositori
Silakan kloning kode sumber dari repositori GitHub Anda ke VPS:
```bash
git clone <URL_REPO_GITHUB_ANDA>
cd almamur
```

### 3. Setup Database (Import Seeder)
Aplikasi ini sudah menyertakan file `database.sql` yang berisi struktur tabel dasar beserta **data seeder** (berita, pengguna, galeri, dan profil awal).

1. Masuk ke MySQL di server Anda:
   ```bash
   mysql -u root -p
   ```
2. Buat database baru (misal: `almamurweb`):
   ```sql
   CREATE DATABASE almamurweb;
   EXIT;
   ```
3. Import data seeder ke dalam database yang baru dibuat:
   ```bash
   mysql -u root -p almamurweb < database.sql
   ```

### 4. Konfigurasi Lingkungan (*Environment*)
1. Salin atau buat file `.env` di dalam folder root (*copy* dari file bawaan jika ada, atau buat baru):
   ```bash
   nano .env
   ```
2. Sesuaikan konfigurasi koneksi database Anda di file `.env` tersebut:
   ```ini
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password_database_anda
   DB_NAME=almamurweb
   ```

### 5. Instalasi Dependensi & Build
Jalankan perintah berikut untuk menginstal seluruh modul Node.js dan melakukan *build* versi *production*:
```bash
npm install
npm run build
```

### 6. Menjalankan Aplikasi (*Production*)
Aplikasi yang di-build perlu dijalankan secara terus menerus. Kita bisa menggunakan `pm2` dan script node langsung (karena menggunakan `@astrojs/node` mode server/hybrid).

1. Jalankan server produksi di port 4321:
   ```bash
   HOST=0.0.0.0 PORT=4321 pm2 start dist/server/entry.mjs --name "almamur-web"
   ```
   *(Catatan: Anda bisa mengubah port 4321 menjadi port berapapun, sesuaikan dengan konfigurasi Nginx/Reverse Proxy Anda nanti)*

2. Atur agar PM2 otomatis berjalan saat VPS *restart* (reboot):
   ```bash
   pm2 startup
   pm2 save
   ```

---

## 🔑 Informasi Login Default
Karena data sudah disemai (*seeded*) dari database saat ini, silakan gunakan kredensial berikut untuk masuk ke Dasbor Admin:
- **Halaman Login:** `http://<IP_atau_Domain_Anda>:4321/admin/login`
- **Email:** `admin@almamur.id`
- **Password:** `admin123`

*(Sangat disarankan untuk segera mengganti password ini setelah instalasi berhasil dilakukan di menu Manajemen User).*

---

## 📁 Struktur Direktori Penting
- `/public/uploads/` : Direktori penyimpanan semua gambar yang diunggah (Berita, Galeri, Profil).
- `database.sql` : Data mentah (dump) database yang berisi *schema* lengkap dan data awal.
- `/src/` : Kumpulan kode sumber (*source code*) Astro.

## Dukungan & Bantuan
Bila ada kendala mengenai sistem ini, pastikan VPS Anda membuka *port* yang dibutuhkan (firewall UFW) atau periksa konfigurasi *Reverse Proxy* (seperti Nginx/Apache) untuk mengarahkan domain Anda ke port aplikasi ini.
