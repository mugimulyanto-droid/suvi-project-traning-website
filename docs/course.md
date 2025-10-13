# description API

dokumen ini untuk spesifikasi manajemen kursus online yang akan dilakukan oleh admin

## Base URL

`https://localhost:3000/`

## Endpoints

### 1. Ambil data kursus

Admin dapat mengambil data kursus yang terdaftar.

**Method:** `GET`
**Path:** `/courses`

**Responses:**

- **200 OK:**

  ```json
  {
    "data": [
      {
        "id": 1,
        "nama_kursus": "Web Development",
        "durasi": "3 bulan",
        "gambar_url": "http://example.com/images/webdev.jpg"
      },
      {
        "id": 2,
        "nama_kursus": "Desain Grafis",
        "durasi": "2 bulan",
        "gambar_url": "http://example.com/images/desain.jpg"
      }
    ]
  }
  ```

  **400 Bad Request:**

  ```json
  {
    "errors": "Data kursus tidak ditemukan"
  }
  ```

### 2. Masukkan data kursus

Admin dapat melakukan penambahan data kursus online

**Method:** `POST`
**Path:** `/courses`

**201 (Response sukses):**

```json
{
  "data": {
    "id": 3,
    "nama_kursus": "Digital Marketing"
  }
}
```

**400 Bad Request:**

```json
{
  "error": "Nama kursus wajib diisi."
}
```

### 3. Hapus Kursus (Admin)

Admin dapat menghapus kursus yang tidak terdaftar lagi.

**Method:** `DELETE`
**Path:** `/courses/:id`

**200 OK:**

```json
{
  "message": "Kursus berhasil dihapus"
}
```

**400 Bad Request:**

```json
{
  "error": "Kursus tidak ditemukan."
}
```

### 4. Edit Kursus (Admin)

Admin dapat mengedit data kursus yang sudah terdaftar.

**Method:** `PUT`
**Path:** `/courses/:id`

**200 OK:**

```json
{
  "data": {
    "id": 3,
    "nama_kursus": "Digital Marketing",
    "durasi": "3 bulan",
    "gambar_url": "http://example.com/images/digitalmarketing.jpg"
  }
}
```

**400 Bad Request:**

```json
{
  "error": "Nama kursus wajib diisi."
}
```
