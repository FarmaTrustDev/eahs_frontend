<template>
<div>
  <page-layout
    title="Organization Types"
    class="specific container page-search-input-container"
    :loading="loading"
    :create="false"
    :pagination="{
      defaultPageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30', '50', '100'],
    }"
  >
    <template slot="headerMenus">
      <a-input
        class="page-search-input"
        ref="userNameInput"
        placeholder="Search"
      >
        <!-- @change="searchUser" -->
        <a-icon slot="prefix" type="search" />
      </a-input>
      <a-button type="primary" @click="showModal">Add Organization Type</a-button>
    </template>
    <div slot="content">
      <a-table
        :columns="column"
        :data-source="organizationTypes"
        :loading="loading"
        class="rounded-table pt-10 users-list"
      >
        <!-- <div slot="action" slot-scope="action, slot">
          <a-button type="danger" @click="treatTypeDelete(true ,slot.id)">Delete</a-button>
        </div> -->
      </a-table>
    </div>
  </page-layout>
  <a-modal
      title="Add Organization Type"
      :visible="visible"
      :footer="null"
      @ok="handleOk"
      @cancel="handleCancel"
    >
    <a-form :form="form" @submit="handleSubmit">
           <a-form-item
           label="Organization Type Name:"
           >
          <a-input
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: 'Required' }],
              },
            ]"
            placeholder="Organization Type"
          />
        </a-form-item>
        <a-form-item
        label="Organization Type Alias"
        >
          <a-input
          v-decorator="[
              'alias',
              {
                rules: [{ required: true, message: 'Required' }],
              },
            ]"
            placeholder="Organization Type Alias"
          />
        </a-form-item>
        <a-form-item
        label="Select Type"
        >
          <a-radio-group
            v-decorator="[
              'types',
              {
                rules:[{required: true, message: 'Required'}]
              },
            ]"
          >
          <!-- v-model="value"  -->
        <a-radio :value="1">
          IsLogistic
        </a-radio>
        <a-radio :value="2">
          IsPartner
        </a-radio>
      </a-radio-group>
        </a-form-item>
        <a-form-item>
          <a-button
            :loading="loading"
            type="primary"
            html-type="submit"
            class="float-right"
          >
            Submit
          </a-button>
        </a-form-item>
        </a-form>
    </a-modal>
    <a-modal
    :visible = "responseModal"
    :footer="null"
    @cancel="handleResponseModal(false)"
    >
       <center> 
        <p class="cross-img">
        <span class="inner-mark">
          <span class="line-left line"></span>
          <span class="line-right line"></span>
        </span>
      </p>
      {{successResponse}}
      <footer class="mt-6">
        <a-button
            class="ant-btn ant-btn-primary"
            style="padding: 5px 50px"
            @click="handleResponseModal(false)"
            >Ok</a-button
          >
      </footer>
      </center>
    </a-modal>
     <a-modal
      :visible="treatTypeDeleteModal"
      :footer="null"
      class="error-model"
      @cancel="treatTypeDelete(false, '')"
    >
      <center>
        <p class="cross-img">
          <span class="inner-mark">
            <span class="line-left line"></span>
            <span class="line-right line"></span>
          </span>
        </p>
        <h3>
          Are you sure you want to delete this organization type ?
        </h3>
        <footer class="mt-6">
          <a-button
            class="ant-btn ant-btn-primary"
            style="padding: 5px 50px"
            @click="treatTypeDeleteMethod()"
            >Confirm</a-button
          >
          <a-button
            class="ant-btn text-cancel"
            style="padding: 5px 50px"
            @click="treatTypeDelete(false, '')"
          >
            Cancel
          </a-button>
        </footer>
      </center>
            </a-modal>
  </div>
</template>
<script>
import withCrud from '~/mixins/with-crud'
import OrganizationTypeServices from '~/services/API/OrganizationTypeServices'
import PageLayout from '~/components/layout/PageLayout'
import { success } from '~/services/Helpers/notifications'
import { isEmpty } from '~/services/Utilities'
export default {
  components: { PageLayout },
  mixins:[withCrud],
  data() {
    return {
      organizationTypes: [],
      value: 1,
      column: [
        {
          title: 'Organization Type',
          dataIndex: 'name',
          key: 'name',
        },
        // {
        //   title: 'Action',
        //   dataIndex: 'action',
        //   scopedSlots: { customRender: 'action' },
        // },
      ],
      visible: false,
      loading:false,
      responseModal: false,
      successResponse: '',
      formLayout: 'vertical',
      form: this.$form.createForm(this, {
        name: 'OrganizationTypeCreate',
      }),
      organizationType: '',
      treatTypeDeleteModal: false,
      treatTypeId : ''

    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    this.fetchOrganizationTypes()
  },
  methods: {
    treatTypeDeleteMethod() {
      this.deleteType(this.treatTypeId)
      this.treatTypeDeleteModal = false
    },
    treatTypeDelete(e, record) {
      this.treatTypeId = record
      this.treatTypeDeleteModal = e
    },
    handleSubmit(e)
    {
        this.loading = true
        e.preventDefault()
        this.form.validateFields((err,values)=>{
            if(!err)
            {
              values.isLogistic = values.types === 1 
              values.isPartner = values.types === 2 
              console.log(values , 'values')
              OrganizationTypeServices.create(values)
                .then((response)=>{
                    success(response.message)
                    this.fetchOrganizationTypes()
                }).catch((e)=>
                {
                    if(!isEmpty(e.response))
                    this.handleResponseModal(true)
                    this.successResponse = e.response.data.message
                }).finally(this.loading=false)
                this.treatmentType = ''
                this.handleCancel();
                this.fetchOrganizationTypes();
            }
        })
    },
    deleteType(id)
    {
        this.loading = true
        OrganizationTypeServices.destroy(id)
        .then((response)=>
            {
                this.fetchOrganizationTypes();
            }
        ).catch((e)=>{
            if(!isEmpty(e.response))
            {
                    this.handleResponseModal(true)
                    this.successResponse = e.response.data.message
            }
        })
        .finally(this.loading = false)
    },
    showModal() {
      this.visible = true
    },
    fetchOrganizationTypes() {
        this.loading = true
        OrganizationTypeServices.get({ withOrganization: true }).then((response) => {
        this.organizationTypes = response.data
      }).finally(this.loading = false)
    },
    handleResponseModal(e)
    {
        this.responseModal = e
    },
    handleOk(e) {
      this.visible = false
    },
    handleCancel(e) {
      this.visible = false
    },
  },
}
</script>
