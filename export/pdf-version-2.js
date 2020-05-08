import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

const pdfVersion2 = () => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

    // bagian header pdf
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

    // table title (ex: GeoLocation)
    const tableTitle = (title, width) => {
      return {
        table: {
          widths: [width],
          body: [
            [
              {
                text: title,
                bold: true,
                color: "white",
                fillColor: "#19579F",
                alignment: 'center'
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

    // bagian layout table
    const customLayoutTable = {
      hLineWidth: (i, node) => {
        return i === 0 ? 0 : 1;
      },
      hLineColor: () => "#bbb",
      vLineColor: () => "#bbb",
      paddingLeft: () => 10,
      paddingRight: () => 10
    };

    // table pasien umur
    const tablePasienUmur = {
      layout: customLayoutTable,
      margin: [0, 0, 0, 20],
      table: {
        widths: [110, 20, 20, 30],
        headerRows: 1,
        body: [
          [
            { text: "Pasien Umur", style: "tableHeader" },
            { text: "L", style: "tableHeader" },
            { text: "P", style: "tableHeader" },
            { text: "Total", style: "tableHeader" }
          ],
          ["0 Hari - 6 Hari", 0, 0, 0]
        ]
      }
    };

    // table geolocation
     const tableGeoLocation = {
      layout: customLayoutTable,
      table: {
        widths: [110, 20, 20, 30],
        headerRows: 1,
        body: [
          [
            { text: "Kecamatan", style: "tableHeader" },
            { text: "L", style: "tableHeader" },
            { text: "P", style: "tableHeader" },
            { text: "Total", style: "tableHeader" }
          ],
          ["MAMPANG PRAPATAN", 0, 0, 0]
        ]
      }
    };

    // table ICD
    const tableICD = {
      margin: [0, 0, 20, 0],
      layout: customLayoutTable,
      table: {
        widths: [50, 125, 30],
        headerRows: 1,
        body: [
          [
            { text: "ICD 10", style: "tableHeader" },
            { text: "Deskripsi", style: "tableHeader" },
            { text: "Total", style: "tableHeader" },
          ],
          ["ABCD", 'LOREM Ipsum dolor sit amet', 0]
        ]
      }
    };

    // table pasien lama/baru
    const tablePasienLamaBaru = {
      margin: [0, 0, 0, 20],
      layout: customLayoutTable,
      table: {
        widths: [120, 30],
        headerRows: 1,
        body: [
          [
            { text: "Pasien", style: "tableHeader" },
            { text: "Total", style: "tableHeader" },
          ],
          ["Pasien Lama", 0],
          ["Pasien Baru", 8]
        ]
      }
    };

    // bagian konten pdf
    let docStyle = {
      pageOrientation: "Portrait",
      pageSize: "A3",
      pageMargins: [40, 80, 40, 40],
      header: pdfHeader,
      content: [
        {
          columns: [
            [
              tablePasienUmur,
              tableTitle('GeoLocation', 243),
              tableGeoLocation
            ],
            [
              tableICD,
            ],
            [
              tableTitle('Pasien Lama/Baru', 171),
              tablePasienLamaBaru
            ]
          ]
        }
      ],
      styles: {
        tableHeader: {
          bold: true,
          fillColor: "#19579F",
          color: "white"
        }
      },
      defaultStyle: {
        fontSize: 11,
        bold: false
      }
    };

    // open pdf in new window
    pdfMake.createPdf(docStyle).open();
}

export default pdfVersion2;