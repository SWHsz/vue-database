<!-- 注册页 -->
<template>
    
    <el-container >
        
        <el-header>
            <div class="logo">
                <img src="../assets/logo.png" alt="">
            </div>
            <div class="title">
                LTE网络干扰分析系统
            </div>
        </el-header>
        <el-main >
            <div class="login-container" style="box-shadow: 12px 12px 12px rgba(0,0,0,0.1)" >
                <div class="login-header">
                    <span>注册</span>
                </div>
                <div class="login-content">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                            <i slot="prefix" class="dbm d-icon-password"></i>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="confirmPassword">
                            <el-input v-model="ruleForm.confirmPassword" placeholder="请再次输入密码"></el-input>
                            <i slot="prefix" class="dbm d-icon-password"></i>
                        </el-form-item>
                        <el-form-item style="width:100%">
                            <el-button type="primary" style="width:40%" @click.native.prevent="handleSubmit">注册</el-button>
                            <router-link to="/login">
                                <el-button type="primary" style="width:40%">返回</el-button>
                            </router-link>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="login-footer">
                    <span>LTE网络干扰分析系统</span>
                </div>
            </div>
        </el-main>
    </el-container>
</template>
  
<script>
export default {
    name: "register",
    components: {},
    data() {
        return {
            ruleForm: {
                username: "",
                password: "",
                confirmPassword: ""
            },
            rules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                    { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
                ],
                confirmPassword: [
                    { required: true, message: "请再次输入密码", trigger: "blur" },
                    { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        handleSubmit() {
            this.$refs.ruleForm.validate(valid => {
                if (valid && this.ruleForm.password === this.ruleForm.confirmPassword) {
                    axios.post('/api/register', {username:this.ruleForm.username,password:this.ruleForm.password}).then(res => {
                        console.log(res.data.errCode);
                        
                            console.log('success');
                            this.$message({
                                message: "注册成功",
                                type: "success"
                            });
                            this.$router.push('/login');
                        
                    }).
                    catch(err => {
                        console.log("error");
                        this.$message({
                        message: "用户名已存在",
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
        }
    }
}
</script>
  
<style lang="less" scoped>
    .logo {
        width: 100px;
        height: 100px;
        margin: 0 auto;
        margin-top: 50px;
        margin-bottom: 50px;
    }
    .title {
        font-size: 30px;
        text-align: center;
        color: #fff;
    }
    .login-container {
        width: 400px;
        height: 400px;
        margin: 0 auto;
        margin-top: 100px;
        background-color: #fff;
        border-radius: 10px;
    }
    .login-header {
        width: 100%;
        height: 50px;
        background-color: #409eff;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        text-align: center;
        line-height: 50px;
        color: #fff;
    }
    .login-content {
        width: 100%;
        height: 300px;
        padding: 20px;
    }
    .login-footer {
        width: 100%;
        height: 50px;
        background-color: #409eff;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        text-align: center;
        line-height: 50px;
        color: #fff;
    }
</style>