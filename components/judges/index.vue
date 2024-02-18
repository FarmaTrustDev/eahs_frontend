<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    title="Judge List"
    class="specific container page-search-input-container"
  >
    <template slot="headerMenus">
      <a-button type="primary" class="" @click="goto('judge/create')">Add Judge</a-button>
    </template>
    <div slot="content">
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :loading="loading"
        class="rounded-table"
        :pagination="{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30', '50', '100'],
        }"
      >
        
        <template slot="action" slot-scope="action">
          <a-dropdown>
            <a-button class="action-button" @click="preventDefault">
              {{ translation['Admin_1_142'] }} <a-icon type="down" />
            </a-button>
            <a-menu slot="overlay">
              <a-menu-item key="labDetail">
                <a @click="goto(`/judge/${action.globalId}`)">Edit</a>
              </a-menu-item>
              <a-menu-item key="labDelete">
                <a-popconfirm
                :title="translation.Areyou_4_484"
                :ok-text="translation.yes_1_654"
                :cancel-text="translation.no_1_656"
                placement="topLeft"
                @confirm="remove(`${action.globalId}`)"
                >
                Delete
              </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </a-table>
    </div>
  </page-layout>
</template>
<script>
import JudgeServices from '~/services/API/JudgeServices'
import { preventDefault } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
import PageLayout from '~/components/layout/PageLayout'
export default {
  components: {
    PageLayout,
  },
  mixins: [routeHelpers],
  data() {
    return {
      dataSource:[],
      columns: [
        {
          title: `Judge Name`,
          dataIndex: 'judgeName',
          key: 'judgeName',
        },
        {
          title: `Country Name`,
          dataIndex: 'countryName',
          key: 'countryName',
        },
        {
          title: `Has Conflict of Interest`,
          dataIndex: 'isConflict',
          key: 'isConflict',
        },
        {
          title: `Is EAHS Member`,
          dataIndex: 'isMember ',
          key: 'isMember ',
        },
        {
          title: `Action`,
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
      loading: true,
      fullName: [],
    }
  },
  computed: {
  },
  
  mounted() {
     this.fetch()
     // this.auth()
  },
  methods: {
    
    preventDefault,
    fetch() {
      JudgeServices.get()
        .then((response) => {
          this.dataSource = response.data
        })
        .finally(() => (this.loading = false))
    },

    remove(id) {
      this.loading = true
      JudgeServices.remove(id).then((response)=>{
        this.fetch()
      }).catch(this.error).finally(this.loading = false)
    },
    searchLab(){
      console.log('hello')
    }
  },
}
</script>
