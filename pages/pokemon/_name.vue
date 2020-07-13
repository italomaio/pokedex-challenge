<template>
  <div class="wrapper">
    <div class="toolbar">
      <div class="toolbar--tools">
        <div></div>
        <div class="toolbar--buttons">
          <b-button variant="outline-primary" @click="backToList()"
            >Back to list</b-button
          >
        </div>
      </div>
    </div>
    <div class="page">
      <div class="page--content">
        <b-card tag="article" class="mb-2 card">
          <b-card-text>
            <div class="pokemon--details">
              <div class="top--details">
                <section class="left--section">
                  <div class="image-wrapper">
                    <img
                      :src="`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`"
                    />
                  </div>

                  <pokemon-description
                    :flavor-texts="pokemon.description.flavor_text_entries"
                  ></pokemon-description>
                </section>
                <section class="right--section">
                  <h1>
                    <span class="pokemon-number">{{ number }}</span>
                    {{
                      pokemon.name.charAt(0).toUpperCase() +
                      pokemon.name.slice(1)
                    }}
                  </h1>
                  <h4 class="pokemon-habitat">
                    Habitat: <span>{{ pokemon.description.habitat.name }}</span>
                  </h4>
                  <section class="pokemon--section pokemon-types">
                    <h4>Type:</h4>
                    <p>
                      <span
                        v-for="type in pokemon.types"
                        :key="type.type.name"
                        :class="'type ' + type.type.name"
                        >{{ type.type.name }}</span
                      >
                    </p>
                  </section>
                  <section class="pokemon--section pokemon-stats">
                    <h4>Stats:</h4>
                    <pokemon-stats :stats-list="pokemon.stats"></pokemon-stats>
                  </section>
                </section>
              </div>
              <div class="rest--details">
                <pokemon-games-section
                  :games="pokemon.game_indices"
                ></pokemon-games-section>
                <pokemon-location-section
                  :location-url="pokemon.location_area_encounters"
                ></pokemon-location-section>
              </div>
            </div>
          </b-card-text>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ $axios, route }) {
    return new Promise((resolve) => {
      async function searchPokemonDetails() {
        const { data, status } = await $axios.get(
          `/pokemon/${route.params.name}`
        )

        if (data && status === 200) {
          const { data: dataDescription } = await $axios.get(
            `pokemon-species/${data.id}`
          )

          resolve({
            pokemon: {
              ...data,
              description: dataDescription,
            },
          })
        }
      }

      searchPokemonDetails()
    })
  },
  data() {
    return {
      pokemon: {},
      maxstatus: 100,
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
  methods: {
    backToList() {
      this.$router.back()
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  position: relative;

  .toolbar {
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 99999;
    background: white;
    border-radius: 0.2rem;
    margin-bottom: 1rem;
    border: 1px solid #97ccea;
    box-shadow: 4px 4px 0 0 rgba(80, 142, 197, 0.12);

    .toolbar--tools {
      max-width: 99%;
      margin: 0 auto;
      padding: 0.5rem 0;
      display: flex;
      justify-content: space-between;
      align-items: space-between;
    }
  }

  .page {
    width: 100%;
    .page--content {
      width: 80%;
      margin: 0 auto;

      .card {
        width: 100%;
        box-shadow: 5px 5px 0 0 #00000014;

        .pokemon--details {
          .top--details {
            display: flex;

            .left--section {
              width: 40%;
              box-sizing: border-box;
              padding-right: 1rem;

              .image-wrapper {
                display: flex;
                justify-content: center;

                &::before {
                  content: '';
                  width: 300px;
                  height: 300px;
                  background: #00000014;
                  border-radius: 50%;
                  position: absolute;
                  z-index: 9;
                  background-image: url('https://media.comicbook.com/2020/04/pokemon-anime-1216294.jpeg?auto=webp&width=1200&height=560&crop=1200:560,smart');
                  background-position: cover;
                  opacity: 0.3;
                }

                img {
                  width: 20rem;
                  margin-bottom: 1rem;
                  z-index: 10;
                }
              }
            }

            .right--section {
              flex: 1;
              padding-left: 2rem;

              h1 {
                font-weight: 700;
              }

              .pokemon-number {
                display: block;
                top: 0;
                right: 0.5rem;
                font-size: 2rem;
                font-weight: 600;
                color: rgb(92, 92, 92);
              }

              .pokemon-habitat {
                margin-top: 1rem;
                color: rgb(92, 92, 92);
                font-size: 17px;

                span {
                  background: rgb(92, 92, 92);
                  color: white;
                  padding: 0.2rem 0.5rem;
                  border-radius: 0.2rem;
                }
              }

              .pokemon--section {
                margin-top: 3rem;

                h4 {
                  font-size: 20px;
                  font-weight: 600;
                  margin-bottom: 1rem;
                }
              }

              .pokemon-types {
                p {
                  .type {
                    color: white;
                    font-size: 17px;
                    padding: 0.2rem 0.5rem;
                    border-radius: 0.2rem;
                    margin-right: 0.5rem;
                  }
                }
              }
            }
          }

          .rest--details {
            margin-top: 2rem;
          }
        }
      }
    }
  }
}
</style>
