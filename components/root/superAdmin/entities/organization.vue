<template>
    <div>
        <a-button type="primary" @click="goto('/superAdmin/entities/addOrganization/form?name='+buttonName)">+ Add {{buttonName}}</a-button>
        <a-table :columns="columns" :data-source="organization">
         <template slot="action" slot-scope="action">
          <a-dropdown>
            <!-- <a-button class="action-button" @click="preventDefault"> -->
               <a-icon type="more" @click="preventDefault" />
            <!-- </a-button> -->
            <a-menu slot="overlay">
              <a-menu-item key="1">
                <a 
                @click="goto(`/superAdmin/entities/addOrganization/${action}?name=`+buttonName)"
                >{{
                  translation.Edit_1_450
                }}</a>
              </a-menu-item>
              <a-menu-item key="2">
                <!-- <a-popconfirm
                  :title="translation.Areyou_4_484"
                  :ok-text="translation.yes_1_654"
                  :cancel-text="translation.no_1_656"
                  placement="topLeft"
                  @confirm="deleteUser(`${action}`)"
                >
                  {{ translation.Delet_1_451 }}
                </a-popconfirm> -->
                <span @click="orgDelete(true, action)">{{ translation.Delet_1_451 }}</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
        </a-table>
        <a-modal
      :visible="orgDeleteModal"
      :footer="null"
      class="error-model"
      @cancel="orgDelete(false, '')"
    >
      <center>
        <p class="cross-img">
          <span class="inner-mark">
            <span class="line-left line"></span>
            <span class="line-right line"></span>
          </span>
        </p>
        <h3>
          Are you sure you want to delete this user ?
        </h3>
        <footer class="mt-6">
          <a-button
            class="ant-btn ant-btn-primary"
            style="padding: 5px 50px"
            @click="orgDeleteMethod()"
            >Confirm</a-button
          >
          <a-button
            class="ant-btn"
            style="padding: 5px 50px"
            type="danger"
            @click="orgDelete(false, '')"
          >
            Cancel
          </a-button>
        </footer>
      </center>
            </a-modal>
    </div>
</template>
<script>
import OrganizationServices from '~/services/API/OrganizationServices'
import { preventDefault } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'
export default {
    mixins:[routeHelpers],
    props:{
        alias:{
            type: String,
            require: true,
            default:''
        },
        fieldName:{
            type: String,
            default:'',
            require: true
        },
    },
    data()
    {
        return{
         organization :[],
         buttonName : this.fieldName,
        columns:[
        {            
            title: this.fieldName,
            dataIndex:'name',
            key:'name'
        },
        {
            title:'Contact',
            dataIndex: 'phone',
            key: 'contact'
        },
        {
            title: 'Email',
            dataIndex:'email',
            key:''
        },
        {
          title: ``,
          dataIndex: 'globalId',
          scopedSlots: {
            customRender: 'action',
          },
        },
         ],
         orgDeleteModal: false,
         orgId : ''

        }
    },
    
    computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
    watch:{
      organization(newValue, oldValue)
      {
        if(newValue !== oldValue)
        {
          this.organization = newValue
        }
      }
    },
    mounted(){
        this.fetch();
    },
    methods:{
        preventDefault,
            orgDeleteMethod() {
      this.deleteUser(this.orgId)
      
    },
    orgDelete(e, record) {
      this.orgId = record
      this.orgDeleteModal = e
    },
    fetch()
    {
            OrganizationServices.get()
                .then((response) => {
                    this.organization = response.data
                    })
        },
        deleteUser(id)
        {
          OrganizationServices.destroy(id)
          .then((response)=>{
            this.userDeleteModal = false
            this.fetch();
            })
        }
    }
}
</script>