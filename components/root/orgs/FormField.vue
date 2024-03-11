<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-form-item
          label="Organization Name"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'clientName',
              {
                initialValue: entity.clientName ,
                rules: [
                  {
                    required: true,
                    message: 'Organization Name',
                  },
                ],
              },
            ]"
            placeholder="Organization Name"
          /> </a-form-item
      ></a-col> 
      <a-col :span="12">
        <a-form-item
          label="Organization Code"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'clientCode',
              {
                initialValue: entity.clientCode ,
                rules: [
                  {
                    required: true,
                    message: 'Organization Code',
                  },
                ],
              },
            ]"
            placeholder="Organization Code"
          /> </a-form-item
      ></a-col> 
      <a-col :span="12">
        <a-form-item
          label="Select Ssytem"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-select
            v-decorator="[
              'appId',
              {
                initialValue: entity.appId,
                rules: [
                  {
                    required: true,
                    message: 'required',
                  },
                ],
              },
            ]"
            :get-popup-container="trigger => trigger.parentNode"
            :show-search="true"
            mode="multiple"
            placeholder="Select System"
            style="width: 100%"
            size="large"
            class="default-select"
          >
            <a-select-option v-for="app in apps" :key="app.appId">
               {{ app.appName }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>  
      <a-col :span="24">      
      <a-form-item
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 22 }"      
      >
        <FormActionButton
          :is-created="isCreated"
          :loading="loading"
          custom-text="Save"
        />
      </a-form-item>
      </a-col>      
    </a-row>
  </div>
</template>

<script>
import AppServices from '~/services/API/AppServices'
export default {
  components: { },
  props: {
    isCreated: {
      type: Boolean,
      default: false,
    },
    entity: {
      type: Object,
      default: () => ({}),
    },
    form: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      entityId: null,
      userRoleId: 0,
      loading: false,
      countries: [],
      apps:[],
      roles:[],
      fileList:[],
      fetchCountry: true,
      formLayout: 'vertical',
      newSelected: false,
      defaultImage: true,
    }
  },
  mounted() {
    this.getApps()
  },
  updated() {
  },
  computed:{
   
  },
  methods: {
    getApps() {
      AppServices.get().then((response)=>{
        this.apps=response.data
      })
    },
  },
}
</script>
