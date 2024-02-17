<template>
    <a-row>
      <a-form>
            <a-col :md="10">
                <a-card :offset="2" class="bg-grey">
                  
                    <a-form-item class="selChange mSize" 
                      label="Invoice Number"
                      :label-col="{ span: 11 }"
                      :wrapper-col="{ span: 12 }"
                        >
                          <a-input 
                              v-decorator="[
                              'invoiceNumber',
                              {
                                  initialValue: entity.invoiceNumber,
                                  rules: [
                                  {
                                      required: true,
                                      message: 'Required Temprature',
                                  },
                                  ],
                              },
                              ]"
                              placeholder="ABC123-456"
                              :value="sampleDummyData.invoiceNumber"
                              size="large"
                          >
                          </a-input>
                      </a-form-item>
                       
                       
                      <a-form-item class="selChange mSize"
                      label="Waybill Number"
                      :label-col="{ span: 11 }"
                      :wrapper-col="{ span: 12 }"
                        >
                          <a-input 
                              v-decorator="[
                              'waybillNumber',
                              {
                                  initialValue: entity.waybillNumber,
                                  rules: [
                                  {
                                      required: true,
                                      message: 'Required WaybillNumber',
                                  },
                                  ],
                              },
                              ]"
                              placeholder="456-46"
                              :value="sampleDummyData.wayBillingNo"
                              size="large"
                          >
                          </a-input>
                      </a-form-item>
                       
                      <a-form-item class="selChange mSize"
                      label="Date Received"
                      :label-col="{ span: 11 }"
                      :wrapper-col="{ span: 12 }"
                        >
                          <a-input
                              v-decorator="[
                              'receivedDate',
                              {
                                  initialValue: entity.receivedDate,
                                  rules: [
                                  {
                                      required: true,
                                      message: 'Required Temprature',
                                  },
                                  ],
                              },
                              ]"
                              type="date"
                              placeholder="DD/MM/YYYY"
                              :value="sampleDummyData.dateReceived"
                              size="large"
                          >
                          </a-input>
            </a-form-item>
                       
            <a-form-item class="selChange mSize"
                      label="Courier Email"
                      :label-col="{ span: 11 }"
                      :wrapper-col="{ span: 12 }"
                        >
                          <a-input 
                              v-decorator="[
                              'courierEmail',
                              {
                                  initialValue: entity.courierEmail,
                                  rules: [
                                  {
                                      required: true,
                                      message: 'Required Temprature',
                                  },
                                  ],
                              },
                              ]"
                              placeholder="abc@gmail.com"
                              :value="sampleDummyData.courierEmail"
                              size="large"
                          >
                          </a-input>
            </a-form-item>

                       <a-form-item class="selChange mSize"
                      label="Courier Contact"
                      :label-col="{ span: 11 }"
                      :wrapper-col="{ span: 12 }"
                        >
                          <a-input 
                              v-decorator="[
                              'courierContact',
                              {
                                  initialValue: entity.courierContact,
                                  rules: [
                                  {
                                      required: true,
                                      message: 'Required Temprature',
                                  },
                                  ],
                              },
                              ]"
                              placeholder="+00-00000000"
                              :value="sampleDummyData.courierContact"
                              size="large"
                          >
                          </a-input>
            </a-form-item>

                       <a-form-item class="selChange mSize"
                      label="Sample Description"
                      :label-col="{ span: 11 }"
                      :wrapper-col="{ span: 12 }"
                        >
                          <a-input 
                              v-decorator="[
                              'sampleDescription',
                              {
                                  initialValue: entity.sampleDescription,
                                  rules: [
                                  {
                                      required: true,
                                      message: 'Required Temprature',
                                  },
                                  ],
                              },
                              ]"
                              placeholder="Human Cell"
                              :value="sampleDummyData.description"
                              size="large"
                          >
                          </a-input>
            </a-form-item>

                       <a-form-item class="selChange mSize"
                      label="Quantity Received"
                      :label-col="{ span: 11 }"
                      :wrapper-col="{ span: 12 }"
                        >
                          <a-input 
                              v-decorator="[
                              'quantityReceived',
                              {
                                  initialValue: entity.quantityReceived,
                                  rules: [
                                  {
                                      required: true,
                                      message: 'Quantity',
                                  },
                                  ],
                              },
                              ]"
                              placeholder="23"
                              :value="sampleDummyData.quantity"
                              size="large"
                          >
                          </a-input>
            </a-form-item>

                       <a-form-item class="selChange mSize"
                      label="Client"
                      :label-col="{ span: 11 }"
                      :wrapper-col="{ span: 12 }"
                        >
                          <a-input 
                              v-decorator="[
                              'client',
                              {
                                  initialValue: entity.client,
                                  rules: [
                                  {
                                      required: true,
                                      message: 'Client',
                                  },
                                  ],
                              },
                              ]"
                              placeholder="23"
                              :value="sampleDummyData.clientName"
                              size="large"
                          >
                          </a-input>
            </a-form-item>
                   </a-card>
                </a-col>
                <a-col :md="10" :offset="2">
                <a-card :offset="2" class="bg-grey">
                  
                    <a-form-item class="selChange mSize" 
                      label="Researcher Name"
                      :label-col="{ span: 11 }"
                      :wrapper-col="{ span: 12 }"
                        >
                          <a-input 
                              v-decorator="[
                              'researcherName',
                              {
                                  initialValue: entity.researcherName,
                                  rules: [
                                  {
                                      required: true,
                                      message: 'Required researcherName',
                                  },
                                  ],
                              },
                              ]"
                              placeholder=" john smith"
                              :value="sampleDummyData.researcherName"
                              size="large"
                          >
                          </a-input>
                      </a-form-item>
                       
                       
                      <a-form-item class="selChange mSize"
                      label="Study Name"
                      :label-col="{ span: 11 }"
                      :wrapper-col="{ span: 12 }"
                        >
                          <a-input 
                              v-decorator="[
                              'studyName',
                              {
                                  initialValue: entity.studyName,
                                  rules: [
                                  {
                                      required: true,
                                      message: 'Required studyName',
                                  },
                                  ],
                              },
                              ]"
                              placeholder="Bio Bank"
                              :value="sampleDummyData.projectName"
                              size="large"
                          >
                          </a-input>
                      </a-form-item>
                       
                      <a-form-item class="selChange mSize"
                      label="Project ID"
                      :label-col="{ span: 11 }"
                      :wrapper-col="{ span: 12 }"
                        >
                          <a-input 
                              v-decorator="[
                              'projectId',
                              {
                                  initialValue: entity.projectId,
                                  rules: [
                                  {
                                      required: true,
                                      message: 'Required projectId',
                                  },
                                  ],
                              },
                              ]"
                              placeholder="123-456"
                              :value="sampleDummyData.projectId"
                              size="large"
                          >
                          </a-input>
            </a-form-item>
                       
            <a-form-item class="selChange mSize"
                      label="#ARN"
                      :label-col="{ span: 11 }"
                      :wrapper-col="{ span: 12 }"
                        >
                          <a-input 
                              v-decorator="[
                              'arn',
                              {
                                  initialValue: entity.arn,
                                  rules: [
                                  {
                                      required: true,
                                      message: 'Required ARN',
                                  },
                                  ],
                              },
                              ]"
                              placeholder="ARN-234-456"
                              :value="sampleDummyData.lotNo"
                              size="large"
                          >
                          </a-input>
            </a-form-item>

                       <a-form-item class="selChange mSize"
                      label="Protocol"
                      :label-col="{ span: 11 }"
                      :wrapper-col="{ span: 12 }"
                        >
                          <a-input 
                              v-decorator="[
                              'protocol',
                              {
                                  initialValue: entity.protocol,
                                  rules: [
                                  {
                                      required: true,
                                      message: 'Required Protocol',
                                  },
                                  ],
                              },
                              ]"
                              placeholder="RT456"
                              :value="sampleDummyData.projectName"
                              size="large"
                          >
                          </a-input>
            </a-form-item>

                       <a-form-item class="selChange mSize"
                      label="Protocol ID"
                      :label-col="{ span: 11 }"
                      :wrapper-col="{ span: 12 }"
                        >
                          <a-input 
                              v-decorator="[
                              'protocolId',
                              {
                                  initialValue: entity.protocolId,
                                  rules: [
                                  {
                                      required: true,
                                      message: 'Required protocolId',
                                  },
                                  ],
                              },
                              ]"
                              placeholder="RTY345"
                              :value="sampleDummyData.protocolId"
                              size="large"
                          >
                          </a-input>
            </a-form-item>

                       <a-form-item class="selChange mSize"
                      label="Location"
                      :label-col="{ span: 11 }"
                      :wrapper-col="{ span: 12 }"
                        >
                          <a-input 
                              v-decorator="[
                              'location',
                              {
                                  initialValue: entity.location,
                                  rules: [
                                  {
                                      required: true,
                                      message: 'Location',
                                  },
                                  ],
                              },
                              ]"
                              placeholder="Site1"
                              :value="sampleDummyData.locationName"
                              size="large"
                          >
                          </a-input>
            </a-form-item>

                       <a-form-item class="selChange mSize"
                      label="Client ID"
                      :label-col="{ span: 11 }"
                      :wrapper-col="{ span: 12 }"
                        >
                          <a-input 
                              v-decorator="[
                              'client',
                              {
                                  initialValue: entity.client,
                                  rules: [
                                  {
                                      required: true,
                                      message: 'Client',
                                  },
                                  ],
                              },
                              ]"
                              placeholder="23"
                              :value="sampleDummyData.clientId"
                              size="large"
                          >
                          </a-input>
            </a-form-item>
                   </a-card>
                </a-col>
              </a-form>
              </a-row>
    
