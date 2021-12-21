<template>
  <v-container class="container-shop">
    <div class="page-title shop-title">
      Shop
    </div>
    <v-card class="mx-auto buyCard" max-width="860">
      <v-tabs class="tabs" v-if="tab < 7" v-model="tab" :show-arrows="false">
        <v-tab>Start</v-tab>
        <v-tab>Quantity</v-tab>
        <v-tab :disabled="disabled2">Country</v-tab>
        <v-tab :disabled="disabled4">Coupon</v-tab>
        <v-tab :disabled="disabledAdress">Address</v-tab>
        <v-tab :disabled="disabled5">Contacts</v-tab>
        <v-tab :disabled="disabled6">Summary</v-tab>
        <v-tab :disabled="disabled7">Transaction</v-tab>
      </v-tabs>
      <!-- {{ order }} -->

      <v-tabs-items>
        <Start :pricing="pricing" :urlVar="urlVar" v-if="tab == 0"></Start>
        <First
          :back="back"
          :next="next"
          ref="first"
          :order="order"
          v-if="tab === 1"
        />

        <Second
          :urlVar="urlVar"
          :isValid="stepsValid.s1"
          :back="back"
          :next="next"
          :order="order"
          v-if="tab === 3"
        />
        <Third
          :back="back"
          :next="next"
          :order="order"
          :countries="countries"
          v-if="tab === 2"
        />
        <Fourth
          :countries="countries"
          :back="back"
          :next="next"
          :order="order"
          v-if="tab === 4"
        />
        <Fifth :back="back" :next="next" :order="order" v-if="tab === 5" />
        <Sixth
          :getPrice="getPrice"
          :back="back"
          :next="next"
          :order="order"
          v-if="tab === 6"
        />
        <Seventh
          :getPrice="getPrice"
          :price="price"
          :currencies="currencies"
          :back="back"
          :next="next"
          :order="order"
          v-if="tab === 7"
        />
        <Checkout
          :urlVar="urlVar"
          :tab="tab"
          :price="price"
          :order="order"
          :secretKey="secretKey"
          :setResult="setResult"
          v-if="tab === 8"
        />
      </v-tabs-items>
      <div class="actions">
        <div class="actions-prev">
          <v-btn
            outlined
            v-if="tab != 0 && !resultForNoBack"
            color="primary"
            large
            @click="
              back();
              scrollTop();
            "
            class="next-button"
          >
            <img src="../assets/green_button.png" alt="prev" /> Back</v-btn
          >
        </div>
        <v-btn
          v-if="tab !== 8"
          outlined
          color="primary"
          :disabled="isNext"
          @click="
            next();
            scrollTop();
          "
          large
          class="next-button"
        >
          Next <img src="../assets/gray_button.svg" alt="next"
        /></v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import Checkout from "./steps/Checkout.vue";
