<template>
  <page-layout
    :loading="loading"
    title="test"
    :bordered="borderCard"
    class="specific container"
    :create="false"
    ><AdvancedReceipt /></page-layout
  >
</template>
<script>
import AdvancedReceipt from '~/components/forms/AdvancedReceipt'
// import detail from '~/components/root/inventory/detail'
export default {
  components: { AdvancedReceipt },
}
</script>