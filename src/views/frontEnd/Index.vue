<template>
  <div>
    <loading :active.sync="isLoading">
      <Circle4 />
    </loading>
    <div class="container">
      <!-- Start Carousel -->
      <div
        id="indexBanner"
        class="carousel slide"
        data-ride="carousel"
      >
        <ol class="carousel-indicators">
          <li
            data-target="#indexBanner"
            data-slide-to="0"
            class="active"
          />
          <li
            data-target="#indexBanner"
            data-slide-to="1"
          />
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item activeBanner01 active" />
          <div class="carousel-item activeBanner02" />
        </div>
        <a
          class="carousel-control-prev"
          href="#indexBanner"
          role="button"
          data-slide="prev"
        >
          <span
            class="carousel-control-prev-icon"
            aria-hidden="true"
          />
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#indexBanner"
          role="button"
          data-slide="next"
        >
          <span
            class="carousel-control-next-icon"
            aria-hidden="true"
          />
          <span class="sr-only">Next</span>
        </a>
      </div>
      <!-- End Carousel -->
      <!-- Start News -->
      <section class="section news">
        <h3 class="sectionTitle mb-4 text-center">
          最新消息
        </h3>
        <div class="row align-items-center">
          <div class="col-md-6">
            <ul class="news_list">
              <router-link to="/news/news20200210" class="news_link">
                <li class="news_list_item mb-2">
                  <div class="news_date">
                    2020.02.10
                  </div>
                  <div class="news_text">
                    戀愛季節【熊愛你】，購物滿 $5,000 送 $500
                  </div>
                </li>
              </router-link>
              <router-link to="/news/news20200123" class="news_link">
                <li class="news_list_item mb-2">
                  <div class="news_date">
                    2020.01.23
                  </div>
                  <div class="news_text">
                    返鄉過年【熊黑皮】，過年期間暫停營業
                  </div>
                </li>
              </router-link>
              <router-link to="/news/news20200120" class="news_link">
                <li class="news_list_item mb-2">
                  <div class="news_date">
                    2020.01.20
                  </div>
                  <div class="news_text">
                    過年放假【熊放肆】，食品系列商品 6 折起
                  </div>
                </li>
              </router-link>
              <router-link to="news/news20200101" class="news_link">
                <li class="news_list_item mb-2">
                  <div class="news_date">
                    2020.01.01
                  </div>
                  <div class="news_text">
                    跨年無伴【熊孤單】，玩偶系列商品 7 折起
                  </div>
                </li>
              </router-link>
              <router-link to="news/news20191225" class="news_link">
                <li class="news_list_item mb-2">
                  <div class="news_date">
                    2019.12.25
                  </div>
                  <div class="news_text">
                    冬季聖誕【熊溫暖】，服飾系列商品 8 折起
                  </div>
                </li>
              </router-link>
            </ul>
          </div>
          <div class="col-md-6 d-none d-md-block">
            <img
              src="../../assets/images/newsImg.jpg"
              class="img img-fluid"
              alt=""
            >
          </div>
        </div>
      </section>
      <!-- End News -->
      <!-- Start Hot -->
      <section class="section">
        <h3 class="sectionTitle mb-4 text-center">
          經典熱銷
        </h3>
        <div class="row">
          <div
            v-for="item in products.slice(0, 4)"
            :key="item.key"
            class="col-6 col-md-3 productBox"
          >
            <div
              class="card productItem"
              @click="getProduct(item.id)"
            >
              <img
                class="card-img-top"
                :src="`${item.imageUrl}`"
                :alt="`${item.title}`"
              >
              <div class="card-body p-2">
                <h5 class="card-title productItem_title mb-0">
                  {{ item.title|titleFilter }}
                </h5>
                <div class="d-flex justify-content-between align-items-end px-1">
                  <div class="price-group">
                    <div class="origin_price mb-0">
                      NT{{ item.origin_price|currency }}
                    </div>
                    <div class="final_price text-danger mb-0">
                      NT{{ item.price|currency }}
                    </div>
                  </div>
                </div>
                <!-- <div class="icon-group">
                  <i class="far fa-heart likeIcon mr-3" :class="{'fa': item.likeThis}" @click.stop="item.likeThis =! item.likeThis"></i>
                  <i class="fas fa-shopping-cart" @click.stop="addToCart(item.id, item.qty)"></i>
                </div> -->
                <ProductIcon
                  :product="products"
                  @emitDelete="deleteItem"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- End Hot -->
      <!-- Start Characters -->
      <section class="section characters">
        <h3 class="sectionTitle mb-4 text-center">
          系列角色
        </h3>
        <div class="row">
          <div class="col-6 col-md-3">
            <router-link
              to="/characters"
              class="charactersLink"
            >
              <div class="card border-0">
                <img
                  src="../../assets/images/winnie_lg.png"
                  alt=""
                  class="rounded-circle img-fluid"
                >
                <div class="card-body">
                  <h5 class="card-title text-center">
                    維尼（Winnie）
                  </h5>
                </div>
              </div>
              <button class="btn btn-danger btn-lg charactersBtn">
                看更多
              </button>
            </router-link>
          </div>
          <div class="col-6 col-md-3">
            <router-link
              to="/characters"
              class="charactersLink"
            >
              <div class="card border-0">
                <img
                  src="../../assets/images/pig_lg.png"
                  alt=""
                  class="rounded-circle img-fluid"
                >
                <div class="card-body">
                  <h5 class="card-title text-center">
                    小豬（Piglet）
                  </h5>
                </div>
              </div>
              <button class="btn btn-danger btn-lg charactersBtn">
                看更多
              </button>
            </router-link>
          </div>
          <div class="col-6 col-md-3">
            <router-link
              to="/characters"
              class="charactersLink"
            >
              <div class="card border-0">
                <img
                  src="../../assets/images/tiger_lg.png"
                  alt=""
                  class="rounded-circle img-fluid"
                >
                <div class="card-body">
                  <h5 class="card-title text-center">
                    跳跳虎（Tiger）
                  </h5>
                </div>
              </div>
              <button class="btn btn-danger btn-lg charactersBtn">
                看更多
              </button>
            </router-link>
          </div>
          <div class="col-6 col-md-3">
            <router-link
              to="/characters"
              class="charactersLink"
            >
              <div class="card border-0">
                <img
                  src="../../assets/images/eeyore_lg.png"
                  alt=""
                  class="rounded-circle img-fluid"
                >
                <div class="card-body">
                  <h5 class="card-title text-center">
                    屹耳（Eeyore）
                  </h5>
                </div>
              </div>
              <button class="btn btn-danger btn-lg charactersBtn">
                看更多
              </button>
            </router-link>
          </div>
        </div>
      </section>
      <!-- End Characters -->
      <!-- cart Icon -->
      <Cart
        :cart="carts"
        @emitDelete="deleteItem"
      />
      <!---->
    </div>
  </div>
