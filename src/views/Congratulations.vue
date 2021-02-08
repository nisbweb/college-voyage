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
            <img src="@/assets/beer.svg" alt="Waiting illustration">
          </div>
            <h4>Congratulations on completing college voyage 🎉.</h4>

          </vs-col>
        </vs-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    setTimeout(() => {
      this.$router.push({ name: 'Leaderboard' })
    }, 7000)
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
