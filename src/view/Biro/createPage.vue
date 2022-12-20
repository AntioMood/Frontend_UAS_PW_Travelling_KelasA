<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH BIRO</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Biro Perjalanan</label>
                                <input type="text" class="form-control" v-model="trip.namaBiro" placeholder="Masukkan nama biro">

                                <!--validation-->
                                <div v-if="validation.namaBiro" class="mt-2 alert alert-danger">
                                        {{validation.namaBiro[0]}}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tipe Perjalanan</label>
                                <input type="text" class="form-control" v-model="trip.tipePerjalanan" placeholder="Masukkan tipe perjalanan">

                                <!--validation-->
                                <div v-if="validation.tipePerjalanan" class="mt-2 alert alert-danger">
                                    {{ validation.tipePerjalanan[0]}}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Jenis Transportasi</label>
                                <input type="text" class="form-control" v-model="trip.jenisTransportasi" placeholder="Masukkan Jenis Transportasi">

                                <!--validation-->
                                <div v-if="validation.jenisTransportasi" class="mt-2 alert alert-danger">
                                    {{ validation.jenisTransportasi[0] }}
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { reactive, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'

    export default {
        setup() {
            //state departemen
            const trip = reactive({
                namaBiro: '',
                tipePerjalanan: '',
                jenisTransportasi: '',
            })

            //state validation
            const validation = ref([])
            //vue router
            const router = useRouter()

            //method store
            function store() {
                let namaBiro = trip.namaBiro
                let tipePerjalanan = trip.tipePerjalanan
                let jenisTransportasi = trip.jenisTransportasi

                axios.post('http://localhost:8000/api/trips', {
                    namaBiro: namaBiro,
                    tipePerjalanan: tipePerjalanan,
                    jenisTransportasi: jenisTransportasi,
                }).then(() => {
                        //redirect ke post index
                        router.push({
                            name: 'biro.index'
                        })
                    }).catch(error => {
                        //assign state validation with error
                        validation.value = error.response.data
                    })

            }

            //return
            return {
                trip,
                validation,
                router,
                store
            }

        }
    }    
</script>

<style>

</style>