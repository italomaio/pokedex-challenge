<template>
  <div class="wrapper">
    <div class="toolbar">
      <div class="toolbar--tools">
        <div id="search">
          <b-form-input
            v-model="searchKeyword"
            placeholder="Search for a pokemon..."
          ></b-form-input>
        </div>
        <div id="pagination">
          <b-form-select
            v-model="limit.selected"
            :options="limit.options"
          ></b-form-select>
          <b-pagination
            v-model="pageNumber"
            :per-page="limit.selected"
            :total-rows="total"
          ></b-pagination>
        </div>
      </div>
    </div>
    <div class="pokemon--list">
      <pokemon-card
        v-for="item in searchKeyword ? filteredPokemons : sortedPokemons"
        :key="item.name"
        :details="item"
        @click.native="openDetails(item.name)"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchKeyword: null,
      loading: false,
      total: null,
      pageNumber: 1,
      items: [],
      limit: {
        selected: 10,
        options: [
          { value: 10, text: 'Show 10' },
          { value: 20, text: 'Show 20' },
          { value: 50, text: 'Show 50' },
          { value: 100, text: 'Show 100' },
        ],
      },
      offset: 2,
    }
  },
  computed: {
    filteredPokemons() {
      return this.items.filter((post) => {
        return post.name
          .toLowerCase()
          .includes(this.searchKeyword.toLowerCase())
      })
    },
    sortedPokemons() {
      return this.items && this.items.slice().sort((a, b) => a.id - b.id)
    },
  },
  watch: {
    'limit.selected': {
      handler(after, before) {
        this.searchPokemons()
        this.pageNumber = 1
      },
      deep: true,
    },
    offset: {
      handler(after, before) {
        this.searchPokemons()
      },
      deep: true,
    },
    pageNumber: {
      handler(after, before) {
        this.searchPokemons()
      },
      deep: true,
    },
  },
  mounted() {
    this.searchPokemons()
  },
  methods: {
    async searchPokemons() {
      this.loading = true
      const { data, status } = await this.$axios.get('pokemon', {
        params: {
          limit: this.limit.selected,
          offset:
            this.pageNumber * this.limit.selected - this.limit.selected - 1 ===
            -1
              ? 0
              : this.pageNumber * this.limit.selected - this.limit.selected,
        },
      })

      if (data && status === 200) {
        this.total = data.count
        this.items = []

        data.results.forEach(async (item) => {
          const { data: dataPokemon } = await this.$axios.get(
            `pokemon/${item.name}`
          )
          this.items.push(dataPokemon)
        })

        setTimeout(() => {
          this.loading = false
        }, 1500)
      }
    },
    openDetails(name) {
      this.$router.push(`/pokemon/${name}`)
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

      #search {
        width: 30%;

        input,
        select {
          &:active,
          &:focus {
            box-shadow: none;
            border: 0;
          }
        }
      }

      #pagination {
        display: flex;

        ul.pagination {
          margin-bottom: 0 !important;
          margin-left: 0.5rem;

          li.page-item {
            a {
              color: black !important;
            }
          }
        }
      }
    }
  }

  .pokemon--list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    max-width: 80%;
    margin: 0 auto;
    padding-bottom: 5rem;
  }

  #poke-details {
    flex: 1;
    padding: 0.5rem;
    box-sizing: border-box;
  }
}
</style>
