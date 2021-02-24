<template>
  <div class="login">
      <div class="cover" ref="cover" @click="close"></div>
      <div class="loginDiv" ref="loginDiv">
        <span @click="close" class="close">×</span>
        <form @submit.prevent='register'>
            <div class="imgs"><span class="iconfont img">&#xe639;</span></div>
            <div class="info">
                <div class="number"><input required v-model="phone" type="text" placeholder="请输入手机号"></div>
                <div class="password"><input required @keydown.enter="register" v-model="password" type="password" placeholder="请输入密码"></div>
            </div>
            <div class="btn"><button type="submit">登录</button></div>
        </form>
      </div>
      
  </div>
</template>

<script>

export default {
    data(){
        return{
            phone:18813216326,
            password:188188,
            //userMessage:''
        }
    }, 
    //接收到Header发过来的数据，打开登录窗口
    mounted(){
        this.$vue.$on('openLogin',(res => {
            if(res == true){
                this.$refs.loginDiv.style.display = 'block' //显示出来
                this.$refs.cover.style.display = 'block'  //显示出来
            }
        }))
    },
    
    methods:{
        register(){
            this.$axios({
                method:'post',
                url:'/login/cellphone',
                data:{
                    phone: this.phone,
                    password: this.password,
                    uid: this.uid

                }
            }).then(res => {
                if(res.data.code !== 200){
                    alert("你所输入的账号密码有误，请重新输入")
                }else{

                    // 将所获得的数据存储到本地数据
                    var localStorage = window.localStorage; 
                    localStorage.setItem('userMessage',(JSON.stringify(res.data))); 
                    
                    //登录
                    alert('登录成功')
                    location.reload();
                    
                    this.$refs.loginDiv.style.display = 'none' // 关闭显示
                    this.$refs.cover.style.display = 'none'    // 关闭显示
                    
                }

            })
        },
        close(){
            this.$refs.loginDiv.style.display = 'none' // 关闭显示
            this.$refs.cover.style.display = 'none'    // 关闭显示
        }
    }
}
</script>

<style>


.cover{
    position: fixed;
    display: none;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(3,3,3,0.4);
    z-index: 9999;
}
.login .loginDiv{
    border-radius: 8px;
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    height: 480px;
    z-index: 999999;
    background-color: #fafafa;;    
}
.loginDiv .close{
    margin-left: 330px;
    cursor: pointer;

}
.loginDiv .imgs{
    margin-top: 30px;
}
.loginDiv .img{
    font-size: 130px;
    margin: 0 110px;
    color: gray;
}
.loginDiv .info{
    margin-top: 50px;
}

.loginDiv .info input{
    margin: 5px 50px;
    width: 250px;
    height: 30px;
    font-size: 16px;
    border-radius: 3px;
    border: 1px solid gray;
}
.loginDiv  button{
    background-color: brown;
    border: none;
    margin: 15px 50px 0 50px;
    border-radius: 3px;
    color: white;
    width: 252px;
    height: 30px;
    cursor: pointer;
}


</style>