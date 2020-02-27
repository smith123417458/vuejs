<template>
  <div class="products">
    <loading :active.sync="isLoading">
      <Circle4 />
    </loading>

    <div class="text-right mb-4">
      <button
        class="btn btn-outline-primary"
        @click.prevent="openModal(true)"
      >
        <i class="fas fa-plus mr-2" />新增產品
      </button>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th
            class="text-left"
            width="120"
          >
            分類
          </th>
          <th class="text-left">
            產品名稱
          </th>
          <th
            class="text-center"
            width="100"
          >
            原價
          </th>
          <th
            class="text-center"
            width="100"
          >
            網路價
          </th>
          <th
            class="text-center"
            width="100"
          >
            是否販售
          </th>
          <th
            class="text-center"
            width="150"
          >
            編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in products"
          :key="item.id"
        >
          <td class="text-left">
            {{ item.category }}
          </td>
          <td class="text-left">
            {{ item.title }}
          </td>
          <td class="text-right">
            {{ item.origin_price | currency }}
          </td>
          <td class="text-right">
            {{ item.price | currency }}
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
              aria-label="Basic example"
            >
              <button
                type="button"
                class="btn btn-outline-primary"
                @click.prevent="openModal(false, item)"
              >
                <i class="fas fa-pencil-alt" />
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click.prevent="delModal(item)"
              >
                <i class="fas fa-trash-alt" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Start Pagination -->
    <div class="d-flex justify-content-center">
      <Pagination
        :pages="pagination"
        @emitPages="getProducts"
      />
    </div>
    <!-- End Pagination -->

    <!-- Start ProductModal -->
    <div
      id="productModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-lg"
        role="document"
      >
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5
              id="productModalLabel"
              class="modal-title editModalTitle"
            >
              <span>新增產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <i
                class="far fa-times-circle text-white"
                aria-hidden="true"
              />
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    id="image"
                    v-model="tempProduct.imageUrl"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                  >
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i
                      v-if="status.fileUploading"
                      class="fas fa-spinner fa-spin"
                    />
                  </label>
                  <input
                    id="customFile"
                    ref="files"
                    type="file"
                    class="form-control"
                    @change="uploadFile"
                  >
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  alt
                  :src="tempProduct.imageUrl"
                >
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    id="title"
                    v-model="tempProduct.title"
                    type="text"
                    class="form-control"
                    placeholder="請輸入標題"
                  >
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      id="category"
                      v-model="tempProduct.category"
                      type="text"
                      class="form-control"
                      placeholder="請輸入分類"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      id="unit"
                      v-model="tempProduct.unit"
                      type="unit"
                      class="form-control"
                      placeholder="請輸入單位"
                    >
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      type="number"
                      class="form-control"
                      placeholder="請輸入原價"
                    >
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      id="price"
                      v-model="tempProduct.price"
                      type="number"
                      class="form-control"
                      placeholder="請輸入售價"
                    >
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    id="description"
                    v-model="tempProduct.discription"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產品描述"
                  />
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    id="content"
                    v-model="tempProduct.content"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產品說明內容"
                  />
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
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
            </div>
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
              class="btn btn-primary"
              @click="updateProduct"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- End ProductModal -->

    <!-- Start DelModal -->
    <div
      id="delProductModal"
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
              <i
                class="far fa-times-circle text-white"
                aria-hidden="true"
              />
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
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
              @click.prevent="delProduct"
            >
              <i
                v-if="status.loadingItem === tempProduct.id"
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
  name: 'Products',
  components: {
    Pagination,
    Circle4
  },
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false,
        loadingItem: ''
      }
    }
  },
  created () {
    this.getProducts()
  },
  methods: {
    getProducts (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`
      vm.isLoading = true
      vm.$http.get(api).then(response => {
        vm.isLoading = false
        vm.products = response.data.products
        vm.pagination = response.data.pagination
      })
    },
    openModal (isNew, item) {
      const vm = this
      if (isNew) {
        vm.isNew = true
        vm.tempProduct = {}
      } else {
        vm.isNew = false
        vm.tempProduct = Object.assign({}, item)
        $('.editModalTitle').text(`編輯產品: ${vm.tempProduct.title}`)
      }
      $('#productModal').modal('show')
    },
    updateProduct () {
      const vm = this
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      let httpMethod = 'post'
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
        httpMethod = 'put'
      }
      vm.$http[httpMethod](api, { data: vm.tempProduct }).then(response => {
        if (response.data.success) {
          $('#productModal').modal('hide')
          vm.getProducts()
        } else {
          $('#productModal').modal('hide')
        }
      })
    },
    uploadFile () {
      const vm = this
      const uploadedFile = this.$refs.files.files[0]
      const formData = new FormData()
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      // 使用 FormData 來傳送資料到後端
      formData.append('file-to-upload', uploadedFile)
      vm.status.fileUploading = true
      vm.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        if (response.data.success) {
          vm.status.fileUploading = false
          // 透過 $set(寫入的目標, key值, 寫入的資料) 指令，將欄位名稱強制寫入
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
        } else {
          // 透過 $bus.$emit() 指令，跳出提示視窗
          vm.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    },
    delModal (item) {
      const vm = this
      vm.tempProduct = Object.assign({}, item)
      $('#delProductModal').modal('show')
    },
    delProduct () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
      vm.status.loadingItem = vm.tempProduct.id
      vm.$http.delete(api).then(response => {
        $('#delProductModal').modal('hide')
        vm.status.loadingItem = ''
        vm.getProducts()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
textarea {
  resize : none;
}
</style>
