<template>
    <div>

  <el-input
      v-model="name1"
      placeholder="请输入想要导出的文件名"
      style="width: 200px; margin-left: 10px"></el-input>
      <span>
      .xlsx</span>
    <el-button type="primary" size="small" @click="exportExcel">导出</el-button>
    <!-- 输入文件名 -->
    </div>
</template>

<script>
import FileSaver from 'file-saver'
import * as XLSX from 'xlsx';
export default {
  props: {
    id: {
      type: String,  //table ID名称
      default: 'table'
    },
    name: {
      type: String, //导出需要的名字
      default: 'Table'
    }

  },
  data () {
    return {
      downloadLoading:false,
      name1:""
    }
  },
  components: {},
  methods: {
    // 导出Excel表格
    exportExcel () {
      this.downloadLoading = true
      var xlsxParam = { raw: true } //转换成excel时，使用原始的格式
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(
        document.querySelector('#' + this.id),
        xlsxParam
      )
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      let that  = this
      try {
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], {
            type: 'application/octet-stream'
          }),
          //设置导出文件名称
           that.name1+ '.xlsx'
        )
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      this.downloadLoading = false
      return wbout
    }
  }
}
</script>