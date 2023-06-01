<!-- 系统登录页 -->
<template>
  <div class="login-page">
    <div class="page-center">
      <div class="info">
        <div class="title">
          <img src="@/assets/logo-blue.png" />
          <span>LTE网络干扰分析系统</span>
        </div>
        <div class="detail">
          <span> 黄思喆 向奎先 王肇汉 </span>
        </div>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-container"
      >
        <div class="title">
          <h3>账号密码登录</h3>
        </div>
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="ruleForm.username"
            auto-complete="off"
            placeholder="admin/watcher"
          >
            <i slot="prefix" class="dbm d-icon-username"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            auto-complete="off"
            placeholder="admin/watcher"
          >
            <i slot="prefix" class="dbm d-icon-password"></i>
          </el-input>
        </el-form-item>
        <el-checkbox v-model="isAutoLogin" checked class="remember">自动登录</el-checkbox>
        <el-form-item style="width: 100%">
          <el-button
            type="primary"
            style="width: 40%"
            @click.native.prevent="handleSubmit"
            :loading="logining"
            >登录</el-button
          >
          <router-link to="/register">
            <el-button type="primary" style="width: 40%">注册</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
    <div class="login-footer">
      <span>LTE网络干扰分析系统</span>
    </div>
  </div>
</template>

<script>
import {setToken} from '@/utils/auth'
export default {
  name: "login",
  components: {},
  data() {
    return {
      logining: false,
      ruleForm: {
        username: "root",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      isAutoLogin: true,
    };
  },
  props: {},
  computed: {},
  methods: {
    handleSubmit() {
      this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    axios({
                      url: '/api/login',
                      method: 'post',
                      data: {
                        username:this.ruleForm.username,
                        password:this.ruleForm.password
                      },
                      transformRequest: [function (data) {
                        let ret = ''
                        for (let it in data) {
                          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                      }],
                      headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                      }
                    })
                    .then(res => {
                        console.log(res.data.access_token);
                        
                        this.$message({
                            message: "登录成功",
                            type: "success"
                        });
                        this.$store.commit('SET_USERNAME', this.ruleForm.username);
                        this.$store.commit('SET_TOKEN', res.data.access_token);
                        setToken(res.data.access_token);
                        this.$store.commit('SET_STATUS', true);
                        
                        // this.$store.dispatch('GenerateRoutes', { roles })
                        if(this.ruleForm.username === 'root'){
                          console.log('root');
                          this.$router.push({ path: "/" });
                        }
                        else{
                          this.$router.push({ path: "/" });
                        }
                    })
                    .catch(err => {
                        // console.log(err.response.status);
                        // console.log("error");
                        this.$message({
                          message: "用户名或密码错误",
                          type: "error"
                        });
                    }
                    );
                    
                  

                } else {
                    
                    this.$message({
                        message: "密码不一致",
                        type: "error"
                    });
                    return false;
                }
            });
    },
    dump() {
      // if (this.$route.query.routeName) {
      //   this.$router.replace({
      //     name: this.$route.query.routeName,
      //     query: this.$route.query
      //   });
      // } else if (this.$route.query.routePath) {
      //   this.$router.replace({
      //     path: this.$route.query.routePath,
      //     query: this.$route.query
      //   });
      // } else {
      //   this.$router.replace({ path: "/" });
      // }
      this.$router.replace({ path: "/" });
    },
  },
  watch: {},
  created() {},
};
</script>

<style lang="less" scoped>
.login-page {
  width: 100%;
  height: 100%;
  background-image: url(../assets/login-back.svg);
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  .page-center {
    position: absolute;
    width: 400px;
    height: 540px;
    margin: auto;
    top: 112px;
    right: 0;
    left: 0;
    .info {
      text-align: center;
      height: 120px;
      .title {
        display: flex;
        justify-content: center;
        align-items: Center;
        font-size: 32px;
        color: rgba(0, 0, 0, 0.85);
        font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
        font-weight: 600;
        img {
          padding-bottom: 3px;
        }
      }
      .detail {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }

    .login-container {
      -webkit-border-radius: 5px;
      border-radius: 5px;
      -moz-border-radius: 5px;
      background-clip: padding-box;
      padding: 35px 35px 15px 35px;
      background: #fff;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
      .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
      }
      .remember {
        margin: 0px 0px 35px 0px;
      }
    }
  }
}
.login-footer {
  position: absolute;
  width: 100%;
  margin: auto;
  bottom: 0;
  right: 0;
  left: 0;
  height: 50px;
  text-align: center;
  font-size: 15px;
  line-height: 50px;
  .span {
    font-weight: 400;
    color: #1c86ee;
    text-decoration: none;
  }
}
</style>
