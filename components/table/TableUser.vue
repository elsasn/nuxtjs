<template>
  <div>
    <div class="d-flex justify-content-between flex-md-row flex-column mb-3">
        <div class="flex-row d-flex align-items-center mb-3 mb-md-0">
            <p class="mb-0">Show</p>
            <b-form-select v-model="perPage" :options="options" class="mx-2 perpage__input"></b-form-select>
            <p class="mb-0">Entries</p>
        </div>
        <div class="flex-row">
            <input type="text" class="form-control" placeholder="Search" v-model="filter">
        </div>
    </div>
    <b-table
        :items="userItems"
        :fields="fields"
        :per-page="perPage"
        :filter="filter"
        :current-page="currentPage"
        @filtered="onFiltered"
        show-empty
        striped
        responsive
    >
     <template v-slot:cell(action)="data">
        <div class="d-flex align-items-center">
          <button class="btn btn-danger" @click="deleteItem(data.item)"><i class="far fa-trash-alt"></i></button>
          <button class="btn btn-primary ml-2">Ubah</button>
        </div>
    </template>
    </b-table>
    <div class="d-flex justify-content-between flex-md-row flex-column">
        <div class="flex-row mb-3 mb-md-0">Showing 0 to {{perPage}} of {{userItems.length}} entries</div>
        <div class="d-flex justify-content-center">
            <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                aria-controls="my-table"
                >
            </b-pagination>
        </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    data() {
      return {
        options: [10, 25, 100],
        perPage: 10,
        currentPage: 1,
        filter: null,
      }
    },
    computed: {
      ...mapState('user', {
          userItems : state => state.items,
          fields : state => state.fields
      }),
      totalRows() {
        return this.userItems.length
      }
    },
    methods: {
      ...mapActions('user', ['deleteUser', 'getUsersData']),
        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length
            this.currentPage = 1
        },
        deleteItem(item){
          this.deleteUser(item.id)
          .then(() =>{
            this.getUsersData()
          })
        }
    }
  }
</script>