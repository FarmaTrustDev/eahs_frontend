<template>
    <div class="inventory-page">
      <a-row>
        <a-col :span="24">
          <a-tabs
            :animated="false"
            class="h-tabs no-border-bottom"
            style="margin-top: -30px;"
            :default-active-key="1"
            @change="callback"
          >
            <a-tab-pane v-for="d in data" :key="d.id">
              <template slot="tab">
                <span class="flag-title">
                  <img width="40" :src="getImageUrl(removeQuotes(d.icon))" />{{ d.city }} {{ d.countryName }} - {{ d.name }}
                  </span
                >
              </template>
              <div class="mb-15" style="margin-top: -5px;">
                <h2 class="color-black">
                  {{ d.countryName }} <img width="40" :src="getImageUrl(removeQuotes(d.icon))" />
                </h2>
              </div>
              <a-row :gutter="16" style="margin-top: -5px;">
                <a-col :span="10" class="icon-col"
                  ><a-icon type="pushpin" theme="filled" /> {{ d.address }}</a-col
                >
                <a-col :span="7" class="color-black icon-col"
                  ><a-icon type="global" /> {{ d.headName }}
                </a-col>
                <a-col class="color-black icon-col" :span="7"
                  ><strong>@</strong> {{ d.email }}</a-col
                >
              </a-row>
              <a-row :gutter="16" class="mt-10" style="margin-left: 10px;">
                <a-tabs>
                  
                  <a-tab-pane key="1" tab="Storage Unit">
                    <Listing :storages="dynamicStorage" :typeId="isInbound" class="mt-25" />
                  </a-tab-pane>
                  <a-tab-pane key="2" tab="Sample List">
                    <a-table :scroll="{ x: true }"
                :columns="columnsReception"
                :loading="loading"
                :data-source="sampleData"
                class="rounded-table pt-10 users-list"
                :pagination="{
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '30', '50', '100'],
                }"
              >
        </a-table>
                    <!-- <a-table
                      class="rounded-table"
                      :should-update="shouldUpdate"
                      :should-fetch="false"
                      :data-source="data"
                      :columns="productsColumn"
                      :customRow="customRow"
                    >
                    </a-table> -->
                  </a-tab-pane>
                </a-tabs>
              </a-row>
            </a-tab-pane>
          </a-tabs>
        </a-col>
      </a-row>
    </div>
  </template>
  <script>
  import LabServices from '~/services/API/LabServices'
  import SampleServices from '~/services/API/SampleServices'
  import ImagesHelper from '~/mixins/images-helper'
  import FridgeServices from '~/services/API/FridgeServices'
  import Listing from '~/components/inventory/storage/Listing'
  import { isEmpty } from '~/services/Helpers'

  export default {
    mixins: [ImagesHelper],
    components: { Listing },
    data() {
      return {
        data: [],
        dynamicStorage:[],
        isInbound: false,
        sampleData:[],
        columnsReception: [
        {
          title: 'Client',
          dataIndex: 'clientName',
          key: 'clientName',
        },
        {
          title: 'Sample ID',
          dataIndex: 'sampleId',
          key:'sampleId',
        },
        {
          title: 'Type',
          dataIndex: 'typeName',
          key:'typeName',
        },
        {
          title: 'Quantity',
          dataIndex: 'totalQuantity',
          key: 'totalQuantity' ,
        },
        {
          title: 'Project Name',
          dataIndex: 'projectName',
          key: 'projectName' ,
        },
        {
          title: 'Location',
          dataIndex: 'locationName',
          key:'locationName',
        },
        {
          title:'Date',
          dataIndex: 'dateReceived',
          key:'dateReceived',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          scopedSlots: {
          customRender: 'status',
          }
        }
      ],
      }
    },
    computed: {
      translation() {
        return this.$store.getters.getTranslation
      },
    },
  
    watch:{
      /* translation(newValues, oldValue){
        if(newValues!==oldValue){
          this.data[0].description.global=this.translation.Headof_3_549 + ' - Stephen Jones'
          this.data[1].description.global=this.translation.Headof_3_549 + ' - Stephen Jones'
          this.data[2].description.global=this.translation.Headof_3_549 + ' - Stephen Jones'
          this.data[3].description.global=this.translation.Headof_3_549 + ' - Stephen Jones'
        }
      } */
    },  
    mounted() {
      this.getLab()
      this.getSamples()
    },   
    methods: {
      removeQuotes(img){
        if(!isEmpty(img)){
          return img.replace(/"/g, '')
        }
      },
      callback(key) {
        console.log(key)
        this.getAllFridgesByLabId(key)
      },
      getLab(){
        LabServices.get().then((response)=>{
            this.data=response.data
            this.getAllFridgesByLabId(this.data[0].id)
        })
      },
      getSamples(){
        SampleServices.get().then((response)=>{
            this.sampleData=response.data
            // this.getAllFridgesByLabId(this.data[0].id)
        })
      },
      getAllFridgesBySiteId(id, fridgeTypeId){
        FridgeServices.getAllFridgesBySiteANDFTypeId(id,fridgeTypeId).then((response)=>{
          this.dynamicStorage=response.data
          console.log(response.data)
        })
      },
      getAllFridgesByLabId(id){
        FridgeServices.getAllFridgesByLabId(id).then((response)=>{
          this.dynamicStorage=response.data
          console.log(response.data)
        })
      },
    },
  }
  </script>
  