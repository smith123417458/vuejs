<template>
  <div>
    <div class="container">
      <div class="pageFullBanner mb-2" />
      <router-view></router-view>
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
</style>
