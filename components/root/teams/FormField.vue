<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-form-item
          label="Team Name"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'teamName',
              {
                initialValue: entity.teamName ,
                rules: [
                  {
                    required: true,
                    message: 'Team Name',
                  },
                ],
              },
            ]"
            placeholder="Team Name"
          /> </a-form-item
      ></a-col> 
      <a-col :span="12">
        <a-form-item
          label="Select Organization"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-select
            v-decorator="[
              'clientId',
              {
                initialValue: entity.clientId,
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
            placeholder="Select Organization"
            style="width: 100%"
            size="large"
            class="default-select"
            @change="selectSystems"
          >
            <a-select-option v-for="org in orgs" :key="org.clientId">
               {{ org.clientName }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Select System"
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
import OrganizationsServices from '~/services/API/OrganizationsServices'
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
      orgs:[],
      apps:[],
      fileList:[],
      fetchCountry: true,
      formLayout: 'vertical',
      newSelected: false,
      defaultImage: true,
    }
  },
  mounted() {
    this.getOrganizations()
  },
  updated() {
  },
  computed:{
   
  },
  methods: {
    getOrganizations() {
      OrganizationsServices.get().then((response)=>{
        this.orgs=response.data
      })
    },
    selectSystems(clientId){
      this.getSystem(clientId)
    },
    getSystem(clientId) {
      OrganizationsServices.getApps(clientId).then((response)=>{
        this.apps=response.data
      })
    },
  },
}
</script>
