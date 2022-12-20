<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT BIRO</h4>
                        <hr>

                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Biro Perjalanan</label>
                                <input type="text" class="form-control" v-model="trip.namaBiro">

                                <!--validation-->
                                <div v-if="validation.namaBiro" class="mt-2 alert alert-danger">
                                        {{validation.namaBiro[0]}}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tipe Perjalanan</label>
                                <input type="text" class="form-control" v-model="trip.tipePerjalanan">

                                <!--validation-->
                                <div v-if="validation.tipePerjalanan" class="mt-2 alert alert-danger">
                                    {{ validation.tipePerjalanan[0]}}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Jenis Transportasi</label>
                                <input type="text" class="form-control" v-model="trip.jenisTransportasi">

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
    import { reactive, ref, onMounted } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
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
            //vue route
            const route = useRoute()

            onMounted(() => {
            //get API from Laravel Backend
                axios.get(`http://localhost:8000/api/trips/${route.params.id}`)
                .then(response => {
                    //assign state posts with response data
                    trip.namaBiro = response.data.data.namaBiro  
                    trip.tipePerjalanan  = response.data.data.tipePerjalanan 
                    trip.jenisTransportasi = response.data.data.jenisTransportasi 

                }).catch(error => {
                    console.log(error.response.data)
                })
            })

            //method update
            function update() {
                let namaBiro = trip.namaBiro
                let tipePerjalanan = trip.tipePerjalanan
                let jenisTransportasi = trip.jenisTransportasi

                axios.put(`http://localhost:8000/api/trips/${route.params.id}`, {
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
                update
            }

        }
    }    
</script>

<style>

</style>