import axios from "axios";
import First from "./steps/First.vue";
import Start from "./steps/Start.vue";
import Second from "./steps/Second.vue";
import Third from "./steps/Third.vue";
import Fourth from "./steps/Fourth.vue";
import Fifth from "./steps/Fifth.vue";
import Sixth from "./steps/Sixth.vue";
import Seventh from "./steps/Seventh.vue";
export default {
  name: "PaymentPage",
  components: {
    First,
    Second,
    Third,
    Fourth,
    Fifth,
    Sixth,
    Seventh,
    Checkout,
    Start
  },

  data: () => ({
    pricing: {},
    resultForNoBack: false,
    countries: "",
    urlVar: "exchange.snakeomatic.com",
    amount: 1,
    tab: 0,
    price: {
      currency: "GPB"
    },
    secretKey: "",
    order: {
      title: "",
      amount: "",
      policyCheck: false,
      couponCode: "",
      couponIsValid: false,
      discount: 0,
      country: "",
      firstName: "",
      secondName: "",
      postCode: "",
      state: "",
      city: "",
      address1: "",
      address2: "",
      email: "",
      phone: "",
      currency: "GBP"
    },
    currencies: [],
    // order: {
    //   title: "Mr",
    //   amount: "",
    //   policyCheck: false,
    //   couponCode: "plugandplink-orgoffer",
    //   couponIsValid: false,
    //   discount: 0,
    //   country: "",
    //   firstName: "Dmitry",
    //   secondName: "Loza",
    //   postCode: "6900",
    //   state: "",
    //   city: "zsd",
    //   address1: "sada21",
    //   address2: "sada21",
    //   email: "ankarn41k@gmail.com",
    //   phone: "+380997453583",
    //   currency: "GBP"
    // },
    stepsValid: {
      s1: false,
      s2: false,
      s3: false,
      s4: false,
      s5: false,
      s6: false,
      s7: false
    }
  }),
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     if (from.name == "Country Details") {
  //       vm.tab = 1;
  //     }
  //   });
  // },
  methods: {
    setResult(v) {
      this.resultForNoBack = v;
    },
    // https://exchange.snakeomatic.com/orders/create-payment-intent?amount=10400&currency=GBP&quantity=3&recipientaddresslineone=Big%20Street&recipientaddresslinetwo=Green%20District&recipientcity=London&recipientcountry=Germany(DE)&recipientemailaddress=fred%40example.com&recipienthousenameornumber=27A&recipientname=Fred%20Bloggs&recipientphonenumber=%2B447700900343&recipientpostcode=213213123&recipienttitle=Mrs
    checkout() {
      this.tab++;
      axios
        .post(
          `https://${this.urlVar}/orders/create-payment-intent?amount=${this.price.grandTotal}&coupon=${this.order.couponCode}&currency=${this.price.currency}&quantity=${this.order.amount}&recipientaddresslineone=${this.order.address1}&recipientcity=${this.order.city}&recipientcountry=${this.order.country}&recipientemailaddress=${this.order.email}&recipienthousenameornumber=27A&recipientname=${this.order.firstName} ${this.order.secondName}&recipientphonenumber=${this.order.phone}&recipientpostcode=${this.order.postCode}&recipienttitle=${this.order.title}`
        )
        .then(res => {
          this.secretKey = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },

    next() {
      if (this.tab == 8) {
        return;
      } else if (this.tab < 7) {
        this.tab++;
      } else if (this.tab == 7) {
        this.checkout();
      }
      // if (document.documentElement.clientWidth < 768) {
      //      window.scrollTo(0,140);
      // }
    },
    scrollTop() {
      if (document.documentElement.clientWidth < 568) {
        window.scrollTo(0, 140);
      }
    },
    back() {
      if (this.tab == 0) {
        this.tab = this.tab - 2;
        this.price = {
          currency: "GPB"
        };
      } else this.tab--;
    },
    hostCheck() {
      let hostname = window.location.hostname;
      if (hostname != "localhost") {
        this.urlVar = `exchange.${hostname}`;
      }
      console.log(window.location.hostname);
    },
    getPricing() {
      axios
        .get(`https://${this.urlVar}/orders/unit-price`)
        .then(res => {
          this.pricing = res.data;
        })
        .catch(err => {
          if (err.response.status == 400) {
            let defaultPricing = {
              unitPriceWithSalesTax: 2083,
              postageCharge: 3000,
              currency: "EUR"
            };
            this.pricing = defaultPricing;
          }
        });
    },
    getCountries: async function() {
      try {
        const countries = await axios.get(
          `https://${this.urlVar}/orders/list-destinations`
        );

        this.countries = countries.data;
      } catch (err) {
        console.log(err);
      }
    },
    getCur: async function() {
      try {
        const currencies = await axios.get(
          `https://${this.urlVar}/orders/list-currencies`
        );
        this.currencies = currencies.data;
      } catch (err) {
        console.log(err);
      }
    },
    getPrice: async function(curr) {
      var currency = "";
      if (curr) {
        currency = `&currency=${curr}`;
      }

      try {
        const price = await axios.post(
          `https://${this.urlVar}/orders/price?country=${this.order.country}&coupon=${this.order.couponCode}${currency}&quantity=${this.order.amount}`
        );
        this.price = price.data;
        this.order.currency = price.data.currency;
      } catch (err) {
        console.log(err);
      }
    },
    /*eslint no-useless-escape: 0*/
    texter: function() {
      var format = /[!@#$%^&*()_\=\[\]{};':"\\|,.<>\/?qwertyuiopasdfghjkl;zxcvbnm,.]+/;
      if (format.test(this.order.phone)) {
        return false;
      } else {
        return true;
      }
    }
  },
  created: function() {
    this.hostCheck();
    this.getPricing();
    this.getCountries();
    this.getCur();
  },
  computed: {
    isNext() {
      if (this.tab === 1) {
        return this.disabled2;
      } else if (this.tab === 2) {
        return this.disabled4;
      } else if (this.tab === 3) {
        return this.disabledAdress;
      } else if (this.tab === 4) {
        return this.disabled5;
      } else if (this.tab === 5) {
        return this.disabled6;
      } else return false;
    },
    disabled2() {
      if (this.order.policyCheck !== true) {
        return true;
      } else return false;
    },
    disabledAdress() {
      if (
        !this.disabled4 &&
        (!this.order.couponCode || this.order.discount != 0)
      ) {
        return false;
      } else return true;
    },
    disabled4() {
      if (!this.order.country) {
        return true;
      } else return false;
    },
    disabled5() {
      if (
        this.order.title &&
        this.order.firstName &&
        this.order.postCode &&
        this.order.city &&
        this.order.address1 &&
        this.order.firstName.length <= 30 &&
        this.order.secondName.length <= 30 &&
        this.order.postCode.length <= 15
      ) {
        return false;
      } else return true;
    },
    disabled6() {
      if (
        /.+@.+\..+/.test(this.order.email) &&
        this.order.phone.length >= 7 &&
        this.order.firstName.length <= 15 &&
        this.texter()
      )
        return false;
      else return true;
    },
    disabled7() {
      if (this.price.grandTotal && this.price.quantity == this.order.amount) {
        return false;
      } else return true;
    }
  }
};
</script>
<style lang="scss">
.page-title {
  display: block;
  font-size: 34px;
  text-align: center;
  margin-top: 70px;
}
.v-input__slider {
  width: 90%;
  margin: 0 auto;
}
.v-messages__message {
  margin-top: 5px;
}
.v-input__slot {
  width: 100%;
  margin: 0 auto;
}
.container-shop {
  min-height: calc(100vh - 280px);
  font-family: "McLaren", "sans-serif" !important;
}
.v-select__selection.v-select__selection--comma {
  height: 30px !important;
  display: flex;
  align-items: center;
}
.v-list-item__title {
  height: 26px !important;
  display: flex;
  align-items: center;
}
.v-card {
  overflow-x: hidden;
  overflow-y: hidden;
}
.amount {
  margin: 0 20px;
}
.card-title {
  text-align: center !important;
}
.titlet {
  padding: 16px;
}
.v-card__title {
  word-break: break-all !important;
}
.v-text-field.v-text-field--solo .v-input__control input {
  caret-color: transparent !important;
}
.v-text-field.v-text-field--solo .v-input__control input:focus {
  text-indent: -9999em;
}
.v-text-field.v-text-field--solo .v-input__control input:focus {
  outline: none;
}
.v-menu__content {
  z-index: 99999999999 !important;
}
.primaryColor {
  color: #4db6ac;
  max-width: 700px;
}
.underline {
  cursor: pointer;
  text-decoration: underline;
}
p {
  margin: 0 !important;
  font-size: 20px;

  color: white;
}

.actions {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  padding-top: 0px;
  margin-top: -15px;
}
.v-card__text {
  padding-top: 0;
}
.tabs {
  padding-left: 15px;
}
input,
textarea {
  background-color: rgb(0, 0, 0) !important;
}
.buyCard {
  margin-top: -16px;
  z-index: 9;
}
.v-application .actions .primary--text {
  color: #fff !important;
  border: none;
}
.v-btn:not(.v-btn--round).v-size--large {
  height: 70px;
  padding: 0px 90px;
  border: none;
}
.theme--dark.v-btn:hover::before {
  display: none;
}

.actions button {
  background: url("../assets/prev.svg") no-repeat;
  background-size: 100% 100%;
  outline: none;
}
.actions button:hover {
  opacity: 0.7;
}

.actions button img {
  margin: 0px 10px;
}
.v-select__slot {
  height: 38px !important;
}
.titlet {
  padding: 16px;
  font-size: 16px;
  /* margin: 25px auto 50px !important; */
  /* max-width: 54%; */
}
.v-btn:not(.v-btn--round).v-size--large {
  margin-top: 20px;
}
.actions .actions-prev button {
  background: url("../assets/prev.svg") no-repeat;
  background-size: 100% 100%;
  outline: none;
}
.v-text-field--outlined .v-label {
  top: 10px;
}
.v-text-field--filled > .v-input__control > .v-input__slot,
.v-text-field--full-width > .v-input__control > .v-input__slot,
.v-text-field--outlined > .v-input__control > .v-input__slot {
  min-height: 36px;
}
.theme--dark.v-card {
  margin-top: 40px;
}
.page-title br {
  display: none;
}
.v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: 20px;
}
input:-internal-autofill-selected {
  background-color: transparent !important;
}

.shop-title {
  margin-top: 0px;
}

@media screen and (max-width: 1440px) {
  .shop-title {
    font-size: 28px;
  }
  .theme--dark.v-card {
    margin-top: 20px;
  }
  .v-btn:not(.v-btn--round).v-size--large {
    height: 50px;
  }
}

@media screen and (max-width: 1100px) {
  .page-title {
    margin-top: 100px;
  }
}
@media screen and (max-width: 680px) {
  .actions button {
    height: 40px !important;
    padding: 0px 40px !important;
  }
  .actions button img {
    margin: 0px 5px;
  }
  .page-title br {
    display: block;
  }
  .page-title {
    font-size: 32px;
    max-width: 400px;
    margin: 80px auto 26px;
    line-height: 36px;
  }
  .container-shop {
    min-height: calc(100vh - 260px);
  }
}
@media screen and (max-width: 500px) {
  .buyCard {
    margin-top: -20px;
  }
  .actions .v-btn__content {
    padding: 0px;
    font-size: 10px;
  }
  .v-card {
    padding: 2px;
  }
  p {
    font-size: 16px;
  }
  .v-card__text {
    padding: 10px;
  }
  .titlet {
    font-size: 16px;
    padding: 10px;
  }
  .container {
    padding: 0 !important;
  }
  .v-btn:not(.v-btn--round).v-size--large {
    margin: 20px 0px;
  }
}
@media screen and (max-width: 1200px) {
  .tabs {
    margin-left: -25px;
  }
  .v-slide-group__wrapper {
    width: 500px !important;
  }
}
.v-input__slot {
  background-color: rgba(0, 0, 0, 0) !important;
}
::selection {
  background-color: rgba(0, 0, 0, 0) !important;
}
</style>
