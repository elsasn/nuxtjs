export const state = () => ({
    data: [],
    fields: [
      { key: 'no', label: 'No' },
      { key: 'id_visit', label: 'No. Reg', sortable: true },
      { key: 'no_visit', label: 'No. BPJS', sortable: true },
      { key: 'keterangan_pulang', label: 'No. RM', sortable: true },
      { key: 'kondisi_pulang', label: 'Penjamin', sortable: true },
      { key: 'alasan_pulang' },
      { key: 'asal_pasien' },
      { key: 'id_pj_ruangan' },
      { key: 'nama_pj_ruangan' },
      { key: 'tgl_checkout' },
      { key: 'nama_petugas_checkout' },
      { key: 'nama_petugas_checkin'},
      { key: 'durasi' },
      { key: 'pemeriksaan_fisik' },
      { key: 'pemeriksaan_penunjang' },
      { key: 'diagnosa_dokter' },
      { key: 'terapi_tindakan' },
      { key: 'icd_10_primary', label: 'ICD 10 Primary' },
      { key: 'icd_10_secondary', label: 'ICD 10 Secondary' },
      { key: 'icd_10_awal', label: 'ICD 10 Awal' },
      { key: 'icd_9', label: 'ICD 09'},

    ],
    statistik: ''
  })
  
  export const mutations = {
    SET_DATA_PASIEN(state, payload) {
      state.data = payload
    },
    SET_STATISTIK_PASIEN(state, payload) {
      state.statistik = payload
    }
  }
  
  let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiQmlsbCBHYXRlcyIsImlkX3VzZXIiOiIxMDA1Iiwicm1fbnVtYmVyIjoiMDA1IiwicnNfa2V5IjoiQTEyMyIsImlwX2FkZHJlc3MiOiIxMjcuMC4xLjEiLCJhY2Nlc3MiOiJ1c2VyIn0.riOFjZvDhuYZ8bxYA02xaedXSt_pxlEUP19cfzxupmk'
  
  export const actions = {
    async getListDataVisit({commit}, payload) {
      try {
        const { data } = await this.$axios.get('/laporan/datavisit', {
          headers: {
            'X-Token': token,
          },
        })
  
        // ubah data api menjadi data untuk table
        const datavisit = data.data.map((x,i) => ({
          no: i + 1,
          icd_10_primary: Object.keys(x.data_catatan.icd_10_primary).join(', '),
          icd_10_secondary: Object.keys(x.data_catatan.icd_10_secondary).join(', '),
          icd_10_awal: Object.keys(x.data_catatan.icd_10_awal).join(', '),
          icd_9: Object.keys(x.data_catatan.icd_9).join(', '),
          ...x.data_pasien,
          ...x.data_registrasi
        }))
  
        commit('SET_DATA_PASIEN', datavisit)      
      } catch (error) {
        new Error('Error getListDataVisit', error)
      }
    }
  }