// Import modul readline dari Node.js untuk menangani input/output di terminal CLI
import * as readline from 'readline';

// Membuat antarmuka readline untuk membaca input dari keyboard (stdin) dan mencetak output (stdout)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Fungsi pembantu (helper) untuk membaca input berupa teks secara asynchronous menggunakan Promise
const askQuestion = (query: string): Promise<string> => {
  return new Promise((resolve) => rl.question(query, resolve));
};

// Fungsi utama yang menjalankan alur program utama karcis parkir CLI
async function main() {
  console.log("==================================================");
  console.log("    SISTEM KARCIS PARKIR DIGITAL BERBASIS CLI     ");
  console.log("                   PAKET C                        ");
  console.log("==================================================\n");

  // ==========================================
  // 1. DEKLARASI VARIABEL & TIPE DATA
  // Minimal menggunakan 3 tipe data: string, number, boolean
  // Menggunakan const untuk nilai tetap dan let untuk nilai yang berubah
  // ==========================================
  const namaPetugas: string = "Kasir Pos 01";  // Tipe data: string (const)
  let platNomor: string = "";                  // Tipe data: string (let)
  let jenisKendaraanOption: number = 0;        // Tipe data: number (let)
  let durasiParkir: number = 0;                // Tipe data: number (let)
  let isTiketHilang: boolean = false;          // Tipe data: boolean (let)
  let isMember: boolean = false;               // Tipe data: boolean (let)
  let opsiLayanan: number = 1;                 // Tipe data: number (let)

  // Variabel penampung hasil perhitungan
  let namaJenisKendaraan: string = "";         // Tipe data: string
  let tarifJamPertama: number = 0;             // Tipe data: number
  let tarifJamBerikutnya: number = 0;          // Tipe data: number
  let dendaTiketHilang: number = 0;            // Tipe data: number
  let biayaLayananTambahan: number = 0;        // Tipe data: number
  let totalBiayaDasar: number = 0;             // Tipe data: number
  let jumlahDiskon: number = 0;                // Tipe data: number
  let bonusVoucher: number = 0;                // Tipe data: number
  let totalBiayaParkir: number = 0;            // Tipe data: number

  // ==========================================
  // 2. PROSES INPUT DARI PENGGUNA VIA CLI
  // ==========================================
  platNomor = await askQuestion("Masukkan Plat Nomor Kendaraan (cth: N 1234 AB): ");
  
  const inputJenis = await askQuestion("Pilih Jenis Kendaraan (1: Motor, 2: Mobil, 3: Truk/Bus): ");
  jenisKendaraanOption = parseInt(inputJenis) || 0; // Mengubah string input menjadi number

  const inputDurasi = await askQuestion("Masukkan Durasi Parkir (dalam jam): ");
  durasiParkir = parseFloat(inputDurasi) || 0; // Mengubah string input menjadi number decimal

  const inputHilang = await askQuestion("Apakah Tiket Hilang? (y/n): ");
  // Penggunaan Operator Logika '||' dan Operator Perbandingan '==='
  isTiketHilang = (inputHilang.toLowerCase() === 'y' || inputHilang.toLowerCase() === 'ya');

  const inputMember = await askQuestion("Apakah Kendaraan Memiliki Member? (y/n): ");
  isMember = (inputMember.toLowerCase() === 'y' || inputMember.toLowerCase() === 'ya');

  const inputLayanan = await askQuestion("Pilih Layanan (1: Tanpa Cuci, 2: Cuci Standar, 3: Cuci Wax Premium): ");
  opsiLayanan = parseInt(inputLayanan) || 1;

  console.log("\n--------------------------------------------------");
  console.log("MEMPROSES PERHITUNGAN TICKET PARKIR...");
  console.log("--------------------------------------------------\n");

  // ==========================================
  // 3. SELEKSI KONDISI & PERHITUNGAN TARIFF (PAKET C REQUIREMENT)
  // Syarat Paket C: Minimal 4 IF, Minimal 2 Switch, Minimal 2 Level Nested
  // ==========================================

  // --- RANTAI IF 1 (Kondisi Logika Jamak + Validasi Input Utama) ---
  // Operator Perbandingan: '<=', '==='
  // Operator Logika: '||' (OR)
  if (durasiParkir <= 0 || platNomor.trim() === "") {
    console.log(" [ERROR] Input tidak valid! Durasi harus > 0 jam dan Plat Nomor tidak boleh kosong.");
    rl.close();
    return;
  } else {
    // ========================================================
    // NESTED LEVEL 1: Seluruh logika utama berada dalam else IF 1
    // ========================================================

    // --- PERNYATAAN SWITCH 1 (Penetapan Tarif Berdasarkan Jenis Kendaraan) ---
    // Minimal 3 Case + Default + Break
    switch (jenisKendaraanOption) {
      case 1:
        namaJenisKendaraan = "Sepeda Motor";
        tarifJamPertama = 3000;
        tarifJamBerikutnya = 2000;
        dendaTiketHilang = 15000;

        // ----------------------------------------------------
        // NESTED LEVEL 2: IF di dalam Switch 1 (Case 1)
        // ----------------------------------------------------
        if (durasiParkir > 1) {
          // Operator Aritmatika: '-', '*', '+'
          totalBiayaDasar = tarifJamPertama + ((durasiParkir - 1) * tarifJamBerikutnya);
        } else {
          totalBiayaDasar = tarifJamPertama;
        }
        break;

      case 2:
        namaJenisKendaraan = "Mobil Roda 4";
        tarifJamPertama = 6000;
        tarifJamBerikutnya = 4000;
        dendaTiketHilang = 30000;

        // ----------------------------------------------------
        // NESTED LEVEL 2: IF di dalam Switch 1 (Case 2)
        // ----------------------------------------------------
        if (durasiParkir > 1) {
          totalBiayaDasar = tarifJamPertama + ((durasiParkir - 1) * tarifJamBerikutnya);
        } else {
          totalBiayaDasar = tarifJamPertama;
        }
        break;

      case 3:
        namaJenisKendaraan = "Truk / Bus / Roda 6+";
        tarifJamPertama = 10000;
        tarifJamBerikutnya = 7000;
        dendaTiketHilang = 50000;

        // ----------------------------------------------------
        // NESTED LEVEL 2: IF di dalam Switch 1 (Case 3)
        // ----------------------------------------------------
        if (durasiParkir > 1) {
          totalBiayaDasar = tarifJamPertama + ((durasiParkir - 1) * tarifJamBerikutnya);
        } else {
          totalBiayaDasar = tarifJamPertama;
        }
        break;

      default:
        console.log(" [WARNING] Jenis Kendaraan Tidak Dikenali! Menggunakan tarif standar mobil.");
        namaJenisKendaraan = "Kendaraan Umum";
        tarifJamPertama = 5000;
        tarifJamBerikutnya = 3000;
        dendaTiketHilang = 20000;
        totalBiayaDasar = tarifJamPertama + ((durasiParkir - 1) * tarifJamBerikutnya);
        break;
    } // Akhir SWITCH 1

    // --- PERNYATAAN SWITCH 2 (Penetapan Biaya Layanan Tambahan) ---
    // Minimal 3 Case + Default + Break
    switch (opsiLayanan) {
      case 2:
        biayaLayananTambahan = 15000; // Tarif Cuci Standar
        break;

      case 3:
        biayaLayananTambahan = 35000; // Tarif Cuci Wax Premium
        break;

      case 1:
      default:
        // Compound Operator: '*='
        biayaLayananTambahan *= 0; // Bernilai 0
        break;
    } // Akhir SWITCH 2

    // --- RANTAI IF 2 (Perhitungan Denda Tiket Hilang) ---
    // Operator Perbandingan: '==='
    if (isTiketHilang === true) {
      // Compound Operator: '+='
      totalBiayaParkir += dendaTiketHilang;
    } else {
      // Compound Operator: '+='
      totalBiayaParkir += 0;
    }

    // --- RANTAI IF 3 (Perhitungan Diskon Member dengan Operator Logika Kompleks) ---
    // Operator Logika: '&&' (AND), '!' (NOT)
    // Operator Perbandingan: '>'
    if (isMember && !isTiketHilang && totalBiayaDasar > 0) {
      // Operator Aritmatika: '*', '/' (Diskon 10% dari tarif dasar)
      jumlahDiskon = (totalBiayaDasar * 10) / 100;
    } else if (isMember && isTiketHilang) {
      console.log(" [INFO] Diskon Member tidak berlaku karena tiket parkir hilang.");
      jumlahDiskon = 0;
    } else {
      jumlahDiskon = 0;
    }

    // --- RANTAI IF 4 (Bonus Cash Voucher untuk Parkir Biaya Tinggi) ---
    // Operator Perbandingan: '>='
    if (totalBiayaDasar >= 100000) {
      bonusVoucher = 5000; // Potongan bonus Rp 5.000 jika biaya dasar melebihi 100rb
    } else {
      bonusVoucher = 0;
    }

    // Total Biaya Akhir Menggunakan Compound Operator dan Aritmatika
    // Biaya Parkir Akhir = (Denda yang sudah ada) + Biaya Dasar + Layanan - Diskon - Bonus
    totalBiayaParkir += (totalBiayaDasar + biayaLayananTambahan) - (jumlahDiskon + bonusVoucher);

    // ==========================================
    // 4. MENCETAK OUTUPUT / STRUK PARKIR DIGITAL
    // ==========================================
    console.log("==================================================");
    console.log("             STRUK KARCIS PARKIR DIGITAL          ");
    console.log("==================================================");
    console.log(` Petugas Pos       : ${namaPetugas}`);
    console.log(` Nomor Plat        : ${platNomor.toUpperCase()}`);
    console.log(` Jenis Kendaraan   : ${namaJenisKendaraan}`);
    console.log(` Durasi Parkir     : ${durasiParkir} Jam`);
    console.log(` Status Member     : ${isMember ? "Ya (Diskon 10%)" : "Tidak"}`);
    console.log(` Status Tiket      : ${isTiketHilang ? "HILANG (Dena Berlaku)" : "Ada"}`);
    console.log("--------------------------------------------------");
    console.log(` Biaya Dasar Parkir: Rp ${totalBiayaDasar.toLocaleString('id-ID')}`);
    console.log(` Biaya Denda Tiket : Rp ${isTiketHilang ? dendaTiketHilang.toLocaleString('id-ID') : 0}`);
    console.log(` Layanan Tambahan  : Rp ${biayaLayananTambahan.toLocaleString('id-ID')}`);
    console.log(` Potongan Diskon   : Rp -${jumlahDiskon.toLocaleString('id-ID')}`);
    console.log(` Bonus Potongan    : Rp -${bonusVoucher.toLocaleString('id-ID')}`);
    console.log("--------------------------------------------------");
    console.log(` TOTAL PEMBAYARAN  : Rp ${totalBiayaParkir.toLocaleString('id-ID')}`);
    console.log("==================================================");
    console.log("    Terima Kasih Telah Menggunakan Layanan Kami   ");
    console.log("==================================================\n");
    console.log("PEMBUATAN PR ZAKY");
  }

  // Menutup interface readline setelah program selesai
  rl.close();
}

// Memanggil fungsi utama untuk mengeksekusi program
main();