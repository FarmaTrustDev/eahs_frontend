<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    :title="translation.LabList_2_551"
    class="specific container page-search-input-container"
  >
    <template slot="headerMenus">
      <a-input
        ref="userNameInput"
        class="page-search-input"
        :placeholder="translation.SearcLab_2_561"
        
      >
        <a-icon slot="prefix" type="search" />
      </a-input>
      <a-button type="primary" class="" @click="goto('lab/create')">{{
        translation.AddLab_2_562
      }}</a-button>
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
        <template slot="createNewSites" slot-scope="createNewSites">
          <span>
            <a-tooltip title="Create Site" placement="top">
            <a-icon type="plus-circle" :style="{color:'blue',fontSize: '15px'}" @click="goto('/administration/sites/newSite?lId='+createNewSites.globalId)" />
            </a-tooltip>
          </span>
        </template>
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
import LabServices from '~/services/API/LabServices'
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
          title: `${this.$store.getters.getTranslation.Lab_1_566}`,
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: `${this.$store.getters.getTranslation.Addre_1_559}`,
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Lab Manager',
          dataIndex: 'headName',
          key: 'headName',
        },
        {
          title: `${this.$store.getters.getTranslation.City_1_446}`,
          dataIndex: 'city',
          key: 'city',
        },
        {
          title: `${this.$store.getters.getTranslation.Count_1_49}`,
          dataIndex: 'countryName',
          key: 'country',
        },
        {
          title: `${this.$store.getters.getTranslation.EmailAddre_2_140}`,
          key: 'email',
          dataIndex: 'email',
        },
        {
          title: `Create Sites`,
          key: 'createNewSites',
          scopedSlots: { customRender: 'createNewSites' },
        },
        {
          title: 'Status',
          key: 'status',
          dataIndex: 'status',
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
  watch: {
    translation(newValues, oldValue) {
      if (newValues !== oldValue) {
        this.columns[0].title = newValues.Lab_1_566
        this.columns[1].title = newValues.Addre_1_559
        this.columns[2].title = "Lab Manager"
        this.columns[3].title = newValues.City_1_446
        this.columns[4].title = newValues.Count_1_49
        this.columns[5].title = newValues.EmailAddre_2_140
        this.columns[7].title = newValues.Actio_1_220
      }
    },
  },
  mounted() {
    this.fetch()
    this.getTranslationData()
  },
  methods: {
    getTranslationData() {
      this.columns[0].title = this.translation.Lab_1_566
      this.columns[1].title = this.translation.Addre_1_559
      this.columns[2].title = "Lab Manager"
      this.columns[3].title = this.translation.City_1_446
      this.columns[4].title = this.translation.Count_1_49
      this.columns[5].title = this.translation.EmailAddre_2_140
      this.columns[7].title = this.translation.Actio_1_220
    },
    preventDefault,
    fetch() {
      LabServices.get()
        .then((response) => {
          this.dataSource = response.data
        })
        .finally(() => (this.loading = false))
    },
    remove(id) {
      this.loading = true
      LabServices.remove(id).then((response)=>{
        this.fetch()
      }).catch(this.error).finally(this.loading = false)
    },
    searchLab(){
      console.log('hello')
    }
  },
}
</script>
