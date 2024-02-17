<template>
    <div class="ant-card">
      <div class="ant-card-body  bg-grey"> 
        <a-input
        v-decorator="[
                'sampleGuid',
                {
                    initialValue: entity.sampleGuid,
                    rules: [
                        {
                        required: projectRequired,
                        message: 'Please select your Project',
                        },
                    ],
                    },
              ]"
              type="hidden"
        />
        <a-row>
                  <a-col :span="6">
                    <p>Is sample received ?</p>
                    </a-col>
                    <a-col :span="6">
                    <a-form-item>
                            <a-switch 
                                v-decorator="[
                                'isChecked',
                                {
                                  initialValue: !isEmpty(entity.dateReceived),
                                    rules: [],
                                    valuePropName: 'checked',
                                },
                                ]"
                                :disabled="isReceive==='true'"
                                data-rowId="2"
                                size="large"
                                class="toggle_record"
                                checked-children="Yes"
                                un-checked-children="No"
                                @click="isReceived"
                            /><span class="ml-5"></span>
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item 
                    label="Sample Name *:"
                    class="selChange"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 12 }"
                    >
                      <a-input
                        v-decorator="[
                          'name',
                          {
                            initialValue: entity.name,
                            rules:[
                              {
                                required: true,
                                message: 'Please enter name'
                              },
                            ],
                          }
                        ]"
                        :disabled="isReceive==='true'"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row>
        <!-- <a-col :span="4">  -->
          <!-- <a-button v-if="isChecked" type="link" class="md-10" @click="showModalCastodian(true)">Add Custodian</a-button> -->
        <!-- </a-col> -->
       
      </a-row>
        <a-row>
            <a-col :span="12" >
                <a-form-item class="selChange"
                label="Custodian *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12}">
                <!-- <a-select 
                v-decorator="[
                    'custodianId',
                    {
                    initialValue: entity.custodianId,
                    rules: [
                        {
                        required: '',
                        message: 'Please select your Custodian',
                        },
                    ],
                    },
                    
                ]"
                :get-popup-container="trigger => trigger.parentNode"
                :show-search="true"
                :filter-option="filterOption"
                placeholder="Custodian"
                class="selOther"
                :disabled="!isChecked"
                >
                <a-select-option v-for="custodian in custodians" :key="custodian.id">
                    {{ custodian.name }}
                </a-select-option>
              </a-select> -->
              <a-input
              v-decorator="[
                'custodianId',
                {
                    initialValue: custodianId,
                    rules: [
                        {
                        required: custodianRequired,
                        message: 'Please select your custodian',
                        },
                    ],
                    },
                
              ]"
              type="hidden"
              />
              <a-input        
                :value="selectedCustodian"
                placeholder="Custodian"
                size="large"
                style="max-width: 100%"
                :disabled="!isChecked"
                @click="cancelSelectCustodianModel(true)"
                />
                <span v-if="custodianRequired" class="color-red">Please select your custodian</span>
            </a-form-item>
          </a-col>
            <a-col :span="12">
            <a-form-item class="selChange"
                label="Ideal Temperature *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
            
            <a-select :getPopupContainer="trigger => trigger.parentNode"
                v-decorator="[
                    'idealTemprature',
                    {
                    initialValue: entity.idealTemprature,
                    rules: [
                        {
                        required: true,
                        message: 'Please select ideal temperature',
                        },
                    ],
                    },
                    
                ]"
                :show-search="true"
                :filter-option="filterOption"
                placeholder="Ideal Temperature"
                class="selOther"
                @change = "(id) => getLocations(id)"
                >
                <a-select-option v-for="fridgeType in fridgeTypes" :key="fridgeType.id">
                    {{ fridgeType.name }}
                </a-select-option>
              </a-select>



            </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="12">
                <a-form-item class="selChange"
                    label="Expiry Date *:"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 12 }"
                >
          <a-date-picker 
            v-decorator="[
              'expiryDate',
              {
                initialValue: entity.expiryDate,
                rules: [
                  {
                    required: true,
                    message: 'Required',
                  },
                ],
              },
            ]"
            placeholder="DD/MM/YYYY"
            :disabled="isReceive==='true'"
            :disabled-date="disablePreviousDate"
            format="DD/MM/YYYY"
            style="width: 100%"
            size="large"
          >
          </a-date-picker>
          </a-form-item>
            </a-col>
            <a-col :span="12">
            <a-form-item class="selChange"
                label="Duration *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'duration',
                {
                    initialValue: entity.duration,
                    rules: [
                    {
                        required: true,
                        message: 'Required Duration',
                    },
                    ],
                },
                ]"
                min="0" 
                placeholder="Ideal duration in days"
                style="width: 100%"
                size="large"
                type="number"
            >
            </a-input>
            </a-form-item>
            </a-col>
        </a-row>
        <!-- <a-row>
            <a-col :offset="18"><a-button type="link" class="md-10" @click="showModalProject(true)">Add Project</a-button></a-col>
        </a-row> -->
        <a-row>
            <a-col :span="12">
                <a-form-item class="selChange"
                    label="Date Received *:"
                    :label-col="{ span: 8 }"
                    :wrapper-col="{ span: 12 }"
                    
                >
          <a-date-picker
            v-decorator="[
              'dateReceived',
              {
                initialValue: entity.dateReceived,
                // rules: [
                //   {
                //     // required: true,
                //     message: 'Required',
                //   },
                // ],
              },
            ]"
            placeholder="DD/MM/YYYY"
            :disabled-date="disableFutureDate"
            format="DD/MM/YYYY"
            style="width: 100%"
            size="large"
            :disabled="!isChecked || isReceive==='true'"
          >
          </a-date-picker>
          </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item class="selChange"
                label="Project *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
                
            >
                <!-- <a-select
                v-decorator="[
                    projectId,
                    
                ]"
                :show-search="true"
                :filter-option="filterOption"
                placeholder="Project"
                size="large"
                class="default-select"
                style="max-width: 100%"
                @click="cancelSelectProjectModel(true)"
                >
                <a-select-option v-for="project in projects" :key="project.id">
                  {{ project.description }}
                </a-select-option>
              </a-select> -->
              <a-input
              v-decorator="[
                'projectId',
                {
                    initialValue: projectId,
                    rules: [
                        {
                        required: projectRequired,
                        message: 'Please select your project',
                        },
                    ],
                    },
                
              ]"
              type="hidden"
              />
              <a-input        
                :value="selectedProject"
                placeholder="Project"
                size="large"
                style="max-width: 100%"
                @click="cancelSelectProjectModel(true)"
                />
                <span v-if="projectRequired" class="color-red">Please select your project</span>
            </a-form-item>
          </a-col> 
        </a-row>
        <a-row>
            <a-col :offset="18"><a-button type="link" class="md-10" @click="showModalProtocol(true)">Add Protocol</a-button></a-col>
        </a-row>
        
        <a-row>
            <a-col :span="12">
                <a-form-item class="selChange"
                label="Description *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'description',
                {
                    initialValue: entity.description,
                    rules: [
                    {
                        required: true,
                        message: 'Required Description',
                    },
                    ],
                },
                ]"
                placeholder="Description"
                style="width: 100%"
                size="large"
            >
            </a-input>
            </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item class="selChange"
                label="Protocol *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
                <a-select 
                v-decorator="[
                    'protocolId',
                    {
                    initialValue: entity.protocolId,
                    rules: [
                        {
                        required: true,
                        message: 'Please select your Protocol',
                        },
                    ],
                    },
                ]"
                :get-popup-container="trigger => trigger.parentNode"
                :show-search="true"
                :filter-option="filterOption"
                placeholder="Protocol"
                style="width: 100%"
                size="large"
                class="default-select"
                >
                <a-select-option v-for="protocol in protocols" :key="protocol.id">
                    {{ protocol.name }}
                </a-select-option>
                </a-select>
            </a-form-item></a-col> 
        </a-row>
        <a-row>
            <a-col :span="12">
                <a-form-item class="selChange"
                label="Purchase Order *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'purchaseOrder',
                {
                    initialValue: entity.purchaseOrder,
                    rules: [
                    {
                        required: true,
                        message: 'Required Purchase Order',
                    },
                    ],
                },
                ]"
                placeholder="N/A"
                style="width: 100%"
                size="large"
            >
            </a-input>
            </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item class="selChange"
                label="Package Level *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'pakageLevel',
                {
                    initialValue: entity.pakageLevel,
                    rules: [
                    {
                        required: true,
                        message: 'Required Package Level',
                    },
                    ],
                },
                ]"
                min="0"
                type="number"
                placeholder="Package Level"
                style="width: 100%"
                size="large"
            >
            </a-input>
            </a-form-item>
            </a-col> 
        </a-row>
        <a-row>
            <!-- <a-col :offset="6" :span="4"><a-button type="link" class="md-10" @click="showModalManufacturer(true)">Add Manufacturer</a-button></a-col> -->
            <a-col :offset="18" :span="4"><a-button type="link" class="md-10" @click="showModalType(true)">Add Type</a-button></a-col>
        </a-row>
        <a-row>
            <a-col :span="12">
                <a-form-item class="selChange"
                label="Manufacturer *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
                <!-- <a-select 
                v-decorator="[
                    'manufacturerId',
                    {
                    initialValue: entity.manufacturerId,
                    rules: [
                        {
                        required: true,
                        message: 'Please select Manufacturer',
                        },
                    ],
                    },
                ]"
                :get-popup-container="trigger => trigger.parentNode"
                :show-search="true"
                :filter-option="filterOption"
                placeholder="Manufacturer"
                style="width: 100%"
                size="large"
                class="default-select"
                >
                <a-select-option v-for="manufacturer in manufacturers" :key="manufacturer.id">
                    {{ manufacturer.name }}
                </a-select-option>
                </a-select> -->
                <a-input
              v-decorator="[
                'manufacturerId',
                {
                    initialValue: manufacturerId,
                    rules: [
                        {
                        required: manufacturerRequired,
                        message: 'Please select your manufacturer',
                        },
                    ],
                    },
                
              ]"
              type="hidden"
              />
              <a-input        
                :value="selectedManf"
                placeholder="Manufacturer"
                size="large"
                style="max-width: 100%"
                @click="cancelSelectManfModel(true)"
                />
                  
                
                <span v-if="manufacturerRequired" class="color-red">Please select your manufacturer</span>
            </a-form-item></a-col> 
            <a-col :span="12">
                <a-form-item class="selChange"
                label="Type *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
                <a-select 
                v-decorator="[
                    'typeId',
                    {
                    initialValue: entity.typeId,
                    rules: [
                        {
                        required: true,
                        message: 'Please select Type',
                        },
                    ],
                    },
                ]"
                :get-popup-container="trigger => trigger.parentNode"
                :show-search="true"
                :filter-option="filterOption"
                placeholder="Type"
                style="width: 100%"
                size="large"
                class="default-select"
                >
                <a-select-option v-for="typ in types" :key="typ.id">
                    {{ typ.name }}
                </a-select-option>
                </a-select>
            </a-form-item></a-col> 
        </a-row>
        <a-row>
            <a-col :offset="18"><a-button type="link" class="md-10" @click="showModalUnit(true)">Add Unit</a-button></a-col>
        </a-row>
        <a-row>
            <a-col :span="12">
                <a-form-item class="selChange"
                label="Quantity *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'quantity',
                {
                    initialValue: entity.quantity,
                    rules: [
                    {
                        required: true,
                        message: 'Required Quantity',
                    },
                    ],
                },
                ]"
                min="0" 
                type="number"
                placeholder="Quantity"
                style="width: 100%"
                size="large"
            >
            </a-input>
            </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item class="selChange"
                label="Unit of Measure *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
                <a-select
                v-decorator="[
                    'unitId',
                    {
                    initialValue: entity.unitId,
                    rules: [
                        {
                        required: true,
                        message: 'Please select your Unit',
                        },
                    ],
                    },
                ]"
                :get-popup-container="trigger => trigger.parentNode"
                :show-search="true"
                :filter-option="filterOption"
                placeholder="Unit"
                style="width: 100%"
                size="large"
                class="default-select"
                >
                <a-select-option v-for="unit in units" :key="unit.id">
                    {{ unit.name }}
                </a-select-option>
                </a-select>
            </a-form-item></a-col> 
        </a-row>
        <a-row>
            <a-col :offset="18"><a-button type="link" class="md-10" @click="showModalProductClass(true)">Add Product Class</a-button></a-col>
        </a-row>
        <a-row>
            <a-col :span="12">
                <a-form-item class="selChange"
                label="Stated Quantity *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'statedQuantity',
                {
                    initialValue: entity.statedQuantity,
                    rules: [
                    {
                        required: true,
                        message: 'Required Stated Quantity',
                    },
                    ],
                },
                ]"
                min="0" 
                type="number"
                placeholder="Stated Quantity"
                style="width: 100%"
                size="large"
            >
            </a-input>
            </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item class="selChange"
                label="Product Class *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
                <a-select 
                v-decorator="[
                    'productClassId',
                    {
                    initialValue: entity.productClassId,
                    rules: [
                        {
                        required: true,
                        message: 'Please select your Product Class',
                        },
                    ],
                    },
                ]"
                :get-popup-container="trigger => trigger.parentNode"
                :show-search="true"
                :filter-option="filterOption"
                placeholder="Product Class"
                style="width: 100%"
                size="large"
                class="default-select"
                >
                <a-select-option v-for="productClass in productClasses" :key="productClass.id">
                    {{ productClass.name }}
                </a-select-option>
                </a-select>
            </a-form-item></a-col> 
        </a-row>
        <a-row>
            <a-col :offset="18"><a-button type="link" class="md-10" @click="showModalTransportVassel(true)">Add Transport Vassel</a-button></a-col>
        </a-row>
        <a-row>
            <a-col :span="12">
                <a-form-item class="selChange"
                label="Total Quantity *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'totalQuantity',
                {
                    initialValue: entity.totalQuantity,
                    rules: [
                    {
                        required: true,
                        message: 'Required Stated Total Quantity',
                    },
                    ],
                },
                ]"
                min="0" 
                type="number"
                placeholder="Total Quantity"
                style="width: 100%"
                size="large"
            >
            </a-input>
            </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item class="selChange"
                label="Transport Vessel *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
                <a-select 
                v-decorator="[
                    'transportVesselId',
                    {
                    initialValue: entity.transportVesselId,
                    rules: [
                        {
                        required: true,
                        message: 'Please select your transport Vessel',
                        },
                    ],
                    },
                ]"
                :get-popup-container="trigger => trigger.parentNode"
                :show-search="true"
                :filter-option="filterOption"
                placeholder="Transport Vessel"
                style="width: 100%"
                size="large"
                class="default-select"
                >
                <a-select-option v-for="transportVessel in transportVessels" :key="transportVessel.id">
                    {{ transportVessel.name }}
                </a-select-option>
                </a-select>
            </a-form-item></a-col> 
        </a-row>
        <a-row>
            <a-col :offset="18"><a-button type="link" class="md-10" @click="showModalWorkStation(true)">Add Work Station</a-button></a-col>
        </a-row>
        <a-row>
            <a-col :span="12">
                <a-form-item class="selChange"
                label="Lot Number *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'lotNo',
                {
                    initialValue: entity.lotNo,
                    rules: [
                    {
                        required: true,
                        message: 'Required Stated Lot Number',
                    },
                    ],
                },
                ]"
                min="0" 
                type="number"
                placeholder="Lot No"
                style="width: 100%"
                size="large"
            >
            </a-input>
            </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item class="selChange"
                label="Work Station *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
                <a-select 
                v-decorator="[
                    'workStationId',
                    {
                    initialValue: entity.workStationId,
                    rules: [
                        {
                        required: true,
                        message: 'Please select your work station',
                        },
                    ],
                    },
                ]"
                :get-popup-container="trigger => trigger.parentNode"
                :show-search="true"
                :filter-option="filterOption"
                placeholder="Work Station"
                style="width: 100%"
                size="large"
                class="default-select"
                >
                <a-select-option v-for="workStation in workStations" :key="workStation.id">
                    {{ workStation.name }}
                </a-select-option>
                </a-select>
            </a-form-item></a-col> 
        </a-row>
        <a-row>
            <!-- <a-col :offset="18"><a-button type="link" class="md-10" @click="showModalClient(true)">Add Client</a-button></a-col> -->
        </a-row>
        <a-row>
            <a-col :span="12">
            <a-form-item class="selChange"
                label="Time To Receipt *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'timeReceipt',
                {
                    initialValue: entity.timeReceipt,
                    rules: [
                    {
                        required: true,
                        message: 'Required Stated TimeReceipt',
                    },
                    ],
                },
                ]"
                type="time"
                style="width: 100%"
                size="large"
            >
            </a-input>
            </a-form-item>
            
            </a-col>
            <a-col :span="12">
            <a-form-item class="selChange"
                label="Received From *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
                <a-select
                v-decorator="[
                    'organizationId',
                    {
                      initialValue: entity.organizationId,
                    rules: [
                        {
                        required: true,
                        message: 'Please select your courier',
                        },
                    ],
                    },
                ]"
                :get-popup-container="trigger => trigger.parentNode"
                :show-search="true"
                :filter-option="filterOption"
                placeholder="Institute"
                style="width: 100%"
                size="large"
                class="default-select"
                >
                <a-select-option v-for="org in organization" :key="org.id">
                    {{ org.name}}
                </a-select-option>
                </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- <a-row>
            <a-col :offset="18"><a-button type="link" class="md-10" @click="showModalLocation(true)">Add Location</a-button></a-col>
        </a-row> -->
        
        <a-row>
          <a-col :span="12">
                <a-form-item class="selChange"
                label="Donor *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
                <!-- <a-select 
                v-decorator="[
                    'patientId',
                    {
                    initialValue: entity.patientId,
                    rules: [
                        {
                        required: true,
                        message: 'Please select your patient',
                        },
                    ],
                    },
                ]"
                :get-popup-container="trigger => trigger.parentNode"
                :show-search="true"
                :filter-option="filterOption"
                placeholder="Patient"
                style="width: 100%"
                size="large"
                class="default-select"
                >
                <a-select-option v-for="patient in patients" :key="patient.id">
                  {{ patient.patientName }}
                </a-select-option>
                </a-select> -->
                <a-input 
                v-model="patientId"
                v-decorator="[
                  'patientId',
                  {
                    initialValue: patientId,
                    rules: [
                        {
                        required: patientRequired,
                        message: 'Please select your donor',
                        },
                    ],
                    },
                ]"
                type="hidden"
                />
                <a-input
                :value="selectedPatient"
                placeholder="Donor"
                size="large"
                style="max-width: 100%"
                :disabled="isReceive==='true'"
                @click="cancelSelectPatientModel(true)"
                />
                <span v-if="patientRequired" class="color-red">Please select donor</span>
            </a-form-item>
          </a-col>
            <a-col :span="12">
              <a-form-item class="selChange"
                label="Location *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
                <a-select 
                v-decorator="[
                    'locationId',
                    {
                    initialValue: entity.locationId,
                    rules: [
                        {
                        required: true,
                        message: 'Please select your location',
                        },
                    ],
                    },
                ]"
                :get-popup-container="trigger => trigger.parentNode"
                :show-search="true"
                :filter-option="filterOption"
                placeholder="Location"
                style="width: 100%"
                size="large"
                class="default-select"
                >
                <a-select-option v-for="location in getUniqueLocation(locations)" :key="location.id">
                    {{ location.name }}
                </a-select-option>
                </a-select>
            </a-form-item>
            </a-col>
        </a-row>
        <a-row>
          <!-- <a-col :offset="6" :span="4"><a-button type="link" class="md-10" @click="showModalResearcher(true)">Add Researcher</a-button></a-col> -->
          <!-- <a-col :offset="8" :span="4"><a-button type="link" class="md-10"  @click="onBookCourier(true)">Add Courier</a-button></a-col> -->
          </a-row>
          <a-row>
          <a-col :span="12">
                <a-form-item class="selChange"
                label="Researcher *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
                <!-- <a-select 
                v-decorator="[
                    'researcherId',
                    {
                    initialValue: entity.researcherId,
                    rules: [
                        {
                        required: true,
                        message: 'Please select your researcher',
                        },
                    ],
                    },
                ]"
                :get-popup-container="trigger => trigger.parentNode"
                :show-search="true"
                :filter-option="filterOption"
                placeholder="Researcher"
                style="width: 100%"
                size="large"
                class="default-select"
                >
                <a-select-option v-for="researcher in researchers" :key="researcher.id">
                    {{ researcher.name }}
                </a-select-option>
                </a-select> -->
                <a-input
              v-decorator="[
                'researcherId',
                {
                    initialValue: researcherId,
                    rules: [
                        {
                        required: researcherRequired,
                        message: 'Please select your researcher',
                        },
                    ],
                    },
                
              ]"
              type="hidden"
              />
              <a-input        
                :value="selectedResearcher"
                placeholder="Researcher"
                size="large"
                style="max-width: 100%"
                @click="cancelResearcherModel(true)"
                />
                  
                
                <span v-if="researcherRequired" class="color-red">Please select your researcher</span>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item class="selChange"
                label="Courier *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
                <a-select 
                v-decorator="[
                    'courierId',
                    {
                    initialValue: entity.courierId,
                    rules: [
                        {
                        required: '',
                        message: 'Please select your courier',
                        },
                    ],
                    },
                ]"
                :get-popup-container="trigger => trigger.parentNode"
                :show-search="true"
                :filter-option="filterOption"
                placeholder="Courier"
                style="width: 100%"
                size="large"
                class="default-select"
                :disabled="!isChecked"
                >
                <a-select-option v-for="courier in couriers" :key="courier.id">
                    {{ courier.name}}
                </a-select-option>
                </a-select>
            </a-form-item>
          </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
                <a-form-item class="selChange"
                label="Way Billing No *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
            <a-input
                v-decorator="[
                'wayBillingNo',
                {
                    initialValue: entity.wayBillingNo,
                    rules: [
                    {
                        required: true,
                        message: 'Required way billing no',
                    },
                    ],
                },
                ]"
                min="0" 
                type="number"
                placeholder="Way Billing No"
                style="width: 100%"
                size="large"
            >
            </a-input>
            </a-form-item>
            </a-col>
            <a-col :span="12"></a-col>
            <a-col :span="12">
                <a-form-item class="selChange"
                label="Invoice No *:"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 12 }"
            >
            <a-input 
                v-decorator="[
                'invoiceNo',
                {
                    initialValue: entity.invoiceNo,
                    rules: [
                    {
                        required: true,
                        message: 'Required Package Level',
                    },
                    ],
                },
                ]"
                min="0" 
                type="number"
                placeholder="Invoice No"
                :disabled="isReceive==='true'"
                style="width: 100%"
                size="large"
            >
            </a-input>
            </a-form-item>
            </a-col> 
        </a-row>
        <a-row>
                <a-col :span="9">
                <p>Is there an advance notification for sample?</p>
                </a-col>
                <a-col :span="3">
                <a-form-item>
                        <a-switch
                            v-decorator="[
                            'isNotificationAdvanced',
                            {
                              initialValue: entity.isNotificationAdvanced,
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
            <a-col :span="9">
                    <p>Confirm data captured is accurate?</p>
                    </a-col>
                    <a-col :span="3">
                    <a-form-item>
                            <a-switch
                                v-decorator="[
                                'isDataCaptured',
                                {
                                  initialValue: entity.isDataCaptured,
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
      </div>
      <div>
<!-- Start Select Project Model -->
        <a-modal 
        :visible="visibleSelectProjectModel"
        title="Select Project"
        :dialog-style="{ top: '20px' }"
        @cancel="cancelSelectProjectModel(false)"
        >
        <a-table 
        :columns="columnsProject"
        :data-source="projects"
        :row-key="(record)=> record.id"
        class="rounded-table"
        :width="750"
        :loading="loading"
        :show-header="false"
        :custom-row="getProjectId"
        :pagination="{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15', '20', '30'],
          }"
        >
        <template slot="partners" slot-scope="partners">
          <span v-for="partner in partners.partners" :key="partner.partnerId">{{ partner.partnerName }}</span>
        </template>
        <template slot="investigators" slot-scope="investigators">
          <span v-for="investigator in investigators.investigators" :key="investigator.investigatorId">{{ investigator.investigatorName }}</span>
        </template>
        </a-table>
          <!-- <a-radio-group v-model="value" v-for="project in projects" :key="project.id">
            <a-radio :style="radioStyle" :value="project.id">{{ project.description }}</a-radio>  
                </a-radio-group> -->
        </a-modal>
<!-- End Select Project Model -->
<!-- Start Manf Select Modal -->
<a-modal 
        :visible="visibleSelectManfModel"
        title="Select Manufacturer"
        :dialog-style="{ top: '20px' }"
        @cancel="cancelSelectManfModel(false)"
        >
        <a-table 
        :columns="columnsManufacturer"
        :data-source="manufacturers"
        :row-key="(record)=> record.id"
        class="rounded-table"
        :width="750"
        :loading="loading"
        :show-header="false"
        :custom-row="getManfId"
        :pagination="{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15', '20', '30'],
          }"
        >
        <!-- <template slot="partners" slot-scope="partners">
          <span v-for="partner in partners.partners" :key="partner.partnerId">{{ partner.partnerName }}</span>
        </template>
        <template slot="investigators" slot-scope="investigators">
          <span v-for="investigator in investigators.investigators" :key="investigator.investigatorId">{{ investigator.investigatorName }}</span>
        </template> -->
        </a-table>
          <!-- <a-radio-group v-model="value" v-for="project in projects" :key="project.id">
            <a-radio :style="radioStyle" :value="project.id">{{ project.description }}</a-radio>  
                </a-radio-group> -->
        </a-modal>
