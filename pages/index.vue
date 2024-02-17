<template>
  <div class="home-page container" >
    <!-- <h1 class="title mt-15">
      <strong>{{ translation['Mydashb_2_7'] }}</strong>
    </h1> -->
    <blyottHome v-if="isAdmin()"/>
    <superAdminHome v-if="isSuperAdmin()"/>
    <donorHome v-if="isDonor()" />
    <labAttendantHome v-if="isLabAttendant()"/>
    <nurseHome v-if="isNurse()"/>
    <researcherHome v-if="isResearcher()"/>
    <customerHome v-if="isCustomer()"/>
    <principleInvestigatorHome v-if="isPrincipleInvestigator()"/>
    <technicianHome v-if="isTechnician()"/>
    <manufacturerHome v-if="isManufacturer()"/>
    <clientHome v-if="isClient()"/>
    <managerHome v-if="isManager()" />
    <partnerHome v-if="isPartner()"/>
    <custodianHome v-if="isCustodian()"/>
    <patientHome v-if="isPatient()"/>
    <instituteHome v-if="isInstituteAdmin()"/>
    <logisticAdminHome v-if="isLogisticAdmin()" />
    <instituteCustomer v-if="isInstituteCustomer()" />
  </div>
</template>

<script>
// import { HubConnectionBuilder } from '@aspnet/signalr'
import userDetail from '~/mixins/user-detail'
import routeHelpers from '~/mixins/route-helpers'
import blyottHome from '~/components/root/blyott'
import superAdminHome from '~/components/root/superAdmin/home'
import donorHome from '~/components/root/donator'
import labAttendantHome from '~/components/root/labAttendant'
import nurseHome from '~/components/root/nurse'
import researcherHome from '~/components/root/researcher'
import customerHome from '~/components/root/customer'
import principleInvestigatorHome from '~/components/root/principleInvestigator'
import technicianHome from '~/components/root/technician'
import manufacturerHome from '~/components/root/manufacturer'
import clientHome from '~/components/root/client'
import managerHome from '~/components/root/manager'
import partnerHome from '~/components/root/partner'
import custodianHome from '~/components/root/custodian'
import patientHome from '~/components/root/patient'
import instituteHome from '~/components/root/instituteAdmin'
import logisticAdminHome from '~/components/root/logisticAdmin'
import instituteCustomer from '~/components/root/instituteCustomer'
export default {
  components: {
    superAdminHome,
    blyottHome,
    donorHome,
    labAttendantHome,
    nurseHome,
    researcherHome,
    instituteCustomer,
    customerHome,
    principleInvestigatorHome,
    technicianHome,
    manufacturerHome,
    clientHome,
    managerHome,
    partnerHome,
    custodianHome,
    patientHome,
    instituteHome,
    logisticAdminHome
  },
  mixins: [routeHelpers, userDetail],
  middleware: 'auth',
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
