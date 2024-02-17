<template>
    <div>
      <div
        class="sortable"
        @dragover.prevent
        @drop="handleDrop"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          class="item"
          draggable="true"
          @dragstart="handleDragStart(index)"
          @dragenter="handleDragEnter(index)"
          @dragleave="handleDragLeave"
          @dragend="handleDragEnd"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items:[],
        itemsData:["Item 1", "Item 2", "Item 3", "Item 4"],
        draggedIndex: null,
        dragOverIndex: null,
      };
    },
    // watch:{
    //   items(old,ne)
    //   {
    //     if(old!==ne)
    //     {
    //       this.items=ne
    //     }
    //   }
    // },
    mounted(){
      this.fetch(this.itemsData)
    },
    methods: {
      fetch(itemData)
      {
        alert("cal")
        this.items= itemData
        console.log(this.items)
      },
      handleDragStart(index) {
        this.draggedIndex = index;
      },
      handleDragEnter(index) {
        if (index !== this.draggedIndex) {
          this.dragOverIndex = index;
        }
      },
      handleDragLeave() {
        this.dragOverIndex = null;
      },
      handleDragEnd() {
        alert("as")
        if (this.draggedIndex !== null && this.dragOverIndex !== null) {
          this.swapItems(this.draggedIndex, this.dragOverIndex);
          this.draggedIndex = null;
          this.dragOverIndex = null;
        }
      },
      handleDrop() {
        // Prevent default drop behavior
        return false;
      },
      swapItems(fromIndex, toIndex) {
        const temp = this.items[fromIndex];
        this.items[fromIndex] = this.items[toIndex];
        this.items[toIndex] = temp;
        const filteredArray = this.items.filter(item => item !== '__ob__: Observer');
        this.fetch(filteredArray)
        console.log(filteredArray)
      },
    },
  };
  </script>
  
  <style scoped>
  .sortable {
    display: flex;
    flex-direction: column;
  }
  
  .item {
    margin: 8px;
    padding: 8px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  
  .item.drag-over {
    border: 2px dashed #ccc;
  }
  </style>
  