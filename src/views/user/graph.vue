<template>
    <div>
    <span v-show="loadingLoad">正在加载</span>
    <img :src="picurl" alt="网络干扰结构分析" style="width:100%;height:100%;" v-show="!loadingLoad"/>
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