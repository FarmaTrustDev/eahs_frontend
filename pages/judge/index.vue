<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    title="Judge List"
    class="specific container page-search-input-container"
  >
    <template slot="headerMenus">
      <!-- <a-input
        ref="userNameInput"
        class="page-search-input"
        :placeholder="translation.SearcLab_2_561"
        
      >
        <a-icon slot="prefix" type="search" />
      </a-input> -->
      <a-button type="primary" class="" @click="goto('judge/create')">Add Judge</a-button>
    </template>
    <div slot="content">
      <!-- <template slot="content"> -->
      <!-- <h3 class="page-title float-left">
            {{ translation.LabList_2_551 }}
          </h3> -->

      <!-- </template> -->
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
                <a @click="goto(`/administration/lab/${action.globalId}`)">{{
                  translation.Edit_1_450
                }}</a>
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
// import { success } from '~/services/Helpers/notifications'
import { preventDefault } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
import PageLayout from '~/components/layout/PageLayout'
// import PageLayout from '~/components/layout/PageLayout'
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
          title: `Name`,
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
          title: `Is Eahs Rule`,
          dataIndex: 'isMember ',
          key: 'isMember ',
        },
        {
          title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
      loading: true,
      fullName: [],
    }
  },
  computed: {
    // ...mapGetters(['getUser']),
    user() {
      return this.$store.getters.getUser
    },
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  
  mounted() {
     this.fetch()
    
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
