<template>
  <div>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button v-b-toggle.location block>Location</b-button>
      </b-card-header>
      <b-collapse
        id="location"
        visible
        accordion="location-accordion"
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
            <div v-if="tableItems.length === 0">
              <h4>Can not reach locations</h4>
            </div>
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    locationUrl: {
      type: String,
      default: () => '',
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
    async setTableItems() {
      const { data, status } = await this.$axios.get(
        this.locationUrl.replace('https://pokeapi.co/api/v2/', '')
      )
      if (data && status === 200) {
        data.forEach(async (item) => {
          const { data: dataLocationArea } = await this.$axios.get(
            item.location_area.url
          )

          const { data: dataLocation } = await this.$axios.get(
            dataLocationArea.location.url
          )

          this.tableItems.push({
            Location: dataLocation.names.find((x) => x.language.name === 'en')
              .name,
          })
        })
      }
    },
  },
}
</script>
