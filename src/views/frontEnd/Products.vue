<template>
  <div class="mainContent w-100">
    <loading :active.sync="isLoading">
      <Circle4 />
    </loading>
    <!-- Start Content -->
    <div class="container">
      <div class="pageFullBanner mb-2" />
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
            {{ breadcrumbName }}
          </li>
        </ol>
      </nav>
      <div class="row">
        <!-- Categories -->
        <div class="col-md-2 mb-4 mb-md-0 d-none d-md-block">
          <div class="row">
            <div class="col">
              <div class="card selectCategory">
                <ul class="list-group list-group-flush">
                  <li
                    class="list-group-item categoryItem"
                    :class="{active:currentCategory === ''}"
                    @click="currentCategory = ''"
                  >
                    全部
                  </li>
                  <li
                    v-for="item in categories"
                    :key="item"
                    class="list-group-item categoryItem"
                    :class="{active:currentCategory === item}"
                    @click="currentCategory = item"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-2 mb-4 mb-md-0 d-block d-md-none">
          <div class="row">
            <div class="col">
              <div class="form-group mb-0">
                <select
                  id="selectMobile"
                  v-model="currentCategory"
                  class="form-control"
                >
                  <option value="">
                    全部
                  </option>
                  <option
                    v-for="item in categories"
                    :key="item"
                    :value="`${item}`"
                  >
                    {{ item }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <!---->
        <!-- Products Item + Pagination -->
        <div class="col-md-10">
          <div class="row">
            <div
              v-for="item in filterData[currentPage]"
              :key="item.id"
              class="col-6 col-md-3 mb-2 mb-md-4 productBox"
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
                  <div class="icon-group">
                    <i
                      class="far fa-heart likeIcon mr-3"
                      :class="{'fa': item.likeThis}"
                      @click.stop="item.likeThis =! item.likeThis"
                    />
                    <i
                      class="fas fa-shopping-cart"
                      @click.stop="addToCart(item.id, item.qty)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="filterData.length >= 2"
            class="row mb-4 justify-content-center"
          >
            <nav aria-label="Page navigation example">
              <ul class="pagination m-0">
                <li
                  class="page-item"
                  :class="{'disabled':currentPage === 0}"
                >
                  <a
                    class="page-link"
                    href="#"
                    aria-label="Previous"
                    @click.prevent="currentPage = currentPage - 1"
                  >
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                  </a>
                </li>
                <li
                  v-for="page in filterData.length"
                  :key="page"
                  class="page-item"
                  :class="{active:currentPage === page-1}"
                >
                  <a
                    class="page-link"
                    href="#"
                    @click.prevent="currentPage = page - 1"
                  >{{ page }}</a>
                </li>
                <li class="page-item">
                  <a
                    class="page-link"
                    href="#"
                    aria-label="Next"
                    @click.prevent="currentPage = currentPage + 1"
                  >
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <!---->
      </div>
      <!-- cart Icon -->
      <Cart
        :cart="carts"
        @emitDelete="deleteItem"
      />
      <!---->
    </div>
    <!-- End Content -->
  </div>
</template>

<script>
import { Circle4 } from 'vue-loading-spinner'
import Cart from '../../components/Cart'

export default {
  name: 'Products',
  components: {
    Circle4,
    Cart
  },
  data () {
    return {
      breadcrumbName: '相關產品',
      products: [],
      categories: [],
      currentCategory: '',
      currentPage: 0,
      carts: [],
      isLoading: false
    }
  },
  computed: {
    filterData () {
      const vm = this
      // step1. 先過濾出要的資料
      let items = []
      vm.currentPage = 0
      if (vm.currentCategory !== '') {
        items = vm.products.filter((item, i) => {
          return item.category === vm.currentCategory
        })
      } else {
        items = vm.products
      }
      // step2. 依照過濾出的資料做分頁
      // 分頁要點1: 總共有幾頁
      // 分頁要點2: 每頁的內容
      // 分頁要點3: 組成二維陣列 [[1...],[2...],[3...]]
      const newProducts = []
      items.forEach((item, i) => {
        if (i % 12 === 0) {
          newProducts.push([])
        }
        const page = parseInt(i / 12)
        newProducts[page].push(item)
      })
      return newProducts
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  },
  methods: {
    getProducts () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        vm.products = response.data.products
        vm.products.forEach(item => {
          vm.$set(item, 'likeThis', false)
        })
        vm.getCategory()
        vm.isLoading = false
      })
    },
    getCategory () {
      const vm = this
      // Set() 為 ES6 語法，同 const categories = []
      const categories = new Set()
      vm.products.forEach((item) => {
        // Set() 下以 add() 取代 push()
        categories.add(item.category)
      })
      // 將類陣列轉換為陣列在回存到 categories 內
      vm.categories = Array.from(categories)
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

.pageFullBanner{
  background-image: url('../../assets/images/page_productsBanner.jpg');
  @include screen($mobile){
    background-image: url('../../assets/images/page_productsBanner_mo.jpg');
  }
}
.carousel-indicators{
  li{
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
}
.breadcrumb-link:focus,
.breadcrumb-link:hover,
.breadcrumb-link:active{
  text-decoration: none;
}
.selectCategory{
  cursor: pointer;
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
      line-height: 1.5;
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
.icon-group{
  cursor: pointer;
  position: absolute;
  right: 12px;
  bottom: 12px;
  @include screen ($mobile) {
    position: static;
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
