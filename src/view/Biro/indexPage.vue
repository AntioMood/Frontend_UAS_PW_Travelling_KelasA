<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{name: 'biro.create'}" class="btn btn-md btn-success">TAMBAH DEPARTEMEN</router-link>
                        <table class="table table-striped table-bordered mt-4">

                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NAMA BIRO PERJALANAN</th>
                                    <th scope="col">TIPE PERJALANAN</th>
                                    <th scope="col">JENIS TRANSPORTASI</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(trip, id) in trips" :key="id">
                                    <td>{{ trip.namaBiro }}</td>
                                    <td>{{ trip.tipePerjalanan }}</td>
                                    <td>{{ trip.jenisTransportasi }}</td>
                                    <td class="text-center">
                                        <router-link :to="{ name: 'biro.edit', params: { id: trip.id } }" class="btn btn-sm btn-primary mr-1">
                                            EDIT
                                        </router-link>
                                        <button @click.prevent="tripDelete(trip.id)" class="btn btn-sm btn-danger ml-1">
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
        let trips = ref([])

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`
            axios.get('http://localhost:8000/api/trips')
            .then(response => {
                //assign state posts with response data
                trips.value = response.data.data
            }).catch(error => {
            console.log(error.response.data)
            })
        })

        function tripDelete(id){
            axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`
            axios.delete(`http://localhost:8000/api/trips/${id}`)
            .then(() => {     
            //splice departemen 
            trips.value.splice(trips.value.indexOf(id),1)
    
            }).catch(error =>{
                console.log(error.response.data)
            })
        }

        return{
            trips,
            tripDelete
        }
    }
}
</script>

<style>

</style>