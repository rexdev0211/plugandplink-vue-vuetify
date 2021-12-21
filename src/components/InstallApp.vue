<template>
  <div class="install-app">
    <div class="install-wrapper">
      <div class="install-qr"></div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import device from "vue-device-detector";
Vue.use(device);
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    if (this.$device.ios) {
      window.location.href =
        "https://apps.apple.com/us/app/plugandplink/id1532723996";
    } else if (this.$device.android) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.plugandplink.app";
    } else if (this.$device.windows) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.plugandplink.app";
    } else {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.plugandplink.app";
    }
  }
};
</script>

<style lang="scss" scoped>
.install-wrapper {
  min-height: calc(100vh - 280px);
  position: relative;
  .install-qr {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(2.2);
    img {
      width: 100%;
      cursor: pointer;
    }
  }
}
.qr-code {
  background-color: #fff;
}
</style>
