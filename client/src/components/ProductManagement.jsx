import React, { useState, useEffect } from "react";
import "./ProductManagement.css";

const ProductManagement = () => {
  const [produk, setProduk] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama_produk: "",
    deskripsi: "",
    harga: "",
    stok: "",
    gambar_url: "",
  });

  const API_URL = "http://localhost:3000/api";

  // Fetch semua produk
  const fetchProduk = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/products`);
      const result = await response.json();
      if (result.success) {
        setProduk(result.data);
      }
    } catch (error) {
      console.error("Error fetching produk:", error);
      alert("Gagal mengambil data produk");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nama_produk.trim()) {
      alert("Nama produk tidak boleh kosong");
      return;
    }

    if (!formData.harga) {
      alert("Harga tidak boleh kosong");
      return;
    }

    if (parseInt(formData.harga) < 0) {
      alert("Harga tidak boleh negatif");
      return;
    }

    const confirmMessage = editingId
      ? "Apakah Anda yakin ingin memperbarui produk ini?"
      : "Apakah Anda yakin ingin menambah produk ini?";

    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `${API_URL}/products/${editingId}`
        : `${API_URL}/products`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama_produk: formData.nama_produk.trim(),
          deskripsi: formData.deskripsi.trim(),
          harga: parseInt(formData.harga),
          stok: parseInt(formData.stok) || 0,
          gambar_url: formData.gambar_url.trim(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert(
          editingId ? "Produk berhasil diperbarui" : "Produk berhasil ditambahkan"
        );
        setShowForm(false);
        setEditingId(null);
        setFormData({
          nama_produk: "",
          deskripsi: "",
          harga: "",
          stok: "",
          gambar_url: "",
        });
        fetchProduk();
      } else {
        alert(result.message || "Terjadi kesalahan");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal menyimpan produk");
    }
  };

  // Handle edit
  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      nama_produk: item.nama_produk,
      deskripsi: item.deskripsi || "",
      harga: item.harga.toString(),
      stok: item.stok.toString(),
      gambar_url: item.gambar_url || "",
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        alert("Produk berhasil dihapus");
        fetchProduk();
      } else {
        alert(result.message || "Gagal menghapus produk");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal menghapus produk");
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      nama_produk: "",
      deskripsi: "",
      harga: "",
      stok: "",
      gambar_url: "",
    });
  };

  return (
    <div className="product-management-container">
      <div className="product-management">
        <h1>📦 Manajemen Produk</h1>

        {!showForm ? (
          <button className="btn-add" onClick={() => setShowForm(true)}>
            ➕ Tambah Produk Baru
          </button>
        ) : (
          <div className="form-container">
            <h2>{editingId ? "Edit Produk" : "Tambah Produk Baru"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nama Produk *</label>
                <input
                  type="text"
                  name="nama_produk"
                  value={formData.nama_produk}
                  onChange={handleChange}
                  placeholder="Masukkan nama produk"
                  required
                />
              </div>

              <div className="form-group">
                <label>Deskripsi</label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  placeholder="Masukkan deskripsi produk"
                  rows="4"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Harga (Rp) *</label>
                  <input
                    type="number"
                    name="harga"
                    value={formData.harga}
                    onChange={handleChange}
                    placeholder="0"
                    required
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label>Stok</label>
                  <input
                    type="number"
                    name="stok"
                    value={formData.stok}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>URL Gambar</label>
                <input
                  type="url"
                  name="gambar_url"
                  value={formData.gambar_url}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-save">
                  💾 Simpan
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleCancel}
                >
                  ❌ Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <p className="loading">Memuat data...</p>
        ) : produk.length === 0 ? (
          <p className="no-data">
            Belum ada produk. Tambahkan produk baru sekarang!
          </p>
        ) : (
          <div className="products-grid">
            {produk.map((item) => (
              <div key={item.id} className="product-card">
                <div className="product-image-wrapper">
                  {item.gambar_url ? (
                    <img
                      src={item.gambar_url}
                      alt={item.nama_produk}
                      className="product-image"
                    />
                  ) : (
                    <div className="product-image-placeholder">
                      <span>📷</span>
                    </div>
                  )}
                </div>
                <div className="product-content">
                  <h3>{item.nama_produk}</h3>
                  {item.deskripsi && (
                    <p className="description">{item.deskripsi}</p>
                  )}
                  <div className="product-meta">
                    <p className="price">
                      Rp {item.harga.toLocaleString("id-ID")}
                    </p>
                    <p className={`stock ${item.stok > 0 ? "in-stock" : "out-of-stock"}`}>
                      Stok: {item.stok}
                    </p>
                  </div>
                  <div className="product-actions">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(item)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      🗑️ Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
