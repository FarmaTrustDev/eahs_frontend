<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-form-item
          label="Role Name"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'roleName',
              {
                initialValue: entity.roleName ,
                rules: [
                  {
                    required: true,
                    message: 'Role Name',
                  },
                ],
              },
            ]"
            placeholder="Role Name"
          /> </a-form-item
      ></a-col> 
      <a-col :span="12">
        <a-form-item
          label="Role Code"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'roleCode',
              {
                initialValue: entity.roleCode ,
                rules: [
                  {
                    required: true,
                    message: 'Role Code',
                  },
                ],
              },
            ]"
            placeholder="Role Code"
          /> </a-form-item
      ></a-col> 
        
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
  },
  updated() {
  },
  computed:{
   
  },
  methods: {
  },
}
</script>
