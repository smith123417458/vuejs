<template>
  <div class="w-100">
    <loading :active.sync="isLoading">
      <Circle4 />
    </loading>
    <!-- Start Content -->
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="row">
            <div class="col-md-4 mb-2 mb-md-4">
              <div class="step active rounded">
                資料填寫
              </div>
            </div>
            <div class="col-md-4 mb-2 mb-md-4">
              <div class="step rounded">
                確認訂單
              </div>
            </div>
            <div class="col-md-4 mb-2 mb-md-4">
              <div class="step rounded">
                完成
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <div class="row mb-4">
            <div class="col-12">
              <div id="accordion">
                <div class="card">
                  <button
                    id="headingOne"
                    class="card-header btn btn-link d-flex justify-content-between"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <h5 class="mb-0">
                      購物車清單
                    </h5>
                    <div class="totalPrice">
                      {{ cart.final_total|currency }}
                    </div>
                  </button>
                  <div
                    id="collapseOne"
                    class="collapse"
                    aria-labelledby="headingOne"
                    data-parent="#accordion"
                  >
                    <div class="card-body p-0">
                      <table class="table mb-0">
                        <thead>
                          <tr>
                            <th width="20%" />
                            <th
                              width="40%"
                              class="text-left"
                            >
                              產品名稱
                            </th>
                            <th class="text-center">
                              單位
                            </th>
                            <th class="text-right">
                              價格
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="item in cart.carts"
                            :key="item.id"
                          >
                            <td>
                              <img
                                :src="`${item.product.imageUrl}`"
                                :alt="`${ item.product.title }`"
                                class="img img-fluid cartImg"
                              >
                            </td>
                            <td class="text-left">
                              {{ item.product.title }}
                              <div
                                v-if="item.coupon"
                                class="text-success"
                              >
                                已套用優惠券
                              </div>
                            </td>
                            <td class="text-center">
                              {{ item.qty }}/{{ item.product.unit }}
                            </td>
                            <td class="text-right">
                              {{ item.final_total }}
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td
                              colspan="3"
                              class="text-right"
                            >
                              合計：
                            </td>
                            <td class="text-right">
                              {{ cart.total|currency }}
                            </td>
                          </tr>
                          <tr v-if="cart.final_total !== cart.total">
                            <td
                              colspan="3"
                              class="text-right text-success"
                            >
                              折扣價
                            </td>
                            <td class="text-right text-success">
                              {{ cart.final_total|currency }}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="input-group mt-4" v-if="form.user.email">
                  <input
                    v-model="coupon_code"
                    type="text"
                    class="form-control"
                    placeholder="輸入優惠代碼"
                  >
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      @click="addCouponCode"
                    >
                      輸入優惠碼
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-12">
              <form @submit.prevent="createOrder">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    id="email"
                    v-model="form.user.email"
                    v-validate="'required|email'"
                    type="email"
                    class="form-control"
                    name="email"
                    placeholder="請輸入 Email(必填)"
                  >
                  <span
                    v-if="errors.has('email')"
                    class="text-danger"
                  >{{ errors.first('email') }}</span>
                </div>
                <div class="form-group">
                  <label for="userName">收件人姓名</label>
                  <input
                    id="userName"
                    v-model="form.user.name"
                    v-validate="'required'"
                    type="text"
                    class="form-control"
                    :class="{'is-invalid' : errors.has('name')}"
                    name="name"
                    placeholder="請輸入姓名(必填)"
                  >
                  <span
                    v-if="errors.has('name')"
                    class="text-danger"
                  >姓名必須輸入</span>
                </div>
                <div class="form-group">
                  <label for="userTel">收件人電話</label>
                  <input
                    id="userTel"
                    v-model="form.user.tel"
                    v-validate="'required'"
                    type="tel"
                    class="form-control"
                    :class="{'is-invalid' : errors.has('tel')}"
                    name="tel"
                    placeholder="請輸入電話(必填)"
                  >
                  <span
                    v-if="errors.has('tel')"
                    class="text-danger"
                  >電話必須輸入</span>
                </div>
                <div class="form-group">
                  <label for="userAdd">收件人地址</label>
                  <input
                    id="userAdd"
                    v-model="form.user.address"
                    v-validate="'required'"
                    type="text"
                    class="form-control"
                    :class="{'is-invalid' : errors.has('address')}"
                    name="address"
                    placeholder="請輸入地址(必填)"
                  >
                  <span
                    v-if="errors.has('address')"
                    class="text-danger"
                  >地址欄位不得留空</span>
                </div>
                <div class="form-group">
                  <label for="comment">留言</label>
                  <textarea
                    id="comment"
                    v-model="form.message"
                    class="form-control"
                    rows="10"
                  />
                </div>
                <div class="text-center">
                  <router-link
                    to="/products"
                    class="btn btn-secondary mr-4"
                  >
                    繼續購物
                  </router-link>
                  <button
                    type="submit"
                    class="btn btn-primary"
                  >
                    送出訂單
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Content -->
  </div>
</template>

<script>
import { Circle4 } from 'vue-loading-spinner'

export default {
  name: 'Checkuot',
  components: {
    Circle4
  },
  data () {
    return {
      cart: {},
      isLoading: false,
      finalTotal: 0,
      coupon_code: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  created () {
    this.getCart()
  },
  methods: {
    getCart () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true
      vm.$http.get(api).then(response => {
        vm.isLoading = false
        vm.cart = response.data.data
        vm.finalTotal = response.data.data.final_total
      })
    },
    addCouponCode () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: vm.coupon_code
      }
      vm.isLoading = true
      vm.$http.post(api, { data: coupon }).then(response => {
        if (response.data.success) {
          vm.getCart()
          vm.isLoading = false
        } else {
          vm.$bus.$emit('message:push', response.data.message, 'danger')
          vm.isLoading = false
        }
      })
    },
    createOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      const order = vm.form
      vm.isLoading = true
      vm.$validator.validate().then(result => {
        if (result) {
          vm.$http.post(api, { data: order }).then(response => {
            if (response.data.success) {
              vm.$router.push(`/checkout/${response.data.orderId}`)
            }
            vm.isLoading = false
          })
        } else {
          vm.isLoading = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/all.scss";

.step {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: $primary;
  border: 1px solid $primary;
  &.active {
    background-color: $primary;
    color: white;
  }
}
#accordion {
  width: 100%;
  .btn-link,
  .btn-link:hover {
    text-decoration: none;
  }
  .totalPrice {
    font-weight: bold;
  }
}
textarea {
  resize: none;
}
</style>
