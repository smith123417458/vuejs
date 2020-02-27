<template>
  <div class="products">
    <loading :active.sync="isLoading">
      <Circle4 />
    </loading>

    <div class="text-right mb-4">
      <button
        class="btn btn-outline-primary"
        @click.prevent="openCouponModal(true)"
      >
        <i class="fas fa-plus mr-2" />新增優惠券
      </button>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th class="text-left">
            名稱
          </th>
          <th class="text-left">
            優待碼
          </th>
          <th class="text-center">
            折扣百分比
          </th>
          <th class="text-center">
            到期日
          </th>
          <th class="text-center">
            是否啟用
          </th>
          <th class="text-center">
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in coupons"
          :key="item.id"
        >
          <td class="text-left">
            {{ item.title }}
          </td>
          <td class="text-left">
            {{ item.code }}
          </td>
          <td class="text-center">
            {{ item.percent }}%
          </td>
          <td class="text-center">
            {{ item.due_date | date }}
          </td>
          <td class="text-center">
            <span
              v-if="item.is_enabled"
              class="text-success"
            >啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td class="text-center">
            <div
              class="btn-group"
              role="group"
            >
              <button
                type="button"
                class="btn btn-outline-primary"
                @click.prevent="openCouponModal (false, item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click.prevent="openDelModal (item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Start Pagination -->
    <div
      v-if="pagination.length"
      class="d-flex justify-content-center"
    >
      <Pagination
        :pages="pagination"
        @emitPages="getCoupons"
      />
    </div>
    <!-- End Pagination -->

    <!-- Start CouponModal -->
    <div
      id="couponModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5
              id="exampleModalLabel"
              class="modal-title couponTitle"
            >
              Modal title
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input
                id="title"
                v-model="tempCoupon.title"
                type="text"
                class="form-control"
                placeholder="請輸入標題"
              >
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input
                id="coupon_code"
                v-model="tempCoupon.code"
                type="text"
                class="form-control"
                placeholder="請輸入優惠碼"
              >
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input
                id="due_date"
                v-model="due_date"
                type="date"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input
                id="price"
                v-model="tempCoupon.percent"
                type="number"
                class="form-control"
                placeholder="請輸入折扣百分比"
              >
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  id="is_enabled"
                  v-model="tempCoupon.is_enabled"
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                >
                <label
                  class="form-check-label"
                  for="is_enabled"
                >是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary addCoupon"
              @click="updateCoupon"
            >
              更新優惠券
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- End ProductModal -->

    <!-- Start DelModal -->
    <div
      id="delCouponModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5
              id="exampleModalLabel"
              class="modal-title delModalTitle"
            >
              <span>刪除產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click.prevent="delCoupon"
            >
              <i
                v-if="status.loadingItem === tempCoupon.id"
                class="fas fa-spinner fa-spin mr-2"
              />確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- End DelModal -->
  </div>
</template>
<script>
import { Circle4 } from 'vue-loading-spinner'
import Pagination from '../../components/Pagination'
import $ from 'jquery'

export default {
  name: 'Coupons',
  components: {
    Pagination,
    Circle4
  },
  data () {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        due_date: 0,
        code: ''
      },
      isNew: false,
      due_date: new Date(),
      isLoading: false,
      status: {
        loadingItem: ''
      }
    }
  },
  watch: {
    due_date () {
      const vm = this
      // 使用 new Date(vm.due_date) / 1000 將日期轉換成毫秒
      // 使用 Math.floor() 將毫秒四捨五入取整數
      const timestamp = Math.floor(new Date(vm.due_date) / 1000)
      vm.tempCoupon.due_date = timestamp
    }
  },
  created () {
    this.getCoupons()
  },
  methods: {
    getCoupons () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons`
      vm.isLoading = true
      vm.$http.get(api).then(response => {
        vm.isLoading = false
        vm.coupons = response.data.coupons
      })
    },
    openCouponModal (isNew, item) {
      const vm = this
      if (isNew) {
        vm.isNew = true
        vm.tempCoupon = {}
        $('.couponTitle').text('新增優惠券')
        $('.addCoupon').text('新增優惠券')
      } else {
        vm.isNew = false
        vm.tempCoupon = Object.assign({}, item)
        $('.couponTitle').text('編輯優惠券')
        $('.addCoupon').text('更新優惠券')
      }
      $('#couponModal').modal('show')
    },
    updateCoupon () {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
      let httpMethod = 'post'
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
        httpMethod = 'put'
      }
      vm.isLoading = true
      vm.$http[httpMethod](api, { data: vm.tempCoupon }).then(response => {
        vm.isLoading = false
        $('#couponModal').modal('hide')
        vm.getCoupons()
      })
    },
    openDelModal (item) {
      const vm = this
      vm.tempCoupon = Object.assign({}, item)
      $('.delModalTitle').text(`刪除優惠券：${vm.tempCoupon.title}`)
      $('#delCouponModal').modal('show')
    },
    delCoupon () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
      vm.status.loadingItem = vm.tempCoupon.id
      vm.$http.delete(api).then(response => {
        vm.status.loadingItem = ''
        $('#delCouponModal').modal('hide')
        vm.getCoupons()
      })
    }
  }
}
</script>
