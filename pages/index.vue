<template>
  <div>
    <b-tabs content-class="mt-3" class="mb-4">
      <b-tab title="List" active></b-tab>
      <b-tab title="Submenu"></b-tab>
    </b-tabs>
    <h4 class="mb-4">Dashboard</h4>
    <div class="d-flex justify-content-end mb-4">
      <button class="btn btn-success d-flex align-items-center mr-2"><i class="fa fa-download mr-2"></i> Excel</button>
      <button class="btn btn-primary mr-2"><i class="fas fa-print mr-2"></i>PDF</button>
      <nuxt-link tag="a" to="#" class="btn btn-primary">Tambah</nuxt-link>
    </div>
    <table-user />
  </div>
</template>

<script>
import TableUser from '@/components/table/TableUser'
export default {
  // async asyncData({store}){
  //   await Promise.all([
  //     store.dispatch('user/getUsersData')
  //   ])
  // },
  components: {
    TableUser
  }
}
</script>

