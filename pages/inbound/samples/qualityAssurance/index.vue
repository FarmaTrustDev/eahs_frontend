<template>
    <page-layout
      :loading="false"
      title="Inbound/ Samples"
      class="specific container page-search-input-container"
      :create="false"
    >
      
      <div slot="content">
        <div class="a-card">
        <a-row>
        <a-col :span="24" :xs="24" :md="24" :sm="24" :lg="24" :xl="24">
            <a-row>
              <!-- left side tabs -->
              <a-col :md="10">
                <a-row>
                    <a-col :span="13" :offset="2">
                      <div class="qr-section default-card ant-card">
                        <div class="ant-card-body">
                          <figure class="m-0">
                          <img style="width:100px;height:100px" src="https://demoapi.qmaid.co/Uploads/patient/132/qr/638016742198819783.png" alt="Christina Braun" class="img-fluid"> 
                          <figcaption>Frank Williamson</figcaption>
                        </figure></div></div>
                    </a-col>
                  </a-row>

                 

              </a-col>
              <!-- #end left side tabs -->
              
  
              <a-col :span="12" :offset="2">
                <a-row>
                <a-col :span="17">
                <p>Is there an advance notification for sample?</p>
                </a-col>
                <a-col :span="2">
                <a-form-item>
                        <a-switch
                            v-decorator="[
                            'isNotificationAdvanced',
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
                        /><span class="ml-5"></span>
                </a-form-item>
            </a-col>
                </a-row>
                <a-row>
                    <a-col :span="22">
                <a-form-item
                    label="Custodian Name *:"
                    :label-col="{ span: 24 }"
                    :wrapper-col="{ span: 22 }"
                >
                <div class="ant-card " style="border-radius: 0%;">
                    <div class="ant-card-body">
                    <a-input 
                    v-decorator="[
                        'custodianId',
                        {
                        initialValue: entity.custodianName,
                        rules: [
                            {
                            required: true,
                            message: 'Please input your Name',
                            },
                            {
                            message: 'Please enter a valid name'
                            }
                        ],
                        },
                    ]"
                    style="height:30px;border-radius: 0%;"
                    placeholder="Your Name"
                    /> </div></div></a-form-item
                    ></a-col>
                </a-row>
                <a-row>
                    <a-col :span="17">
                    <p>Confirm data captured is accurate?</p>
                    </a-col>
                    <a-col :span="2">
                    <a-form-item>
                            <a-switch
                                v-decorator="[
                                'isConfirmed',
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
                            /><span class="ml-5"></span>
                    </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                  <a-col :span="6"><a-button style="background-color: #b3f2c6;" class="wd-12 ht" >Inbound </a-button></a-col>
                  <a-col :span="6" :offset="1" ><a-button style="background-color: #cfeefa;" class="wd-12 ht">Process</a-button></a-col>
                  <a-col :span="6"  :offset="1"><a-button  style="background-color: lightgray" class="wd-12 ht">Store</a-button></a-col>
                </a-row>
                
                </a-col>
            </a-row>
            
            <a-row :span="24" >
                    <div class="h-tabs" >
                        <a-tabs type="card" >
                        <a-tab-pane key="1" tab="Barcode">
                            
                            
                          </a-tab-pane>
                        
                        <a-tab-pane key="2" tab="QR Code">
                             
                          </a-tab-pane>
                        
                        
                        <a-tab-pane key="3" tab="Manual">
                            
                      </a-tab-pane >
                            
                        </a-tabs>
                    </div>
            </a-row>
            <QualityAssurance></QualityAssurance>
          
        </a-col>
      </a-row>
      <div>
    
  </div>
</div>
    
      </div>
    </page-layout>
  </template> 
  <script>
  import notifications from '~/mixins/notifications'
  import { preventDefault } from '~/services/Helpers'
  import routeHelpers from '~/mixins/route-helpers'
  import PageLayout from '~/components/layout/PageLayout'
  import QualityAssurance from '~/components/root/samples/qualityAssurance'
  
  // import PageLayout from '~/components/layout/PageLayout'
  export default {
    components: { PageLayout , QualityAssurance},
    mixins: [routeHelpers, notifications],
    props:{
      entity: { 
        type: Object,
         default: () => ({}) 
        }
    },
    data() {
      return {
        inbound:10,
        outbound:5,
        processing:7,
        scheduled:3
      }
    },
    computed: {
     
    },
    mounted() {
      
    },
    methods: {
      preventDefault,
      
    },
  }
  </script>
  <style>
  .mg-50{
    margin-left: 50px;
  }
</style>
  