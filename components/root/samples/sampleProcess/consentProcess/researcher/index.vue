<template>
    <div slot="content"  class="tabCol">
        <a-table 
                              :columns="columns"
                              :data-source="dummyDataSource"
                              
                              class="rounded-table pt-10 "
                              :pagination="{
                                defaultPageSize: 10,
                                showSizeChanger: true,
                                pageSizeOptions: ['10', '20', '30', '50', '100'],
                              }"
                            >
                <span slot="action"  >
                    
                    
                    <a-switch
                        v-decorator="[
                          'xhkBox3',
                          {
                              rules: [],
                              valuePropName: 'checked',
                          },
                          ]"
                          data-rowId="2"
                          size="large"
                          class="toggle_record"
                          checked-children="Yes"
                          un-checked-children="No"
                      />
              </span>
                            </a-table>
      
    </div>
</template>
<script>

import notifications from '~/mixins/notifications'
import { preventDefault } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'


// import PageLayout from '~/components/layout/PageLayout'
export default {
  components: {  },
  mixins: [routeHelpers, notifications],
  data() {
    return {
      
      datasource: [],
        dummyDataSource:[
          {
            experimentTitle:'Lorem Ipsum Dolor Site Emit',
            instituteName:'University of Natingumm',
            country:'United Kingdum',
            note:'aliquit',
          },
          {
            experimentTitle:'Lorem Ipsum Dolor Site Emit',
            instituteName:'Univrsity of Califorima',
            country:'United State',
            note:'aliquit',
          },
          {
            experimentTitle:'Lorem Ipsum Dolor Site Emit',
            instituteName:'University of Dublin',
            country:'Ireland',
            note:'aliquit',
          },
          
        ],
        columns: [
          {
            title: 'Experimant Title',
            dataIndex: 'experimentTitle',
            key: 'experimentTitle',
          },
          {
            title: 'Institute Name',
            dataIndex: 'instituteName',
            key: 'instituteName',
          },
          {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
          },
          {
            title: 'Reserchers Note',
            dataIndex: 'note',
            key: 'note',
          }
        ],
      userDeleteModal: false,
      
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
  mounted() {
    
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
    
  },
}
</script>