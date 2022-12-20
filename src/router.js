//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes

const routes = [
    {
        path: '/',
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
            // {
            //     path: "/biro/create",
            //     name: "biro.create",
            //     component: () => import('@/view/Biro/createPage.vue'),
            // },
            // {
            //     path: "/biro/edit/:id",
            //     name: "biro.edit",
            //     component: () => import('@/view/Biro/editPage.vue'),
            // },
            
        ],
    },
]

//create router
const router = createRouter({
        history: createWebHistory(),
        routes // config routes
    })

    export default router;