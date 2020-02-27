<template>
  <div>
    <div class="cartInfo">
      <div
        class="cartIcon"
        data-toggle="collapse"
        data-target="#cartCollapse"
      >
        <i class="fas fa-shopping-cart"><div
          v-if="cart.length !== 0"
          class="dot"
        /></i>
      </div>
      <div
        id="cartCollapse"
        class="collapse cartCollapse"
      >
        <div class="card card-body p-3">
          <div
            v-if="cart.length !== 0"
            class="overflowCtr mb-3"
            :class="{'overflowY':cart.length >= 3}"
          >
            <table class="table table-sm">
              <thead>
                <tr>
                  <th
                    scope="col"
                    width="25%"
                    class="text-center"
                  >
                    刪除
                  </th>
                  <th
                    scope="col"
                    width="50%"
                    class="text-left"
                  >
                    品名
                  </th>
                  <th
                    scope="col"
                    width="25%"
                    class="text-left"
                  >
                    價格
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in cart"
                  :key="item.id"
                >
                  <th
                    scope="row"
                    class="px-0 text-center"
                  >
                    <button
                      class="btn btn-sm btn-outline-danger"
                      @click="deleteItem(item.id)"
                    >
                      <i class="far fa-trash-alt" />
                    </button>
                  </th>
                  <td>{{ item.product.title | titleFilter }}</td>
                  <td>{{ item.product.price * item.qty | currency }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button
            v-if="cart.length !== 0"
            class="btn btn-orange btn-block"
            @click="getCart"
          >
            結帳去
          </button>
          <button
            v-if="cart.length === 0"
            class="btn btn-danger btn-block"
            @click="goShopping"
          >
            購物去
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  props: ['cart'],
  data () {
    return {}
  },
  methods: {
    deleteItem (id) {
      this.$emit('emitDelete', id)
    },
    getCart () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.$http.get(api).then((response) => {
        vm.$router.push(`/checkout`)
      })
    },
    goShopping () {
      const vm = this
      vm.$router.push('/products')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/all.scss";

$mobile: '568px';
$pad-m: '768px';
$pad-l: '960px';

@mixin screen($size){
  @media(max-width: $size){
    @content
  }
}

.cartInfo{
  position: fixed;
  right: 5%;
  bottom: 5%;
  z-index: 9999;
  cursor: pointer;
  @include screen($mobile){
    right: 3%;
    bottom: 2%
  }
  .cartIcon{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid $primary;
    background-color: white;
    .fa-shopping-cart{
      font-size: 20px;
      line-height: 20px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: $primary;
      .dot{
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: $pink;
        position: absolute;
        top: -20%;
        right: -20%;
      }
    }
  }
  .cartCollapse{
    position: absolute;
    bottom: 64px;
    right: 0;
    width: 300px;
  }
  .overflowCtr{
    display: block;
    max-height: 190px;
    overflow: hidden;
  }
  .overflowY{
    overflow-y: scroll;
  }
}
</style>
