<template>
  <div>
    <v-card-text class="wrapp">
      <div class="loadingWrapper">
        <v-progress-circular
          v-if="loading"
          :size="300"
          :width="40"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
      <div class="message" v-if="result">
        <p class="resultMsg" v-if="result && !error">
          Thank you for your order. An email message confirming your order has
          been sent to {{ order.email }}. We will let you know when your snakes
          have been dispatched.
        </p>
        <p class="resultMsg" v-if="error">
          Sorry, something went wrong.
        </p>
      </div>
      <div>
        <v-card-text>
          <p class="price" v-if="!loading || !result">
            {{ `${this.price.grandTotal / 100} ${this.price.currency}` }}
          </p>
        </v-card-text>

        <div id="card-container" v-if="!noCardForm" ref="card">
          <v-text-field
            label="Card Number"
            :rules="[
              v => !!v || 'Card Number is required',
              v => v.length >= 19 || 'Card Number is requires 16 digits'
            ]"
            outlined
            maxlength="19"
            @keypress="isNumber($event)"
            @input="validateCardNumber($event)"
            validate-on-blur
            v-model="card.cardNumStr"
          ></v-text-field>
          <div class="flex flex-row gap-4 mt-4">
            <div class="flex-1">
              <v-text-field
                label="Card Expiry MM/YY"
                :rules="[
                  v => !!v || 'Card Expiry is required',
                  v => v.length == 7 || 'Card Expiry is requires MM/YY'
                ]"
                outlined
                maxlength="7"
                @keypress="isNumber($event)"
                @input="validateCardExpiry($event)"
                validate-on-blur
                v-model="card.cardExpStr"
              ></v-text-field>
            </div>
            <div class="flex-1">
              <v-text-field
                label="Card CVC"
                :rules="[
                  v => !!v || 'Card CVC is required',
                  v => v.length >= 3 || 'Card CVC is invalid'
                ]"
                outlined
                maxlength="3"
                validate-on-blur
                @keypress="isNumber($event)"
                v-model="card.cardCvcStr"
              ></v-text-field>
            </div>
          </div>
          <div id="card-error" class="errMsg">{{ cardErrorMsg }}</div>
        </div>
        <br />
        <v-checkbox
          v-if="!result && !loading"
          id="policyCheck"
          v-model="adressStatus"
          label="Billing address is the same as shipping"
          required
        ></v-checkbox>
        <v-form v-if="!adressStatus && !result && !loading" ref="form">
          <v-card-text v-if="!adressStatus && !result && !loading">
            <div class="userTitle">
              <v-text-field
                label="Title"
                :rules="[
                  v => !!v || 'Title is required',
                  v => v.length <= 5 || 'Max 5 characters'
                ]"
                outlined
                v-model="billing.title"
              ></v-text-field>
            </div>
            <div class="nameCheckout">
              <v-text-field
                label="First name"
                :rules="[
                  v => !!v || 'Name is required',
                  v => v.length <= 30 || 'Max 30 characters'
                ]"
                outlined
                v-model="billing.firstName"
              ></v-text-field>
              <v-text-field
                class="secondName"
                :rules="[v => v.length <= 30 || 'Max 30 characters']"
                label="Last name"
                outlined
                v-model="billing.secondName"
              ></v-text-field>
            </div>

            <div class="country">
              <v-text-field
                class="countryField"
                label="Country"
                outlined
                v-model="billing.country"
                :rules="[
                  v => !!v || 'Country is required',
                  v => v.length <= 15 || 'Max 15 characters'
                ]"
              ></v-text-field>
              <v-text-field
                class="postCode"
                label="Post code"
                outlined
                v-model="billing.postCode"
                :rules="[
                  v => !!v || 'Required',
                  v => v.length <= 15 || 'Max 15 characters'
                ]"
                id="postCode"
              ></v-text-field>
            </div>

            <v-text-field
              :rules="[v => v.length <= 45 || 'Max 45 characters']"
              label="Province / State"
              outlined
              v-model="billing.state"
            ></v-text-field>
            <v-text-field
              :rules="[
                v => !!v || 'City is required',
                v => v.length <= 45 || 'Max 45 characters'
              ]"
              label="City"
              outlined
              v-model="billing.city"
            ></v-text-field>
            <v-text-field
              :rules="[
                v => !!v || 'Address is required',
                v => v.length <= 45 || 'Max 45 characters'
              ]"
              label="Address line 1"
              outlined
              v-model="billing.address1"
            ></v-text-field>
            <v-text-field
              :rules="[v => v.length <= 45 || 'Max 45 characters']"
              label="Address line 2"
              outlined
              v-model="billing.address2"
            ></v-text-field>
          </v-card-text>
        </v-form>
        <div
          v-if="!adressStatus && !result && !loading"
          @click="validateForm"
          class="valid"
        ></div>
        <v-btn
          v-if="!result && !loading"
          large
          :disabled="!isPayNowActive"
          class="submitPayment"
          @click="payNow"
          outlined
          color="primary"
          >Pay now</v-btn
        >
      </div>
      <div class="btn-div">
        <router-link to="/" class="link">
          <v-btn v-if="result && !error" large outlined color="primary"
            >Back</v-btn
          >
        </router-link>
      </div>
    </v-card-text>
  </div>
