# Backend Service

Dokumen ini menjelaskan struktur folder `backend` dan alur proses layanan backend untuk proyek ini.

## Struktur Folder

- `Dockerfile` - definisi image Docker untuk menjalankan backend.
- `package.json` - metadata npm dan daftar dependensi yang dibutuhkan.
- `src/` - kode sumber aplikasi.
  - `src/index.js` - entry point utama server Express.

## Alur Aplikasi

1. `src/index.js` mulai dijalankan dengan `npm start`.
2. File `.env` dimuat oleh `dotenv` untuk mengisi variabel lingkungan seperti:
   - `DB_NAME`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_HOST`
   - `DB_PORT`
   - `MINIO_ENDPOINT`
   - `MINIO_PORT`
   - `MINIO_ROOT_USER`
   - `MINIO_ROOT_PASSWORD`
   - `MINIO_BUCKET`
3. Server Express dikonfigurasi dengan middleware:
   - `cors()` untuk mengizinkan permintaan dari origin lain.
   - `express.json()` untuk mem-parsing JSON request body.
4. Koneksi database dibuat menggunakan Sequelize ke MySQL.
5. Koneksi ke MinIO disiapkan menggunakan `minio`.
6. Endpoint API utama:
   - `GET /api/students/health` - mengecek kesehatan backend dan koneksi database.
   - `POST /api/students/upload` - menerima upload file melalui `multer`, memastikan bucket MinIO ada, lalu menyimpan file ke bucket.

## Proses Build dan Run di Docker

Dockerfile melakukan langkah berikut:

1. Menggunakan base image `node:20-alpine`.
2. Menetapkan `WORKDIR /app`.
3. Menyalin `package*.json` lalu menjalankan `npm install`.
4. Menyalin seluruh isi folder `backend` ke dalam kontainer.
5. Mengekspos port `5000`.
6. Menjalankan `npm start` untuk memulai server.

## Perintah NPM

- `npm start` - menjalankan `node src/index.js`.
- `npm run dev` - menjalankan `nodemon src/index.js` untuk pengembangan.

## Catatan

- Backend ini bergantung pada MySQL dan MinIO yang dikonfigurasi melalui variabel lingkungan.
- Upload file menggunakan `multer` dalam memori sebelum dikirim ke bucket MinIO.