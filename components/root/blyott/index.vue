<template>
    <div class="home-page">
      <a-row>
        <a-col :span="24" :xs="24" :md="24" :sm="24" :lg="24" :xl="24">
          <a-card class="grey-card smartlab_home" :bordered="false">
            <a-row>
              <!-- left side tabs -->
              <a-col :md="11" :lg="8">
                <!-- <a
                  href="javascript:;"
                  @click="handleSidebarKey('/inventory', 15)"
                >
                  <div class="home-tab mt-0">
                    
                    <h4 class="heading-home">
                      Manage
                      <strong class="strong">
                        Inventory
                      </strong>
                    </h4>
                  </div>
                </a> -->
  
                <a
                  href="javascript:;"
                  @click="handleSidebarKey(`/inbound/samples/form`, 13)"
                >
                  <div class="home-tab">
                    <img
                      src="https://cgt-dev-ft.microsysx.com/images/v2/icons/note-board-scheduling.svg"
                      width="120"
                      height="100"
                    />
                    <h4 class="heading-home">
                      Register
                      <strong class="strong">
                        New Sample
                      </strong>
                    </h4>
                  </div>
                </a>
  
                <a href="javascript:;" @click="handleSidebarKey(`/projects`,16)">
                  <div class="home-tab with-arrow">
                    <img
                      src="https://cgt-dev-ft.microsysx.com/images/v2/icons/enroll-new-patient.svg"
                      width="120"
                      height="100"
                    />
                    <h4 class="heading-home">
                      Start
                      <strong class="strong">
                        New Projects
                      </strong>
                    </h4>
                  </div>
                </a>
                <a href="javascript:;" @click="handleSidebarKey(`/outbound/orderSummary`,14)">
                  <div class="home-tab with-arrow">
                    <img
                      src="https://cgt-dev-ft.microsysx.com/images/v2/icons/Group%20644.svg"
                      width="120"
                      height="100"
                    />
                    <h4 class="heading-home">
                      View
                      <strong class="strong">
                        Orders
                      </strong>
                    </h4>
                  </div>
                </a>
              </a-col>
              <!-- #end left side tabs -->
              <a-col :span="3"></a-col>
  
              <a-col :md="10">
                <a-row>
                    <a-col :span="24">
                      <a-card class="white-card" :bordered="false">
                        <a-row>
                          <a-col :span="9"
                            ><span class="dated-time">
                              {{ _getFormatMoment().format('HH:mm') }}</span
                            >
                          </a-col>
                          <a-col :span="10">
                            <div class="dateTimeBox">
                              <span class="daysName">{{
                                _getFormatMoment().format('dddd')
                              }}</span>
                              <br />
                              <span class="TodaysDate">{{
                                _getFormatMoment().format('Do MMM YYYY')
                              }}</span>
                            </div>
                          </a-col>
                        </a-row>
                      </a-card>
                    </a-col>
                  </a-row>

                  <a-col :span="24">
          <a-card
            
            class="white-card"
            :bordered="false"
          >
            <a-row>
              <a-col :span="24">
                <div>
                  <a-col :span="24">
                    <span class="float-left ml-10">
                      {{ translation.Sampl_1_310 }}
                    </span>
                    <span class="float-right ml-10">
                      Inbound/Outbound
                    </span>
                  </a-col>
                </div>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <div class="h-tabs large-tabs float-right sample-tabs-small">
                  <a-table class="rounded-table"
                          :columns="completedColumns"
                          :data-source="outbound">

                  </a-table>
                </div>
              </a-col>
            </a-row>
            <div
              class="text-center p-15 red-div-size"
              style="cursor: pointer"
              @click="goto(`/task`)"
            >
              {{ translation.Showmore_2_534 }}
            </div>
          </a-card>
        </a-col>

              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </template>
  
  <script>
  // import { HubConnectionBuilder } from '@aspnet/signalr'
  import userDetail from '~/mixins/user-detail'
  import routeHelpers from '~/mixins/route-helpers'
  import {_getFormatMoment} from '~/services/Helpers/MomentHelpers'
  import SampleServices from '~/services/API/SampleServices'
  export const  newSampleData = [
      {
        patientEnrollmentNumber: 'DAC7993',
        // treatmentType: 'Human Cells ',
        hospital: 'Bio Bank',
        collectionDateDeliveryDate: '05/03/2023 - 06/03/2023',
        print: 'Uploads/DocumentURL/shipping notice.jpg',
        processSample: 'green',
      },
      {
        patientEnrollmentNumber: 'DAC7986',
        // treatmentType: 'Human Cells ',
        hospital: 'Bio Bank',
        collectionDateDeliveryDate: '04/03/2023 - 07/03/2023',
        print: 'Uploads/DocumentURL/shipping notice.jpg',
        processSample: 'green',
      },
    ]
  export default {
    mixins: [routeHelpers, userDetail],
     
    
    data() {
      return {
        outbound:newSampleData,
        sample:[],
        completedColumns: [
        {
          title: `${this.$store.getters.getTranslation.SamplID_2_502}`,
          dataIndex: 'patientEnrollmentNumber',
          key: 'patientEnrollmentNumber',
        },
        {
          title: `${this.$store.getters.getTranslation.SamplName_2_503}`,
          dataIndex: 'treatmentType',
          key: 'treatmentType',
        },
        {
          title: `${this.$store.getters.getTranslation.StoraArea_2_504}`,
          dataIndex: 'productionLine',
          key: 'productionLine',
        },
        {
          title: `${this.$store.getters.getTranslation.Clien_1_505}`,
          dataIndex: 'hospital',
          key: 'hospital',
        },
        {
          title: `${this.$store.getters.getTranslation.ArrivDate_5_535}`,
          dataIndex: 'collectionDateDeliveryDate',
          key: 'collectionDateDeliveryDate',
        },
      ],
      }
    },
    computed: {
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    mounted() {},
    methods: {
      getTodaySample(){
        SampleServices.getTodaySample().then((response)=>{
          this.sample = response.data
        })
      },
      gotoView(uri) {
        this.goto(`/${uri}`)
      },
      _getFormatMoment
    },
  }
  </script>
  <style scoped>
  .smartlab_home {
    padding-top: 0 !important;
  }
  </style>
  