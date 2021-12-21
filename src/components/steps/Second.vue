<template>
  <div>
    <p class="titlet">If you have a coupon please enter it here:</p>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-if="!isValid"
          label="Coupon Code"
          outlined
          v-model="order.couponCode"
          :error-messages="err"
          :success="isValid"
        ></v-text-field>

        <v-btn class="apply" @click="validate" color="secondary"
          >Apply coupon</v-btn
        >
        <p v-if="isValid" class="validCoupon">
          Coupon accepted. A discount of {{ order.discount }}% will be applied.
        </p>
      </v-form>
    </v-card-text>
  </div>
</template>

<script>
// plugandplink-orgoffer
// success-messages="Your discount is 20%"
//  :rules="rule"
import axios from "axios";
export default {
  props: ["order", "back", "next", "urlVar"],
  data() {
    return {
      isInvalid: false,
      isValid: false
    };
  },
  computed: {
    err: function() {
      if (this.isInvalid) {
        return ["Please enter a valid coupon code"];
      } else return null;
    }
  },
  methods: {
    // handle: function() {
    //   if (this.order.couponCode.length === 6) {
    //     evt.preventDefault();
    //   }
    // },
    checkCoupon: function(res) {
      if (!res) return "Coupon is invalid";
      else return true;
    },
    validateForm() {
      this.$refs.form.validate();
    },
    validate: async function() {
      var res;
      try {
        res = await axios.post(
          `https://${this.urlVar}/orders/check-coupon?coupon=${this.order.couponCode}`
        );

        if (!res.data.useable) {
          this.isInvalid = true;
          this.isValid = false;
        } else {
          this.isInvalid = false;
          this.isValid = true;
        }
        this.order.couponIsValid = res.data.useable;
        this.order.discount = res.data.discountPercentage;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.apply {
  width: 100%;
  margin-bottom: 15px;
}
.validCoupon {
  color: rgb(76, 175, 80);
  text-align: center;
}
</style>