<!-- End Manf Select Modal -->
<!-- Start Researcher Select Modal -->
<a-modal 
        :visible="visibleResearcherModel"
        title="Select Researcher"
        :dialog-style="{ top: '20px' }"
        @cancel="cancelResearcherModel(false)"
        >
        <a-table 
        :columns="columnsResearcher"
        :data-source="researchers"
        :row-key="(record)=> record.id"
        class="rounded-table"
        :width="750"
        :loading="loading"
        :show-header="false"
        :custom-row="getResearcherId"
        :pagination="{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15', '20', '30'],
          }"
        >
        </a-table>
        </a-modal>
<!-- End Researcher Select Modal -->
<!-- Start Select Project Model -->
        <!-- <a-modal 
        :visible="visibleSelectProjectModel"
        title="Select Project"
        :dialog-style="{ top: '20px' }"
        @cancel="cancelSelectProjectModel(false)"
        >
        <a-table 
        :columns="columnsProject"
        :data-source="projects"
        :row-key="(record)=> record.id"
        class="rounded-table"
        :width="750"
        :loading="loading"
        :show-header="false"
        :custom-row="getProjectId"
        :pagination="{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15', '20', '30'],
          }"
        >
        <template slot="partners" slot-scope="partners">
          <span v-for="partner in partners.partners" :key="partner.partnerId">{{ partner.partnerName }}</span>
        </template>
        <template slot="investigators" slot-scope="investigators">
          <span v-for="investigator in investigators.investigators" :key="investigator.investigatorId">{{ investigator.investigatorName }}</span>
        </template>
        </a-table>
          
        </a-modal> -->
