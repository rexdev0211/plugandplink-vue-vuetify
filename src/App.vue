<template>
  <div>
    <div
      v-if="$router.currentRoute.path.includes('admin')"
      class="admin-container flex flex-col w-full"
    >
      <header class="flex-1 flex flex-row w-full justify-center">
        <div
          class="flex flex-row h-20 gap-6  text-2xl bg-gradient-to-tr to-plthird from-plsecondary border-plprimary border rounded-lg mr-8"
        >
          <div class="flex-2 ml-8">
            <router-link to="/">
              <div class="h-full w-36 home-icon"></div>
            </router-link>
          </div>
          <div class="self-center">
            <router-link to="/admin/coupons">
              <div
                class="rounded-md border text-plthird hover:text-plprimary py-2 px-6"
              >
                Coupons
              </div>
            </router-link>
          </div>
          <div class="self-center">
            <router-link to="/admin/delivery-tracking">
              <div
                class="rounded-md border text-plthird hover:text-plprimary py-2 px-6"
              >
                Delivery Tracking
              </div>
            </router-link>
          </div>
        </div>
      </header>
      <v-app class="flex-2">
        <div class="mt-12">
          <router-view> </router-view>
        </div>
        <!-- <input type="text" /> -->
      </v-app>
    </div>
    <div v-else class="video-container">
      <header class="header">
        <div class="header-wrapper">
          <div class="header-logo">
            <router-link to="/" class="home-link">
              <img src="./assets/logo-home.svg" />
            </router-link>
          </div>

          <div class="header-right">
            <div class="header-mail"></div>
            <div class="header-menu"></div>
          </div>
        </div>
      </header>
      <div class="snakeVideo-wrap">
        <video-background
          v-bind:class="{ dark: isActive }"
          @playing="videoEnded"
          overlay="transparent"
          :src="require(`@/assets/SnakeVideo.mp4`)"
          class="snakeVideo"
          :loop="false"
          :autoplay="true"
          v-if="$router.currentRoute.name !== 'Admin'"
        >
        </video-background>
      </div>
      <v-app>
        <div class="contantWrapper routerView">
          <router-view> </router-view>
          <div v-if="$router.currentRoute.name == 'Home' && videoPlayed">
            <div class="contantWrapp homeButtonsWrapper choise">
              <transition name="nexti" v-if="lastText">
                <h1>
                  Watch the notes your remote teacher shows you without taking
                  your eyes off your keyboard.
                </h1>
              </transition>
              <div class="choise-wrapper" v-if="lastText">
                <router-link
                  class="routerLink routerLink-blue lBtn"
                  to="/watch-me"
                >
                  <v-btn class="homeButtons linkBtn">
                    <img src="./assets/play_icon.svg" alt="mglass icon" /> Watch
                    Me
                  </v-btn>
                </router-link>
                <router-link
                  class="routerLink routerLink-orange lBtn"
                  to="content/page=read-more"
                >
                  <v-btn class="homeButtons linkBtn">
                    <img src="./assets/read_icon.svg" alt="mglass icon" /> Read
                    More
                  </v-btn>
                </router-link>
                <!-- <router-link
            class="routerLink lBtn"
            to="/
        "
          > -->
                <a
                  href="/model/index.html"
                  class="routerLink-green routerLink lBt"
                >
                  <v-btn class="homeButtons linkBtn">
                    <img src="./assets/mglass_icon.svg" alt="mglass icon" />
                    Take a closer look
                  </v-btn>
                </a>
                <!-- </router-link> -->
                <router-link class="routerLink lBtn routerLink-pink" to="/shop">
                  <v-btn class="homeButtons linkBtn">
                    <img src="./assets/cart_icon.svg" alt="cart icon" /> Buy Now
                  </v-btn>
                </router-link>
              </div>
              <div class="download-app" v-if="lastText">
                <h4>Get the app</h4>
                <div class="download-app__source">
                  <router-link to="/app" class="a">
                    <img src="./assets/app-store.png" alt="App store" />
                  </router-link>
                  <router-link to="/app" class="a">
                    <img src="./assets/google-play.png" alt="Google" />
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <footer v-if="videoPlayed && $router.currentRoute.name !== 'Admin'">
            <div v-if="videoPlayed" class="footer-wrapper">
              <div class="footer-logo">
                <router-link to="/" class="home-link">
                  <img src="./assets/logo-home.svg" />
                </router-link>
              </div>
              <div class="footer-create">
                <p>PlugAndPlink is created by Arzesh Ltd</p>
                <router-link to="/content/page=info-for-teachers"
                  >Info For Teachers</router-link
                >
                <br />
                <router-link to="/content/page=privacy-policy"
                  >Privacy Policy</router-link
                >
              </div>
              <div class="footer-numbers">
                <p>UK registered company number 8501859</p>
                <p>VAT registration number 161 4730 26</p>
              </div>
              <div class="footer-add">
                <p>EU Design reg 007523394</p>
                <p>UK Design reg 6057651</p>
                <p>Patents applied for</p>
              </div>
              <div class="footer-contacts">
                <p>Telephone <a href="tel:+441233225873">+441233225873</a></p>
                <p>
                  <a href="mailto:info@plugandplink.com"
                    >info@plugandplink.com</a
                  >
                </p>
              </div>
            </div>
          </footer>
        </div>
        <!-- <input type="text" /> -->
      </v-app>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VideoBackground from "vue-responsive-video-background-player";
