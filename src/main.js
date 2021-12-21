import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import VueGeolocation from "vue-browser-geolocation";
import "@/assets/css/tailwind.css";
// Vue.config.productionTip = false;
import { StripePlugin } from "@vue-stripe/vue-stripe";

let hostname = window.location.hostname;
let stripeKey =
  "pk_test_51GwqHLBFCoJ8vqH8CqGQTokpO0owv9in81AkKc5197KAEjmfX4PqArBcB735hEgx1aEWAKsGu8XDDhcE7ZwFz5DU00z0M9qUPH";
if (hostname == "plugandplink.com") {
  stripeKey =
    "pk_live_51GwqHLBFCoJ8vqH8FUMwGcDuMFW9NqBjjcCYaCkVqnhMPHMXTBFDxIc5iCMpPJ0sEMSDpAo2YI7PKNWl7sxK08TV00Q39Jx2ag";
}

const options = {
  pk: stripeKey,
  stripeAccount: process.env.STRIPE_ACCOUNT,
  apiVersion: process.env.API_VERSION,
  locale: process.env.LOCALE
};

Vue.use(StripePlugin, options);

new Vue({
  vuetify,
  router,
  VueGeolocation,
  render: h => h(App)
}).$mount("#app");
