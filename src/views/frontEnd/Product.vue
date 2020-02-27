<template>
  <div class="mainContent w-100">
    <loading :active.sync="isLoading">
      <Circle4 />
    </loading>
    <!-- Start Content -->
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb my-2 p-0 bg-transparent mb-4">
          <li class="breadcrumb-item">
            <router-link to="/">
              首頁
            </router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/products">
              相關產品
            </router-link>
          </li>
          <li
            class="breadcrumb-item active"
            aria-current="page"
          >
            {{ product.title }}
          </li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="row mb-4">
            <div class="col-md-6">
              <img
                :src="`${product.imageUrl}`"
                :alt="`${product.title}`"
                class="img img-fluid productImg mb-4 mb-md-0"
              >
            </div>
            <div class="col-md-6 d-flex align-items-end flex-column">
              <div class="productInfo_up w-100">
                <h4 class="mb-4 productTitle">
                  {{ product.title }}
                </h4>
                <div class="coupon d-flex mb-4">
                  <div class="coupon_item mr-1">
                    指定新會員獨享
                  </div>
                  <div class="coupon_item mr-1">
                    超取滿NT$899免運
                  </div>
                  <div class="coupon_item">
                    國家/地區配送
                  </div>
                </div>
                <div class="price">
                  <div class="price_origin">
                    NT{{ product.origin_price|currency }}
                  </div>
                  <div class="price_final">
                    NT{{ product.price|currency }}
                  </div>
                </div>
              </div>
              <div class="productInfo_down w-100 mt-auto">
                <select
                  v-model="product.num"
                  class="form-control mb-4"
                >
                  <option
                    v-for="num in 10"
                    :key="num"
                    :value="num"
                  >
                    選購 {{ num }} {{ product.unit }}
                  </option>
                </select>
                <button
                  class="btn btn-primary btn-block"
                  @click="addToCart(product.id, product.num)"
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-md-6 mb-4 mb-md-0">
              <div class="giftInfo rounded">
                <div class="giftInfo_Item d-flex align-items-center mb-2">
                  <div class="giftInfo_Item_title mr-2 text-center rounded">
                    折價券
                  </div>
                  <div class="giftInfo_Item_text">
                    熊熊遇見你，可享首購優惠 8 折
                  </div>
                </div>
                <div class="giftInfo_Item d-flex align-items-center mb-2">
                  <div class="giftInfo_Item_title mr-2 text-center rounded">
                    贈品
                  </div>
                  <div class="giftInfo_Item_text">
                    小熊維尼聯名蜂蜜奶茶一罐
                  </div>
                </div>
                <div class="giftInfo_Item d-flex align-items-center mb-2">
                  <div class="giftInfo_Item_title mr-2 text-center rounded">
                    白金會員
                  </div>
                  <div class="giftInfo_Item_text">
                    單筆消費滿千可享折扣 75 折
                  </div>
                </div>
                <div class="giftInfo_Item d-flex align-items-center">
                  <div class="giftInfo_Item_title mr-2 text-center rounded">
                    鑽石會員
                  </div>
                  <div class="giftInfo_Item_text">
                    單筆消費滿千可享折扣 76 折
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="jumbotron special p-3 h-100">
                <p class="special_title m-0">
                  商品特色
                </p>
                <div class="special_text">
                  {{ product.content }}
                </div>
              </div>
            </div>
          </div>
          <h4 class="productLike mb-3">
            你可能喜歡
          </h4>
          <div class="row mb-4">
            <div
              v-for="item in filterData"
              :key="item.id"
              class="col-6 col-md-4 productBox"
            >
              <div
                class="card productLike_item border-0"
                @click="getLikeProduct(item.id)"
              >
                <img
                  class="card-img-top"
                  :src="`${item.imageUrl}`"
                  :alt="`${item.title}`"
                >
                <div class="card-body p-2">
                  <h3 class="productLike_title mb-0">
                    {{ item.title|titleFilter }}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Content -->
    <!-- cart Icon -->
    <Cart
      :cart="carts"
      @emitDelete="deleteItem"
    />
    <!---->
  </div>
</template>

<script>
import { Circle4 } from 'vue-loading-spinner'
import Cart from '../../components/Cart'

export default {
  name: 'Product',
  components: {
    Circle4,
    Cart
  },
  data () {
    return {
      pageName: '系列產品',
      products: [],
      product: {},
      sameProducts: [],
      carts: [],
      category: '',
      isLoading: false,
      status: {
        addToCartIcon: false
      }
    }
  },
  computed: {
    filterData () {
      const vm = this
      let items = []
      let likeProducts = []
      items = vm.products.filter((item, i) => item.category === vm.category)
      items.forEach((item, i) => {
        if (item.title !== vm.product.title) {
          likeProducts.push(item)
        }
      })
      return likeProducts
    }
  },
  created () {
    this.getProducts()
    this.getProduct()
    this.getCart()
  },
  methods: {
    getProducts () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.$http.get(api).then((response) => {
        vm.products = response.data.products
        vm.products.forEach(item => {
          vm.$set(item, 'likeThis', false)
        })
      })
    },
    getProduct () {
      const vm = this
      const productID = vm.$route.params.id
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${productID}`
      vm.isLoading = true
      vm.$http.get(api).then(response => {
        vm.isLoading = false
        vm.product = response.data.product
        vm.category = response.data.product.category
        // 數量預設值為1
        vm.product.num = 1
        console.log('response.data.product.likeThis', response.data.product.likeThis)
      })
    },
    getLikeProduct (id) {
      const vm = this
      vm.$router.push(`/product/${id}`)
      vm.getProduct()
    },
    getCart () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.$http.get(api).then((response) => {
        vm.carts = response.data.data.carts
      })
    },
    addToCart (id, qty = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const cart = {
        product_id: id,
        qty: qty
      }
      vm.isLoading = true
      vm.$http.post(api, { data: cart }).then(response => {
        vm.getCart()
        vm.isLoading = false
      })
    },
    deleteItem (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.isLoading = true
      vm.$http.delete(api).then((response) => {
        vm.getCart()
        vm.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/all.scss";

.productImg{
  margin: 0 auto;
}
.productTitle{
  line-height: 1.5;
}
.coupon{
  &_item{
    padding: 3px;
    border: 1px solid $primary;
    color: $primary;
  }
}
.price{
  &_origin{
    font-size: 14px;
    line-height: 1.5;
    color: gray;
    text-decoration: line-through;
  }
  &_final{
    font-size: 20px;
    line-height: 1.5;
    color: $danger;
  }
}
.giftInfo{
  padding: 10px;
  border: 1px solid #737373;
  border-top-width: 2px;
  &_Item_title{
    min-width: 20%;
    border: 1px solid $primary;
    padding: 2px 4px;
    color: $primary;
  }
}
.special{
  margin-bottom: 0;
  &_title{
    font-size: 16px;
    line-height: 32px;
  }
  &_text{
    font-size: 14px;
    line-height: 20px;
    text-align: left;
  }
}
.productLike{
  &_item{
    cursor: pointer;
  }
  &_title{
    font-size: 14px;
    line-height: 1.5;
    text-align: left;
  }
}
.productBox{
  @include screen($mobile) {
    &:nth-child(odd){
      padding-right: 2px;
    };
    &:nth-child(even){
      padding-left: 2px;
    }
  }
}
</style>
