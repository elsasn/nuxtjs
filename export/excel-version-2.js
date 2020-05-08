import exceljs from 'exceljs'
import { saveAs } from 'file-saver'

const createTableTitle = (sheet, title, index) => {
  sheet.mergeCells(`${index.start}:${index.stop}`)
  sheet.getCell(`${index.start}`).value = title
  sheet.getCell(`${index.start}`).font = {bold: true, color: {argb: 'FFFFFFFF'}}
  sheet.getCell(`${index.start}`).alignment = { vertical: 'middle', horizontal: 'center' }
  sheet.getCell(`${index.start}`).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: {argb:'FF4F81BD'},
  }
  return sheet
}

const excelVersion2 = async () => {
  const workBook = new exceljs.Workbook()
  workBook.created = new Date()

  let sheet = workBook.addWorksheet('report')

  let cellB2 = sheet.getCell('B2')
  let cellB3 = sheet.getCell('B3')

  cellB2.value = 'Nama Kop Surat'
  cellB3.value = 'Alamat'

  const indexTable = 5

  // data dummy
  const isiTable1 = [
    ['45 Thn - 64 Thn 11 Bln', 0, 1, 3],
    ['45 Thn - 64 Thn 11 Bln', 0, 1, 3]
  ]

  // buat table 1
  sheet.addTable({
    name: 'Table1',
    ref: `A${indexTable}`,
    columns: [
      { name: 'Pasien Umur' },
      { name: 'L' },
      { name: 'P' },
      { name: 'Total' },
    ],
    rows: isiTable1
  })

  // buat table title geolocation
  let indexGeo = {
    start: `A${indexTable + isiTable1.length + 2}`,
    stop: `D${indexTable + isiTable1.length + 2}`
  }

  sheet = createTableTitle(sheet, 'Geolocation', indexGeo)

  // data dummy table2
  const isiTable2 = [
    ['KARANGTENGAH', 0, 1, 3],
    ['KARANGTENGAH', 0, 1, 3],
    ['KARANGTENGAH', 0, 1, 3]
  ]

  // buat table 2 artinya dibawah table 1
  sheet.addTable({
    name: 'Table2',
    ref: `A${indexTable + isiTable1.length + 3}`,
    columns: [
      { name: 'Kecamatan' },
      { name: 'L' },
      { name: 'P' },
      { name: 'Total' },
    ],
    rows: isiTable2
  })

  // buat table 3
  sheet.addTable({
    name: 'Table3',
    ref: 'F5',
    columns: [
      { name: 'ICD 10' },
      { name: 'Deskripsi' },
      { name: 'Total' },
    ],
    rows: [
      ['ABCD', 'Lorem ipsum dolor sit amet', 0],
      ['ABCD', 'Lorem ipsum dolor sit amet', 2]
    ]
  })

  // buat index table kanan
  let iTableKanan = 5

  // buat table pasien lama / baru
  const indexPasien = {
    start: `J${iTableKanan}`,
    stop: `K${iTableKanan}`
  }

  sheet = createTableTitle(sheet, 'Pasien Lama / Baru', indexPasien)

  const isiTable4 = [
    ['Pasien Baru', 0],
    ['Pasien Lama', 2],
  ]

  sheet.addTable({
    name: 'table4',
    ref: `J${iTableKanan + 1}`,
    columns: [
      { name: 'Pasien' },
      { name: 'Total' },
    ],
    rows: isiTable4
  })

  // buat table pasien laki/perempuan
  iTableKanan = iTableKanan + isiTable4.length + 3

  const iJnsKelamin = {
    start: `J${iTableKanan}`,
    stop: `K${iTableKanan}`
  }

  sheet = createTableTitle(sheet, 'Pasien Laki-laki/Perempuan', iJnsKelamin)

  const isiTable5 = [
    ['Laki-laki', 2],
    ['Perempuan', 2],
  ]

  sheet.addTable({
    name: 'Table5',
    ref: `J${iTableKanan + 1}`,
    columns: [
      { name: 'Jenis Kelamin' },
      { name: 'Total' }
    ],
    rows: isiTable5
  })

  // buat buffer dan export
  const buf = await workBook.xlsx.writeBuffer()
  saveAs(new Blob([buf]), 'abc.xlsx')
}

export default excelVersion2