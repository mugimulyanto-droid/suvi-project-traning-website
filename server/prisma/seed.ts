import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create courses
  const courses = await prisma.kursus.createMany({
    data: [
      {
        nama_kursus: "Web Development",
        durasi: "3 bulan",
        gambar_url: "http://example.com/images/webdev.jpg",
      },
      {
        nama_kursus: "Desain Grafis",
        durasi: "2 bulan",
        gambar_url: "http://example.com/images/desain.jpg",
      },
      {
        nama_kursus: "Digital Marketing",
        durasi: "3 bulan",
        gambar_url: "http://example.com/images/digitalmarketing.jpg",
      },
      {
        nama_kursus: "Mobile App Development",
        durasi: "4 bulan",
        gambar_url: "http://example.com/images/mobile.jpg",
      },
      {
        nama_kursus: "Data Science",
        durasi: "6 bulan",
        gambar_url: "http://example.com/images/datascience.jpg",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Created courses:", courses);

  // Get created courses to use their IDs
  const createdCourses = await prisma.kursus.findMany();

  // Create registrations
  const registrations = await prisma.pendaftaran.createMany({
    data: [
      {
        nama_lengkap: "Budi Santoso",
        email: "budi.santoso@example.com",
        kursus_id: createdCourses[0].id,
      },
      {
        nama_lengkap: "Siti Aminah",
        email: "siti.aminah@example.com",
        kursus_id: createdCourses[1].id,
      },
      {
        nama_lengkap: "Ahmad Rahman",
        email: "ahmad.rahman@example.com",
        kursus_id: createdCourses[0].id,
      },
      {
        nama_lengkap: "Dewi Lestari",
        email: "dewi.lestari@example.com",
        kursus_id: createdCourses[2].id,
      },
      {
        nama_lengkap: "Eko Prasetyo",
        email: "eko.prasetyo@example.com",
        kursus_id: createdCourses[1].id,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Created registrations:", registrations);

  // Create products
  const products = await prisma.produk.createMany({
    data: [
      {
        nama_produk: "Laptop Gaming ASUS ROG",
        deskripsi: "Laptop gaming dengan prosesor Intel Core i9 dan GPU RTX 4080, sempurna untuk gaming dan content creation",
        harga: 35000000,
        stok: 5,
        gambar_url: "https://via.placeholder.com/300x200?text=ASUS+ROG+Laptop",
      },
      {
        nama_produk: "Monitor 4K Ultra HD",
        deskripsi: "Monitor 27 inch dengan resolusi 4K UHD dan refresh rate 144Hz, ideal untuk gaming profesional",
        harga: 8000000,
        stok: 12,
        gambar_url: "https://via.placeholder.com/300x200?text=4K+Monitor",
      },
      {
        nama_produk: "Keyboard Mekanik RGB",
        deskripsi: "Keyboard gaming mekanik dengan switch Cherry MX Red dan backlight RGB programmable",
        harga: 1500000,
        stok: 25,
        gambar_url: "https://via.placeholder.com/300x200?text=RGB+Keyboard",
      },
      {
        nama_produk: "Mouse Gaming Wireless",
        deskripsi: "Mouse gaming wireless dengan sensor 16000 DPI dan ergonomis untuk gaming marathon",
        harga: 750000,
        stok: 30,
        gambar_url: "https://via.placeholder.com/300x200?text=Gaming+Mouse",
      },
      {
        nama_produk: "Headset Gaming 7.1",
        deskripsi: "Headset gaming dengan surround sound 7.1 dan mikrofon noise cancelling",
        harga: 2500000,
        stok: 18,
        gambar_url: "https://via.placeholder.com/300x200?text=Gaming+Headset",
      },
      {
        nama_produk: "Mousepad XL RGB",
        deskripsi: "Mousepad gaming XL dengan permukaan smooth dan backlight RGB yang dapat dikustomisasi",
        harga: 350000,
        stok: 50,
        gambar_url: "https://via.placeholder.com/300x200?text=RGB+Mousepad",
      },
      {
        nama_produk: "PC Gaming High-End",
        deskripsi: "PC gaming custom build dengan Intel i7, RTX 4070 Ti, 32GB RAM, dan SSD 1TB NVMe",
        harga: 45000000,
        stok: 3,
        gambar_url: "https://via.placeholder.com/300x200?text=Gaming+PC",
      },
      {
        nama_produk: "Webcam 4K Pro",
        deskripsi: "Webcam 4K dengan autofocus dan built-in noise reduction untuk streaming profesional",
        harga: 2000000,
        stok: 15,
        gambar_url: "https://via.placeholder.com/300x200?text=4K+Webcam",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Created products:", products);
  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
