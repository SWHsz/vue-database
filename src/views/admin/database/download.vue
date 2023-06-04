<template>
    
    <div><br/>
        导出表类型：
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


        <el-button size="small" type="primary" @click="download">下载文件</el-button>
        
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
                value: 'tbcell',
                label: '网络配置信息'
            },
            {
                value: 'tbkpi',
                label: 'KPI指标信息'
            },
            {
                value: 'tbc2inew',
                label: '主邻小区C2I干扰分析'
            }
        ],
        table_type: 'tbcell',
        }
    },
    methods:{
        download(){
            let that = this
            axios({
                url: '/api/download/'+that.table_type,
                method: 'get',
                responseType: 'blob',
                headers:{
                    'Authorization': "Bearer "+getToken(),
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                }
            ).then(res => {
                console.log(res)
                const link = document.createElement('a')
                let resdata = res.data
                console.log(resdata)
                let blob = new Blob([res.data],{type: 'text/csv,charset=utf-8'})
                console.log(blob)
                link.style.display = 'none'
                link.href = URL.createObjectURL(blob)
                link.download = that.table_type+'.csv'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                that.$message({
                    message: '下载成功',
                    type: 'success'
                })
            }).catch(err => {
                console.log(err)
            })

        }
    }
    
}
</script>