<!-- End Select Project Model -->

<!-- Patient Select Model Start -->
<a-modal 
        :visible="visibleSelectPatientModel"
        title="Select Donor"
        :dialog-style="{ top: '20px' }"
        @cancel="cancelSelectPatientModel(false)"
        >
        <a-table 
        :columns="columnsPatient"
        :data-source="patients"
        :row-key="(record)=> record.id"
        class="rounded-table"
        :width="750"
        :loading="loading"
        :show-header="false"
        :custom-row="getPatientId"
        :pagination="{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15', '20', '30'],
          }"
        >
        <template slot="isDonor" >
          <span >Donor</span>
        </template>
        <template slot="consentStatus" slot-scope="consentStatus">
          <center><div class="consent-btn" :style="{'background-color' : consentStatus.color}">
            {{ consentStatus.consentStatus }}
          </div></center>
        </template>
        </a-table>
          <!-- <a-radio-group v-model="value" v-for="project in projects" :key="project.id">
            <a-radio :style="radioStyle" :value="project.id">{{ project.description }}</a-radio>  
                </a-radio-group> -->
        </a-modal>
<!-- Patient Select Model End -->
<!--Start Castodian Modal-->
    <a-modal
      
      :footer="null"
      :width="750"
      title="Add Custodian"
      :destroy-on-close="true"
      :visible="visibleCastodian"
      :dialog-style="{ top: '20px' }"
      :loading="loading"
      @cancel="showModalCastodian(false)"
      @ok="showModalCastodian(false)"
    >
      <a-form :form="formCastodian" class="support-add-modal" @submit.prevent="onSubmitCastodian">
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item>
          <a-input v-decorator="[
                'id',
                {
                  initialValue: entityCustodian.id,
                },
              ]" type="hidden" />
        </a-form-item>
            <a-form-item
            label="Castodian Name *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'name',
                {
                  initialValue: entityCustodian.name,
                  rules: [
                    {
                      required: true,
                      message: 'Please input custodian name',
                    },
                  ],
                },
              ]"
              placeholder="Custodian Name"
            /> 
            </a-form-item
        ></a-col>
        
          
        </a-row>
       

        <a-row class="">
          <a-col class="text-right">
            <FormActionButton :is-created="isCreated" :loading="custBtnLoading" />
          </a-col>
        </a-row>
      </a-form>
      
      <!-- <div>
        <a-table
          :columns="columnsCastodian"
          :data-source="datasourceCastodian"
          :loading="custTblloading"
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
                {{ translation['Admin_1_142'] }} <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  
                  <a @click="getCustodianById(action.id)">{{
                    translation.Edit_1_450
                  }}</a>
                </a-menu-item>
                <a-menu-item key="2">
                  <a-popconfirm
                    :title="translation.Areyou_4_484"
                    :ok-text="translation.yes_1_654"
                    :cancel-text="translation.no_1_656"
                    placement="topLeft"
                    @confirm="deleteUser(`${action.globalId}`)"
                  >
                  </a-popconfirm> 
                  <span @click="deleteCustodian(action.id)">{{ translation.Delet_1_451 }}</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        
      </div> -->
    </a-modal>
<!--End Castodian Modal-->
<!-- Start Custodian Selection Modal -->
<a-modal 
        :visible="visibleSelectCustodianModel"
        title="Select Custodian"
        @cancel="cancelSelectCustodianModel(false)"
        >
       
        <a-table 
        :columns="columnsCustodian"
        :data-source="custodians"
        :row-key="(record)=> record.id"
        class="rounded-table"
        :width="750"
        :loading="loading"
        :show-header="false"
        :custom-row="getCustodianId"
        :pagination="{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15', '20', '30'],
          }"
        >
        </a-table>
          <!-- <a-radio-group v-model="value" v-for="project in projects" :key="project.id">
            <a-radio :style="radioStyle" :value="project.id">{{ project.description }}</a-radio>  
                </a-radio-group> -->
        </a-modal>
