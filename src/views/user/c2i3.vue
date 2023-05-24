<template>
    <div>
        相互之间最小的干扰率：
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
                {prop:"SCELL",label:"主小区 ID"},
                {prop:"NCELL",label:"邻小区 ID"},
                {prop:"C2I_Mean",label:"主邻小区 RSRP 差值的均值"},
                {prop:"Std",label:"主邻小区 RSRP 差值的标准差"},
                {prop:"PrbC2I9",label:"主邻小区 RSRP 差值小于 9 的概率"},
                {prop:"PrbABS6",label:"主邻小区 RSRP 差值绝对值小于 6 的概率"},
                {prop:"num",label:"将<LteScRSRP, LteNcRSRP>RSRP 测量值对的条数"}

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
                url:"/api/c2inew",
                method:"get",
                params:{
                    min_num: this.min
                },
                headers:{
                    'Authorization':"Bearer "+getToken()
                }
            }).then(res=>{
                console.log(res.data.data);
                for(let i=0;i<res.data.count;i++){
                    that.tableData.push({
                        SCELL:res.data.data[i].SCELL,
                        NCELL:res.data.data[i].NCELL,
                        C2I_Mean:res.data.data[i].C2I_Mean,
                        Std:res.data.data[i].Std,
                        PrbC2I9:res.data.data[i].PrbC2I9,
                        PrbABS6:res.data.data[i].PrbABS6,
                        num:res.data.data[i].num
                    })
                }
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