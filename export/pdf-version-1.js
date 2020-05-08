import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

const pdfVersion1 = () => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

    // bagian header atau kop surat
    const pdfHeader = {
      margin: [40, 20],
      columns: [
        [
          {
            text: "RS Medika Santosa",
            bold: true,
            fontSize: 14
          },
          {
            text: "Jl. Raya Pasar Baru RUKO No 123-128, JAKARTA",
            bold: false,
            fontSize: 11,
            margin: [0, 2, 0, 0]
          }
        ],
        {
          text: "LAPORAN REKAP - REGISTRASI PASIEN",
          bold: true,
          fontSize: 16
        },
        {
          width: 80,
          text: "A234",
          fontSize: 10,
          alignment: "right",
          margin: [0, 40, 0, 20]
        }
      ]
    };

    // function buat batas ex data pasien atau data kategori
    const staticBoundary = title => {
      return {
        layout: "noBorders",
        table: {
          widths: ["*"],
          body: [
            [
              {
                text: title,
                bold: true,
                color: "white",
                fillColor: "#19579F"
              }
            ]
          ]
        },
        layout: {
          hLineWidth: () => 0,
          vLineWidth: (i, node) => {
            return (i == 0 || i == node.table.body.length) ? 1 : 0
          },
          vLineColor: () => "#bbb",
          paddingLeft: () => 10,
          paddingRight: () => 10
        }
      };
    };

    // custom desain table
    const customLayoutTable = {
      hLineWidth: (i, node) => {
        return i === 0 ? 0 : 1;
      },
      hLineColor: () => "#bbb",
      vLineColor: () => "#bbb",
    };

    // isi keseluruhan halaman PDF
    let docStyle = {
      pageOrientation: "landscape",
      pageSize: "A3",
      pageMargins: [40, 80, 40, 40],
      header: pdfHeader,
      content: [
        staticBoundary("Data Kategori"),
        {
          widths: ["auto", 70, 90, "auto", 70, "auto", "*"],
          table: {
            headerRows: 1,
            body: [
              [
                { text: "Periode Laporan", style: "categoryTitle" },
                { text: "DPJP", style: "categoryTitle" },
                { text: "Penjamin", style: "categoryTitle" },
                { text: "Jns. Kelamin", style: "categoryTitle" },
                { text: "Shift", style: "categoryTitle" },
                { text: "Type Pasien", style: "categoryTitle" },
                { text: "Umur Pasien", style: "categoryTitle" }
              ],
              [
                { text: "29 April 2020", style: "categoryContent" },
                { text: "Semua", style: "categoryContent" },
                { text: "Semua", style: "categoryContent" },
                { text: "Semua", style: "categoryContent" },
                { text: "Semua", style: "categoryContent" },
                { text: "Semua", style: "categoryContent" },
                { text: "Semua", style: "categoryContent" }
              ]
            ]
          },
          layout: "noBorders"
        },
        staticBoundary("Data Pasien"),
        {
          margin: [0, 10, 0, 0],
          layout: customLayoutTable,
          table: {
            headerRows: 1,
            body: [
              [
                { text: "No", style: "tableHeader" },
                { text: "Nama Pasien", style: "tableHeader" },
                { text: "No. RM", style: "tableHeader" },
                { text: "No. BPJS", style: "tableHeader" },
                { text: "Penjamin", style: "tableHeader" },
                { text: "Umur", style: "tableHeader" },
                { text: "Jenis Kelamin", style: "tableHeader" },
                { text: "Alamat", style: "tableHeader" },
                { text: "Asal Pasien", style: "tableHeader" },
                { text: "ICD 10 Primary", style: "tableHeader" },
                { text: "DPJP", style: "tableHeader" },
                { text: "Nama Poli", style: "tableHeader" },
                { text: "Pasien Baru/Lama", style: "tableHeader" },
                { text: "Pemeriksaan Fisik", style: "tableHeader" },
                { text: "Pemeriksaan Penunjang", style: "tableHeader" },
                { text: "Diagnosa Dokter", style: "tableHeader" },
                { text: "Terapi Tindakan", style: "tableHeader" },
                { text: "Alasan Pulang", style: "tableHeader" },
                { text: "Kondisi Pulang", style: "tableHeader" }
              ],
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
          }
        }
      ],
      styles: {
        categoryTitle: {
          color: "#18659d",
          margin: [0, 10, 0, 0]
        },
        categoryContent: {
          bold: true,
          margin: [0, 5, 0, 10]
        },
        tableHeader: {
          bold: true,
          fillColor: '#19579F',
          color: 'white'
        }
      },
      defaultStyle: {
        fontSize: 10,
        bold: false
      }
    };

    // open pdf di tab baru
    pdfMake.createPdf(docStyle).open();
}

export default pdfVersion1;