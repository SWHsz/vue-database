<template>
    <img :src="picurl" alt="网络干扰结构分析" style="width:100%;height:100%;"/>
</template>

<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'
export default {
    data() {
        return {
            picurl: ""
        }
    },
    mounted() {
        this.getpic()
    },
    methods:{
        getpic() {
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
            }).catch(err => {
                console.log(err)
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