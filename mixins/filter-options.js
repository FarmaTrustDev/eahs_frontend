
export default {
    data() {
        return {
            filters: {},
        }
    },
    methods: {
        handleSearch(value, column) {
            const filters = this.params
            filters[column.key] = value[0]
            this.setFilters(filters)
        },
        handleReset(clearFilters, column) {
            clearFilters()
            const filters = this.filters
            delete filters[column.key]
            this.setFilters(filters)
        },
        setFilters(params) {
            this.filters = params
            this.fetch(this.filters)
        },
    },
}
