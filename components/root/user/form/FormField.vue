<template>
  <div>
    <a-row>
      <a-row>
      <a-col :span="12">
        <a-form-item
          :label="translation.FirstName_2_420 + '*:'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'firstName',
              {
                initialValue: entity.firstName,
                rules: [
                  {
                    required: true,
                    message: 'Please input your first name',
                  },
                  {
                    pattern: /^[a-z&A-Z]+$/,
                    message: 'Please enter a valid name'
                  }
                ],
              },
            ]"
            :placeholder="translation.FirstName_2_420"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation.LastName_2_422 + '*:'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'lastName',
              {
                initialValue: entity.lastName,
                rules: [
                  {
                    required: true,
                    message: 'Please input your last name',
                  },
                  {
                    pattern: /^[a-z&A-Z]+$/,
                    message: 'Please enter a valid name'
                  }
                ],
              },
            ]"
            :placeholder="translation.LastName_2_422"
          />
        </a-form-item>
      </a-col>
      </a-row>
      <a-row>
      <a-col :span="12">
        <a-form-item
          :label="translation.EmailAddre_2_140 + '*:'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-model="email"
            v-decorator="[
              'email',
              {
                initialValue: entity.email,
                rules: [
                  {
                    required: true,
                    message: 'Please input your email',
                  },
                ],
                
              },
            ]"
            type="email"
            :placeholder="translation.EmailAddre_2_140"
            :disabled="isCreated"
          /></a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation.Usern_1_400 + '*:'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'userName',
              {
                initialValue: entity.userName,
                rules: [
                  {
                    required: true,
                    message: 'Please input your usrename',
                  },
                ],
              },
            ]"
            :disabled="isCreated"
            :placeholder="translation.Usern_1_400"
          />
        </a-form-item>
      </a-col>
      </a-row>
      <a-col :span="24">
        <a-form-item
          :label="translation.OfficAddre_2_428"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 23 }"
        >
          <a-input
            v-decorator="[
              'address',
              {
                initialValue: entity.address,
                rules: [
                  {
                    required: false,
                    message: 'Please input your office address',
                  },
                ],
              },
            ]"
            :placeholder="translation.OfficAddre_2_428"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation.ContaNumbe_2_430"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'phone',
              {
                initialValue: entity.phone,
                rules: [
                  {
                    required: true,
                    message: 'Please input your contact number',
                  },
                ],
              },
            ]"
            type="number"
            :placeholder="translation.ContaNumbe_2_430"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation.What3_1_432 + ':'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'what3Words',
              {
                initialValue: entity.what3Words,
                rules: [
                  {
                    required: false,
                    message: 'Please input your what3words',
                  },
                ],
              },
            ]"
            :placeholder="translation.What3_1_432"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Department*:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'department',
              {
                initialValue: entity.department,
                rules: [
                  {
                    required: true,
                    message: 'Please input your department',
                  },
                  {
                    pattern: /^[a-z&A-Z]+$/,
                    message: 'Please enter a valid name'
                  }
                ],
              },
            ]"
            placeholder="Department"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Image:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
          class="pb-0"
        >
          <Upload
            :default-file-list="entity.profileImageUrl"
            :extensions="allowedExtensions"
            @handleChange="handleChange"
          />
        </a-form-item>
      </a-col>
      <div v-if="users.name === 'Super Admin'">
      <a-col :span="4">
        <!-- :default-value=""  -->
        <label>User Group*:</label>
      </a-col>
      <a-col :span="20">
        <a-form-item>
        <a-radio-group 
            v-decorator="[
              'organizationTypeId',
              {
                initialValue: entity.organizationTypeId,
                rules: [
                  {
                    required: false,
                    message: 'Please select organization type',
                  },
                ],
              },
            ]"
             >
            <a-radio v-for=" orgType in organizationTypes" :key="orgType.id" :value="orgType.id" @change="onChange(orgType)">
              {{orgType.name}}
            </a-radio>
        </a-radio-group>
        </a-form-item>
      </a-col>
      
      <a-col :span="10">
        <a-form-item label="Entities">
          <a-select
          v-decorator="[
              'organizationId',
              {
                initialValue: entity.organizationId,
                rules: [
                  {
                    required: false,
                    message: 'Please select organization',
                  },
                ],
              },
            ]"
            placeholder="Entities"
          >
            <a-select-option v-for="org in organization" :key="org.id">
              {{ org.name }}
            </a-select-option>
          </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="2"></a-col>
      <!-- <a-col :span="10">
        <a-form-item
          label="Roles"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 23 }"
        >
          <a-select
            v-decorator="[
              'role',
              {
                initialValue: entity.roleId,
                rules: [
                  {
                    required: true,
                    message: 'Please select your role',
                  },
                ],
              },
            ]"
            :show-search="true"
            :filter-option="filterOption"
            :placeholder="translation.Roles_1_442"
            style="width: 100%"
            size="large"
            class="default-select"
            @search="searchCountries"
          >
            <a-select-option v-for="role in roles" :key="role.id">
              {{ role.name }}
            </a-select-option>
          </a-select>
          <a-input
            v-decorator="[
              'userRoleId',
              {
                initialValue:
                  entity.userRoleId == undefined ? 0 : entity.userRoleId,
                rules: [
                  {
                    required: false,
                    message: 'Please input your role',
                  },
                ],
              },
            ]"
            type="hidden"
          />
        </a-form-item>
      </a-col> -->
      <a-col :span="10">
        <a-form-item
          :label="translation.Roles_1_442 + '*:'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 23 }"
        >
          <a-select
            v-decorator="[
              'roleId',
              {
                initialValue: entity.roleId,
                rules: [
                  {
                    required: true,
                    message: 'Please select your role',
                  },
                ],
              },
            ]"
            :show-search="true"
            :filter-option="filterOption"
            :placeholder="translation.Roles_1_442"
            style="width: 100%"
            size="large"
            class="default-select"
            @search="searchCountries"
          >
            <a-select-option v-for="role in roles" :key="role.id">
              {{ role.name }}
            </a-select-option>
          </a-select>
          <a-input
            v-decorator="[
              'userRoleId',
              {
                initialValue:
                  entity.userRoleId == undefined ? 0 : entity.userRoleId,
                rules: [
                  {
                    required: false,
                    message: 'Please input your role',
                  },
                ],
              },
            ]"
            type="hidden"
          />
        </a-form-item>
      </a-col>
      </div>
      <a-col v-else :span="24">
        <a-form-item
          :label="translation.Roles_1_442 + '*:'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 23 }"
        >
          <a-select
            v-decorator="[
              'roleId',
              {
                initialValue: entity.roleId,
                rules: [
                  {
                    required: true,
                    message: 'Please select your role',
                  },
                ],
              },
            ]"
            :show-search="true"
            :filter-option="filterOption"
            :placeholder="translation.Roles_1_442"
            style="width: 100%"
            size="large"
            class="default-select"
            @search="searchCountries"
          >
            <a-select-option v-for="role in roles" :key="role.id">
              {{ role.name }}
            </a-select-option>
          </a-select>
          <a-input
            v-decorator="[
              'userRoleId',
              {
                initialValue:
                  entity.userRoleId == undefined ? 0 : entity.userRoleId,
                rules: [
                  {
                    required: false,
                    message: 'Please input your role',
                  },
                ],
              },
            ]"
            type="hidden"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation.Postc_1_444 + ':'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'postcode',
              {
                initialValue: entity.postCode,
                rules: [
                  {
                    required: false,
                    message: 'Please input your postcode',
                  },
                ],
              },
            ]"
            :placeholder="translation.Postc_1_444"
            @blur="fetchCountryByPostCode"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation['City_1_446'] + '*:'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'city',
              {
                initialValue: entity.city,
                rules: [
                  {
                    required: true,
                    message: 'Please input your city',
                  },
                  {
                    pattern: /^[a-z&A-Z]+$/,
                    message: 'Please enter a valid city name'
                  }
                ],
              },
            ]"
            placeholder="City"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item
          :label="translation.Locat_1_448 + ':'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 23 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'location',
              {
                initialValue: entity.location,
                rules: [
                  {
                    required: false,
                    message: 'Please input your location',
                  },
                ],
              },
            ]"
            :placeholder="translation.Locat_1_448"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item
          :label="translation.PostaAddre_2_450"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 23 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'address',
              {
                initialValue: entity.address,
                rules: [
                  {
                    required: false,
                    message: 'Please input your postal address',
                  },
                ],
              },
            ]"
            :placeholder="translation.PostaAddre_2_450"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation['Count_1_657'] + '*:'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
          class="pb-0"
        >
          <a-input
            v-decorator="[
              'County',
              {
                initialValue: entity.county,
                rules: [
                  {
                    required: true,
                    message: 'Please input your county',
                  },
                  {
                    pattern: /^[a-z&A-Z]+$/,
                    message: 'Please enter a valid county name'
                  }
                ],
              },
            ]"
            placeholder="County"
          />
        </a-form-item>
      </a-col>

      <a-col :span="12">
        <a-form-item
          :label="translation['Count_1_49'] + '*:'"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-select
            v-decorator="[
              'countryId',
              {
                initialValue: entity.countryId,
                rules: [
                  {
                    required: true,
                    message: 'Please select your country',
                  },
                ],
              },
            ]"
            :show-search="true"
            :filter-option="filterOption"
            :placeholder="translation.Count_1_49"
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
    </a-row>
  </div>
