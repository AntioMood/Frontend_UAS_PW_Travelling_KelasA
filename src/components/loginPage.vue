<template>
    <section class="vh-100" style="background-color: #eee;">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-12 col-xl-11">
                <div class="card text-black" style="border-radius: 25px;">
                <div class="card-body p-md-5">
                    <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <div v-if="loginFailed" class="alert alert-danger">
                        Email atau Password Anda salah.
                      </div>

                        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                        <form class="mx-1 mx-md-4" @submit.prevent="login">

                        <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                                <label class="form-label" for="form3Example3c">Email</label>
                                <input v-model="user.email" type="email" id="form3Example3c" class="form-control" />
                            </div>
                            <div v-if="validation.email" class="mt-2 alert alert-danger">
                                {{ validation.email[0] }}
                            </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                            <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div class="form-outline flex-fill mb-0">
                                <label class="form-label" for="form3Example4c">Password</label>
                                <input v-model="user.password" type="password" id="form3Example4c" class="form-control" />
                            </div>
                            <div v-if="validation.password" class="mt-2 alert alert-danger">
                                {{ validation.password[0] }}
                            </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4 mx-3">
                            <p>
                            Don't have an account? <a href="#!" class="text-white-50 fw-bold"><router-link :to="{ name: 'register' }">Sign Up </router-link></a>
                            </p>
                        </div>

                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" class="btn btn-primary btn-lg">Login</button>
                        </div>

                        </form>

                    </div>
                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        class="img-fluid" alt="Sample image">

                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
  </section>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  setup() {
    const user = reactive({
      email: "",
      password: "",
    });

    const token = ref("");

    const message = ref("");

    const router = useRouter();

    const loginFailed = ref(null)

    const validation = ref([]);


    function login() {
      axios.post(`http://127.0.0.1:8000/api/login`, {
        email: user.email,
        password: user.password
      })
      .then((response) => {
        if(response.data.success){
          localStorage.setItem('token', response.data.access_token)
          localStorage.setItem('user', response.data.user.id);

            console.log(localStorage.getItem('token'))

            router.push({
              name: 'beranda',
              params:{
                  type: "success",
                  text: "Berhasil Login"
              }
            })
        }
        loginFailed.value = true

        }).catch(error => {
            message.value = error.response.data.message
            console.log(error.response.data.message)
        });
    }

    return {
      user, 
      validation, 
      message,
      loginFailed,
      token,
      login, 
    };
  },
};
</script>