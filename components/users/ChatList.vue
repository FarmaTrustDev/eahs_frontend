<template>
  <div>
    <div>
    
    <a-select
        class="
        page-search-input ant-selection-placeholder"
        placeholder="Select Organization Type"
        @change="onChange"
      >
        <a-select-option
          v-for="treatmentType in organizationTypes"
          :key="treatmentType.id"
          >{{ treatmentType.name }}</a-select-option
        >
      </a-select>
    </div>
    <a-table :data-source="data" :columns="column" class="rounded-table">
      <template slot="userName" slot-scope="text, record">
        <p> {{record.firstName}} {{record.lastName}}</p>
      </template>
      <template slot="message" slot-scope="text, record">
        <a-button type="primary" @click="getUser(text, record)"> {{translation.messa_1_498}}</a-button>
      </template>
    </a-table>
  </div>
</template>
<script>
import UserServices from '~/services/API/UserServices'
import OrganizationTypeServices from '~/services/API/OrganizationTypeServices'
export default {
  data() {
    return { column:[
  {
    title: `${this.$store.getters.getTranslation.Name_1_138}`,
    // dataIndex: ['firstName',"lastName"],
    key: 'name',
    width: '40%',
    scopedSlots: { customRender: 'userName' },
  },
  {
    title: `${this.$store.getters.getTranslation.EmailAddre_2_140}`,
    dataIndex: 'email',
    key: 'email',
    width: '40%',
  },
  {
    title: `${this.$store.getters.getTranslation.Actio_1_220}`,
    scopedSlots: { customRender: 'message' },
  },
], 
UserServices, 
data: [],
organizationTypes: [],
}
  },
  computed:{
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  watch:{
    translation(newValues, oldValue){
      if(newValues!==oldValue){
        this.column[0].title=newValues.Name_1_138
        this.column[1].title=newValues.EmailAddre_2_140
        this.column[2].title=newValues.Actio_1_220
      }
    }
  },  
  mounted() {
    this.fetch()
    this.fetchOrganizationTypes()
  },  
  methods: {
    getUser(user) {
      this.$emit('getUser', user)
    },
    fetch() {
      UserServices.get().then((response) => {
        this.data = response.data
      })
    },
    fetchOrganizationTypes() {
      this.typeLoading = true
      OrganizationTypeServices.get({ withOrganization: true }).then(
        (response) => {
          this.organizationTypes = response.data
        }
      )
        .finally(() => (this.typeLoading = false))
    },
    onChange(e)
    {
      this.typeLoading = true
      // const treatId = e
      UserServices.userWithOrganizationTypeId({organizationTypeId: e}).then((response)=>{
        this.data = response.data
      })
      .finally(()=>(this.typeLoading = false))
    }
  },
}
</script>
<style scoped>
.page-search-input {
    width: 42%;
    border-radius: 44px;
    height: 50px;
    right: 20px;
    margin-left: 61%;
}
</style>