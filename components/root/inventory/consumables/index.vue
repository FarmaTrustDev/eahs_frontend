<template>
  <div>
    <a-row :gutter="16" class="flex-child-container">
      <a-col v-for="consume in consumables" :key="consume.heading" :span="6">
        <card :data="consume" />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import card from '~/components/root/inventory/consumables/Card'
import { consumables } from '~/services/Constant/DummyData'
export default {
  components: { card },
  data() {
    return {
      consumables,
    }
  },
}
</script>
<style lang="scss" scoped>
.flex-child-container {
  display: flex;
  flex-flow: wrap;
}
</style>
