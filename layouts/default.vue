<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light" fixed="sticky">
      <b-navbar-brand href="#">Pokedex Challenge</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    </b-navbar>
    <div class="content">
      <loading v-if="loading" />
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: this.$nuxt.loading,
    }
  },
  mounted() {
    console.log(this.loading)
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

:root {
  --type-bug-color: #a9b821;
  --type-dark-color: #444;
  --type-dragon-color: #7038f9;
  --type-electric-color: #f8d030;
  --type-fairy-color: #f7c9e3;
  --type-fighting-color: #c03028;
  --type-fire-color: #f07f31;
  --type-flying-color: #a98ff0;
  --type-ghost-color: #705798;
  --type-grass-color: #78c84f;
  --type-ground-color: #e0c069;
  --type-ice-color: #9ad7d8;
  --type-normal-color: #dfdfdf;
  --type-poison-color: #a140a1;
  --type-psychic-color: #f95788;
  --type-rock-color: #b7a038;
  --type-steel-color: #b8b8d0;
  --type-water-color: #6890f0;
}

html,
body {
  font-family: 'Roboto Mono', monospace;
  font-size: 16px;
  font-weight: 700;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  overflow: hidden;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.content {
  width: 100vw;
  height: 100vh;
  display: flex;
  padding-bottom: 1rem;

  &::after {
    content: '';
    background: url('https://i.pinimg.com/originals/df/4e/8b/df4e8ba28f912bf9cdf9fa0dfc196411.png');
    opacity: 0.7;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }
}

@font-face {
  font-family: 'pokeicons';
  src: url('/fonts/icomoon.eot') /*Para navegadores Internet Explorer*/;
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'pokeicons';
  src: url('/fonts/icomoon.ttf') /*Para os demais navegadores*/;
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'pokeicons';
  src: url('/fonts/icomoon.woff') /*Para navegadores Internet Explorer*/;
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'pokeicons';
  src: url('/fonts/icomoon.woff') /*Para os demais navegadores*/;
  font-weight: normal;
  font-style: normal;
}

/* TAG TYPE COLORS */
.bug {
  background: var(--type-bug-color);
}
.dark {
  background: var(--type-dark-color);
}
.dragon {
  background: var(--type-dragon-color);
}
.electric {
  background: var(--type-electric-color);
}
.fairy {
  background: var(--type-fairy-color);
}
.fighting {
  background: var(--type-fighting-color);
}
.fire {
  background: var(--type-fire-color);
}
.flying {
  background: var(--type-flying-color);
}
.ghost {
  background: var(--type-ghost-color);
}
.grass {
  background: var(--type-grass-color);
}
.ground {
  background: var(--type-ground-color);
}
.ice {
  background: var(--type-ice-color);
}
.normal {
  background: var(--type-normal-color);
  color: #444;
}
.poison {
  background: var(--type-poison-color);
}
.psychic {
  background: var(--type-psychic-color);
}
.rock {
  background: var(--type-rock-color);
}
.steel {
  background: var(--type-steel-color);
}
.water {
  background: var(--type-water-color);
}
</style>
