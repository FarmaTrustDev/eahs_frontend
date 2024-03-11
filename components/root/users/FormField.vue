<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-form-item
          label="User First Name"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'firstName',
              {
                initialValue: entity.firstName ,
                rules: [
                  {
                    required: true,
                    message: 'First Name',
                  },
                ],
              },
            ]"
            placeholder="First Name"
          /> </a-form-item
      ></a-col> 
      <a-col :span="12">
        <a-form-item
          label="User Last Name"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'lastName',
              {
                initialValue: entity.lastName ,
                rules: [
                  {
                    required: true,
                    message: 'Last Name',
                  },
                ],
              },
            ]"
            placeholder="Last Name"
          /> </a-form-item
      ></a-col> 
      <a-col :span="12">
        <a-form-item
          label="Email"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'email',
              {
                initialValue: entity.email ,
                rules: [
                  {
                    required: true,
                    message: 'Email',
                  },
                ],
              },
            ]"
            placeholder="Email"
          /> </a-form-item
      ></a-col> 
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
                
              },
            ]"
            :get-popup-container="trigger => trigger.parentNode"
            :show-search="true"
            placeholder="Select System"
            style="width: 100%"
            size="large"
            class="default-select"
            :disabled="isCreated && !isRole"
            @change="selectRole"
          >
            <a-select-option v-for="app in apps" :key="app.appId">
               {{ app.appName }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      
      <a-col :span="12">
        <a-form-item
          label="Select Role"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-select
            v-decorator="[
              'roleId',
              {
                initialValue: entity.roleName,
                
              },
            ]"
            :get-popup-container="trigger => trigger.parentNode"
            :show-search="true"
            placeholder="Select Role"
            style="width: 100%"
            size="large"
            class="default-select"
            :disabled="isCreated && !isRole"
          >
            <a-select-option v-for="role in roles" :key="role.roleId">
               {{ role.roleName }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
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
              },
            ]"
            :get-popup-container="trigger => trigger.parentNode"
            :show-search="true"
            placeholder="Select Organization"
            style="width: 100%"
            size="large"
            class="default-select"
            :disabled="isCreated && !isRole"
            @change="selectTeam"
          >
            <a-select-option v-for="org in orgs" :key="org.clientId">
               {{ org.clientName }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Select Team"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-select
            v-decorator="[
              'teamId',
              {
                initialValue: entity.teamId,
              },
            ]"
            :get-popup-container="trigger => trigger.parentNode"
            :show-search="true"
            placeholder="Select Team"
            style="width: 100%"
            size="large"
            class="default-select"
            :disabled="isCreated && !isRole"
          >
            <a-select-option v-for="team in teams" :key="team.teamId">
               {{ team.teamName }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>  
       
    </a-row>
  </div>
</template>

<script>
import AppServices from '~/services/API/AppServices'
import RolesServices from '~/services/API/RolesServices'
import OrganizationsServices from '~/services/API/OrganizationsServices'
import TeamServices from '~/services/API/TeamServices'

export default {
  components: { },
  props: {
    isCreated: {
      type: Boolean,
      default: false,
    },
    isRole:{
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
      orgs:[],
      teams:[],
      fileList:[],
      fetchCountry: true,
      formLayout: 'vertical',
      newSelected: false,
      defaultImage: true,
      appId:null,
      roleId:null,
      orgId:null,
    }
  },
  mounted() {
    this.getSystems()
  },
  updated() {
  },
  computed:{
   
  },
  methods: {
    selectRole(appId){
      this.getRoles(appId)
    },
    getRoles(appId) {
      this.appId=appId
      RolesServices.getAppRoles(this.appId).then((response)=>{
        this.roles=response.data
        this.getOrganization(this.appId)
      })
    },
    getSystems() {
      AppServices.get().then((response)=>{
        this.apps=response.data
      })
    },
    selectOrganization(roleId){
      this.getOrganization(roleId)
    },
    getOrganization(roleId) {
      this.roleId=roleId
      OrganizationsServices.getAppClient(this.appId, this.roleId).then((response)=>{
        this.orgs=response.data
      })
    },
    selectTeam(clientId){
      this.getTeam(clientId)
    },
    getTeam(clientId) {
      this.orgId=clientId
      TeamServices.getTeam(this.appId, this.orgId).then((response)=>{
        this.teams=response.data
      })
    },
  },
}
</script>
