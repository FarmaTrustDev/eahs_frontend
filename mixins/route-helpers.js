export default {
  methods: {
    goto(url, query = {}) {
      this.$router.push({ path: url, query })
    },
    goBack() {
      this.$router.go(-1)
    },
    handleSidebarKey(uri, key) {
      this.$store.commit('setSelectedMenu', [`${key}`])
      this.goto(uri)
    },
  },
}
