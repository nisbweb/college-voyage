<template>
  <div id="LobbyMain">
      <div
      class=""
      style="margin-top: 44px"
    >
      <div
        class="grid"
      >
        <vs-row
          class="flex-Center h-100"
          align="center"
          justify="center"
        >
          <vs-col
            w="6"
            vs-type="flex"
            justify="center"
            align="center"
            class="form"
          >
          <div id="ImageWrapper">
            <img src="@/assets/timepass.svg" alt="Waiting illustration">
          </div>
            <h4>The event will start Shortly. Please be patient.</h4>

          </vs-col>
        </vs-row>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from '@/firebase_config'

export default {
  mounted () {
    firebaseApp.db.collection('admin').doc('actual').onSnapshot((snapshot) => {
      const adminDoc = snapshot.data()
      if (adminDoc.started === true) {
        setTimeout(() => {
          this.$router.push({ name: 'Home' })
        }, 2000)
      }
    })
  }
}
</script>

<style scoped>
#ImageWrapper {
  padding: 0 2rem;
}
#ImageWrapper img {
  width: 100%;
}
</style>