</template>
<script src="https://js.stripe.com/v3/"></script>

<script>
/* eslint-disable no-unused-vars */

//  let hostname = window.location.hostname
//     if(hostname !="plugandplink.com") {
// let stripe = Stripe(
//     "pk_test_51GwqHLBFCoJ8vqH8CqGQTokpO0owv9in81AkKc5197KAEjmfX4PqArBcB735hEgx1aEWAKsGu8XDDhcE7ZwFz5DU00z0M9qUPH"
//   ),

//   elements = stripe.elements(),
//   card = undefined;
//     } else {
//       let stripe = Stripe(
//     "pk_live_51GwqHLBFCoJ8vqH8FUMwGcDuMFW9NqBjjcCYaCkVqnhMPHMXTBFDxIc5iCMpPJ0sEMSDpAo2YI7PKNWl7sxK08TV00Q39Jx2ag"
//   ),

//   elements = stripe.elements(),
//   card = undefined;
//     }
let stripe;
let hostname = window.location.hostname;
if (hostname != "plugandplink.com") {
  stripe = Stripe(
    "pk_test_51GwqHLBFCoJ8vqH8CqGQTokpO0owv9in81AkKc5197KAEjmfX4PqArBcB735hEgx1aEWAKsGu8XDDhcE7ZwFz5DU00z0M9qUPH"
  );
} else {
  stripe = Stripe(
    "pk_live_51GwqHLBFCoJ8vqH8FUMwGcDuMFW9NqBjjcCYaCkVqnhMPHMXTBFDxIc5iCMpPJ0sEMSDpAo2YI7PKNWl7sxK08TV00Q39Jx2ag"
  );
}

let elements = stripe.elements();
// let cardNumber = null;
// let cardExpiry = null;
// let cardCvc = null;
const style = {
  base: {
    //   height: "42px",
    iconColor: "#c4f0ff",
    color: "#fff",
    fontWeight: 500,

    fontSize: "20px",
    fontSmoothing: "antialiased",

    ":-webkit-autofill": {
      color: "#fce883"
    },
    "::placeholder": {
      color: "#FFFFFF"
    }
  },
  invalid: {
    iconColor: "#FF5252",
    color: "#FF5252"
  }
};

