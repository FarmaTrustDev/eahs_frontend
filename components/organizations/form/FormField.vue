<template>
  <div>
    <a-row>
      <a-col :span="12">
        <a-form-item
          label="Name"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'name',
              {
                initialValue: organization.name,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Name!',
                  },
                ],
              },
            ]"
            placeholder="Please input your Name"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          label="User Name"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'userName',
              {
                initialValue: organization.userName,
                rules: [
                  {
                    required: true,
                    message: 'Please input your User Name',
                  },
                ],
              },
            ]"
            placeholder="Please input your User Name"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          :label="translation.EmailAddre_2_140"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'email',
              {
                initialValue: organization.email,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Email!',
                  },
                ],
              },
            ]"
            placeholder="Please input your Email"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          :label="Phone_1_63"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
          min="0"
        >
          <a-input
            v-decorator="[
              'phone',
              {
                initialValue: organization.phone,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Phone',
                  },
                ],
              },
            ]"
            placeholder="Please input your Phone"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Address"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
        >
          <a-input
            v-decorator="[
              'address',
              {
                initialValue: organization.address,
                rules: [
                  {
                    required: true,
                    message: 'Please input your Address!',
                  },
                ],
              },
            ]"
            placeholder="Please input your Address"
          /> </a-form-item
      ></a-col>
      <a-col :span="12">
        <a-form-item
          label="Date of Birth"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
          class="pb-0"
        >
          <a-date-picker
            v-decorator="[
              'dob',
              {
                initialValue: organization.dob,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Date of Birth!',
                  },
                ],
              },
            ]"
            :disabled-date="disabledDate"
            style="width: 100%"
            size="large"
          >
          </a-date-picker>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          label="Organization Type"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 21 }"
          class="pb-0"
        >
          <a-select
            v-decorator="[
              'organizationTypeId',
              {
                initialValue: organization.organizationType,
                rules: [
                  {
                    required: true,
                    message: 'Please select your Organization Type!',
                  },
                ],
              },
            ]"
            :loading="typeLoading"
            placeholder="Select Organization Type"
            style="width: 100%"
            size="large"
            class="default-select"
          >
            <a-select-option
              v-for="organization in organizations"
              :key="organization.id"
            >
              {{ organization.name }}
            </a-select-option>
          </a-select></a-form-item
        >
      </a-col>
      <a-col :span="12">
        <!-- image  -->
      </a-col>
    </a-row>
  </div>
</template>

<script>
import OrganizationTypeServicesServices from '~/services/API/OrganizationTypeServices'
import { _disabledFutureDate } from '~/services/Helpers/MomentHelpers'
export default {
  props: {
    organization: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      organizations:[],
      typeLoading: true,
    }
  },
  mounted() {
    this.fetchOrganization()
  },
  methods: {
    disabledDate: _disabledFutureDate,
    fetchOrganization() {
      this.typeLoading = true
      OrganizationTypeServicesServices.get()
        .then((response) => {
          this.organizations = response.data
        })
        .finally(() => (this.typeLoading = false))
    },
    onSubmit() {},
  },
}
</script>
