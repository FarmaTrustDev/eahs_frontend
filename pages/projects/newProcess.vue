<template>
  <PageLayout :create="false" title="Process">
    <template slot="headerMenus" v-if="defaultUserRole !== roleUsers.manager_type.name && statusProcess !== statusData.pending.name">   
      <a-button type="primary" :disabled="isRegister" @click="processCreating(true)">Add New Process</a-button>
    </template>
    
    <div slot="content">
      <div class="bd-r-5">
      <a-form v-if="isProcessCreating" :form="formProcess" @submit="onSubmitProcess">
        <a-form-item>
                <a-input
              v-decorator="[
                'id',
                {
                  initialValue: 0,
                },
              ]"
              type="hidden"
            />
        </a-form-item>
        <a-col :offset="23" ><a style="color:grey"><a-icon type="close" :style="{fontSize: '20px'}" @click="processCreating(false)" /></a></a-col>
          <a-row class="bg-grey pt-2">
            <a-col :span="12" class="ml-10">
              <a-form-item
                label="Process Name "
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 18 }"
                class="pt-3"
              >
                <a-input ref="procNam"
                  v-decorator="[
                    'name',
                    {
                      rules: [
                        {
                          required: true,
                          message: 'Please input equipment name',
                        },
                      ],
                    },
                  ]"
                  style="background-color: white"
                  placeholder="Process Name"
                  
                /><div v-if="isAlreadyExistProcess" class="txt-red">Process Already Exist</div>
              </a-form-item>
            </a-col>
            <a-col :span="10" :offset="1">
              <a-form-item 
                label="Is Outbound"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 16 }"
                class="pt-3">
                        <a-switch 
                            v-decorator="[
                            'isPublishable',
                            {
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
                <!-- <a-form-item>
                <a-radio-group 
                    v-decorator="[
                      'optionId',
                      {
                        rules: [
                          {
                            required: false,
                            message: 'Please select option type',
                          },
                        ],
                      },
                    ]"
                    >
                    <a-radio v-for="opt in stepOptions" :key="opt.id" :value="opt.id" >
                      {{opt.name}}
                    </a-radio>
                </a-radio-group>
                </a-form-item> -->
            </a-col>
          </a-row>
          <!-- <a-row>
            <a-col :span="18">
              <div v-for="(step, index) in steps" :key="index">
                <div class="bg-grey pt-10 pb-10 mt-10 pl-2">
                  <p>{{ step.name }}</p>
                </div>
              </div>
            </a-col>
          </a-row> -->
          <a-row class="pt-2">
            <a-col :span="6" :offset="18">
              <a-form-item>
                <FormActionButton :loading="processBtnLoading"
                  class="process-btn text-left"
                  type="primary"
                  :custom-text="processBtnText"
                />
              </a-form-item>
            </a-col>
            </a-row>
      </a-form>
            <div v-if="processData.length===0" class="ant-col ant-col-24 mt-15">
              <a-empty >
                <span > There is no <a>Process</a> </span>
              </a-empty>
            </div>
            <a-row>
              <a-col :span="22">
              <a-tabs class="h-tabs" v-model="activeTab" @dragover.prevent
                @drop="handleDrop" >
                <a-tab-pane v-for="(process , index) in processData" :key="process.processId"  >
                  <template #tab>
                    <span draggable="true" 
                    @dragstart="handleDragStart(index)" 
                    @dragenter="handleDragEnter(index)"
                    @dragleave="handleDragLeave"
                    @dragend="handleDragEnd">
                      {{ process.processName }}
                      <a-dropdown :disabled="process.isRegistered" v-if="defaultUserRole !== roleUsers.manager_type.name && statusProcess !== statusData.pending.name">
                        
                        <a-icon type="more" />
                        
                        <a-menu slot="overlay">
                          <a-menu-item key="1">
                            <a @click="editProcess(process.processGuid)">Edit</a>
                          </a-menu-item>
                          <a-menu-item key="2">
                            <a @click="deleteProcess(process.processGuid)">Delete</a>
                          </a-menu-item>
                          
                        </a-menu>
                      </a-dropdown>
                    </span>
                  </template>
                  <div class="tabCol">
                      <a-table 
                              :columns="columnsProc"
                              :data-source="process.stepResponseDTO"
                              
                              class="rounded-table pt-10 "
                              :pagination="{
                                defaultPageSize: 5,
                                showSizeChanger: true,
                                pageSizeOptions: ['5', '10', '15', '20', '25'],
                              }"
                            >
                            <template slot="stage" slot-scope="stage">
                              <span v-if="stage.isProcess === true">{{stepOpt.process.description}} 
                                  <a-tooltip title="View Process Questions" placement="top">
                                  <a-icon type="eye" :style="{color:'blue',fontSize: '15px',marginTop:'5px'}" @click="getStepQuestionById(stage.id)"  />
                                  </a-tooltip>
                              </span>
                              <span v-else-if="stage.isSampleKit === true">{{stepOpt.sampleKit.description}} 
                              </span>
                              <span v-else-if="stage.isStorage === true">{{stepOpt.storage.description}}</span>
                              <span v-else>{{stepOpt.view.description}}</span>
                            </template>
                            <template slot="action" slot-scope="action">
                                <a-dropdown :disabled="process.isRegistered || process.statusName !== null ">
                                  <a-button class="action-button" style="height:30px" @click="preventDefault">
                                    Admin <a-icon type="down" />
                                  </a-button>
                                  <a-menu slot="overlay">
                                    <a-menu-item key="1">
                                      <a @click="editStep(action.id,action.processId)">Edit</a>
                                    </a-menu-item>
                                    <a-menu-item key="2">
                                      <a-popconfirm
                                        title="Are you sure you want to delete this ?"
                                        ok-text="Yes"
                                        cancel-text="No"
                                        placement="topLeft"
                                        @confirm="deleteStep(action.id)"
                                        >
                                        <span>Delete</span>
                                      </a-popconfirm>
                                    </a-menu-item>
                                  </a-menu>
                                </a-dropdown>
                              </template>
                            </a-table>
                            <a-col :offset="19" v-if="defaultUserRole !== roleUsers.manager_type.name && statusProcess !== statusData.pending.name">
                            <a-button type="primary"  class="wd-11 mt-10" @click="visibleModelStep(true,process.processId)">Add New Step</a-button>
                            </a-col>
                        </div>
                </a-tab-pane>
              </a-tabs>
            </a-col>
            <a-col :span="2">
              <!-- This is for drag drop -->
              <!-- <a-button v-if="isStaged" type="primary" @click="updateStages()">Save</a-button> -->
              <a-button type="primary" v-if="defaultUserRole !== roleUsers.manager_type.name && statusProcess === null"  @click="eSignature()">Save</a-button>
            </a-col>
            <!-- <div class="ant-col ant-col-24 mt-15" v-for="proces in processData" :key="proces.processId" >
              <a-col :span="24" class="bg-grey">
                <a-col :span="20"><h2 class="mt-15 ml-15">{{ proces.processName }} </h2></a-col>
                <a-col :span="4">
                  <a-button type="primary" class="wd-11 mt-15" @click="visibleModelStep(true,proces.processId)">Add New Step</a-button>
                </a-col>
              </a-col>
              <a-col :span="12" class="bg-grey" v-for="step in proces.stepResponseDTO" :key="step.id">
              <a-col :span="16"><h3 class="ml-15"> {{ step.name }}</h3></a-col>
              <a-col :span="2"><h3 class="ml-15"> <a @click="editStep(step.id)"><a-icon type="edit" style="color:blue"/></a></h3></a-col>
              <a-col :span="2"><h3 class="ml-15"> <a @click="deleteStep(step.id)"><a-icon type="delete" style="color:red"/></a></h3></a-col>
              </a-col>
            </div> -->
          </a-row>
          <a-form :form="form" @submit="onSubmit">
            <a-row v-if="defaultUserRole !== roleUsers.manager_type.name">
            <a-col :span="7" :offset="3" class="mt-15">
                <a-form-item>
              <a-select 
              v-decorator="[
                  'softwareId',
                  {
                    rules: [
                        {
                          required: true,
                          message: 'please select software',
                        },
                      ],
                  },
                ]"
              placeholder="Select Software" @change="checkOtherSelectSoft" class="process-selection" :show-search="true" :filter-option="filterOption">
                <a-select-option
                  v-for="software in softwares"
                  :key="software.softwareId"
                >
                  {{ software.softwareName }}
                </a-select-option>
                <a-select-option key="other"  @click="addSoftwareModel(true)" >
                  Other
                </a-select-option>
              </a-select>
            </a-form-item>
            </a-col>
            <a-col :span="7" class="mt-15">
            <a-form-item>
              <a-select 
              v-decorator="[
                  'equipmentId',
                  {
                    rules: [
                        {
                          required: true,
                          message: 'please select equipment',
                        },
                      ],
                  },
                ]"
                placeholder="Select Equipment"
                @change="checkOtherSelectEqip"
                class="process-selection"
                :filter-option="filterOption"
                :show-search="true"
              >
                <a-select-option
                  v-for="equipment in equipments"
                  :key="equipment.equipmentId"
                >
                  {{ equipment.equipmentName }}
                </a-select-option>
                <a-select-option key="other" @click="addEquipmentModel(true)" >
                  Other
                </a-select-option>
              </a-select>
            </a-form-item>
            </a-col>
            <a-col :span="7" class="mt-15">
              <a-form-item>
                <FormActionButton
                  class="process-btn text-left"
                  custom-text="Save & Link to SOPs"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row v-if="defaultUserRole === roleUsers.manager_type.name">
            <a-col :offset="18">
              <a-button type="primary" class="wd-13 ml-20" :loading="btnLoading" @click="submitApproval(statusData.approved.name)" >Approve</a-button>
            </a-col>
            <a-col :offset="18" class="mt-10">
              <a-button type="danger" class="wd-13 ml-20" :loading="btnLoading" @click="submitApproval(statusData.reject.name)">Reject</a-button>
            </a-col>
        </a-row>
        
      </a-form>
    </div>

    <a-modal class="bg-grey"
        :visible="modalStepQuestionVisible"
        :width="600"
        :footer="null"
        @cancel="visibleStepQuestionModal(false)"
        >
        <div>
        <h2>Step Questions:</h2>
        <div  v-for="(quest,index) in stepQuestions" :key="quest.id" >
          <a-row>
          <a-col :lg="{span:15}" :md="{span:10}" :sm="{span:8}" :xs="{span:10}">
          <div class="pt-3"><h3>Q{{index + 1 }}: {{ quest.item }}</h3></div>
          </a-col>
        </a-row>
        </div>
      </div>
        </a-modal>
      
        <a-modal 
      :visible="visibleSignature"
      :footer="null"
      class="error-model"
      @cancel="handleOk()"
      @ok="handleOk()"
    >
    <Signature @handleSignatureOk="handleSignatureOk" @handleSignatureCancel="handleSignatureCancel"/>
    </a-modal>


      <a-modal
        :visible="visibleAddEquipment"
        title="Add Equipment"
        class="support-add-modal"
        :dialog-style="{ top: '20px' }"
        :loading="loading"
        :footer="null"
        :width="600"
        @cancel="addEquipmentModel(false,0)"
      >
        <a-form :form="equipmentForm" @submit="onSubmitEquipment">
          <a-form-item>
            <a-input
              v-decorator="[
                'equipmentId',
                {
                  initialValue: ticket.equipmentId,
                },
              ]"
              type="hidden"
            />
          </a-form-item>
          <a-row :gutter="20">
            <a-col :span="12">
              <a-form-item
                label="Equipment Name *:"
                :label-col="{ span: 24 }"
                :wrapper-col="{ span: 22 }"
              >
                <a-input
                  v-decorator="[
                    'equipmentName',
                    {
                      initialValue: ticket.equipmentName,
                      rules: [
                        {
                          required: true,
                          message: 'Please input equipment name',
                        },
                      ],
                    },
                  ]"
                  placeholder="Equipment Name"
                />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class="">
            <a-col :span="2" :offset="21">
              <FormActionButton :is-created="isCreatedEquipment" :loading="loading" />
            </a-col>
          </a-row>
        </a-form>
        <div>
          <a-table
            :columns="columns"
            :data-source="equipments"
            :loading="loading"
            class="rounded-table pt-10 users-list"
            :pagination="{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '30', '50', '100'],
            }"
          >
            <template slot="action" slot-scope="text,record">
              <a-dropdown>
                <a-button class="action-button" @click="preventDefault">
                  Admin
                  <a-icon type="down" />
                </a-button>
                <a-menu slot="overlay">
                  <a-menu-item key="1">
                    <a @click="getEquipmentById(record.equipmentId)">Edit</a>
                  </a-menu-item>
                  <a-menu-item key="2">
                    <a-popconfirm
                    title="Are you sure you want to delete this equipment ?"
                    ok-text="Yes"
                    cancel-text="No"
                    placement="topLeft"
                    @confirm="deleteEquipment(record.equipmentId)"
                    >
                  <span>Delete</span>
                  </a-popconfirm>
                    <!-- <span @click="deleteEquipment(record.equipmentId)">Delete</span> -->
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </template>
          </a-table>
        </div>
      </a-modal>
      <a-modal
        :visible="visible"
        :cancel="false"
        :loading="sOPLoading"
        :width="1000"
        @cancel="visibleModel(false)"
      >
      <a-button type="primary" class="wd-16" @click="visibleUploadModal(true)">
            Add New SOP
        </a-button>
        <div
        v-for="(project, index) in dummyData"
        :key="index"
        class="ant-col mt-15 consentClass"
        >
          <a-row>
            <a-col
              :lg="{ span: 3 }"
              :md="{ span: 2 }"
              :sm="{ span: 4 }"
              :xs="{ span: 8 }"
              class="pl-2"
            >
              <a-switch
                v-decorator="[
                  'SOP',
                  {
                    initialValue: project.id,
                  },
                ]"
                class="mt4 toggle_record"
                data-rowId="2"
                size="large"
                checked-children="Yes"
                un-checked-children="No"
                @change="(value) => handleCheck(value, project.id)"
              />
            </a-col>
            <a-col
              :lg="{ span: 15 }"
              :md="{ span: 10 }"
              :sm="{ span: 10 }"
              :xs="{ span: 10 }"
            >
              <div
                class="pt-3 cursor-pointer"
                @click="goto('/projects/newProcess')"
              >
                <h3>{{ project.fileName }}</h3>
              </div>
            </a-col>
            <a-col
              :lg="{ span: 3 }"
              :md="{ span: 3 }"
              :sm="{ span: 3 }"
              :xs="{ span: 3 }"
            >
              <a-button class="ant-btn ant-btn-primary h-30" @click="handlePreview(true, project.filePath)">
                View
              </a-button>
            </a-col>
            <a-col
              :lg="{ span: 3 }"
              :md="{ span: 3 }"
              :sm="{ span: 3 }"
              :xs="{ span: 3 }"
            >
              <a-button class="ant-btn ant-btn-primary h-30" @click="deleteFile(project.id)">
                Delete
              </a-button>
            </a-col>
          </a-row>
        </div>
        <div v-if="isEmptySOP">
        <span class="ant-col ant-col-20 sel-validation" >please select SOP</span>
        </div>
        <template slot="footer">
          <center>
            <a-button
              :loading="loading"
              type="primary"
              class="text-center wd-16"
              @click="completeProcess()"
            >
              Complete
            </a-button>
          </center>
        </template>
      </a-modal>
       <!-- Step Model -->
       <a-modal :visible="previewVisible" :footer="null" @cancel="handlePreview(false, '')">
      <iframe alt="example" style="width: 480px; height: 500px" :src="getImageUrl(previewImage)"></iframe>
    </a-modal>
       <a-modal
        :visible="visibleStepModal"
        title="Add Step"
        class="support-add-modal"
        :dialog-style="{ top: '20px' }"
        :loading="loading"
        :footer="null"
        :width="800"
        @cancel="visibleModelStep(false)"
      >
      <a-form :form="stepForm" @submit="onSubmitStep">
        <a-row class="bg-grey">
          <a-form-item>
            <a-input
              v-decorator="[
                'processId',
                {
                  initialValue: processId,
                },
              ]"
              type="hidden"
            />
            </a-form-item>
            <a-form-item>
            <a-input
              v-decorator="[
                'id',
                {
                  initialValue: ticketStep.id,
                },
              ]"
            type="hidden"
            />
          </a-form-item>
          <a-col :span="11">
            <a-form-item
              label="New Step"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 24 }"
              class="ml-10 mr-10"
            >
              <a-input
                v-decorator="[
                  'name',
                  {
                    initialValue: ticketStep.name,
                    rules: [
                      {
                        required: true,
                        message: 'Please input your step name',
                      },
                    ],
                  },
                ]"
                style="background-color: white"
                placeholder="Step Name"
              />
            </a-form-item>
          </a-col>
          <a-col :offset="1" :span="12" class="mt-15" >
          <a-col :span="8">
            <a-form-item
            label="IsProcess"
            >
              <a-switch 
                    v-decorator="[
                      'isProcess',
                        {
                
                          valuePropName: 'checked',
                        },
                        ]"
                          data-rowId="2"
                          size="large"
                          class="toggle_record"
                          checked-children="Yes"
                          un-checked-children="No"
                          @change="processInfo"
                />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item 
            label="IsOutbound"
            >
              <a-switch
                    v-decorator="[
                      'isSampleKit',
                        {
                          
                          valuePropName: 'checked',
                        },
                        ]"
                          data-rowId="2"
                          size="large"
                          class="toggle_record"
                          checked-children="Yes"
                          un-checked-children="No"
                          @click=" (value) => sampleKitInfo(value)"
                />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
            label="IsStorage"
            >
              <a-switch
                    v-decorator="[
                      'isStorage',
                        {
                          valuePropName: 'checked',
                        },
                        ]"
                          data-rowId="2"
                          size="large"
                          class="toggle_record"
                          checked-children="Yes"
                          un-checked-children="No"
                          @click=" (value) => sampleStorageInfo(value)"
                />
            </a-form-item>
          </a-col>
        </a-col>
          <!-- <a-col :span="5">
            <a-form-item
            label="IsShipment"
            >
              <a-switch
                    v-decorator="[
                      'isShipment',
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
            </a-form-item>
          </a-col> -->
      </a-row>
      <a-row>
        <div v-if="isCheckedSampleKit" class="mt-15" >
          <a-row>
          <a-col :span="20"><h2> Sample Kit </h2></a-col>
          <!-- <a-col :span="2">
            <a-button @click="addMoreSampleKit()" type="primary"
              class="wd-11">Add More</a-button>
          </a-col> -->
        </a-row>
        
      <div  v-for="(record, index) in records" :key="index"
      class="ant-col ant-col-24 mt-15">
      <a-col :span="5" >
          <a-form-item :label-col="{ span: 24 }" :wrapper-col="{ span: 22 }">
              <a-input 
              v-model="record.item"
              placeholder="Title"
              /> 
          </a-form-item>
      </a-col>
      <a-col :span="5" >
          <a-form-item :label-col="{ span: 24 }" :wrapper-col="{ span: 22 }">
              <a-input 
              v-model="record.serialNo"
              placeholder="Serial No"
              /> 
          </a-form-item>
      </a-col>
      <a-col :span="5">
          <a-form-item :label-col="{ span: 24 }" :wrapper-col="{ span: 22 }">
              <a-input 
              v-model="record.color"
              placeholder="Color"
              /> 
          </a-form-item>
      </a-col>
      <a-col :span="4">
          <a-form-item :label-col="{ span: 24 }" :wrapper-col="{ span: 22 }">
              <a-input 
              v-model="record.expiry"
              placeholder="Expiry"
              type="date"
              /> 
          </a-form-item>
      </a-col>
      <a-col :span="3">
          <a-form-item :label-col="{ span: 24 }" :wrapper-col="{ span: 22 }">
              <a-upload 
              v-model="record.upload"
              placeholder="Upload"
              ><a-button> <a-icon type="upload" /> Upload </a-button>
            </a-upload> 
          </a-form-item>
      </a-col>
      <a-col :span="1"><a-icon class="mt-15 ml-30" style="color:red" type="minus-circle" @click="removeSampleKit(index)" /></a-col>
      <a-col :span="1"><a-icon type="plus-circle" :style="{color:'blue',fontSize: '15px'}" @click="addMoreSampleKit()" /></a-col>
      </div>
      </div>
      </a-row>
      <a-row>

      <div v-if="isCheckedProcess" class="mt-15">
        <a-row>
          <a-col :span="20"><h2> Process Question </h2></a-col>
          <!-- <a-col :span="2">
            <a-button @click="addMoreProcess()" type="primary" class="wd-11">Add More</a-button>
          </a-col> -->
        </a-row>
      
      <div  v-for="(record, index) in processes" :key="index" class="ant-col ant-col-24 mt-15">
      <a-col :span="20" >
          <a-form-item :label-col="{ span: 24 }" :wrapper-col="{ span: 22 }">
              <a-input 
              v-model="record.item"
              placeholder="Question"
              @keyup="checkvalOk(index)"
              /> 
          </a-form-item>
          <div :id="'no'+index" style="display:none;color: red;">This is required</div>
      </a-col>
      <a-col :span="2" ><a-icon type="minus-circle" class="mt-15 ml-30" v-if="index!==0" style="color:red"  @click="removeProcess(index)" /> </a-col>
      <a-col :span="1"><a-icon type="plus-circle" class="mt-15 " style="color:blue" @click="addMoreProcess()" /></a-col>
      </div>
      </div>
      </a-row>
      <a-row>
        <a-col :span="4" :offset="20">
            <a-form-item>
              <FormActionButton :loading="stepBtnLoading" :custom-text="isAU" class="mt-40" />
              <!-- @click="showStep(false)" -->
            </a-form-item>
          </a-col>
      </a-row>
      </a-form>
      </a-modal>
       <!-- End -->
       <a-modal 
       :visible="visibleUploadSOP"
        :loading="loading"
        @cancel="visibleUploadModal(false)"
        @ok="submitFiles"
        >
        <a-upload-dragger
        :file-list="fileList" 
        :remove="handleRemove"
        :before-upload="beforeUpload"
        >
          <p class="ant-upload-drag-icon">
            <a-icon type="inbox" />
          </p>
          <p class="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p class="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
          </p>
        </a-upload-dragger>
        </a-modal>
      <a-modal
        :visible="visibleAddSoftware"
        title="Add Software"
        class="support-add-modal"
        :dialog-style="{ top: '20px' }"
        :loading="loading"
        :footer="null"
        :width="750"
        @cancel="addSoftwareModel(false)"
      >
        <a-form :form="softwareForm" @submit="onSubmitSoftware">
          <a-form-item>
            <a-input
              v-decorator="[
                'softwareId',
                {
                  initialValue: softwareticket.softwareId,
                },
              ]"
              type="hidden"
            />
          </a-form-item>
          <a-row :gutter="20">
            <a-col :span="12">
              <a-form-item
                label="Software Name *:"
                :label-col="{ span: 24 }"
                :wrapper-col="{ span: 22 }"
              >
                <a-input
                  v-decorator="[
                    'softwareName',
                    {
                      initialValue: softwareticket.softwareName,
                      rules: [
                        {
                          required: true,
                          message: 'Please input software name',
                        },
                      ],
                    },
                  ]"
                  placeholder="Software Name"
                />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row class="">
            <a-col :span="2" :offset="21">
              <FormActionButton :is-created="isCreatedSoftware" :custom-text="isAS" :loading="loading" />
            </a-col>
          </a-row>
        </a-form>
        <div>
          <a-table
            :columns="softwareColumns"
            :data-source="softwares"
            :loading="loading"
            class="rounded-table pt-10 users-list"
            :pagination="{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '30', '50', '100'],
            }"
          >
            <template slot="action" slot-scope="text,record">
              <a-dropdown>
                <a-button class="action-button" @click="preventDefault">
                  Admin
                  <a-icon type="down" />
                </a-button>
                <a-menu slot="overlay">
                  <a-menu-item key="1">
                    <a @click="getSoftwareById(record.softwareId)">Edit</a>
                  </a-menu-item>
                  <a-menu-item key="2">
                    <a-popconfirm
                    title="Are you sure you want to delete this software ?"
                    ok-text="Yes"
                    cancel-text="No"
                    placement="topLeft"
                    @confirm="deleteSoftware(record.softwareId)"
                    >
                  <span>Delete</span>
                  </a-popconfirm>
                    <!-- <span @click="deleteSoftware(record.softwareId)">Delete</span> -->
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </template>
          </a-table>
        </div>
      </a-modal>
      
      <a-modal
        :visible="visibleRejectModal"
        title="Add RejectNote"
        class="support-add-modal"
        :dialog-style="{ top: '20px' }"
        :loading="loading"
        :footer="null"
        :width="600"
        @cancel="visibleModelReject(false)"
      >
      <a-form :form="rejectForm" @submit="onSubmitReject">
        <a-row>
          
          <a-col :span="24" class="bg-grey">
            <a-form-item
              label="New Step"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 24 }"
              class="ml-10 mr-10"
            >
              <a-input
                v-decorator="[
                  'rejectNote',
                  {
                    initialValue: ticketReject.rejectNote,
                    rules: [
                      {
                      },
                    ],
                  },
                ]"
                style="background-color: white"
                placeholder="Step Name"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :offset="18" :span="4">
            <a-form-item>
              <FormActionButton :loading="rejectBtnLoading" custom-text="Submit" class="mt-40" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      
       
      </a-modal>
      <ErrorModal :message="message" :isShow="visibleConfirm" @close-modal="visibleConfirm = false"></ErrorModal>
    </div>
  </PageLayout>
