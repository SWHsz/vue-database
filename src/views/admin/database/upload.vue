<template>
    
    <div><br/>
        导入表类型：
        <el-select v-model="table_type" placeholder="请选择" @change="$forceUpdate()">
            <el-option
                v-for="item in table_type_list"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
        
        </el-select>
        <!-- 选择框与按钮之间空出一段距离 -->
        <br/>
        <br/>

    <!-- 上传地址为/upload/{表名}，只能上传一个csv或者xls或者xlsx文件，使用bearer认证-->
        <el-upload 
            action=""
            limit="1"
            :show-file-list="true"
            :http-request="uploadFile"
            :before-upload="beforeUpload"
            accept=".csv,.xls,.xlsx"
            >
        <el-button size="small" type="primary">上传文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传xls/xlsx/csv文件</div>
        </el-upload>
    </div>
</template>

<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'
export default{
    data(){
        return {
        table_type_list:[
            {
                value: 'config',
                label: '网络配置信息'
            },
            {
                value: 'kpi',
                label: 'KPI指标信息'
            },
            {
                value: 'prb',
                label: 'PRB干扰信息'
            },
            {
                value: 'mro',
                label: 'MRO数据'
            }
        ]
        }
    },
    methods:{
        beforeUpload(file) {
            const isCSV = file.type === 'text/csv'
            const isXLS = file.type === 'application/vnd.ms-excel'
            const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            
            if (!isCSV && !isXLS && !isXLSX) {
                this.$message.error('上传文件只能是csv/xls/xlsx格式!')
            }
            return (isCSV || isXLS || isXLSX)
        },
        uploadFile(param) {
            let formData = new FormData();

            formData.append('file', param.file);
            let table_type = this.table_type;
            let __this = this;
            axios({
                url: '/api/database/upload/' + table_type,
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