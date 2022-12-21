<template>
  <div class="col-lg-4">
    <div class="card card-profile mb-4">
      <div class="card-header" style="background-image: url(https://therichpost.com/wp-content/uploads/2021/05/bootstrap5-carousel-slider-img1.jpg);"> </div>
      <div class="card-body text-center"><img class="card-profile-img" src="https://upload.wikimedia.org/wikipedia/commons/5/50/User_icon-cp.svg" alt="Jassa Rich">
        <h3 class="mb-3">{{ users.name }}</h3>
        <p class="mb-4">{{ users.email }}</p>
      </div>
    </div>
  </div>

  <form class="card mb-4" @submit.prevent="update">
    <div class="card-header">
      <h4 class="card-heading">Edit Profile</h4>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-5">
          <div class="mb-4">
            <label class="form-label">Username</label>
            <input class="form-control" v-model="users.name" placeholder="Masukkan name"/>
          </div>
        </div>
        <div class="col-sm-6 col-md-3">
          <div class="mb-4">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" v-model="users.password" placeholder="Masukkan password"/>
          </div>
        </div>
        </div>
      </div>
    <div class="card-footer text-end">
      <button class="btn btn-primary" type="submit">Update Profile</button>
    </div>
  </form>
</template>

<script>
  import axios from "axios";
  import { useRoute , useRouter } from 'vue-router'
  import { onMounted, reactive, ref } from "vue";
  export default {
    setup() {
      //reactive state
      const users = reactive({
        name: '',
        email: '',
        password:''
      })
      //vue route
      const route = useRoute()

      const router = useRouter();
      
      const validation = ref([]);

      onMounted(() => {
        //get API from Laravel Backend
        axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`
        axios.get(`http://localhost:8000/api/users/${localStorage.getItem("user")}`)
          .then((response) => {
            //assign state posts with response data
            users.name = response.data.data.name,
            users.email = response.data.data.email
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      });

      function update() {
      let name = users.name;
      let password = users.password;
      axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`
      axios.put(`http://localhost:8000/api/users/${localStorage.getItem("user")}`,
          {
            name: name,
            password: password,
          }
        )
        .then((response) => {
          localStorage.setItem("name", response.data.data.name);
          localStorage.setItem("password", response.data.data.password);
          //redirect ke post index
          router.push({
            name: "profile.index",
          });
        }).catch((error) => {
          //assign state validation with error
          validation.value = error.response.data;
        });
    }

      return{
            users,
            route,
            router,
            update 
      }
    }
  }
</script>