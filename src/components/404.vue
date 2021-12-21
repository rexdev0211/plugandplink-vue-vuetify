<template>
  <div class="container error-container">
    <div class="page-title">
      <h4>
        <span>404</span> - sorry, nothing to see here. But the show must go on.
        Please visit our homepage or report a broken link to
        <a href="#">info@plugandplink.com</a>
      </h4>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.error-container {
  min-height: calc(100vh - 140px);
  .page-title {
    h4 {
      font-size: 28px;
      margin-bottom: 20px;
      color: #fefffe;
      font-family: "McLaren", "sans-serif" !important;
      span {
        display: block;
        font-size: 48px;
      }
    }
  }
}
</style>
