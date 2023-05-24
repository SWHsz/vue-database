<template>
    <!-- 下拉框 -->
    <div>
        <div>
    请选择小区名称：
    <el-select v-model="table_type" filterable placeholder="请选择" @change="$forceUpdate()">
        <el-option
            v-for="item in table_type_list"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        ></el-option>
        
    </el-select>
    
    <el-button type="primary" @click="search">查询</el-button>
</div>
<!-- 分页的表格 -->
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
import axios from 'axios'
import { getToken } from '@/utils/auth'
export default {
    data() {
        return {
            table_type_list: [],
            table_type: '',
            tableData: [],
            currentPage: 1,
            pagesize: 20,
            loading: false,
            tableColumn:[
                {prop:"CITY",label:"城市"},
                {prop:"SECTOR_ID",label:"小区ID"},
                {prop:"SECTOR_NAME",label:"小区名称"},
                {prop:"ENODEBID",label:"小区所属基站ID"},
                {prop:"ENODEB_NAME",label:"小区所属基站名称"},
                {prop:"EARFCN",label:"频点编号"},
                {prop:"PCI",label:"物理小区标识"},
                {prop:"PSS",label:"主同步信号标识"},
                {prop:"SSS",label:"辅同步信号标识"},
                {prop:"TAC",label:"跟踪区编码"},
                {prop:"AZIMUTH",label:"小区天线方位角"},
                {prop:"HEIGHT",label:"天线挂高"},
                {prop:"ELECTTILT",label:"小区天线电下倾角"},
                {prop:"MECHTILT",label:"小区天线机械下倾角"},
                {prop:"TOTLETILT",label:"总下倾角"}

            ]

        }
    },
    mounted() {
        this.getTableTypeList()
    },
    methods: {
        getTableTypeList() {
            let that = this
            axios({
                url: '/api/query/cell_name',
                method: 'get',
                headers: {
                    'Authorization': "Bearer "+getToken()
                }
            }).then(res => {
                for (let i = 0; i < res.data.list.length; i++) {
                    that.table_type_list.push({
                        value: res.data.list[i],
                        label: res.data.list[i]
                    })
                }
                that.$forceUpdate()
                console.log(that.table_type_list)
            })
        },
        search() {
            let that = this
            that.loading = true
            console.log(that.table_type)
            if (that.table_type == '') {
                that.$message({
                    message: '请选择小区名称',
                    type: 'warning'
                })
                that.loading = false
                return
            }
            axios({
                url:'/api/query/Cell',
                params:{
                    SECTOR_NAME:that.table_type
                },
                method:'get',
                headers:{
                    'Authorization':"Bearer "+getToken()
                }
            }).then(res=>{
                console.log(res)
                for (let i = 0; i < res.data.list.length; i++) {
                    that.tableData.push({
                        CITY:res.data.list[i].CITY,
                        SECTOR_ID:res.data.list[i].SECTOR_ID,
                        SECTOR_NAME:res.data.list[i].SECTOR_NAME,
                        ENODEBID:res.data.list[i].ENODEBID,
                        ENODEB_NAME:res.data.list[i].ENODEB_NAME,
                        EARFCN:res.data.list[i].EARFCN,
                        PCI:res.data.list[i].PCI,
                        PSS:res.data.list[i].PSS,
                        SSS:res.data.list[i].SSS,
                        TAC:res.data.list[i].TAC,
                        AZIMUTH:res.data.list[i].AZIMUTH,
                        HEIGHT:res.data.list[i].HEIGHT,
                        ELECTTILT:res.data.list[i].ELECTTILT,
                        MECHTILT:res.data.list[i].MECHTILT,
                        TOTLETILT:res.data.list[i].TOTLETILT
                    })
                }
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