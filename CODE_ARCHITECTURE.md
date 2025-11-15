# 📚 Code Architecture & Structure Guide

## 🏗️ Project Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    BROWSER / CLIENT                         │
│  React Component (ProductManagement.jsx)                    │
│  - State Management                                         │
│  - User Interactions                                        │
│  - Form Handling                                            │
└────────────────────┬────────────────────────────────────────┘
                     │
                HTTP Requests (Fetch API)
                     │
                     ↓
┌─────────────────────────────────────────────────────────────┐
│               EXPRESS API SERVER (Port 3000)                │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Routes (public-api.ts)                              │   │
│  │ - GET /api/products                                 │   │
│  │ - POST /api/products                                │   │
│  │ - PUT /api/products/:id                             │   │
│  │ - DELETE /api/products/:id                          │   │
│  └──────────────────┬──────────────────────────────────┘   │
│                     │                                       │
│                     ↓                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Controllers (produk_controller.ts)                  │   │
│  │ - Handle HTTP requests/responses                    │   │
│  │ - Validate input format                             │   │
│  │ - Format API responses                              │   │
│  └──────────────────┬──────────────────────────────────┘   │
│                     │                                       │
│                     ↓                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Services (produk_service.ts)                        │   │
│  │ - Business logic                                    │   │
│  │ - Data validation                                   │   │
│  │ - Database operations                               │   │
│  └──────────────────┬──────────────────────────────────┘   │
│                     │                                       │
│                     ↓                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Prisma Client                                       │   │
│  │ - ORM for database operations                       │   │
│  │ - Type-safe queries                                 │   │
│  └──────────────────┬──────────────────────────────────┘   │
│                     │                                       │
└─────────────────────┼───────────────────────────────────────┘
                      │
                      ↓
        ┌──────────────────────────────┐
        │   MySQL Database             │
        │   Table: produk              │
        │   - id (PK)                  │
        │   - nama_produk              │
        │   - deskripsi                │
        │   - harga                    │
        │   - stok                     │
        │   - gambar_url               │
        │   - created_at               │
        │   - updated_at               │
        └──────────────────────────────┘
```

---

## 📂 Backend Structure

### 1. **Routes Layer** (`src/routes/public-api.ts`)

**Tanggung Jawab:** Define API endpoints dan route HTTP requests ke controllers

```typescript
// Menghubungkan URL path dengan controller methods
publicRouter.get("/products", (req, res) => 
  produkController.getAllProduk(req, res)
);

publicRouter.post("/products", (req, res) => 
  produkController.createProduk(req, res)
);
```

**Flow:**
```
HTTP Request → Route Definition → Controller Method
```

### 2. **Controller Layer** (`src/controllers/produk_controller.ts`)

**Tanggung Jawab:** Handle HTTP request/response, validate input format, koordinate service calls

**Struktur Method:**
```typescript
async getAllProduk(req: Request, res: Response) {
  try {
    // 1. Extract parameters dari request
    const produk = await produkService.getAllProduk();
    
    // 2. Return success response
    res.json({
      success: true,
      data: produk,
      message: "Success message"
    });
  } catch (error) {
    // 3. Handle errors
    res.status(500).json({
      success: false,
      message: error message
    });
  }
}
```

**Responsibilities:**
- Parse request data
- Call appropriate service method
- Format response
- Handle HTTP status codes
- Error handling & messages

### 3. **Service Layer** (`src/services/produk_service.ts`)

**Tanggung Jawab:** Business logic, validasi data, database operations

**Struktur:**
```typescript
class ProdukService {
  async getAllProduk() {
    // 1. Query database dengan Prisma
    // 2. Return processed data
  }
  
