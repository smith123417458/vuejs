<template>
  <div class="login">
    <loading :active.sync="isLoading">
      <Circle4 />
    </loading>

    <div class="signin-bg">
      <form
        class="form-signin"
        @submit.prevent="signin"
      >
        <img
          class="mb-3 logo"
          src="../../assets/images/logo.svg"
          alt="logo"
          width="100"
          height="100"
        >
        <h1 class="h3 mb-3 font-weight-normal text-center">
          登入
        </h1>
        <label
          for="inputEmail"
          class="sr-only"
        >帳號</label>
        <input
          id="inputEmail"
          v-model="user.username"
          type="email"
          class="form-control"
          placeholder="請輸入帳號"
          required
          autofocus
        >
        <label
          for="inputPassword"
          class="sr-only"
        >密碼</label>
        <input
          id="inputPassword"
          v-model="user.password"
          type="password"
          class="form-control"
          placeholder="請輸入密碼"
          required
        >
        <button
          class="btn btn-lg btn-primary btn-block"
          type="submit"
        >
          登入
        </button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/all.scss";
.login {
  width: 100%;
  height: 100vh;
  background-color: $primary;
}
.signin-bg {
  width: 100%;
  max-width: 330px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &::after {
    content: "";
    display: block;
    width: 100px;
    height: 100px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background-image: url("../../assets/images/loginWinnie.svg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center top;
    opacity: 1;
    transition: all 0.3s;
    z-index: -10;
  }
  &:hover {
    &:after {
      top: -100px;
      opacity: 1;
    }
  }
}
.form-signin {
  padding: 15px;
  margin: auto;
  border-radius: 20px;
  background-color: #fff;
  transition: all 0.3s;
  .logo {
    display: block;
    margin: 0 auto;
  }
  h1 {
    color: $primary;
  }
  .checkbox {
    font-weight: 400;
  }
  .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
  .form-control:focus {
    z-index: 2;
  }
  input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
  &:hover {
    box-shadow: 0px 15px 10px -10px darken($primary, 20);
    transition: all 0.3s;
  }
  input:focus {
    &:before {
      top: -100px;
      opacity: 1;
      transition: all 0.3s;
    }
  }
}
</style>

<script>
import { Circle4 } from 'vue-loading-spinner'

export default {
  name: 'Login',
  components: {
    Circle4
  },
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    signin () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      vm.isLoading = true
      vm.$http.post(api, vm.user).then(response => {
        vm.isLoading = false
        if (response.data.success) {
          vm.$router.push('/admin/productsList')
        }
      })
    }
  }
}
</script>
