<template>
  <div class="w-100">
    <loading :active.sync="isLoading">
      <Circle4 />
    </loading>
    <!-- Start Content -->
    <div class="container">
      <div class="row mb-5">
        <div class="col-md-6 offset-md-3">
          <div class="row">
            <div class="col-md-4 mb-2 mb-md-4">
              <div class="step rounded">
                資料填寫
              </div>
            </div>
            <div class="col-md-4 mb-2 mb-md-4">
              <div class="step active rounded">
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
          <form @submit.prevent="payOrder">
            <table class="table mb-5">
              <thead>
                <tr>
                  <td class="text-left">
                    品名
                  </td>
                  <td
                    width="20%"
                    class="text-center"
                  >
                    數量
                  </td>
                  <td
                    width="30%"
                    class="text-center"
                  >
                    單價
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in order.products"
                  :key="item.id"
                >
                  <td class="text-left">
                    {{ item.product.title }}
                  </td>
                  <td class="text-center">
                    {{ item.qty }}/{{ item.product.unit }}
                  </td>
                  <td class="text-right">
                    {{ item.final_total | currency }}
                  </td>
                </tr>
                <tr>
                  <td
                    colspan="2"
                    class="text-right checkoutFinalTotal"
                  >
                    總計
                  </td>
                  <td class="text-right checkoutFinalTotal">
                    {{ order.total | currency }}
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="table mb-5">
              <tr>
                <td
                  colspan="2"
                  class="text-center border-0 memberTitle"
                >
                  會員資料核對
                </td>
              </tr>
              <tr>
                <td width="25%">
                  Email
                </td>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <td width="25%">
                  姓名
                </td>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <td width="25%">
                  電話
                </td>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <td width="25%">
                  地址
                </td>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <td width="25%">
                  付款狀態
                </td>
                <td>
                  <span v-if="!order.is_paid">尚未付款</span>
                  <span
                    v-else
                    class="text-success"
                  >付款完成</span>
                </td>
              </tr>
            </table>
            <div class="text-right">
              <button
                v-if="order.is_paid === false"
                type="submit"
                class="btn btn-danger mb-4"
              >
                確認付款去
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- End Content -->
  </div>
</template>

<script>
import { Circle4 } from 'vue-loading-spinner'

export default {
  name: 'CustomerCheckuot',
  components: {
    Circle4
  },
  data () {
    return {
      isLoading: false,
      order: {
        user: {}
      },
      orderId: ''
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  },
  methods: {
    getOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        vm.order = response.data.order
        vm.isLoading = false
      })
    },
    payOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`
      vm.isLoading = true
      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.$router.push(`/payment_success/${vm.orderId}`)
        } else {
          vm.$bus.$emit('message:push', response.data.message, 'danger')
        }
        vm.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/all.scss";

.step{
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: $primary;
    border: 1px solid $primary;
    &.active{
        background-color: $primary;
        color: white
    }
}
#accordion{
    width: 100%;
    .btn-link,
    .btn-link:hover{
        text-decoration: none;
    }
    .totalPrice{
        font-weight: bold;
    }
}
textarea{
  resize: none;
}
.checkoutFinalTotal{
  font-size: 24px;
  line-height: 24px;
  font-weight: bold;
  color: $danger;
}
.memberTitle{
  font-size: 26px;
  line-height: 26px;
  font-weight: bold;
  color: $black;
}
</style>
