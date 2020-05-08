import exceljs from "exceljs";
import { saveAs } from "file-saver";

// function buat batas ex. Data pasien atau data kategori
const createBoundary = (sheet, title, index) => {
  sheet.mergeCells(`${index.start}:${index.stop}`);
  sheet.getCell(`${index.start}`).value = title;
  sheet.getCell(`${index.start}`).font = {
    bold: true,
    color: { argb: "FFFFFFFF" }
  };
  sheet.getCell(`${index.start}`).alignment = {
    vertical: "left",
    horizontal: "center"
  };
  sheet.getCell(`${index.start}`).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF4F81BD" }
  };
  return sheet;  
}

const excelVersion1 = async() => {
    const workBook = new exceljs.Workbook();
    workBook.created = new Date();

    let sheet = workBook.addWorksheet("report");

    // bagian header atau kop surat
    let cellB2 = sheet.getCell("B1");
    let cellB3 = sheet.getCell("B2");

    cellB2.value = "RS Medika Santosa";
    cellB3.value = "Jl. Raya Pasar Baru RUKO No 123-128, JAKARTA";

    sheet.getCell("H1").value = "LAPORAN REKAP - REGISTRASI PASIEN";
    sheet.getCell("H1").font = {
      bold: true
    }
    sheet.getCell("S3").value = "A234";

    // buat batas "data kategori"
    const dataKategori = {
      start: "A5",
      stop: "S5"
    };

    sheet = createBoundary(sheet, "Data Pasien", dataKategori);

    // buat kategori title ex Periode Laporan, DPJP, Penjamin, etc.
    sheet.getCell("A6").value = "Periode Laporan";
    sheet.getCell("B6").value = "DPJP";
    sheet.getCell("C6").value = "Penjamin";
    sheet.getCell("D6").value = "Jns. Kelamin";
    sheet.getCell("E6").value = "Shift";
    sheet.getCell("F6").value = "Type Pasien";
    sheet.getCell("G6").value = "Umur Pasien";

    sheet.getCell("A7").value = "30 April 2020";
    sheet.getCell("B7").value = "Semua";
    sheet.getCell("C7").value = "Semua";
    sheet.getCell("D7").value = "Semua";
    sheet.getCell("E7").value = "Semua";
    sheet.getCell("F7").value = "Semua";
    sheet.getCell("G7").value = "Semua";

    // buat batas "data pasien"
    const dataPasien = {
      start: "A8",
      stop: "S8"
    };

    sheet = createBoundary(sheet, "Data Pasien", dataPasien);

    sheet.addTable({
      name: "table1",
      ref: "A9",
      columns: [
        { name: "No" },
        { name: "Nama Pasien" },
        { name: "No. RM" },
        { name: "No. BPJS" },
        { name: "Penjamin" },
        { name: "Umur" },
        { name: "Jenis Kelamin" },
        { name: "Alamat" },
        { name: "Asal Pasien" },
        { name: "ICD 10 Primary" },
        { name: "DPJP" },
        { name: "Nama Poli" },
        { name: "Pasien Baru/Lama" },
        { name: "Pemeriksaan Fisik" },
        { name: "Pemeriksaan Penunjang" },
        { name: "Diagnosa Dokter" },
        { name: "Terapi Tindakan" },
        { name: "Alasan Pulang" },
        { name: "Kondisi Pulang" }
      ],
      rows: [
        [
          "1",
          "Annisa Qonitatu Rahma",
          "008000664",
          "0002211333000",
          "BPJS (JKN)",
          "23 tahun, 0 bulan, 30 hari",
          "Perempuan",
          "CARINGIN, CISOKA, KABUPATEN TANGERANG, BANTEN",
          "Dirujuk dari RS Lain",
          "",
          "dr. Serly Sriwahyuni",
          "INSTALASI BEDAH SENTRAL, UGD",
          "Baru",
          "",
          "",
          "",
          "",
          "",
          ""
        ]
      ]
    });

    // ubah seluruh baris atau text menjadi wrapped text and vertical middle
    // start mulai 6 untuk hindari wrap text pada header atau kop style
    for(let i=5; i <= sheet.rowCount; i++) {
      sheet.getRow(i).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    }

    // buat buffer dan export
    const buf = await workBook.xlsx.writeBuffer()
    saveAs(new Blob([buf]), 'abc.xlsx')
}

export default excelVersion1;