<template>
  <div
      v-if="status"
    >
      <div
        id="LoadingMain"
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
            <img
              src="@/assets/Eclipse.svg"
              alt="Loading animation"
            >

          </vs-col>
        </vs-row>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    status: {
      type: Boolean,
      default: false
    }
  }

}
</script>

<style>
#LoadingMain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  z-index: 10;
}
</style>
