<template>
  <div class="top">
    
    <div class="logo">
        <span class="iconfont playerLogo">&#xe69c;</span>
        <span class="playerName">有音乐</span>
    </div>

    <div class="search">
        <input placeholder="请输入内容" type="text" v-model="keywords"	class="in" @keyup.enter="toSearch">
        <span class="iconfont toSearch" @click="toSearch">&#xe70a;</span>
    </div>

    <div class="login loginOut" @click="loginOut" ref="loginOut">
        <img :src="picture" alt="">
        <span class="username">用户{{ username }}</span>
        <span class="iconfont out">&#xe63b;</span>
    </div>
    <div class="login" ref="login" @click="login">
        <span class="iconfont userLogo">&#xe681;</span>
        <span class="doubtUser" ref="loginSuccess">未登录</span>
    </div>
    
  </div>
</template>

<script>
export default {
    data(){
        return{
            keywords:'',
            username:'',
            picture:'',
            
        }
    },
    mounted(){
        const userMessage = JSON.parse(localStorage.getItem("userMessage"));
        if(userMessage){
            this.username =  userMessage.account.id
            this.picture = userMessage.profile.avatarUrl;
            this.loginIng()
        } 
    },
    methods:{
        toSearch(){
                if(this.keywords == ''){
                    alert('请输入内容')
                }else{
                    this.$router.push('/search?q='+this.keywords)
                }
            },
        login(){
            this.$vue.$emit('openLogin',true)    
        },
        loginIng(){
            this.$refs.login.style.display = 'none'
            this.$refs.loginOut.style.display = 'block'
        },
        loginOut(){
            this.$refs.login.style.display = 'block'
            this.$refs.loginOut.style.display = 'none'
            localStorage.clear();
            location.reload();
        }

    }
    
}
</script>


<style>
.top{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
	display: flex;
    align-items: center;
    background-color: rgb(198, 50, 47);
}
.top .in{
	height: 30px;
	width: 150px;
	border-radius:15px;
	border: none;
	padding: 0 25px;
	background-color: rgb(168, 40, 40);
	outline:medium;
	margin: 0 0 0 200px;
	color: beige;
}

/* 播放器名字 */
.logo .playerLogo{
    color: rgb(241, 241, 226);
}


/* 搜索 */
.search {
    position: absolute;
}
.search .toSearch {
    position: relative;
    top: 5px;
    right: 35px;
    color: rgb(190, 190, 189);
}



/* 用户登录 */
@font-face {
  font-family: 'iconfont';
  src: url('../assets/logoo/iconfont.eot');
  src: url('../assets/logoo/iconfont.eot?#iefix') format('embedded-opentype'),
      url('../assets/logoo/iconfont.woff2') format('woff2'),
      url('../assets/logoo/iconfont.woff') format('woff'),
      url('../assets/logoo/iconfont.ttf') format('truetype'),
      url('../assets/logoo/iconfont.svg#iconfont') format('svg');
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.login{
    display: block;
    position: absolute;
    right: 50px;
}

/* 未登录 */
.login .user{
    color: aliceblue;
}

/* 已登录 */
.login img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.login .username{
    font-size: 14px;
    color: rgb(218, 219, 219);
    position: relative;
    left: 5px;
    bottom: 8px;
}
.loginOut{
    display: none;
}
.login .out{
    font-size: 25px;
    position: relative;
    bottom: 5px;
    left: 15px;
    cursor: pointer
}
.login .userLogo{
    font-size: 15px;
    color: rgb(218, 195, 195);
    position: relative;
    right: 5px;
    
}
.login .doubtUser{
    font-size: 10px;
    color: rgb(218, 195, 195);
    position: relative;
    left: 5px;
    bottom: 1px;
    cursor: pointer;
}




</style>