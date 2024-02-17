<template>
    <page-layout
    title="Storage"
    :back="false"
    :create="false"
    >
        <template slot="content">
          <div class="manf-treatment container">
          <div class="h-tabs large-tabs rounded-table manf-treatment-body treatment-list-body">
      <a-tabs :animated="false" type="card">
        <a-tab-pane key="1" tab="ُPending">
          <pending />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Rejected">
          <rejected />
        </a-tab-pane>
        <a-tab-pane key="4" tab="Approved">
          <accepted />
        </a-tab-pane>
        <a-tab-pane key="2" tab="All">
          <all />
        </a-tab-pane>
      </a-tabs>
      </div>
      </div>
    </template>
    </page-layout>
</template>
<script>
 import PageLayout from '~/components/layout/PageLayout'
 import pending from '~/pages/administration/storage/facility/storageConfig/approval'
 import all from '~/pages/administration/storage/facility/storageConfig/all'
 import accepted from '~/pages/administration/storage/facility/storageConfig/accepted'
 import rejected from '~/pages/administration/storage/facility/storageConfig/rejected'
 export default {
    components: {
      PageLayout,
      all,
      pending,
      accepted,
      rejected
    },
 }
</script>