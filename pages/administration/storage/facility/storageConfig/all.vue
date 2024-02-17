<template>
    <page-layout
      :create="false"
      :back="false"
      :loading="loading"
      :bordered="false"
      class="container page-search-input-container"
      >
      <!-- :title="translation.AddStora_3_557" -->
      <template slot="headerMenus">
        
        <a-input
          ref="userNameInput"
          class="page-search-input mtminus-7 float-right"
          placeholder="Search Equipment"
        >
          <a-icon slot="prefix" type="search" />
        </a-input>
      </template>
      <div class="add_storage mtminus-3" slot="content">
        <a-table
          :columns="columns"
          :data-source="dataSource"
          class="rounded-table"
          :pagination="{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30', '50', '100'],
          }"
        >
          <template slot="shelves" slot-scope="shelves">
            <span>
              <a-tooltip title="View Shelves and Racks" placement="top">
              <span :style="{color:'blue',fontSize: '15px'}" @click="goto('/administration/storage/facility/storageConfig/newFridge?fId='+shelves.globalId+'&approval='+true+'&view='+true)">View Detail</span>
              </a-tooltip>
            </span>
          </template>
         
        </a-table>
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
    </page-layout>
  </template>
  <script>
  import { preventDefault } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  import FridgeServices from '~/services/API/FridgeServices'
  import { CONSENT_STATUSES } from '~/services/Constant'
  export default {
    components: {
      PageLayout,
    },
    mixins: [routeHelpers],
    data() {
      return {
        dataSource: [],
        visible: false,
        pending: CONSENT_STATUSES.pending.name,
        accept: CONSENT_STATUSES.accept.name,
        reject: CONSENT_STATUSES.reject.name,
        form: this.$form.createForm(this, { name: 'fridgeForm' }),
        columns: [
          {
            title: `${this.$store.getters.getTranslation.EquipName_2_553}`,
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: `Equipment Type`,
            dataIndex: 'fridgeTypeName',
            key: 'equipmentTypeId',
          },
          {
            title: `${this.$store.getters.getTranslation.Lab_1_566}`,
            dataIndex: 'labName',
            key: 'labName',
          },
          {
            title: `Site`,
            dataIndex: 'siteName',
            key: 'siteName',
          },
          {
            title: `${this.$store.getters.getTranslation.LabZone_2_554}`,
            dataIndex: 'siteZoneName',
            key: 'siteZoneName',
          },
          {
            title: `Status`,
            dataIndex: 'status',
            key: 'status',
          },
          {
            title: `View Shelves & Racks`,
            key: 'shelves',
            scopedSlots: { customRender: 'shelves' },
          },
          
        ],
        loading: false,
        fullName: [],
        fridgeId:0
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
    watch: {
      translation(newValues, oldValue) {
        if (newValues !== oldValue) {
          this.columns[0].title = newValues.EquipName_2_553
          this.columns[2].title = newValues.Lab_1_566
          this.columns[4].title = newValues.LabZone_2_554
          // this.columns[6].title = newValues.Actio_1_220
        }
      },
    },
    mounted() {
      this.getTranslationData()
      this.fetchFridge()
    },
    methods: {
      preventDefault,
      getTranslationData() {
        this.columns[0].title = this.translation.EquipName_2_553
        this.columns[2].title = this.translation.Lab_1_566
        this.columns[4].title = this.translation.LabZone_2_554
        // this.columns[6].title = this.translation.Actio_1_220
      },
      fetchFridge(){
        FridgeServices.get().then((response)=>{
          this.dataSource=response.data
        })
      },
      accepted(id, status){
      this.loading = true
      const formData = new FormData()
      formData.append('status',status)
      formData.append('globalId',id)
      FridgeServices.approval(formData).then((response)=>{
        this.fetchFridge()
      }).catch(this.error).finally(this.loading=false)
    },  
    reasonModal(id, status, show) {
      if(show){
        this.visible = show
        this.fridgeId = id
        this.status = status
      } else { 
        this.visible = show
        this.fridgeId = 0
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
              formData.append('globalId',this.fridgeId)
              formData.append('reason',values.reason)
              FridgeServices.approval(formData).then((response)=>{
                this.fetchFridge()
                this.reasonModal('','',false)
              }).catch(this.error).finally(this.loading = false)
            }
        })
    },
    },
  }
  </script>
  