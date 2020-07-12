<template>
  <div>{{ name }}</div>
</template>

<script>
export default {
  validate({ params }) {
    return true
  },
  data() {
    return {
      name: this.$route.params.name,
    }
  },
  transition: {
    css: false,
    enter(el, done) {
      console.log(el, done)
    },
  },
}
</script>
