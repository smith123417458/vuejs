<template>
  <div>
    <div
      v-for="item in product.slice(0, 4)"
      :key="item.id"
      class="icon-group"
    >
      <i
        class="far fa-heart likeIcon mr-3"
        :class="{'fa': item.likeThis}"
        @click.stop="item.likeThis =! item.likeThis"
      />
      <i class="fas fa-shopping-cart" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  props: ['product'],
  data () {
    return {}
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/all.scss";

.icon-group{
  cursor: pointer;
  position: absolute;
  right: 12px;
  bottom: 12px;
  @include screen ($mobile) {
    position: sticky;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
  }
  i{
    color: rgb(80, 80, 80);
    @include screen ($mobile) {
      width: 50%;
      height: 45px;
      color: #505050;
      border-radius: 5px;
      font-size: 26px;
      line-height: 45px;
      text-align: center;
    }
  }
  .fa.fa-heart{
    color: $pink;
  }
}
</style>
