<template>
  <div class="dashboard">
    <Header />
    <Alert />
    <div class="container">
      <div class="row">
        <router-view />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Alert from '../../components/AlertMessage'

export default {
  name: 'FrontEnd',
  components: {
    Header,
    Footer,
    Alert
  }
}
</script>
