<template>
    <div>
    <div  class="select">
        请选择小区名称：
        <el-select v-model="table_type" filterable placeholder="请选择" @change="$forceUpdate()">
        <el-option
            v-for="item in table_type_list"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        ></el-option>
        
    </el-select>
</div>
    <div class="left-bar">
        <div id="echart" style="width: 100%;height: 100%;"></div>
    </div>
    <div class="right-bar">
    <div class="properities">
        
        <div>
            <span>请选择查询时间段：</span>
            <el-date-picker
                v-model="date"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期" 
                end-placeholder="结束日期"
                align="right"
                style="width: 100%;"
                @change="changeDate">
                
                </el-date-picker>
                <el-button type="primary" @click="search">查询</el-button>
        </div>
        <div class="checkbox-title">
            <span>请选择指标：</span>
            <el-checkbox-group v-model="checkedlist">
                <el-checkbox-button v-for="item in properities_list" :key="item.key" :label="item.label" border style="display:block;" @change="changecheckbox(item)">{{item.label}}</el-checkbox-button>
            </el-checkbox-group>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
    import axios from 'axios'
import { getToken } from '@/utils/auth'
import * as echarts from 'echarts';
const properities_list= [
                {key:"RCCConnSUCC",label:"RRC连接建立完成次数"},
                {key:"RCCConnATT",label:"RRC连接请求次数（包括重发）"},
                {key:"RCCConnRATE",label:"RRC建立成功率qf (%)"}
            ];
export default {
    data() {
        return {
            table_type_list: [],
            table_type: '',
            checkedlist: ["RRC连接建立完成次数"],
            properities_list: properities_list,
            date: '',
            echart:"",
            echartdata:[]
        }
    }, 
    mounted() {
        this.getTableTypeList()
        this.date = ["2020-07-17","2020-07-19"]
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
        changecheckbox(val){
            //单选
            console.log(val)
            this.checkedlist = this.checkedlist.includes(val)?[val]:[]
            this.checkedlist = [val.label]
            console.log(this.checkedlist)
            this.draw()
        },
        changeDate(val){
            console.log(val)
        },
        draw() {
            let that = this
            if(this.echartdata.length==0){
                return
            }
            if(this.echart!="")
                this.echart.dispose();
            this.echart = echarts.init(document.getElementById('echart'));
            let xdata = []
            for(let i=0;i<this.echartdata.length;i++){
                xdata.push(this.echartdata[i].StartTime)
            }
            let dataseries = []
            console.log(this.echartdata[0].RCCConnATT)
            console.log(this.checkedlist[0])
            for(let i=0;i<this.checkedlist.length;i++){
                let data = []
                console.log("test1")
                for(let j=0;j<this.echartdata.length;j++){
                    console.log("test2")
                    if(that.checkedlist[i]=="RRC连接建立完成次数"){
                        data.push(that.echartdata[j].RCCConnSUCC)
                    }
                    else if(that.checkedlist[i]=="RRC连接请求次数（包括重发）"){
                        data.push(that.echartdata[j].RCCConnATT)
                    }
                    else if(that.checkedlist[i]=="RRC建立成功率qf (%)"){
                        data.push(that.echartdata[j].RCCConnRATE)
                    }
                }
                dataseries.push({
                    name: that.checkedlist[i],
                    type: 'line',
                    data: data,
                    itemStyle : { normal: {label : {show: true}}}
                })
            }
            console.log(dataseries)
            this.echart.setOption( 
                {
                    xAxis: {
                        type: 'category',
                        data: xdata
                    },
                    yAxis: {                    
                        type: 'value',
                        scale: true,
                    },
                    series:dataseries,
                    legend: {
                        data: this.checkedlist
                    },
                }
            )
            this.echart.resize({
                width: 'auto',
                height: '500%'
            })
        },
        search() {
            let that = this
            axios({
                url: '/api/query/KPI',
                method: 'get',
                headers:{
                    "Authorization": "Bearer "+getToken()
                },
                params:{
                    StartTime: that.date[0]+" 00:00:00",
                    EndTime: that.date[1]+" 23:59:59",
                    SECTOR_NAME: that.table_type,
                    Property:"RCCConnSUCC"
                }
            }).then(res => {
                console.log(res);
                that.echartdata = res.data.list
                that.draw()
            })
        }
    }
}

</script>

<style scoped>
    .select{
        width: 100%;
    }
    .left-bar{
        width: 80%;
        float: left;
        background-color: #f5f5f5;
    }
    .right-bar{
        width: 20%;
        float: right;
        background-color: #f5f5f5;
        align-content: center;
        align-items: center;
        background: #FFF;
        
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .properities{
        width: 100%;
        margin: 10px;
    }
</style>