export default {
    props: {},
    data() {
        return {
            pagination: {
                // current: 1,
                pageSize: 50,
                // total: 0,
                // showTotal: () => `Total ${this.pagination.total}`,
                onChange: (current, pageSize) =>
                    this.pageSelect(current, pageSize)
            }
        };
    },
    methods: {
        setPagination(data) {
            const pagination = { ...this.pagination };
            pagination.current = data.current;
            // pagination.page = data.current;
            pagination.pageSize = data.pageSize;
            pagination.total = data.total;
            this.pagination = pagination;
        },
        pageSelect(current, pageSize) {
            const pagination = { ...this.pagination };
            pagination.current = current;
            pagination.page = current;
            pagination.pageSize = pageSize;
            this.pagination = pagination;
            this.fetch();
        }
    }
};