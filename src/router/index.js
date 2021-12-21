import Vue from "vue";
import VueRouter from "vue-router";
import PaymentPage from "../components/PaymentPage.vue";
import Home from "../components/Home.vue";
import Email from "../components/emails/Email.vue";
import Video from "../components/Video.vue";
import Model from "../components/Model.vue";
import Static from "../components/Statics.vue";
import ErrorPage from "../components/404.vue";
import InstallApp from "../components/InstallApp";
import Admin from "@/components/admin/Admin.vue";
import Coupon from "@/components/admin/Coupon.vue";
import DeliveryTracking from "@/components/admin/DeliveryTracking.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/model",
    name: "Model",
    component: Model
  },
  {
    path: "/content/:url",
    name: "Static",
    component: Static
  },
  {
    path: "/shop",
    name: "Payment Page",
    component: PaymentPage
  },
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/landing/*",
    redirect: { name: "Home" }
  },
  {
    path: "/landing",
    redirect: { name: "Home" }
  },
  {
    path: "*",
    redirect: "/not-there"
  },
  {
    path: "/link/:url",
    name: "Email",
    component: Email
  },
  {
    path: "/watch-me",
    name: "Video",
    component: Video
  },
  {
    path: "/not-there",
    name: "404 Page",
    component: ErrorPage
  },
  {
    path: "/app",
    name: "app install",
    component: InstallApp
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin
  },
  {
    path: "/admin/coupons",
    name: "Coupons",
    component: Coupon
  },
  {
    path: "/admin/delivery-tracking",
    name: "DeliveryTracking",
    component: DeliveryTracking
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});

export default router;