</template>
<script>

import notifications from '~/mixins/notifications'
import { preventDefault } from '~/services/Helpers'
import routeHelpers from '~/mixins/route-helpers'

// import PageLayout from '~/components/layout/PageLayout'
export default {
  components: {  },
  mixins: [routeHelpers, notifications],
  props:{
    entity: {
        type: Object,
        default: () => ({}),
      }
  },
  data() {
    return {
        sampleDummyData:
          { id: 1,
            invoiceNumber: '12345',
            wayBillingNo:'12345',
            dateReceived: 'DD/MM/YYYY',
            courierEmail: 'abc@gmail.com',
            courierContact: '+92-34534567',
            description: 'Human Cells',
            quantity: 100,
            clientName: 'Test Client',
            researcherName : 'John Smith',
            projectName : 'Bio Bank',
            projectId : 123-67,
            lotNo : 456-235,
            protocolName : 'ARN-234-345',
            protocolId: 234987,
            locationName: 'Site 1',
            clientId : 435
          }
    }
  },
  computed: {
    // ...mapGetters(['getUser']),
    
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    
  },
  methods: {
    preventDefault
    
  },
}
</script>
<style scoped>
.txtFt{
  padding-top: 8px;font-weight: 200;
}
.txtTp{
  padding-top: 8px;
}
</style>