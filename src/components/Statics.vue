<template>
  <div class="container read-container ">
    <div class="read-more">
      <div class="page-title">
        {{ title }}
      </div>
      <v-card v-if="content" class="read-more-card">
        <div class="read-more-wrapper">
          <div v-html="content"></div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      content: "",
      title: "",
      url: "",
      fullUrl: "",
      indexOfPage: -1,
      urlVar: "exchange.snakeomatic.com"
    };
  },

  created() {
    let hostname = window.location.hostname;
    if (hostname != "localhost") {
      this.urlVar = `exchange.${hostname}`;
    }
    this.url = this.$router.currentRoute.path.slice(9);
    this.indexOfPage = this.url.indexOf("page");
    this.getHtml();
  },
  methods: {
    getHtml: async function() {
      try {
        const page = await axios.get(
          `https://${this.urlVar}/web/content?${this.url}`
        );
        if (this.indexOfPage !== -1) {
          this.title = this.url.slice(this.indexOfPage + 5).replace(/-/g, " ");
        }
        this.content = page.data;
      } catch (err) {
        console.log(err);
        this.$router.push("/not-there");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.page-title {
  text-transform: capitalize;
}
.read-more {
  font-family: "McLaren", "sans-serif" !important;
}
.container {
  padding: 0px;
}
.read-container {
  min-height: calc(100vh - 290px);
}
.read-more_first {
  margin-bottom: 37px;
}
.v-list-item {
  min-height: auto;
}
.v-card__subtitle,
.v-card__text,
.v-card__title,
.v-list.list.v-sheet.theme--dark {
  padding: 0;
}
.v-list-item.theme--dark::before {
  content: ".";
  position: absolute;
  top: -8px;
  left: 0px;
  font-size: 25px;
}
.v-list-item.theme--dark {
  line-height: 26px;
  padding-left: 10px;
}

.read-more-subtitle {
  padding-bottom: 18px;
  color: #fefffe !important;
  font-family: "McLaren", "sans-serif" !important;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
}
.v-list-item {
  padding: 0;
}
.page-title {
  color: #fefffe;
  font-family: "McLaren", "sans-serif" !important;
  font-size: 34px;
  font-weight: 400;
  line-height: 33.36px;
  margin-bottom: 47px;
}
.v-card__text {
  font-family: "McLaren", "sans-serif" !important;
}
.read-more {
  overflow-y: auto !important;
  padding-bottom: 20px;
  width: 100%;
  margin: 10px auto 0px;
  z-index: 9999999;
}
.title {
  // color: #4eaf33 !important;
  font-family: "Mc Laren";
  font-weight: 400;
  line-height: 22px;
  color: #23a440;
  font-size: 18px;
  margin-bottom: 30px;
}
.read-more-wrapper {
  width: 100%;
  max-width: 1920px;
  box-sizing: border-box;
  padding: 50px 118px 30px 70px;
  overflow-y: scroll;
}

.read-more .v-card {
  max-width: 85%;
  margin: 0 auto;
}
// .read-more-wrapper::-webkit-scrollbar {
//   -webkit-appearance: none;
// 	width: 16px;
// }
// .read-more-wrapper::-webkit-scrollbar-button {
//    background-color: #999;
// }
.read-more-wrapper::-webkit-scrollbar-track {
  background-color: #999;
}
// .read-more-wrapper::-webkit-scrollbar-thumb {
//   border-radius: 5px;
// 	background-color: rgba(0,0,0,0.5);
//   -webkit-box-shadow: 0 0 1px rgba(255,255,255,0.5);
//   height: 40px;
// }

.read-more-wrapper::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 7px;
}
.read-more-wrapper::-webkit-scrollbar-thumb {
  border-radius: 2px;
  background-color: #666;
  -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
}
.read-more-wrapper::-webkit-scrollbar-corner {
  background-color: #999;
}
.read-more-wrapper::-webkit-resizer {
  background-color: #666;
}

.v-card__title {
  word-break: normal;
}
.v-card {
  /* margin-top: -2px; */
}
.v-card__text {
  color: #fefffe !important;
  font-family: "Mc Laren";
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
}
.read-more-wrapper {
  color: white !important;
}

.list {
  margin-bottom: 23px;
}

.page-title br {
  display: none;
}
.read-more[data-v-76f91e8a] {
  height: calc(100vh - 290px);
}
@media screen and (max-width: 1580px) {
  .read-more {
    padding-bottom: 6px;
  }
  .read-more[data-v-76f91e8a] {
    /* max-height: calc(100vh - 310px); */
  }
  .container {
    padding: 12px 0px;
  }
}

@media screen and (max-width: 1200px) {
  .read-more-card {
    overflow: hidden;
  }
  .read-more[data-v-76f91e8a][data-v-76f91e8a] {
    /* max-height: calc(100vh - 288px); */
  }
  .read-more {
    top: 0px;
    margin-top: 0px;
  }
  .page-title {
    margin-bottom: 58px;
  }
  .read-more-wrapper[data-v-76f91e8a] {
    padding: 38px 56px 30px 19px;
  }
}
@media screen and (max-width: 680px) {
  .read-container {
    min-height: calc(100vh - 260px);
  }
  .read-more-card {
    margin: 0;
    width: 100vw !important;
  }
  .read-more-wrapper {
    padding: 32px 55px 32px 35px;
  }
  .read-more .v-card {
    max-width: 100%;
  }
  .read-more {
    padding: 0;
    padding-bottom: 50.5px;
    margin-top: 80px;
  }
  .contantWrapper .page-title {
    font-size: 32px;
    max-width: 400px;
    margin: 5px auto 25px;
    line-height: 36px;
  }
  .read-more-card .read-more-wrapper {
    /* max-height: 568px; */
    padding: 22px 11px 25px 12px;
  }
  .v-sheet.v-card {
    border-radius: 0px !important;
  }
  .read-more-wrapper::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 10px;
  }
}
@media screen and (max-width: 500px) {
  .v-card__text {
    font-size: 14px;
    line-height: 20px;
  }
  .page-title br {
    display: block;
  }
  .title {
    line-height: 20px;
    font-size: 16px;
    margin-bottom: 30px;
  }
  .v-list-item.theme--dark::before {
    content: ".";
    font-size: 35px;
    top: -10px;
  }
  .read-more-subtitle {
    font-size: 14px;
    line-height: 20px;
    padding-bottom: 26px;
  }
  .v-list-item.theme--dark {
    padding-left: 15px;
    line-height: 20px;
  }
  .v-card {
    /* margin-top: -20px; */
  }
  .page-title {
    margin-bottom: 25px;
    line-height: 26.36px;
  }
}

@media screen and (max-width: 360px) {
  .v-card__text {
    font-size: 12px;
  }
  .read-more-subtitle {
    font-size: 12px;
  }
  .title {
    font-size: 15px !important;
    margin-bottom: 20px;
  }
  .read-more {
    padding-bottom: 25px;
  }
  .read-more-card {
    margin: 0px 10px 0px 10px;
  }
  .read-more-wrapper {
    /* padding: 16px 29px 16px 18px; */
  }
}
.v-list-item {
  list-style: circle !important;
}
.list {
  background-color: rgb(0, 0, 0, 0%);
}
.page-title {
  display: block;
  font-size: 34px;
  text-align: center;
}

@media screen and (max-width: 1440px) {
  .read-more .page-title {
    font-size: 28px;
    margin-bottom: 20px;
  }
  .read-more {
    margin-top: 0px;
  }
}

@media screen and (min-width: 500px) {
  /* .read-more-card {
    background-color: rgb(0, 0, 0, 50%);
  }
  */
}

@media screen and (max-width: 500px) {
  .read-more-card {
    overflow: hidden;
    background-color: rgb(0, 0, 0, 50%);
  }
}
.read-more {
  overflow: hidden !important;
}
.page-title {
  margin-top: 10px;
}

@media screen and (min-width: 1200px) {
  .page-title {
    margin-top: 0px;
  }
  .ream-more-card {
    height: 100vh !important;
  }
  .read-more-wrapper {
    /* max-height: calc(100vh - 400px); */
  }
}
@media screen and (max-width: 1200px) {
  .read-more-wrapper {
    overflow: hidden;
    height: 100% !important;
  }
  .read-more {
    height: auto;
  }
}
.read-more-wrapper {
  overflow: hidden !important;
}
.read-more {
  margin-bottom: 20px !important;
}
</style>