Vue.component("video-background", VideoBackground);
import VueRouter from "vue-router";
Vue.use(VueRouter);
import VueCardFormat from "vue-credit-card-validation";
Vue.use(VueCardFormat);
// import PaymentPage from "./components/PaymentPage";

export default {
  name: "App",
  data() {
    return {
      videoPlayed: true,
      lastText: false,
      isActive: false
    };
  },
  components: {
    VideoBackground
  },

  methods: {
    videoEnded() {
      console.log("ended");
    }
  },
  computed: {
    currentRouter() {
      return this.$router.currentRoute.name;
    },
    isVideoPlay() {
      if (this.$router.currentRoute.name != "Video") {
        return true;
      } else return false;
    }
  },
  mounted() {
    this.videoPlayer = true;
    setTimeout(() => ((this.lastText = true), (this.isActive = true)), 4000);
    console.log(1);
  }
};
</script>
<style lang="scss">
.admin-container {
  @apply px-10 py-10;
  background-color: white;
}

body {
  font-family: "McLaren", "sans-serif" !important;
}
.nexti-enter-active,
.nexti-leave-active {
  transition: all 0.9s;
  opacity: 1;
}

.home-icon {
  background: url("./assets/logo-home.svg") no-repeat center center;
  background-size: contain;
}
.nexti-enter,
.nexti-leave-to {
  opacity: 0;
  transform: translateX(50px) rotate(90deg);
}

footer {
  background: rgba(35, 35, 35, 35);
  color: #4eaf33 !important;
  height: 140px;
  width: 100%;
  p {
    font-family: "McLaren", "sans-serif" !important;
    color: white !important;
  }
}
.footer-wrapper {
  color: white !important;
  font-family: "McLaren", "sans-serif" !important;
  max-width: 85%;
  margin: 0px auto;
  padding: 30px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-wrapper a {
  text-decoration: none;
  color: #fff !important;
}

.footer-wrapper a:hover {
  color: #4eaf33 !important;
  transition: 0.3s;
}

.footer-logo {
  max-width: 127px;
}

.footer-logo img {
  object-fit: cover;
  width: 100%;
}

.footer-left {
  width: 35%;
}

.footer-right {
  width: 56%;
}
.footer-left,
.footer-right {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-numbers,
.footer-contacts {
  text-align: left;
}

.footer-contacts p,
.footer-numbers p,
.footer-create p,
.footer-add p {
  font-size: 16px !important;
}

.download-app {
  font-family: "McLaren", "sans-serif" !important;
  max-width: 70%;
  margin: 0px auto;
  h4 {
    font-size: 40px;
    line-height: 60px;
    text-align: center;
    color: #ffffff;
    margin-bottom: 20px;
  }
  // .download-app__source

  &__source {
    display: flex;
    justify-content: space-between;
    .a {
      display: inline-block;
      margin: 0px 15px;
    }
  }
}

// HAMBURGER MENU

header {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
}
.header-right {
  display: flex;
  justify-content: space-between;
  width: 43%;
}

#menu__toggle {
  opacity: 0;
}

#menu__toggle:checked ~ .menu__btn > span {
  transform: rotate(45deg);
}
#menu__toggle:checked ~ .menu__btn > span::before {
  top: 0;
  transform: rotate(0);
}
#menu__toggle:checked ~ .menu__btn > span::after {
  top: 0;
  transform: rotate(90deg);
}
#menu__toggle:checked ~ .menu__box {
  visibility: visible;
  left: 0;
}

