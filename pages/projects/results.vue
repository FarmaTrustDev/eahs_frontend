<template>
    <PageLayout
    title="Results Library"
    :back="false"
    :create="false"
    >
        <template slot="headerMenus">
            <a-button type="primary" @click="visibleUploadModal(true)">
                Upload Results
            </a-button>
        </template>
            <div slot="content">
                <div class="ant-col  mt-15 consentClass" v-for="(result,index) in results" :key="index" >
            <a-row>
            <a-col :lg="{span:20}" :md="{span:18}" :sm="{span:12}" :xs="{span:24}">
          <div class="pt-3 cursor-pointer" @click="goto('/projects/result?id='+result.globalId)"><h3 class="ml-2">{{ result.fileName }}</h3></div>
          </a-col>
        </a-row>
        </div>
        <a-modal 
        :visible="visible"
        @cancel="visibleUploadModal(false)"
        @ok="submitFiles"
        >
            <a-upload-dragger
                name="file"
                :multiple="true"
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
import PageLayout from '~/components/layout/PageLayout.vue';
import SOPResultServices from '~/services/API/SOPResultServices'
import routeHelpers from '~/mixins/route-helpers'
export default{
    components:{PageLayout},
    mixins:[routeHelpers],
    data(){
        return{
            visible:false,
            results:[],
            fileList:[],
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
            const formData = new FormData()
            console.log(this.fileList)
            const id = this.$route.query.Id
            formData.append('sopId', id)
            for(let i=0; i< this.fileList.fileList.length; i++ ){
                console.log(this.fileList.fileList[i].originFileObj,'file');
                formData.append('files', this.fileList.fileList[i].originFileObj)
            }
            SOPResultServices.create(formData).then((response)=>{
                console.log(response)
                this.visibleUploadModal(false)
                this.get()
            }).catch(this.error)
        },
        handleRemove(file) {
            const index = this.fileList.fileList.indexOf(file)
            const newFileList = this.fileList.fileList.slice()
            newFileList.splice(index, 1)
            this.fileList = newFileList
            },

        get(){
            SOPResultServices.getAll().then((response)=>{
                this.results = response.data
            }).catch(this.error)
        }
        
    }
}
</script>