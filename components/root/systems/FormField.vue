<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-form-item
          label="System Name"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'appName',
              {
                initialValue: entity.firstName ,
                rules: [
                  {
                    required: true,
                    message: 'System Name',
                  },
                ],
              },
            ]"
            placeholder="System Name"
          /> </a-form-item
      ></a-col> 
      <a-col :span="12">
        <a-form-item
          label="System Code"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'appCode',
              {
                initialValue: entity.lastName ,
                rules: [
                  {
                    required: true,
                    message: 'System Code',
                  },
                ],
              },
            ]"
            placeholder="System Code"
          /> </a-form-item
      ></a-col> 
      
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
            placeholder="Select Role"
            style="width: 100%"
            size="large"
            class="default-select"
          >
            <a-select-option v-for="role in roles" :key="role.roleId">
               {{ role.roleName }}
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
import RolesServices from '~/services/API/RolesServices'
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
    this.getRoles()
  },
  updated() {
  },
  computed:{
   
  },
  methods: {
    getRoles() {
      RolesServices.get().then((response)=>{
        this.roles=response.data
      })
    },
  },
}
</script>
