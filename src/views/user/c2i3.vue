<template>
    <div>
        相互之间最小干扰率的最小值：
        <el-input-number v-model="min" :min="0"  label="最小值" @change="$forceUpdate()"></el-input-number>
        
        <el-button type="primary" @click="submit">提交</el-button>
        <div>
            <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border size="mini" v-loading="loading">
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
import { TableColumn } from 'element-ui';
import axios from 'axios'
import { getToken } from '@/utils/auth'
export default{
    data() {
        return {
            min: 0,
            tableColumn:[
                {prop:"CELL_A",label:"A小区ID"},
                {prop:"CELL_B",label:"B小区ID"},
                {prop:"CELL_C",label:"C小区ID"},
                {prop:"x",label:"相互之间最小的干扰率"}
            ],
            tableData: [],
            currentPage: 1,
            pagesize: 20,
            total: 0,
            loading: false
        }
    },
    methods: {
        submit() {
            this.loading = true
            this.tableData = []
            this.total = 0
            this.currentPage = 1
            let that = this
            axios({
                url:"/api/c2i3",
                method:"get",
                params:{
                    x: this.min
                },
                headers:{
                    'Authorization':"Bearer "+getToken()
                }
            }).then(res=>{
                console.log(res.data.data);
                for(let i=0;i<res.data.count;i++){
                    that.tableData.push({
                        CELL_A:res.data.data[i].CEll_A,
                        CELL_B:res.data.data[i].CEll_B,
                        CELL_C:res.data.data[i].CEll_C,
                        x:res.data.data[i].x
                    })
                }
                console.log(that.tableData);
                that.total = res.data.count
                that.loading = false
            })
            .catch(err=>{
                console.log(err);
                that.loading = false
            })

        },
        current_change(val) {
            this.currentPage = val
        }
    }
}
</script>