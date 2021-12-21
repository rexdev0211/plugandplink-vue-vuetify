<template>
  <div>
    <p class="titlet">
      Please enter other contact information which will allow the shipping
      company to contact you.
    </p>
    <v-form ref="form">
      <v-card-text>
        <v-text-field
          type="email"
          :rules="[
            v => !!v || 'Email is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
          ]"
          label="Email"
          outlined
          validate-on-blur
          v-model="order.email"
        ></v-text-field>

        <v-text-field
          :rules="[
            v => !!v || 'Phone number is required',
            v => v.length >= 7 || 'Phone number must be valid',
            v => v.length <= 14 || 'Phone number must be valid',
            () => this.texter() || 'Phone number must be valid'
          ]"
          label="Phone"
          outlined
          @keypress="isNumber($event)"
          validate-on-blur
          v-model="order.phone"
        ></v-text-field>
      </v-card-text>
    </v-form>
    <div @click="validate" class="valid"></div>
  </div>
</template>

<script>
// import VuePhoneNumberInput from "vue-phone-number-input";
// import "vue-phone-number-input/dist/vue-phone-number-input.css";
export default {
  // components: { VuePhoneNumberInput },
  props: ["order", "back", "next"],
  data() {
    return {
      fortmatPhone: /[!@#$%^&*()_\=\[\]{};':"\\|,.<>\/?qwertyuiopasdfghjkl;zxcvbnm,.]+/,
      phone: "+",
      email: ""
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    isNumber: function(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode !== 43 &&
        charCode !== 45 &&
        charCode > 31 &&
        (charCode < 48 || charCode > 57)
      ) {
        evt.preventDefault();
      } else {
        return true;
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
  }
};
</script>

<style lang="scss" scoped>
.card {
  overflow-y: hidden;
}
#phone {
}
</style>
