<template>
  <div>
    <ConfirmAccount v-if="isConfirmAccount" />
  </div>
</template>

<script>
import ConfirmAccount from "./ConfirmAccount.vue";
export default {
  components: {
    ConfirmAccount
  },
  data() {
    return {
      isConfirmAccount: false
    };
  },
  methods: {
    call() {
      console.log(this.$router.currentRoute.fullPath);
    }
  },
  mounted() {
    if (
      this.$router.currentRoute.fullPath.includes(
        "purpose=account-acknowledgement&"
      )
    ) {
      console.log("Email page");
      this.isConfirmAccount = true;
    }
  }
};
</script>

<style lang="scss" scoped></style>
