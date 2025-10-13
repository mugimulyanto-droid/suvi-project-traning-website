# description API

dokumen ini menyediakan spesifikasi untuk spesifikasi pendaftaran kursus api.

## Base URL

`https://localhost:3000/`

## Endpoints

### 1. Pendaftaran Publik (Public Registration)

User dapat mendaftar sebagai pengguna baru melalui endpoint ini.

**Method:** `POST`
**Path:** `/register`

**Responses:**

- **200 OK:**

  ```json
  {
    "data": {
      "id": 1,
      "nama_lengkap": "Budi Santoso",
      "email": "budi.santoso@example.com",
      "kursus_id": 1,
      "tanggal_daftar": "2023-10-27T10:00:00.000Z"
    }
  }
  ```

  **400 Bad Request:**

  ```json
  {
    "errors": "Data pendafataran tidak lengkap"
  }
  ```

### 2. Manajemen Pendaftar (Admin)

Admin Dapat memantau pendaftar yang terdaftar dan mengelola informasi mereka.

**Method:** `GET`
**Path:** `/registrations`

**200 OK:**

```json
{
  "data": [
    {
      "id": 1,
      "nama_lengkap": "Budi Santoso",
      "email": "budi.santoso@example.com",
      "kursus_id": 1,
      "tanggal_daftar": "2023-10-27T10:00:00.000Z"
    },
    {
      "id": 2,
      "nama_lengkap": "Siti Aminah",
      "email": "siti.aminah@example.com",
      "kursus_id": 2,
      "tanggal_daftar": "2023-10-27T11:00:00.000Z"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 1,
    "size": 2
  }
}
```

**400 Bad Request:**

```json
{
  "errors": "Unauthorized: Invalid token"
}
```

### 3. Hapus Pendaftar (Admin)

Admin dapat menghapus pendaftar yang tidak terdaftar lagi.

**Method:** `DELETE`
**Path:** `/registrations/:id`

**200 OK:**

```json
{
  "message": "Pendaftar berhasil dihapus"
}
```

**400 Bad Request:**

```json
{
  "errors": "Unauthorized: Invalid token"
}
```
