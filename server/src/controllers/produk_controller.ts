import { Request, Response } from "express";
import { ProdukService } from "../services/produk_service";

const produkService = new ProdukService();

export class ProdukController {
  async getAllProduk(req: Request, res: Response) {
    try {
      const produk = await produkService.getAllProduk();
      res.json({
        success: true,
        data: produk,
        message: "Berhasil mengambil semua produk",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Terjadi kesalahan",
      });
    }
  }

  async getProdukById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const produk = await produkService.getProdukById(parseInt(id));

      if (!produk) {
        return res.status(404).json({
          success: false,
          message: "Produk tidak ditemukan",
        });
      }

      res.json({
        success: true,
        data: produk,
        message: "Berhasil mengambil detail produk",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Terjadi kesalahan",
      });
    }
  }

  async createProduk(req: Request, res: Response) {
    try {
      const { nama_produk, deskripsi, harga, stok, gambar_url } = req.body;

      const produk = await produkService.createProduk({
        nama_produk,
        deskripsi,
        harga: parseInt(harga),
        stok: stok ? parseInt(stok) : undefined,
        gambar_url,
      });

      res.status(201).json({
        success: true,
        data: produk,
        message: "Produk berhasil dibuat",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Terjadi kesalahan",
      });
    }
  }

  async updateProduk(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nama_produk, deskripsi, harga, stok, gambar_url } = req.body;

      const produk = await produkService.updateProduk(parseInt(id), {
        nama_produk,
        deskripsi,
        harga: harga ? parseInt(harga) : undefined,
        stok: stok ? parseInt(stok) : undefined,
        gambar_url,
      });

      res.json({
        success: true,
        data: produk,
        message: "Produk berhasil diperbarui",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Terjadi kesalahan",
      });
    }
  }

  async deleteProduk(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await produkService.deleteProduk(parseInt(id));

      res.json({
        success: true,
        message: "Produk berhasil dihapus",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Terjadi kesalahan",
      });
    }
  }
}
