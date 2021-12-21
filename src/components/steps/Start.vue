<template>
  <div>
    <br />
    <!-- <v-card-title class="green-title">
      Note: We're expecting the first shipment of snakes in October 2020, but
      you are welcome to pre-order.
    </v-card-title> -->
    <v-card-text>
      You can only purchase PlugAndPlink snakes from us directly using this
      payment gateway. We do not currently use resellers.
    </v-card-text>
    <v-card-text>
      We ask you to enter quantity and shipping details then we summarise your
      order before proceeding to the payment page. We accept credit/debit cards
      only.
    </v-card-text>
    <v-card-text>
      We do not store your payment card information. We retain only the
      information required to process your order. All information is transmitted
      securely.
    </v-card-text>
    <div class="shop-price__block" v-if="pricing.currency">
      <p>
        Price per snake (sales tax included) {{ pricing.currency }}
        {{ pricing.unitPriceWithSalesTax / 100 }}
      </p>
      <p>
        Postage + packing {{ pricing.currency }}
        {{ pricing.postageCharge / 100 }}
      </p>
    </div>
    <div class="shop-price__block" v-if="!pricing.currency">
      <p>
        Price per snake (sales tax included)
      </p>
      <p>
        Postage + packing
      </p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueGeolocation from "vue-browser-geolocation";
Vue.use(VueGeolocation);
export default {
  props: ["urlVar", "pricing"],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.v-card__text {
  font-size: 18px;
}
.shop-price__block {
  padding: 16px;
  p {
    color: #7ba56e;
    font-size: 18px;
  }
}

@media screen and (max-width: 500px) {
  .v-card__text {
    font-size: 16px;
  }
}
.green-title {
  color: #4eaf33;
}
</style>
