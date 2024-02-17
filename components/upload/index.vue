<template>
  <a-upload-dragger
    :before-upload="beforeUpload"
    :default-file-list="defaultFileList"
     :multiple="true"
    name="file"
    :headers="headers" 
    :remove="handleRemove"
    @change="handleChange"
  >
    <p class="ant-upload-drag-icon">
      <a-icon type="camera" theme="filled" />
    </p>
    <p class="ant-upload-text">{{translation.Clickor_9_466}}</p>
    <p class="ant-upload-hint">
      {{translation.Suppofor_17_467}}
    </p>
  </a-upload-dragger>
</template>
<script>

export default {
  props: {
    extensions: {
      default: () => [],
      type: Array,
    },
    defaultFileList: {
      default: () => [],
      type: Array,
    },
    disabled: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      stateFileList: [],
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    }
  },
  computed: {
    translation() {
      return this.$store.getters.getTranslation
    },
  },  
  mounted(){
    this.fileList = this.defaultFileList
  },
  methods: {
    beforeUpload(file) {  // will comlete it after cryport assignment
      const strName = file.name
      const ext = strName.split('.').pop()
      const isAllowedExtension = this.extensions.includes('.' + ext)
      // extension upload the file @todo work in progess
      if (!isAllowedExtension) {
        this.$message.error('Extension not allow')
        this.stateFileList=[]
        return true
      }else{
        this.$emit('handleChange', [file])
        this.stateFileList=[file]
      }
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isLt2M) {
      //   this.$message.error('Extension')
      // }
    },
    handleChange ({ fileList }) {  // will complete it after cryoport assignment
      // console.log(fileList)
      // this.isChanged=true
      // this.fileList = fileList
      // this.$emit('handleChange', fileList)
    },
    
    async addToFileList(file) {
      // alert('add')
      const files = this.stateFileList
      //    files = JSON.stringify(files);
      //    files = JSON.parse(files);
      return await Promise.resolve((this.stateFileList = [...files, file]))
    },
    async removeFromFileList() {},
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
      this.$emit('handleChange', this.fileList)
    },
  },
}
</script>
