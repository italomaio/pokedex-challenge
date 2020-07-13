<template>
  <div>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button v-b-toggle.games block>Games</b-button>
      </b-card-header>
      <b-collapse
        id="games"
        visible
        accordion="games-accordion"
        role="tabpanel"
      >
        <b-card-body>
          <b-card-text>
            <b-table
              striped
              bordered
              small
              hover
              head-variant="dark"
              :items="tableItems"
            ></b-table>
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    games: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tableItems: [],
    }
  },
  created() {
    this.setTableItems()
  },
  methods: {
    setTableItems() {
      this.games.forEach(async (item) => {
        const { data, status } = await this.$axios.get(
          item.version.url.replace('https://pokeapi.co/api/v2/', '')
        )

        if (data && status === 200) {
          this.tableItems.push({
            Version: data.names.filter((x) => x.language.name === 'en')[0].name,
            Version_Group: data.version_group.name,
          })
        }
      })
    },
  },
}
</script>
