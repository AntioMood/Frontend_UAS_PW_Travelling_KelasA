<template>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">TREVELALA</a>
        <button class="navbar-toggler position-absolute d-md-none collapsed" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#sidebarMenu" 
            aria-controls="sidebarMenu" 
            aria-expanded="false" 
            aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
        </button>
    </header>
    
    <div class="container-fluid">
        <div class="row">
            <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div class="position-sticky pt-3">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <router-link :to="{name:'biro.index'}" class="nav-link">Biro Transportasi</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{name:'tiket.index'}" class="nav-link">Pemesanan Tiket Perjalanan</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{name:'destinasi.index'}" class="nav-link">Destinasi</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{name:'profile.index'}" class="nav-link">Profile</router-link>
                        </li>
                        <li class="nav-item pb-4" style="margin-top: 500px; margin-left: -15px;">
                            <form class="mx-1 mx-md-4" @submit.prevent="logout">
                                <button class="btn btn-danger" type="submit">Logout</button>
                            </form>
                        </li>
                    </ul>
                </div>
                
            </nav>

            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4"> 

                <!-- View Route -->
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>        

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
export default{
    setup() {
    const user = reactive({
      email: "",
      password: "",
    });

    const token = ref("");

    const message = ref("");

    const router = useRouter();

    const validation = ref([]);


    function logout() {
        localStorage.removeItem("token")
        router.push({
            name: "login"
        })
    }

    return {
      user, 
      validation, 
      message,
      token,
      logout, 
    };
  },
}

</script>

<style>
    body{
        font-size: .875rem;
    }

    .feather {
        width: 16px;
        height: 16px;
        vertical-align: text-bottom;
    }

    .sidebar {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 100;
        padding: 48px 0 0;
        box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
    }

    .sidebar-sticky {
        position: relative;
        top: 0;
        height: calc(100vh - 48px);
        padding-top: .5rem;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .sidebar .nav-link {
        font-weight: 500;
        color: #333;
    }

    .sidebar .nav-link .feather {
        margin-right: 4px;
        color: #727272;
    }

    .sidebar .nav-link.active {
        color: #2470dc;
    }

    .sidebar .nav-link:hover .feather,
    .sidebar .nav-link.active .feather {
        color: inherit;
    }

    /*
    * Navbar
    */
    .navbar-brand {
        padding-top: .75rem;
        padding-bottom: .75rem;
        font-size: 1rem;
        background-color: rgba(0, 0, 0, .25);
        box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
    }

    .navbar .navbar-toggler {
        top: .25rem;
        right: 1rem;
    }

    .navbar .form-control {
        padding: .75rem 1rem;
        border-width: 0;
        border-radius: 0;
    }

    .form-control-dark {
        color: #fff;
        background-color: rgba(255, 255, 255, .1);
        border-color: rgba(255, 255, 255, .1);
    }

    .form-control-dark:focus {
        border-color: transparent;
        box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
    }
</style>