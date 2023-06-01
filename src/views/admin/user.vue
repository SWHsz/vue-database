<template>
  <el-table :data="tableData" style="width: 100%" :header-cell-style="{'text-align':'center'}">
  <!-- 中间对齐 -->
    <el-table-column prop="username" label="用户名" width="360" >
    </el-table-column>
    <el-table-column prop="is_admin" label="管理员" width="360">
    </el-table-column>
    <el-table-column prop="is_active" label="状态" width="360">
    </el-table-column>
    <!-- 按钮，删除和激活 -->
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        <el-button size="mini" type="success" @click="handleActive(scope.$index,scope.row)" v-if="scope.row.display_active">激活</el-button>
      </template>
      
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'
import { getDataItemValue } from 'echarts/lib/util/model';
export default {
  name:'user',
  components:{

  },
  data: {
    tableData:[],
    showTable:true
  },
  mounted:function() {
    this.getData()
  },
  methods: {
    getData() {
      let __this = this;
      axios({
          method: 'get',
          url: '/api/admin/user_list',
          headers: {
            'Authorization': "Bearer "+getToken()
          }

        }).then(function (response) {
          
          console.log(response.data);
          __this.tableData = [];
          for (var i = 0; i < response.data.length; i++) {
            var tmp = {is_admin: "", is_active: "",username:"",display_active:true};
            if (response.data[i].is_admin == true) {
              tmp.is_admin = "是"
            } else {
              tmp.is_admin = "否"
            }
            if (response.data[i].is_active == true) {
              tmp.is_active = "激活"
              tmp.display_active = false;
            } else {
              tmp.is_active = "未激活"
            } 
            tmp.username=response.data[i].username;
            __this.tableData.push(tmp);
          }
          console.log(__this.tableData);
          __this.$forceUpdate();
        }).catch(function (error) {
          console.log(error);
        });
    },
    handleDelete(index, row) {
      let __this = this;
      if(row.is_admin == "是") {
        this.$message({
          type: 'info',
          message: '该用户为管理员，无法删除'
        });
        return;
      }
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios({
          method: 'delete',
          url: '/api/admin/delete/'+row.username,
          data: {
            
          },
          headers: {
            'Authorization': "Bearer "+getToken()
          }

        }).then(function (response) {
          console.log(response.data);
          __this.getData();
          __this.$message({
          type: 'success',
          message: '删除成功!'
        });
        }).catch(function (error) {
          console.log(error);
        });
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleActive(index, row) {
      let __this = this;
      if(row.is_active == "激活") {
        this.$message({
          type: 'info',
          message: '该用户已激活'
        });
        return;
      }
      this.$confirm('此操作将激活该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios({
          method: 'post',
          url: '/api/admin/activate/'+row.username,
          data: {
            
          },
          headers: {
            'Authorization': "Bearer "+getToken()
          }

        }).then(function (response) {
          console.log(response.data);
          __this.getData();
          __this.$message({
          type: 'success',
          message: '激活成功!'
        });
        }).catch(function (error) {
          console.log(error);
        });
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消激活'
        });          
      });
    }
  },
  props:{

  },
  computed:{

  },
  watch:{

  },
  created:function() {

  }

}
</script>