<template>
  <div>
    <a-row>
      <a-col :span="4"></a-col>
      <a-col :span="20">
        <table class="testTubeTable w-100">
          <tr>
            <td v-for="c in numCols" :key="c" class="fake-column">
              <span class="">{{ toLetters(c) }} </span>
            </td>
          </tr>
        </table>
      </a-col>
      <a-col :span="4">
        <div v-for="c in numRows" :key="c" class="fake-row">
          <span class="">{{ c }} </span>
        </div>
      </a-col>
      <a-col :span="20">
        <table class="testTubeTable w-100">
          <tr v-for="indexParent in numRows" :key="indexParent">
            <td v-for="index in numCols" :key="index+'-'+indexParent+'-'+portionId" class="border">
              <span >
                <tray 
                  :isActive="checkIsActive(index, indexParent)" 
                  :isPermanent="checkExists(index, indexParent)" 
                  :is-inventory="isInventory" 
                  :num-vials="numVials" 
                  :count="count" 
                  :edit-count="editCount"
                  :edit-length="editLength"
                  :process-action="processAction"
                  :makeHoverDisable="(!checkIsActive(index, indexParent)) || checkExists(index, indexParent)" 
                  :col="index" 
                  :row="indexParent" 
                  @getData="getData"  
                  @getColRow="getColRow"  
                  @getEditColRow="getEditColRow"
                  @getPublishData="getPublishData"
                />
              </span>
            </td>
          </tr>
        </table>
      </a-col>
      <a-col :offset="22" :span="2">
        <a-button v-if="sampleId!==undefined && processAction===0" type="primary" :loading="loading" :disabled="!enabled" class="float-right wd-12" style="margin-top: 30px;" @click="submit()">Save</a-button>
        <a-button v-else-if="sampleId!==undefined && processAction===1" type="primary" :loading="loading" :disabled="!enabled" class="float-right wd-12" style="margin-top: 30px;" @click="publish()">Publish</a-button>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import tray from '~/components/inventory/storage/trays/tray'
