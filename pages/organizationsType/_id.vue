<template>
  <page-layout :create="false" :loading="loading" title="organizationsType">
    <template slot="content"> <organizationsType /> </template>
  </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import organizationsType from '~/components/organizationsType/form'

export default {
  components: { 'page-layout': PageLayout, organizationsType },
  data() {
    return {
      loading: false,
    }
  },
}
</script>