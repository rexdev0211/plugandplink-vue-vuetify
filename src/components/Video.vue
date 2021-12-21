<template>
  <div class="video-page-wrapper">
    <div class="item">
      <div class="video-page-title">Watch me <br /></div>
      <div class="player">
        <!-- <iframe
          class="video"
          src="https://www.youtube.com/embed/DU2-LcdlqNM?autoplay=1"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe> -->
        <!-- <iframe
          class="video"
          :src="require(`@/assets/SnakeVideo.mp4`)"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe> -->
        <v-carousel cycle hide-delimiter-background show-arrows-on-hover>
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet height="100%">
              <iframe
                class="video"
                :src="slide"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <!-- <video-player
                class="vjs-custom-skin1"
                ref="videoPlayer"
                width="100%"
                :options="playerOptions"
                :playsinline="true"
                customEventName="customstatechangedeventname"
              ></video-player> -->
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import "video.js/dist/video-js.css";

// import { videoPlayer } from "vue-video-player";
export default {
  // components: {
  //   videoPlayer
  // },
  data() {
    return {
      slides: [
        "https://www.youtube.com/embed/DU2-LcdlqNM?autoplay=1",
        "https://www.youtube.com/embed/DU2-LcdlqNM?autoplay=1"
      ],
      // videojs options
      playerOptions: {
        height: "500",
        width: "1000",
        autoplay: true,
        muted: true,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            // mp4
            src: require(`@/assets/SnakeVideo.mp4`)
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.video-page-wrapper {
  height: calc(100vh - 290px);
}
.item {
  margin: 10px auto 0px;
  // max-width: calc((100vh - 340px) * 1.777);
  /* height: 100%; */
  // max-height: calc(100vh - 340px);
  max-width: 1000px;
  max-height: 500px;
}
.video-page-title br {
  display: none;
}
.player {
  position: relative;
  /* width: 1100px; */
  // padding-bottom: 50.25%;
  /* max-height: 60%; */
  margin: auto;
  /* padding-bottom: 10px; */
  /* margin-bottom: 100px; */
}
.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
  border: 5px solid #4eaf33;
}
.video-page-title {
  font-size: 34px !important;
  text-align: center;
  margin-bottom: 27px;
}
.v-carousel {
  height: 100%;
}
@media screen and (max-width: 1200px) {
  .item {
    padding-top: 0px;
  }
  .player {
    border: none;
  }
  .item {
    margin: 10px auto 0px;
    // max-width: calc((100vh - 340px) * 1.777);
    /* height: 100%; */
    // max-height: calc(100vh - 340px);
    max-width: 800px;
    max-height: 400px;
  }
}
@media screen and (max-width: 1100px) {
  .video-page-title {
    font-size: 32px;
    max-width: 400px;
    margin: 60px auto 25px;
    line-height: 37px;
  }
  .player {
    margin-top: 60px;
    width: 100%;
  }
  .video {
    height: 100%;
  }
  .item {
    margin: 10px auto 0px;
    // max-width: calc((100vh - 340px) * 1.777);
    /* height: 100%; */
    // max-height: calc(100vh - 340px);
    max-width: 800px;
    max-height: 400px;
  }
}
@media screen and (max-width: 992px) {
  .item {
    margin: 10px auto 0px;
    // max-width: calc((100vh - 340px) * 1.777);
    /* height: 100%; */
    // max-height: calc(100vh - 340px);
    max-width: 700px;
    max-height: 350px;
  }
}
@media screen and (max-width: 768px) {
  .player {
    margin-bottom: 30px;
  }
  .item {
    margin: 10px auto 0px;
    // max-width: calc((100vh - 340px) * 1.777);
    /* height: 100%; */
    // max-height: calc(100vh - 340px);
    max-width: 500px;
    height: 250px;
  }
}

@media screen and (max-width: 680px) {
  .video-page-title br {
    display: block;
  }
  .video-page-title {
    margin: 0px auto 5px;
  }
  .player {
    width: 90%;
    margin-top: 20px;
  }
}

@media screen and (max-width: 500px) {
  .item {
    margin-top: 0px;
  }
}
</style>
