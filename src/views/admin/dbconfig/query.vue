<template>
    <!-- 下拉框 -->
    <div>
<!-- 分页的表格 -->
    <div>
        
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border size="mini" v-loading="loading">
            <el-table-column align="center" label="序号" type="index" width="70px" show-overflow-tooltip></el-table-column>
            <el-table-column v-for="item in tableColumn" :key="item.index" :prop="item.prop" :label="item.label" show-overflow-tooltip></el-table-column>
        </el-table>
        
        <exportExcel :id="'exportTab'" :name="'导出表格'"></exportExcel>
        <!-- 隐藏下表 -->
        <el-table :data="tableData" border id="exportTab" v-show="f">
            <el-table-column align="center" label="序号" type="index" width="70px" show-overflow-tooltip></el-table-column>
            <el-table-column v-for="item in tableColumn" :key="item.index" :prop="item.prop" :label="item.label" show-overflow-tooltip></el-table-column>
        </el-table>
        <div style="text-align:center">
            <el-pagination hide-on-single-page background layout="prev, pager, next,total" :total="total" :page-size="pagesize" @current-change="current_change"></el-pagination>

        </div>

    </div>
</div>

</template>

<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'
import FileSaver from 'file-saver'
import exportExcel from '@/components/exportExcel.vue'
export default {  
    components:{
        exportExcel
    },
    prop:{},
    data() {
        return {
            table_type_list: [],
            table_type: '',
            tableData: [],
            currentPage: 1,
            pagesize: 20,
            loading: false,
            f:false,
            tableColumn:[
                {prop:"DB_partition",label:"数据库物理分区"},
                {prop:"DB_time",label:"数据库连接时长"},
                {prop:"DB_buffer_size",label:"数据库缓冲区大小"}
                

            ],
            downloadLoading: false,

        }
    },
    mounted() {
        this.search()
    },
    methods: {
        exportExcel(){
            console.log(this.id)
            console.log(document.querySelector('#out-table'))
            var wb = this.XLSX.utils.table_to_book(document.querySelector('#'+this.id),{raw:true})
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '小区信息.xlsx')
            } catch (e) {
                if (typeof console !== 'undefined') console.log(e, wbout)
            }
            return wbout
        },
        search() {
            let that = this
            axios({
                url:'/api/admin/database/config',
                method:'get',
                headers:{
                    'Authorization':"Bearer "+getToken()
                }
            }).then(res=>{
                console.log(res)
                that.tableData = []
                that.tableData.push({
                    DB_partition:res.data.DB_partition,
                    DB_time:res.data.DB_time,
                    DB_buffer_size:res.data.DB_buffer_size
                })
                that.total = that.tableData.length
                that.loading = false
            })
            .catch(err=>{
                console.log(err)
                that.loading = false
            })

        },
        current_change(val) {
            this.currentPage = val
        }
    }
}
</script>