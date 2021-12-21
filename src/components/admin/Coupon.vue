<template>
  <div class="flex lg:flex-row md:flex-col sm:flex-col h-full mt-8 gap-8">
    <div class="flex-2 w-2/3 sm:order-2 md:order-2 lg:order-1 coupon-list">
      <div
        class="list-title flex flex-col justify-start gap-4 my-4 items-start"
      >
        <div class="flex flex-row  items-center align-bottom gap-4">
          <div>
            <input
              class="py-2 text-plthird px-3 rounded-lg border-2 border-plprimary mt-1 outline-none ring-2 ring-plprimary border-transparent"
              type="password"
              v-model="Password"
              placeholder="Password"
            />
          </div>
          <label class="inline-flex items-center py-2 rounded-lg">
            <input
              type="checkbox"
              class="h-5 w-5 text-plprimary"
              v-model="SingleUse"
            /><span class="ml-2 text-gray-700">Single Use</span>
          </label>
          <button
            class="bg-plprimary px-4 py-2 rounded-lg text-lg hover:bg-opacity-50"
            @click="fetchCoupons()"
          >
            Fetch Coupons
          </button>
        </div>
      </div>
      <div class="rounded-lg shadow-xl">
        <table class="min-w-full table-auto">
          <thead class="justify-between h-14">
            <tr
              class="bg-opacity-5 border-black border-t-2 border-b-2 bg-gradient-to-tr from-gray-500 to-gray-300"
            >
              <th class="px-8 py-1">
                <span class="text-white text-xl">Code</span>
              </th>
              <th class="px-8 py-1">
                <span class="text-white text-xl">Start Date</span>
              </th>
              <th class="px-8 py-1">
                <span class="text-white text-xl">Finish Date</span>
              </th>

              <th class="px-8 py-1">
                <span class="text-white text-xl">Percentage</span>
              </th>

              <th class="px-8 py-1">
                <span class="text-white text-xl">Action</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-gray-200">
            <tr
              v-for="coupon in coupons"
              :key="coupon.id"
              class="bg-white border-b-2 border-gray-200"
            >
              <td>
                <span class="text-center ml-2 text-black">{{
                  coupon.code
                }}</span>
              </td>
              <td class="px-16 py-2 text-black">
                <span>{{ coupon.startDate }}</span>
              </td>
              <td class="px-16 py-2 text-black">
                <span>{{ coupon.finishDate }}</span>
              </td>
              <td class="px-16 py-2 text-black">
                <span>{{ coupon.percentage }}%</span>
              </td>

              <td class="px-16 py-2 text-black">
                <button
                  class="border-2 rounded-md border-black ring-2 ring-black px-2 py-1"
                  @click="revoke(coupon.code)"
                >
                  Revoke
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div
      class="flex-1 sm:order-1 md:order-1 md:w-full lg:w-1/3 sm:w-full lg:order-2 create-coupon"
    >
      <div
        class="list-title flex flex-col justify-start gap-4 my-4 items-start"
      >
        <div class="flex flex-row  items-center justify-center gap-4 w-full">
          <h4 class="text-gray-600 font-bold text-2xl self-center">
            Create Coupon
          </h4>
          <success-card :val="message" v-if="success"></success-card>
        </div>
      </div>
      <form class="flex items-center justify-center">
        <div class="grid bg-white rounded-lg shadow-xl">
          <div class="grid grid-cols-3 mt-2 mx-4 items-end">
            <label
              class="uppercase text-right col-span-1 py-2 pl-2 pr-8 mt-1 md:text-sm text-xs text-gray-500 text-plthird font-semibold"
              >Code</label
            >
            <input
              class="py-2 px-3 rounded-lg text-plthird  col-span-2 border-2 border-plprimary mt-1 focus:outline-none focus:ring-2 focus:ring-plprimary focus:border-transparent"
              type="text"
              v-model="coupon.code"
              placeholder="Code"
            />
          </div>
          <div class="grid grid-cols-3 mt-2 mx-4 items-end">
            <label
              class="uppercase text-right col-span-1 py-2 pl-2 pr-8 mt-1 md:text-sm text-xs text-gray-500 text-plthird font-semibold"
              >Days</label
            >
            <input
              class="py-2 px-3 rounded-lg text-plthird  col-span-2 border-2 border-plprimary mt-1 focus:outline-none focus:ring-2 focus:ring-plprimary focus:border-transparent"
              type="number"
              v-model="coupon.days"
              placeholder="Days"
            />
          </div>
          <div class="grid grid-cols-3 mt-2 mx-4 items-end">
            <label
              class="uppercase text-right col-span-1 py-2 pl-2 pr-8 mt-1 md:text-sm text-xs text-gray-500 text-plthird font-semibold"
              >Percentage</label
            >
            <input
              class="py-2 px-3 rounded-lg text-plthird  col-span-2 border-2 border-plprimary mt-1 focus:outline-none focus:ring-2 focus:ring-plprimary focus:border-transparent"
              type="number"
              v-model="coupon.percentage"
              placeholder="Percentage"
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
              v-model="coupon.pwd"
              placeholder="Password"
            />
          </div>
          <div class="grid grid-cols-3 mt-2 mx-4 items-end">
            <label
              class="uppercase text-right col-span-1 py-2 pl-2 pr-8 mt-1 md:text-sm text-xs text-gray-500 text-plthird font-semibold"
              >Single Use</label
            >
            <input
              class="py-2 px-3 rounded-lg text-plprimary checked:plprimary  col-span-2 border-2 border-plprimary mt-1 focus:outline-none focus:ring-2 focus:ring-plprimary focus:border-transparent"
              type="checkbox"
              v-model="coupon.SingleUse"
            />
          </div>

          <div
            class="flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5"
          >
            <button
              class="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              Cancel
            </button>
            <button
              class="w-auto bg-plprimary hover:bg-opacity-70 rounded-lg shadow-xl font-medium text-white px-4 py-2"
              id="create_coupon"
              @click="createCoupon()"
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
      SingleUse: "false",
      Password: "",
      coupon: {
        percentage: 0,
        code: "",
        days: 0,
        pwd: "",
        SingleUse: false
      },
      coupons: [],
      env: "snakeomatic",
      post: {
        method: "POST",
        headers: {
          Connection: "keep-alive",
          Accept: "*/*"
        }
      },
      delete: {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      },
      success: false
    };
  },
  methods: {
    async fetchCoupons() {
      const response = await fetch(
        `https://exchange.${this.env}.com/coupons/list?password=${this.Password}&includeSingleUse=${this.SingleUse}`,
        this.post
      );
      this.coupons = await response.json();
      return this.coupons;
    },

    async revoke(code) {
      console.log("delete " + code);
      const response = await fetch(
        `https://exchange.${this.env}.com/coupons/revoke?code=${code}&password=${this.Password}`,
        this.post
      );
      const res = await response.json();

      return res;
    },
    createCoupon() {
      console.log("coupon " + this.coupon);
      fetch(
        `https://exchange.${this.env}.com/coupons/create?code=${this.coupon.code}&percentage=${this.coupon.percentage}&days=${this.coupon.days}&password=${this.coupon.pwd}&singleUse=${this.coupon.SingleUse}`,
        this.post
      )
        .then(response => {
          if (response.ok) {
            this.success = true;
          } else {
            this.success = true;
            this.message = "Erro " + response.code;
          }
        })
        .then(data => {
          console.log(data);
        });
    }
  }
};
</script>
