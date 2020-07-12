<template>
  <div v-if="loading || $store.loading" class="loading">
    <img
      class="rotating"
      src="https://img.icons8.com/color/96/000000/pokeball--v1.png"
    />
    <span>Loading...</span>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background: #ffffff87;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
}

.loading span {
  color: black;
  font-size: 1.4em;
  line-height: 1.4em;
}

@-webkit-keyframes rotating {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.rotating {
  -webkit-animation: rotating 2s linear infinite;
  -moz-animation: rotating 2s linear infinite;
  -ms-animation: rotating 2s linear infinite;
  -o-animation: rotating 2s linear infinite;
  animation: rotating 2s linear infinite;
}
</style>
