<template>
    <div>
    <div>
            数据库物理分区：
            <el-input class="i1" v-model="partition" style="width: 200px; margin-left: 10px"></el-input>
    </div>
    <div>
        数据库连接时长：<el-input class="i2" v-model="connect_time" style="width: 200px; margin-left: 10px">
        </el-input>
    </div>
    <div>
        数据库缓冲区大小：<el-input class="i3" v-model="buffer_size" style="width: 200px; margin-left: 10px">
        </el-input>
    </div>
    <el-button type="primary" @click="modify">提交</el-button>
</div>
</template>
<script>
import Axios from 'axios';
import {getToken} from '@/utils/auth';
export default{
    data() {
        return {
            partition: '',
            connect_time: '',
            buffer_size: ''
        }
    },
    mounted(){
        let that = this
        Axios({
                url:'/api/admin/database/config',
                method:'get',
                headers:{
                    'Authorization':"Bearer "+getToken()
                }
            }).then(res=>{
                console.log(res)
                that.partition = res.data.DB_partition;
                that.connect_time = res.data.DB_time;
                that.buffer_size = res.data.DB_buffer_size;
            }).catch(err=>{
                console.log(err)
            })
    },
    methods:{
        modify(){
            let that = this
            Axios({
                url: '/api/admin/database/modify',
                method: 'post',
                params:{
                    partition: that.partition,
                    time: that.connect_time,
                    buffer_size: that.buffer_size
                },
                headers:{
                    'Authorization': "Bearer "+getToken(),
                }
                
            }).then(res => {
                console.log(res)
                that.partition = res.data.DB_partition;
                that.connect_time = res.data.DB_time;
                that.buffer_size = res.data.DB_buffer_size;
            }).catch(err => {
                console.log(err);
            })
        
        }
    }
}
</script>

<style>
.i1{
    width: 200px;
}
.i2{
    width: 200px;
}
.i3{
    width: 200px;
}
</style>