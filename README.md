# A. Pemilihan Tech-Stack

## 1. Bahasa Pemrograman dan Framework

Untuk aplikasi CRUD, kami menggunakan:

| Komponen | Teknologi            |
| -------- | -------------------- |
| Frontend | React                |
| Backend  | Node.js + Express.js |

---

## 2. Base Image Docker

Base image yang digunakan pada Dockerfile:

### Backend

```dockerfile
FROM node:20-alpine
```

### Frontend

```dockerfile
FROM node:20-alpine AS builder
```

Dan untuk serving static frontend:

```dockerfile
FROM nginx:alpine
```

---

## 3. Database yang Digunakan

Kami menggunakan:

```text
MySQL 8.0
```

---

## 4. Alasan Memilih MySQL 8.0

Alasan penggunaan MySQL 8.0:

- stabil untuk aplikasi CRUD
- kompatibel dengan phpMyAdmin
- dokumentasi luas
- mendukung modern authentication
- ringan dan mudah dijalankan pada Docker

---

## 5. Penggunaan MinIO

Kami sudah menggunakan:

```text
MinIO Object Storage
```

untuk penyimpanan file upload mahasiswa.

---

## 6. Nama Bucket MinIO

Bucket yang digunakan:

```text
siakad-documents
```

Bucket ini digunakan untuk menyimpan:

- foto profil mahasiswa
- scan ijazah
- dokumen akademik lainnya

---

# B. Desain Arsitektur Jaringan

## 1. Nama Docker Network

Docker network yang digunakan:

```text
siakad-network
```

Network ini menggunakan driver:

```text
bridge
```

---

## 2. Komunikasi Antar Service

Semua container berada dalam satu network Docker sehingga dapat saling berkomunikasi menggunakan service name Docker.

---

## 3. Koneksi Backend ke Database

Backend tidak menggunakan:

```text
localhost
```

melainkan menggunakan service name Docker:

```text
db
```

Contoh koneksi:

```text
mysql://db:3306
```

---

## 4. Koneksi Backend ke MinIO

Backend mengakses MinIO menggunakan service name:

```text
minio
```

Contoh endpoint:

```text
http://minio:9000
```

---

## 5. Port Host yang Dibuka

| Layanan                  | Port Host |
| ------------------------ | --------- |
| Dashboard Utama Aplikasi | 80        |
| phpMyAdmin               | 8080      |
| MinIO Console            | 9001      |
| MinIO API                | 9000      |

---

# C. Kendala Teknis

## 1. Kendala Terbesar

Kendala terbesar adalah komunikasi antar-container saat startup awal.

Masalah yang muncul:

```text
ECONNREFUSED db:3306
```

Penyebab:

- backend berjalan lebih cepat dibanding MySQL
- database belum siap menerima koneksi

---

## 2. Solusi yang Digunakan

Solusi yang kami gunakan:

- menggunakan `depends_on`
- menambahkan `healthcheck` pada MySQL
- menggunakan retry connection pada backend

---

## 3. Layanan yang Pernah Error

Beberapa layanan sempat mengalami error saat menjalankan:

```bash
docker compose up
```

---

### Backend

Masalah:

- gagal connect ke MySQL
- gagal connect ke MinIO saat startup awal

Penyebab:

- service dependency belum ready

---

### Nginx

Masalah:

- bad gateway

Penyebab:

- backend belum aktif saat nginx melakukan proxy request

---

## 4. Status Saat Ini

Saat ini seluruh container sudah dapat berjalan dengan baik:

- frontend
- backend
- mysql
- minio
- phpMyAdmin
- nginx
