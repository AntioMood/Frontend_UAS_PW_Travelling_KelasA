<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{name: 'destinasi.create'}" class="btn btn-md btn-success">TAMBAH DESTINASI</router-link>
                        <table class="table table-striped table-bordered mt-4">

                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NAMA TEMPAT DESTINASI</th>
                                    <th scope="col">ALAMAT</th>
                                    <th scope="col">RATING</th>
                                    <th scope="col">REVIEW</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(tempatWisata, id) in tempatWisatas" :key="id">
                                    <td>{{ trip.namaTempat }}</td>
                                    <td>{{ trip.alamat }}</td>
                                    <td>{{ trip.rating }}</td>
                                    <td>{{ trip.review }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'destinasi.edit', params: { id: trip.id } }" class="btn btn-sm btn-primary mr-1">
                                            EDIT
                                        </router-link>
                                        <button @click.prevent="tempatWisataDelete(trip.id)" class="btn btn-sm btn-danger ml-1">
                                            DELETE
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'

export default {
    setup() {
        //reactive state
        let tempatWisatas = ref([])

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`
            axios.get('http://localhost:8000/api/tempat_wisatas')
            .then(response => {
                //assign state posts with response data
                tempatWisatas.value = response.data.data
            }).catch(error => {
            console.log(error.response.data)
            })
        })

        function tempatWisataDelete(id){
            axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`
            axios.delete(`http://localhost:8000/api/tempat_wisatas/${id}`)
            .then(() => {     
            //splice departemen 
            tempatWisatas.value.splice(tempatWisatas.value.indexOf(id),1)
    
            }).catch(error =>{
                console.log(error.response.data)
            })
        }

        return{
            tempatWisatas,
            tempatWisataDelete
        }
    }
}
</script>

<style>

</style>