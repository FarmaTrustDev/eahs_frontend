<template>
    <div slot="content" >
      <a-col :offset="18">
        <a-input 
                          ref="userNameInput"
                          class="page-search-input wd-100"
                          placeholder="Search Order"
                          @keyup="searchSample"
                        >
                        <a-icon slot="prefix" type="search" />
                        </a-input>
      </a-col>
        <a-table
                :columns="columns"
                :data-source="dummyDataSource"
                :loading="loading"
                class="rounded-table pt-10 users-list"
                :pagination="{
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '30', '50', '100'],
                }"
              >
                <template slot="movedDate" slot-scope="text">
                  {{ _getFormatMoment(text).format("DD/MM/YYYY") }}
                </template>
            </a-table>
    </div>
</template>
<script>

import notifications from '~/mixins/notifications'
import { preventDefault } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
import SampleServices from '~/services/API/SampleServices'
import { _getFormatMoment } from '~/services/Helpers/MomentHelpers'
// import PageLayout from '~/components/layout/PageLayout'
export default {
  components: {  },
  mixins: [routeHelpers, notifications],
  data() {
    return {
      loading:true,
      datasource: [],
      dummyDataSource:[],
      columns: [
        {
          title: 'Sample ID',
          dataIndex: 'puid',
          key:'puid'
        },
        {
          title: 'Quantity',
          dataIndex: 'totalQuantity',
          key: 'totalQuantity' ,
        },
        {
          title: 'Date Moved',
          dataIndex: 'movedDate',
          scopedSlots: {customRender  : 'movedDate' } ,
        },
        {
          title: 'Location',
          dataIndex: 'locationName',
          key: 'locationName' ,
        },
        {
          title: 'Shipping',
          dataIndex: 'deliveryServiceName',
          key:'deliveryServiceName'
        },
        {
          title:'Tier',
          dataIndex: 'tierName',
          key: 'tierName',
        },
        {
          title:'Delivery',
          dataIndex: 'delivery',
          key: 'delivery',
        },
      ],
      
    }
  },
  computed: {
    // ...mapGetters(['getUser']),
    
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    const data = JSON.parse(localStorage.getItem('vuex'))
    this.userRole =data.auth.user.roleName
    // if(this.userRole === USER_ROLES.admin_type.name)
    // {
      this.getAllSamplesBioBank()
    // }
    // if(this.userRole === USER_ROLES.institute_admin.name){
    //   this.getByOrganization()
    // }
    
  },
  methods: {
    preventDefault,
    _getFormatMoment,
    getAllSamplesBioBank()
    {
      SampleServices.get().then((Response)=>{
        this.dummyDataSource=Response.data
      }).catch(this.error)
          .finally(() => (this.loading = false))
    },
    getByOrganization()
    {
      SampleServices.getByOrganization().then((Response)=>{
        this.dummyDataSource = Response.data
      }).catch(this.error)
          .finally(() => (this.loading = false))
    },
    searchSample(event) {
        const keyword = event.target.value
        this.fetchSample({
          samplePuid: keyword,
          active: true,
          isPublished: true
        })
    },
    fetchSample(params = {}) {
      this.loading = true
      SampleServices.searchSample(params).then((response) => {
        this.dummyDataSource = response.data
      })
      this.loading = false
    },
  },
}
</script>