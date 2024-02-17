<template>
    <page-layout
      :loading="false"
      class="specific container page-search-input-container"
      :create="false"
      :back="false"
    >
      <template slot="headerMenus">
       
        <a-input class="page-search-input mtminus-7 float-right" placeholder="Search Lab">
          <a-icon slot="prefix"  type="search" />
        </a-input>
        <!-- <a-button type="primary" @click="goto('/consent/consentlist')">All Consents</a-button> -->
      </template>
      <div slot="content">
        <div id="result"></div>
        <a-table
          :columns="columns"
          :data-source="dataSource"
          :loading="loading"
          class="rounded-table pt-10 users-list mtminus-3"
          :pagination="{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '50', '100'],
          }"
        >
        <template slot="createNewSites" slot-scope="createNewSites">
          <span :class="getColor(createNewSites.pendingSite)" >
            
            <a-tooltip  placement="top">
              ({{ createNewSites.pendingSite }})
            <!-- <a-icon type="eye" :style="{color:'blue',fontSize: '15px'}" @click="goto('/administration/sites/approval?lId='+createNewSites.globalId)" /> -->
            </a-tooltip>
          </span>
        </template>
        <template slot="pendingZone" slot-scope="pendingZone">
          <a-tooltip  placement="top">
          <span :class="getColor(pendingZone.pendingZone)">
            ({{ pendingZone.pendingZone }})
          </span>
        </a-tooltip>
        </template>
          <template slot="action" slot-scope="action">
            <a-button  type="primary" :loading="loading" dashed @click="getById(action.globalId)">
              {{action.status}}
            </a-button>
          </template>
        </a-table>
        <a-modal
          :visible="visibleZone"
          title="Add Reason"
          class="support-add-modal"
          :dialog-style="{ top: '20px' }"
          :loading="loading"
          :footer="null"
          :width="600"
          @cancel="reasonModalZone('','',false)"
        >
        <a-form :form="form" @submit="onSubmitReasonZone">
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

        <a-modal
          :visible="visibleDetailModel"
          title="Lab Detail"
          class="support-add-modal"
          :dialog-style="{ top: '20px' }"
          :loading="loading"
          :footer="null"
          :width="650"
          @cancel="visibleDetailModelView(false)"
        >
        <a-row>
          <a-row>
              <a-col :span="4"><b>Lab Name :</b></a-col>
              <a-col :offset="2" :span="5">{{labDat.name}}</a-col>
              <a-col :offset="2" :span="4"><b>Lab Manager :</b></a-col>
              <a-col :offset="2" :span="5">{{ labDat.headName }}</a-col>
          </a-row>
          <a-row class="pt-10">
              <a-col :span="4"><b>Deputy Manager :</b></a-col>
              <a-col :offset="2" :span="5">{{ labDat.deputyManager }}</a-col>
              <a-col :offset="2" :span="4"><b>Manager Email :</b></a-col>
              <a-col :offset="2" :span="5">{{ labDat.email }}</a-col>
          </a-row>
          <a-row class="pt-10">
              <a-col :span="4"><b>DM Email :</b></a-col>
              <a-col :offset="2" :span="5">{{ labDat.deputyManagerEmail }}</a-col>
              <a-col :offset="2" :span="4"><b>Address :</b></a-col>
              <a-col :offset="2" :span="5">{{ labDat.address }}</a-col>
          </a-row>
          <a-row class="pt-10">
                <a-col :span="4"><b>City :</b></a-col>
                <a-col :offset="2" :span="5">{{labDat.city}}</a-col>
                <a-col :offset="2" :span="4"><b>Country :</b></a-col>
                <a-col :offset="2" :span="5">{{ labDat.countryName }}</a-col>
          </a-row>
          <H3 class="mt-10">Lab Sites</H3>
          <a-row v-for="(site ) in labDat.siteResponseDTO" :key="site.id" >
            <a-col :span="12"><b>{{ site.name }}</b></a-col>
            <a-col :span="12"></a-col>
            
            <a-row class="consentClass mt-25" v-for="zon in site?.siteZoneResponseDTO" :key="zon.id">
              <a-col :span="12" class="pl-10" >{{ zon.name }}</a-col>
              <a-col :offset="2" :span="10" v-if="zon.status!== pending"><center>{{ zon.status }}</center></a-col>
              <a-col :offset="2" :span="10" v-else>
                <a-button type="primary" class="wd-11btn" :loading="loading" dashed @click="eSignature(zon.id, approve)">
              Approve
            </a-button>
            <a-button   class="new-treatment-btn wd-11btn" :loading="loading" dashed @click="reasonModalZone(zon.id, reject,true)">
              Reject
            </a-button>
              </a-col>
            </a-row>
          </a-row>
        </a-row>
          <!-- <a-row class="mt-15">
            <a-col :offset="16" v-if="labDat.status === pending">
            <a-button type="primary" :loading="loading" dashed @click="accepted(labDat.globalId, approve)">
              Approve
            </a-button>
            <a-button   class="new-treatment-btn" :loading="loading" dashed @click="reasonModal(labDat.globalId, reject,true)">
              Reject
            </a-button>
          </a-col>
          </a-row> -->
        
            
         
        </a-modal>
        <a-modal 
      :visible="visibleSignature"
      :footer="null"
      class="error-model"
      @cancel="handleOk()"
      @ok="handleOk()"
    >
    <Signature @handleSignatureOk="handleSignatureOk" @handleSignatureCancel="handleSignatureCancel"/>
    </a-modal>

      </div>
    </page-layout>
  </template>
  <script>
  import notifications from '~/mixins/notifications'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  import LabServices from '~/services/API/LabServices'
  import ZoneServices from '~/services/API/ZoneServices'
  import {CONSENT_STATUSES} from '~/services/Constant/index.js'
  import Signature from '~/components/signature'
  export default {
    components: { PageLayout,Signature },
    mixins: [routeHelpers, notifications],
    data() {
      return {
        dataSource:[],
        visible:false,
        loading: false,
        labGlobalId : 0,
        labDat:{},
        zoneId:0,
        zoneData:{},
        visibleSignature: false,
        labId:'',
        visibleZone:false,
        status: '',
        visibleDetailModel:false,
        approve: CONSENT_STATUSES.approved.name,
        reject: CONSENT_STATUSES.reject.name,
        pending: CONSENT_STATUSES.pending.name,
        form: this.$form.createForm(this, { name: 'reasonForm' }),
        columns: [
        {
          title: `Lab`,
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: `Address`,
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: `Lab Manager`,
          dataIndex: 'headName',
          key: 'headName',
        },
        {
          title: `City`,
          dataIndex: 'city',
          key: 'city',
        },
        {
          title: `Country`,
          dataIndex: 'countryName',
          key: 'country',
        },
        {
          title: `Email Address`,
          key: 'email',
          dataIndex: 'email',
        },
        {
          title: 'Pending Sites Zones',
          key: 'pendingZone',
          scopedSlots: { customRender: 'pendingZone' },
        },
        {
          title: `View Sites`,
          key: 'createNewSites',
          scopedSlots: { customRender: 'createNewSites' },
        },
        {
          title: `Action`,
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
       
      }
    },
    computed: {  
    },
    mounted() {
      this.getPending()
    },
    methods: {
    accepted(globalId, status){
      this.loading = true
      const formData = new FormData()
      formData.append('status',status)
      formData.append('globalId',globalId)
      LabServices.approval(formData).then((response)=>{
        this.visibleDetailModel = false
        this.getPending()
      }).catch(this.error).finally(this.loading=false)
    },  
    getColor(site){
      return site > 0 ? 'color-red' : ''
    },
    onSubmitReason(e) {    
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
              this.loading = true
              const formData = new FormData()
              formData.append('status',this.status)
              formData.append('globalId',this.labGlobalId)
              formData.append('reason',values.reason)
              LabServices.approval(formData).then((response)=>{
                this.visibleDetailModel = false
                this.getPending()
                this.reasonModal('','',false)
              }).catch(this.error).finally(this.loading = false)
            }
        })
    },
    reasonModal(globalId, status, show) {
      if(show){
        this.visible = show
        this.labGlobalId = globalId
        this.status = status
      } 
      else { 
        this.visible = show
        this.labGlobalId = 0
        this.status = ''
      }
    },
    visibleDetailModelView(act)
    {
      this.visibleDetailModel = act
    },
    getById(id)
    {
      LabServices.getById(id).then((response)=>{
        this.labId = id
        this.labDat = response.data
        this.visibleDetailModel = true
      })
    },
    eSignature(id,stats)
    {
      this.zoneId = id
      this.visibleSignature = true
      this.status = stats
    },
    getPending(){
      this.loading = true
      LabServices.getPending().then((response)=>{
        this.dataSource = response.data
      }).catch(this.error).finally(this.loading = false)
    },
    acceptedZone(id, status){
      this.loading = true
      const formData = new FormData()
      formData.append('status',status)
      formData.append('id',id)
      ZoneServices.approval(formData).then((response)=>{
        this.getById(this.labId);
        this.getPending()
      }).catch(this.error).finally(this.loading=false)
      },
      reasonModalZone(id, status, show){
        
        if(show){
        this.visibleZone = show
        this.zoneId = id
        this.status = status
      } else { 
        this.visibleZone = show
        this.zoneId = 0
        this.status = ''
      }
      },
      onSubmitReasonZone(e){
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            
            this.zoneData = values
            this.visibleSignature = true
          }
        })
      },
      handleSignatureOk() {
      this.visibleSignature = false
      if(this.status === this.reject)
      {
      this.upsert(this.zoneData)
      }
      else{
        this.acceptedZone( this.zoneId,this.status)
      }
    },
    handleSignatureCancel(){
      this.visibleSignature = false
      this.loading = false
    },
    handleOk() {
      this.handleSignatureCancel()
    },
      upsert(values){
        this.loading = true
              const formData = new FormData()
              formData.append('status',this.status)
              formData.append('id',this.zoneId)
              formData.append('reason',values.reason)
              ZoneServices.approval(formData).then((response)=>{
                this.getById(this.labId)
                this.getPending()
                this.reasonModalZone('','',false)
              }).catch(this.error).finally(this.loading = false)
      }
    },
  }

  
  </script>
  