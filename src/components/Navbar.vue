<template>
    <div id="navbarMain">
        <vs-navbar center-collapsed>
        <template #left>
          <!-- <img src="/logo2.png" alt=""> -->
          <div id="LogoWrapper">
            <img src="@/assets/Condensed---White.png" alt="">
          </div> <span id="brandText">College Voyage</span>
        </template>
        <template #right v-if="user.id !== null">
          <vs-button flat @click="logout" >Logout</vs-button>
        </template>
      </vs-navbar>
    </div>
</template>

<script>
import firebaseApp from '@/firebase_config'
import { mapGetters } from 'vuex'
export default {
  methods: {
    logout () {
      firebaseApp.auth.signOut()
      this.$store.commit('USER_LOGOUT')
      this.$router.push({ name: 'Login' })
    }
  },
  computed: {
    ...mapGetters({
      user: 'GET_USER'
    })
  }
}
</script>

<style lang="css">
#LogoWrapper {
  filter: grayscale(100%);
  margin: 7px 0;
  cursor: pointer;
}

#LogoWrapper img {
  width: 30px;
  height: 30px;
  filter: invert(1);
}

#brandText {
  margin: 0 15px;

}

</style>
