<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Dashboard</h1>
    </div>

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <router-link :to="{name: 'tiket.create'}" class="btn btn-md btn-success">TAMBAH Tiket</router-link>
                        <table class="table table-striped table-bordered mt-4">

                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">NAMA PEMBELI</th>
                                    <th scope="col">BIRO PERJALANAN YANG DIPILIH</th>
                                    <th scope="col">TIPE KELAS YANG DIPILIH</th>
                                    <th scope="col">NO TELEPON</th>
                                    <th scope="col">EMAIL</th>
                                    <th scope="col">TANGGAL BELI</th>
                                    <th scope="col">HARGA TIKET</th>
                                    <th scope="col">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(tiket, id) in tikets" :key="id">
                                    <td>{{ tiket.namaPembeli }}</td>
                                    <td>{{ tiket.trip.namaBiro }}</td>
                                    <td>{{ tiket.tipeKelas==0 ? "Bisnis" : "Eksklusif" }}</td>
                                    <td>{{ tiket.tlp }}</td>
                                    <td>{{ tiket.email }}</td>
                                    <td>{{ tiket.tglBeli }}</td>
                                    <td>{{ tiket.harga }}</td>
                                    <td class="text-center">
                                        <!-- <router-link :to="{ name: 'pegawai.edit', params: { id: pegawai.id } }" class="btn btn-sm btn-primary mr-1">
                                            EDIT
                                        </router-link> -->
                                        <button @click.prevent="tiketDelete(tiket.id)" class="btn btn-sm btn-danger ml-1">
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
        let tikets = ref([])

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`
            axios.get('http://localhost:8000/api/tikets')
            .then(response => {
                //assign state posts with response data
                
                tikets.value = response.data.data
            }).catch(error => {
                console.log(error.response.data)
            })
        })

        function tiketDelete(id){
            axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`
            axios.delete(`http://localhost:8000/api/tikets/${id}`)
            .then(() => {     
            //splice departemen 
            tikets.value.splice(tikets.value.indexOf(id),1)
    
            }).catch(error =>{
                console.log(error.response.data)
            })
        }

        return{
            tikets,
            tiketDelete
        }
    }
}
</script>

<style>

</style>