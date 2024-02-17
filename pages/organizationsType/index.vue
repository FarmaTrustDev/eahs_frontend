<template>
  <page-layout :loading="loading" title="Organizations">
    <template slot="content">
      <a-table
        :columns="columns"
        :scroll="{ x: true }"
        :data-source="datasource"
      >
        <template slot="action" slot-scope="action">
          <a-button type="link" @click="goto(`/organizationsType/${action.globalId}`)"
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
import OrganizationServicesServices from '~/services/API/OrganizationTypeServices'
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
  // {
  //   title: 'Email',
  //   key: 'email',
  //   dataIndex: 'email',
  // },
  // {
  //   title: 'Phone',
  //   key: 'phone',
  //   dataIndex: 'phone',
  // },
  // {
  //   title: 'Address',
  //   key: 'address',
  //   dataIndex: 'address',
  // },
  {
    title: `${this.$store.getters.getTranslation.Actio_1_220}`,
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
],
      loading: true,
    }
  },
  mounted() {
    this.fetch()
  },
  watch:{
    translation(newValues, oldValue){
      if(newValues!==oldValue){
        this.columns[0].title=newValues.Name_1_138
        this.columns[1].title=newValues.Actio_1_220
      }
    }
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