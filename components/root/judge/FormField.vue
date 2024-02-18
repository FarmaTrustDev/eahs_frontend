<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-form-item
          label="Judge Name"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'judgeName',
              {
                initialValue: entity.judgeName ,
                rules: [
                  {
                    required: true,
                    message: 'Judge Name',
                  },
                ],
              },
            ]"
            placeholder="judge"
          /> </a-form-item
      ></a-col> 
              
      <a-col :span="12">
        <a-form-item
          label="Country Name"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-select
            v-decorator="[
              'countryName',
              {
                initialValue: entity.countryName,
                rules: [
                  {
                    required: true,
                    message: 'required',
                  },
                ],
              },
            ]"
            :get-popup-container="trigger => trigger.parentNode"
            :show-search="true"
            placeholder="Select Country"
            style="width: 100%"
            size="large"
            class="default-select"
            @search="searchCountries"
          >
            <a-select-option v-for="country in countries" :key="country.name">
               <a-avatar :src="country.flagPath" :size="40" /> {{ country.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12" >
              <a-form-item 
                label="Has Conflict of Interest"
                :label-col="{ span: 10 }"
                :wrapper-col="{ span: 14 }"
                class="pt-3">
                        <a-switch 
                            v-decorator="[
                            'isConflict',
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

      <a-col :span="12" >
        <a-form-item 
          label="Is Eahs Member"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
          class="pt-3">
                  <a-switch 
                      v-decorator="[
                      'isMember',
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
        

        
      <a-col :span="24">      
      <a-form-item
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 22 }"      
      >
        <FormActionButton
          :is-created="isCreated"
          :loading="loading"
          custom-text="Save"
        />
      </a-form-item>
      </a-col>      
    </a-row>
  </div>
</template>

<script>
import { _disabledFutureDate } from '~/services/Helpers/MomentHelpers'
import { filterOption, isEmpty } from '~/services/Helpers'
import CountryServices from '~/services/API/CountryServices'
import { PICTURE_UPLOAD_EXTENSIONS } from '~/services/Constant'
import imagesHelper from '~/mixins/images-helper'

export default {
  components: { },
  mixins: [ imagesHelper],
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
  },
  data() {
    return {
      entityId: null,
      userRoleId: 0,
      loading: false,
      countries: [],
      fileList:[],
      fetchCountry: true,
      formLayout: 'vertical',
      allowedExtensions:PICTURE_UPLOAD_EXTENSIONS,
      newSelected: false,
      defaultImage: true,
    }
  },
  mounted() {
    this.getCountries()
  },
  updated() {
    if (this.isCreated && this.fetchCountry && !isEmpty(this.entity)) {
      this.getCountries()
      this.fetchCountry=false
    }
  },
  computed:{
   
  },
  methods: {
    filterOption,
    disabledDate: _disabledFutureDate,
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
    removeQuotes(img){
        if(!isEmpty(img)){
          return img.replace(/"/g, '')
        }
      },
    handleChange(info){
      // console.log(info)
      this.fileList = info
      this.$emit('handleChangeImage', this.fileList)
    },
    /* handleChangeImage(info) {
      console.log(info)
      this.fileList = info
      this.$emit('handleChangeImage', this.fileList)
    }, */
    searchCountries(name, b) {
      this.fetchCountries({ name })
    },
  },
}
</script>
