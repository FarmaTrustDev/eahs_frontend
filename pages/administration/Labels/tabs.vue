<template>
    <page-layout
      :create="false"
      :loading="loading"
      :bordered="false"
      title="Template List"
      class="specific container page-search-input-container"
    >
    <span slot="title" class="page-title">Template List</span>
      <template slot="content">
        <div class="manf-treatment container">
          <div class="h-tabs large-tabs rounded-table manf-treatment-body treatment-list-body">
              <a-tabs :animated="false" type="card">
                <a-tab-pane :key="1" tab="Pending">
                  <pending :approval="true" />
                </a-tab-pane>
                <a-tab-pane :key="2" tab="Approved">
                  <accepted :approval="true" />
                </a-tab-pane>
                <a-tab-pane :key="3" tab="Rejected">
                  <rejected :approval="true" />
                </a-tab-pane>
                <a-tab-pane :key="4" tab="All">
                  <all :approval="true" />
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
  import accepted from '~/pages/administration/Labels/accepted'
  import rejected from '~/pages/administration/Labels/rejected'
  import all from '~/pages/administration/Labels/all'
  import pending from '~/pages/administration/Labels/index'
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
  