<template>
    <PageLayout :create="false" title="Zone">
      
      <div slot="content">
        <div class="bd-r-5">
                    <div class="tabCol">
                        <a-table 
                                :columns="columnsSite"
                                :data-source="zones"
                                
                                class="rounded-table pt-10 "
                                :pagination="{
                                  defaultPageSize: 5,
                                  showSizeChanger: true,
                                  pageSizeOptions: ['5', '10', '15', '20', '25'],
                                }"
                              >
                             
                                <template slot="action" slot-scope="action">
                                    <a-button v-if="action.status === pending"  type="primary" :loading="loading" dashed @click="accepted(action.id, approve)">
                                        Approve
                                    </a-button>
                                    <a-button v-if="action.status === pending" class="new-treatment-btn" :loading="loading" dashed @click="reasonModal(action.id, reject,true)">
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
  import ZoneServices from '~/services/API/ZoneServices'
  import {CONSENT_STATUSES} from '~/services/Constant/index'
  export default {
    components: {
      PageLayout,
    },
    data() {
      return {
        zones: [],
        siteData:[],
        site:[],
        approve: CONSENT_STATUSES.approved.name,
        reject: CONSENT_STATUSES.reject.name,
        pending: CONSENT_STATUSES.pending.name,
        visible: false,
        loading: false,
        form: this.$form.createForm(this, { name: 'zoneForm' }),
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
            title: 'Action',
            key: 'action',
            scopedSlots: {
              customRender: 'action',
            }
            }
          ],
        zId:'',
        zoneId: '',
        siteId: 0,
        isCreatedSite: false,
      }
    },
    mounted() {
      const sId = this.$route.query.sId
      this.siteId = sId
      this.getPending(sId)
    },
    methods: {
      filterOption,
      preventDefault,
      getPending(id) {
        ZoneServices.getPending(id).then((response) => {
          this.zones = response.data
        })
      },
      accepted(id, status){
        this.loading = true
      const formData = new FormData()
      formData.append('status',status)
      formData.append('id',id)
      ZoneServices.approval(formData).then((response)=>{
        this.getPending(this.siteId)
      }).catch(this.error).finally(this.loading=false)
      },
      reasonModal(id, status, show){
        if(show){
        this.visible = show
        this.zoneId = id
        this.status = status
      } else { 
        this.visible = show
        this.zoneId = 0
        this.status = ''
      }
      },
      onSubmitReason(e){
        e.preventDefault()
        this.form.validateFields((err, values) => {
            if (!err) {
              this.loading = true
              const formData = new FormData()
              formData.append('status',this.status)
              formData.append('id',this.zoneId)
              formData.append('reason',values.reason)
              ZoneServices.approval(formData).then((response)=>{
                this.getPending(this.siteId)
                this.reasonModal('','',false)
              }).catch(this.error).finally(this.loading = false)
            }
        })
      }
    },
  }
  </script>