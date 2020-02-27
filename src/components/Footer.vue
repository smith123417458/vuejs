<template>
  <div class="footerContent">
    <footer class="footer">
      <img
        src="../assets/images/footerLogo.svg"
        class="footer_logo mb-3"
        alt=""
      >
      <ul class="footer_mediaIcon d-flex flex-row justify-content-center mb-3">
        <a
          href="https://github.com/iian0910/Vue_EC"
          target="_blank"
          class="icon"
        ><i class="fab fa-facebook-f" /></a>
        <a
          href="https://github.com/iian0910/Vue_EC"
          target="_blank"
          class="icon"
        ><i class="fab fa-twitter" /></a>
        <a
          href="https://github.com/iian0910/Vue_EC"
          target="_blank"
          class="icon"
        ><i class="fab fa-facebook-messenger" /></a>
        <a
          href="https://github.com/iian0910/Vue_EC"
          target="_blank"
          class="icon"
        ><i class="far fa-envelope-open" /></a>
        <a
          href="https://github.com/iian0910/Vue_EC"
          target="_blank"
          class="icon"
        ><i class="fas fa-share-alt" /></a>
      </ul>
      <p class="m-0 footer_text">
        此網站僅做為個人學習使用，非商業用途。
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Product',
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/all.scss";

*{
  position: relative;
}

.footerContent{
  width: 100%;
  position: relative;
  left: 0;
  bottom: 0;
  .footer{
    padding-top: 30px;
    padding-bottom: 30px;
    background-color: $primary;
    &_logo{
      margin: 0 auto;
      width: 80px;
      height: 80px;
      display: block;
    }
    &_mediaIcon{
      padding: 0;
      margin: 0;
      list-style: none;
      .icon{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 1px solid white;
        margin-right: 26px;
        &:last-child{
          margin-right: 0;
        }
        i{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 14px;
          line-height: 14px;
        }
      }
    }
    &_text{
      font-size: 12px;
      line-height: 12px;
      color: white;
      text-align: center;
    }
  }
}
</style>
