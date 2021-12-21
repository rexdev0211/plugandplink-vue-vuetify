<template>
  <div id="card-container">
    <label>Card Number</label>
    <div id="card-number"></div>
    <label>Card Expiry</label>
    <div id="card-expiry"></div>
    <label>Card CVC</label>
    <div id="card-cvc"></div>
    <div id="card-error"></div>
    <button id="custom-button" @click="createToken">Generate Token</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: null,
      cardNumber: null,
      cardExpiry: null,
      cardCvc: null
    };
  },
  computed: {
    stripeElements() {
      return this.$stripe.elements();
    }
  },
  mounted() {
    // Style Object documentation here: https://stripe.com/docs/js/appendix/style
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
    this.cardNumber = this.stripeElements.create("cardNumber", { style });
    this.cardNumber.mount("#card-number");
    this.cardExpiry = this.stripeElements.create("cardExpiry", { style });
    this.cardExpiry.mount("#card-expiry");
    this.cardCvc = this.stripeElements.create("cardCvc", { style });
    this.cardCvc.mount("#card-cvc");
  },
  beforeDestroy() {
    this.cardNumber.destroy();
    this.cardExpiry.destroy();
    this.cardCvc.destroy();
  },
  methods: {
    async createToken() {
      const { token, error } = await this.$stripe.createToken(this.cardNumber);
      if (error) {
        // handle error here
        document.getElementById("card-error").innerHTML = error.message;
        return;
      }
      console.log(token);
      // handle the token
      // send it to your server
    }
  }
};
</script>

<style scoped>
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
