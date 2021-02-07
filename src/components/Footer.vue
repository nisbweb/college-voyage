<template>
  <div id="FooterMain" style="cursor: pointer;" @click="OpenNISB">
      Made with 🧠 by <span class="InstagramTag">@NISB</span>
  </div>
</template>

<script>
export default {
  methods: {
    OpenNISB () {
      window.open('https://www.nisb.in', '_blank')
    }
  }
}
</script>

<style>

</style>
