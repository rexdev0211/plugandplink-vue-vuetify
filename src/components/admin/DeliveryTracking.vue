<template>
  <div class="flex-2 flex flex-row h-full mt-8 gap-8">
    <div class="flex-1 create-coupon">
      <div
        class="list-title flex flex-col justify-start gap-4 my-4 items-start"
      >
        <SuccessCard
          v-if="success"
          class="z-50 w-80 self-center"
          :val="message"
        ></SuccessCard>
        <div class="flex flex-row  items-center justify-center gap-4 w-full">
          <h4 class="text-gray-600 font-bold text-2xl self-center">
            Create Delivery Tracking
          </h4>
        </div>
      </div>
      <form class="flex items-center justify-center">
        <div class="grid bg-white rounded-lg shadow-xl">
          <div class="grid grid-cols-3 mt-2 mx-4 items-end">
            <label
              class="uppercase text-right col-span-1 py-2 pl-2 pr-8 mt-1 md:text-sm text-xs text-gray-500 text-plthird font-semibold"
              >Order Nummber</label
            >
            <input
              class="py-2 px-3 rounded-lg text-plthird  col-span-2 border-2 border-plprimary mt-1 focus:outline-none focus:ring-2 focus:ring-plprimary focus:border-transparent"
              type="text"
              v-model="deliveryTracking.orderNumber"
              placeholder="Order Number"
            />
          </div>
          <div class="grid grid-cols-3 mt-2 mx-4 items-end">
            <label
              class="uppercase text-right col-span-1 py-2 pl-2 pr-8 mt-1 md:text-sm text-xs text-gray-500 text-plthird font-semibold"
              >Tracking String</label
            >
            <input
              class="py-2 px-3 rounded-lg text-plthird  col-span-2 border-2 border-plprimary mt-1 focus:outline-none focus:ring-2 focus:ring-plprimary focus:border-transparent"
              type="text"
              v-model="deliveryTracking.trackingString"
              placeholder="Tracking String"
            />
          </div>
          <div class="grid grid-cols-3 mt-2 mx-4 items-end">
            <label
              class="uppercase text-right col-span-1 py-2 pl-2 pr-8 mt-1 md:text-sm text-xs text-gray-500 text-plthird font-semibold"
              >Delivery Company</label
            >
            <input
              class="py-2 px-3 rounded-lg text-plthird  col-span-2 border-2 border-plprimary mt-1 focus:outline-none focus:ring-2 focus:ring-plprimary focus:border-transparent"
              type="text"
              v-model="deliveryTracking.deliveryCompany"
              placeholder="Delivery Company"
            />
          </div>
          <div class="grid grid-cols-3 mt-2 mx-4 items-end">
            <label
              class="uppercase text-right col-span-1 py-2 pl-2 pr-8 mt-1 md:text-sm text-xs text-gray-500 text-plthird font-semibold"
              >Password</label
            >
            <input
              class="py-2 px-3 rounded-lg text-plthird  col-span-2 border-2 border-plprimary mt-1 focus:outline-none focus:ring-2 focus:ring-plprimary focus:border-transparent"
              type="password"
              v-model="deliveryTracking.password"
              placeholder="Password"
            />
          </div>

          <div
            class="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5"
          >
            <button
              class="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
              @click="clear"
            >
              Cancel
            </button>
            <button
              class="w-auto bg-plprimary hover:bg-opacity-70 rounded-lg shadow-xl font-medium text-white px-4 py-2"
              @click="createTracking"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import SuccessCard from "./SuccessCard.vue";
export default {
  components: { SuccessCard },
  data() {
    return {
      deliveryTracking: {
        orderNumber: "",
        trackingString: "",
        deliveryCompany: "",
        password: ""
      },
      post: {
        method: "POST",
        headers: {
          Connection: "keep-alive",
          Accept: "*/*"
        }
      },
      env: "snakeomatic",
      success: false,
      message: "Delivery Tracking"
    };
  },
  methods: {
    createTracking() {
      console.log("called " + this.deliveryTracking);
      fetch(
        `https://exchange.${this.env}.com/orders/add-tracking?orderNumber=${this.deliveryTracking.orderNumber}&trackingString=${this.deliveryTracking.trackingString}&deliveryCompany=${this.deliveryTracking.deliveryCompany}&password=${this.deliveryTracking.password}`,
        this.post
      )
        .then(res => {
          this.success = true;
          if (res.ok) {
            this.message = "Delivery Tracking";
          } else {
            this.message = "Error happend " + res.code;
          }
        })
        .then(data => console.log(data));
    },
    clear() {
      this.deliveryTracking = {
        orderNumber: "",
        trackingString: "",
        company: "",
        password: ""
      };
      return this.deliveryTracking;
    }
  }
};
</script>