</template>
<script>
import PageLayout from '~/components/layout/PageLayout.vue'
import { filterOption,preventDefault } from '~/services/Helpers'
import SoftwareServices from '~/services/API/SoftwareServices'
import EquipmentServices from '~/services/API/EquipmentServices'
import SOPServices from '~/services/API/SOPServices'
import ProcessServices from '~/services/API/ProcessServices'
import StepServices from '~/services/API/StepServices'
import ProjectEquipmentServices from '~/services/API/ProjectEquipmentServices'
import ProjectSoftwareServices from '~/services/API/ProjectSoftwareServices'
import ProjectSOPServices from '~/services/API/ProjectSOPServices'
import routeHelpers from '~/mixins/route-helpers'
import {success} from '~/services/Helpers/notifications'
import notifications from '~/mixins/notifications'
import  { CONSENT_STATUSES, USER_ROLES ,STEP_OPTION} from '~/services/Constant/index'
// import Upload from '~/components/upload'
import imagesHelper from '~/mixins/images-helper'
import { DOCUMENT_EXTENSIONS } from '~/services/Constant'
import { DOCUMENT_UPLOAD_EXTENSIONS } from '~/services/Constant'
import ErrorModal from '~/components/common/ErrorModal.vue'
import Signature from '~/components/signature'
export default {
  components: {
    PageLayout,ErrorModal,Signature
    // Upload
  },
  mixins: [routeHelpers, notifications,imagesHelper],
  data() {
    return {
      visibleRejectModal:false,
      previewImage: '',
      isCheckedProcess: false,
      isChecked: 0,
      modalStepQuestionVisible:false,
      processes: [],
      records: [],
      stepQuestions:[],
      stepOpt:STEP_OPTION,
      sendIsShow:null,
      visibleConfirm:false,
      isCheckedSampleKit: false,
      roleUsers:USER_ROLES,
      previewVisible: false,
      statusData:CONSENT_STATUSES,
      rejectBtnLoading:false,
      isStaged:false,
      btnLoading:false,
      creat:false,
      isRegister:false,
      visibleSignature:false,
      message:'Step with this stage is alredy added',
      allowedExtensions : DOCUMENT_EXTENSIONS,
      processBtnText:'Add New Process',
      ticket: {
        type: Object,
        default: () => ({}),
      },
      ticketStep: {
        type: Object,
        default: () => ({}),
      },
      ticketReject: {
        type: Object,
        default: () => ({}),
      },
      sOPLoading: false,
      notEmpty:true,
      draggedIndex: null,
      dragOverIndex: null,
      stepBtnLoading:false,
      processBtnLoading:false,
      isProcessCreating:false,
      visibleStepModal:false,
      visibleAddSoftware: false,
      softwareticket: {},
      isCreated: false,
      isCreatedStep:false,
      visible: false,
      show: false,
      isPublised:false,
      isAU:'Add Step',
      isAS:'Create',
      isAE:'Create',
      stepName:'',
      proc:false,
      samKit:false,
      storage:false,
      vieSa:false,
      isCheckedStorage:false,
      loading: false,
      visibleUploadSOP:false,
      form: this.$form.createForm(this, { name: 'form' }),
      formProcess: this.$form.createForm(this, { name: 'formProcess' }),
      equipmentForm: this.$form.createForm(this, { name: 'equipmentForm' }),
      softwareForm: this.$form.createForm(this, { name: 'softwareForm' }),
      stepForm: this.$form.createForm(this, { name: 'stepForm' }),
      rejectForm: this.$form.createForm(this, { name: 'rejectForm' }),
      softwares: [],
      equipments: [],
      isEmptySOP:false,
      activeTab:0,
      visibleAddEquipment: false,
      dummyData: [],
      steps: [],
      fileList:[],
      processData:[],
      dummyDataSource:[],
      equipmentId:null,
        columnsProc: [
          {
            title: 'Step Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
          title: 'Step Type',
          key: 'stage',
          scopedSlots: {
            customRender: 'stage',
          }
          },
          {
          title: 'Action',
          key: 'action',
          scopedSlots: {
            customRender: 'action',
          }
          }
        ],
      pid:'',
      isCreatedSoftware: false,
      isCreatedEquipment: false,
      isAlreadyExistProcess:false,
      columns: [
        {
          title: 'Equipment Name',
          dataIndex: 'equipmentName',
          key: 'equipmentName',
        },
        {
          title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          key: 'action',
          scopedSlots: {
            customRender: 'action',
          },
        },
      ],
      softwareColumns: [
        {
          title: 'Software Name',
          dataIndex: 'softwareName',
          key: 'softwareName',
        },
        {
          title: `${this.$store.getters.getTranslation.Actio_1_220}`,
          key: 'action',
          scopedSlots: {
            customRender: 'action',
          },
        },
      ],
      statusProcess:null,
      allowedExtension: DOCUMENT_UPLOAD_EXTENSIONS,
      processId: '',
      sopList: [],
      defaultUserRole:''
    }
  },
  watch: {
    step(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.steps = newValue
      }
    },
  },
  mounted() {
    const data = JSON.parse(localStorage.getItem('vuex'))
    this.defaultUserRole =data.auth.user.roleName
    this.fetchSoftware()
    this.fetchEquipments()
    this.getSOP()
    const id = this.$route.query.id
    const pId = this.$route.query.pId
    this.pid = pId
    if (id !== undefined) {
      this.isCreated = true
      this.getProcessById(id)
    }
    this.fetchProcess()
  },
  methods: {
    filterOption,
    handlePreview(e, filePath){
      this.previewVisible = e
      if(e){
        this.previewImage = filePath.replace(/"/g, '')
      }
    },
    deleteFile(id){
      this.sOPLoading = true
      SOPServices.remove(id).then((response)=>{
        this.success(response.data)
        this.getSOP()
      }).catch(this.error).finally(this.sOPLoading = false)
    },
    beforeUpload(file) {
      const strName = file.name
      const ext = strName.split('.').pop()
      const isAllowedExtension = this.allowedExtension.includes('.' + ext)
      // extension upload the file @todo work in progess
      if (!isAllowedExtension) {
        this.$message.error('Please upload docx or pdf file')
        this.fileList = []
        return true
      }
      const isDuplicate = this.fileList.some(file => file.name === strName);
        if (isDuplicate) {
        this.error(strName + " already exists");
      }
      else{
        this.fileList = [...this.fileList, file];
        return false;
      }
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
      handleDragStart(index) {
        this.draggedIndex = index;
      },
      handleDragEnter(index) {
          if (index !== this.draggedIndex) {
            this.dragOverIndex = index;
          }
        },
        handleDragLeave() {
          this.dragOverIndex = null;
        },
        handleDragEnd() {
          if (this.draggedIndex !== null && this.dragOverIndex !== null) {
            this.swapItems(this.draggedIndex, this.dragOverIndex);
            this.draggedIndex = null;
            this.dragOverIndex = null;
          }
        },
        handleDrop() {
          // Prevent default drop behavior
          return false;
        },
        swapItems(fromIndex, toIndex) {
          const temp = this.processData[fromIndex];
          const tempStageNo = this.processData[toIndex].stageNo;
          this.processData[fromIndex] = this.processData[toIndex];
          this.processData[fromIndex].stageNo=temp.stageNo;
          this.processData[toIndex] = temp;
          this.processData[toIndex].stageNo = tempStageNo;
          const filteredArray = this.processData.filter(item => item !== '__ob__: Observer');
          this.fetchSwapProcess(filteredArray)
        },
    handleCheckIsPublished(value)
    {
      this.isPublised=value
    },
    getStepQuestionById(id)
    {
      this.modalStepQuestionVisible = true
      StepServices.getStepQuestionByStepId(id).then((response)=>{
        this.stepQuestions= response.data
      })
    },
    preventDefault,
    onSubmitEquipment(e) {
      e.preventDefault()
      this.equipmentForm.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          if(this.isCreatedEquipment){
            EquipmentServices.updateEquipment(values).then((response)=>{
              success(this, { message: response.data })
                this.fetchEquipments()
                this.loading = false
                this.isCreatedEquipment = false
                this.equipmentForm.resetFields()
            }).catch(this.error)
          }else{
            EquipmentServices.create(values)
              .then((response) => {
                success(this, { message: response.data })
                this.fetchEquipments()
                this.equipmentForm.resetFields()
                this.loading = false
              })
              .catch(this.error)
          }
        }
      })
    },
    onSubmitSoftware(e) {
      e.preventDefault()
      if(this.isCreatedSoftware){
        this.softwareForm.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          SoftwareServices.updateSoftware(values).then((response)=>{
            this.isAS = 'Create'
            this.isCreatedSoftware = false
            this.softwareForm.resetFields()
            this.fetchSoftware()
          }).catch(this.error).finally(this.loading = false)
        }
      })
      }
      else{
        this.softwareForm.validateFields((err, values) => {
          if (!err) {
            SoftwareServices.create(values)
              .then((response) => {
                success(this,{message: response.data})
                this.fetchSoftware()
                this.softwareForm.resetFields()
                this.loading = false
              })
              .catch(this.error)
          }
        })
      }
    },
    sampleStorageInfo(e)
    {
      StepServices.checkStepWithStage(this.processId,'isStorage').then((response)=>{
        if(response.data === false)
        {
          this.isCheckedProcess = false
          this.isCheckedSampleKit = false
          this.isCheckedStorage = e
          this.processes=[]
          this.records=[]
          this.stepForm.setFieldsValue({
              isProcess:false,
              isSampleKit:false,
            })
        }
        else if (response.data === true){
          if(this.isAU !== 'Update' || this.storage === false){
          this.visibleConfirm = true
          this.stepForm.setFieldsValue({
              isStorage:false,
            })
          }
        }
        })
      
    },
    sampleKitInfo(e){
      StepServices.checkStepWithStage(this.processId,'isSampleKit').then((response)=>{
        if(response.data === false)
        {
          this.isCheckedProcess = false
          this.isCheckedStorage = false
          this.processes=[]
          this.stepForm.setFieldsValue({
              isProcess:false,
              isStorage:false,
            })
          // this.isCheckedSampleKit = e
          if(e){
            this.records.push({item: '', serialNo:'',color: '', expiry: '',upload: ''})
          }
          if(!e){
            this.records= []
          }
        }
        else if(response.data === true){
          if(this.isAU !== 'Update' || this.samKit === false){
          this.visibleConfirm = true
          this.stepForm.setFieldsValue({
              isSampleKit:false,
            })
          }
      }
      
      })
        
    },
    processInfo(e){
      
        StepServices.checkStepWithStage(this.processId,'isProcess').then((response)=>{
          if(response.data === false)
          {
            this.isCheckedSampleKit = false
            this.isCheckedStorage = false
            this.records=[]
            this.stepForm.setFieldsValue({
              isSampleKit:false,
              isStorage:false
              })
            this.isCheckedProcess = e
            if(e){
              this.processes.push({item: ''})
            }
            if(!e){
              this.processes= []
            }
          }
          else if(response.data === true){
            if(this.isAU !== 'Update' || this.proc === false){
            this.visibleConfirm = true
            this.stepForm.setFieldsValue({
                isProcess:false,
              })
            }
            else{
            this.isCheckedSampleKit = false
            this.isCheckedStorage = false
            this.records=[]
            this.stepForm.setFieldsValue({
              isSampleKit:false,
              isStorage:false
              })
            this.isCheckedProcess = e
            if(!e){
              this.processes= []
            }
            }
          }
        })
    },
    addMoreProcess(){
      this.processes.push({id:0,item: ''})
    },
    visibleStepQuestionModal(e)
    {
      this.modalStepQuestionVisible = e
    },
    removeProcess(index){
      this.processes.splice(index, 1);
    },
    removeSampleKit(index){
      this.records.splice(index, 1);
    },
    addMoreSampleKit(){
      this.records.push({item: '', serialNo:'', color: '', expiry: '',upload: ''})
    },
    visibleModel(e) {
      this.visible = e
    },
     fetchStepWithStage(processId, columnName) 
    {
        try {
          // Simulate an asynchronous operation (e.g., an API call)
          const response = StepServices.checkStepWithStage(processId, columnName);
          return response.data;
        } catch (error) {
          // Handle any errors here
          console.error(error);
          throw error;
        }
    },
    submitFiles(){
            this.loading= true
            const formData = new FormData()
            this.fileList.forEach((files) => {
              formData.append('files', files)
            })
            SOPServices.create(formData).then((response)=>{
              this.fileList=[]
              this.success(response.message)
                this.visibleUploadModal(false)
                this.get()
            }).catch((error) => {
                if (error.response && error.response.data && error.response.data.message) {
                  const result = error.response.data.message.match(/\((.*)\)/)
                  this.error(result[1]);
                } else {
                  this.error("An error occurred.");
                }
              });
            this.loading= false
        },
    visibleModelStep(sho,proId) {
      if(sho === false)
      {
        this.isAU='Add Step'
        this.isCreatedStep = false
        this.stepForm.resetFields()
        this.isCheckedProcess = false
        this.isCheckedSampleKit = false
        this.processes = []
      }
      this.processId = proId
      this.visibleStepModal = sho
    },
    visibleModelReject(sho) {
      this.visibleRejectModal = sho
    },
    addEquipmentModel(e) {
      this.equipmentForm.resetFields()
      this.isCreatedEquipment = false
      this.visibleAddEquipment = e
    },
    submitApproval(inptStatus)
    {
      const formData=new FormData()
      formData.append('projectGuid', this.pid)
      formData.append('statusName', inptStatus)
      console.log(formData)
      ProcessServices.processApproval(formData).then((response)=>{
        const data = JSON.parse(localStorage.getItem('vuex'))
            const userRole =data.auth.user.roleName
            if(userRole===USER_ROLES.manager_type.name)
            {
              this.goto('/projects/tabs')
            }  else {
              this.goto('/projects')
            }
      })

    },
    
    addSoftwareModel(e) {
      this.softwareForm.resetFields()
      this.isCreatedSoftware = false
      this.isAS = 'Create'
      this.visibleAddSoftware = e
    },
    showStep(e) {
      this.show = e
    },
    checkOtherSelectSoft(value)
    {
      if(value === 'other')
      {
        this.$nextTick(() => {
        this.form.setFieldsValue({
          softwareId: 'Select Software'
        });
      });
      }
    },
    checkOtherSelectEqip(value)
    {
      if(value === 'other')
      {
        this.$nextTick(() => {
        this.form.setFieldsValue({
          equipmentId: 'Select Equipment'
        });
      });
      }
    },
    visibleUploadModal(e){
            this.visibleUploadSOP = e
        },
        onSubmitProcess(e) {
          e.preventDefault()
            this.formProcess.validateFields((err,values)=>{
                if(!err){
                  this.isAlreadyExistProcess = false
                      const procName= this.$refs.procNam.value
                      ProcessServices.isProcessExist(procName,this.pid).then((response)=>{
                        if(response.data.name !== "")
                        {
                          this.isAlreadyExistProcess = true
                          this.$refs.procNam.focus();
                        }
                        else{
                          this.processBtnLoading = true
                              const formData=new FormData()
                              for (const key in values) {
                                if(values.isPublishable===undefined ){
                                  values.isPublishable=false
                                }
                              formData.append(key, values[key])
                              }
                              formData.append('projectGuid',this.pid)
                              if(this.creat === false)
                              {
                              ProcessServices.create(formData).then((response) => {
                                this.processCreating(false)
                                this.loading = false
                                this.processBtnLoading=false
                                this.processId = response.data.id
                                this.activeTab = response.data.result.id
                                this.fetchProcess()
                                this.isCreated = true
                              })
                              }
                              else{
                              ProcessServices.update(formData).then((response)=>{
                                this.processCreating(false)
                                this.loading = false
                                this.creat=false
                                this.processBtnText='Add New Process'
                                this.processBtnLoading=false
                                this.fetchProcess()
                              })
                              }
                                  }
                              })
                        }
                      }).catch(this.error)
        
        
      },
    onSubmit(e) {
      e.preventDefault()
            this.form.validateFields((err,values)=>{
                if(!err){
                   if(values.softwareId !== undefined && values.softwareId !== 'Select Software'){
                    const formData = new FormData()
                        formData.append('projectId',this.pid)
                        formData.append('softwareId', values.softwareId)
                        ProjectSoftwareServices.create(formData).then((response)=>{
                            
                        }).catch(this.error)
                    }
                        if(values.equipmentId !== undefined && values.equipmentId !== 'Select Equipment'){
                            const equipmentData = new FormData()
                            equipmentData.append('projectId', this.pid)
                            equipmentData.append('equipmentId', values.equipmentId)
                            ProjectEquipmentServices.create(equipmentData).then((response)=>{
                                
                            }).catch(this.error)
                        }
                        this.visibleModel(true)
                }
            })
        
        this.loading = false
    },
    deleteStep(id)
    {
      StepServices.deleteStep(id).then((response)=>{
        this.fetchProcess()
      })
    },
    editStep(id,processId)
    {
      this.visibleModelStep(true,processId)
      StepServices.editStep(id).then((response)=>{
        this.isCreatedStep = true
        this.stepForm.setFieldsValue({
        id: response.data.result.id,
        name: response.data.result.name,
        isProcess: response.data.result.isProcess,
        isSampleKit: response.data.result.isSampleKit,
        isStorage: response.data.result.isStorage,
      });
      this.proc = response.data.result.isProcess
      this.samKit = response.data.result.isSampleKit
      this.storage = response.data.result.isStorage
      if(response.data.result.isProcess === true)
      {
        this.processInfo(true)
        this.processes=[]
        this.processes = response.data.result.stepProcessResponseDTO
      }
      else if(response.data.result.isSampleKit === true)
      {
        // this.records = response.data.result.stepSampleKitResponseDTO
        this.sampleKitInfo(true)
      }
      else{
        this.sampleStorageInfo(true)
      }
      // this.processes = response.data.result.stepProcessResponseDTO.filter(item => item !== '__ob__: Observer');
      console.log(this.processes)
      // this.records = response.data.result.stepSampleKitResponseDTO
        this.isAU='Update'
      })
    }
    ,
    editProcess(id)
    {
      this.isProcessCreating=true
      this.creat=true
      this.processBtnText='Update Process'
      ProcessServices.getById(id).then((response)=>{
        this.formProcess.setFieldsValue({
          name: response.data.name,
          id: response.data.id,
          isPublishable:response.data.isPublishedable
        });
      })
    },
    deleteProcess(id)
    {
      ProcessServices.deleteByProcessId(id).then((response)=>{
        this.fetchProcess()
      })
    },
    checkval(itm){
      this.notEmpty = false
      document.getElementById('no'+itm).style.display = "block"
    },
    checkvalOk(itm){
      this.notEmpty = true
      document.getElementById('no'+itm).style.display = "none"
    },
    onSubmitStep(e) {
      e.preventDefault()
      const collectedData = this.processes.map((item,index) => {
          return item.item === ""
            ?  this.checkval(index)
              :{
                item: item.item,
              }
        });
        console.log(collectedData)
        if(this.notEmpty){
        this.stepForm.validateFields((err, values) => {
        console.log(values)
        if(values.isProcess === true || values.isSampleKit === true || values.isStorage === true){
          if (!err) {
            this.loading = true
            this.stepBtnLoading = true
            values.stepProcessRequestDTO = this.processes
            // values.stepSampleKitRequestDTO = this.records
            values.projectId = this.pid
            if(!this.isCreatedStep)
            {
              StepServices.create(values).then((response) => {
                this.fetchProcess()
                this.visibleModelStep(false)
                this.stepForm.resetFields()
                // this.getByProcessId(this.processId)
                this.stepBtnLoading = false
                this.loading = false
                this.isCheckedSampleKit = false
                this.isCheckedProcess = false
                this.processes =[]
                this.records = []
                this.activeTab = response.data.result.processId
              })
            }
            else{

              StepServices.updateStep(values).then((response) => {
                this.fetchProcess()
                // this.getByProcessId(this.processId)
                this.stepBtnLoading = false
                this.loading = false
                this.stepForm.resetFields()
                this.isAU='Add Step'
                this.isCreatedStep = false
                this.visibleModelStep(false)
              })
            }
            }
          }
          else if((values.isProcess === undefined  && values.isSampleKit === undefined  && values.isStorage === undefined)||(values.isProcess === false  && values.isSampleKit === false  && values.isStorage === false) ){
                  StepServices.checkStepWithStage(this.processId , this.sendIsShow).then((response)=>{
                  if(response.data === true)
                  {
                    if(this.isAU !=='Update' || this.proc === false || this.samKit === false || this.storage === false)
                    {
                    this.visibleConfirm = true
                    }
                  }
                  else if(response.data === false){
                          if (!err) {
                          this.loading = true
                          this.stepBtnLoading = true
                          values.stepProcessRequestDTO = this.processes
                          // values.stepSampleKitRequestDTO = this.records
                          values.projectId = this.pid
                          if(!this.isCreatedStep)
                          {
                            StepServices.create(values).then((response) => {
                              this.visibleModelStep(false)
                              this.stepForm.resetFields()
                              // this.getByProcessId(this.processId)
                              this.stepBtnLoading = false
                              this.loading = false
                              this.isCheckedSampleKit = false
                              this.isCheckedProcess = false
                              this.processes =[]
                              this.records = []
                              this.activeTab = response.data.result.processId
                              this.fetchProcess()
                            })
                          }
                          else{

                            StepServices.updateStep(values).then((response) => {
                              this.fetchProcess()
                              // this.getByProcessId(this.processId)
                              this.stepBtnLoading = false
                              this.loading = false
                              this.stepForm.resetFields()
                              this.isAU='Add Step'
                              this.isCreatedStep = false
                              this.visibleModelStep(false)
                            })
                          }
                          } 
                           
                  }
                })
              }
          }
        )
        .catch(this.error)
        }
    },
    getSoftwareById(id){
      this.loading = true
      SoftwareServices.getById(id).then((resp)=>{
        this.softwareForm.setFieldsValue({
          softwareId:resp.data.softwareId,
          softwareName: resp.data.softwareName
        })
        this.isAS='Update'
        this.isCreatedSoftware = true
      }).catch(this.error)
      .finally(this.loading = false)
    },
    getEquipmentById(id){
      this.loading = true
      EquipmentServices.getById(id).then((resp)=>{
        this.equipmentForm.setFieldsValue({
          equipmentId:resp.data.equipmentId,
          equipmentName:resp.data.equipmentName
        })
        this.isCreatedEquipment = true
      }).catch(this.error)
      .finally(this.loading = false)
    },
    deleteSoftware(id){
      this.loading = true
      SoftwareServices.softDelete(id).then((resp)=>{
        success(this, { message: resp.data })
        this.fetchSoftware()
      }).catch(this.error)
      .finally(this.loading = false)
    },
    deleteEquipment(id){
      this.loading = false
      EquipmentServices.softDelete(id).then((resp)=>{
        success(this, { message: resp.data })
        this.fetchEquipments()
      }).catch(this.error)
      .finally(this.loading = false)
    },
    getByProcessId(id) {
      StepServices.getByProcessId(id).then((response) => {
        this.steps = response.data
      })
    },
    fetchSoftware() {
      SoftwareServices.get()
        .then((response) => {
          this.softwares = response.data
        })
        .catch(this.error)
    },
    fetchEquipments() {
      EquipmentServices.get()
        .then((response) => {
          this.equipments = response.data
        })
        .catch(this.error)
    },
    getSOP() {
      SOPServices.get().then((response) => {
        this.dummyData = response.data
      })
    },
    getProcessById(id) {
      ProcessServices.getById(id).then((response) => {
        this.processId = response.data.id
        this.getByProcessId(response.data.id)
      })
    },
    handleCheck(isCheck, id) {
      this.isEmptySOP = false
      this.pushListArray(isCheck, id)
    },
    pushListArray(valu, rowId) {
      const a = this.sopList.includes(rowId)
      if (a === false) {
        if (valu === true) {
          this.sopList.push(rowId)
        }
      } else if (valu === false) {
        this.sopList.splice(this.sopList.indexOf(rowId), 1)
      }
    },
    createProjectSoftware(){
        // 
    },
    fetchProcess()
    {
      ProcessServices.getAllProcess(this.pid).then((response)=>{
        this.processData=response.data
        if(response.data.length!==0)
        {
          // if(this.isCreated === true)
          // {
          // this.activeTab = response.data[response.data.length - 1].processId
          // }
          // else{
            if(this.activeTab===0){
            this.activeTab = response.data[0].processId
            }
          // }
        this.isRegister = response.data[0].isRegistered
        this.statusProcess = response.data[0].statusName
        
        }
      })
    },
    fetchSwapProcess(dat)
    {
      this.processData = dat
      this.isStaged=true
    },
    updateStages()
    {
      this.stageAndIdArray = this.processData.map(item => ({
        id: item.processId,
        stageNo: item.stageNo
      }));
      ProcessServices.updateSatges(this.stageAndIdArray).then((response)=>{
        this.isStaged=false
        this.fetchProcess()
      })
    },
    processCreating(val)
    {
      this.creat=false
      this.processBtnText='Add New Process'
      this.isProcessCreating = val
    },
    onSubmitReject(e)
    {
      e.preventDefault()
      this.rejectForm.validateFields((err, values) => {
          if (!err) {
            this.loading = true
            this.rejectBtnLoading = true
            const formData=new FormData()
            for (const key in values) {
            formData.append(key, values[key])
            }
            formData.append('projectGuid', this.pId)
            console.log(formData)
            ProcessServices.processApproval(formData).then((response)=>{
            
          })
            }
            }
        )
        .catch(this.error)
    },
    completeProcess(){
      if(this.sopList.length === 0)
      {
        this.isEmptySOP = true
      }else{
        this.loading = true
        const data = JSON.parse(JSON.stringify({projectId: this.pid, sops: this.sopList}))
        // const formData = new FormData()
        // formData.append('sops',[this.sopList])
        // formData.append('processId', this.processId)
        ProjectSOPServices.create(data).then((response)=>{
            this.loading = false
            this.goto('/projects')
        }).catch(this.error)
      }
    },
    sendApprovalToManager()
    {
      ProcessServices.sendProcessApprovalManager(this.pid).then((response)=>{
        this.fetchProcess()
      })
    },
    eSignature()
    {
      this.visibleSignature = true
    },

    handleSignatureOk() {
      this.visibleSignature = false
      this.sendApprovalToManager()
    },
    handleSignatureCancel(){
      this.visibleSignature = false
      this.loading = false
    },
    handleOk() {
      this.handleSignatureCancel()
    },

    isProcessExist(event){
      this.isAlreadyExistProcess = false
        const procName=event.target.value
        ProcessServices.isProcessExist(procName,this.pid).then((response)=>{
          if(response.data.name !== "")
          {
            this.isAlreadyExistProcess = true
            this.$refs.procNam.focus();
          }
        })
    },
    get(){
        SOPServices.get().then((response)=>{
            this.dummyData = response.data
        }).catch(this.error)
        } 
  },
}
</script>