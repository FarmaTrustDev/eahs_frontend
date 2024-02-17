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
              'name',
              {
                initialValue: entity.JudgeName ,
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
          :label="translation.Count_1_657+':*'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-select
            v-decorator="[
              'countryId',
              {
                initialValue: entity.countryId,
                rules: [
                  {
                    required: true,
                    message: translation.Count_1_657,
                  },
                ],
              },
            ]"
            :get-popup-container="trigger => trigger.parentNode"
            :show-search="true"
            :filter-option="filterOption"
            :placeholder="translation.Count_1_657"
            style="width: 100%"
            size="large"
            class="default-select"
            @search="searchCountries"
          >
            <a-select-option v-for="country in countries" :key="country.id">
              {{ country.name }}
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
          label="Is Eahs Rule"
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
        <a-col :span="4" >
            <h3 style="margin-top: 5px;">Upload Flag Image</h3>
        </a-col>
        <a-col :span="20">
            <!-- <a-button type="primary" class="hgtBtn"  @click="showModal(true)">Upload Document</a-button> -->
            <Upload
            :default-file-list="entity.countryFlag"
            :extensions="allowedExtensions"
            @handleChange="handleChange"
          />
            <!-- <a-button  class="hgtBtn" style="background-color: #3869d1;color:white"> <a-icon type="upload"  /> Upload Document </a-button> -->
            
        </a-col>

        
      <a-col :span="24">      
      <a-form-item
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 22 }"      
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
import { _disabledFutureDate } from '~/services/Helpers/MomentHelpers'
import { filterOption, isEmpty } from '~/services/Helpers'
import CountryServices from '~/services/API/CountryServices'
import { PICTURE_UPLOAD_EXTENSIONS } from '~/services/Constant'
import Upload from '~/components/upload/userUpload'

export default {
  components: { Upload },
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
    translation() {
      return this.$store.getters.getTranslation
    },
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