<!-- End Custodian Selection Modal -->
<!--Start Project Modal-->
<a-modal
      
      :footer="null"
      :width="750"
      title="Add Project"
      :destroy-on-close="true"
      :visible="visibleProject"
      :dialog-style="{ top: '20px' }"
      :loading="loading"
      @cancel="showModalProject(false)"
      @ok="showModalProject(false)"
    >
      <a-form :form="formProject" class="support-add-modal" @submit.prevent="onSubmitProject">
        <a-row :gutter="20">
          <a-col :span="12">
          <a-form-item
            label="Project Name *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'name',
                {
                  initialValue: entityProject.name,
                  rules: [
                    {
                      required: true,
                      message: 'Please input Project name',
                    },
                    {
                      message: 'Please enter a valid Project'
                    }
                  ],
                },
              ]"
              placeholder="Project Name"
            /> 
            </a-form-item
        ></a-col>
        
          
        </a-row>
       

        <a-row class="">
          <a-col class="text-right">
            <FormActionButton :is-created="isCreated" :loading="loading" />
          </a-col>
        </a-row>
      </a-form>
      
      
      <div >
        <a-table
          :columns="columnsProject"
          :data-source="datasourceProject"
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
                {{ translation['Admin_1_142'] }} <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a @click="goto(`/users/${action.globalId}`)">{{
                    translation.Edit_1_450
                  }}</a>
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
                  <span>{{ translation.Delet_1_451 }}</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        
      </div>
    </a-modal>
<!--End Project Modal-->
<ErrorModal :message="message" :isShow="visibleConfirm" @close-modal="visibleConfirm = false"></ErrorModal>
<!--Start Protocol Modal-->
<a-modal
      :footer="null"
      :width="750"
      title="Add Protocol"
      :destroy-on-close="true"
      :visible="visibleProtocol"
      :dialog-style="{ top: '20px' }"
      :loading="loading"
      @cancel="showModalProtocol(false)"
      @ok="showModalProtocol(false)"
    >
      <a-form :form="formProtocol" class="support-add-modal" @submit.prevent="onSubmitProtocol">
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item>
          <a-input  v-decorator="[
                'id',
                {
                  initialValue: entityProtocol.id,
                },
              ]" type="hidden" />
        </a-form-item>
          <a-form-item
            label="Protocol Name *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'name',
                {
                  initialValue: entityProtocol.name,
                  rules: [
                    {
                      required: true,
                      message: 'Please input protocol name',
                    },
                    {
                      message: 'Please enter a valid protocol'
                    }
                  ],
                },
              ]"
              placeholder="Protocol Name"
            /> 
            </a-form-item
        ></a-col>
        
          
        </a-row>
       

        <a-row class="">
          <a-col class="text-right">
            <FormActionButton :is-created="isCreated" :loading="loading" />
          </a-col>
        </a-row>
      </a-form>
      
      
      <div >
        <a-table
          :columns="columnsProtocol"
          :data-source="datasourceProtocol"
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
                {{ translation['Admin_1_142'] }} <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a @click="getProtocolById(action.id)">{{
                    translation.Edit_1_450
                  }}</a>
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
                  <span @click="deleteProtocol(action.id)">{{ translation.Delet_1_451 }}</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        
      </div>
    </a-modal>
<!--End Protocol Modal-->

<!--Start Manufacturer Modal-->
<a-modal
      
      :footer="null"
      :width="750"
      title="Add Manufacturer"
      :destroy-on-close="true"
      :visible="visibleManufacturer"
      :dialog-style="{ top: '20px' }"
      :loading="loading"
      @cancel="showModalManufacturer(false)"
      @ok="showModalManufacturer(false)"
    >
      <a-form :form="formManufacturer" class="support-add-modal" @submit.prevent="onSubmitManufacturer">
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item>
          <a-input  v-decorator="[
                'id',
                {
                  initialValue: entityManufacturer.id,
                },
              ]" type="hidden" />
        </a-form-item>
          <a-form-item
            label="Investigator Name *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'name',
                {
                  initialValue: entityManufacturer.name,
                  rules: [
                    {
                      required: true,
                      message: 'Please input Manufacturer name',
                    },
                    {
                      message: 'Please enter a valid manufacturer'
                    }
                  ],
                },
              ]"
              placeholder="Manufacturer Name"
            /> 
            </a-form-item
        ></a-col>
        
          
        </a-row>
       

        <a-row class="">
          <a-col class="text-right">
            <FormActionButton :is-created="isCreated" :loading="loading" />
          </a-col>
        </a-row>
      </a-form>
      
      
      <div >
        <a-table
          :columns="columnsManufacturer"
          :data-source="datasourceManufacturer"
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
                {{ translation['Admin_1_142'] }} <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a @click="getManufacturerById(action.id)">{{
                    translation.Edit_1_450
                  }}</a>
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
                  <span @click = "deleteManufacturer(action.id)">{{ translation.Delet_1_451 }}</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        
      </div>
    </a-modal>
<!--End MAnufacturer Modal-->

<!--Start Type Modal-->
<a-modal
      
      :footer="null"
      :width="750"
      title="Add Type"
      :destroy-on-close="true"
      :visible="visibleType"
      :dialog-style="{ top: '20px' }"
      :loading="loading"
      @cancel="showModalType(false)"
      @ok="showModalManuType(false)"
    >
      <a-form :form="formType" class="support-add-modal" @submit.prevent="onSubmitType">
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item>
          <a-input  v-decorator="[
                'id',
                {
                  initialValue: entityType.id,
                },
              ]" type="hidden" />
        </a-form-item>
          <a-form-item
            label="Type Name *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'name',
                {
                  initialValue: entityType.name,
                  rules: [
                    {
                      required: true,
                      message: 'Please input type name',
                    },
                    {
                      message: 'Please enter a valid description'
                    }
                  ],
                },
              ]"
              placeholder="Type Name"
            /> 
            </a-form-item
        ></a-col>
        
          
        </a-row>
       

        <a-row class="">
          <a-col class="text-right">
            <FormActionButton :is-created="isCreated" :loading="loading" />
          </a-col>
        </a-row>
      </a-form>
      
      
      <div >
        <a-table
          :columns="columnsType"
          :data-source="datasourceType"
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
                {{ translation['Admin_1_142'] }} <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a @click="getTypeById(action.id)">{{
                    translation.Edit_1_450
                  }}</a>
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
                  <span @click="deleteType(action.id)">{{ translation.Delet_1_451 }}</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        
      </div>
    </a-modal>
<!--End Type Modal-->

<!--Start Unit Modal-->
<a-modal
      
      :footer="null"
      :width="750"
      title="Add Unit"
      :destroy-on-close="true"
      :visible="visibleUnit"
      :dialog-style="{ top: '20px' }"
      :loading="loading"
      @cancel="showModalUnit(false)"
      @ok="showModalManuUnit(false)"
    >
      <a-form :form="formUnit" class="support-add-modal" @submit.prevent="onSubmitUnit">
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item>
          <a-input  v-decorator="[
                'id',
                {
                  initialValue: entityUnit.id,
                },
              ]" type="hidden" />
        </a-form-item>
          <a-form-item
            label="Unit Name *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'name',
                {
                  initialValue: entityUnit.name,
                  rules: [
                    {
                      required: true,
                      message: 'Please input unit name',
                    },
                    {
                      message: 'Please enter a valid unit'
                    }
                  ],
                },
              ]"
              placeholder="Unit Name"
            /> 
            </a-form-item
        ></a-col>
        
          
        </a-row>
       

        <a-row class="">
          <a-col class="text-right">
            <FormActionButton :is-created="isCreated" :loading="loading" />
          </a-col>
        </a-row>
      </a-form>
      
      
      <div >
        <a-table
          :columns="columnsUnit"
          :data-source="datasourceUnit"
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
                {{ translation['Admin_1_142'] }} <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a @click="getUnitById(action.id)">{{
                    translation.Edit_1_450
                  }}</a>
                </a-menu-item>
                <a-menu-item key="2">
                  <span @click="deleteUnit(action.id)">{{ translation.Delet_1_451 }}</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        
      </div>
    </a-modal>
<!--End Unit Modal-->

<!--Start ProductClass Modal-->
<a-modal
      
      :footer="null"
      :width="750"
      title="Add Product Class"
      :destroy-on-close="true"
      :visible="visibleProductClass"
      :dialog-style="{ top: '20px' }"
      :loading="loading"
      @cancel="showModalProductClass(false)"
      @ok="showModalManuProductClass(false)"
    >
      <a-form :form="formProductClass" class="support-add-modal" @submit.prevent="onSubmitProductClass">
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item>
          <a-input  v-decorator="[
                'id',
                {
                  initialValue: entityProductClass.id,
                },
              ]" type="hidden" />
        </a-form-item>
          <a-form-item
            label="Product Class Name *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'name',
                {
                  initialValue: entityProductClass.name,
                  rules: [
                    {
                      required: true,
                      message: 'Please input product class name',
                    },
                  ],
                },
              ]"
              placeholder="Product Class Name"
            /> 
            </a-form-item
        ></a-col>
        
          
        </a-row>
       

        <a-row class="">
          <a-col class="text-right">
            <FormActionButton :is-created="isCreated" :loading="loading" />
          </a-col>
        </a-row>
      </a-form>
      
      
      <div >
        <a-table
          :columns="columnsProductClass"
          :data-source="datasourceProductClass"
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
                {{ translation['Admin_1_142'] }} <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a @click="getProductClassById(action.id)">{{
                    translation.Edit_1_450
                  }}</a>
                </a-menu-item>
                <a-menu-item key="2">
                  <span @click="deleteProductClass(action.id)">{{ translation.Delet_1_451 }}</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        
      </div>
    </a-modal>
<!--End ProductClass Modal-->

