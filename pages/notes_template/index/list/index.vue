<template>
    <div>
        <div class="row">
            <div class="col-lg-6">
                <div class="panel panel-primary">
                    <div class="panel-heading">Template (AKTIF)</div>
                    <div class="panel-body">
                        <div class="row mb-4">
                            <div class="col-lg-8">
                                <client-only>
                                    <app-select 
                                        v-model="regActiveSelected" 
                                        :options="regActive" 
                                        label="no_reg"
                                        track-by="id_registrasi"
                                        :searchable="true" 
                                        :show-labels="false" 
                                        placeholder="Pick a value"
                                        @input="filterRegActive">
                                        <template slot="option" slot-scope="props">
                                            <p class="mb-0">{{props.option.no_reg + ' - ' + props.option.tanggal_checkin}}</p>
                                        </template>
                                        <template slot="singleLabel" slot-scope="props">
                                            <p class="mb-0">{{props.option.no_reg + ' - ' + props.option.tanggal_checkin}}</p>
                                        </template>
                                    </app-select>
                                </client-only>
                            </div>
                        </div>
                        <template v-if="isActiveLoading">
                            <div class="text-center d-flex align-items-center justify-content-center">
                                <b-spinner variant="primary" label="Text Centered"></b-spinner>
                                <p class="ml-3 mb-0">Loading...</p>
                            </div>
                        </template>
                        <template v-else>
                            <template v-if="visitActive.length > 0">
                                <div class="row neonatal__list py-3 py-lg-0 mb-lg-3" v-for="(item, index) in visitActive" :key="index">
                                    <div class="col-lg-8">
                                        <p class="mb-2"><b>{{item.no_visit + item.checkin}}</b></p>
                                        <div v-for="(note, i) in notesDataActive" :key="i">
                                            <template v-if="note.id_pasien_visit == item.id_visit">
                                                <div class="row">
                                                    <div class="col-6">
                                                        <div class="d-flex algin-items-center justify-content-between">
                                                            <strong>Dokter Approve</strong>
                                                            <strong>:</strong>
                                                        </div>
                                                    </div>
                                                    <div class="col-6 pl-0">
                                                        <p class="mb-0">{{note.json_data.approved_dokter}}</p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-6">
                                                        <div class="d-flex algin-items-center justify-content-between">
                                                            <strong>Petugas Approve</strong>
                                                            <strong>:</strong>
                                                        </div>
                                                    </div>
                                                    <div class="col-6 pl-0">
                                                        <p class="mb-0">{{note.json_data.approved_petugas}}</p>
                                                    </div>
                                                </div>
                                                <strong>Parameter :</strong>
                                                <div class="row">
                                                    <div class="col-6">
                                                        <div class="d-flex algin-items-center justify-content-between">
                                                            <p class="mb-0">DATA / PARAMETER KE-1</p>
                                                            <p class="mb-0">:</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-6 pl-0">
                                                        <p class="mb-0">{{note.json_data.notes.data1}}</p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-6">
                                                        <div class="d-flex algin-items-center justify-content-between">
                                                            <p class="mb-0">DATA / PARAMETER KE-2</p>
                                                            <p class="mb-0">:</p>
                                                        </div>
                                                    </div>
                                                    <div class="col-6 pl-0">
                                                        <p class="mb-0">{{note.json_data.notes.data2}}</p>
                                                    </div>
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="d-flex align-items-center justify-content-lg-end mt-3 mt-lg-0" v-if="notesDataActive.findIndex(o => {return o.id_pasien_visit == item.id_visit }) == -1">
                                            <nuxt-link class="btn btn-primary btn-sm" :to="{name : 'notes_template-index-create'}" @click.native="setSelectedVisit(item)" tag="a">Tambah</nuxt-link>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-lg-end mt-3 mt-lg-0" v-else>
                                            <button class="btn btn-danger btn-sm mr-1 px-3" @click="showModalDelete(item)"><i class="far fa-trash-alt"></i></button>
                                            <button class="btn btn-info btn-sm mr-1">Ubah</button>
                                            <button class="btn btn-success btn-sm mr-1">Cetak</button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <p class="text-center">Tidak ada visit pasien</p>
                            </template>
                        </template>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="panel panel-primary">
                    <div class="panel-heading">Template (ARSIP)</div>
                    <div class="panel-body">
                        <div class="row mb-4">
                            <div class="col-lg-8">
                                <client-only>
                                    <app-select 
                                        v-model="regArchiveSelected" 
                                        :options="regArchive" 
                                        label="no_reg"
                                        track-by="id_registrasi"
                                        :searchable="true" 
                                        :show-labels="false" 
                                        placeholder="Pick a value"
                                        @input="filterRegArchive">
                                        <template slot="option" slot-scope="props">
                                            <p class="mb-0">{{props.option.no_reg + ' - ' + props.option.tanggal_checkin}}</p>
                                        </template>
                                        <template slot="singleLabel" slot-scope="props">
                                            <p class="mb-0">{{props.option.no_reg + ' - ' + props.option.tanggal_checkin}}</p>
                                        </template>
                                    </app-select>
                                </client-only>
                            </div>
                        </div>
                        <template v-if="isArchiveLoading">
                            <div class="text-center d-flex align-items-center justify-content-center">
                                <b-spinner variant="primary" label="Text Centered"></b-spinner>
                                <p class="ml-3 mb-0">Loading...</p>
                            </div>
                        </template>
                        <template v-else>
                            <template v-if="visitArchive.length > 0">
                                <div class="row neonatal__list py-3 py-lg-0 mb-lg-3" v-for="(item, index) in visitArchive" :key="index">
                                    <div class="col-lg-8">
                                        <p class="mb-2"><b>{{item.no_visit + item.checkin}}</b></p>
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="d-flex algin-items-center justify-content-between">
                                                    <strong>Dokter Approve</strong>
                                                    <strong>:</strong>
                                                </div>
                                            </div>
                                            <div class="col-6 pl-0">
                                                <p class="mb-0">{{item.nama_dokter}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <div class="d-flex algin-items-center justify-content-between">
                                                    <strong>Petugas Approve</strong>
                                                    <strong>:</strong>
                                                </div>
                                            </div>
                                            <div class="col-6 pl-0">
                                                <p class="mb-0">{{item.nama_petugas}}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="d-flex align-items-center justify-content-lg-end mt-3 mt-lg-0">
                                            <button class="btn btn-danger btn-sm mr-1 px-3"><i class="far fa-trash-alt"></i></button>
                                            <button class="btn btn-info btn-sm mr-1">Ubah</button>
                                            <button class="btn btn-success btn-sm mr-1">Cetak</button>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <p class="text-center">Tidak ada data visit pasien</p>
                            </template>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <b-modal v-model="modalDelete" modal-class="no-border" centered>
            <h6 class="mb-0 text-center font-weight-light">Apakah anda yakin ingin menghapus data ini ?</h6>
            <template v-slot:modal-footer>
                <div class="d-flex align-items-center justify-content-center w-100">
                    <button class="btn btn-danger mr-3" @click="removeNotes">Hapus</button>
                    <button class="btn btn-primary" @click="hideModalDelete">Batal</button>
                </div>
            </template>
        </b-modal>
    </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
    destroyed() {
        this.SET_NOTES_DATA_DEFAULT()
    },
    data: () => {
        return {
            // regActiveSelected: null,
            // regArchiveSelected: null,
            modalDelete: false,
            tempDataVisit: null,
            isActiveLoading: false,
            isArchiveLoading: false,
            value: 'REG/5000/2020/04/24/3 - 2020-04-24 04:36:24',
            options: ['REG/5000/2020/04/24/3 - 2020-04-24 04:36:24', 'REG/1108/2020/04/24/3 - 2020-04-24 04:36:24']
        }
    },
    async asyncData({store}){
        await Promise.all([
            store.dispatch('kunjungan/getKunjunganData' , {
                no_rm: '008000649',
                type: 'registrasi',
                status: 'active'
            }),
            store.dispatch('kunjungan/getKunjunganData' , {
                no_rm: '008000649',
                type: 'registrasi',
                status: 'archive'
            })
        ])
    },
    created() {
        this.fetchVisitActive()
        this.fetchVisitArchive()
    },
    computed: {
        ...mapState('kunjungan', {
            regActive: state => state.dataRegistrasiActive,
            regActiveSelected: state => state.regActiveSelected,
            regArchive: state => state.dataRegistrasiArchive,
            regArchiveSelected: state => state.regArchiveSelected,
            visitActive: state => state.dataVisitActive,
            visitArchive: state => state.dataVisitArchive,
            notesData: state => state.dataNotes
        }),
        notesDataActive(){
            return this.notesData.filter(i => {
                return i.id_pasien_registrasi == this.regActiveSelected.id_registrasi
            })
        }
    },
    methods: {
        ...mapActions('kunjungan', ['getKunjunganData', 'getNotes', 'deleteNotes']),
        ...mapMutations('kunjungan', ['SET_SELECTED_VISIT', 'SET_NOTES_DATA_DEFAULT', 'DELETE_NOTES_DATA']),
        async fetchVisitActive(){
            this.isActiveLoading = true
            await this.getKunjunganData({
                no_rm: '008000649',
                type: 'visit',
                status: 'active',
                id_reg : this.regActiveSelected.id_registrasi
            }).then(() => {
                if(this.visitActive.length > 0){
                    this.visitActive.forEach(v => {
                        this.getNotes({
                            no_rm: '008000649',
                            id_reg : this.regActiveSelected.id_registrasi,
                            id_visit : v.id_visit
                        }).then(() => {
                            this.isActiveLoading = false
                        })
                    })
                }else{
                    this.isActiveLoading = false
                }
            })
        },
        async fetchVisitArchive(){
            this.isArchiveLoading = true
            await this.getKunjunganData({
                no_rm: '008000649',
                type: 'visit',
                status: 'archive',
                id_reg : this.regArchiveSelected.id_registrasi
            }).then(() =>{
                if(this.visitArchive.length > 0){
                    this.visitArchive.forEach(v => {
                        this.getNotes({
                            no_rm: '008000649',
                            id_reg : this.regArchiveSelected.id_registrasi,
                            id_visit : v.id_visit
                        }).then(() => {
                            this.isArchiveLoading = false
                        })
                    })
                }else{
                    this.isArchiveLoading = false
                }
            })
        },
        setSelectedVisit(item) {
            this.SET_SELECTED_VISIT(item)
        },
        filterRegActive(){
            this.fetchVisitActive()
        },
        filterRegArchive(){
            this.fetchVisitArchive()
        },
        removeNotes(){
            let index = this.notesData.findIndex(o => {return o.id_pasien_visit == this.tempDataVisit.id_visit})
            this.deleteNotes({
                id_notes: this.notesData[index].id
            }).then(() =>{
                this.DELETE_NOTES_DATA(index)
                this.hideModalDelete()
            })
        },
        showModalDelete(item){
            this.modalDelete = true
            this.tempDataVisit = item
        },
        hideModalDelete() {
            this.modalDelete = false
            this.tempDataVisit = null
        }
    }
}
</script>

<style>

</style>