</template>

<script>
import UserServices from '~/services/API/UserServices'
import { _disabledFutureDate } from '~/services/Helpers/MomentHelpers'
import { filterOption,isEmpty } from '~/services/Helpers'
import CountryServices from '~/services/API/CountryServices'
import RoleServices from '~/services/API/RoleServices'
import Upload from '~/components/upload/profile'
import { PICTURE_UPLOAD_EXTENSIONS } from '~/services/Constant'
import MapServices from '~/services/API/MapServices'
import nullHelper from '~/mixins/null-helpers'
import OrganizationTypeServices from '~/services/API/OrganizationTypeServices'
import OrganizationServices from '~/services/API/OrganizationServices'
export default {
  components: { Upload },
  mixins: [nullHelper],
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
      roles: [],
      fetchCountry: true,
      fetchRole: true,
      formLayout: 'vertical',
      apiService: UserServices,
      allowedExtensions: PICTURE_UPLOAD_EXTENSIONS,
      newSelected: false,
      defaultImage: true,
      fileList: [],
      city:'',
      location:'',
      county:'',
      userData:[],
      countId:this.entity.countryId,
      email:'',
      organizationTypes:[],
      organization:[]
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
    entity(newValue, oldValue)
    {
      if(newValue !== oldValue)
      {
        this.getRolebyId(newValue.organizationTypeId)
        this.getOrganizationByAlias(newValue.organizationTypeAlias)
      }
    }
  },
  mounted() {
    this.getRoles()
    this.fetchCountries()
    this.getOrganizationsType()
  },
  updated() {
    if (this.isCreated && this.fetchCountry) {
      if (this.isGuid(this.$route.params.id)) {
        this.fetch(this.$route.params.id)
        this.fetchCountry = false
      }
    }
    if (this.isCreated && this.fetchRole) {
      this.fetchRole = false
      this.getRoles()
    }
  },
  methods: {
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
          this.fetchCountries({ Ids: [this.userData.countryId] })
        })
        .finally(() => (this.loading = false))
    },    
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
    fetchRoles(params = {}) {
      RoleServices.get(params).then((response) => {
        this.roles = response.data
      })
    },
    getCountries() {
      if (this.entity.countryId!==undefined && this.isCreated) {
        this.fetchCountries({ Ids: [this.entity.countryId] })
      } else {
        this.fetchCountries()
      }
    },
    getRoles() {
      if (this.isCreated && this.users.name !== 'Super Admin') {
          this.fetchRoles({ Ids: [this.entity.roleId] })
      } else {
        this.fetchRoles()
      }
    },
    searchCountries(name, b) {
      this.fetchCountries({ name })
    },
    searchRoles(name, b) {
      this.fetchRoles({ name })
    },
    fetchCountryByPostCode(e) {
      MapServices.fetchCountryByPostCode(e.target.value).then((response) => {
        let name = ''
        this.form.setFieldsValue({
          city: response.result.cityName,
          County: response.result.countyName,
          location: response.result.location
        })
        name= response.result.countryName
        this.searchCountries(name,'b')
      })
    },
    getRolebyId(Id)
    {
      RoleServices.getRolesById(Id).then((response)=>{
        this.roles = response.data
      })
    },
    getOrganizationByAlias(e)
    {
          OrganizationServices.get({ organizationTypeAlias: e })
        .then((response) => {
        this.organization = response.data
        })
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
