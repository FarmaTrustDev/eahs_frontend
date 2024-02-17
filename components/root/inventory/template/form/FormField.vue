<template>
    <div>
      <a-row>
        <a-col :span="24">
          <a-form-item
            label="Template Ttile:*"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 23 }"
          >
            <a-input
              v-decorator="[
                'title',
                {
                  initialValue: entity.title,
                  rules: [
                    {
                      required: true,
                      message: 'Template title',
                    },
                  ],
                },
              ]"
              placeholder="Template Ttile"
            /> </a-form-item
        ></a-col>
        <a-col :span="24">
          <a-form-item
            label="Description:*"
            :label-col="{ span: 24 }"
            :wrapper-col="{ span: 23 }"
          >
            <a-input
              v-decorator="[
                'description',
                {
                  initialValue: entity.description,
                  rules: [
                    {
                      required: true,
                      message: 'Description',
                    },
                  ],
                },
              ]"
              
              placeholder="Description"
            /> 
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <div v-if="isLabelListEmpty">
            <span class="ant-col ant-col-20 sel-validation" >Please select keys</span>
          </div>
          <br>
          <div>Select the Keys for the Labels</div>
          <div class="ant-col ant-col-11 mt-10 mb-10 consentClass" v-for="state,index in switchState" :key="index">
            <a-row >
              <a-col :lg="{span:4}" :md="{span:2}"  :sm="{span:2}" :xs="{span:2}">
                <div  class="ml-10" >
                  <a-switch class="mt4 toggle_record"
                        data-rowId="1"
                        :checked="checkedList.includes(state.key)"
                        size="large"
                        checked-children="Yes"
                        un-checked-children="No"
                        @change="(value) => handleCheck(value, state.key,state.label)"
                    />
                </div>
              </a-col>
              <a-col :lg="{span:15}" :md="{span:10}" :sm="{span:8}" :xs="{span:10}">
                <div class="pt-3"><h3>{{ state.label }}</h3></div>
              </a-col>
            </a-row>
          </div>
          <!-- <div class="ant-col ant-col-3 mt-10 mb-10"></div>
          <div class="ant-col ant-col-10 mt-10 mb-10 consentClass" >
            <a-row >
              <a-col :lg="{span:4}" :md="{span:2}" :sm="{span:2}" :xs="{span:2}">
                <div  class="ml-10" >
                  <a-switch class="mt4 toggle_record"   
                        v-decorator="[
                        'cOI',
                        {
                            rules: [],
                            valuePropName: 'checked',
                        },
                        ]"
                        v-model="switchState.cOI"
                        data-rowId="2"
                        size="large"
                        checked-children="Yes"
                        un-checked-children="No"
                        @change="(value) => handleCheck(value, 'cOI','COI')"
                    />
                </div>
              </a-col>
              <a-col :lg="{span:15}" :md="{span:10}" :sm="{span:8}" :xs="{span:10}">
                <div class="pt-3"><h3>COI</h3></div>
              </a-col>
            </a-row>
          </div>
          <div class="ant-col ant-col-10 mt-10 mb-10 consentClass">
            <a-row>
              <a-col :lg="{span:4}" :md="{span:2}" :sm="{span:2}" :xs="{span:2}">
                <div  class="ml-10" >
                  <a-switch class="mt4 toggle_record"   
                        v-decorator="[
                        'expirayDate',
                        {
                            rules: [],
                            valuePropName: 'checked',
                        },
                        ]"
                        data-rowId="3"
                        size="large"
                        checked-children="Yes"
                        un-checked-children="No"
                        @change="(value) => handleCheck(value, 'expiryDate','Expiry Date')"
                    />
                </div>
              </a-col>
              <a-col :lg="{span:15}" :md="{span:10}" :sm="{span:8}" :xs="{span:10}">
                <div class="pt-3"><h3>Expiry Date</h3></div>
              </a-col>
            </a-row>
          </div>
          <div class="ant-col ant-col-3 mt-10 mb-10"></div>
          <div class="ant-col ant-col-10 mt-10 mb-10 consentClass">
            <a-row>
              <a-col :lg="{span:4}" :md="{span:2}" :sm="{span:2}" :xs="{span:2}">
                <div  class="ml-10" >
                  <a-switch class="mt4 toggle_record"   
                        v-decorator="[
                        'lotNo',
                        {
                            rules: [],
                            valuePropName: 'checked',
                        },
                        ]"
                        data-rowId="4"
                        size="large"
                        checked-children="Yes"
                        un-checked-children="No"
                        @change="(value) => handleCheck(value, 'lotNo','LOT')"
                    />
                </div>
              </a-col>
              <a-col :lg="{span:15}" :md="{span:10}" :sm="{span:8}" :xs="{span:10}">
                <div class="pt-3"><h3>LOT</h3></div>
              </a-col>
            </a-row>
          </div>
          <div class="ant-col ant-col-10 mt-10 mb-10 consentClass">
            <a-row>
              <a-col :lg="{span:4}" :md="{span:2}" :sm="{span:2}" :xs="{span:2}">
                <div  class="ml-10" >
                  <a-switch class="mt4 toggle_record"   
                        v-decorator="[
                        'clientId',
                        {
                            rules: [],
                            valuePropName: 'checked',
                        },
                        ]"
                        data-rowId="5"
                        size="large"
                        checked-children="Yes"
                        un-checked-children="No"
                        @change="(value) => handleCheck(value, 'clientId','Client')"
                    />
                </div>
              </a-col>
              <a-col :lg="{span:15}" :md="{span:10}" :sm="{span:8}" :xs="{span:10}">
                <div class="pt-3"><h3>Client</h3></div>
              </a-col>
            </a-row>
          </div>
          <div class="ant-col ant-col-3 mt-10 mb-10"></div>
          <div class="ant-col ant-col-10 mt-10 mb-10 consentClass">
            <a-row>
              <a-col :lg="{span:4}" :md="{span:2}" :sm="{span:2}" :xs="{span:2}">
                <div  class="ml-10" >
                  <a-switch class="mt4 toggle_record"   
                        v-decorator="[
                        'siteId',
                        {
                            rules: [],
                            valuePropName: 'checked',
                        },
                        ]"
                        data-rowId="6"
                        size="large"
                        checked-children="Yes"
                        un-checked-children="No"
                        @change="(value) => handleCheck(value, 'siteId','Address')"
                    />
                </div>
              </a-col>
              <a-col :lg="{span:15}" :md="{span:10}" :sm="{span:8}" :xs="{span:10}">
                <div class="pt-3"><h3>Address</h3></div>
              </a-col>
            </a-row>
          </div>
          <div class="ant-col ant-col-10 mt-10 mb-10 consentClass">
            <a-row>
              <a-col :lg="{span:4}" :md="{span:2}" :sm="{span:2}" :xs="{span:2}">
                <div  class="ml-10" >
                  <a-switch class="mt4 toggle_record"   
                        v-decorator="[
                        'projectId',
                        {
                            rules: [],
                            valuePropName: 'checked',
                        },
                        ]"
                        data-rowId="7"
                        size="large"
                        checked-children="Yes"
                        un-checked-children="No"
                        @change="(value) => handleCheck(value, 'projectId','Project ID')"
                    />
                </div>
              </a-col>
              <a-col :lg="{span:15}" :md="{span:10}" :sm="{span:8}" :xs="{span:10}">
                <div class="pt-3"><h3>Project</h3></div>
              </a-col>
            </a-row>
          </div>
          <div class="ant-col ant-col-3 mt-10 mb-10"></div>
          <div class="ant-col ant-col-10 mt-10 mb-10 consentClass">
            <a-row>
              <a-col :lg="{span:4}" :md="{span:2}" :sm="{span:2}" :xs="{span:2}">
                <div  class="ml-10" >
                  <a-switch class="mt4 toggle_record"   
                        v-decorator="[
                        'idealTemprature',
                        {
                            rules: [],
                            valuePropName: 'checked',
                        },
                        ]"
                        data-rowId="8"
                        size="large"
                        checked-children="Yes"
                        un-checked-children="No"
                        @change="(value) => handleCheck(value, 'idealTemprature','Temprature')"
                    />
                </div>
              </a-col>
              <a-col :lg="{span:15}" :md="{span:10}" :sm="{span:8}" :xs="{span:10}">
                <div class="pt-3"><h3>Temperature</h3></div>
              </a-col>
            </a-row>
          </div> -->
        </a-col>
        <a-col :span="24">      
        <a-form-item
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 23 }"      
        >
          <FormActionButton
            :is-created="isCreated"
            :loading="loading"
            :custom-text="translation['Save&_3_453']"
          />
        </a-form-item>
        </a-col>      
      </a-row>
    </div>
  </template>
  
  <script>
  // import { filterOption, isEmpty } from '~/services/Helpers'
  // import CountryServices from '~/services/API/CountryServices'
  export default {
    props: {
      isCreated: {
        type: Boolean,
        default: false,
      },
      entity: {
        type: Object,
        default: () => ({}),
      },
      form: {
        type: Object,
        default: () => ({}),
      },
      isLabelListEmpty:{
        type:Boolean,
        default: false,
      },
      checkedList:{
        type: Array,
        default: ()=>([])
      }
    },
    data() {
      return {
        entityId: null,
        userRoleId: 0,
        switchState:[
        { id: 1, key: 'name', label: 'Sample Name' },
        { id: 2, key: 'cOI', label: 'COI' },
        { id: 3, key: 'expiryDate', label: 'Expiry Date' },
        { id: 4, key: 'lotNo', label: 'LOT' },
        { id: 5, key: 'clientId', label: 'Client' },
        { id: 6, key: 'siteId', label: 'Address' },
        { id: 7, key: 'projectId', label: 'Project ID' },
        { id: 8, key: 'idealTemprature', label: 'Temprature' },
          ],
        loading: false,
        countries: [],
        fetchCountry: true,
        formLayout: 'vertical',
        newSelected: false,
        defaultImage: true,
        isCreateCheck:false,
        labelList:[],
        // checkedList:[]
      }
    },
    mounted() {
      // if(!isEmpty(this.entity)){
      //   debugger
        
      //   console.log(this.checkedList)
      // }
      // this.getCountries()
    },
  //  updated() {
      // if (this.isCreated && this.fetchCountry && !isEmpty(this.entity)) {
      //   this.getCountries()
      //   this.fetchCountry=false
      // }
     
    // }, 
    computed:{
      translation() {
        return this.$store.getters.getTranslation
      },
    },
    methods: {
      handleCheck(isCheck,key, value)
      {
        this.isCreateCheck=true
        this.handleChange(isCheck,key,value)
        // this.pushListArray(isCheck,key,value)
      },
      handleChange(info,id,AorR) {
        this.$emit('handleChange', info,id,AorR)
      },
      /* handleChange(info,id,AorR) {
        this.$emit('handleChange', isCheck,key,value)
      }, */
      pushListArray(valu, ky, val) {
        const index = this.labelList.findIndex((item) => item.key === ky);
        if(index === -1)
        {
          if(valu === true)
          {
            this.labelList.push({key:ky, value:val})
          }
        }
        else if(valu === false){
          this.labelList.splice(index,1)
        }
        // console.log(this.labelList)
      },
      updateSwitches(data) {
        debugger
      // data.forEach(item => {
      //   this.switchState[item.key] = (this.switchState[item.key].toString() === item.key.toString());
      //   alert(item.key === this.switchState[item.key].toString()) 
      // })
      // console.log(this.switchState)
    },
      /* filterOption,
      fetchCountries(params = {}) {
        CountryServices.get(params).then((response) => {
          this.countries = response.data.data
          if(!isEmpty(params)){
            this.form.setFieldsValue({countryId:this.countries[0].id})
          }
        })
      },
      getCountries() {
        if (this.isCreated) {
          console.log(this.entity)
          this.fetchCountries({ Ids: [this.entity.countryId] })
        } else {
          this.fetchCountries()
        }
      },
      searchCountries(name, b) {
        this.fetchCountries({ name })
      }, */
    },
  }
  </script>
  