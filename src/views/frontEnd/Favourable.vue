<template>
  <div class="w-100">
    <div class="container">
      <div class="pageFullBanner mb-2" />
      <section class="section">
        <!-- Start Breadcrumb -->
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-2 p-0 bg-transparent">
            <li class="breadcrumb-item">
              <router-link
                to="/"
                class="breadcrumb-link"
              >
                首頁
              </router-link>
            </li>
            <li
              class="breadcrumb-item active"
              aria-current="page"
            >
              優惠活動
            </li>
          </ol>
        </nav>
        <!-- End Breadcrumb -->
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <div class="coupont text-center">
              <h3 class="mb-0 coupont_title">
                ─ 熊熊認識你 ─
              </h3>
              <p class="coupont_code mb-0">
                [ WinnieMall0910 ]
              </p>
              <p class="coupont_text mb-0">
                輸入上面代碼
              </p>
              <p class="coupont_text mb-0">
                可享首購優惠 8 折
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/all.scss";

.pageFullBanner{
  background-image: url('../../assets/images/page_newsBanner.jpg');
  @include screen($mobile){
    background-image: url('../../assets/images/page_newsBanner_mo.jpg');
  }
}
.coupont{
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: $yellow;
  color: #5f4702;
  &_title,
  &_code{
    font-size: 40px;
    line-height: 60px;
    font-weight: bold;
    @include screen($mobile) {
      font-size: 36px;
      line-height: 54px;
    }
  }
  &_text{
    font-size: 20px;
    line-height: 30px;
  }
}
</style>
