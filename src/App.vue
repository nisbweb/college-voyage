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

.questionHeader {
  display: inline-block;
  background-color: rgba(255,255,255, 0.8);
  padding: 4px 12px;
  border-radius: 9px;
  margin: 5px 0;
  box-shadow: 0px 0px 8px rgb(100 100 100 / 20%);
}
.questionHeader h2 {
  margin: 0;
  /* background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%); */
  background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 0%, #fd5949 35%, #d6249f 100%);
  -webkit-background-clip: text;
          /* Also define standard property for compatibility */
          background-clip: text;
  -webkit-text-fill-color: transparent;
}
.h-100 {
  height: calc(100vh - 70px);
  /* width: 100%; */
}
</style>
