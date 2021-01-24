<template>
  <div id="app">
    <Navbar />
    <Loading :status="loadingState" />
    <router-view style="margin-top: 44px" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Loading from '@/components/Loading.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Navbar,
    Loading
  },
  computed: {
    ...mapGetters({
      loadingState: 'GET_LOADING'
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.h-100 {
  height: calc(100vh - 70px);
  /* width: 100%; */
}
</style>
