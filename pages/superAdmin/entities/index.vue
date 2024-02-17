<template>
  <div class="mt-3 manf-treatment container" style="margin-top: 80px">
    <div class="page-header clearfix">
      <h3 class="page-title pl-5 float-left">Entities</h3>
    </div>
    <div class="h-tabs large-tabs rounded-table manf-treatment-body">
      <a-tabs type="card" :animated="false">
        <a-tab-pane key="1" tab="Organization">
          <organization :alias="hospAlias" :field-name="'Organization'" />
        </a-tab-pane>
        <!-- <a-tab-pane key="2" tab="Manufacturer">
          <organization :alias="manfAlias" :field-name="'Manufacturer'" />
        </a-tab-pane>
        <a-tab-pane key="3" tab="Logistic">
          <organization :alias="logAlias" :field-name="'Logistic'" />
        </a-tab-pane>
        <a-tab-pane key="4" tab="SmartLab"> 
          <organization :alias="smartLabAlias" :field-name="'SmartLab'" />
        </a-tab-pane> -->
      </a-tabs>
    </div>
  </div>
</template>
<script>
// import hospitals from '~/components/root/superAdmin/Entities/hospital'
// import manufacturer from '~/components/root/superAdmin/Entities/manufacturer'
// import logistic from '~/components/root/superAdmin/Entities/logistics'
import organization from '~/components/root/superAdmin/entities/organization'
import {
  LOGISTIC_ALIAS,
  HOSPITAL_ALIAS,
  MANUFACTURER_ALIAS,
  SMARTLAB_ALIAS,
} from '~/services/Constant'
export default {
  components: { organization },
  data() {
    return {
      hospAlias: HOSPITAL_ALIAS,
      manfAlias: MANUFACTURER_ALIAS,
      logAlias: LOGISTIC_ALIAS,
      smartLabAlias: SMARTLAB_ALIAS
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
}
</script>
