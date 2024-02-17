<template>
  <page-layout
    :create="false"
    :loading="loading"
    :bordered="false"
    :title="translation.AddStora_3_557"
    class="container page-search-input-container"
  >
    <template slot="headerMenus">
      
      <a-input
        ref="userNameInput"
        class="page-search-input"
        :placeholder="translation.SearcStora_3_560"
      >
        <a-icon slot="prefix" type="search" />
      </a-input>
      <a-button type="primary" @click="goto('facility/create')">Add Freezer</a-button>
    </template>
    <div class="add_storage"  slot="content">
      <a-table
        :columns="columns"
        :data-source="dataSource"
        class="rounded-table"
        :pagination="{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30', '50', '100'],
        }"
      >
        <template slot="shelves" slot-scope="shelves">
          <span>
            <a-tooltip title="Configure the Shelves and Racks" placement="top">
            <a-icon type="plus-circle" :style="{color:'blue',fontSize: '15px'}" @click="goto('/administration/storage/facility/storageConfig/newFridge?fId='+shelves.globalId)" />
            </a-tooltip>
          </span>
        </template>
        <template slot="action" slot-scope="action">
          <a-dropdown>
            <a-button class="action-button admin-btn" @click="preventDefault">
              {{ translation['Admin_1_142'] }} <a-icon type="down" />
            </a-button>
            <a-menu slot="overlay">
              <a-menu-item key="userDetail">
                <a
                  @click="
                    goto(`/administration/storage/facility/${action.globalId}`)
                  "
                  >{{ translation.Edit_1_450 }}</a
                >
              </a-menu-item>
              <a-menu-item key="userDetail">
                <a @click="deleteFridge(action.globalId)">Delete</a
                >
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </a-table>
    </div>
  </page-layout>
</template>
<script>
import { preventDefault } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
import PageLayout from '~/components/layout/PageLayout'
import FridgeServices from '~/services/API/FridgeServices'
export default {
  components: {
    PageLayout,
  },
  mixins: [routeHelpers],
  data() {
    return {
      dataSource: [],
      columns: [
        {
          title: `${this.$store.getters.getTranslation.EquipName_2_553}`,
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: `Equipment Type`,
          dataIndex: 'fridgeTypeName',
          key: 'equipmentTypeId',
        },
        {
          title: `${this.$store.getters.getTranslation.Lab_1_566}`,
          dataIndex: 'labName',
          key: 'labName',
        },
        {
          title: `Site`,
          dataIndex: 'siteName',
          key: 'siteName',
        },
        {
          title: `${this.$store.getters.getTranslation.LabZone_2_554}`,
          dataIndex: 'siteZoneName',
          key: 'siteZoneName',
        },
        {
          title: `Configure Shelves & Racks`,
          key: 'shelves',
          scopedSlots: { customRender: 'shelves' },
        },
        {
          title: `Status`,
          key:  `status`,
          dataIndex: `status`
        },
        {
          title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
      loading: false,
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
        this.columns[0].title = newValues.EquipName_2_553
        this.columns[2].title = newValues.Lab_1_566
        this.columns[4].title = newValues.LabZone_2_554
        this.columns[6].title = newValues.Actio_1_220
      }
    },
  },
  mounted() {
    this.getTranslationData()
    this.fetchFridge()
  },
  methods: {
    preventDefault,
    getTranslationData() {
      this.columns[0].title = this.translation.EquipName_2_553
      this.columns[2].title = this.translation.Lab_1_566
      this.columns[4].title = this.translation.LabZone_2_554
      this.columns[6].title = this.translation.Actio_1_220
    },
    fetchFridge(){
      FridgeServices.get().then((response)=>{
        this.dataSource=response.data
      })
    },
    deleteFridge(id)
    {
      FridgeServices.deleteFridge(id).then((response)=>{
        this.fetchFridge()
      })
    }
  },
}
</script>
