<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>EDIT DESTINASI</h4>
                        <hr>

                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Tempat Destinasi</label>
                                <input type="text" class="form-control" v-model="tempatWisata.namaTempat">

                                <!--validation-->
                                <div v-if="validation.namaTempat" class="mt-2 alert alert-danger">
                                        {{validation.namaTempat[0]}}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Alamat</label>
                                <input type="text" class="form-control" v-model="tempatWisata.alamat">

                                <!--validation-->
                                <div v-if="validation.alamat" class="mt-2 alert alert-danger">
                                    {{ validation.alamat[0]}}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Rating</label>
                                <input type="text" class="form-control" v-model="tempatWisata.rating" >

                                <!--validation-->
                                <div v-if="validation.rating" class="mt-2 alert alert-danger">
                                    {{ validation.rating[0] }}
                                </div>
                                <div class="form-group mb-3">
                                <label for="content" class="form-label">Review</label>
                                <input type="text" class="form-control" v-model="tempatWisata.review" >

                                <!--validation-->
                                <div v-if="validation.review" class="mt-2 alert alert-danger">
                                    {{ validation.review[0] }}
                                </div>
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
            const tempatWisata = reactive({
                namaTempat: '',
                alamat: '',
                rating: '',
                review: '',
            })

            //state validation
            const validation = ref([])
            //vue router
            const router = useRouter()
            //vue route
            const route = useRoute()

            onMounted(() => {
            //get API from Laravel Backend
                axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`
                axios.get(`http://localhost:8000/api/tempatWisatas/${route.params.id}`)
                .then(response => {
                    //assign state posts with response data
                    tempatWisata.namaTempat = response.data.data.namaTempat  
                    tempatWisata.alamat  = response.data.data.alamat 
                    tempatWisata.rating = response.data.data.rating 
                    tempatWisata.review = response.data.data.review

                }).catch(error => {
                    console.log(error.response.data)
                })
            })

            //method update
            function update() {
                let namaTempat = tempatWisata.namaTempat
                let alamat = tempatWisata.alamat
                let rating = tempatWisata.rating
                let review = tempatWisata.review
                
                axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`
                axios.put(`http://localhost:8000/api/tempatWisatas/${route.params.id}`, {
                    namaTempat: namaTempat,
                    alamat: alamat,
                    rating: rating,
                    review: review,
                }).then(() => {
                        //redirect ke post index
                        router.push({
                            name: 'destinasi.index'
                        })
                    }).catch(error => {
                        //assign state validation with error
                        validation.value = error.response.data
                    })

            }

            //return
            return {
                tempatWisata,
                validation,
                router,
                update
            }

        }
    }    
</script>

<style>

</style>