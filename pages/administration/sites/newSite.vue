<template>
    <PageLayout :create="false" title="Site">
      <template slot="headerMenus">   
      <a-button type="primary" v-if="!isViewOnly" @click="siteCreating(true)">Add New Site</a-button>
       </template>
      
      <div slot="content">
        <div class="bd-r-5">
        <a-form :form="formSite" @submit="onSubmitSite" v-if="isSiteCreating">
          <a-col :offset="23" ><a style="color:grey"><a-icon type="close" @click="siteCreating(false)" :style="{fontSize: '20px'}" /></a></a-col>
            <a-row class="bg-grey pt-2">
              <a-col :span="12" class="ml-10">
                <a-form-item
                  label="Site Name "
                  :label-col="{ span: 6 }"
                  :wrapper-col="{ span: 18 }"
                  class="pt-3"
                >
                  <a-input
                    v-decorator="[
                      'name',
                      {
                        initialValue: site.name,
                        rules: [
                          {
                            required:true,
                            message: 'Please input your Site name',
                          },
                        ],
                      },
                    ]"
                    style="background-color: white"
                    placeholder="Site Name"
                  />
                  <a-input type="hidden"
                    v-decorator="[
                        'labId',
                        {
                            initialValue: lId,
                        },
                    ]"
                />
                <a-input type="hidden"
                    v-decorator="[
                        'id',
                        {
                            initialValue: site.id,
                        },
                    ]"
                />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="18">
                <div v-for="(zone, index) in zones" :key="index">
                  <div class="bg-grey pt-10 pb-10 mt-10 pl-2">
                    <p>{{ zone.name }}</p>
                  </div>
                </div>
              </a-col>
            </a-row>
            <a-row class="pt-2">
              <a-col :span="6" :offset="18">
                <a-form-item>
                  <FormActionButton :loading="siteBtnLoading"
                    class="process-btn text-left"
                    type="primary"
                    custom-text="Save Site"
                    :is-created="isCreatedSite"
                  />
                </a-form-item>
              </a-col>
              </a-row>
        </a-form>
              <div class="ant-col ant-col-24 mt-15" v-if="siteData.length===0">
                <a-empty >
                  <span > There is no <a>Site</a> </span>
                </a-empty>
              </div>
              <a-row>
                <div  >
                <a-tabs v-model="activeTab" class="h-tabs">
                  <a-tab-pane v-for="(site) in siteData" :key="site.id">
                    <template #tab>
                    <span>
                      {{ site.name }}
                      <a-dropdown v-if="!isViewOnly">
                        
                        <a-icon type="more" />
                        
                        <a-menu slot="overlay">
                          <a-menu-item key="1">
                            <a @click="getSiteDataById(site.globalId)">Edit</a>
                          </a-menu-item>
                          <a-menu-item key="2">
                              <a-popconfirm
                                title="Are you sure you want to delete this site ?"
                                ok-text="Yes"
                                cancel-text="No"
                                placement="topLeft"
                                @confirm="deleteSite(site.id)"
                                >
                              Delete
                              </a-popconfirm>
                          </a-menu-item>
                        </a-menu>
                      </a-dropdown>
                    </span>
                  </template>
                    <div class="tabCol">
                        <a-table 
                                :columns="columnsSite"
                                :data-source="site.siteZoneResponseDTO"
                                
                                class="rounded-table pt-10 "
                                :pagination="{
                                  defaultPageSize: 5,
                                  showSizeChanger: true,
                                  pageSizeOptions: ['5', '10', '15', '20', '25'],
                                }"
                              >
                                  
                                <template slot="action" slot-scope="action">
                                  <a-dropdown v-if="!isViewOnly" >
                                    <a-button class="action-button" style="height:30px" @click="preventDefault">
                                      Admin <a-icon type="down" />
                                    </a-button>
                                    <a-menu slot="overlay">
                                      <a-menu-item key="1">
                                        <a @click="editZone(action.id)">Edit</a>
                                      </a-menu-item>
                                      <a-menu-item key="2">
                                        <a @click="deleteZone(action.id)">Delete</a>
                                      </a-menu-item>
                                    </a-menu>
                                  </a-dropdown>
                                  <span v-else>{{ action.status }}</span>
                                </template>
                                  
                                </a-table>
                                <a-col :offset="19" v-if="!isViewOnly">
                                <a-button type="primary"  @click="visibleModelZone(true,site.id)" class="wd-11 mt-10">Add New Zone</a-button>
                              </a-col>
                            </div>
                  </a-tab-pane>
                </a-tabs>
              </div>
            </a-row>
      </div>

      <a-modal 
      :visible="visibleSignature"
      :footer="null"
      class="error-model"
      @cancel="handleOk()"
      @ok="handleOk()"
    >
    <Signature @handleSignatureOk="handleSignatureOk" @handleSignatureCancel="handleSignatureCancel"/>
    </a-modal>
        
         <a-modal
          :visible="visibleZoneModal"
          title="Add Zone"
          class="support-add-modal"
          :dialog-style="{ top: '20px' }"
          :loading="loading"
          :footer="null"
          :width="600"
          @cancel="visibleModelZone(false)"
        >
        <a-form :form="zoneForm" @submit="onSubmitZone">
          <a-row>
            <a-form-item>
              <a-input
                type="hidden"
                v-decorator="[
                  'siteId',
                  {
                    initialValue: siteId,
                  },
                ]"
              />
              <a-input
              type="hidden"
                v-decorator="[
                  'id',
                  {
                    initialValue: ticketZone.id,
                  },
                ]"
              />
            </a-form-item>
            <a-col :span="24" class="bg-grey">
              <a-form-item
                label="New Zone"
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 24 }"
                class="ml-10 mr-10"
              >
                <a-input
                  v-decorator="[
                    'name',
                    {
                      initialValue: ticketZone.name,
                      rules: [
                        {
                          required: true,
                          message: 'Please input your zone name',
                        },
                      ],
                    },
                  ]"
                  style="background-color: white"
                  placeholder="Zone Name"
                />
              </a-form-item>
            </a-col>
            <a-col :span="4" :offset="20">
              <a-form-item>
                <FormActionButton :loading="zoneBtnLoading" :custom-text="isAU" class="mt-40" />
                <!-- @click="showStep(false)" -->
              </a-form-item>
            </a-col>
            <a-col :span="4"></a-col>
          </a-row>
        </a-form>
            
         
        </a-modal>
         <!-- End -->
         
  
  
        
      </div>
    </PageLayout>
  </template>
  <script>
  import PageLayout from '~/components/layout/PageLayout.vue'
  import { filterOption,preventDefault } from '~/services/Helpers'
  import SiteServices from '~/services/API/SiteServices'
  import ZoneServices from '~/services/API/ZoneServices'
  import routeHelpers from '~/mixins/route-helpers'
  import {CONSENT_STATUSES} from '~/services/Constant/index'
  import Signature from '~/components/signature'
  export default {
    components: {
      PageLayout,Signature
    },
    mixins: [routeHelpers],
    data() {
      return {
        ticket: {
          type: Object,
          default: () => ({}),
        },
        ticketZone: {
          type: Object,
          default: () => ({}),
        },
        zoneBtnLoading:false,
        pending: CONSENT_STATUSES.pending.name,
        siteBtnLoading:false,
        visibleSignature:false,
        isSiteCreating:false,
        visibleZoneModal:false,
        activeTab:0,
        isCreated: false,
        isCreatedZone:false,
        visible: false,
        show: false,
        isAU:'Add',
        zoneData : false,
        zoneName:'',
        loading: false,
        form: this.$form.createForm(this, { name: 'siteForm' }),
        formSite: this.$form.createForm(this, { name: 'formSite' }),
        zoneForm: this.$form.createForm(this, { name: 'zoneForm' }),
        dummyData: [],
        zones: [],
        siteData:[],
        site:[],
        dummyDataSource:[],
          columnsSite: [
            {
              title: 'Zone Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
            title: 'Action',
            key: 'action',
            scopedSlots: {
              customRender: 'action',
            }
            }
          ],
        lId:'',
        siteId: '',
        isCreatedSite: false,
        isViewOnly: false,
      }
    },
    watch: {
      step(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.zones = newValue
        }
      },
    },
    mounted() {
      const id = this.$route.query.id
      const lId = this.$route.query.lId
      this.isViewOnly = this.$route.query.viewOnly
      this.isAcceptance = this.$route.query.acceptance
      this.lId = lId
      if (id !== undefined) {
        this.isCreated = true
        this.getSiteById(id)
      }
      this.fetchSite()
    },
    methods: {
      filterOption,
      preventDefault,
      visibleModelZone(sho,siteId) {
        if(sho === false)
        {
          this.isAU='Add'
          this.isCreatedZone = false
          this.zoneForm.resetFields()
        }
        this.siteId = siteId
        this.visibleZoneModal = sho
      },
      getSiteDataById(id){
        this.loading = true
        SiteServices.getById(id).then((response)=>{
          this.site = response.data
          this.isCreatedSite = true
          this.siteCreating(true)
        }).finally(this.loading = false)
      },
      showZone(e) {
        this.show = e
      },
    onSubmitSite(e) {    
        e.preventDefault()
        this.formSite.validateFields((err, values) => {
            if (!err) {
              values.status = this.pending
              if(this.isCreatedSite){
                  this.siteBtnLoading = true
                  SiteServices.update(values).then((response) => {
                  this.siteCreating(false)
                  this.loading = false
                  this.siteBtnLoading=false
                  this.siteId = response.data.id
                  this.isCreatedSite = false
                  this.fetchSite()
                  this.isCreated = true
                })
              }
              else {
                SiteServices.create(values).then((response) => {
                this.siteCreating(false)
                this.loading = false
                this.siteBtnLoading=false
                this.siteId = response.data.id
                this.activeTab = response.data.id
                this.fetchSite()
                this.isCreated = true
              })
            }
            }
        })
    },
      deleteZone(id)
      {
        ZoneServices.deleteZone(id).then((response)=>{
          this.fetchSite()
        })
      },
      editZone(id)
      {
        this.visibleModelZone(true,0)
        ZoneServices.editZone(id).then((response)=>{
          this.isCreatedZone =true
          this.zoneForm.setFieldsValue({
          id: response.data.id,
          name: response.data.name,
        });
          this.isAU='Update'
        })
      }
      ,
      onSubmitZone(e) {
        this.loading = true
        this.zoneBtnLoading = true
        e.preventDefault()
        this.zoneForm.validateFields((err, values) => {
            if (!err) {
              values.status = this.pending
              this.zoneData = values
              this.visibleSignature = true
              }
            }
          )
          .catch(this.error)
      },
      upsert(values){
        if(this.isCreatedZone)
              {
                ZoneServices.updateZone(values).then((response) => {
                  this.fetchSite()
                  // this.getByProcessId(this.processId)
                  this.zoneBtnLoading = false
                  this.loading = false
                  this.zoneForm.resetFields()
                  this.isAU='Add'
                  this.isCreatedZone = false
                  this.visibleModelZone(false)
                })
              }
              else{
                ZoneServices.create(values).then((response) => {
                  this.fetchSite()
                  this.visibleModelZone(false)
                  this.zoneForm.resetFields()
                  this.zoneBtnLoading = false
                  this.loading = false
                  
                })
              }
      },
      handleSignatureOk() {
      this.visibleSignature = false
        this.upsert(this.zoneData)
      },
      handleSignatureCancel(){
        this.zoneBtnLoading = false
        this.visibleSignature = false
        this.loading = false
      },
      handleOk() {
        this.handleSignatureCancel()
      },
      getBySiteId(id) {
        ZoneServices.getBySiteId(id).then((response) => {
          this.zones = response.data
        })
      },
      getSiteById(id) {
        SiteServices.getById(id).then((response) => {
          this.siteId = response.data.id
          this.getBySiteId(response.data.id)
        })
      },
      deleteSite(id){
        this.loading = true
        SiteServices.remove(id).then((response)=>{
          this.fetchSite()
        }).catch(this.error).finally(this.loading = false)
      },
      fetchSite(){
        SiteServices.getAllSite(this.lId).then((response)=>{
          this.siteData=response.data
          if(response.data.length!==0)
          { 
            if(this.activeTab === 0){
              this.activeTab = response.data[0].id  
            }
          }
          // console.log(this.siteData)
        })
      },
      siteCreating(val)
      {
        if(!val){
          this.site = []
          this.isCreatedSite = false
          this.siteBtnLoading = false
        }
        this.isSiteCreating = val
      }, 
    },
  }
  </script>
  <style scoped>
  .ant-tooltip {
      display: none;
      position: relative;
  }
  .ant-tooltip-placement-top, .ant-tooltip-placement-topLeft, .ant-tooltip-placement-topRight {
      padding-bottom: 8px;
      display: none !important;
  }
  </style>