import routeHelpers from '~/mixins/route-helpers'
import { toLetters } from '~/services/Helpers'
import SampleStorageServices from '~/services/API/SampleStorageServices'
export default {
  components: { tray },
  mixins: [routeHelpers],
  props: { 
    numVials:{ type: Number },
    numCols:{ type: Number },
    numRows:{ type: Number },
    portionId:{ type: Number },
    shelfId:{ type: Number },
    fridgeId:{ type: Number },
    sampleId:{ type: String },
    processId:{type:String},
    stepId:{type:String},
    sampleIdNum:{ type: Number },
    tempId:{ type: String },
    processAction:{ type: Number },
    isInventory:{type: Boolean},
    list: { type: Array, default: () => [] },
    sampleList: { type: Array, default: () => [] }
  },
  data() {
    return {
      row: 0,
      column: 0,
      count: 1,
      selectedVals:[],
      // editVals:this.list.slice(),
      loading:false,
      enabled:false,
      // autoSelects: this.autoSelect,
      totCount: this.numVials,
      editCount:0,
      // editLength:0,
    }
  },
  computed: {
    editVals() {
      return this.list.slice(); // Use slice to create a shallow copy of the list
    },
    editLength() {
      if(this.sampleList!==undefined){
        return this.sampleList.length; // Return the length of the list
      }
      return 0;
    },
  },
  methods: {
    toLetters,
    checkIsActive(col,row){      
      const index = this.selectedVals
                  .findIndex((item) => 
                    item.colIndex === col && 
                    item.rowIndex===row && 
                    item.rackId===this.portionId && 
                    item.shelfId===this.shelfId && 
                    item.fridgeId===this.fridgeId
                  )
      // alert(index)
      if(index===-1){
        return true
      }else{
        return false
      }
    },
    checkExists(col,row){
      
      const index = this.editVals.findIndex((item) => item.colIndex === col && 
                                                      item.rowIndex===row &&
                                                      item.fridgId===this.fridgeId &&
                                                      item.shelfId===this.shelfId &&
                                                      item.rackId===this.portionId
                                                      )
      if(index===-1){
        return false
      }else{
        return true
      }
    },
    getData(col,row){
      this.getColRowforPermanent(col,row)
      SampleStorageServices.getSampleByFridgeLocation(col, row, this.fridgeId, this.shelfId)
                            .then((response)=>{
                              console.log(response.data)
                              this.getSamples(response.data.puid)
                            })
    },
    getPublishData(col,row){
      this.getPublishColRow(col,row)
    },
    getPublishColRow(col,row){
      const index = this.selectedVals.findIndex((item) => item.colIndex === col && 
                                                  item.rowIndex===row && 
                                                  item.rackId===this.portionId && 
                                                  item.shelfId===this.shelfId && 
                                                  item.fridgeId===this.fridgeId &&
                                                  item.sampleId===this.sampleIdNum
                                                )
      if(index===-1){
        this.selectedVals.push({
          colIndex:col, 
          rowIndex: row, 
          rackId: this.portionId, 
          shelfId:this.shelfId, 
          fridgeId: this.fridgeId,
          sampleId:this.sampleIdNum
        })
      }else{
        this.selectedVals.splice(index,1)
      }
      if(this.selectedVals.length>0){
        this.enabled=true
      }else{
        this.enabled=false
      }
      console.log(this.selectedVals)
    },
    getSamples(samplePUID){
      this.$emit('getSamples', samplePUID)
    },
    getColRowforPermanent(col,row){
      this.selectedVals=[]
      const index = this.selectedVals.findIndex((item) => item.colIndex === col && 
                                                  item.rowIndex===row && 
                                                  item.rackId===this.portionId && 
                                                  item.shelfId===this.shelfId && 
                                                  item.fridgeId===this.fridgeId
                                                )
      if(index===-1){
        this.selectedVals.push({
          colIndex:col, 
          rowIndex: row, 
          rackId: this.portionId, 
          shelfId:this.shelfId, 
          fridgeId: this.fridgeId
        })
      }
      console.log(this.selectedVals)
    },
    getEditColRow(col,row){
      const index = this.editVals.findIndex((item) => item.colIndex === col && 
                                                  item.rowIndex===row && 
                                                  item.sampleId===this.sampleIdNum &&
                                                  item.fridgId===this.fridgeId &&
                                                  item.shelfId===this.shelfId &&
                                                  item.rackId===this.portionId
                                                  )
      if(index!==-1){
        this.editCount=this.editCount+1
        this.editVals.splice(index,1)
        this.enabled=false
      }
    },
    getColRow(col,row){
      const index = this.selectedVals.findIndex((item) => item.colIndex === col && 
                                                  item.rowIndex===row && 
                                                  item.rackId===this.portionId && 
                                                  item.shelfId===this.shelfId && 
                                                  item.fridgeId===this.fridgeId
                                                )
      if(index===-1){
        this.selectedVals.push({
          colIndex:col, 
          rowIndex: row, 
          rackId: this.portionId, 
          shelfId:this.shelfId, 
          fridgeId: this.fridgeId
        })
        // alert(this.count+this.editCount)
        if((this.editCount!==0 && this.editCount===this.count)||(this.editCount===0 && this.numVials===this.count)){
          this.enabled=true
        }
        else{
          this.enabled=false
        }
        this.count=this.count+1
      }else{
        this.selectedVals.splice(index,1)
        this.count=this.count-1
        this.enabled=false
      }
      console.log(this.selectedVals)
    },
    publish(){
      console.log(this.selectedVals)
      const selectedVal=JSON.stringify(this.selectedVals)
      this.goto('/inbound/samples/catalouge?id='+this.sampleId+'&stepId='+this.stepId+'&processId='+this.processId+'&selectedVal='+selectedVal)
    },
    submit(){
      this.loading=true
      for(let i=0; i<this.editVals.length; i++){
        if(this.editVals[i].sampleId===this.sampleIdNum){
          this.selectedVals.push({
            colIndex:this.editVals[i].colIndex, 
            rowIndex: this.editVals[i].rowIndex, 
            rackId: this.portionId, 
            shelfId:this.shelfId, 
            fridgeId: this.fridgeId
          })
        }
      }
      SampleStorageServices.create({sampleId:this.sampleId, tempId:this.tempId, sampleLocation:this.selectedVals,stepId:this.stepId,processId:this.processId}).then((response)=>{
        console.log(response.data)
        this.goto('/task')
      }).catch(this.error)
        .finally(() => {
          // this.btnLoading = false
          // this.loading = false
          this.loading = false
        })
    }
  },
}
</script>
<style lang="scss" scoped>
.testTubeTable {
  td {
    padding: 5px 10px;
    cursor: pointer;
  }
  .fake-column {
    min-width: 51px;
    min-height: 41px;
  }
}
.fake-row {
  min-height: 41px;
  span {
    padding-top: 10px;
    display: inherit;
  }
}
</style>
