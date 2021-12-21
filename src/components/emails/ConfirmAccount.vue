<template>
  <div class="confrim">
    {{ msg }}
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      msg: "",
      urlVar: "exchange.snakeomatic.com"
    };
  },
  mounted() {
    console.log("Confirm page");
    let indexToSlice = this.$router.currentRoute.fullPath.indexOf("token") + 6;
    let token = this.$router.currentRoute.fullPath
      .split("")
      .slice(indexToSlice)
      .join("");

    let hostname = window.location.hostname;
    if (hostname != "localhost") {
      this.urlVar = `exchange.${hostname}`;
    }

    axios
      .get(
        `https://${this.urlVar}/web/link/response?purpose=account-acknowledgement&token=${token}`
      )
      .then(res => {
        console.log(res);
        this.msg = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
.confrim {
  margin-top: 20px;
  padding: 20px;
}
</style>
