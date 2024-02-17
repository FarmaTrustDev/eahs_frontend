<template>
  <div @mouseenter="onHover(true)" @mouseleave="onHover(false)">
    <span>
      <img
        v-if="isPermanent && processAction === 1 && isActive"
        class="tube-image"
        :src="getImageUrl('web/inventory/storage/redTestTube.svg')"
        @click="handlePublish()"
      />
      <img
        v-else-if="isPermanent && processAction===1 && !isActive"
        class="tube-image"
        :src="getImageUrl('web/inventory/storage/selected-tube.svg')"
        @click="handlePublish()"
      />
      <img
        v-else-if="isPermanent && isActive"
        class="tube-image"
        :src="getImageUrl('web/inventory/storage/redTestTube.svg')"
        @click="isInventory ? handleInventory() : handelEdit(makeHoverDisables)"
      />
      <img
        v-else-if="isPermanent && !isActive"
        class="tube-image"
        :src="getImageUrl('web/inventory/storage/selected-tube.svg')"
        @click="isInventory ? handleInventory() : ''"
      />
      <img
        v-else-if="isActive && !isPermanent"
        class="tube-image"
        :src="getImageUrl('web/inventory/storage/tube.svg')"
        @click="processAction === 0 ? handleHoverDisable(makeHoverDisables) : ''"
      />
      <img
        v-else
        class="tube-image"
        :src="getImageUrl('web/inventory/storage/selected-tube.svg')"
        @click="handleHoverDisable(makeHoverDisables)"
      />
    </span>
  </div>
</template>
<script>
import imagesHelper from '~/mixins/images-helper'
export default {
  mixins: [imagesHelper],
  props: { 
    isActive:{type: Boolean}, 
    isHovers:{type: Boolean},
    makeHoverDisable:{type: Boolean},
    col:{type: Number},
    row:{type:Number},
    count: {type:Number},
    editCount: {type:Number},
    editLength:{type:Number},
    numVials:{type:Number},
    isPermanent:{type:Boolean},
    isInventory:{type: Boolean},
    processAction:{type:Number},
  },
  data() {
    return {
      isHover: this.isHovers,
      makeHoverDisables: this.makeHoverDisable,
    }
  },
  mounted() {
    // console.log(this.tube)
  },
  methods: {
    onHover(show) {
      if (!this.makeHoverDisables) {
        this.isHover = show
      }
    },
    handleInventory(){
      this.getData(this.col, this.row)
    },
    handlePublish(){
      this.getPublishData(this.col, this.row)
    },
    
    handelEdit(result){
      if(this.isActive && !this.isPermanent){
        if((this.count<=this.editCount && this.editCount!==0) || (this.editCount===0 && this.count<=this.numVials)){
          this.makeHoverDisables = !result
          this.getEditColRow(this.col, this.row)
        }
      }else{
        this.makeHoverDisables = !result
        this.getEditColRow(this.col, this.row, true)
      }
    },
    handleHoverDisable(result) {
      if(this.isActive && !this.isPermanent){
        if((this.count<=this.editCount && this.editCount!==0) || (this.editCount===0 && this.count<=this.numVials && this.editLength===0)){
          this.makeHoverDisables = !result
          this.getColRow(this.col, this.row)
        }
      }else{
        this.makeHoverDisables = !result
        this.getColRow(this.col, this.row)
      }
    },
    getColRow(col, row){
      this.$emit('getColRow', col, row)
    },
    getEditColRow(col, row){
      this.$emit('getEditColRow', col, row)
    },
    getData(col, row){
      this.$emit('getData', col, row)
    },
    getPublishData(col, row){
      this.$emit('getPublishData', col, row)
    },
  },
}
</script>

<style scoped>
.tube-image {
  width: 30px;
  height: 30px;
}
</style>
