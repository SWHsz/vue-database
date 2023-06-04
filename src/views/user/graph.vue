<template>
    <div>
    <span v-show="loadingLoad">正在加载</span>
    <img :src="picurl" alt="网络干扰结构分析" style="width:100%;height:100%;" v-show="!loadingLoad"/>
    <el-input v-model="loc" placeholder="请输入下载名称.png"></el-input>
    <el-button type="primary" @click="download">下载</el-button>
    </div>
</template>

<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'
export default {
    data() {
        return {
            picurl: "",
            loadingLoad: false,
            loc:""
        }
    },
    mounted() {

        this.getpic()
    },
    methods:{
        getpic() {
            this.loadingLoad = true
            let that = this
            axios({
                method: 'get',
                url: '/api/graph',
                responseType: "blob",
                headers:{
                    "Authorization": "Bearer "+getToken()
                }
            }).then(res => {
                console.log(res)
                let url = window.URL.createObjectURL(new Blob([res.data]))
                that.picurl = url
                that.loadingLoad = false
            }).catch(err => {
                console.log(err)
                that.loadingLoad = false
            })
        },
        download(){
            
            let link = document.createElement('a');
        link.href = this.picurl;
        if (this.loc == "") {
            this.loc = "网络干扰结构分析.png"
        }
        else if(this.loc != "" && this.loc.indexOf(".png") == -1){
            this.loc = this.loc + ".png"
        }
        link.download = this.loc;
        link.click();
        },
        arrayBufferToBase64(buffer) {
            var binary = '';
            var bytes = new Uint8Array(buffer);
            for (var len = bytes.byteLength, i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return window.btoa(binary);
        }
    }

}
</script>