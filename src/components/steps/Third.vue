<template>
  <div>
    <p class="titlet">
      Please tell us where you would like your snakes delivered to. If your
      destination country is not listed then sorry, we cannot proceed.
      <br />
      <span class="underline"
        ><router-link to="/content/page=country-info" target="_blank"
          >Click for more details</router-link
        >
      </span>
    </p>
    <v-card-text>
      <v-form ref="form">
        <v-select
          solo
          outlined
          v-model="order.country"
          :items="countries"
          :rules="[v => !!v || 'Please select a country']"
          label="Country"
        ></v-select>
      </v-form>
    </v-card-text>
    <div @click="validate" class="valid"></div>
  </div>
</template>

<script>
export default {
  props: ["order", "back", "next", "countries"],
  data() {
    return {};
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    }
  }
};
</script>

<style lang="scss">
.v-menu__content {
  background: #000;
}
// ::-webkit-scrollbar {
//   -webkit-appearance: none;
// 	width: 8px;
// }
// ::-webkit-scrollbar-button {
//    background-color: #999;
// }
// ::-webkit-scrollbar-track {
//   background-color: #999;
// }
// ::-webkit-scrollbar-thumb {
//   border-radius: 2px;
// 	background-color: rgba(0,0,0,0.5);
//   -webkit-box-shadow: 0 0 1px rgba(255,255,255,0.5);
//   height: 100px;
// }

@media screen and (max-width: 500px) {
  .v-menu__content {
    /* margin-left: 0px; */
    min-width: 100vw !important;
    max-height: calc(100vh - 246px) !important;
  }
}
</style>
