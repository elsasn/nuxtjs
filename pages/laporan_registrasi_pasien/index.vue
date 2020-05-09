<template>
  <div>
    <!-- bagian tabs -->
    <b-tabs content-class="mt-3" class="mb-4">
      <b-tab title="REGISTRASI PASIEN" active></b-tab>
      <b-tab title="PASIEN LAMA / BARU"></b-tab>
    </b-tabs>

    <!-- bagian filter dan export -->
    <div class="d-block clearfix mb-4">
      <div class="float-left">
        <b-form inline>
          <label for="date-filter mr-4"><b>Tanggal</b></label>
          <b-form-datepicker 
            class="ml-2 mr-4" 
            id="date-filter" 
            placeholder="Pilih Tanggal" 
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            locale="id-ID"
            v-model="value">
          </b-form-datepicker>
          <b-button class="ml-4" variant="primary" @click="filterShow = !filterShow">{{ filterShow ? 'Tutup Filter' : 'Buka Filter'}}</b-button>
        </b-form>
      </div>
      <div class="float-right">
      <button class="btn btn-primary mr-2" @click="toPdf"><i class="fas fa-print mr-2"></i>PDF Summary</button>
      <button class="btn btn-primary mr-2" @click="toPdfVersion2"><i class="fas fa-print mr-2"></i>PDF</button>
      <button class="btn btn-success mr-2" @click="toExcel"><i class="fa fa-download mr-2"></i> Excel</button>
      </div>
    </div>

    <!-- bagian isi filter -->
    <div class="mt-2" v-show="filterShow">
      <b-row>
        <b-col>
          <div id="filter-shift">
            <b-button-group size="sm">
              <b-button 
              v-for="(item, i) in filterShift.data" 
              :key="i"
              :variant="filterShift.active == item.name ? 'primary' : 'outline-secondary'"
              class="mr-2"
              @click="filterShiftFunc(item.name)"
              >
                {{ item.name}}
              </b-button>
            </b-button-group>
          </div>

          <div id="filter-penjamin" class="mt-2">
            <b-button-group size="sm">
              <b-button 
              v-for="(item, i) in filterPenjamin.data" 
              :key="i"
              :variant="filterPenjamin.active == item.name ? 'primary' : 'outline-secondary'"
              class="mr-2"
              >
                {{ item.name}}
              </b-button>
            </b-button-group>
          </div>

          <div id="filter-dpjp" class="mt-2">
            <b-button-group size="sm">
              <b-button 
              v-for="(item, i) in filterDpjp.data" 
              :key="i"
              :variant="filterDpjp.active == item.name ? 'primary' : 'outline-secondary'"
              class="mr-2"
              >
                {{ item.name}}
              </b-button>
            </b-button-group>
          </div>
        </b-col>
        <b-col>
          <b-row>
            <b-col align-self="center">
              <div id="filter-jns-pasien">
                <b-button-group size="sm">
                  <b-button 
                  v-for="(item, i) in filterJnsPasien.data" 
                  :key="i"
                  :variant="filterJnsPasien.active == item.name ? 'primary' : 'outline-secondary'"
                  class="mr-2"
                  >
                    {{ item.name}}
                  </b-button>
                </b-button-group>
              </div>
            </b-col>
            <b-col>
              <div id="filter-jns-kelamin">
                <b-button-group size="sm">
                  <b-button 
                  v-for="(item, i) in filterJnsKelamin.data" 
                  :key="i"
                  :variant="filterJnsKelamin.active == item.name ? 'primary' : 'outline-secondary'"
                  class="mr-2"
                  >
                    {{ item.name}}
                  </b-button>
                </b-button-group>
              </div>
            </b-col>
          </b-row>

          <div id="filter-umur">
            <b-button-group size="sm" class="mt-2">
              <b-button 
              v-for="(item, i) in filterUmur.data" 
              :key="i"
              :variant="filterUmur.active == item.name ? 'primary' : 'outline-secondary'"
              class="mr-2"
              >
                {{ item.name}}
              </b-button>
            </b-button-group>
          </div>
        </b-col>
      </b-row>
    </div>

    <!-- bagian statistik -->
    <div class="custom-margin">
      <b-row>
        <!-- bagian table kiri -->
        <b-col sm="12" md="4" lg="4">
          <b-table striped hover :items="table1" head-variant="dark"></b-table>
          <div class="table-title">
            <b>Geolocation</b>
          </div>
          <b-table striped hover :items="table1" head-variant="dark"></b-table>
        </b-col>

        <!-- bagian table tengah -->
        <b-col sm="12" md="5" lg="5">
          <b-table striped hover :items="table2" head-variant="dark"></b-table>
        </b-col>

        <!-- bagian table kanan -->
        <b-col sm="12" md="3" lg="3">
          <b-table-simple striped hover>
            <b-thead head-variant="dark">
              <b-tr>
                <b-th colspan="2" class="text-center">Pasien Lama/Baru</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr>
                <b-td>Pasien Lama</b-td>
                <b-td>{{ statistik.pasienBaruLama.lama }}</b-td>
              </b-tr>
              <b-tr>
                <b-td>Pasien Baru</b-td>
                <b-td>{{ statistik.pasienBaruLama.baru }}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>

          <b-table-simple striped hover>
            <b-thead head-variant="dark">
              <b-tr>
                <b-th colspan="2" class="text-center">Pasien Laki-laki/Perempuan</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr>
                <b-td>Laki-laki</b-td>
                <b-td>{{ statistik.pasienJnsKelamin.laki }}</b-td>
              </b-tr>
              <b-tr>
                <b-td>Perempuan</b-td>
                <b-td>{{ statistik.pasienJnsKelamin.perempuan }}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>

          <b-table-simple striped hover>
            <b-thead head-variant="dark">
              <b-tr>
                <b-th colspan="2" class="text-center">Pasien Total</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr>
                <b-td>Total Pasien</b-td>
                <b-td>{{ statistik.pasienJnsKelamin.laki }}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>

          <b-table-simple striped hover>
            <b-thead head-variant="dark">
              <b-tr>
                <b-th colspan="2" class="text-center">Penjamin</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr v-for="(item, i) in statistik.penjamin" :key="i">
                <b-td>{{ i }}</b-td>
                <b-td>{{ item }}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-col>
      </b-row>
    </div>

    <!-- bagian detail -->
    <div class="custom-margin">
      <TableRegistrasi />
    </div>
  </div>