  async createProduk(data) {
    // 1. Validate input (nama_produk, harga, etc)
    // 2. Process data (trim, format)
    // 3. Save to database
    // 4. Return created object
  }
}
```

**Responsibilities:**
- Input validation
- Business logic
- Database queries
- Data transformation
- Error handling

### 4. **Data Access Layer** (Prisma ORM)

```typescript
// Prisma Client digunakan di Service
await prisma.produk.findMany();
await prisma.produk.findUnique({ where: { id } });
await prisma.produk.create({ data: {} });
await prisma.produk.update({ where: {}, data: {} });
await prisma.produk.delete({ where: {} });
```

---

## 📂 Frontend Structure

### 1. **ProductManagement Component** (`src/components/ProductManagement.jsx`)

**Struktur Component:**

```jsx
const ProductManagement = () => {
  // ============ STATE MANAGEMENT ============
  const [produk, setProduk] = useState([]);        // Data list
  const [showForm, setShowForm] = useState(false); // Form visibility
  const [editingId, setEditingId] = useState(null); // Edit mode
  const [loading, setLoading] = useState(false);   // Loading state
  const [formData, setFormData] = useState({...}); // Form inputs

  // ============ API CONFIGURATION ============
  const API_URL = "http://localhost:3000/api";

  // ============ DATA FETCHING ============
  const fetchProduk = async () => {
    // GET /api/products
  };

  useEffect(() => {
    fetchProduk(); // Fetch saat component mount
  }, []);

  // ============ EVENT HANDLERS ============
  const handleChange = (e) => {};        // Input change
  const handleSubmit = (e) => {};        // Form submit
  const handleEdit = (item) => {};       // Edit action
  const handleDelete = (id) => {};       // Delete action
  const handleCancel = () => {};         // Cancel action

  // ============ RENDER ============
  return (
    <div className="product-management-container">
      {/* Form atau Product List */}
    </div>
  );
};
```

### 2. **Component Data Flow**

```
User Interaction (Click/Input)
        ↓
Event Handler (handleChange, handleSubmit, etc)
        ↓
API Call (fetch request)
        ↓
Update State (setProduk, setShowForm, etc)
        ↓
Component Re-render
        ↓
UI Update (Display berubah)
```

### 3. **Form Flow - Create**

```
[Add New Product Button]
        ↓
setShowForm(true)
        ↓
Form Displays
        ↓
User Fills Form
        ↓
handleChange() updates formData
        ↓
handleSubmit()
  ├─ Validation
  ├─ Confirmation dialog
  ├─ POST /api/products
  ├─ Success → Reset form, Refetch
  └─ Error → Alert
```

### 4. **Form Flow - Update**

```
[Edit Button on Card]
        ↓
handleEdit()
  ├─ setEditingId(item.id)
  ├─ Populate formData dengan item data
  ├─ setShowForm(true)
  └─ Scroll to top
        ↓
Form Displays with data
        ↓
User Edits
        ↓
handleSubmit()
  ├─ Check editingId (update mode)
  ├─ PUT /api/products/:id
  ├─ Success → Reset form, Refetch
  └─ Error → Alert
```

### 5. **Form Flow - Delete**

```
[Delete Button on Card]
        ↓
handleDelete(id)
  ├─ Confirmation dialog
  ├─ If confirmed: DELETE /api/products/:id
  ├─ Success → Refetch
  └─ Error → Alert
