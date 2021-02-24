<template>
  <div class="index-container">
    <div class="nav">
      <h3>推荐</h3>
      <ul class="recommandlist">
        <li><span class="iconfont symbol">&#xe680;</span><router-link to="/discovery">发现音乐</router-link></li>
        <li><span class="iconfont symbol">&#xe636;</span><router-link to="/recommend">推荐歌单</router-link></li>
        <li><span class="iconfont symbol">&#xe645;</span><router-link to="/collect">最新音乐</router-link></li>
        <li><span class="iconfont symbol">&#xe64e;</span><router-link to="/collect">最新mv</router-link></li>
      </ul>

      <h3>我的歌单</h3>
      <ul v-for="item in collectList" :key="item.id" class="list">
        <li class="collectList" @click="list(item.id)"><span class="iconfont symbol">&#xe636;</span>{{ item.name }}</li>
      </ul>

    </div> 
    <div class="main">
      <router-view></router-view> 
    </div>
    <div class="player">
      <div class="background"> <!-- 播放按钮 -->
      <div class="play-btn">
        <span class="iconfont" @click="prevSong">&#xe60b;</span>
        <span class="iconfont play" @click="isplay" v-show="player">&#xe6d1;</span>
        <span class="iconfont play" @click="isstop" v-show="!player">&#xe6d2;</span>
        <audio :src="musicUrl" autoplay controls="controls" ref="audio" @ended="onended" @playing="processBar"></audio> <!-- playing 在媒体开始播放时触发（不论是初次播放、在暂停后恢复、或是在结束后重新开始）。 -->
        <span class="iconfont" @click="nextSong">&#xe6a1;</span>
      </div>
      <!-- 进度条 -->
      <div>
        <span class="currentTime"> {{ currentTime }} </span>
        <div class="bar"><el-slider v-model="currentBar" :show-tooltip="false" @click.native="changeBar(currentBar)"></el-slider></div>
        <span class="titleTime"> {{ titleTime }} </span>
      </div>
      
      <!-- 播放模式 -->
      <div class="isPattern">
        <span class="iconfont" @click="playPattern" v-show="this.pattern === 0">&#xe60c;</span>
        <span class="iconfont" @click="playPattern" v-show="this.pattern === 1">&#xe672;</span>
        <span class="iconfont" @click="playPattern" v-show="this.pattern === 2">&#xe6a3;</span>
      </div>
      <!-- 音量 -->
      <div class="volume-logo">
        <span class="iconfont" @click="quire" v-show="isquire">&#xe615;</span>
        <span class="iconfont" @click="voice" v-show="!isquire">&#xe6c9;</span>
      </div>
      <div class="volume-img"><el-slider v-model="noise" :show-tooltip="false"></el-slider></div>
      </div>
      
    </div>   
  </div>
</template>

<script>

