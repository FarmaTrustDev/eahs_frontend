<template>
    <a-card :loading="loading" :bordered="null" class="plain-header-border">
      <!-- title="Shipment Logistics" -->
      <template slot="title">
        <a-col><h2><b>Shipment Logistics</b></h2></a-col>
      </template>
      <template slot="extra">
        <a-button type="primary" class="mr-10 btn-back" @click="goToReturn()">Back</a-button>
      </template>
      <div>
        <!-- <a-form :form="formShipment" class="support-add-modal" @submit.prevent="onSubmitShipment"> -->
        <div class="ant-col ant-col-24 bg-grey" >
            
            <a-row :gutter="20">
            <a-col :span="12">
                <a-form-item  class="selChangeSelectLogistic mlo-10 mt-4"
                    label="Courier"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 14}">
                    
                    <a-select
                    v-decorator="[
                        'courierId',
                        {
                        initialValue: events.courierId,
                        rules: [
                            {
                            required: true,
                            message: 'Select courier ',
                            },
                        ],
                        },
                        
                    ]"
                    :show-search="true"
                    placeholder="Select courier"
                    :filter-option="filterOption"
                    >
                    <a-select-option 
                    v-for="courier in couriers" 
                    :key="courier.id"
                    @click="courierGetBYId(courier.id, courier.name, courier.phone)" 
                    >
                        {{ courier.alias }}
                    </a-select-option>
                    </a-select>
                    <!-- <a-button type="link" class="mg-50 wd-11" @click="showModalCourier(true)">Add Courier</a-button> -->
                </a-form-item>
        
            </a-col>
            <a-col :span="12">
                
                <a-form-item class="selChangeSelectLogistic mt-4"
                label="Shipping Number"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 14 }"
                >
                <a-input
                    v-decorator="[
                    'shipingNo',
                    {
                        initialValue: events.shipingNo,
                        rules: [
                        {
                            required: true,
                            message: 'Please input Name',
                        },
                        ],
                    },
                    ]"
                    placeholder="+44000000000000"
                />
                </a-form-item>

            </a-col>
            </a-row>
            <a-row :gutter="20">
            <a-col :span="12">
                <a-form-item   class="selChangeSelectLogistic mlo-10"
                    label="Courier Service"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 14}">
                    
                    <a-select 
                    v-decorator="[
                        'courierServiceAllocationId',
                        {
                        initialValue: events.courierServiceAllocationId,
                        rules: [
                            {
                            required: true,
                            message: 'Select courier service ',
                            },
                        ],
                        },
                        
                    ]"
                    :show-search="true"
                    placeholder="Select courier service"
                    :filter-option="filterOption"
                    >
                    <a-select-option v-for="courierService in courierServices" :key="courierService.id">
                        {{ courierService.name }}
                    </a-select-option>
                    </a-select>
                    
                </a-form-item>
        
            </a-col>
            <a-col :span="12">
                <a-form-item   class="selChangeSelectLogistic"
                    label="Temperature"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 14}">
                    
                    <a-input
                    v-decorator="[
                    'temprature',
                    {
                        initialValue: events.temprature,
                        rules: [
                        {
                            required: true,
                            message: 'Please input Temprature',
                        },
                        {
                            message: 'Please enter Temprature'
                        }
                        ],
                    },
                    ]"
                    placeholder=""
                />
                </a-form-item>
        
            </a-col>
            </a-row>
            <a-row :gutter="20">
                <a-col :span="12">
                
                <a-form-item class="selChangeSelectLogistic mlo-10"
                label="Receiving Institute"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 14 }"
                >
                <a-input 
                    v-decorator="[
                    'organizationId',
                    {
                        initialValue: organization.id,
                        
                    },
                    ]"
                    type="hidden"
                />
                <a-input
                    v-decorator="[
                    'organizationName',
                    {
                        initialValue: organization.name,
                    },
                    ]"
                    placeholder=""
                />
                    <!-- <a-button type="link" class="mg-50 wd-11" @click="showModalInstitute(true)">Add Institute</a-button> -->
                </a-form-item>

            </a-col> 
            <a-col :span="12">
                
                <a-form-item class="selChangeSelectLogistic"
                label="Date"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 14 }"
                >
                <a-input 
                    v-decorator="[
                    'dated',
                    {
                        initialValue: events.dated,
                        rules: [
                        {
                            required: true,
                            message: 'Please input date',
                        },
                        ],
                    },
                    ]"
                type="date"
                
                />
                </a-form-item>

            </a-col>
            </a-row>
            <a-row :gutter="20">
                <a-col :span="12">
                
                <a-form-item class="selChangeSelectLogistic mlo-10"
                label="Date of Shipment"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 14 }"
                >
                <a-input 
                    v-decorator="[
                    'dateOfShipment',
                    {
                        initialValue: events.dateOfShipment,
                        rules: [
                        {
                            required: true,
                            message: 'Please input date',
                        },
                        {
                            message: 'Please select date'
                        }
                        ],
                    },
                    ]"
                type="date"
                
                />
                </a-form-item>

            </a-col>
            <a-col :span="12">
                <a-form-item   class="selChangeSelectLogistic"
                    label="Consignee"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 14}">
                    
                    <a-select 
                    v-decorator="[
                        'consigneeId',
                        {
                        initialValue: events.consigneeId,
                        rules: [
                            {
                            required: true,
                            message: 'Select consignee ',
                            },
                        ]
                        },
                        
                    ]"
                    :show-search="true"
                    placeholder="Select consignee"
                    :filter-option="filterOption"
                    >
                    <a-select-option v-for="consignee in consignees" :key="consignee.id">
                        {{ consignee.name }}
                    </a-select-option>
                    </a-select>
                    <a-button type="link" class="mg-50 wd-11" @click="showModalConsignee(true)">Add Consignee</a-button>
                </a-form-item>
        
            </a-col>
            </a-row>
            <a-row :gutter="20">
                <a-col :span="12">
                
                <a-form-item class="selChangeSelectLogistic mlo-10"
                label="Courier Name"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 14 }"
                >
                <a-input 
                    v-decorator="[
                    'courierName',
                    {
                        initialValue: events.courierName,
                        rules: [
                        {
                            required: true,
                            message: 'Please input courier name',
                        },
                        ],
                    },
                    ]"
                :readonly="true"
                    placeholder="Courier Name"
                />
                </a-form-item>

            </a-col>
            <a-col :span="12">
                
                <a-form-item class="selChangeSelectLogistic"
                label="Courier Phone"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 14 }"
                >
                <a-input 
                    v-decorator="[
                    'phoneNo',
                    {
                        initialValue: events.phoneNo,
                        rules: [
                        {
                            required: true,
                            message: 'Please input courier Phone',
                        },
                        ],
                    },
                    ]"
                :readonly="true"
                placeholder="Courier Phone"
                />
                </a-form-item>

            </a-col>
            </a-row>
        </div>
        <div class="ant-col-4"></div>
        <div class="ant-col ant-col-24 mt-t-20">
        <a-row >
        <a-col :span="4" >
            <h3 style="margin-top: 5px;">Shipment Document</h3>
        </a-col>
        <a-col :span="4">
            <!-- <a-button type="primary" class="hgtBtn"  @click="showModal(true)">Upload Document</a-button> -->
            <Upload
            :default-file-list="events.shippingDocumentImage"
            :extensions="allowedExtensions"
            @handleChange="handleChange"
          />
            <!-- <a-button  class="hgtBtn" style="background-color: #3869d1;color:white"> <a-icon type="upload"  /> Upload Document </a-button> -->
            
        </a-col>
        </a-row>
        </div>
        
        <a-table
                :columns="columnsReturn"
                :data-source="dummyDataSourceReturn"
                class="rounded-table pt-10 ant-col ant-col-24"
                :pagination="false"
              >
              
        </a-table>

        <!-- <a-col :lg="{offset:17,span:4}" :xl="{offset:17,span:4}" :sm="{offset:13,span:4}" :md="{offset:16,span:4}" :xs="{offset:13,span:4}">
            <FormActionButton type="primary"  class="wd-11 mt-t-20" custom-text="Book Courier"   />
        </a-col> -->
      <!-- </a-form> -->
        <!-- <a-col :lg="{offset:17,span:4}" :xl="{offset:17,span:4}" :sm="{offset:13,span:4}" :md="{offset:16,span:4}" :xs="{offset:13,span:4}">
            <a-button type="primary" class="wd-11 mt-t-20" @click="goto('/inbound/samples/sampleNotice')"  >Send Notice</a-button>
        </a-col> -->
        <!-- Courier Modal -->
              <a-modal
              :footer="null"
              :width="750"
              title="Courier"
              :destroy-on-close="true"
              :visible="visibleCourier"
              :dialog-style="{ top: '200px' }"
              :loading="loading"
              @cancel="showModalCourier(false)"
              @ok="showModalCourier(false)"
            >
              <a-form :form="formCourier" class="support-add-modal" @submit.prevent="onSubmitCourier">
                <div class="">
                  <a-row :gutter="20">
                  <a-col :span="12">
                  <a-form-item
                    label="Name *:"
                    :label-col="{ span: 24 }"
                    :wrapper-col="{ span: 22 }"
                  >
                    <a-input
                      v-decorator="[
                        'courierName',
                        {
                          initialValue: ticket.courierName,
                          rules: [
                            {
                              required: true,
                              message: 'Please input courier',
                            },
                            {
                              message: 'Please enter a valid courier'
                            }
                          ],
                        },
                      ]"
                      placeholder="Courier "
                    /> 
                    </a-form-item
                ></a-col>
                <a-col :span="12">
                  <a-form-item
                    label="Email *:"
                    :label-col="{ span: 24 }"
                    :wrapper-col="{ span: 22 }"
                  >
                    <a-input
                      v-decorator="[
                        'courierEmail',
                        {
                          initialValue: ticket.courierEmail,
                          rules: [
                            {
                              required: true,
                              message: 'Please input courier',
                            },
                            {
                              message: 'Please enter a valid courier'
                            }
                          ],
                        },
                      ]"
                      placeholder="Courier "
                    /> 
                    </a-form-item
                ></a-col>
                </a-row>
                <a-row :gutter="20">
                  <a-col :span="12">
                  <a-form-item
                    label="Phone *:"
                    :label-col="{ span: 24 }"
                    :wrapper-col="{ span: 22 }"
                  >
                    <a-input 
                      v-decorator="[
                        'phoneNo',
                        {
                          initialValue: ticket.phoneNo,
                          rules: [
                            {
                              required: true,
                              message: 'Please input courier',
                            },
                          ],
                        },
                      ]"
                      placeholder="Courier "
                    /> 
                    </a-form-item
                ></a-col>
                <a-col :span="12">
                  <a-form-item
                      label="Courier Service *:"
                      :label-col="{ span: 24 }"
                      :wrapper-col="{ span: 22 }"
                    >
                    <a-select
                      v-decorator="[
                        'CourierServicesIds',
                        {
                          initialValue: ticket.CourierServicesIds,
                          rules: [
                            {
                              required: true,
                              message: 'Please select your services',
                            },
                          ],
                        },
                      ]"
                      mode="multiple"
                      :show-search="true"
                      placeholder="Services"
                      style="width: 100%"
                      size="large"
                      class="default-select"
                      :filter-option="filterOption"
                    >
                      <a-select-option v-for="courierServiceDa in courierServicesData" :key="courierServiceDa.id">
                        {{ courierServiceDa.name }}
                      </a-select-option>
                    </a-select>
                    <a-button type="link" class="mg-50 wd-11" @click="showModalCourierService(true)">Add Courier Service</a-button>
          </a-form-item>
                </a-col>
                </a-row>

                <a-row class="">
                  <a-col class="text-right">
                    <FormActionButton :is-created="isCreated" :loading="loading" />
                  </a-col>
                </a-row>
                </div>
              </a-form>

              <div >
                <a-table
                  :columns="columnsCourier"
                  :data-source="datasourceCourier"
                  :loading="loading"
                  class="rounded-table pt-10 users-list"
                  :pagination="{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30', '50', '100'],
                  }"
                >
                  <template slot="action" slot-scope="action">
                    <a-dropdown>
                      <a-button class="action-button" @click="preventDefault">
                        Admin <a-icon type="down" />
                      </a-button>
                      <a-menu slot="overlay">
                        <a-menu-item key="1">
                          <a @click="goto(`/users/${action.globalId}`)">Edit</a>
                        </a-menu-item>
                        <a-menu-item key="2">
                          <!-- <a-popconfirm
                            :title="translation.Areyou_4_484"
                            :ok-text="translation.yes_1_654"
                            :cancel-text="translation.no_1_656"
                            placement="topLeft"
                            @confirm="deleteUser(`${action.globalId}`)"
                          >
                          </a-popconfirm> -->
                          <span>Delete</span>
                        </a-menu-item>
                      </a-menu>
                    </a-dropdown>
                  </template>
                </a-table>
                
              </div>

            </a-modal>
        <!-- End Modal -->
        <!-- Courier Service Modal -->
        <a-modal
              :footer="null"
              :width="750"
              title="Courier Service"
              :destroy-on-close="true"
              :visible="visibleCourierService"
              :dialog-style="{ top: '200px' }"
              :loading="loading"
              @cancel="showModalCourierService(false)"
              @ok="showModalCourierService(false)"
            >
              <a-form :form="formCourierService" class="support-add-modal" @submit.prevent="onSubmitCourierService">
                <div class="">
                  <a-row :gutter="20">
                  <a-col :span="12">
                  <a-form-item
                    label="Name *:"
                    :label-col="{ span: 24 }"
                    :wrapper-col="{ span: 22 }"
                  >
                    <a-input
                      v-decorator="[
                        'courierServiceName',
                        {
                          initialValue: ticketCourierService.courierName,
                          rules: [
                            {
                              required: true,
                              message: 'Please input courier',
                            },
                            {
                              message: 'Please enter a valid courier'
                            }
                          ],
                        },
                      ]"
                      placeholder="Courier "
                    /> 
                    </a-form-item
                ></a-col>
                </a-row>

                <a-row class="">
                  <a-col class="text-right">
                    <FormActionButton :is-created="isCreated" :loading="loading" />
                  </a-col>
                </a-row>
                </div>
              </a-form>

              <div >
                <a-table
                  :columns="columnsCourierService"
                  :data-source="datasourceCourierService"
                  :loading="loading"
                  class="rounded-table pt-10 users-list"
                  :pagination="{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30', '50', '100'],
                  }"
                >
                  <template slot="action" slot-scope="action">
                    <a-dropdown>
                      <a-button class="action-button" @click="preventDefault">
                        Admin <a-icon type="down" />
                      </a-button>
                      <a-menu slot="overlay">
                        <a-menu-item key="1">
                          <a @click="goto(`/users/${action.globalId}`)">Edit</a>
                        </a-menu-item>
                        <a-menu-item key="2">
                          <!-- <a-popconfirm
                            :title="translation.Areyou_4_484"
                            :ok-text="translation.yes_1_654"
                            :cancel-text="translation.no_1_656"
                            placement="topLeft"
                            @confirm="deleteUser(`${action.globalId}`)"
                          >
                          </a-popconfirm> -->
                          <span>Delete</span>
                        </a-menu-item>
                      </a-menu>
                    </a-dropdown>
                  </template>
                </a-table>
                
              </div>

            </a-modal>
        <!-- End Modal -->
        <!-- Institute Modal -->
        <a-modal
              :footer="null"
              :width="750"
              title="Institute"
              :destroy-on-close="true"
              :visible="visibleInstitute"
              :dialog-style="{ top: '200px' }"
              :loading="loading"
              @cancel="showModalInstitute(false)"
              @ok="showModalInstitute(false)"
            >
              <a-form :form="formInstitute" class="support-add-modal" @submit.prevent="onSubmitInstitute">
                <div class="">
                  <a-row :gutter="20">
                  <a-col :span="12">
                  <a-form-item
                    label="Institute Name *:"
                    :label-col="{ span: 24 }"
                    :wrapper-col="{ span: 22 }"
                  >
                    <a-input
                      v-decorator="[
                        'instituteName',
                        {
                          initialValue: ticketInstitute.instituteName,
                          rules: [
                            {
                              required: true,
                              message: 'Please input institute',
                            },
                          ],
                        },
                      ]"
                      placeholder="Institute "
                    /> 
                    </a-form-item
                ></a-col>
                <a-col :span="12">
                  <a-form-item
                    label="Shipping Destination *:"
                    :label-col="{ span: 24 }"
                    :wrapper-col="{ span: 22 }"
                  >
                    <a-input
                      v-decorator="[
                        'shippingDestination',
                        {
                          initialValue: ticketInstitute.shippingDestination,
                          rules: [
                            {
                              required: true,
                              message: 'Please input Shipping Destination',
                            },
                          ],
                        },
                      ]"
                      placeholder="Shipping Destination "
                    /> 
                    </a-form-item
                ></a-col>
                </a-row>
                <a-row :gutter="20">
                  <a-col :span="12">
                  <a-form-item
                    label="Address 1 *:"
                    :label-col="{ span: 24 }"
                    :wrapper-col="{ span: 22 }"
                  >
                    <a-input
                      v-decorator="[
                        'address1',
                        {
                          initialValue: ticketInstitute.address1,
                          rules: [
                            {
                              required: true,
                              message: 'Please input address',
                            },
                          ],
                        },
                      ]"
                      placeholder="Address "
                    /> 
                    </a-form-item
                ></a-col>
                <a-col :span="12">
                  <a-form-item
                    label="City *:"
                    :label-col="{ span: 24 }"
                    :wrapper-col="{ span: 22 }"
                  >
                    <a-input
                      v-decorator="[
                        'city',
                        {
                          initialValue: ticketInstitute.city,
                          rules: [
                            {
                              required: true,
                              message: 'Please input City',
                            },
                          ],
                        },
                      ]"
                      placeholder="City "
                    /> 
                    </a-form-item
                ></a-col>
                </a-row>
                <a-row :gutter="20">
                  <a-col :span="12">
                  <a-form-item
                    label="State/Province *:"
                    :label-col="{ span: 24 }"
                    :wrapper-col="{ span: 22 }"
                  >
                    <a-input
                      v-decorator="[
                        'state',
                        {
                          initialValue: ticketInstitute.state,
                          rules: [
                            {
                              required: true,
                              message: 'Please input state',
                            },
                          ],
                        },
                      ]"
                      placeholder="State "
                    /> 
                    </a-form-item
                ></a-col>
                <a-col :span="12">
                  <a-form-item
                    label="Zip *:"
                    :label-col="{ span: 24 }"
                    :wrapper-col="{ span: 22 }"
                  >
                    <a-input
                      v-decorator="[
                        'zip',
                        {
                          initialValue: ticketInstitute.zip,
                          rules: [
                            {
                              required: true,
                              message: 'Please input Zip',
                            },
                          ],
                        },
                      ]"
                      placeholder="Zip "
                    /> 
                    </a-form-item
                ></a-col>
                </a-row>
                <a-row :gutter="20">
                <a-col :span="12">
                  <a-form-item
                    label="Contact No *:"
                    :label-col="{ span: 24 }"
                    :wrapper-col="{ span: 22 }"
                  >
                    <a-input
                      v-decorator="[
                        'contactNo',
                        {
                          initialValue: ticketInstitute.contactNo,
                          rules: [
                            {
                              required: true,
                              message: 'Please input Contact No',
                            },
                          ],
                        },
                      ]"
                      placeholder="Contact No "
                    /> 
                    </a-form-item
                ></a-col>
                </a-row>

                <a-row class="">
                  <a-col class="text-right">
                    <FormActionButton :is-created="isCreated" :loading="loading" />
                  </a-col>
                </a-row>
                </div>
              </a-form>

              <div >
                <a-table
                  :columns="columnsInstitute"
                  :data-source="datasourceInstitute"
                  :loading="loading"
                  class="rounded-table pt-10 users-list"
                  :pagination="{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30', '50', '100'],
                  }"
                >
                  <template slot="action" slot-scope="action">
                    <a-dropdown>
                      <a-button class="action-button" @click="preventDefault">
                        Admin <a-icon type="down" />
                      </a-button>
                      <a-menu slot="overlay">
                        <a-menu-item key="1">
                          <a @click="goto(`/users/${action.globalId}`)">Edit</a>
                        </a-menu-item>
                        <a-menu-item key="2">
                          <!-- <a-popconfirm
                            :title="translation.Areyou_4_484"
                            :ok-text="translation.yes_1_654"
                            :cancel-text="translation.no_1_656"
                            placement="topLeft"
                            @confirm="deleteUser(`${action.globalId}`)"
                          >
                          </a-popconfirm> -->
                          <span>Delete</span>
                        </a-menu-item>
                      </a-menu>
                    </a-dropdown>
                  </template>
                </a-table>
                
              </div>

            </a-modal>
        <!-- End Modal -->

        <!-- Consignee Modal -->
            <a-modal
              :footer="null"
              :width="750"
              title="Consignee"
              :destroy-on-close="true"
              :visible="visibleConsignee"
              :dialog-style="{ top: '200px' }"
              :loading="loading"
              @cancel="showModalConsignee(false)"
              @ok="showModalConsignee(false)"
            >
              <a-form :form="formConsignee" class="support-add-modal" @submit.prevent="onSubmitConsignee">
                <div class="">
                  <a-row :gutter="20">
                  <a-col :span="12">
                  <a-form-item
                    label="Consignee Name *:"
                    :label-col="{ span: 24 }"
                    :wrapper-col="{ span: 22 }"
                  >
                  <a-input 
                      v-decorator="[
                        'consigneeId',
                        {
                          initialValue: ticketConsignee.id,
                        },
                      ]"
                  type="hidden"
                    /> 
                    <a-input
                      v-decorator="[
                        'consigneeName',
                        {
                          initialValue: ticketConsignee.name,
                          rules: [
                            {
                              required: true,
                              message: 'Please input Consignee',
                            },
                          ],
                        },
                      ]"
                      placeholder="Consignee "
                    /> 
                    </a-form-item
                ></a-col>
                </a-row>
                

                <a-row class="">
                  <a-col class="text-right">
                    <FormActionButton :is-created="isCreated" :loading="loading" />
                  </a-col>
                </a-row>
                </div>
              </a-form>

              <div >
                <a-table
                  :columns="columnsConsignee"
                  :data-source="datasourceConsignee"
                  :loading="loading"
                  class="rounded-table pt-10 users-list"
                  :pagination="{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30', '50', '100'],
                  }"
                >
                  <template slot="action" slot-scope="action">
                    <a-dropdown>
                      <a-button class="action-button" @click="preventDefault">
                        Admin <a-icon type="down" />
                      </a-button>
                      <a-menu slot="overlay">
                        <a-menu-item key="1">
                          <a @click="getConsigneeById(action.id)">Edit</a>
                        </a-menu-item>
                        <a-menu-item key="2">
                          <a @click="delConsignee(action.id)">Delete</a>
                        </a-menu-item>
                      </a-menu>
                    </a-dropdown>
                  </template>
                </a-table>
                
              </div>

            </a-modal>
