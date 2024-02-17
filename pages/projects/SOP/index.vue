<template>
    <PageLayout
    :loading="false"
      title="SOP Library"
      class="specific container page-search-input-container"
      :create="false"
      :back="false"
    >
    <template slot="headerMenus">
        <a-button type="primary" class="wd-16" @click="goto('/projects/newProcess')">
            Start New Process
        </a-button>
        <a-button type="primary" class="wd-16" @click="visibleUploadModal(true)">
            Add New SOP
        </a-button>
    </template>
    <div slot="content">
        <div v-for="(project,index) in dummyData" :key="index"  class="ant-col  mt-15 consentClass">
            <a-row>
            <a-col :lg="{span:20}" :md="{span:18}" :sm="{span:12}" :xs="{span:24}">
          <div class="pt-3 cursor-pointer" @click="goto('/projects/SOP?Id='+project.sopId)"><h3 class="ml-2">{{ project.fileName }}</h3></div>
          </a-col>
        </a-row>
        </div>
        <a-modal 
        :visible="visible"
        :loading="loading"
        @cancel="visibleUploadModal(false)"
        @ok="submitFiles"
        >
            <a-upload-dragger
                name="file"
                :multiple="true"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :remove="handleRemove"
                @change="handleChange"
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
    </div>
</PageLayout>
</template>
<script>
import SOPServices from '~/services/API/SOPServices'
import PageLayout from '~/components/layout/PageLayout'
import routeHelpers from '~/mixins/route-helpers'
export default{
    components:{PageLayout},
    mixins:[routeHelpers],
    data(){
        return{
            visible: false,
            fileList:[],
            dummyData:[],
            loading: false
        }
    },
    mounted(){
        this.get()
    },
    methods:{
        handleChange(info) {
            
            const status = info.file.status;
            if (status !== 'uploading') {
               //
            }
            if (status === 'done') {
                this.fileList= info
                this.$message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                this.$message.error(`${info.file.name} file upload failed.`);
            }
            },
        visibleUploadModal(e){
            this.visible = e
        },
        submitFiles(){
            this.loading= true
            const formData = new FormData()
            for(let i=0; i< this.fileList.fileList.length; i++ ){
                formData.append('files', this.fileList.fileList[i].originFileObj)
                // this.files.append('files',this.fileList[i])
            }
            SOPServices.create(formData).then((response)=>{
                this.visibleUploadModal(false)
                this.get()
            }).catch(this.error)
            this.loading= false
        },
        handleRemove(file) {
            const index = this.fileList.fileList.indexOf(file)
            const newFileList = this.fileList.fileList.slice()
            newFileList.splice(index, 1)
            this.fileList = newFileList
            },
        get(){
            SOPServices.get().then((response)=>{
                this.dummyData = response.data
            }).catch(this.error)
        }
    }
}
</script>