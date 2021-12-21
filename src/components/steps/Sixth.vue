<template>
  <div>
    <p class="titlet">
      Please check your delivery details before proceeding to the billing page.
    </p>
    <v-card-text>
      <v-list>
        <v-list-item>
          <div class="grid">
            <p>Quantity:</p>
            <p class="primaryColor">{{ order.amount }}{{ amountName }}</p>
          </div>
        </v-list-item>
        <v-list-item>
          <div class="grid">
            <p>Recipient:</p>
            <p class="primaryColor">
              {{ `${order.firstName} ${order.secondName}` }}
            </p>
          </div>
        </v-list-item>

        <v-list-item>
          <div class="grid">
            <p class="grid-adress">Address:</p>
            <p class="primaryColor">
              <!-- {{ `${order.address1}${order.address2} ${order.address2} ${order.postCode} ${order.city}` }} -->
              <span>
                {{ `${order.address1}` }}
              </span>
              <span>
                {{ `${order.address2}` }}
              </span>
              <span>
                {{ `${order.postCode}` }}
              </span>
              <span>
                {{ `${order.city}` }}
              </span>
              <!-- {{ `${order.address1}${order.address2} ${order.address2} ${order.postCode} ${order.city}` }} -->
            </p>
          </div>
        </v-list-item>

        <v-list-item>
          <div class="grid">
            <p>Phone:</p>
            <p class="primaryColor">
              {{ order.phone }}
            </p>
          </div>
        </v-list-item>
        <v-list-item>
          <div class="grid">
            <p>Email:</p>
            <p class="primaryColor">
              {{ order.email }}
            </p>
          </div>
        </v-list-item>
      </v-list>
    </v-card-text>
  </div>
</template>

<script>
export default {
  props: ["order", "back", "next", "getPrice"],
  computed: {
    amountName() {
      if (this.order.amount === 1) return " snake";
      else return " snakes";
    }
  },
  created() {
    this.getPrice();
  }
};
</script>

<style lang="scss" scoped>
.primaryColor {
  word-break: break-all !important;
  text-align: right;
}

.grid .primaryColor > span {
  display: block;
  margin-bottom: 10px;
}
/* .grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 43fr;
  grid-gap: 20px;
} */
.grid {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.v-list {
  padding: 0;
}
.v-list-item {
  padding: 0;
}
@media screen and (max-width: 800px) {
  .grid .grid-adress {
    margin-right: 20px !important;
  }
}
</style>