<!-- End Modal -->

      </div>
    </a-card>
  </template>
  <script>
  import notifications from '~/mixins/notifications'
  import { filterOption,preventDefault } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  // import PageLayout from '~/components/layout/PageLayout'
  import CourierServices from '~/services/API/CourierServices'
  import CourierServiceServices from '~/services/API/CourierServiceServices'
  import InstituteServices from '~/services/API/InstituteServices'
  import ConsigneeServices from '~/services/API/ConsigneeServices'
  import ShipmentServices from '~/services/API/ShipmentServices'
  import Upload from '~/components/upload/profile'
  import { PICTURE_UPLOAD_EXTENSIONS } from '~/services/Constant'
  import OrganizationServices from '~/services/API/OrganizationServices'
  
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: { 
      // PageLayout,
      Upload},
    mixins: [routeHelpers, notifications],
    props:{
        entity: {
        type: Object,
        default: () => ({}),
      },
      organizationId : {
        type: Number
      },
      ticket: {
        type: Object,
        default: () => ({}),
      },
      ticketCourierService: {
        type: Object,
        default: () => ({}),
      },
      ticketInstitute: {
        type: Object,
        default: () => ({}),
      },
      dummyDataSourceReturn:{
        type: Array,
        default: () => ([])
      },
      organization : {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        courierServicesData:[],
        isCreated:false,
        loading:false,
        events: {
        type: Object,
        default: () => ({}),
        },
        allowedExtensions: PICTURE_UPLOAD_EXTENSIONS,
        isShow:false,
        couriers:[],
        institutes:[],
        consignees:[],
        courierServices:[],
        visibleCourier:false,
        visibleInstitute:false,
        visibleConsignee:false,
        visibleCourierService:false,
        reasons:[],
        visible:false,
        ticketConsignee: {
        type: Object,
        default: () => ({}),
        },
        formCourier: this.$form.createForm(this, {
          name: 'courierCreate',
        }),
        formShipment: this.$form.createForm(this, {
          name: 'shipmentCreate',
        }),
        formCourierService: this.$form.createForm(this, {
          name: 'courierServiceCreate',
        }),
        formInstitute: this.$form.createForm(this, {
          name: 'instituteCreate',
        }),
        formConsignee: this.$form.createForm(this, {
          name: 'consigneeCreate',
        }),
        sampleDummyData:
          {},
          datasourceReturn: [],
      
      orgId:0,
      columnsReturn: [
        {
          title: 'Shipment Destination',
          dataIndex: 'shippingDestination',
          key: 'shippingDestination',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address' ,
        },
        {
          title: 'City',
          dataIndex: 'city',
          key: 'city',
          
        },
        {
          title: 'State',
          dataIndex: 'state',
          key: 'state' ,
        },
        {
          title: 'Zip',
          dataIndex: 'zip',
          key: 'zip' ,
        },
        {
          title: 'Contact',
          dataIndex: 'contactNo',
          key: 'contactNo' ,
        },
      ],
      columnsCourier: [
          {
            title: 'Courier Name',
            dataIndex: 'courierName',
            key: 'courierName',
          },
          {
            title: 'Courier Email',
            dataIndex: 'courierEmail',
            key: 'courierEmail',
          },
          {
            title: 'Phone',
            dataIndex: 'phoneNo',
            key: 'phoneNo',
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        datasourceCourier:[],
        columnsCourierService: [
          {
            title: 'Courier Service Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        datasourceCourierService:[],
        columnsInstitute: [
          {
            title: 'Institute Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Shipping Destination',
            dataIndex: 'shippingDestination',
            key: 'shippingDestination',
          },
          {
            title: 'Address1',
            dataIndex: 'address1',
            key: 'address1',
          },
          {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
          },
          {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
          },
          {
            title: 'Zip',
            dataIndex: 'zip',
            key: 'zip',
          },
          {
            title: 'Contact',
            dataIndex: 'contactNo',
            key: 'contactNo',
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        
        columnsConsignee: [
          {
            title: 'Consignee Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        datasourceConsignee:[],
        datasourceInstitute:[],
        fileList:[]
      }
    },
    computed: {
     
    },
    mounted() {
      this.sampleReturnId = this.$route.query.id;
      this.orgId = this.$route.query.oId;
      this.getAllCouriers()
      this.getAllCourierService()
      this.getAllInstitute()
      this.getAllConsignee()
      // if(this.orgId === 0){
      //   this.getOrganization(this.organizationId)
      // }
      // else{
      //   this.getOrganization(this.orgId)
      // }
    },
    methods: {
      filterOption,
      preventDefault,
      showModal(show) {
      this.visible = show
      this.$parent.showAddModal = show
      this.$emit('closeModal', show)
    },
    goToReturn(){
      this.$emit('hideReturn',true)
    },
    showModalCourier(show) {
      this.visibleCourier = show
      this.$parent.showAddModal = show
      this.$emit('closeModal', show)
    },
    showModalInstitute(show) {
      this.visibleInstitute = show
      this.$parent.showAddModal = show
      this.$emit('closeModal', show)
    },
    showModalConsignee(show) {
      this.visibleConsignee = show
      this.$parent.showAddModal = show
      this.$emit('closeModal', show)
    },
    showModalCourierService(show) {
      this.visibleCourierService = show
      this.$parent.showAddModal = show
      this.$emit('closeModal', show)
    },
    onSubmitCourier(e) {
      this.loading = true
      e.preventDefault()
      this.formCourier.validateFields((err, values) => {
        if (!err) {
          if (this.isCreated) {
            this.update(values)
          } else {
            CourierServices.create(values).then((response)=>{
              this.loading=false
              this.getAllCouriers()
            })
          }
        } else {
          this.loading = false
        }
      })
    },
    onSubmitCourierService(e) {
      this.loading = true
      e.preventDefault()
      this.formCourierService.validateFields((err, values) => {
        if (!err) {
          if (this.isCreated) {
            this.update(values)
          } else {
            CourierServiceServices.create(values).then((response)=>{
              this.getAllCourierService()
              this.loading=false
            })
          }
        } else {
          this.loading = false
        }
      })
    },
    onSubmitInstitute(e) {
      this.loading = true
      e.preventDefault()
      this.formInstitute.validateFields((err, values) => {
        if (!err) {
          if (this.isCreated) {
            this.update(values)
          } else {
            InstituteServices.create(values).then((response)=>{
              this.loading=false
              this.getAllInstitute()
            })
          }
        } else {
          this.loading = false
        }
      })
    },
    onSubmitConsignee(e) {
      this.loading = true
      e.preventDefault()
      this.formConsignee.validateFields((err, values) => {
        if (!err) {
          if (this.isCreated) {
            ConsigneeServices.updateConsignee(values).then((response)=>{
              this.loading=false
              this.getAllConsignee()
            })
          } else {
            ConsigneeServices.create(values).then((response)=>{
              this.loading=false
              this.getAllConsignee()
            })
          }
        } else {
          this.loading = false
        }
      })
    },
    getConsigneeById(id){
      ConsigneeServices.getById(id).then((response)=>{
        this.ticketConsignee = response.data
        this.isCreated=true
      })
    },
    delConsignee(id){
      ConsigneeServices.delConsignee(id).then((response)=>{
        this.getAllConsignee()
      })
    },
    onSubmitShipment(e) {
      this.loading = true
      e.preventDefault()
      this.formShipment.validateFields((err, values) => {
        if (!err) {
          const formData = new FormData()
            for (const key in values) {
              formData.append(key, values[key])
            }
            formData.append('sampleReturnGuId',this.sampleReturnId)
            this.fileList.forEach((files) => {
              formData.append('shippingDocumentImage', files)
            })
          if (this.isCreated) {
            this.update(values)
          } else {
            ShipmentServices.create(formData).then((response)=>{
              this.loading=false
              this.getAllConsignee()
              this.goto('/inbound/samples/sampleNotice?id='+this.sampleReturnId+'&oId='+this.orgId)
            })
          }
        } else {
          this.loading = false
        }
      })
    },
    onBookCourier(show){
      this.isShow = show
    },
    handleChange(info) {
      this.fileList = info
      this.$emit('handleFile', this.fileList)
    },
    getAllCouriers()
    {
      OrganizationServices.getCouriers().then((response) => {
        this.couriers= response.data
          this.datasourceCourier=response.data
      })
      // CourierServices.get().then((response)=>{
      //   console.log(response)
      //         this.couriers=response.data
      //       })
    },
    getAllInstitute()
    {
      InstituteServices.get().then((response)=>{
              this.institutes=response.data
              this.datasourceInstitute=response.data
            })
    },
    // instituteGetById(value)
    // {
    //   InstituteServices.getById(value).then((response)=>{
    //           this.dummyDataSourceReturn=[response.data]
    //         })
    // },
    courierGetBYId(value, name , phone)
    {
      this.getAllCourierServiceById(value);
      // CourierServices.getById(value).then((response)=>{
        this.events.courierName=name
        this.events.phoneNo=phone
      // })
    },
    getAllConsignee()
    {
      ConsigneeServices.get().then((response)=>{
              this.consignees=response.data
              this.datasourceConsignee=response.data
            })
    },
    getAllCourierService()
    {
      CourierServiceServices.get().then((response)=>{
        this.courierServicesData=response.data
              this.courierServices=response.data
              this.datasourceCourierService=response.data
            })
    },
    getAllCourierServiceById(id)
    {
      CourierServiceServices.getById(id).then((response)=>{
              this.courierServices=response.data
            })
    },
    // getOrganization(id)
    // {
    //   console.log(this.organization)
    //   // OrganizationServices.getById(id).then((response)=>{
    //   //   this.events.organizationId = response.data.id
    //   //   this.events.organizationName = response.data.name
        
    //   // })
    // }
    },
  }
  </script>
  <style>
  .mg-50{
    margin-left: 50px;
  }
  .txtFt{
  padding-top: 8px;font-weight: 200;
}
.txtTp{
  padding-top: 8px;
}
.mlo-10{
  margin-left: 10px;
}
.mg-t-20{
  margin-top: 20px;
}
.mt-300{
  margin-top: 300px;
}
.mt-t-20{
    margin-top: 20px;
}
.pd-t-15{
    padding-top: 15px;
}
</style>