<template>
    <page-layout
      :create="false"
      :loading="loading"
      :bordered="false"
      title="Project List"
      class="specific container page-search-input-container"
    >
      <template slot="content">
        <div class="manf-treatment container">
          <div class="h-tabs large-tabs rounded-table manf-treatment-body treatment-list-body">
              <a-tabs :animated="false" type="card">
                <a-tab-pane :key="1" tab="Pending">
                  <pending  />
                </a-tab-pane>
                <a-tab-pane :key="2" tab="Approved">
                  <accepted  />
                </a-tab-pane>
                <a-tab-pane :key="3" tab="Rejected">
                  <rejected  />
                </a-tab-pane>
                <a-tab-pane :key="4" tab="All">
                  <all  />
                </a-tab-pane>
              </a-tabs>
          </div>
        </div>
      </template>
    </page-layout>
  </template>
  <script>
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  import accepted from '~/pages/projects/accepted'
  import rejected from '~/pages/projects/rejected'
  import all from '~/pages/projects/all'
  import pending from '~/pages/projects/index'
  // import {isEmpty} from '~/services/Helpers'
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: {
      PageLayout,
      accepted,
      all,
      rejected,
      pending
    },
    mixins: [routeHelpers],
    data() {
      return {
        loading: false,
      }
    },
    computed: {
      // ...mapGetters(['getUser']),
      user() {
        return this.$store.getters.getUser
      },
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    watch: {
      translation(newValues, oldValue) {
        if (newValues !== oldValue) {
          // this.columns[2].title = newValues.Actio_1_220
        }
      },
    },
    mounted() {
      // this.fetch()
      this.getTranslationData()
    
    },
    methods: {
      getTranslationData() {
        // this.columns[2].title = this.translation.Actio_1_220
      },
    },
  }
  </script>
  