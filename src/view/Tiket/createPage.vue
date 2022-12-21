<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>TAMBAH TIKET</h4>
                        <hr>
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Pembeli</label>
                                <input type="text" class="form-control" v-model="tiket.namaPembeli" placeholder="Masukkan Nama">

                                <!--validation-->
                                <div v-if="validation.namaPembeli" class="mt-2 alert alert-danger">
                                        {{validation.namaPembeli[0]}}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Biro Perjalanan Yang Dipilih</label>
                                <select name="id_trip" id="id_trip" class="form-select" v-model="tiket.id_trip">
                                    <option v-for="(item, id) in trip.value" :key="id" v-bind:value="item.id">
                                        {{ item.namaBiro }}
                                    </option>
                                </select>

                                <!--validation-->
                                <div v-if="validation.id_trip" class="mt-2 alert alert-danger">
                                    {{ validation.id_trip[0]}}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tipe Kelas Yang Dipilih</label>
                                <select name="gender" id="gender" class="form-select" v-model="tiket.tipeKelas">
                                    <option value="0">Bisnis</option>
                                    <option value="1">Eksklusif</option>
                                </select>

                                <!--validation-->
                                <div v-if="validation.tipeKelas" class="mt-2 alert alert-danger">
                                    {{ validation.tipeKelas[0]}}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Nomor Telepon</label>
                                <input class="form-control" v-model="tiket.tlp" placeholder="Masukkan Nomor Telepon">

                                <!--validation-->
                                <div v-if="validation.tlp" class="mt-2 alert alert-danger">
                                    {{ validation.tlp[0]}}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Email</label>
                                <input class="form-control" v-model="tiket.email" placeholder="Masukkan Email">

                                <!--validation-->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0]}}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Tanggal Beli</label>
                                <input type="date" class="form-control" v-model="tiket.tglBeli" placeholder="dd/MM/YYYY">

                                <!--validation-->
                                <div v-if="validation.tglBeli" class="mt-2 alert alert-danger">
                                    {{ validation.tglBeli[0]}}
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="content" class="form-label">Harga</label>
                                <input type="number" class="form-control" v-model="tiket.harga" placeholder="Masukkan Harga">

                                <!--validation-->
                                <div v-if="validation.harga" class="mt-2 alert alert-danger">
                                    {{ validation.harga[0]}}
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
    import { useRouter } from 'vue-router'
    import axios from 'axios'

    export default {
        setup() {
            //state pegawai
            const tiket = reactive({
                namaPembeli: '',
                id_trip: '',
                tlp: '',
                tipeKelas: '',
                tglBeli: '',
                email: '',
                harga: ''
            })

            const trip = reactive([])

            //state validation
            const validation = ref([])

            //vue router
            const router = useRouter()

            onMounted(() => {
                //get API from Laravel Backend
                axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`
                axios.get("http://localhost:8000/api/trips")
                .then((response) => {
                //assign state posts with response data
                    trip.value = response.data.data
                    console.log(trip.value.data)
                }).catch((error) => {
                    console.log(error.response.data);
                });
            });

            //method store
            function store() {
                let namaPembeli = tiket.namaPembeli
                let id_trip = tiket.id_trip
                let tlp = tiket.tlp
                let tipeKelas = tiket.tipeKelas
                let tglBeli = tiket.tglBeli
                let email = tiket.email
                let harga = tiket.harga
                axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`
                axios.post(`http://127.0.0.1:8000/api/tikets`, {
                    namaPembeli: namaPembeli,
                    id_trip: id_trip,
                    tlp: tlp,
                    tipeKelas: tipeKelas,
                    tglBeli: tglBeli,
                    email: email,
                    harga: harga
                }).then(() => {
                    //redirect ke post index
                    router.push({
                        name: 'tiket.index'
                    })
                }).catch(error => {
                    //assign state validation with error
                    validation.value = error.response.data
                })

            }

            //return
            return {
                tiket,
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


