<template>
  <div class="home">
    <!-- <header class="header">
      <div class="header-wrapper">
        <div class="header-logo">
          <img src="../assets/logo-home.svg" />
        </div>
        <div class="header-mail">
          <a href="mailto:contact@plugandplink.com"
            ><img src="../assets/mail_icon.svg" alt="" />
            contact@plugandplink.com</a
          >
        </div>
      </div>
    </header> -->
  </div>
</template>

<script>
import Vue from "vue";
import VideoBackground from "vue-responsive-video-background-player";
Vue.component("video-background", VideoBackground);
export default {
  data() {
    return {};
  },

  mounted() {}
};
</script>

<style lang="scss">
.routerLink {
  text-decoration: none;
  color: white !important;
}
.homeButtons {
  height: 60px !important;
}

input {
  background: rgba(0, 0, 0, 0) !important;
}
</style>
<style scoped lang="scss"></style>
