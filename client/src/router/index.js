import Vue from "vue";
import Router from "vue-router";
import LandingPage from "./LandingPage";
import StockPage from "./StockPage";
import TrendingPage from "./TrendingPage";
import DashboardPage from "./DashboardPage";
import StreamPage from "./StreamPage";
import MyDashBoard from "./MyDashBoard";

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [{
            path: "/",
            component: LandingPage,
            beforeEnter: (to, from, next) => {
                if (router.app.$root.user) next("/mydashboard");
                else next();
            }
        },
        {
            path: "/stocks/:stockName",
            component: StockPage,
        },
        {
            path: "/trending",
            component: TrendingPage
        },
        {
            path: "/mydashboard",
            component: MyDashBoard,
        },
        {
            path: "/dashboard/:id",
            component: DashboardPage,
        },
        {
            path: "/stream",
            component: StreamPage
        }
    ],

    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});

export default router;