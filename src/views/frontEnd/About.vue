<template>
  <div>
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
              關於我們
            </li>
          </ol>
        </nav>
        <!-- End Breadcrumb -->
        <div class="row">
          <div class="col-md-10 offset-md-1">
            <img
              src="https://static.popdaily.com.tw/static/article/21596/GwXYHKJVz59idaSJgM5FAdHa0TKR36DYn24m2gyw.png"
              class="img img-fluid aboutImg mb-4"
              alt="Winnie the pooh"
            >
            <p class="aboutText mb-4">
              小熊維尼（英語：Winnie the Pooh，簡稱為Pooh、Pooh Bear），1925年12月24日首次面世，以聖誕故事形式在倫敦《新聞晚報》刊出；第一本《小熊維尼》故事書於1926年10月出版。
            </p>
            <p class="aboutText mb-4">
              小熊維尼是艾倫·亞歷山大·米恩為他的兒子創作的一隻漫畫熊；而古典維尼是由謝培德（E.H.Shepard）所繪，後由華特·迪士尼公司購入並經過重新繪製，推出後因其可愛的外型與憨厚的個性，迅速成為世界知名的卡通角色之一。
            </p>
            <p class="aboutText mb-4">
              此後人們為了區別兩種不同風格的維尼，稱呼米爾恩時期由謝培德（E.H.Shepard）繪製的維尼為「古典維尼」（Classic Pooh）；而後全球粉絲便把米爾恩的生日（1月18日）推為國際小熊維尼日。
            </p>
            <p class="aboutText mb-4">
              小熊維尼在故事中有很多朋友，小豬與跳跳虎是最常出現的兩個角色。
            </p>
            <p class="aboutText text-left mb-2">
              <a
                href="https://zh.wikipedia.org/wiki/%E5%B0%8F%E7%86%8A%E7%B6%AD%E5%B0%BC#%E8%BF%AA%E5%A3%AB%E5%B0%BC%E6%99%82%E6%9C%9F"
                target="_blank"
              >文字資料來源：wikipedia</a>
            </p>
            <p class="aboutText text-left">
              圖片資料來源：Google搜尋
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/all.scss";

.pageFullBanner{
  background-image: url('../../assets/images/page_aboutBanner.jpg');
  @include screen($mobile){
    background-image: url('../../assets/images/page_aboutBanner_mo.jpg');
  }
}
.aboutText{
  font-size: 18px;
  letter-spacing: 1px;
  line-height: 27px;
  a,
  a:hover{
    text-decoration: none;
    color: $primary;
  }
}
</style>
