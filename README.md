# SIAKAD Containerized Application

Aplikasi Sistem Informasi Akademik (SIAKAD) berbasis container. Repositori ini memuat konfigurasi utama infrastruktur yang menggabungkan berbagai layanan (frontend, backend, database, dan object storage) ke dalam satu ekosistem Docker.

## Arsitektur dan Layanan terintegrasi

Sistem ini berjalan di atas Docker Compose dan terdiri dari 6 layanan utama:

- **Frontend**: Aplikasi antarmuka pengguna berbasis React.
- **Backend**: REST API melayani request dari antarmuka berbasis Node.js dan Express.
- **Database (db)**: Penyimpanan data relasional menggunakan MySQL 8.0.
- **MinIO**: Penyimpanan objek (Object Storage) untuk file dokumen mahasiswa.
- **phpMyAdmin**: Antarmuka grafis (GUI) untuk manajemen database MySQL.
- **Nginx**: Bertindak sebagai Web Server dan Reverse Proxy untuk merutekan trafik ke Frontend dan Backend dalam satu port yang sama.

## Infrastruktur Jaringan dan Penyimpanan

- **Network**: Seluruh container berjalan dalam satu jaringan terisolasi bernama `siakad-network` dengan menggunakan driver `bridge`. Komunikasi antar-container menggunakan nama service (misal: backend memanggil `http://db:3306`).
- **Volume**: Data disimpan secara permanen menggunakan Docker volumes (`mysql_data` dan `minio_data`) agar data tidak hilang ketika container dihentikan atau dihapus.

## Prasyarat Sistem

- Docker Engine
- Docker Compose plugin

## Cara Menjalankan Aplikasi

1. **Konfigurasi Environment**
   Gunakan file `.env.example` sebagai acuan untuk membuat file konfigurasi environment.
   ```bash
   cp .env.example .env
   ```

   *Catatan: Pastikan Anda telah menetapkan kredensial untuk MySQL dan MinIO di dalam file `.env`.*

2. **Jalankan Container**
   Eksekusi perintah berikut di root direktori (lokasi file `docker-compose.yml`) untuk membangun dan menjalankan semua container di latar belakang:
   ```bash
   docker compose up -d --build
   ```

3. **Catatan Startup**

   Untuk mencegah masalah koneksi saat pertama kali dijalankan, sistem menggunakan `depends_on` dan `healthcheck`. Layanan Backend akan otomatis menunggu hingga container Database (`db`) benar-benar berstatus _healthy_ dan siap menerima koneksi.

## Daftar Akses Layanan
   
   Setelah seluruh container berhasil berjalan, Anda dapat mengakses layanan melalui URL dan Port berikut pada mesin host:
   
   | Layanan             | URL Akses               | Keterangan                                                        |
   | ------------------- | ----------------------- | ----------------------------------------------------------------- |
   | **Aplikasi SIAKAD** | `http://localhost`      | Merutekan trafik ke antarmuka Frontend (Nginx, Port 80)           |
   | **Backend API**     | `http://localhost/api/` | Merutekan trafik ke Backend (Nginx, Port 80 ke 5000)              |
   | **phpMyAdmin**      | `http://localhost:8080` | Port 8080 (Login menggunakan kredensial MySQL di `.env`)          |
   | **MinIO Console**   | `http://localhost:9001` | Dashboard UI MinIO (Login menggunakan kredensial MinIO di `.env`) |
   | **MinIO API**       | `http://localhost:9000` | Endpoint utama untuk keperluan _Object Storage_                   |

## Manajemen Container Dasar

   - **Melihat log semua layanan:**
   
   ```bash
   docker compose logs -f
   
   ```

   - **Menghentikan aplikasi:**
   
   ```bash
   docker compose down
   
   ```

   - **Menghapus aplikasi beserta seluruh data (Database & File MinIO):**
   
   ```bash
   docker compose down -v
   
   ```

## **TECHNICAL DETAIL**

   **A. [FrontEnd: https://github.com/FreNzQuiN/AdSys-02/tree/main/frontend](https://github.com/FreNzQuiN/AdSys-02/tree/main/frontend)**

   **B. [BackEnd: https://github.com/FreNzQuiN/AdSys-02/tree/main/backend](https://github.com/FreNzQuiN/AdSys-02/tree/main/backend)**

## Lampiran

**1. Hasil docker compose build, dieksekusi di root directory.**

![Hasil docker compose build, dieksekusi di root directory.](https://raw.githubusercontent.com/FreNzQuiN/AdSys-02/refs/heads/main/img/dockercompose-result.png)

**2. Melihat docker containers melalui terminal dan docker desktop.**

![List docker containers melalui terminal.](https://raw.githubusercontent.com/FreNzQuiN/AdSys-02/refs/heads/main/img/docker-ps.png)

![List docker containers melalui docker desktop.](https://raw.githubusercontent.com/FreNzQuiN/AdSys-02/refs/heads/main/img/docker-desktop.png)

**3. Layanan docker terhubung dengan host.**

   **a. FrontEnd SIAKAD diakses melalui local.**
   ![Layanan frontend melalui browser host.](https://raw.githubusercontent.com/FreNzQuiN/AdSys-02/refs/heads/main/img/frontend.png)
   
   **b. MinIo diakses melalui local.**
   ![.](https://raw.githubusercontent.com/FreNzQuiN/AdSys-02/refs/heads/main/img/miniio.png)
   
   **c. phpMyAdmin diakses melalui local.**
   ![.](https://raw.githubusercontent.com/FreNzQuiN/AdSys-02/refs/heads/main/img/phpmyadmin.png)
