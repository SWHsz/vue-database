<template>
    <div>
    <div  class="select">
        请选择基站名称：
        <el-select v-model="table_type" filterable placeholder="请选择" @change="$forceUpdate()">
        <el-option
            v-for="item in table_type_list"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        ></el-option>
    </el-select>
    请选择PRB编号(0-99)：
    <el-select v-model="prb" filterable placeholder="请选择" @change="$forceUpdate()">
        <el-option
            v-for="item in prb_list"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        ></el-option>
    </el-select>
    请选择查询粒度：
    <el-select v-model="granularity" filterable placeholder="请选择" @change="$forceUpdate()">
        <el-option
            v-for="item in granularity_list"
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
            <br/>
            <picker v-model="date1" v-if="granularity==='perQuarter'" type="datetime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" class="datepicker-content" placeholder="起始日期" @change="changeDate(date1)" :clearable="false" ></picker>
            <el-date-picker v-if="granularity==='perHour'" v-model="date1" type="datetime" value-format="yyyy-MM-dd HH" class="datepicker-content" :picker-options="{minuteStep:60}" popper-class="datepickerPopperClass" placeholder="起始日期" @change="changeDate(date1)" :clearable="false" ></el-date-picker>
            <br/>~
            <br/>
            <picker v-model="date2" v-if="granularity==='perQuarter'" type="datetime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" class="datepicker-content" placeholder="结束日期" @change="changeDate(date2)" :clearable="false"></picker>
            <el-date-picker v-model="date2" v-if="granularity==='perHour'" type="datetime" value-format="yyyy-MM-dd HH" class="datepicker-content" :picker-options="{minuteStep:60}" popper-class="datepickerPopperClass" placeholder="结束日期" @change="changeDate(date2)" :clearable="false"></el-date-picker>
            <br/>
            
            <el-button type="primary" @click="search">查询</el-button>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
    import axios from 'axios'
import { getToken } from '@/utils/auth'
import * as echarts from 'echarts';
import "./datapicker.css"
import picker from '@/components/date-picker'
const properities_list= [
                {key:"RCCConnSUCC",label:"RRC连接建立完成次数"},
                {key:"RCCConnATT",label:"RRC连接请求次数（包括重发）"},
                {key:"RCCConnRATE",label:"RRC建立成功率qf (%)"}
            ];
export default {
    components: {
        picker
    },
    data() {
        return {
            table_type_list: [],
            table_type: '',
            properities_list: properities_list,
            date1: '',
            date2: '',
            echart:"",
            echartdata:[],
            prb_list:[],
            prb:0,
            granularity_list:[
                {value:"perQuarter",label:"每15分钟"},
                {value:"perHour",label:"小时"},
                
            ],
            granularity:"perQuarter"
        }
    }, 
    mounted() {
        this.getTableTypeList()
        this.date1="2020-07-17 00:00"
        this.date2="2020-07-19 00:00"
        this.prb_list=[]
        for(let i=0;i<100;i++){
            this.prb_list.push({
                value:i,
                label:i
            })
        }
    },
    methods: {
        getTableTypeList() {
            let that = this
            axios({
                url: '/api/query/PRB_ENodeB_name',
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
        changeDate(val){
            console.log(val)
        },
        draw() {
            let that = this
            if(this.echart!="")
                this.echart.dispose()
            this.echart = echarts.init(document.getElementById('echart'));
            let dataseries = []
            let xdata = []
            let data=[]
            for(let i=0;i<this.echartdata.count;i++){
                
                xdata.push(this.echartdata.list[i].Time)
                data.push(this.echartdata.list[i].data)
            }
            dataseries = [{
                name: 'PRB上检测到的干扰噪声的平均值 (毫瓦分贝)',
                type: 'line',
                data: data,
                itemStyle : { normal: {label : {show: true}}}
            }]
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
                        data: ['PRB上检测到的干扰噪声的平均值 (毫瓦分贝)']
                    },
                    toolbox:{
                        show:true,
                        feature:{
                            saveAsImage:{
                                show:true
                            }
                        }
                    }
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
                url: '/api/query/PRB',
                method: 'get',
                headers: {
                    'Authorization': "Bearer "+getToken()
                },
                params:{
                    ENODEB_NAME:that.table_type,
                    Mode:that.granularity,
                    PRB:that.prb,
                    StartTime:that.date1+":00",
                    EndTime:that.date2+":00"
                }

            }).then(res => {
                console.log(res.data)
                that.echartdata=res.data
                that.draw()
                //that.echartdata=res.data
                //that.draw()
            })
            .catch(err=>{
                console.log(err)
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
    .datepicker-content{
        width: 100%;
    }
</style>
