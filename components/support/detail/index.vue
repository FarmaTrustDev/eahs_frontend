<template>
  <div class="support-detail">
    <a-card class="default-border-radius">
      <p class="mb-4 BagID float-right">BagID: {{ticket.reference_Id}}</p>
      <p class="mb-4 PUID">PUID: {{ getPuid(ticket.reporter_name) }}</p>
      <!-- ============ -->
      <a-card class="p-4 default-border-radius">
        <p class="SubjectMsg">{{ ticket.description }}</p>
        <p><span class="patientName">By: {{ticket.reporter_name}}</span></p>
        <p><span class="Date">date: {{getDateFormat(ticket.created_At)}} </span></p>
        <p>
          <span class="StackHolder">StakeHolder(s): Manufacturer,Courier</span>
        </p>
      </a-card>
      <!-- ============ -->
      <div class="user-involved support_page">
        <p class="mt-15">{{translation['UsersInvol_2_108']}}</p>
        <a-tabs
          class="h-tabs"
          type="card"
          default-active-key="1"
          :animated="false"
        >
        
          <a-tab-pane key="1" tab="Hospital">
            <a-row>
              <a-col :span="12">
                <span class="text-muted f">Doctor </span>
                <h6 class="f">Ms Jenny Stephan</h6>
                <h6 class="f">jenny@nhsonline.com</h6>
              </a-col>
              <a-col :span="12">
                <span class="text-muted f">Assist. Doctor </span>
                <h6 class="f">Dr Adam Smith</h6>
                <h6 class="f">adam_1233@nhsonline.com</h6>
              </a-col>
              <a-col :span="12">
                <span class="text-muted f">Nurse : </span>
                <h6 class="f">Cerry MacMillian</h6>
                <h6 class="f">cerry_mm@nhsonline.com</h6>
              </a-col>
              <a-col :span="12">
                <span class="text-muted f">Help Desk :</span>
                <h6 class="f">Rick Blackmore</h6>
                <h6 class="f">support@nhsonline.com</h6>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane key="2" tab="Manufacturer">
            <a-row>
              <a-col :span="12">
                <span class="text-muted f">Customer Satisfaction Manager </span>
                <h6 class="f">Jack Frost</h6>
                <h6 class="f">jack.frost@cellfuse.com</h6>
                <h6 class="f">+442082343953</h6>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane key="3" tab="Courier">
            <a-row>
              <a-col :span="12">
                <span>{{translation.Headof_3_549}} Logistics </span>
                <h6 class="f">Steve Emerson</h6>
                <h6 class="f">steve@fastlink.com</h6>
                <h6 class="f">+442036562473</h6>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane key="4" tab="Admin">
            <a-row>
              <a-col :span="12">
                <span>Super Admin </span>
                <h6 class="f">Jess Simpson</h6>
                <h6 class="f">jess.simpson@admin.com</h6>
                <h6 class="f">+4420378923487</h6>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
  </div>
</template>
<script>
import moment from 'moment';
import { isEmpty } from '~/services/Helpers'
export default {
  props: {
    data: { type: Array, default: () => {} },
    ticket: { type: Object, default: () => {}, required: true },
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },   
  methods:{
    getDateFormat(date){
     return moment(String(date)).format('hh:mm Do MMMM YYYY')
    },
    getPuid(puid)
    {
      if(!isEmpty(puid))
      {
        const result = puid.match(/\((.*)\)/);
        return result[1]
      }
      else{
        return puid
      }
    }
  },
}
</script>