export default {
    data(){
        return{
          musicUrl:'',
          pattern: 0,              //播放模式
          collectList:[],          //得到用户的全部歌单
          currentBar:0,            //播放进度条
          player:1,                //播放按钮
          noise:30,                //音量大小
          isquire:1,
          currentTime:"00:00",
          currentTimeM:'00',       //分
          currentTimeS:'00',       //秒
          titleTime:'00:00'        //歌曲总时长
        }
    },
    watch:{
      noise:function (val) {
        this.$refs.audio.volume = val/100
      }
    },
    methods:{

      //播放

      //得到歌曲id位于数组的第几个
      getposition(){
        let n = this.$store.state.allMusic.length
        for(let i = 0; i < n; i++){
          if(this.$store.state.allMusic[i].id===this.$store.state.id){
            return i;
          }
        }
        return -1
      },
      
      //下一曲
      nextSong(){
        const getposition = this.getposition();
        this.$store.commit('changeIndex', getposition)
        this.$store.commit('increment')
        this.$store.commit('getId',this.$store.state.allMusic[this.$store.state.index].id)
        this.play()      
      },

      //上一首
      prevSong(){
        const getposition = this.getposition();
        this.$store.commit('changeIndex',getposition)
        this.$store.commit('decrement')
        this.$store.commit('getId',this.$store.state.allMusic[this.$store.state.index].id)
        this.play()
      },

      //播放
      play(){
        this.$axios({
          method:'get',
          url:'song/url',
          params:{
            id: this.$store.state.allMusic[this.$store.state.index].id
          }
        }).then(res=>{
          this.musicUrl = res.data.data[0].url
        })
        
      },
      
      //模式切换
      playPattern(){
        this.pattern = (this.pattern + 1)%3
        console.log(this.pattern);
      },

      //单曲循环模式
      single() {
        return setTimeout(()=>{
        this.$refs.audio.play()
        },1000)
      },

      //列表模式
      onended (){     //@ended="onended" 当播放器歌曲结束时，就会触发这个函数
        if(this.pattern == 0){         //列表播放
          this.nextSong()             
        }else if(this.pattern == 2){   //循环播放
          this.single();              
        }else{                         //随机播放
          this.$store.commit('changeIndex', this.getRandom(this.$store.state.allMusic.length))
          this.$store.commit('getId',this.$store.state.allMusic[this.$store.state.index].id)
          this.play()
        }
      },
      
      //获得随机数
      getRandom(maxNumber){
        if(parseInt(Math.random()*(maxNumber+1),10) == this.getposition()){
          getRandom(maxNumber)
        }else{
          return parseInt(Math.random()*(maxNumber+1),10);
        }
      },


    //收藏列表
      list(res){
        this.$router.push('/collect?w='+res)
      },

      //进度条
      processBar(){
        return setInterval(()=>{
        this.currentBar = this.$refs.audio.currentTime/this.$refs.audio.duration*100
        this.currentTime = this.getTitleTime(this.$refs.audio.currentTime)
        },100),this.titleTime = this.getTitleTime(this.$refs.audio.duration)
      },

      //获得总时长
      getTitleTime(time){
        var m = parseInt(time / 60);
        var s = parseInt(time % 60);
        m<10?(m="0"+m):m
        s<10?(s="0"+s):s
        return m + ":" + s
      },
      
      //改变进度条
      changeBar(time){
        this.$refs.audio.currentTime = time*this.$refs.audio.duration/100
      },

      //播放
      isplay(){
        this.$refs.audio.play()
        this.player = (this.player+1)%2
      },

      //暂停
      isstop(){
        this.$refs.audio.pause()
        this.player = (this.player+1)%2
      },

      //静音
      quire(){
        this.$refs.audio.volume = 0;
        this.isquire = (this.isquire+1)%2
      },

      //非静音
      voice(){
        this.$refs.audio.volume = 1;
        this.isquire = (this.isquire+1)%2
        console.log(111);
      },

      //获取用户歌单
      getUserList(){
        if(localStorage.getItem('userMessage')){
          const uid = (JSON.parse(localStorage.getItem('userMessage'))).account.id  /* 获得uid */
          this.$axios({
            method: 'get',
              url: '/user/playlist?uid='+uid 
            }).then(res => {
              this.collectList = res.data.playlist
              localStorage.setItem('collectList',JSON.stringify(this.collectList))
            })
        }
      }




  },
    
    
    //获取用户歌单
    created(){
       this.getUserList()
       this.$vue.$on("isPlay",res=>{
         this.player = 0                //解决歌曲点击时，变成播放按钮
       })
    },

    
}
</script>

<style>
/* 侧栏 */
.index-container .nav{
  width: 206px;
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  background-color: rgb(248,248,248);
}
.nav .collectList{
  width: 140px;
}
.nav .collectList{
  word-break:keep-all;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.index-container .nav ul{ 
  padding: 0;
}
.index-container .nav li{ 
  list-style-type: none;
}
.recommandlist li{
  padding: 8px 25px;
}
.recommandlist li:hover{ 
  background-color: rgb(235,235,235);
}
.nav .list li{
  padding: 1px 25px;
}
.nav .list:hover{ 
  background-color: rgb(235,235,235);
}
.index-container .nav a{
  text-decoration: none; /* 去除默认的下划线 */
	outline: none;	/* 去除旧版浏览器的点击后的外虚线框 */
	color: #000;	/* 去除默认的颜色和点击后变化的颜色 */ 
}
.index-container .nav .symbol{
  font-size: 14px;
  margin-right: 8px;
}
h3{
  color: rgb(82, 82, 82);
}






/* 主体 */
.index-container .main{
  position: fixed;
  top: 60px;
  left: 206px;
  bottom: 0;
  right: 0;
  background-color: rgb(255, 255, 255);
  overflow: scroll;
  height: 100%;

}

/* 播放器 */
.index-container .player{
  position: fixed;
  height: 50px;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: goldenrod;
  
}
.player .background{
  position: relative;
}
.player .play-btn{
  position: absolute;
  top: 13px;
  left: 2%;
}
.player .play-btn audio{
  width: 0;
  height: 0;
}
.play{
  margin-left: 3px;
}

/* 进度条 */
.player .bar{
  position: absolute;
  width: 55%;
  top: 5px;
  left: 14%;
}
.player .currentTime{
  position: absolute;
  top: 13px;
  left: 10%;
}
.player .titleTime{
  position: absolute;
  top: 13px;
  left: 70.5%;
}
.player .isPattern{
  position: absolute;
  top: 13px;
  right: 350px;
}
.player .volume-img{
  position: absolute;
  top: 5px;
  right: 40px;
  width: 250px;
}
.player .volume-logo{
  position: absolute;
  top: 13px;
  right: 310px;
}
</style>