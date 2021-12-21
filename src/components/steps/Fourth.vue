<template>
  <div>
    <p class="titlet">
      Please enter the delivery address for your order.
    </p>

    <v-card-text>
      <v-form v-model="valid" ref="form">
        <div class="name-container">
          <div class="userTitle">
            <v-text-field
              label="Title"
              spellcheck="false"
              :rules="[
                v => !!v || 'Title is required',
                v => v.length <= 5 || 'Max 5 characters'
              ]"
              outlined
              v-model="order.title"
            ></v-text-field>
          </div>
          <div class="name">
            <v-text-field
              class="firstName"
              label="First name"
              spellcheck="false"
              :rules="[
                v => !!v || 'Name is required',
                v => v.length <= 30 || 'Max 30 characters'
              ]"
              outlined
              v-model="order.firstName"
            ></v-text-field>
            <v-text-field
              spellcheck="false"
              class="secondName"
              :rules="[v => v.length <= 30 || 'Max 30 characters']"
              label="Last name"
              outlined
              v-model="order.secondName"
            ></v-text-field>
          </div>
        </div>
        <v-select
          class="countryInput"
          spellcheck="false"
          v-model="order.country"
          :rules="[v => !!v || 'Country  is required']"
          solo
          outlined
          :items="countries"
          label="Country"
        ></v-select>

        <div class="adress-container">
          <v-text-field
            spellcheck="false"
            :rules="[
              v => !!v || 'City is required',
              v => v.length <= 45 || 'Max 45 characters'
            ]"
            label="City"
            outlined
            v-model="order.city"
          ></v-text-field>

          <v-text-field
            class="province"
            spellcheck="false"
            :rules="[v => v.length <= 45 || 'Max 45 characters']"
            label="Province / State"
            outlined
            v-model="order.state"
          ></v-text-field>
          <v-text-field
            class="postCode"
            spellcheck="false"
            label="Post code"
            outlined
            v-model="order.postCode"
            :rules="[
              v => !!v || 'Required',
              v => v.length <= 15 || 'Max 15 characters'
            ]"
            id="postCode"
          ></v-text-field>
        </div>
        <v-text-field
          spellcheck="false"
          :rules="[
            v => !!v || 'Address is required',
            v => v.length <= 45 || 'Max 45 characters'
          ]"
          label="Address line 1"
          outlined
          v-model="order.address1"
        ></v-text-field>
        <v-text-field
          spellcheck="false"
          :rules="[v => v.length <= 45 || 'Max 45 characters']"
          label="Address line 2"
          outlined
          v-model="order.address2"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <div @click="validate" class="valid"></div>
  </div>
</template>

<script>
export default {
  props: ["order", "back", "next", "countries"],
  data() {
    return {
      firstName: "",
      secondName: "",
      country: "",
      postCode: "",
      state: "",
      city: "",
      address1: "",
      address2: "",
      phone: "",
      email: "",
      valid: true
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    }
  }
};
</script>

<style lang="scss">
.name-container {
  display: flex;
  flex-direction: row;
}
.userTitle {
}
.name {
  margin-left: 15px;
  flex: 0 1 80% !important;
  display: flex;
  flex-direction: row;
}
.firstName {
  flex: 0 1 50% !important;
}
.secondName {
  margin-left: 15px !important;
  flex: 0 1 50% !important;
}

.adress-container {
  display: flex;
  flex-direction: row;
}
.postCode {
  margin-left: 15px !important;
}
.province {
  margin-left: 15px !important;
}

.country {
  display: flex;
  flex-direction: row;
  /* align-items: center;
  grid-template-columns: 5fr 2fr;
  grid-gap: 15px; */
}
.countryInput {
  flex: 0 1 70% !important;
}

.dropdown {
}
.v-select__slot {
  height: 56px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  .v-label {
    margin: 0 !important;
    padding: 0 !important;
  }
  .v-select__selection {
    margin: 0 !important;
    padding: 0 !important;
  }
}

@media screen and (max-width: 500px) {
  .v-input__control {
  }
  .country {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr;
    grid-gap: 0;
  }

  #postCode {
    width: 100%;
  }
  .secondName {
    margin-left: none;
  }
  .postCode {
    margin-left: 0 !important;
    width: 100%;
  }
  .name-container {
    flex-direction: column;
  }
  .name {
    margin-left: 0;
    display: flex;
    flex-direction: row;
  }
  .firstName {
    flex: 0 1 50% !important;
  }
  .secondName {
    margin-left: 15px !important;
    flex: 0 1 50% !important;
  }
  .userTitle {
    width: 50%;
  }
  .adress-container {
    display: flex;
    flex-direction: column;
  }
  .postCode {
    margin-left: 0 !important;
  }
  .province {
    margin-left: 0 !important;
  }
}
@media screen and (max-width: 1200px) {
}
.theme--dark.v-tabs-items,
.theme--dark.v-tabs > .v-tabs-bar {
  background-color: unset;
}
.theme--dark.v-card {
  background: rgb(0 0 0 / 80%);
}
</style>
