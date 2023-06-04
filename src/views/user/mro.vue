<template>
    
    <div><br/>
上传MRO文件
        <el-upload 
            action=""
            limit="1"
            :show-file-list="true"
            :http-request="uploadFile"
            :before-upload="beforeUpload"
            accept=".xml"
            >
        <el-button size="small" type="primary">上传文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传xml文件</div>
        </el-upload>
    </div>
</template>

<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'
export default{
    methods:{
        beforeUpload(file) {
            //xml
            const isXML = (file.type === 'text/xml');
            if (!isXML) {
                this.$message.error('只能上传xml文件');
            }
            return isXML;
        },
        uploadFile(param) {
            let formData = new FormData();

            formData.append('file', param.file);
            let __this = this;
            axios({
                url: '/api/mro',
                method: 'post',
                data: formData,
                headers:{
                    "Authorization": "Bearer " + getToken(),
                    "Content-Type": "multipart/form-data"
                
                }
            }).then(
                    (res) => {
                        __this.$message({
                            message: '上传成功',
                            type: 'success'
                        });
                        __this.$router.go(0);
                    }
                ).catch(
                    (err) => {
                        __this.$message({
                            message: '上传失败',
                            type: 'error'
                        });
                        __this.$router.go(0);
                    }
                )                    
        }
    }
    
}
</script>