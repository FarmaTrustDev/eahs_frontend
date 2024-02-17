<template>
    <page-layout
      :loading="false"
      :title="parseInt(processAction) === 0 ?'Inbound/ Sample Reception/ Location':'Outbound/Location' "
      class="specific container page-search-input-container"
      :create="false"
    >
      
      <div slot="content">
        <div class="ant-col ant-col-12 pl-10p">
          <h3 class="mt-20m"><b>You need to <span v-if="parseInt(processAction)===0">store</span> <span v-else>pick</span> {{sampleData.totalQuantity - sampleData.productQuantity}} Vials at {{fridgeType}}</b></h3>
            <b>select your storage location  .  <a-button type="primary" class="hgtBtn">AutoSelect</a-button> <a-button type="primary" class="hgtBtn">SelectManually</a-button></b> 
        </div>
        <div class="ant-col ant-col-5">
        </div>

        <div class="ant-col ant-col-7"  >
            <a-card>
              <a-row >
                  <div class="ant-col-4 colSty" style="background-color: #2f78e366;" ></div>
                  <div class="ant-col-20 plt-10"  >Heigh availability or empty</div>
                </a-row >
                <a-row class="topClass">
                  <div class="ant-col-4 colSty" style="background-color: orange;"></div>
                  <div class="ant-col-20 plt-10"  >Medium availability</div>
                </a-row>
                <a-row class="topClass">
                  <div class="ant-col-4 colSty " style="background-color: #eb101066;"></div>
                  <div class="ant-col-16 plt-10"  >No availability or full</div>
                </a-row>
            </a-card>
        </div>

        <div class="ant-col ant-col-1"></div>
        <div class="ant-col ant-col-6" style="margin-top:50px">
            <div class="img">
                <div>
                  <svg width="129" height="165" viewBox="0 0 49 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="80" rx="4" fill="#D9D9D9"></rect> 
                    <path d="M0 19H48V39H0V19Z" da="3" :class="getBlinkClass()" :fill="getColor(3)"></path> 
                    <path d="M0 39H48V59H0V39Z" da="2" :class="getBlinkClass()" :fill="getColor(2)"></path> 
                    <path d="M0 59H48V75C48 77.2091 46.2091 79 44 79H4C1.79086 79 0 77.2091 0 75V59Z" :class="getBlinkClass()" :fill="getColor(1)" da="1"></path> 
                    <path d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H44C45.933 0.5 47.5 2.067 47.5 4V39.5H0.5V4Z" stroke="#1943AE"></path> 
                    <path d="M0.5 40.5H47.5V76C47.5 77.933 45.933 79.5 44 79.5H4C2.067 79.5 0.5 77.933 0.5 76V40.5Z" stroke="#1943AE"></path> 
                    <path d="M3 80H44.703L44.1048 81.4955C43.4973 83.0141 42.0265 84.0099 40.3909 84.0099H7.0812C5.17447 84.0099 3.53281 82.6641 3.15887 80.7944L3 80Z" fill="black"></path> 
                    <line x1="4.50977" y1="14.9258" x2="4.50976" y2="31.5693" stroke="#1943AE" stroke-linecap="round"></line> 
                    <line x1="4.50977" y1="53.4209" x2="4.50976" y2="70.0645" stroke="#1943AE" stroke-linecap="round"></line>
                  </svg>
                </div>
            </div>
            <div class="title mb-10">
                        {{fridgeDatas.name}}
            </div>
        </div>
        <div class="ant-col ant-col-8" style="margin-top: 20px;">
          <div slot="center" class="text-center">
            <span>Please select a shelf</span>
              <racks
                :data="fridgeDatas.shelves"
                @getRackPortion="getRackPortion"
              />
            </div>
        </div>
        <div class="ant-col ant-col-9" style="margin-top: 20px;">
          
            <div slot="center" class="text-center">
              <Trays
                v-if="!isEmpty(numCols)"
                :numCols="numCols"
                :numRows="numRows"
                :portion-id="portionId"
                :fridge-id="fridgeDatas.id"
                :shelf-id="shelfId"
                :num-vials="sampleData.totalQuantity - sampleData.productQuantity"
                :sample-id="sampleId"
                :temp-id="tempId"
                :list="rackData.list"
                :sample-list="rackSampleData.list"
                :sample-id-num="sampleIdNum"
                :step-id="stepId"
                :process-id="processId"
                :process-action="parseInt(processAction)"
              />
              
            </div> 
        </div>
        <div v-if="rackSampleData.list !== undefined">
          <div class="ant-col ant-col-24">
            {{ sampleData.puid }}
            <hr />
          </div>
            <div class="ant-col ant-col-8">
              {{fridgeDatas.name}}
            </div>
            <div class="ant-col ant-col-9">
              Shelf {{shelfId}} Box {{ portionId }}
            </div>
            <div class="ant-col ant-col-6">
              <table class="testTubeTable w-100">
                <tr v-for="rowIndex in getUniqueRowIndices" :key="rowIndex">
                  <td v-for="cell in getCellsForRowIndex(rowIndex)" :key="cell.colIndex" class="fake-column">
                    <span>{{ cell.rowIndex + toLetters(cell.colIndex) }}</span>
                  </td>
                </tr>
              </table>
            </div>
          <div class="ant-col ant-col-24">  
            <hr />
          </div>
        </div>
      </div>
    </page-layout>
  </template>
  <script>
  import notifications from '~/mixins/notifications'
  import { preventDefault,isEmpty,toLetters } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  import { fridgeData } from '~/services/Constant/DummyData'
  import FridgeServices from '~/services/API/FridgeServices'
  import racks from '~/components/inventory/storage/racks'
  import Trays from '~/components/inventory/storage/trays'
  import SampleServices from '~/services/API/SampleServices'
  import SampleStorageServices from '~/services/API/SampleStorageServices'
  import FridgeTypeServices from '~/services/API/FridgeTypeServices'
  // import PageLayout from '~/components/layout/PageLayout'
  const colors = {
    red: '#FC1212',
    blue: '#2F79E3',
    yellow: '#FE9418',
    grey: '#D9D9D9',
  }
  const typeColor = [colors.grey, colors.blue, colors.yellow, colors.red]
  export default {
    components: { PageLayout,racks,Trays },
    mixins: [routeHelpers, notifications],
    props:{
      entity: { 
        type: Object,
         default: () => ({}) 
        }
    },
    data() {
      return {
        autoSelect:null,
        trayData: [],
        fridgeData,
        Trays,
        inbound:10,
        outbound:5,
        processing:7,
        scheduled:3,
        fridgeId:'',
        fridgeDatas:{},
        numCols:'',
        numRows:'',
        portionId:'',
        shelfId:'',
        sampleId:'',
        tempId:'',
        sampleData:{},
        rackData:{},
        rackSampleData:{},
        fridgeType:'',
        type:'',
        sampleIdNum:0,
        stepId:'',
        processId:'',
        processAction:0,
      }
    },
    computed: {
      getUniqueRowIndices() {
        // Get unique rowIndex values from the data
        if(this.rackSampleData.list !== undefined){
          if(this.rackSampleData.list.length>0){
            return [...new Set(this.rackSampleData.list.map((item) => item.rowIndex))];
          }
        }
        return null
      },
    },
    mounted() {
      this.fridgeId = this.$route.query.id
      this.sampleId = this.$route.query.sampleId
      this.tempId = this.$route.query.tempId
      this.stepId = this.$route.query.stepId
      this.processId = this.$route.query.processId
      this.processAction = this.$route.query.processAction
      this.getRacks()
      this.getSample()
    },
    methods: {
      isEmpty,
      toLetters,
      getUpperPortion(type) {
        if (this.type > 1) {
          return colors.red
        }
        return colors.grey
      },
      getCellsForRowIndex(rowIndex) {
        // Get cells for a specific rowIndex
        return this.rackSampleData.list.filter((item) => item.rowIndex === rowIndex);
      },
      getLowerPortion(type) {
        if (this.type > 1) {
          return colors.red
        }
        if (this.type === 1) {
          return colors.yellow
        }
        return colors.grey
      },
      getColor(type) {
        if(this.fridgeDatas.quantity<=25){
          this.type=1
        }
        else if(this.fridgeDatas.quantity>25 && this.fridgeDatas.quantity<=75){
          this.type=2
        }
        else{
          this.type=3
        }
        return type <= this.type ? typeColor[this.type] : '#D9D9D9'
      },
      getBlinkClass() {
        if(this.fridgeDatas.quantity<=25){
          this.type=1
        }
        else if(this.fridgeDatas.quantity>25 && this.fridgeDatas.quantity<=75){
          this.type=2
        }
        else{
          this.type=3
        }
        return this.type > 2 && 'blink_me'
      },
      getRackPortion(portions,shelfId) {
        // console.log(shelfId)
        this.shelfId=shelfId
        this.trayData = portions.trays
        this.numCols=portions.noOfCols
        this.numRows=portions.noOfRows
        this.portionId=portions.id
        this.getStorageByRackId()
        this.getStorageByRackAndSampleById()
      },
      getStorageByRackId(){
        SampleStorageServices.getByRackId(this.portionId).then((response)=>{
          this.rackData=response.data
          // console.log(this.rackData)
        })
      },
      getStorageByRackAndSampleById(){
        SampleStorageServices.getBySampleAndRackId(this.sampleId, this.portionId).then((response)=>{
          this.rackSampleData=response.data
          // console.log(this.rackSampleData)
        })
      },
      getTube(tube) {
        this.steps = tube.steps
        this.steps[0].by=this.translation.InbouDate_2_635
        this.steps[1].by=this.translation.InbouProce_2_513
        this.steps[2].by=this.translation.Stora_1_366
        this.steps[3].by=this.translation.VisuaCheck_2_636
        this.steps[4].by=this.translation.PackaDepot_2_637
        this.steps[5].by=this.translation.CouriPick_3_648       
      },
      getSample() {
        SampleServices.getById(this.sampleId).then((response) => {
          this.sampleData = response.data
          console.log(this.sampleData.sampleId)
          this.sampleIdNum=this.sampleData.sampleId
          this.getRacksByFridgeAndSampleId()
          this.getFridgeType(this.sampleData.idealTemprature)
        })
      },
      getFridgeType(id){
        FridgeTypeServices.getById(id).then((response)=>{
          this.fridgeType=response.data.name
        })
      },
      getRacks(){
        FridgeServices.getAllRacksByFridgeId(this.fridgeId).then((response)=>{
          this.fridgeDatas=response.data
          console.log(this.fridgeDatas)
        })
      },
      getRacksByFridgeAndSampleId(){
        FridgeServices.getAllRacksByFridgeSampleId(this.sampleIdNum, this.fridgeId).then((response)=>{
          this.fridgeDatas=response.data
          console.log(this.fridgeDatas)
        })
      },
      preventDefault,
      
    },
  }
  </script>
  <style>
  .mg-50{
    margin-left: 50px;
  }
  .colSty{
    height: 25px;width: 33px;border-radius: 10px;
  }
  .pl-10p{
  padding-left: 15px;
  padding-top: -15px;
}
.mt-20m {
  margin-top: -20px;
}
.plt-10{
  padding-left: 10px;
  padding-top: 2px;
}
</style>
  