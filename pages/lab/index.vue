<template>
    <page-layout
    title="Labs"
    :back="false"
    :create="false"
    >
        <template slot="content">
          <div class="manf-treatment container">
          <div class="h-tabs large-tabs rounded-table manf-treatment-body treatment-list-body">
      <a-tabs :animated="false" type="card">
        <a-tab-pane key="1" tab="Pending">
          <newRequests />
        </a-tab-pane>
        <a-tab-pane key="2" tab="Approved">
          <accepted />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Rejected">
          <rejected />
        </a-tab-pane>
        <a-tab-pane key="4" tab="All">
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
 import all from '~/pages/lab/all'
 import newRequests from '~/pages/lab/newRequest'
 import accepted from '~/pages/lab/accepted'
 import rejected from '~/pages/lab/rejected'
 export default {
    components: {
      PageLayout,
      all,
      newRequests,
      accepted,
      rejected
    },
 }
</script>