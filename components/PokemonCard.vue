<template>
  <b-card
    :title="pokemon.name"
    :img-src="pokemon.sprites.front_default"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem;"
    class="m-2 pokemon--card"
  >
    <span id="pokemon--number">{{ number }}</span>
    <b-card-text>
      <div class="specs">
        <p>
          weight: <strong>{{ pokemon.weight }}KG</strong>
        </p>
        <p>
          height:
          <strong>{{ pokemon.height }}M</strong>
        </p>
      </div>
      <p class="poke-types">
        <span
          v-for="type in pokemon.types"
          :key="type.type.name"
          :class="'type ' + type.type.name"
          >{{ type.type.name }}</span
        >
      </p>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pokemon: this.details,
    }
  },
  computed: {
    number() {
      const id = Number(this.pokemon.id)

      if (id < 10) {
        return `#00${id}`
      } else if (id < 100) {
        return `#0${id}`
      }

      return String(`#${id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.pokeWrapper {
  display: flex;
}

.pokeWrapper img {
  max-height: 35px;
}

.pokeWrapper a {
  width: 100%;
  display: block;
  text-decoration: none;
  color: gray;
}

.pokemon--card {
  box-shadow: 5px 5px 0 0 #00000014;
  min-width: 200px;
  min-height: 200px;
  transition: all 0.2s;
  cursor: pointer;
  position: relative;

  img {
    max-width: 10rem;
    margin: 0 auto;
    margin-top: 0.5rem;
  }

  #pokemon--number {
    display: block;
    position: absolute;
    top: 5px;
    left: 10px;
  }

  &:hover {
    background: #dedede;
  }
}

.specs {
  font-size: 11px;
  color: gray;

  p {
    line-height: 0.5rem;
    margin-bottom: 0.5rem;

    strong {
      font-weight: bold;
    }
  }
}

.type {
  padding: 0.2rem 0.5rem;
  color: white;
  border-radius: 0.2rem;
  margin-right: 0.2rem;
  font-size: 11px;
  font-weight: bold;
}
</style>
