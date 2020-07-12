<template>
  <div class="pokemon--description">
    <p class="pokemon--versions">
      Version: &nbsp;
      <span
        v-for="version in versions"
        :key="version.version.name"
        :class="version.version.name === selected && `active`"
      >
        <a
          :class="`pokeball-icon ${version.version.name}`"
          @click="selectVersion(version.version.name)"
        ></a>
      </span>
    </p>
    <div class="pokemon--description--content">
      {{ description }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    flavorTexts: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      versionsAllowed: ['blue', 'red', 'yellow'],
      selected: 'red',
    }
  },
  computed: {
    versions() {
      return this.flavorTexts
        .filter((x) => x.language.name === 'en')
        .filter((x) => this.versionsAllowed.includes(x.version.name))
    },
    description() {
      return this.versions.filter((x) => x.version.name === this.selected)[0]
        .flavor_text
    },
  },
  methods: {
    selectVersion(version) {
      this.selected = version
    },
  },
}
</script>

<style lang="scss" scoped>
.pokemon--description {
  display: flex;
  flex-direction: column;
  font-weight: 300;

  .pokemon--versions {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    span {
      border-bottom: 3px dashed transparent;
      margin-right: 0.5rem;

      &.active {
        border-bottom: 4px dashed rgba(0, 0, 0, 0.377);
      }

      a {
        cursor: pointer;

        &::before {
          font-family: 'pokeicons', sans-serif;
          content: '\e900';
          font-size: 30px;
        }

        &.blue {
          &::before {
            color: #6890f0;
          }
        }

        &.red {
          &::before {
            color: #c03028;
          }
        }

        &.yellow {
          &::before {
            color: #f8d030;
          }
        }
      }
    }
  }

  .pokemon--description--content {
    font-weight: 600;
    border: 2px dashed #0003;
    padding: 0.5rem;
    transition: 1s all;
  }
}
</style>
