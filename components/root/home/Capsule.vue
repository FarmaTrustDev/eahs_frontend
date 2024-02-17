<template>
  <a-row :gutter="12" class="grey-card">
    <a-col :span="12">
      <CardsCapsule
        class="bg-primary white"
        title="Scan"
        :arrow="true"
        hoverable
        description="Inbound Sample"
        @click="menuClick('/treatments', { bound: 'inbound' })"
      />
    </a-col>
    <a-col :span="12">
      <CardsCapsule
        class="bg-danger white"
        title="Scan"
        :arrow="true"
        hoverable
        description="Outbound Sample"
        @click="menuClick('/treatments', { bound: 'outbound' })"
      />
    </a-col>
  </a-row>
</template>

<script>
import routeHelpers from '~/mixins/route-helpers'
export default {
  mixins: [routeHelpers],
  methods: {
    menuClick(url, query) {
      this.goto(url, query)
    },
  },
}
</script>