<!--Start TransportVassel Modal-->
<a-modal
      
      :footer="null"
      :width="750"
      title="Add Transport Vessel"
      :destroy-on-close="true"
      :visible="visibleTransportVassel"
      :dialog-style="{ top: '20px' }"
      :loading="loading"
      @cancel="showModalTransportVassel(false)"
      @ok="showModalTransportVassel(false)"
    >
      <a-form :form="formTransportVassel" class="support-add-modal" @submit.prevent="onSubmitTransportVassel">
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item>
          <a-input  v-decorator="[
                'id',
                {
                  initialValue: entityTransportVassel.id,
                },
              ]" type="hidden" />
        </a-form-item>
          <a-form-item
            label="Transport Vessel Name *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'name',
                {
                  initialValue: entityTransportVassel.name,
                  rules: [
                    {
                      required: true,
                      message: 'Please Input Transport Vessel Name',
                    },
                  ],
                },
              ]"
              placeholder="Transport Vessel Name"
            /> 
            </a-form-item
        ></a-col>
        
          
        </a-row>
       

        <a-row class="">
          <a-col class="text-right">
            <FormActionButton :is-created="isCreated" :loading="loading" />
          </a-col>
        </a-row>
      </a-form>
      
      
      <div >
        <a-table
          :columns="columnsTransportVassel"
          :data-source="datasourceTransportVassel"
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
                {{ translation['Admin_1_142'] }} <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a @click="getTransportVesselById(action.id)">{{
                    translation.Edit_1_450
                  }}</a>
                </a-menu-item>
                <a-menu-item key="2">
                  <span @click="deleteTransportVessel(action.id)">{{ translation.Delet_1_451 }}</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        
      </div>
    </a-modal>
<!--End ProductClass Modal-->

<!--Start WorkStation Modal-->
<a-modal
      
      :footer="null"
      :width="750"
      title="Add Work Station"
      :destroy-on-close="true"
      :visible="visibleWorkStation"
      :dialog-style="{ top: '20px' }"
      :loading="loading"
      @cancel="showModalWorkStation(false)"
      @ok="showModalWorkStation(false)"
    >
      <a-form :form="formWorkStation" class="support-add-modal" @submit.prevent="onSubmitWorkStation">
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item>
          <a-input  v-decorator="[
                'id',
                {
                  initialValue: entityWorkStation.id,
                },
              ]" type="hidden" />
        </a-form-item>
          <a-form-item
            label="Work Station Name *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'name',
                {
                  initialValue: entityWorkStation.name,
                  rules: [
                    {
                      required: true,
                      message: 'Please input Work Station Name',
                    },
                    {
                      message: 'Please enter a valid Work Station Name'
                    }
                  ],
                },
              ]"
              placeholder="Work Station Name"
            /> 
            </a-form-item
        ></a-col>
        
          
        </a-row>
       

        <a-row class="">
          <a-col class="text-right">
            <FormActionButton :is-created="isCreated" :loading="loading" />
          </a-col>
        </a-row>
      </a-form>
      
      
      <div >
        <a-table
          :columns="columnsWorkStation"
          :data-source="datasourceWorkStation"
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
                {{ translation['Admin_1_142'] }} <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a @click="getWorkStationById(action.id)">{{
                    translation.Edit_1_450
                  }}</a>
                </a-menu-item>
                <a-menu-item key="2">
                  <span @click="deleteWorkStation(action.id)">{{ translation.Delet_1_451 }}</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        
      </div>
    </a-modal>
<!--End WorkStation Modal-->
  </div>
<!-- Start Client Model -->
<a-modal
      
      :footer="null"
      :width="750"
      title="Add Client"
      :destroy-on-close="true"
      :visible="visibleClient"
      :dialog-style="{ top: '20px' }"
      :loading="loading"
      @cancel="showModalClient(false)"
      @ok="showModalManuClient(false)"
    >
      <a-form :form="formClient" class="support-add-modal" @submit.prevent="onSubmitClient">
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item>
          <a-input v-decorator="[
                'id',
                {
                  initialValue: entityClient.id,
                },
              ]" type="hidden"  />
        </a-form-item>
          <a-form-item
            label="Client Name *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'name',
                {
                  initialValue: entityClient.name,
                  rules: [
                    {
                      required: true,
                      message: 'Please input client name',
                    },
                    {
                      message: 'Please enter a valid client'
                    }
                  ],
                },
              ]"
              placeholder="Client Name"
            /> 
            </a-form-item
        ></a-col>
        
          
        </a-row>
       

        <a-row class="">
          <a-col class="text-right">
            <FormActionButton :is-created="isCreated" :loading="loading" />
          </a-col>
        </a-row>
      </a-form>
      
      
      <div >
        <a-table
          :columns="columnsClient"
          :data-source="datasourceClient"
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
                {{ translation['Admin_1_142'] }} <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a @click="getClientById(action.id)">{{
                    translation.Edit_1_450
                  }}</a>
                </a-menu-item>
                <a-menu-item key="2">
                  <span @click="deleteClient(action.id)">{{ translation.Delet_1_451 }}</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        
      </div>
    </a-modal>
<!-- End Client Modal -->
<!-- Start Location Model -->
<a-modal
      
      :footer="null"
      :width="750"
      title="Add Location"
      :destroy-on-close="true"
      :visible="visibleLocation"
      :dialog-style="{ top: '20px' }"
      :loading="loading"
      @cancel="showModalLocation(false)"
      @ok="showModalManuLocation(false)"
    >
      <a-form :form="formLocation" class="support-add-modal" @submit.prevent="onSubmitLocation">
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item>
          <a-input  v-decorator="[
                'id',
                {
                  initialValue: entityLocation.id,
                },
              ]" type="hidden" />
        </a-form-item>
          <a-form-item
            label="Location Name *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'name',
                {
                  initialValue: entityLocation.name,
                  rules: [
                    {
                      required: true,
                      message: 'Please input location name',
                    },
                    {
                      message: 'Please enter a valid location'
                    }
                  ],
                },
              ]"
              placeholder="Location Name"
            /> 
            </a-form-item
        ></a-col>
        
          
        </a-row>
       

        <a-row class="">
          <a-col class="text-right">
            <FormActionButton :is-created="isCreated" :loading="loading" />
          </a-col>
        </a-row>
      </a-form>
      
      
      <div >
        <a-table
          :columns="columnsLocation"
          :data-source="datasourceLocation"
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
                {{ translation['Admin_1_142'] }} <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a @click="getLocationById(action.id)">{{
                    translation.Edit_1_450
                  }}</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        
      </div>
    </a-modal>
<!-- End Location Modal -->
<!-- Start Researcher Model -->
<a-modal
      
      :footer="null"
      :width="750"
      title="Add Researcher"
      :destroy-on-close="true"
      :visible="visibleResearcher"
      :dialog-style="{ top: '20px' }"
      :loading="loading"
      @cancel="showModalResearcher(false)"
      @ok="showModalManuResearcher(false)"
    >
      <a-form :form="formLocation" class="support-add-modal" @submit.prevent="onSubmitResearcher">
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item>
          <a-input  v-decorator="[
                'id',
                {
                  initialValue: entityResearcher.id,
                },
              ]" type="hidden" />
        </a-form-item>
          <a-form-item
            label="Researcher Name *:"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 22 }"
          >
            <a-input
              v-decorator="[
                'name',
                {
                  initialValue: entityResearcher.name,
                  rules: [
                    {
                      required: true,
                      message: 'Please input researcher name',
                    },
                    {
                      message: 'Please enter a valid researcher'
                    }
                  ],
                },
              ]"
              placeholder="Researcher Name"
            /> 
            </a-form-item
        ></a-col>
        
          
        </a-row>
       

        <a-row class="">
          <a-col class="text-right">
            <FormActionButton :is-created="isCreated" :loading="loading" />
          </a-col>
        </a-row>
      </a-form>
      
      
      <div >
        <a-table
          :columns="columnsResearcher"
          :data-source="datasourceResearcher"
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
                {{ translation['Admin_1_142'] }} <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a @click="getResearcherById(action.id)">{{
                    translation.Edit_1_450
                  }}</a>
                </a-menu-item>
                <a-menu-item key="2">
                  <span @click="deleteResearcher(action.id)">{{ translation.Delet_1_451 }}</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        
      </div>
    </a-modal>
<!-- End Researcher Modal -->
<!-- Start Courier Modal -->
<a-modal
      :footer="null"
      :width="600"
      title="Enter Courier Detail"
      :destroy-on-close="true"
      :visible="visibleCourier"
      :loading="loading"
      @cancel="onBookCourier(false)"
      @ok="onBookCourier(false)"
    >
      <a-form :form="formCourier" class="support-add-modal" @submit.prevent="onSubmitCourier">
        <div class="bg-grey pl-10">
        <a-row :gutter="20" >
          
        <a-col :span="24" >
          <a-form-item>
          <a-input  v-decorator="[
                'courierId',
                {
                  initialValue: entityCourier.courierId,
                },
              ]" type="hidden" />
        </a-form-item>
          <a-form-item class="selChange pt-10"
            label="Name"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-input
              v-decorator="[
                'courierName',
                {
                  initialValue: entityCourier.courierName,
                  rules: [
                    {
                      required: true,
                      message: 'Please input Name',
                    },
                    {
                      message: 'Please enter a valid Name'
                    }
                  ],
                },
              ]"
              style="width: 100%"
            size="large"
            placeholder="Name"
            />
          </a-form-item>

        </a-col>
        </a-row>
        <a-row>
        <a-col :span="24" >
          <a-form-item class="selChange"
            label="Email"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-input
              v-decorator="[
                'courierEmail',
                {
                  initialValue: entityCourier.courierEmail,
                  rules: [
                    {
                      required: true,
                      message: 'Please input Email',
                    },
                    {
                      message: 'Please enter a valid Email'
                    }
                  ],
                },
              ]"
              placeholder="example@exapmle.com"
            />
          </a-form-item>
        </a-col>
          
        </a-row>
          <a-row :gutter="20">
          
          <a-col :span="24">
            <a-form-item class="selChange"
              label="Phone Number"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 12 }"
            >
              <a-input
                v-decorator="[
                  'phoneNo',
                  {
                    initialValue: entityCourier.phoneNo,
                    rules: [
                      {
                        required: true,
                        message: 'Please input Name',
                      },
                      {
                        message: 'Please enter a valid Name'
                      }
                    ],
                  },
                ]"
                placeholder="+44000000000000"
              />
            </a-form-item>
  
          </a-col>
          </a-row>
        </div>
        <a-row >
          <a-col :span="2" :offset="20" class="mg-t-20" >
            <FormActionButton  custom-text="Submit" :is-created="isCreated" :loading="loading" />
          </a-col>
        </a-row>
        <div>
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
              <a-button class="action-button">
                {{ translation['Admin_1_142'] }} <a-icon type="down" />
              </a-button>
              <a-menu slot="overlay">
                <a-menu-item key="1">
                  <a @click="getCourierById(action.courierId)">{{
                    translation.Edit_1_450
                  }}</a>
                </a-menu-item>
                <a-menu-item key="2">
                  <span @click="deleteCourier(action.courierId)">{{ translation.Delet_1_451 }}</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
        </a-table>
        
      </div>
      </a-form>
    </a-modal>
