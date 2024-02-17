<template>
  <page-layout
    :loading="false"
    :title="translation.UserNew_3_136"
    class="specific container page-search-input-container"
    :create="false"
  >
    <template slot="headerMenus">
      <!-- <h3 class="page-title ml-5 mb-1 float-left">
        {{ translation.UserNew_3_136 }}
      </h3> -->
      <a-input
        ref="userNameInput"
        class="page-search-input"
        :placeholder="translation.Searcuser_2_404"
        @change="searchUser"
      >
        <a-icon slot="prefix" type="search" />
      </a-input>
      <a-button type="primary" @click="goto('/users/create')">{{
        translation.adduser_2_464
      }}</a-button>
    </template>
    <div slot="content">
      <a-table
        :columns="columns"
        :data-source="datasource"
        :loading="loading"
        class="rounded-table pt-10 users-list"
        :pagination="{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30', '50', '100'],
        }"
      >
      <template slot="imageUrl" slot-scope="imageUrl">
        <a-avatar v-if="imageUrl !== null" :src="getImageUrl(removeQuotes(imageUrl))" :size="80" />
        <a-avatar v-else :src="getImageUrl('/web/Chat-Group/dummy.jpeg')" :size="80" />
      </template>
      <template slot="role" slot-scope="role">
           <span class="new-treatment-status-btn" style="border-radius:25px"> {{role}} </span>
        </template>
        <template slot="action" slot-scope="action">
          <a-dropdown>
            <a-button class="action-button" @click="preventDefault">
              {{ translation['Admin_1_142'] }} <a-icon type="down" />
            </a-button>
            <a-menu slot="overlay">
              <a-menu-item key="1">
                <a @click="goto(`/users/${action.globalId}`)">{{
                  translation.Edit_1_450
                }}</a>
              </a-menu-item>
              <a-menu-item key="2" @click="userDelete(true, action.globalId)">
                <!-- <a-popconfirm
                  :title="translation.Areyou_4_484"
                  :ok-text="translation.yes_1_654"
                  :cancel-text="translation.no_1_656"
                  placement="topLeft"
                  @confirm="deleteUser(`${action.globalId}`)"
                >
                </a-popconfirm> -->
                <span>{{ translation.Delet_1_451 }}</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </a-table>
      <a-modal
        :visible="userDeleteModal"
        :footer="null"
        class="error-model"
        @cancel="userDelete(false, '')"
      >
        <center>
          <p class="cross-img">
            <span class="inner-mark">
              <span class="line-left line"></span>
              <span class="line-right line"></span>
            </span>
          </p>
          <h3>Are you sure you want to delete this user ?</h3>
          <footer class="mt-6">
            <a-button
              class="ant-btn ant-btn-primary"
              style="padding: 5px 50px"
              @click="userDeleteMethod()"
              >Confirm</a-button
            >
            <a-button
              class="ant-btn"
              style="padding: 5px 50px"
              type="danger"
              @click="userDelete(false, '')"
            >
              Cancel
            </a-button>
          </footer>
        </center>
      </a-modal>
    </div>
  </page-layout>
</template>
<script>
import UserServices from '~/services/API/UserServices'
import notifications from '~/mixins/notifications'
import { preventDefault } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
import PageLayout from '~/components/layout/PageLayout'
import imagesHelper from '~/mixins/images-helper'
import { isEmpty } from '~/services/Helpers'
// import PageLayout from '~/components/layout/PageLayout'
export default {
  components: { PageLayout },
  mixins: [routeHelpers,imagesHelper, notifications],
  data() {
    return {
      datasource: [],
      columns: [
        {
          title: 'Image',
          dataIndex: 'imageUrl',
          scopedSlots:{customRender:'imageUrl'}
        },
        {
          title: `${this.$store.getters.getTranslation.Name_1_138}`,
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: `${this.$store.getters.getTranslation.Entittype_2_406}`,
          dataIndex: 'organizationTypeAlias',
          key: 'organizationType',
        },
        {
          title: `${this.$store.getters.getTranslation.EntitName_2_408}`,
          dataIndex: 'organizationName',
          key: 'organizationId',
        },
        {
          title: `${this.$store.getters.getTranslation.UserRole_2_410}`,
          dataIndex: 'roleName',
          key: 'roleName',
          class: `user-role`,
          scopedSlots: { customRender: 'role' },
        },
        {
          title: `${this.$store.getters.getTranslation.EmailAddre_2_140}`,
          key: 'email',
          dataIndex: 'email',
        },
        {
          title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          key: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
      userDeleteModal: false,
      loading: true,
      fullName: [],
      userId: '',
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
        this.columns[0].title = newValues.Name_1_138
        this.columns[1].title = newValues.Entittype_2_406
        this.columns[2].title = newValues.EntitName_2_408
        this.columns[3].title = newValues.UserRole_2_410
        this.columns[4].title = newValues.EmailAddre_2_140
        this.columns[5].title = newValues.Actio_1_220
      }
    },
  },
  mounted() {
    this.fetch()
  },
  methods: {
    preventDefault,
    userDeleteMethod() {
      this.deleteUser(this.userId)
      this.userDeleteModal = false
    },
    userDelete(e, record) {
      this.userId = record
      this.userDeleteModal = e
    },
    fetch() {
      // alert('hello')
      UserServices.getUser(
        this.user.organizationId,
        this.user.organizationTypeId
      )
        .then((response) => {
          this.datasource = response.data
        })
        .finally(() => (this.loading = false))
    },
    fetchSearch(params) {
      // alert(params.name)
      UserServices.getSearchUser(params)
        .then((response) => {
          this.datasource = response.data
        })
        .finally(() => (this.loading = false))
    },
    searchUser(e) {
      const search = e.target.value
      // alert(search)
      if (search !== '') {
        this.fetchSearch({ userName: search, roleName: search, email: search })
      } else {
        this.fetch()
      }
    },
    deleteUser(record) {
      UserServices.destroy(record)
        .then((response) => {
          // console.log(response)
          this.success(response.message)
          this.fetch()
          this.$router.push({ path: '/users' })
        })
        .finally(() => (this.loading = false))
    },
    removeQuotes(img){
        if(!isEmpty(img)){
          return img.replace(/"/g, '')
        }
      },
  },
}
</script>