.menu__btn {
  display: flex;
  align-items: center;
  position: absolute;
  top: 100px;
  right: 100px;
  width: 26px;
  height: 26px;
  cursor: pointer;
  z-index: 10;
}

.menu__btn > span,
.menu__btn > span::before,
.menu__btn > span::after {
  display: block;
  position: absolute;

  width: 100%;
  height: 4px;
  border-radius: 3px;

  background-color: #c1c7d1;

  transition-duration: 0.25s;
}
.menu__btn > span::before {
  content: "";
  top: -8px;
}
.menu__btn > span::after {
  content: "";
  top: 8px;
}

.menu__box {
  display: block;
  position: fixed;
  visibility: hidden;
  text-align: center;
  top: 0;
  left: -100%;

  width: 100%;
  height: 100%;
  z-index: 9;
  margin: 0;
  padding: 140px 0;

  list-style: none;

  background-color: #000;
  box-shadow: 1px 0px 6px rgba(0, 0, 0, 0.2);

  transition-duration: 0.25s;
}

.menu__item {
  display: block;
  padding: 12px 24px;

  color: #333;

  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 600;

  text-decoration: none;

  transition-duration: 0.25s;
}
.menu__item:hover {
  background-color: rgb(32, 32, 32);
}
// END MENU

.home-link {
  cursor: pointer;
}
/* .routerView {
  background-color: rgb(15, 15, 15);
} */
body {
  background-color: #121212;
}
.underBar {
  padding-top: 37px;
}
.contantWrapper {
  max-width: 100%;
  margin: auto;
}
.contantWrapp {
  min-height: calc(100vh - 280px);
  display: flex;
  justify-content: center;
  flex-direction: column;
  h1 {
    font-size: 30px;
  }
}
.video-container .contantWrapp h1 {
  margin-bottom: 46px;
  font-size: 42px;
}
.video-container {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.snakeVideo-wrap {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
}
.snakeVideo {
  background-color: red;
  width: 100vw;
  // height: calc(100vw / 1.78);
  height: 100vh;
  max-height: 100vh;
  // margin-bottom: -350px;
  /* position: fixed; */
  /* top: 20px; */
}
.appBar {
  transition: 2s ease-in-out;
}
.linkBtn {
  width: calc(50% - 20px);
  margin: 10px;
}
.routerLink {
  text-decoration: none;
  color: white !important;
}
.homeButtons {
  height: 60px !important;
}

.homeButtonsWrapper {
  margin: auto;
  padding: 90px 0px 20px;
  text-align: center;
}

.choise-wrapper {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 90%;
  padding: 0px 0px 60px;
  font-family: "McLaren", "sans-serif" !important;
}

.choise h1 {
  font-family: "McLaren", "sans-serif" !important;
  width: 100%;
  margin: 0 auto;
  width: 1200px;
}

.choise-wrapper
  .theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  font-size: 16px;
}

.choise-wrapper a {
  text-decoration: none;
}

.theme--dark.v-application {
  background: rgba(35, 35, 35, 0) !important;
  /* backdrop-filter: blur(30px); */
}

.choise-wrapper
  .theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: transparent;
  border: none;
  text-transform: uppercase;
  font-size: 20px;
  box-shadow: none;
  width: 100%;
  padding: 10px 30px;
}

.choise-wrapper a {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 115px;
  align-content: center;
  transition: all 0.3s;
  font-size: 20px;
  max-width: 417px;
}

.choise-wrapper a img {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}

.choise-wrapper a:hover {
  opacity: 0.7;
  transition: all 0.3s;
}
.routerLink-blue {
  background: url("./assets/blue_button.svg") no-repeat;
  background-size: 100% 100%;
}