import VueCardFormat from "vue-credit-card-validation";
import axios from "axios";
export default {
  props: ["price", "secretKey", "order", "tab", "setResult"],
  data() {
    return {
      card: {
        cardNumStr: "",
        cardExpStr: "",
        cardCvcStr: ""
      },
      noCardForm: false,
      stripeValidationError: "",
      cardInputComplete: false,
      loading: false,
      result: false,
      error: false,
      cardErrorMsg: "",
      amount: 0,
      currency: "EUR",
      adressStatus: true,
      billing: {
        title: "",
        country: "",
        firstName: "",
        secondName: "",
        postCode: "",
        province: "",
        city: "",
        address1: "",
        address2: ""
      }
    };
  },
  computed: {
    stripeElements() {
      return this.$stripe.elements();
    },
    isPayNowActive() {
      if (
        (this.cardInputComplete && this.adressStatus == true) ||
        (this.cardInputComplete &&
          this.billing.title &&
          this.billing.firstName &&
          this.billing.postCode &&
          this.billing.city &&
          this.billing.address1 &&
          this.billing.firstName.length <= 30 &&
          this.billing.secondName.length <= 30 &&
          this.billing.postCode.length <= 15)
      ) {
        return true;
      }
    },
    billingOb: function() {
      if (!this.adressStatus) {
        return this.order;
      } else return this.billing;
    }
  },
  methods: {
    async createToken() {
      const { token, error } = await this.$stripe.createToken(
        this.card.cardNumber
      );
      if (error) {
        // handle error here
        document.getElementById("card-error").innerHTML = error.message;
        return;
      }
      console.log(token);
      // handle the token
      // send it to your server
    },
    isNumber: function(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    validateCardNumber: function(val) {
      this.card.cardNumStr = val
        .replace(/[^\dA-Z]/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
    },
    validateCardExpiry: function(val) {
      this.card.cardExpStr = val
        .replace(/[^\dA-Z]/g, "")
        .replace(/(.{2})/g, "$1 / ")
        .trim()
        .slice(0, 7);
    },
    validateForm() {
      if (!this.cardInputComplete) {
        this.cardErrorMsg = "Your Card Number is incomplete.";
      }
      if (!this.adressStatus) {
        this.$refs.form.validate();
      }
    },
    payNow() {
      this.loading = true;
      let self = this;
      this.setResult(true);
      this.$stripe
        .confirmCardPayment(this.secretKey, {
          payment_method: {
            type: "card",
            card: {
              number: this.card.cardNumStr.replaceAll(" ", ""),
              exp_month: this.card.cardExpStr.split(" / ")[0],
              exp_year: this.card.cardExpStr.split(" / ")[1],
              cvc: this.card.cardCvcStr
            },
            billing_details: {
              name: `${this.billingOb.firstName} ${this.billingOb.secondName}`,
              email: this.order.email
            }
          }
        })
        .then(function(result) {
          if (result.error) {
            self.loading = false;
            self.result = true;
            self.error = true;
            self.setResult(false);
            // self.cardErrorMsg = result.error.message;
            // console.log(result.error.message);
          } else {
            if (result.paymentIntent.status === "succeeded") {
              self.loading = false;
              self.result = true;
              self.noCardForm = true;
            }
          }
        });
    }
  },

  beforeDestroy() {
    // cardNumber.destroy();
    // cardExpiry.destroy();
    // cardCvc.destroy();
    // cardNumber = null;
    // cardExpiry = null;
    // cardCvc = null;
  }
};
</script>

<style lang="scss" scoped>
.nameCheckout {
  display: flex;
  flex-direction: row;
}
.firstName {
  width: 50% !important;
}
.resultMsg {
  word-wrap: break-word !important;
}
.message {
  padding: 20px;
  padding-bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.v-card__title {
  word-break: break-all !important;
}
.card {
  padding: 13px;
  margin-top: 10px;
  border: 1px solid #545454;
  border-radius: 5px;
}
.price {
  padding: 20px;
  font-size: 26px;
  width: 100%;
  text-align: center;
}
.submitPayment {
  width: 100%;
}
.errMsg {
  padding-left: 15px;
  font-size: 16px;
  color: #ff5252;
}
.valid {
  width: calc(100% - 31px);
}
.loadingWrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 500px) {
  .resultMsg {
    font-size: 16px !important;
  }
}
.wrapp {
  padding: 20px;
}
.btn-div {
  padding-top: 20px;
}
.link {
  text-decoration: none;
}
#custom-button {
  height: 30px;
  outline: 1px solid grey;
  background-color: green;
  padding: 5px;
  color: white;
}

#card-number,
#card-expiry,
#card-cvc {
  padding: 13px;
  margin-top: 10px;
  border: 1px solid #545454;
  border-radius: 5px;
  width: 100%;
  height: 40px;
  margin-bottom: 12px;
}

#card-container {
  width: 80%;
  margin: auto;
}

#card-error {
  color: red;
}
</style>
