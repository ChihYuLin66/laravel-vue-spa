import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    // 首頁
    {
        path: '/',
        name: 'Admin Home',
        meta: {
            title: 'home',
            authRequired: true,
        },
        component: () => import('../views/admin/Home.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Before each route evaluates...
router.beforeEach(async (routeTo, routeFrom, next) => {
    // set title name
    if (routeTo.meta.title != undefined) {
        document.title = routeTo.meta.title + " | DEMO";
    }

    // const authRequired = routeTo.matched.some((route) => route.meta.authRequired);
    // if (!authRequired) return next();
    //
    // if (localStorage.getItem('user')) {
    //     next();
    // } else {
    //     next({ name: 'login', query: { redirectFrom: routeTo.fullPath } });
    // }

    next();
});

export default router;
