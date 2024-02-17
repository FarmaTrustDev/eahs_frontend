<template>
    <div>
    <a-modal
    :visible="isShow"
    :footer="null"
    class="error-model"
    centered
    @cancel="closeConfirmModal"
    >
    <center>
      <p class="cross-img">
          <span class="inner-mark">
            <span class="line-left line"></span>
            <span class="line-right line"></span>
          </span>
        </p> 
      <h3 class="mt-5">{{message}}</h3>
        <a-button class="ant-btn ant-btn-primary error-ok-btn mt-5" type="primary" @click="closeConfirmModal(false)">Ok</a-button>
    </center>
    </a-modal>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      message: {
        type: String,
        required: true,
      },
      isShow:{
        type: Boolean,
        required:true
    }
    },
    methods:{
    closeConfirmModal() {
      this.$emit("close-modal");
    }
    }
  };
  </script>
  