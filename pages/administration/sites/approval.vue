<template>
    <PageLayout :create="false" title="Site">
      <div slot="content">
        <div class="bd-r-5">
                    <div class="tabCol">
                        <a-table 
                                :columns="columnsSite"
                                :data-source="site"
                                class="rounded-table pt-10 "
                                :pagination="{
                                  defaultPageSize: 5,
                                  showSizeChanger: true,
                                  pageSizeOptions: ['5', '10', '15', '20', '25'],
                                }"
                              >
                              <template slot="site" slot-scope="site">
                                <span :class="getColor(site.pendingZone)" @click="goto('/administration/sites/zone/approval?sId='+site.id)">
                                    <a-tooltip title="View Zones" placement="top">
                                      ({{ site.pendingZone }})
                                    <!-- <a-icon type="eye" :style="{color:'blue',fontSize: '15px'}"  /> -->
                                    </a-tooltip>
                                </span>
                                </template>
                                <template slot="action" slot-scope="action">
                                    <a-button v-if="action.status == pending" type="primary" :loading="loading" dashed @click="accepted(action.id, approve)">
                                        Approve
                                    </a-button>
                                    <a-button v-if="action.status == pending" class="new-treatment-btn" :loading="loading" dashed @click="reasonModal(action.id, reject,true)">
                                        Reject
                                    </a-button>
                                    <span v-else>
                                      {{ action.status }}
                                    </span>
                                </template>
                                </a-table>
                            </div>
      </div>
        
      <a-modal
          :visible="visible"
          title="Reject Reason"
          class="support-add-modal"
          :dialog-style="{ top: '20px' }"
          :loading="loading"
          :footer="null"
          :width="600"
          @cancel="reasonModal('','',false)"
        >
        <a-form :form="form" @submit="onSubmitReason">
          <a-row>
            <a-col :span="24" class="bg-grey">
              <a-form-item
                label="Reason"
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 24 }"
                class="ml-10 mr-10"
              >
                <a-input
                  v-decorator="[
                    'reason',
                    {
                     
                      rules: [
                        {
                          required: true,
                          message: 'Please input your reason',
                        },
                      ],
                    },
                  ]"
                  style="background-color: white"
                  placeholder="Reason"
                />
              </a-form-item>
            </a-col>
            <a-col :span="4" :offset="20">
              <a-form-item>
                <FormActionButton :loading="loading" custom-text="Submit" class="mt-40" />
                <!-- @click="showStep(false)" -->
              </a-form-item>
            </a-col>
            <a-col :span="4"></a-col>
          </a-row>
        </a-form>
        </a-modal>
      </div>
    </PageLayout>
  </template>
  <script>
  import PageLayout from '~/components/layout/PageLayout.vue'
  import { filterOption,preventDefault } from '~/services/Helpers'
  import SiteServices from '~/services/API/SiteServices'
  import routeHelpers from '~/mixins/route-helpers'
import {CONSENT_STATUSES} from '~/services/Constant/index'
  export default {
    components: {
      PageLayout,
    },
    mixins: [routeHelpers],
    data() {
      return {
        loading: false,
        form: this.$form.createForm(this, { name: 'siteForm' }),
        site:[],
        dummyDataSource:[],
        siteGlobalId: 0,
        approve: CONSENT_STATUSES.approved.name,
        reject: CONSENT_STATUSES.reject.name,
        pending: CONSENT_STATUSES.pending.name,
        status: '',
          columnsSite: [
            {
              title: 'Site Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status'
            },
            {
                title: 'View Zone',
                key : 'site',
                scopedSlots: {
                    customRender : 'site'
                }
            },
            {
            title: 'Action',
            key: 'action',
            scopedSlots: {
              customRender: 'action',
            }
            }
          ],
        labId:0,
        siteId: 0,
        visible: false
      }
    },
    mounted() {
      const lId = this.$route.query.lId
      this.fetchSite(lId)
      this.labId = lId
    },
    methods: {
      filterOption,
      preventDefault,
      accepted(id, status){
      this.loading = true
      const formData = new FormData()
      formData.append('status',status)
      formData.append('id',id)
      SiteServices.approval(formData).then((response)=>{
        this.fetchSite(this.labId)
      }).catch(this.error).finally(this.loading=false)
    },  
    getColor(zone){
     return zone > 0 ? 'color-red' : '' 
    },
    reasonModal(id, status, show) {
      if(show){
        this.visible = show
        this.siteId = id
        this.status = status
      } else { 
        this.visible = show
        this.siteId = 0
        this.status = ''
      }
    },
    onSubmitReason(e) {    
        e.preventDefault()
        this.form.validateFields((err, values) => {
            if (!err) {
              this.loading = true
              const formData = new FormData()
              formData.append('status',this.status)
              formData.append('id',this.siteId)
              formData.append('reason',values.reason)
              SiteServices.approval(formData).then((response)=>{
                this.fetchSite(this.labId)
                this.reasonModal('','',false)
              }).catch(this.error).finally(this.loading = false)
            }
        })
    },
      getSiteDataById(id){
        this.loading = true
        SiteServices.getById(id).then((response)=>{
          this.site = response.data
          this.isCreatedSite = true
          this.siteCreating(true)
        }).finally(this.loading = false)
      },
    
      fetchSite(id){
        SiteServices.getPending(id).then((response)=>{
          this.site=response.data
          // console.log(this.siteData)
        })
      },
    },
  }
  </script>