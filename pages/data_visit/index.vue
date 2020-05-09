<template>
  <div>
    <!-- <b-tabs content-class="mt-3" class="mb-4">
      <b-tab title="List" active></b-tab>
      <b-tab title="Submenu"></b-tab>
    </b-tabs> -->

     <!-- bagian filter dan export -->
    <div class="d-block clearfix mb-4">
      <div class="float-left">
        <!-- <b-form inline>
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
        </b-form> -->
      </div>
      <div class="float-right">
      <button class="btn btn-primary mr-2" @click="toPdf"><i class="fas fa-print mr-2"></i>PDF Summary</button>
      <button class="btn btn-primary mr-2" @click="toPdfVersion2"><i class="fas fa-print mr-2"></i>PDF</button>
      <button class="btn btn-success mr-2" @click="toExcel"><i class="fa fa-download mr-2"></i> Excel</button>
      </div>
    </div>

       <!-- bagian detail -->
    <div class="custom-margin">
      <TableDataVisit />
    </div>
    
  </div>
</template>

<script>
import pdfVersion1 from '@/export/pdf-version-1'
import pdfVersion2 from '@/export/pdf-version-2'
import excelVersion1 from '@/export/excel-version-1'
import excelVersion2 from '@/export/excel-version-2'
import TabelDataVisit from '@/components/table/TableDataVisit'
import { mapState } from 'vuex'

export default {
  head: {
    titleTemplate: 'Laporan Visit Pasien'
  },
  components: {
    TabelDataVisit
  },
  async fetch({store}) {
    console.log("fetching..")
    await Promise.all([
      store.dispatch('dataVisit/getListDataVisit')
    ])
  },
  computed: {
    ...mapState('datavisit', {
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
// import TableUser from '@/components/table/TableUser'
// export default {
//   components: {
//     TableUser
//   }
// }
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

