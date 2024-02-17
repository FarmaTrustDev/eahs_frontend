<template>
  <div>
    <a-row>
      <a-col :span="24">
        <a-form-item
          label="Group Name:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-input
            v-decorator="[
              'Name',
              {
                rules: [
                  {
                    required: true,
                    message: 'required!',
                  },
                ],
              },
            ]"
            placeholder="Group Name"
          /> </a-form-item
      ></a-col>
      <a-col :span="24">
        <a-form-item
          label="Group Image:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <Upload
            :default-file-list="[]"
            :extensions="allowedExtensions"
            @handleChange="getImage"
        /></a-form-item>
      </a-col>
    </a-row>
    <a-row class="mb-15">
      <a-col :span="24">
        <a-button type="primary" @click="addRow"
          >+ {{ translation.AddOrgan_2_3 }}</a-button
        >
      </a-col>
    </a-row>
    <a-row v-for="(org, index) in organizationKeys" :key="org.id" :gutter="16">
      <a-col :span="11">
        <a-form-item
          label="Organizations Type:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-select
            v-decorator="[
              `[organizationType]${index}`,
              {
                rules: [
                  {
                    required: true,
                    message: 'required!',
                  },
                ],
              },
            ]"
            class="w-100"
            @change="(e) => handleOrganizationType(e, org.id)"
          >
            <a-select-option
              v-for="orgType in organizationTypes"
              :key="orgType.id"
              >{{ orgType.name }}</a-select-option
            >
          </a-select>
        </a-form-item></a-col
      >
      <a-col :span="11">
        <a-form-item
          label="Organizations:"
          :label-col="{ span: 24 }"
          :wrapper-col="{ span: 22 }"
        >
          <a-select
            v-decorator="[
              `OrganizationsId[${index}]`,
              {
                rules: [
                  {
                    required: true,
                    message: 'required!',
                  },
                ],
              },
            ]"
            class="w-100"
          >
            <a-select-option
              v-for="orgType in organizations[org.id]"
              :key="orgType.id"
              >{{ orgType.name }}</a-select-option
            >
          </a-select>
        </a-form-item></a-col
      >
      <a-col :span="2">
        <a-button type="danger" @click="removeRow(org.id)">-</a-button></a-col
      >
    </a-row>
  </div>
</template>

<script>
import Upload from '~/components/upload/profile'
import { DOCUMENT_EXTENSIONS } from '~/services/Constant'
import OrganizationTypeServices from '~/services/API/OrganizationTypeServices'
import { isEmpty } from '~/services/Utilities'
export default {
  components: { Upload },
  data() {
    return {
      allowedExtensions: DOCUMENT_EXTENSIONS,
      currentId: 0,
      organizationKeys: [],
      organizationTypes: [],
      organizations: {},
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  mounted() {
    this.fetchOrganization()
  },
  methods: {
    getImage(files) {
      if (!isEmpty(files)) {
        this.$emit('getImage', files)
      }
    },
    generateUuid() {
      this.currentId = this.currentId + 1

      return `uuid-${this.currentId}`
    },
    addRow() {
      this.organizationKeys = [
        ...this.organizationKeys,
        { id: this.generateUuid() },
      ]
    },
    removeRow(id) {
      const org = this.organizationKeys
      this.organizationKeys = org.filter((o) => o.id !== id)
    },
    fetchOrganization() {
      OrganizationTypeServices.get({ withOrganization: true }).then(
        (response) => {
          this.organizationTypes = response.data
        }
      )
    },
    handleOrganizationType(id, key) {
      const typeOrg = this.organizationTypes.find((orgKey) => orgKey.id === id)

      let organization = this.organizations
      organization[key] = typeOrg.organizations
      organization = JSON.stringify(organization)
      this.organizations = JSON.parse(organization)
    },
  },
}
</script>
