<template>
  <div class="clearfix">
    <a-upload
      list-type="picture-card"
      :file-list="fileList"
      :remove="handleRemove"
      :before-upload="beforeUpload"
      :action="handleChange"
      @change="handleChange" 
      >
      <!-- :show-preview-icon="true" -->
      <div v-if="fileList.length < 1">
        <a-icon type="plus" />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script>
import { isEmpty } from '~/services/Helpers'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  props: {
    extensions: { type: Array, default: () => [] },
    defaultFileList: { type: Array, default: () => [] },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      previewImage: '',
      fileList: [],
      previewVisible: false
    }
  },
  watch: {
    defaultFileList: {
      immediate: true,
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.fileList = val
        }
      },
    },
  },
  mounted() {
    this.fileList = this.defaultFileList
  },
  methods: {
    isEmpty,
    handleCancel() {
      this.previewVisible = false
    },
    beforeUpload(file) {
      if (this.isExtensionAllow(file)) {
        this.$emit('handleChange', [file])
        this.fileList = [file]
      }
    },
    handleChange(file, fileList) {
      // this.$emit('handleChange', [file])
      // this.fileList = [fileList]
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
      this.$emit('handleChange', this.fileList)
    },
    isExtensionAllow(file) {
      const strName = file.name
      const ext = strName.split('.').pop()
      const isAllowedExtension = this.extensions.includes('.' + ext)
      // extension upload the file @todo work in progess
      if (!isAllowedExtension) {
        this.$message.error(`Please upload ${this.extensions} files only`)
        this.fileList = []
        return false
      }
      this.extensionAllowed = isAllowedExtension
      return isAllowedExtension
    },
  },
}
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 2rem;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
