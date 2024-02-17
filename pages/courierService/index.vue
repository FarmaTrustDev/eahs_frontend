<template>
    <page-layout
    :back="false"
    title="Courier Services"
    :create="false"
    >
    <div slot="content">
        <a-col :offset="21">
            <a-button type="primary" @click="visibleModal(true)">Add New Service</a-button>
        </a-col>
            <a-table
            :columns="columns"
            :data-source="courierServices"
            class="rounded-table"
            >
            <template slot="action" slot-scope="action">
                <a-dropdown>
                <a-button class="action-button">
                  Admin
                  <a-icon type="down" />
                </a-button>
                <a-menu slot="overlay">
                  <a-menu-item key="1">
                    <a @click="getByCourierServiceAllocationId(action.id)">Edit</a>
                  </a-menu-item>
                  <a-menu-item key="2">
                    <a @click="softDelete(action.id)">Delete</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </template>
            </a-table>
            <a-modal
            :visible="visible"
            :footer="false"
            title="Add New Service"
            @cancel="visibleModal(false)"
            >
            <a-form :form="form" @submit="onSubmit">
                <a-form-item>
                    <a-input
                    v-decorator="[
                        'courierServiceAllocationId',
                        {
                            initialValue: entity.id,
                        }
                    ]"
                    type="hidden"
                    />
                    </a-form-item>
                    <a-form-item>
                    <a-input
                    v-decorator="[
                        'courierServiceId',
                        {
                            initialValue: entity.courierServiceId,
                        }
                    ]"
                    type="hidden"
                    />
                    </a-form-item>
                <a-form-item label="Name">
                    <a-input
                    v-decorator="[
                        'courierServiceName',
                        {
                            initialValue : entity.name,
                            rules: [
                            {
                                required: true,
                                message: 'Required',
                            },
                            ],
                        },
                        ]"
                    />
                </a-form-item>
                <a-form-item label="Price">
                    <a-input 
                    v-decorator="[
                  'price',
                  {
                    initialValue : entity.price,
                    rules: [
                      {
                        required: true,
                        message: 'Required',
                      },
                    ],
                  },
                ]"
                    type="float"
                    />
                </a-form-item>
                <a-form-item label="Duration (In days)">
                    <a-input 
                    v-decorator="[
                  'deliveryTime',
                  {
                    initialValue : entity.deliveryTime,
                    rules: [
                      {
                        required: true,
                        message: 'Required',
                      },
                    ],
                  },
                ]"
                    type="number"
                    />
                </a-form-item>
                <FormActionButton :loading="loading" :is-created="isCreated" />
            </a-form>
            </a-modal>
        </div>
    </page-layout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout'
import CourierServiceServices from '~/services/API/CourierServiceServices'
import userDetail from '~/mixins/user-detail'
import {isEmpty} from '~/services/Helpers'
import notifications from '~/mixins/notifications'
export default{
    components: { PageLayout},
    mixins: [userDetail,notifications],
    data(){
        return{
            courierServices:[],
            user:[],
            visible:false,
            columns:[
                {
                    title:'Name',
                    dataIndex:'name',
                    key:'name'
                },
                {
                    title:'Delivery Tiime',
                    dataIndex:'deliveryTime',
                    key:'deliveryTime'
                },
                {
                    title:'Price',
                    dataIndex:'price',
                    key:'price'
                },
                {
                    title:'Action',
                    key: 'action',
                    scopedSlots: {
                        customRender: 'action',
                    },
                }
            ],
            form: this.$form.createForm(this, {
            name: 'login',
            entityId: null,
            }),
            isCreated:false,
            loading:false,
            entity: {
              type: Object,
              default: () => ({}),
            },
            api: CourierServiceServices,
        }
    },
    mounted(){
        this.user = this.getStoreUserDetails()
        this.getById(this.user.organizationId)
    },
    methods:{
        getById(id){
            this.api.getById(id).then((response)=>{
                this.courierServices = response.data
            })
        },
        visibleModal(e){
            this.visible = e
        },
        onSubmit(e){
            this.loading = true
            e.preventDefault()
            this.form.validateFields((err,values)=>{
                if(!err){
                    if(!this.isCreated){
                        this.create(values)
                    } else {
                        this.update(values)
                    }

                }
            })
        },
        getByCourierServiceAllocationId(id){
            this.loading = true
            this.api.getByCourierServiceAllocationId(id).then((response)=>{
                if(!isEmpty(response.data)){
                    this.entity = response.data
                    this.isCreated = true
                    this.visibleModal(true)
                }
            }).catch(this.error).finally(this.loading = false)
        },
        create(values){
            this.api.create(values).then((response)=>{
                        this.success(response.message)
                        this.getById(this.user.organizationId)
                    }).catch(this.error).finally(this.loading= false)
        },
        update(values){
            this.loading = true
            CourierServiceServices.update(values).then((response)=>{
                this.success("Updated Successfully")
                this.visibleModal(false)
            }).catch(this.error).finally(this.loading = false)
        }, 
        softDelete(id){
            this.loading = true
            CourierServiceServices.softDelete(id).then((response)=>{
                this.success(response.message)
                this.getById(this.user.organizationId)
            }).catch(this.error).finally(this.loading = false)
        } 
    },

}
</script>