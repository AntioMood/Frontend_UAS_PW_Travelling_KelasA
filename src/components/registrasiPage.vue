<template>
    <section class="vh-100" style="background-color: #eee;">
        <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-12 col-xl-11">
                <div class="card text-black" style="border-radius: 25px;">
                <div class="card-body p-md-5">
                    <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                        <form class="mx-1 mx-md-4" @submit.prevent="register">

                            <div class="d-flex flex-row align-items-center mb-4">
                                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                <div class="form-outline flex-fill mb-0">
                                    <label class="form-label" for="form3Example1c">Your Name</label>
                                    <input v-model="user.name" type="text" id="form3Example1c" class="form-control" />
                                    <div v-if="validation.name" class="mt-2 alert alert-danger">
                                        {{ validation.name[0] }}
                                    </div>
                                </div>
                            </div>    

                            <div class="d-flex flex-row align-items-center mb-4">
                                <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                <div class="form-outline flex-fill mb-0">
                                    <label class="form-label" for="form3Example3c">Your Email</label>
                                    <input v-model="user.email" type="email" id="form3Example3c" class="form-control" />
                                    <div v-if="validation.email" class="mt-2 alert alert-danger">
                                        {{ validation.email[0] }}
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex flex-row align-items-center mb-4">
                                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                <div class="form-outline flex-fill mb-0">
                                    <label class="form-label" for="form3Example4c">Password</label>
                                    <input v-model="user.password" type="password" id="form3Example4c" class="form-control" />
                                    <div v-if="validation.password" class="mt-2 alert alert-danger">
                                        {{ validation.password[0] }}
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <button type="submit" class="btn btn-primary btn-lg">Register</button>
                            </div>

                            <p class="mb-0 mx-3">
                                Already have an account? <a href="#!" class="text-white fw-bold"><router-link :to="{ name: 'login' }">Login</router-link></a>
                            </p>

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
      name: "",
      email: "",
      password: "",
    });

    const validation = ref([]);

    const router = useRouter();

    function register() {
      let name = user.name;
      let email = user.email;
      let password = user.password;
      axios.post("http://127.0.0.1:8000/api/register", {
          name: name,
          email: email,
          password: password,
        })
        .then(() => {
          router.push({
            name: "login",
          });
        })
        .catch((error) => {
          validation.value = error.response.data;
        });
    }

    return {
      user,
      validation,
      router,
      register,
    };
  },
};
</script>