.routerLink-orange {
  background: url("./assets/orange_button.svg") no-repeat;
  background-size: 100% 100%;
}

.routerLink-green {
  background: url("./assets/green_button.svg") no-repeat;
  background-size: 100% 100%;
}

.routerLink-pink {
  background: url("./assets/pink_button.svg") no-repeat;
  background-size: 100% 100%;
}

.v-btn:not(.v-btn--text):not(.v-btn--outlined):hover:before {
  display: none;
}

.header-wrapper {
  display: flex;
  justify-content: space-between;
  width: 89%;
  margin: 25px auto 0px;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus input:-webkit-autofill,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  border: 0;
  -webkit-text-fill-color: #fff;
  -webkit-box-shadow: 0 0 0px 1000px transparent inset;
  transition: background-color 5000s ease-in-out 0s;
  background: -webkit-linear-gradient(
    top,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 174, 255, 0.04) 50%,
    rgba(255, 255, 255, 0) 51%,
    rgba(0, 174, 255, 0.03) 100%
  );
}

.header-logo img {
  cursor: hover;
  object-fit: cover;
  width: 100%;
}

.header-logo {
  width: 100%;
  max-width: 261px;
}

.header .header-mail a {
  color: #a8d399;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 24px;
}

.header .header-mail a:hover {
  color: #81bd6b;
  transition: 0.3s;
}
.header-menu {
  width: 100%;
  max-width: 322px;
}
.header-apps {
  background-color: #f8f4f1;
  padding: 5px;
  p {
    color: #b3b3b3;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 600;
  }
}
.block-apps {
  display: flex;
  justify-content: space-between;
  a {
    img {
      width: 150px;
      border-radius: 10px;
      max-height: 47px;
    }
  }
}

.header-menu nav {
  margin-right: 40px;
}

.header .header-mail {
  margin: 3px 0px 0px;
}

.header .header-mail a > img {
  max-width: 27px;
  height: 20px;
  margin-right: 10px;
}

.v-ripple__container {
  display: none;
  opacity: 0 !important;
}
.routerView {
  position: absolute;
  left: 0;
  right: 0;
  top: 140px;
}
@media screen and (max-width: 1700px) {
  .choise-wrapper a {
    width: 25%;
  }
  .footer-right {
    width: 65%;
  }
  .footer-left {
    width: 32%;
    .footer-logo {
      margin-right: 20px;
    }
  }
  // .footer-left, .footer-right{
  //   width: 46%;
  // }
  .routerLink-orange,
  .routerLink-blue,
  .routerLink-pink,
  .routerLink-green {
    background-size: contain;
    background-position: center;
  }
  .footer-create {
    max-width: 230px;
  }
  .video-container .contantWrapp h1 {
    font-size: 30px;
    margin-bottom: 30px;
  }
  .download-app h4 {
    font-size: 28px;
    margin-bottom: 10px;
  }
  .download-app__source img {
    max-width: 210px;
  }
  .choise .v-btn__content {
    font-size: 16px;
  }
}

.dark .video-overlay {
  background: rgba(0, 0, 0, 0.5) !important;
}
@media screen and (max-width: 1440px) {
  .choise h1 {
    width: 1250px;
  }

  .homeButtonsWrapper {
    padding-top: 40px;
  }
  .download-app__source img {
    max-width: 200px;
  }
  .footer-contacts p,
  .footer-numbers p,
  .footer-create p,
  .footer-add p,
  .footer-create a {
    font-size: 12px !important;
  }
  .contantWrapp {
    min-height: calc(100vh - 260px);
  }
  footer {
    height: 153px;
  }
  .routerView {
    top: 110px;
  }
  .header .header-mail a {
    font-size: 18px;
  }
  .menu__btn {
    top: 60px;
    right: 60px;
  }
  .header-logo {
    width: 30%;
    max-width: 182px;
  }
  .choise-wrapper {
    padding-bottom: 45px;
  }
  .choise-wrapper
    .theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    padding: 10px 0px;
  }
  .video-container .contantWrapp h1 {
    margin-bottom: 35px;
  }
  .choise-wrapper a {
    height: auto;
  }
  .v-btn__content {
    padding: 0px 15px;
  }
  .choise-wrapper
    .theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    font-size: 14px;
  }
  .choise-wrapper a img {
    width: 16px;
    height: 16px;
    margin-right: 7px;
  }
  .choise-wrapper
    .theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    width: 100%;
  }
  // .choise-wrapper a {
  //   min-width: 285px;
  // }
  .header-logo {
    width: 23%;
  }
  // .footer-numbers, .footer-contacts{
  //   width: 48%;
  // }
}

