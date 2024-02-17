<template>
  <div class=" manf-home">
    <a-card class="grey-card" :bordered="false">
      <a-row class="">
        <!-- left side tabs -->
        <a-col :md="10">
          <!-- <div class="home-tab">
            <a
              href="javascript:;"
              @click="handleSidebarKey(`/manufacturer/schedules`, 3)"
            >
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/note-board-scheduling.svg"
                width="120"
                height="100"
              />
              <h4 class="heading-home">
                {{ translation.Manuf_1_342 }}
                <strong class="strong"> {{ translation.Sched_1_21 }} </strong>
              </h4>
            </a>
          </div> -->
          <div class="home-tab">
            <a
              href="javascript:;"
              @click="handleSidebarKey(`/superAdmin/entities`, 3)"
            >
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/enroll-new-patient.svg"
                width="120"
                height="100"
              />
              <h4 class="heading-home">
                {{ translation.Manag_1_455 }}
                <strong class="strong"> All of the entities </strong>
              </h4>
            </a>
          </div>
          <div class="home-tab with-arrow">
            <a href="javascript:;" @click="handleSidebarKey(`/superAdmin/users`, 4)">
              <img
                src="https://cgt-dev-ft.microsysx.com/images/v2/icons/Group%20644.svg"
                width="120"
                height="100"
              />
              <h4 class="heading-home">
                {{ translation.Manag_1_455 }}
                <strong class="strong">
                  Users
                </strong>
              </h4>
            </a>
          </div>
        </a-col>
        <!-- #end left side tabs -->
              <a-col :span="3"></a-col>

      <a-col :md="10" class="mtminus-5">
        
      </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
// import { HubConnectionBuilder } from '@aspnet/signalr'
import userDetail from '~/mixins/user-detail'
import routeHelpers from '~/mixins/route-helpers'
// import treatmentStats from '~/components/statistics/treatment'
export default {
  // components: { treatmentStats },
  mixins: [routeHelpers, userDetail],
  data() {
    return {}
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {},
  methods: {
    gotoView(uri) {
      this.goto(`/${uri}`)
    },
  },
}
</script>
