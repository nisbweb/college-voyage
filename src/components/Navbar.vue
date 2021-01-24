<template>
    <div id="navbarMain">
        <vs-navbar center-collapsed>
        <template #left>
          <!-- <img src="/logo2.png" alt=""> -->
          <div id="LogoWrapper">
            <img src="@/assets/Condensed---White.png" alt="">
          </div> <span id="brandText">College Voyage</span>
        </template>
        <template #right>
          <vs-button flat >Login</vs-button>
          <vs-button>Get Started</vs-button>
        </template>
      </vs-navbar>
    </div>
</template>

<script>
export default {

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