@media screen and (max-width: 1240px) {
  .choise h1 {
    width: 1000px;
  }
}

@media screen and (max-width: 1100px) {
  .choise h1 {
    width: 85%;
  }
  .download-app__source img {
    width: 85%;
    min-width: 110px;
  }
  .footer-create {
    max-width: 150px;
    margin-left: 15px;
  }
  .footer-numbers {
    max-width: 160px;
    margin-left: 10px;
  }
  .footer-add,
  .footer-contacts {
    margin-left: 10px;
  }
  .homeButtonsWrapper {
    padding: 30px;
    margin-top: 34px;
    // position: absolute;
    // bottom: -10%;
    // left: 50%;
    // transform: translate(-50%,-50%);
    width: 100%;
  }
  .contantWrapp {
    min-height: calc(100vh - 153px);
  }
  .footer-wrapper {
    max-width: 90%;
  }
  .footer-left,
  .footer-right {
    width: 100%;
  }
  .footer-add p {
    font-size: 12px !important;
  }
  .footer-logo,
  .footer-create {
    width: auto;
  }
  .footer-contacts p,
  .footer-numbers p,
  .footer-create p {
    font-size: 12px !important;
  }
  .contantWrapper {
    max-width: 100%;
  }
  .header-logo {
    width: 37%;
  }
  .video-container .contantWrapp h1 {
    max-width: 800px;
    margin: 0 auto;
  }
  .snakeVideo {
    max-height: unset;
  }
  .video-container .contantWrapp h1 {
    margin-bottom: 40px;
  }
  .homeButtonsWrapper {
    padding: 30px;
    margin-top: 34px;
  }
  .video-wrapper {
    height: 100vh;
  }
  .linkBtn {
    width: calc(50% - 40px);
    margin: 20px;
  }
  .contantWrapp .choise-wrapper a {
    margin: 0px 3px;
  }
  .homeButtonsWrapper {
    padding: 30px 0px;
  }
  .choise-wrapper
    .theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    font-size: 12px;
  }
  .choise-wrapper {
    width: 100%;
  }
  .choise-wrapper a img {
    width: 12px;
    height: 12px;
  }
  .header .header-mail {
    margin: 10px 0px;
  }
  .header .header-mail a {
    font-size: 20px;
  }
  .header-logo {
    margin: 0px;
  }
  .header-wrapper {
    width: 88%;
    margin: 49px auto;
  }
  .choise-wrapper,
  .video-container .contantWrapp h1 {
    width: 90%;
  }
  .video-container {
    height: unset;
  }
  .choise .v-btn__content {
    font-size: 8px;
  }
}