</template>

<script>
import pdfVersion1 from '@/export/pdf-version-1'
import pdfVersion2 from '@/export/pdf-version-2'
import excelVersion1 from '@/export/excel-version-1'
import excelVersion2 from '@/export/excel-version-2'
import TableRegistrasi from '@/components/table/TableRegistrasi'
import { mapState } from 'vuex'

export default {
  head: {
    titleTemplate: 'Laporan Registrasi Pasien'
  },
  components: {
    TableRegistrasi
  },
  data: () => ({
    value: '',
    table1: [
      { 'Pasien - Umur': '0 Hari - 8 Hari', 'L': 0, 'P': 0, 'total': 0}
    ],
    table2: [
      { 'ICD 10': 'ABCD', 'Deskripsi': 'Lorem ipsum dolor sit amet', Total: 8},
      { 'ICD 10': 'ABCD', 'Deskripsi': 'Lorem ipsum dolor sit amet', Total: 8},
      { 'ICD 10': 'ABCD', 'Deskripsi': 'Lorem ipsum dolor sit amet', Total: 8},
      { 'ICD 10': 'ABCD', 'Deskripsi': 'Lorem ipsum dolor sit amet', Total: 8}
    ],
    filterShow: false,
    filterShift: {
      active: 'semua shift',
      data: [
        { name: 'semua shift' },
        { name: 'shift 1' },
        { name: 'shift 2' },
        { name: 'shift 3' },
      ]
    },
    filterPenjamin: {
      active: 'Semua Penjamin',
      data: [
        { name: 'Semua Penjamin' },
        { name: 'Pasien Bayar' },
        { name: 'BPJS' },
        { name: 'jamkesmas' },
      ]
    },
    filterDpjp: {
      active: 'Semua DPJP',
      data: [
        { name: 'Semua DPJP' },
        { name: 'dr. OZ' },
        { name: 'dr. Ahmad' },
        { name: 'dr. Putra' },
      ]
    },
    filterJnsPasien: {
      active: 'Semua Jns Pasien',
      data: [
        { name: 'Semua Jns Pasien' },
        { name: 'Lama' },
        { name: 'Baru' },
      ]
    },
    filterJnsKelamin: {
      active: 'Semua Jns Kelamin',
      data: [
        { name: 'Semua Jns Kelamin' },
        { name: 'Laki-laki' },
        { name: 'Perempuan' },
      ]
    },
    filterUmur: {
      active: 'Semua Umur',
      data: [
        { name: 'Semua Umur' },
        { name: '0 Hari - 8 Hari' },
        { name: '7 Hari - 25 Hari' },
        { name: '26 Hari - 1 Thn' },
      ]
    }
  }),
  async fetch({store}) {
    console.log("fetching..")
    await Promise.all([
      store.dispatch('registrasiPasien/getListPasien')
    ])
  },
  computed: {
    ...mapState('registrasiPasien', {
      statistik: state => state.statistik
    }),
  },
  methods: {
    filterShiftFunc(filter) {
      this.filterShift.active = filter
    },
    toPdf() {
      pdfVersion1()
    },
    toPdfVersion2() {
      pdfVersion2()
    },
    async toExcel() {
      await excelVersion2()
    }
  }
}
</script>

<style scoped>
  .custom-margin {
    margin: 4em 0 4em 0;
  }

  .table-title {
    display: block;
    padding: 0.75rem;
    margin-top: 2em;
    background: #343a40;
    border-color: #454d55;
    text-align: center;
    color: white;
  }
</style>
