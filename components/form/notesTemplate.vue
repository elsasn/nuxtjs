<template>
    <div>
        <div class="row">
            <div class="col-lg-6">
                <div class="panel panel-primary">
                    <div class="panel-heading">Tambah Data 3</div>
                    <div class="panel-body">
                        <div class="row form-group">
                            <div class="col-md-4 mb-2 mb-md-0">
                                <strong>Test</strong>
                            </div>
                            <div class="col-md-8">
                                <input type="text" class="form-control" v-model="form.data1">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-4 mb-2 mb-md-0">
                                <strong>Input dengan addon</strong>
                            </div>
                            <div class="col-md-8">
                                <div class="input-group mb-2">
                                    <input type="text" class="form-control" id="inlineFormInputGroup" v-model="form.data2">
                                    <div class="input-group-addon">
                                        <div class="input-group-text rounded-left-0 border-left-0">Addon</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-4 mb-2 mb-md-0">
                                <strong>Button toggle</strong>
                            </div>
                            <div class="col-md-8">
                                <div class="custom-control custom-switch">
                                    <input type="checkbox" v-model="form.toggle" class="custom-control-input" id="customSwitch1">
                                    <label class="custom-control-label cursor-pointer" for="customSwitch1">Yes</label>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-4 mb-2 mb-md-0">
                                <strong>Tanggal</strong>
                            </div>
                            <div class="col-md-8">
                                <client-only>
                                    <date-picker mode='single' :popover="{visibility: 'focus'}" v-model='form.selectedDate' />
                                </client-only>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-4 mb-2 mb-md-0">
                                <strong>Tanggal</strong>
                            </div>
                            <div class="col-md-8">
                                <b-form-timepicker v-model="form.time" locale="en"></b-form-timepicker>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-4 mb-2 mb-md-0">
                                <strong>Petugas Approve</strong>
                            </div>
                            <div class="col-md-8">
                                <client-only>
                                    <app-select 
                                        v-model="form.petugasSelected" 
                                        :options="dataPerawat" 
                                        label="nama"
                                        track-by="id"
                                        :searchable="false" 
                                        :show-labels="false" 
                                        placeholder=" -- Pilih petugas Approve --">
                                    </app-select>
                                </client-only>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-4 mb-2 mb-md-0">
                                <strong>Dokter Approve</strong>
                            </div>
                            <div class="col-md-8">
                                <client-only>
                                    <app-select 
                                        v-model="form.dokterSelected" 
                                        :options="dataDokter" 
                                        label="nama"
                                        track-by="id"
                                        :searchable="false" 
                                        :show-labels="false" 
                                        placeholder=" -- Pilih dokter Approve --">
                                    </app-select>
                                </client-only>
                            </div>
                        </div>
                    </div>
                    <div class="panel-footer d-flex align-items-center justify-content-end">
                        <nuxt-link tag="a" :to="{ name: 'notes_template-index-list'}" class="btn btn-default">Batal</nuxt-link>
                        <button class="btn btn-primary ml-2" @click="submitNotes">Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    data: () =>{
        return {
            form : {
                data1: null,
                data2: null,
                selectedDate: new Date(),
                time: '',
                petugasSelected : null,
                petugasOptions: ['Nama 3', 'Nama 4'],
                dokterSelected : null,
                dokterOptions: ['Nama 5', 'Nama 6']
            }
        }
    },
    computed: {
        ...mapState(['dataDokter', 'dataPerawat']),
        ...mapState('kunjungan', {
            selectedVisit : state => state.selectedVisit
        })
    },
    methods: {
        ...mapActions('kunjungan', ['postNotes']),
        submitNotes() {
            this.postNotes({
                id_ref_global_tipe_42: '427',
                id_pasien_registrasi: this.selectedVisit.id_registrasi,
                id_pasien_visit: this.selectedVisit.id_visit,
                id_petugas_approve: this.form.petugasSelected.id,
                id_dokter_approve: this.form.dokterSelected.id,
                notes: {
                    data1: this.form.data1,
                    data2: this.form.data2
                }
            }).then(() =>{
                this.$router.push({name: 'notes_template-index-list'})
            })
        }
    }
}
</script>

<style>

</style>