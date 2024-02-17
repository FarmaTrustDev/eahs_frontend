<template>
  <page-layout :loading="loading" title="Organizations">
    <template slot="content">
      <a-table
        :columns="columns"
        :scroll="{ x: true }"
        :data-source="datasource"
      >
        <template slot="action" slot-scope="action">
          <a-button type="link" @click="goto(`/organizations/${action.globalId}`)"
            ><a-icon type="edit"
          /></a-button>

          <!-- <a-button
            type="link"
            @click="goto(`/organizations/${action.id}`)"
            ><a-icon type="edit"
          /></a-button> -->
        </template>
      </a-table>
    </template>
  </page-layout>
</template>
<script>
import OrganizationServicesServices from '~/services/API/OrganizationServices'
// import { success } from '~/services/Helpers/notifications'
import routeHelpers from '~/mixins/route-helpers'

import PageLayout from '~/components/layout/PageLayout'



export default {
  components: { 'page-layout': PageLayout },
  mixins: [routeHelpers],
  data() {
    return {
      datasource: [],
      columns:[
  {
    title: `${this.$store.getters.getTranslation.Name_1_138}`,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: `${this.$store.getters.getTranslation.EmailAddre_2_140}`,
    key: 'email',
    dataIndex: 'email',
  },
  {
    title: `${this.$store.getters.getTranslation.Phone_1_63}`,
    key: 'phone',
    dataIndex: 'phone',
  },
  {
    title: `${this.$store.getters.getTranslation.PostaAddre_2_450}`,
    key: 'address',
    dataIndex: 'address',
  },
  {
    title: `${this.$store.getters.getTranslation.Actio_1_220}`,
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
],
      loading: true,
    }
  },
  watch:{
    translation(newValues, oldValue){
      if(newValues!==oldValue){
        this.columns[0].title=newValues.Name_1_138
        this.columns[1].title=newValues.EmailAddre_2_140
        this.columns[2].title=newValues.Phone_1_63
        this.columns[3].title=newValues.PostaAddre_2_450
        this.columns[4].title=newValues.Actio_1_220
      }
    }
  },  
  mounted() {
    this.fetch()
  },
  methods: {
    fetch() {
      OrganizationServicesServices.get()
        .then((response) => {
          this.datasource = response.data
        })
        .finally(() => (this.loading = false))
    },
    // remove(id) {
    //   OrganizationServicesServices.destroy(id).then((response) => {
    //     success(this, { message: response.message })
    //     this.fetch()
    //   })
    // },
  },
}
</script>