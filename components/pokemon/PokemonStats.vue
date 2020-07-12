<template>
  <ul class="stats-list">
    <li v-for="stats in statsList" :key="stats.stat.name">
      <label
        ><span>{{ stats.stat.name.toUpperCase() }}</span
        ><span>{{ stats.base_stat }}</span></label
      >
      <b-progress :max="maxstatus" :striped="striped">
        <b-progress-bar
          :value="stats.base_stat"
          :variant="getVariant(stats.base_stat)"
        ></b-progress-bar>
      </b-progress>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    statsList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      striped: true,
      maxstatus: 100,
    }
  },
  methods: {
    getVariant(variant) {
      const _variant = Number(variant)

      if (_variant <= 33) {
        return 'danger'
      } else if (_variant > 33 && _variant <= 66) {
        return 'warning'
      }

      return 'success'
    },
  },
}
</script>

<style lang="scss" scoped>
.stats-list {
  list-style: none !important;
  margin: 0;
  padding: 0;

  li {
    display: inline-block;
    width: 50%;

    &:nth-child(1),
    &:nth-child(3),
    &:nth-child(5) {
      padding-right: 1.5rem;
      box-sizing: border-box;
    }

    label {
      display: flex;
      justify-content: space-between;
      color: gray;

      span {
        font-weight: 700;
        &:first-child {
          font-weight: 400;
        }
      }
    }
  }
}
</style>
