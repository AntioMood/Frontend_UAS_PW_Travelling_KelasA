//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('@/components/loginPage.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/components/registrasiPage.vue'),
    },
    {
        path: '/beranda',  
        name: 'beranda',
        component: () => import('@/components/DashboardLayout.vue'),
        children:[
            {
                path: "/biro",
                name: "biro.index",
                component: () => import('@/view/Biro/indexPage.vue'),
            },
            {
                path: "/biro/create",
                name: "biro.create",
                component: () => import('@/view/Biro/createPage.vue'),
            },
            {
                path: "/biro/edit/:id",
                name: "biro.edit",
                component: () => import('@/view/Biro/editPage.vue'),
            },
            {
                path: "/tiket",
                name: "tiket.index",
                component: () => import('@/view/Tiket/indexPage.vue'),
            },
            {
                path: "/tiket",
                name: "tiket.create",
                component: () => import('@/view/Tiket/createPage.vue'),
            },
            {
                path: "/profile",
                name: "profile.index",
                component: () => import('@/view/Profile/indexPage.vue'),
            },
            {
                path: "/destinasi",
                name: "destinasi.index",
                component: () => import('@/view/Destinasi/indexPage.vue'),
            },
            {
                path: "/destinasi",
                name: "destinasi.create",
                component: () => import('@/view/Destinasi/createPage.vue'),
            },
            {
                path: "/destinasi",
                name: "destinasi.edit",
                component: () => import('@/view/Destinasi/editPage.vue'),
            },         
        ],
    },
]

//create router
const router = createRouter({
        history: createWebHistory(),
        routes // config routes
    })

    export default router;