<!-- End Courier Modal -->

    </div>
  </template>
  
  <script>
  import UserServices from '~/services/API/UserServices'
  import { _disabledFutureDate, _disabledPreviousDate } from '~/services/Helpers/MomentHelpers'
  import { filterOption,isEmpty, preventDefault } from '~/services/Helpers'
  import PartnerServices from '~/services/API/PartnerServices'
  import InvestigatorServices from '~/services/API/InvestigatorServices'
  import RoleServices from '~/services/API/RoleServices'
  import nullHelper from '~/mixins/null-helpers'
  import OrganizationTypeServices from '~/services/API/OrganizationTypeServices'
  import OrganizationServices from '~/services/API/OrganizationServices'
  import CustodianServices from '~/services/API/CustodianServices'
  import ProjectServices from '~/services/API/ProjectServices'
  import ProtocolServices from '~/services/API/ProtocolServices'
  import ManufacturerServices from '~/services/API/ManufacturerServices'
  import TypeServices from '~/services/API/TypeServices'
  import UnitServices from '~/services/API/UnitServices'
  import ProductClassServices from '~/services/API/ProductClassServices'
  import TransportVesselServices from '~/services/API/TransportVesselServices'
  import WorkStationServices from '~/services/API/WorkStationServices'
  import ClientServices from '~/services/API/ClientServices'
  import PatientServices from '~/services/API/PatientServices'
  import SiteServices from '~/services/API/SiteServices'
  import ResearcherServices from '~/services/API/ResearcherServices'
  import notifications from '~/mixins/notifications'
  import CourierServices from '~/services/API/CourierServices'
  import FridgeTypeServices from '~/services/API/FridgeTypeServices'
  import ErrorModal from '~/components/common/ErrorModal.vue'

  export default {
    components: { ErrorModal },
    mixins: [nullHelper,notifications],
    props: {
      ticket: { 
        type: Object,
         default: () => ({}) 
        },
        partnerevent: { 
        type: Object,
         default: () => ({}) 
        },
      entityProject: {
        type: Object,
        default: () => ({}),
      },
      entity: {
        type: Object,
        default: () => ({}),
      },
      projectRequired:{type: Boolean, default: false},
      patientRequired:{type: Boolean, default: false},
      custodianRequired:{type: Boolean, default: false},
      manufacturerRequired: {type: Boolean, default: false},
      researcherRequired:{type: Boolean, default: false},
      form: {
        type: Object,
        default: () => ({}),
      }
    },
    data() {
      
      return {
        isCreated: false,
        visibleSelectPatientModel: false,
        datasourceCastodian: [],
        custTblloading: false,
        projectId: 0,
        visibleSelectProjectModel: false,
        visibleConfirm: false,
        message: '',
        columnsCustodian: [
          {
            title: 'Custodian Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'UserName',
            dataIndex: 'userName',
            key: 'userName',
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        isChecked:false,
        datasourceProject: [],
        columnsProject: [
          {
            title: 'Project Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Partners',
            key: 'partners',
            scopedSlots: {customRender: 'partners'},
          },
          {
            title: 'Investigators',
            key: 'investigators',
            scopedSlots: {customRender: 'investigators'},
          },
        ],
        columnsProjectLis: [
          {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
          },
          
        ],
        columnsPatient : [
        {
            title: 'Patient PUID',
            key: 'puid',
            dataIndex: 'puid',
          },  
        {
            title: 'Patient Name',
            key: 'patientName',
            dataIndex: 'patientName'
          },
          {
            title: 'IsDonor',
            key: 'isDonor',
            scopedSlots:{customRender:'isDonor'}
          },
          {
            title: 'Consent Status',
            key: 'consentStatus',
            scopedSlots: {customRender: 'consentStatus'},
          },
          
        ],
        datasourceProtocol: [],
        columnsProtocol: [
          {
            title: 'Protocol Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        datasourceClient: [],
        columnsClient: [
          {
            title: 'Client Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        datasourceManufacturer: [],
        columnsManufacturer: [
          {
            title: 'Manufacturer Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'UserName',
            dataIndex: 'userName',
            key: 'userName'
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        datasourceLocation: [],
        columnsLocation: [
          {
            title: 'Location Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        datasourceType: [],
        columnsType: [
          {
            title: 'Type Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        datasourceUnit: [],
        columnsUnit: [
          {
            title: 'Unit Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        datasourceProductClass: [],
        columnsProductClass: [
          {
            title: 'ProductClass Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        datasourceTransportVassel: [],
        columnsTransportVassel: [
          {
            title: 'TransportVassel Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        datasourceWorkStation: [],
        columnsWorkStation: [
          {
            title: 'WorkStation Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        datasourceResearcher:[],
        columnsResearcher:[
        {
            title: 'Researcher Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'UserName',
            dataIndex: 'userName',
            key: 'userName'
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        datasourceCourier:[],
        columnsCourier:[
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
            title: 'Contact No',
            dataIndex: 'phoneNo',
            key: 'phoneNo',
          },
          {
            title: `${this.$store.getters.getTranslation.Actio_1_220}`,
            key: 'action',
            scopedSlots: { customRender: 'action' },
          },
        ],
        entityCourier:{
          type: Object,
          default: () => ({}),
        },
        entityCustodian: {
          type: Object,
          default: () => ({}),
        },
        entityProtocol: {
        type: Object,
        default: () => ({}),
      },
      entityManufacturer: {
        type: Object,
        default: () => ({}),
      },
      entityType: {
        type: Object,
        default: () => ({}),
      },
      entityUnit: {
        type: Object,
        default: () => ({}),
      },
      entityProductClass: {
        type: Object,
        default: () => ({}),
      },
      entityTransportVassel: {
        type: Object,
        default: () => ({}),
      },
      entityWorkStation: {
        type: Object,
        default: () => ({}),
      },
      entityClient:{
        type: Object,
        default: () => ({}),
      },
      entityLocation:{
        type: Object,
        default:()=>({}),
      },
      entityResearcher:{
        type: Object,
        default:()=>({}),
      },
        projectTxtDisabled:false,
        custBtnLoading: false,
        visibleCastodian: false,
        visibleProject: false,
        visibleProtocol: false,
        visibleManufacturer: false,
        visibleType: false,
        visibleUnit: false,
        visibleProductClass: false,
        visibleTransportVassel: false,
        visibleWorkStation: false,
        visiblePar: false,
        visibleClient: false,
        visibleLocation: false,
        visibleResearcher: false,
        visibleCourier:false,
        entityId: null,
        userRoleId: 0,
        loading: false,
        partners:[],
        investigators:[],
        countries: [],
        roles: [],
        custodians: [],
        projects: [],
        clients: [],
        protocols: [],
        types:[],
        manufacturers:[],
        units:[],
        researchers:[],
        productClasses:[],
        transportVessels:[],
        workStations:[],
        patientId: 0,
        patId:0,
        patients:[],
        locations:[],
        couriers:[],
        organization:[],
        fridgeTypes:[],
        fetchCountry: true,
        fetchRole: true,
        formLayout: 'vertical',
        isShow: false,
        apiService: UserServices,
        selectedProject: null,
        selectedPatient: null,
        selectedCustodian : null,
        custodianId: 0,
        visibleSelectCustodianModel: false,
        manufacturerId : 0,
        selectedManf : '',
        isReceive:'',
        visibleSelectManfModel : false,
        researcherId : 0,
        selectedResearcher : '',
        visibleResearcherModel : false,
        formCourier: this.$form.createForm(this, {
          name: 'courierCreate',
        }),
        formCastodian: this.$form.createForm(this, {
          name: 'castodianCreate',
        }),
        formProject: this.$form.createForm(this, {
          name: 'projectCreate',
        }),
        formProductClass: this.$form.createForm(this,{
          name : 'formProductCreate',
        }),
        formManufacturer: this.$form.createForm(this, {
          name: 'manufacturerCreate',
        }),
        formProtocol: this.$form.createForm(this, {
          name: 'protocolCreate',
        }),
        formType: this.$form.createForm(this, {
          name: 'typeCreate',
        }),
        formUnit: this.$form.createForm(this, {
          name: 'unitCreate',
        }),
        productClassInvest: this.$form.createForm(this, {
          name: 'productClassCreate',
        }),
        formTransportVassel: this.$form.createForm(this, {
          name: 'transportVasselCreate',
        }),
        formWorkStation: this.$form.createForm(this, {
          name: 'workStationCreate',
        }),
        formClient: this.$form.createForm(this,{
          name: 'clientCreate',
        }),
        formLocation: this.$form.createForm(this,{
          name: 'locationCreate',
        }),
        formResearcher: this.$form.createForm(this,{
          name: 'researcherCreate',
        })
      }
    },
    computed: {
      
      translation() {
        return this.$store.getters.getTranslation
      },
      users() {
        return this.$store.getters.getUser
      },
    },
    watch:{
      roles(newRoles, oldRoles)
      {
        if(newRoles !== oldRoles)
        {
          this.roles = newRoles
        }
      },
      ticket(newValue, oldValue)
      {
        this.newValue = oldValue
      }
      ,
      entity(newValue, oldValue)
      {
        if(newValue !== oldValue)
        {
          // this.getRolebyId(newValue.organizationTypeId)
          // this.getOrganizationByAlias(newValue.organizationTypeAlias)
          this.selectedPatient = newValue.patientName
          this.patientId = newValue.patientId
          this.selectedProject = newValue.projectName
          this.projectId = newValue.projectId
          if(!isEmpty(newValue.dateReceived))
          this.isChecked = true
          this.getPatient(newValue.projectGuid)
        }
      }
    },
    mounted() {
      // this.isCheck()
      // this.getRoles()
      this.isReceive = this.$route.query.isReceived
      this.patId = this.$route.query.patId
      this.patientId = this.patId
      this.fetchPartners()
      this.getOrganizationsType()
      this.fetchInvestigator()
      this.fetchAllInvestigator()
      this.fetchAllPartnerList()
      this.fetchCustodian()
      this.fetchProject()
      this.fetchProtocols()
      this.fetchManufacturer()
      this.fetchType()
      this.fetchUnit()
      this.fetchProductClass()
      this.fetchTransportVessel()
      this.fetchWorkStation()
      this.fetchClient()

      // this.fetchPatient()
      // this.getPatient()
      // this.fetchLocation()
      this.fetchResearcher()
      this.fetchOrganization()
      this.fetchCouriers()
      this.fetchFridgeType()

    },
    methods: {
      preventDefault,
      isReceived(e){
        this.isChecked = e
      },
      isCheck(){
        if(!isEmpty(this.entity)){
          if(!isEmpty(this.entity.dateReceived)){
            this.isReceived(true)
          }
        }
      },
      getUniqueLocation(studies) {
      const uniqueMap = new Map();
      studies.forEach((study) => {
        uniqueMap.set(study.id, study);
      })
      return Array.from(uniqueMap.values());
    },
        fetchFridgeType(){
          FridgeTypeServices.get().then((response)=>{
            this.fridgeTypes=response.data
          })
        },
        getCustodianById(id){
          CustodianServices.getById(id).then((response)=>{
            this.entityCustodian =  response.data
            this.isCreated = true
          })
        },
        getProtocolById(id){
          ProtocolServices.getById(id).then((response)=>{
            this.entityProtocol = response.data
            this.isCreated = true
          })
        },
        getManufacturerById(id){
          ManufacturerServices.getById(id).then((response)=>{
            this.entityManufacturer = response.data
            this.isCreated = true
          })
        },
        getTypeById(id){
          TypeServices.getById(id).then((response)=>{
            this.entityType = response.data
            this.isCreated = true
          })
        },
        getProductClassById(id){
          ProductClassServices.getById(id).then((response)=>{
            this.entityProductClass = response.data
            this.isCreated = true
          })
        },
        getUnitById(id){
          UnitServices.getById(id).then((response)=>{
            this.entityUnit = response.data
            this.isCreated = true
          })
        },
        getTransportVesselById(id){
          TransportVesselServices.getById(id).then((response)=>{
            this.entityTransportVassel = response.data
            this.isCreated = true
          })
        },
        getWorkStationById(id){
          WorkStationServices.getById(id).then((response)=>{
            this.entityWorkStation = response.data
            this.isCreated = true
          })
        },
        getClientById(id){
          ClientServices.getById(id).then((response)=>{
            this.entityClient = response.data
            this.isCreated = true
          })
        },
        getLocationById(id){
          SiteServices.getSiteById(id).then((response)=>{
            this.isCreated = true
            this.entityLocation = response.data
          })
        },
        getResearcherById(id){
          ResearcherServices.getById(id).then((response)=>{
            this.entityResearcher = response.data
            this.isCreated = true
          })
        },
        getCourierById(id){
          CourierServices.getById(id).then((response)=>{
            this.entityCourier = response.data
            this.isCreated = true
          })
        },
        deleteResearcher(id){
          ResearcherServices.disable(id).then((response)=>{
            this.success(response.data)
            this.fetchResearcher()
          })
        },
        getLocations(id){
          this.fetchLocation(id)
        },
        /* deleteLocation(id){
          LocationServices.disable(id).then((response)=>{
            this.success(response.data)
            this.fetchLocation()
          })
        }, */
        deleteClient(id){
          ClientServices.disable(id).then((response)=>{
            this.success(response.data)
            this.fetchClient()
          })
        },
        deleteWorkStation(id){
          WorkStationServices.disable(id).then((response)=>{
            this.success(response.data)
            this.fetchWorkStation()
          })
        },
        deleteTransportVessel(id){
          TransportVesselServices.disable(id).then((response)=>{
            this.success(response.data)
            this.fetchTransportVessel()
          })
        },
        deleteUnit(id){
          UnitServices.disable(id).then((response)=>{
            this.success(response.data)
            this.fetchUnit()
          })
        },
        deleteProductClass(id){
          ProductClassServices.disable(id).then((response)=>{
            this.success(response.data)
            this.fetchProductClass()
          })
        },
        deleteType(id){
          TypeServices.disable(id).then((response)=>{
            this.entityType = response.data
            this.isCreated = false
            this.fetchType()
          })
        },
        deleteCustodian(id){
          CustodianServices.deleteCustodian(id).then((response)=>{
            this.success(response.data)
            this.fetchCustodian()
          })
        },
        deleteProtocol(id){
          ProtocolServices.disable(id).then((response)=>{
            this.loading = false
            this.isCreated = false
            this.success(response.data)
            this.fetchProtocols()
          })
        },
        deleteManufacturer(id){
          ManufacturerServices.disable(id).then((response)=>{
            this.loading = false
            this.isCreated = false
            this.success(response.data)
            this.fetchManufacturer()
          })
        },
        onBookCourier(show){
          this.loading = false
          this.isCreated = false
          this.visibleCourier = show
    },
        showModalCastodian(show) {
          this.visibleCastodian = show
          this.isCreated = false
        },
        showModalProject(show) {
          this.visibleProject = show
          this.isCreated = false
        },
        showModalProtocol(show) {
          this.visibleProtocol = show
          if(!show){
            this.entityProtocol = []
          }
          this.isCreated = false
        },
        showModalManufacturer(show) {
      this.visibleManufacturer = show
      this.isCreated = false
        },
        showModalType(show) {
      this.visibleType = show
      if(!show){
        this.entityType = []
      }
      this.isCreated = false
        },
        showModalUnit(show) {
      this.visibleUnit = show
      if(!show){
        this.entityUnit = []
      }
      this.isCreated = false
        },
        showModalProductClass(show) {
      this.visibleProductClass = show
      if(!show){
        this.entityProductClass = []
      }
      this.isCreated = false
        },
        showModalTransportVassel(show) {
      this.visibleTransportVassel = show
      if(!show){
        this.entityTransportVassel = []
      }
      this.isCreated = false
        },
        showModalWorkStation(show) {
      this.visibleWorkStation = show
      if(!show){
        this.entityWorkStation = []
      }
      this.isCreated = false
        },
        showModal1(show) {
          this.visiblePar = show
          this.isCreated = false
        },
        showModalClient(show){
          this.visibleClient = show
          this.isCreated = false
        },
        showModalResearcher(show){
          this.visibleResearcher = show
          this.isCreated = false
        },
        showModalLocation(show){
          this.visibleLocation = show
          this.isCreated = false
        },
      handleChange(info) {
        this.fileList = info
        this.$emit('handleChange', this.fileList)
      },
      getOrganizationsType()
      {
        OrganizationTypeServices.GetAllTypes()
        .then((response)=>{
          this.organizationTypes = response.data
        })
      },
      fetch(id) {
        this.loading = true
        this.apiService
          .getById(id)
          .then((response) => {
            this.userData = response.data
            this.fetchPartners({ Ids: [this.userData.countryId] })
          })
          .finally(() => (this.loading = false))
      },    
      fetchCouriers(){
        OrganizationServices.getCouriers().then((response)=>{
          this.couriers = response.data
        })
      },
      filterOption,
      disableFutureDate: _disabledFutureDate,
      disablePreviousDate: _disabledPreviousDate,
      fetchPartners(params = {}) {
        PartnerServices.get(params).then((response) => {
          this.partners = response.data.data
          if(!isEmpty(params)){
            this.form.setFieldsValue({countryId:this.countries[0].id})
          }
        })
      },
      fetchCustodian()
      {
        CustodianServices.get().then((response)=>{
          this.datasourceCastodian = response.data
          this.custodians = response.data
        })
      },
      fetchProtocols(){
        ProtocolServices.get().then((response)=>{
          this.protocols = response.data
          this.datasourceProtocol = response.data
        })
      },
      fetchInvestigator(params = {}) {
        InvestigatorServices.get(params).then((response) => {
          this.investigators = response.data.data
        })
      },
      fetchAllInvestigator(params = {}) {
        // InvestigatorServices.get(params).then((response) => {
            
        //   this.datasource = response.data.data
        //   if(!isEmpty(params)){
        //     this.form.setFieldsValue({countryId:this.countries[0].id})
        //   }
        // })
      },
      fetchAllPartnerList(params = {}) {
        PartnerServices.get(params).then((response) => {
          this.datasourcePartner = response.data.data
          if(!isEmpty(params)){
            this.form.setFieldsValue({countryId:this.countries[0].id})
          }
        })
      },
      fetchRoles(params = {}) {
        RoleServices.get(params).then((response) => {
          this.roles = response.data
        })
      },
      getRoles() {
        if (this.isCreated && this.users.name !== 'Super Admin') {
            this.fetchRoles({ Ids: [this.entity.roleId] })
        } else {
          this.fetchRoles()
        }
      },
      searchRoles(name, b) {
        this.fetchRoles({ name })
      },
      fetchProject(){
        this.loading = true
        if(this.isReceive === 'true'){
           PatientServices.getConsentStatusListPId(this.patId).then((response)=>{
            this.projects = this.distinctNames(response.data)
            this.loading = false
           })
        }else{
        ProjectServices.getWithOrgId().then((response)=>{
          this.projects = response.data
          this.datasourceProject = response.data
          this.loading = false
        })
      }
      },
      distinctNames(consent) {
        const uniqueNames = new Set();
        const result = [];

        consent.forEach((item) => {
          if (!uniqueNames.has(item.projectName)) {
            uniqueNames.add(item.projectName);
            result.push({ name: item.projectName, id: item.projectId });
          }
        });

        return result;
      },
      fetchManufacturer(){
        ManufacturerServices.get().then((response)=>{
          this.manufacturers = response.data
          this.datasourceManufacturer = response.data
        })
      },
      fetchType(){
        TypeServices.get().then((response)=>{
          this.types = response.data
          this.datasourceType = response.data
        })
      },
      fetchUnit(){
        UnitServices.get().then((response)=>{
          this.units = response.data
          this.datasourceUnit = response.data
        })
      },
      fetchProductClass(){
        ProductClassServices.get().then((response)=>{
          this.productClasses = response.data
          this.datasourceProductClass = response.data
        })
      },
      fetchTransportVessel(){
        TransportVesselServices.get().then((response)=>{
          this.transportVessels = response.data
          this.datasourceTransportVassel = response.data
        })
      },
      fetchWorkStation(){
        WorkStationServices.get().then((response)=>{
          this.workStations = response.data
          this.datasourceWorkStation = response.data
        })
      },
      fetchClient(){
        ClientServices.get().then((response)=>{
          this.clients = response.data
          this.datasourceClient = response.data
        })
      },
      fetchPatient(projectGuid){
        PatientServices.getWithoutRejectedConsent(projectGuid).then((response)=>{
          this.patients = response.data.result
          if(isEmpty(this.patients)){
            this.message = "No patient associated with this project"
            this.visibleConfirm = true
          }
        })
      },
      getPatient(){
          PatientServices.getWithoutRejectedConsent(this.entity.projectGuid).then((response)=>{
          this.patients = response.data.result
        })
      },
      fetchLocation(id){
        SiteServices.getAllSiteByFridgeId(id).then((response)=>{
          if(isEmpty(response.data)){
            this.message = "No location associated with this type"
            this.visibleConfirm = true
          } else {
            this.locations = response.data
            this.datasourceLocation = response.data
          }
        })
      },
      fetchResearcher(){
        ResearcherServices.get().then((response)=>{
          this.researchers = response.data
          this.datasourceResearcher = response.data
        })
      },
      fetchOrganization(){
        OrganizationServices.getAll().then((res)=>{
          this.organization = res.data
        }).catch(this.error)
      },
      getRolebyId(Id)
      {
        RoleServices.getRolesById(Id).then((response)=>{
          this.roles = response.data
        })
      },
      // getOrganizationByAlias(e)
      // {
      //       OrganizationServices.get({ organizationTypeAlias: e })
      //     .then((response) => {
      //     this.organization = response.data
      //     })
      // },
      
      onSubmitInvestigator(e) {
      this.loading = true
      e.preventDefault()
      this.formInvest.validateFields((err, values) => {
        if (!err) {
          InvestigatorServices.create(values).then((response)=>{
            this.loading = false
            this.fetchInvestigator()
          })
          
        } else {
          this.loading = false
        }
      })
    },
    onSubmitCastodian(e) {
      this.loading = true
      this.custBtnLoading = true
      e.preventDefault()
      this.formCastodian.validateFields((err, values) => {
        if (!err) {
          if(this.isCreated)
          {
            CustodianServices.put(values).then((response)=>{
              this.custBtnLoading = false
              this.loading = false
              this.fetchCustodian()
            })
            this.visibleCastodian = false
            this.isCreated = false
          }
          else{
            CustodianServices.create(values).then((response)=>{
              this.custBtnLoading = false
              this.loading = false
              this.fetchCustodian()
            })
          }
          
        } else {
          this.loading = false
        }
      })
    },
    onSubmitProject(e) {
      this.loading = true
      e.preventDefault()
      this.formProject.validateFields((err, values) => {
        if (!err) {
          ProjectServices.addNew(values).then((response)=>{
            this.loading = false
            this.fetchProject()
          })
          
        } else {
          this.loading = false
        }
      })
    },
    onSubmitProtocol(e) {
      this.loading = true
      e.preventDefault()
      this.formProtocol.validateFields((err, values) => {
        if (!err) {
          if(this.isCreated){
            ProtocolServices.put(values).then((response)=>{
              this.loading = false
              this.isCreated = false
              this.entityProtocol = []
              this.formProtocol= this.$form.createForm(this, {
                name: 'protocolCreate',
              })
              this.fetchProtocols()
            })
          }
          else{
            ProtocolServices.create(values).then((response)=>{
            this.loading = false
            this.entityProtocol = []
            this.formProtocol= this.$form.createForm(this, {
                name: 'protocolCreate',
              })
            this.fetchProtocols()
          })
          }
        } else {
          this.loading = false
        }
      })
    },
    onSubmitType(e) {
      e.preventDefault()
      this.formType.validateFields((err, values) => {
        if (!err) {
          if(this.isCreated){
            this.loading = true
            TypeServices.put(values).then((response)=>{
              this.isCreated = false
              this.loading = false
              this.formType = this.$form.createForm()
              this.entityType = []
              this.fetchType()
            })
          }
          else{
            this.loading = true
            TypeServices.create(values).then((response)=>{
              this.loading = false
              this.formType = this.$form.createForm()
              this.entityType = []
              this.fetchType()
            })
          }
          
        }
      })
    },
    onSubmitManufacturer(e) {
      this.loading = true
      e.preventDefault()
      this.formManufacturer.validateFields((err, values) => {
        if (!err) {
          if(this.isCreated){
            ManufacturerServices.put(values).then((response)=>{
            this.loading = false
            this.isCreated = false
            this.fetchManufacturer()
            })
          }
          else{
            ManufacturerServices.create(values).then((response)=>{
            this.loading = false
            this.fetchManufacturer()
          })
          }
          
          
        } else {
          this.loading = false
        }
      })
    },
    onSubmitUnit(e) {
      this.loading = true
      e.preventDefault()
      this.formUnit.validateFields((err, values) => {
        if (!err) {
          if(this.isCreated){
            UnitServices.put(values).then((response)=>{
              this.loading = false
              this.isCreated = false
              this.entityUnit = []
              this.formUnit = this.$form.createForm(this, {
                name: 'unitCreate',
              })
              this.fetchUnit()
            })
          }
          else(
            UnitServices.create(values).then((response)=>{
              this.loading = false
              this.formUnit = this.$form.createForm(this, {
                name: 'unitCreate',
              })
              this.entityUnit = []
              this.fetchUnit()
            })
          )
          
        } else {
          this.loading = false
        }
      })
    },
    onSubmitProductClass(e) {
      this.loading = true
      e.preventDefault()
      this.formProductClass.validateFields((err, values) => {
        if (!err) {
          if(this.isCreated){
            ProductClassServices.put(values).then((response)=>{
              this.loading = false
              this.isCreated = false
              this.entityProductClass = []
              this.formProductClass = this.$form.createForm()
              this.fetchProductClass()
            })
          }
          else{
            ProductClassServices.create(values).then((response)=>{
            this.loading = false
            this.formProductClass = this.$form.createForm()
            this.entityProductClass = []
            this.fetchProductClass()
          })
          }
          
          
        } else {
          this.loading = false
        }
      })
    },
    onSubmitTransportVassel(e) {
      this.loading = true
      e.preventDefault()
      this.formTransportVassel.validateFields((err, values) => {
        if (!err) {
          if(this.isCreated) {
            TransportVesselServices.put(values).then((response)=>{
              this.isCreated = false
              this.loading = false
              this.entityTransportVassel = []
              this.formTransportVassel = this.$form.createForm(this, {
                name: 'transportVasselCreate',
              })
              this.fetchTransportVessel()
            })
          }
          else{
            TransportVesselServices.create(values).then((response)=>{
              this.loading = false
              this.formTransportVassel = this.$form.createForm(this, {
                name: 'transportVasselCreate',
              })
              this.entityTransportVassel = []
              this.fetchTransportVessel()
            })
          }
          
        } else {
          this.loading = false
        }
      })
    },
    onSubmitWorkStation(e) {
      this.loading = true
      e.preventDefault()
      this.formWorkStation.validateFields((err, values) => {
        if (!err) {
          if(this.isCreated){
            WorkStationServices.put(values).then((response)=>{
              this.isCreated = false
              this.loading = false
              this.formWorkStation = this.$form.createForm(this, {
                name: 'workStationCreate',
              })
              this.entityWorkStation = []
              this.fetchWorkStation()
            })
          }
          else{
          WorkStationServices.create(values).then((response)=>{
            this.loading = false
            this.formWorkStation = this.$form.createForm(this, {
              name: 'workStationCreate',
            })
            this.entityWorkStation = []
            this.fetchWorkStation()
          })
        }
        } else {
          this.loading = false
        }
      })
    },
    onSubmitClient(e){
      this.loading = true
      this.formClient.validateFields((err,values)=>{
        if (!err) {
          if(this.isCreated){
            ClientServices.put(values).then((response)=>{
              this.isCreated = false
              this.loading = false
              this.fetchClient()
            })
          }
          else{            
            ClientServices.create(values).then((response)=>{
              this.loading = false
              this.fetchClient()
            })
          }
          
        } else {
          this.loading = false
        }
      })
    },
    onSubmitLocation(e){
      this.loading = true
      /* this.formLocation.validateFields((err,values)=>{
         if (!err) {
          if(this.isCreated){
            LocationServices.put(values).then((response)=>{
              this.isCreated = false
              this.loading = false
              this.fetchLocation()
            })
          }
          else{
            LocationServices.create(values).then((response)=>{
            this.loading = false
            this.fetchLocation()
          })
          }
        } else {
          this.loading = false
        }
      }) */
    },
    onSubmitResearcher(e){
      this.loading = true
      this.formLocation.validateFields((err,values)=>{
        if (!err) {
          if(this.isCreated){
            ResearcherServices.put(values).then((response)=>{
              this.loading = false
              this.isCreated = false
              this.fetchResearcher()
            })
          }
          else{
            ResearcherServices.create(values).then((response)=>{
            this.loading = false
            this.fetchResearcher()
          })
          }
          
          
        } else {
          this.loading = false
        }
      })
    },
    cancelSelectProjectModel(e){
      this.visibleSelectProjectModel = e
    },
    cancelSelectPatientModel(e){
      this.visibleSelectPatientModel = e
    },
    getPatientId(record){
      return {
        on: {
          click: (event) => {
            console.log(record)
            this.patientId = record.id
            this.selectedPatient = record.patientName
            // this.patientRequired = false
            this.$emit('patRequired',false,record.id)
            this.cancelSelectPatientModel(false)
          },
        },
      }
      
    },
    getProjectId(record){
      return {
        on: {
          click: (event) => {
            this.projectId = record.id
            this.selectedProject = record.name
            // this.projectRequired = false
            this.fetchPatient(record.globalId)
            this.cancelSelectProjectModel(false)
            this.$emit('projRequired',false,record.id)
          },
        },
      }
    },
    getCustodianId(record){
      return {
        on: {
          click: (event) => {
            this.custodianId = record.id
            this.selectedCustodian = record.name
            this.cancelSelectCustodianModel(false)
            this.$emit('custRequired',false,record.id)
          },
        },
      }
    },
    cancelSelectCustodianModel(e){
      this.visibleSelectCustodianModel = e
    },
    getManfId(record){
      return {
        on: {
          click: (event) => {
            debugger
            this.manufacturerId = record.id
            this.selectedManf = record.name
            this.$emit('manufRequired',false,record.id)
            this.cancelSelectManfModel(false)
          },
        },
      }
    },

    cancelSelectManfModel(e){
      this.visibleSelectManfModel = e
    },
    getResearcherId(record){
      return {
        on: {
          click: (event) => {
            this.researcherId = record.id
            this.selectedResearcher = record.name
            this.$emit('resRequired',false,record.id)
            this.cancelResearcherModel(false)
          },
        },
      }
    },

    cancelResearcherModel(e){
      this.visibleResearcherModel = e
    },
      onChange(e)
      {
        const id = e.id
        this.getRolebyId(id);
        this.getOrganizationByAlias(e.alias)
      }
    },
  }
  </script>
  <style>
  .md-10{
    width:160px;
    height:25px;
    text-justify: auto;
  }
  .he{
    height: 30px;
  }
</style>
  