@media screen and (max-width: 800px) {
  footer {
    height: 200px;
  }
  .choise-wrapper,
  .homeButtonsWrapper {
    padding-bottom: 0px;
  }
  .block-apps a img {
    width: 100px;
    border-radius: 10px;
    max-height: 32px;
  }
  .footer-wrapper {
    flex-wrap: wrap;
  }
  .footer-logo,
  .footer-create,
  .footer-contacts,
  .footer-add {
    width: 22%;
    margin-bottom: 10px;
  }
  .header-menu {
    max-width: 220px;
  }
  .header-apps p {
    font-size: 12px;
    margin-bottom: 5px;
  }
  .choise-wrapper {
    flex-wrap: wrap;
  }
  .footer-contacts p,
  .footer-numbers p,
  .footer-create p {
    font-size: 10px !important;
  }
  .menu__btn {
    right: 50px;
  }
  .header .header-mail {
    margin: 10px 0px;
  }
  .choise-wrapper a {
    width: 48% !important;
  }
  .homeButtonsWrapper {
    top: 60%;
    width: 100%;
  }
  .contantWrapp .choise-wrapper a {
    margin: 0px 0px 10px;
  }
  .header .header-mail a {
    font-size: 14px;
  }
  .footer-logo {
    max-width: 100px;
  }
}
@media screen and (max-width: 660px) {
  footer {
    height: 400px;
  }
  .download-app {
    max-width: 90%;
  }
  .footer-logo,
  .footer-create,
  .footer-contacts,
  .footer-add,
  .footer-numbers {
    width: 100%;
    text-align: center;
    margin-left: 0px;
  }
  .choise-wrapper,
  .homeButtonsWrapper {
    padding-bottom: 35px;
  }
  .header-right {
    margin-right: 20px;
  }
  .block-apps a img {
    width: 72px;
    border-radius: 10px;
    max-height: 24px;
  }
  .header-menu {
    max-width: 160px;
  }
  .header-apps p {
    font-size: 10px;
  }
  .contantWrapp {
    min-height: calc(100vh - 260px);
  }
  .footer-right {
    width: 100%;
    flex-direction: column;
    font-size: 10px;
    margin-top: 10px;
  }
  .footer-left {
    flex-direction: column;
    width: 100%;
    text-align: center;
    justify-content: center;
  }
  .footer-logo,
  .footer-create {
    width: 100%;
  }
  .footer-logo {
    margin-bottom: 5px;
    max-width: 70px;
  }
  .footer-create p {
    font-size: 12px !important;
  }
  .footer-wrapper {
    flex-direction: column;
    justify-content: center;
    width: 95%;
  }
  .footer-numbers,
  .footer-contacts {
    text-align: center;
    margin-bottom: 15px;
    width: 100%;
  }
  .footer-contacts p,
  .footer-numbers p {
    font-size: 12px !important;
  }
  .footer-create p {
    font-size: 10px !important;
  }
  .menu__btn {
    top: -20px;
    right: 30px;
  }
  .homeButtonsWrapper {
    top: 45%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .choise-wrapper,
  .video-container .contantWrapp h1 {
    width: 90%;
  }
  .header-logo img {
    width: 129px;
  }
  .header .header-mail a {
    display: none;
  }
  .header {
    z-index: 100;
    position: absolute;
    height: 0px;
    top: 60px;
    left: 0;
    width: 100%;
  }
  .header-wrapper {
    width: 100%;
    height: 100% !important;
    margin: auto;
    display: flex;
    padding-left: 20px;
    align-items: center;
    justify-content: space-between;
  }
  .header-logo {
    padding: 0;
    margin: 0;
  }
  .video-container .contantWrapp h1,
  .download-app h4 {
    font-size: 32px;
  }
  .choise-wrapper
    .theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    height: 42px !important;
  }
  .choise-wrapper a {
    margin-bottom: 0px;
  }
  .choise-wrapper a img {
    width: 10px;
    height: 10px;
    margin-right: 5px;
  }
  .homeButtons {
    height: 40px !important;
  }
  #menuToggle {
    top: -15px;
  }
}
@media screen and (max-width: 500px) {
  .video-wrapper[data-v-c4fb7048] {
    width: 283%;
    height: 100%;
  }
  .homeButtonsWrapper {
    top: 20%;
    margin-top: 0px;
  }
  .choise-wrapper
    .theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    font-size: 8px !important;
  }
  .v-application .error--text {
    padding-bottom: 15px;
  }
  .contantWrapper {
    padding-top: 67px;
    padding-left: 0;
    padding-right: 0;
  }
  .video-container .contantWrapp h1 {
    margin-bottom: 10px;
  }
  .video-container .contantWrapp h1,
  .download-app h4 {
    font-size: 16px;
  }
  .download-app {
    margin: 0px auto;
  }
  .download-app__source a {
    margin: 0px 5px;
    max-width: 120px;
    min-width: unset;
  }
  .linkBtn {
    width: calc(50% - 20px);
    margin: 10px;
  }
  .homeButtons {
    font-size: 10px !important;
  }
  .header-right {
    display: none;
  }
}
.noDec {
  text-decoration: none;
}
.lBtn {
  width: 50% !important;
}
.v-card__text {
  background: rgb(0, 0, 0, 0%) !important;
}
.v-list-item {
  background: rgb(0, 0, 0, 0%) !important;
}
.v-list {
  background: rgb(0, 0, 0, 0%) !important;
}
</style>
