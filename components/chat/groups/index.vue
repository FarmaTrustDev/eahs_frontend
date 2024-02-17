<template>
  <div>
    <a-table :data-source="data" :loading="loading" :columns="columns" class="rounded-table">
      <template slot="title">
        <a-button type="primary" @click="handleGroupModal(true)">
          {{ translation.CreatGroup_2_479 }}</a-button
        >
      </template>
      <template slot="id" slot-scope="text, record, index">
        {{index +1}}
      </template>
      <template slot="action" slot-scope="text, record">
        <a-button type="primary" @click="getGroup(text, record)"> Message</a-button>
      </template>
      <!-- <template slot="message" slot-scope="text, record">
        <a-button type="" @click="getGroup(text, record)">
          {{ translation.view_1_750 }}</a-button
        >
      </template> -->
    </a-table>
    <a-modal
      :destroy-on-close="true"
      :width="800"
      :visible="groupModal"
      :footer="false"
      :title="translation.CreatGroup_2_479"
      @cancel="handleGroupModal(false)"
    >
      <a-form :form="form" @submit="onSubmit">
        <FormFields @getImage="getImage" />
        <FormActionButton
          :loading="loading"
          :custom-text="translation.CreatGroup_2_479"
          @cancel="handleGroupModal(false)"
        />
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import ChatServices from '~/services/API/ChatServices'
import FormFields from '~/components/chat/groups/FormFields'
import { isEmpty } from '~/services/Utilities'
export default {
  components: { FormFields },
  data() {
    return {
      loading: false,
      groupModal: false,
      data: [],
      columns : [
  {
    title: `S.no`,
    scopedSlots:{customRender:'id'},
    // key: 'id',
    // dataIndex: 'id',
  },
  {
    title: `${this.$store.getters.getTranslation.GroupName_2_150}`,
    dataIndex: 'name',
    key: 'name',
    // scopedSlots: { customRender: 'title' },
  },
  {
    title: `${this.$store.getters.getTranslation.Actio_1_220}`,
    scopedSlots: { customRender: 'action' },
  },
],
      files: [],
      form: this.$form.createForm(this, {
        name: 'createForm',
      }),
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },
  watch:{
    translation(newValues, oldValue){
      if(newValues!==oldValue){
        this.columns[1].title=newValues.Name_1_138
        this.columns[2].title=newValues.Actio_1_220
      }
    }
  },  
  mounted() {
    this.fetch()
  },
  methods: {
    fetch() {
      this.loading = true
      ChatServices.fetchGroup()
        .then((response) => {
          this.data = response.groups
        })
        .finally(() => (this.loading = false))
    },
    handleGroupModal(show) {
      this.groupModal = show
    },
    getImage(files) {
      if (!isEmpty(files)) {
        this.files = files
      }
    },
    getGroup(g, r) {
      this.$emit('getGroup', g)
    },
    onSubmit(e) {
      // this.loading = true
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const formData = new FormData()

          for (const key in values) {
            formData.append(key, values[key])
          }

          this.files.forEach((files) => {
            formData.append('files', files)
          })

          ChatServices.createGroup(formData).then((response) => {
            this.handleGroupModal(false)
            this.fetch()
          })
        } else {
          this.loading = false
        }
      })
    },
  },
}
</script>
