<template>
    <div slot="content">
        <div class="" style="margin-bottom: 30px;" >
          <a-tabs type="card" >
              <a-tab-pane key="1" tab="Consent">
                <consent></consent>
                
                </a-tab-pane>
                <a-tab-pane key="2" tab="Inbound">
                <inbound></inbound>
                  
                </a-tab-pane>
              
              <a-tab-pane key="3" tab="Outbound">
                
                  <outbound></outbound>
                </a-tab-pane>
              
              
              <a-tab-pane key="4" tab="Experiments/Researhes">
                <researcher></researcher>
                </a-tab-pane>
              </a-tabs>
              
        </div>
       
        <a-col :offset="22" :span="2">
            <a-button type="primary" class="float-right wd-12" style="margin-top: 30px;" @click="goto('/inbound/samples/sampleStatusWiseList')">Back</a-button>
        </a-col>
        
      
    </div>
</template>
<script>

import notifications from '~/mixins/notifications'
import { preventDefault } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
import consent from '~/components/root/samples/sampleProcess/consentProcess/consent'
import inbound from '~/components/root/samples/sampleProcess/consentProcess/inbound'
import outbound from '~/components/root/samples/sampleProcess/consentProcess/outbound'
import researcher from '~/components/root/samples/sampleProcess/consentProcess/researcher'
// import PageLayout from '~/components/layout/PageLayout'
export default {
  components: { consent,inbound ,outbound,researcher},
  mixins: [routeHelpers, notifications],
  data() {
    return {
      
      datasource: [],
        dummyDataSource:[
          {
            detail:'Lorem ipsum dolar sit imit go to consecture',
            action:'a',
            note:'aliquit',
          },
          {
            detail:'Lorem ipsum dolar sit imit go to consecture ',
            action:'a',
            note:'aliquit',
          },
          {
            detail:'Lorem ipsum dolar sit imit go to consecture ',
            action:'a',
            note:'aliquit',
          },
          {
            detail:'Lorem ipsum dolar sit imit go to consecture ',
            action:'a',
            note:'aliquit',
          }
        ],
        columns: [
          {
            title: 'Detail',
            dataIndex: 'detail',
            key: 'detail',
          },
          {
            title: 'Action',
          dataIndex: 'action',
          scopedSlots: {
          customRender: 'action',
          }
          },
          {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
          }
        ],
      userDeleteModal: false,
      
      fullName: [],
      userId: '',
    }
  },
  computed: {
    // ...mapGetters(['getUser']),
    user() {
      return this.$store.getters.getUser
    },
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    
  },
  methods: {
    preventDefault,
    userDeleteMethod() {
      this.deleteUser(this.userId)
      this.userDeleteModal = false
    },
    
    userDelete(e, record) {
      this.userId = record
      this.userDeleteModal = e
    },
    
  },
}
</script>