<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    title="Storage Services"
    class="specific-storage container Component_body"
    style="margin-top: -25px;"
  >
    <!--  -->
    <template slot="content">

      <inventory />
      
    </template>
  </page-layout>
</template>
<script>
import inventory from '~/components/root/inventory'
import PageLayout from '~/components/layout/PageLayout'

export default {
  components: { 'page-layout': PageLayout, inventory},
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  methods: {},
}
</script>