```

---

## 🔄 API Request/Response Cycle

### Create/Update Flow:

```
React Component
    │
    ├─ Validate input
    ├─ Show confirmation dialog
    │
    └─→ fetch(url, {
        method: 'POST' or 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
        │
        ↓
Express Server
    │
    ├─→ public-api.ts (Route match)
    ├─→ produk_controller.ts (Parse request)
    ├─→ produk_service.ts (Validate & save)
    ├─→ Prisma (Database query)
    │
    └─→ res.status(201).json({
        success: true,
        data: createdProduk,
        message: 'Success'
    })
        │
        ↓
React Component
    │
    ├─ result.success? 
    ├─ Success → Alert, Reset form, Refetch
    └─ Error → Alert with error message
```

---

## 🗂️ File Organization Best Practices

### Backend Folder Structure:
```
src/
├── controllers/          # Handle requests/responses
├── services/             # Business logic
├── models/               # Database models (schemas)
├── routes/               # API routes
├── middleware/           # Express middleware
├── lib/                  # Utilities
├── config/               # Configuration
├── errors/               # Error classes
└── index.ts              # Entry point
```

### Frontend Folder Structure:
```
client/
├── src/
│   ├── components/       # React components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom hooks
│   ├── utils/            # Utility functions
│   ├── services/         # API services
│   ├── App.jsx           # Root component
│   └── index.css         # Global styles
└── public/               # Static assets
```

---

## 🎯 Data Validation Strategy

### Backend Validation (Service Layer):

```typescript
async createProduk(data) {
  // 1. Required field validation
  if (!data.nama_produk || !data.nama_produk.trim()) {
    throw new Error("Nama produk tidak boleh kosong");
  }

  // 2. Type validation
  if (data.harga === undefined || data.harga === null) {
    throw new Error("Harga tidak boleh kosong");
  }

  // 3. Range validation
  if (data.harga < 0) {
    throw new Error("Harga tidak boleh negatif");
  }

  // 4. Data cleaning
  return prisma.produk.create({
    data: {
      nama_produk: data.nama_produk.trim(),
      harga: parseInt(data.harga),
      // ... other fields
    }
  });
}
```

### Frontend Validation (Component Level):

```javascript
const handleSubmit = (e) => {
  e.preventDefault();

  // 1. Client-side validation
  if (!formData.nama_produk.trim()) {
    alert("Nama produk tidak boleh kosong");
    return;
  }

  if (!formData.harga) {
    alert("Harga tidak boleh kosong");
    return;
  }

  // 2. User confirmation
  if (!window.confirm("Lanjutkan?")) {
    return;
  }

  // 3. API call
  fetch(API_URL + '/products', {
    // ...
  });
};
```

---

## ⚡ Performance Considerations

### 1. **Data Fetching Optimization**
```javascript
// Fetch hanya saat component mount
useEffect(() => {
  fetchProduk();
}, []);

// Hindari infinite loops dengan dependency array yang benar
```

### 2. **Form State Management**
```javascript
// Combine related states untuk reduce re-renders
const [formData, setFormData] = useState({
  nama_produk: '',
  harga: '',
  // ... semua fields dalam satu state
});
```

### 3. **API Response Handling**
```javascript
// Check berhasil sebelum update UI
if (result.success) {
  // Update UI
  setProduk(result.data);
}
```

---

## 🐛 Error Handling Strategy

### Backend Error Handling:

```typescript
// Service level: Throw errors
if (!produk) {
  throw new Error("Produk tidak ditemukan");
}

// Controller level: Catch dan format
try {
  const result = await service.method();
  res.json({ success: true, data: result });
} catch (error) {
  res.status(400).json({
    success: false,
    message: error.message
  });
}
```

### Frontend Error Handling:

```javascript
try {
  const response = await fetch(url);
  const result = await response.json();
  
  if (result.success) {
    // Handle success
  } else {
    alert(result.message);
  }
} catch (error) {
  console.error("Error:", error);
  alert("Gagal: " + error.message);
}
```

---

## 📊 Database Schema Understanding

### Produk Table Structure:

```sql
CREATE TABLE produk (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama_produk VARCHAR(255) NOT NULL,
  deskripsi TEXT,
  harga INT NOT NULL,
  stok INT DEFAULT 0,
  gambar_url VARCHAR(500),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Prisma Model:

```prisma
model Produk {
  id          Int      @id @default(autoincrement())
  nama_produk String   @db.VarChar(255)
  deskripsi   String?  @db.Text
  harga       Int
  stok        Int      @default(0)
  gambar_url  String?  @db.VarChar(500)
  created_at  DateTime @default(now())
  updated_at  DateTime @updatedAt

  @@map("produk")
}
```

---

## 🔑 Key Takeaways

1. **Separation of Concerns:** Routes → Controllers → Services → Database
2. **Single Responsibility:** Setiap layer punya tanggung jawab spesifik
3. **Reusability:** Services dapat digunakan di multiple controllers
4. **Maintainability:** Code terstruktur dengan baik, mudah di-debug
5. **Scalability:** Mudah menambah fitur baru tanpa mengubah existing code
6. **Type Safety:** TypeScript di backend, PropTypes/TypeScript di frontend
7. **Error Handling:** Proper error propagation dan user feedback
8. **Data Validation:** Di both layers untuk security dan UX

---

**This architecture ensures clean, maintainable, and scalable code! 🚀**
