import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProdukService {
  async getAllProduk() {
    return await prisma.produk.findMany({
      orderBy: { created_at: "desc" },
    });
  }

  async getProdukById(id: number) {
    return await prisma.produk.findUnique({
      where: { id },
    });
  }

  async createProduk(data: {
    nama_produk: string;
    deskripsi?: string;
    harga: number;
    stok?: number;
    gambar_url?: string;
  }) {
    // Validasi
    if (!data.nama_produk || !data.nama_produk.trim()) {
      throw new Error("Nama produk tidak boleh kosong");
    }

    if (data.harga === undefined || data.harga === null) {
      throw new Error("Harga tidak boleh kosong");
    }

    if (data.harga < 0) {
      throw new Error("Harga tidak boleh negatif");
    }

    return await prisma.produk.create({
      data: {
        nama_produk: data.nama_produk.trim(),
        deskripsi: data.deskripsi ? data.deskripsi.trim() : null,
        harga: data.harga,
        stok: data.stok || 0,
        gambar_url: data.gambar_url ? data.gambar_url.trim() : null,
      },
    });
  }

  async updateProduk(
    id: number,
    data: {
      nama_produk?: string;
      deskripsi?: string;
      harga?: number;
      stok?: number;
      gambar_url?: string;
    }
  ) {
    const produk = await this.getProdukById(id);
    if (!produk) {
      throw new Error("Produk tidak ditemukan");
    }

    // Validasi input yang diberikan
    if (data.nama_produk !== undefined && !data.nama_produk.trim()) {
      throw new Error("Nama produk tidak boleh kosong");
    }

    if (data.harga !== undefined && data.harga < 0) {
      throw new Error("Harga tidak boleh negatif");
    }

    return await prisma.produk.update({
      where: { id },
      data: {
        nama_produk:
          data.nama_produk !== undefined
            ? data.nama_produk.trim()
            : produk.nama_produk,
        deskripsi:
          data.deskripsi !== undefined
            ? data.deskripsi.trim() || null
            : produk.deskripsi,
        harga: data.harga !== undefined ? data.harga : produk.harga,
        stok: data.stok !== undefined ? data.stok : produk.stok,
        gambar_url:
          data.gambar_url !== undefined
            ? data.gambar_url.trim() || null
            : produk.gambar_url,
      },
    });
  }

  async deleteProduk(id: number) {
    const produk = await this.getProdukById(id);
    if (!produk) {
      throw new Error("Produk tidak ditemukan");
    }

    return await prisma.produk.delete({
      where: { id },
    });
  }
}