</template>

<script>
import { Circle4 } from 'vue-loading-spinner'
import Cart from '../../components/Cart'
import ProductIcon from '../../components/ProductIcon'

export default {
  name: 'Index',
  components: {
    Circle4,
    Cart,
    ProductIcon
  },
  data () {
    return {
      products: [],
      carts: [],
      isLoading: false
    }
  },
  created () {
    this.getCart()
    this.getProducts()
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
    getProduct (id) {
      const vm = this
      vm.$router.push(`/product/${id}`)
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
        if (response.data.success) {
          vm.getCart()
          vm.isLoading = false
          vm.$bus.$emit('message:push', response.data.message, 'success')
        } else {
          vm.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    },
    deleteItem (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.isLoading = true
      vm.$http.delete(api).then((response) => {
        if (response.data.success) {
          vm.getCart()
          vm.isLoading = false
          vm.$bus.$emit('message:push', response.data.message, 'success')
        } else {
          vm.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/all.scss";

.section{
  padding-top: 80px;
  @include screen($mobile){
    padding-top: 40px;
  }
  .sectionTitle{
    font-size: 26px;
    line-height: 26px;
    font-weight: bold;
    letter-spacing: 1px;
    @include screen($mobile){
        font-size: 24px;
        line-height: 24px;
    }
  }
}
.activeBanner01,
.activeBanner02{
  width: 100%;
  height: 400px;
  @include screen($mobile){
    height: 0;
    padding-top: 78.94%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
}
.activeBanner01{
  background-image: url('../../assets/images/page_banner.jpg');
  @include screen($mobile){
    background-image: url('../../assets/images/page_banner_mo.jpg');
  }
}
.activeBanner02{
  background-image: url('../../assets/images/page_banner_2.jpg');
  @include screen($mobile){
    background-image: url('../../assets/images/page_banner_2_mo.jpg');
  }
}
.news{
  &_link,
  &_link:hover{
    text-decoration: none
  }
  &_list{
    padding: 0;
    margin: 0;
    list-style: none;
    &_item{
      line-height: 27px;
      border-bottom: 1px solid rgba(129, 129, 129, 0.5);
      font-size: 18px;
    }
  }
  &_date{
    color: $yellow;
    margin-right: 16px;
    font-weight: bold;
    @include screen($mobile){
      margin-right: 0;
      font-size: 16px;
    }
  }
  &_text{
    color: $primary;
    @include screen($mobile){
      font-size: 16px;
    }
  }
}
.productItem{
  cursor: pointer;
  &:hover{
    box-shadow: 0px 10px 15px -10px rgba(0,0,0,0.5)
  }
  &_title{
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 0.65px;
    text-align: left;
    @include screen($mobile) {
      font-size: 12px;
      line-height: 20px;
      letter-spacing: 0;
    }
  }
  .price-group .origin_price{
    font-size: 14px;
    color: grey;
    text-decoration: line-through;
  }
  .price-group .final_price{
    font-size: 16px;
    color: $danger;
  }
}
// .icon-group{
//   cursor: pointer;
//   position: absolute;
//   right: 12px;
//   bottom: 12px;
//   @include screen ($mobile) {
//     position: sticky;
//     right: 0;
//     bottom: 0;
//     display: flex;
//     justify-content: space-around;
//   }
//   i{
//     color: rgb(80, 80, 80);
//     @include screen ($mobile) {
//       width: 50%;
//       height: 45px;
//       color: #505050;
//       border-radius: 5px;
//       font-size: 26px;
//       line-height: 45px;
//       text-align: center;
//     }
//   }
//   .fa.fa-heart{
//     color: $pink;
//   }
// }
.charactersLink{
  display: block;
  width: 100%;
  height: 100%;
  transition: all .5s;
  .charactersBtn{
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
  }
  &:hover{
    text-decoration: none !important;
    .charactersBtn{
      display: block;
      z-index: 15;
    }
    &::before{
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(245, 184, 87, 0.47);
      z-index: 10;
    }
  }
}
.productBox{
  margin-bottom: 0px;
  @include screen($mobile) {
    margin-bottom: 8px;
    &:nth-child(odd){
      padding-right: 2px;
    };
    &:nth-child(even){
      padding-left: 2px;
    }
  }
}
</style>
