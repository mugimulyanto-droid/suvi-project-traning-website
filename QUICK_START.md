# 🎓 Project Training Website - Quick Start Guide

## 📋 Daftar Isi
1. [Setup](#setup)
2. [Menjalankan Project](#menjalankan-project)
3. [Struktur Project](#struktur-project)
4. [Fitur Utama](#fitur-utama)
5. [API Documentation](#api-documentation)

---

## Setup

### Prerequisites
- Node.js (v14 atau lebih tinggi)
- MySQL Database
- Git (opsional)

### Installation

#### 1. Backend Setup
```bash
cd server

# Install dependencies
npm install

# Setup environment
# Edit .env file dengan database credentials Anda

# Push schema ke database
npx prisma db push

# Seed data awal
npx prisma db seed
```

#### 2. Frontend Setup
```bash
cd client

# Install dependencies
npm install
```

---

## Menjalankan Project

### Development Mode

#### Terminal 1 - Backend Server
```bash
cd server
npm run dev
```
Server akan berjalan di `http://localhost:3000`

#### Terminal 2 - Frontend Client
```bash
cd client
npm run dev
```
Client akan berjalan di `http://localhost:5173`

Buka browser dan akses `http://localhost:5173`

### Production Mode

#### Build Backend
```bash
cd server
npm run build
npm start
```

#### Build Frontend
```bash
cd client
npm run build
# Hasil build ada di dist/ folder
```

---

## Struktur Project

```
project/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductManagement.jsx      # 📦 CRUD Produk Component
│   │   │   └── ProductManagement.css      # Styling untuk Produk
│   │   ├── App.jsx                       # Main App Component
│   │   ├── App.css                       # App Styling
│   │   ├── index.css                     # Global Styling
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── server/                          # Express Backend
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── produk_controller.ts       # 📦 Produk Handler
│   │   │   ├── courses_controller.ts
│   │   │   └── registration_controller.ts
│   │   ├── services/
│   │   │   ├── produk_service.ts          # 📦 Produk Business Logic
│   │   │   ├── courses_service.ts
│   │   │   └── registration_service.ts
│   │   ├── routes/
│   │   │   └── public-api.ts             # 📦 API Endpoints
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── app.ts
│   │   └── index.ts
│   ├── prisma/
│   │   ├── schema.prisma                 # 📦 Database Schema dengan Produk
│   │   └── seed.ts                       # 📦 Initial Data
│   ├── package.json
│   ├── tsconfig.json
│   ├── babel.config.js
│   └── .env                              # Environment Variables
│
└── docs/                            # Dokumentasi
    ├── course.md
    └── registration.md

📦 = File/Folder baru untuk fitur Produk
```

---

## Fitur Utama

### 1. **Manajemen Produk (CRUD)**

#### Create (Buat Produk)
- Klik tombol "Tambah Produk Baru"
- Isi form dengan detail produk
- Klik "Simpan"

#### Read (Lihat Produk)
- Semua produk ditampilkan dalam grid card
- Setiap card menampilkan:
  - Gambar produk
  - Nama produk
  - Deskripsi
  - Harga (format Rp)
  - Stok availability

#### Update (Edit Produk)
- Klik tombol "Edit" pada card produk
- Ubah data yang ingin diubah
- Klik "Simpan"

#### Delete (Hapus Produk)
- Klik tombol "Hapus" pada card produk
- Konfirmasi penghapusan
- Produk akan dihapus dari database

### 2. **Data Validation**
- Nama produk tidak boleh kosong
- Harga tidak boleh kosong dan negatif
- Validasi input di frontend dan backend

### 3. **Responsive Design**
- Optimal untuk desktop, tablet, dan mobile
- Adaptive layout yang menyesuaikan screen size
- Touch-friendly buttons dan inputs

### 4. **Modern UI**
- Gradient purple-blue background
- Smooth animations dan transitions
- Color-coded buttons (green for save, red for delete, blue for edit)
- Loading states dan empty states

---

## API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### 1. Get All Products
```http
GET /products
```
**Response:**
```json
{
  "success": true,
  "data": [...],
  "message": "Berhasil mengambil semua produk"
}
```

#### 2. Get Product by ID
```http
GET /products/:id
```

#### 3. Create Product
```http
POST /products
Content-Type: application/json

{
  "nama_produk": "string (required)",
  "deskripsi": "string (optional)",
  "harga": "number (required, min 0)",
  "stok": "number (optional, default 0)",
  "gambar_url": "string (optional)"
}
```

#### 4. Update Product
```http
PUT /products/:id
Content-Type: application/json

{
  "nama_produk": "string (optional)",
  "deskripsi": "string (optional)",
  "harga": "number (optional)",
  "stok": "number (optional)",
  "gambar_url": "string (optional)"
}
```

#### 5. Delete Product
```http
DELETE /products/:id
```

---

## 🔧 Environment Variables

Create `.env` file di folder `server`:

```env
DATABASE_URL="mysql://user:password@localhost:3306/training"
NODE_ENV="development"
PORT=3000
```

---

## 📚 Useful Commands

### Backend
```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Prisma commands
npx prisma db push          # Push schema changes
npx prisma db seed          # Run seed data
npx prisma generate         # Generate Prisma Client
npx prisma studio           # Open Prisma Studio UI

# Testing
npm run test
```

### Frontend
```bash
# Development
npm run dev

# Build
npm run build

# Preview
npm run preview

# Lint
npm run lint
```

---

## 🐛 Troubleshooting

### Issue: "Port already in use"
**Solution:** 
- Pastikan tidak ada proses lain menggunakan port
- Atau ubah port di config file

### Issue: "Database connection refused"
**Solution:**
- Cek MySQL server sudah running
- Verifikasi credentials di `.env`
- Cek database sudah dibuat

### Issue: "API call failed / CORS error"
**Solution:**
- Pastikan backend server sudah running
- Cek console untuk error message
- Verify API URL di ProductManagement.jsx

### Issue: "Data tidak muncul"
**Solution:**
- Run seed: `npx prisma db seed`
- Check database dengan Prisma Studio: `npx prisma studio`
- Cek network tab di browser DevTools

---

## 📞 Support & Contact

Jika ada pertanyaan atau masalah, silakan check:
1. Documentation files di folder `docs/`
2. Console errors di browser DevTools (F12)
3. Server logs di terminal
4. Database status via Prisma Studio

---

## 📄 License

MIT License - Sesuaikan sesuai kebutuhan

---

**Happy Coding! 🚀**
