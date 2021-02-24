<template>
  <div class="discovery-container">
    
    <!-- 轮播图 -->
    <el-carousel class="banners" :interval="4000" type="card" height="200px">
        <!-- 循环生成了一堆标签 -->
        <el-carousel-item v-for="(item,index) in banners" :key="index">
            <img class="bannersPicture" :src="item.imageUrl" alt="">
        </el-carousel-item>
    </el-carousel>

    <!-- 推荐歌单 -->
    <div>
      <div class="recommendTitle"><h3>推荐歌单</h3></div>
      <div class="recommend">

          <div class="recommendList" v-for="(item,index) in recommend" :key="index">
            <img class="recommendPicture" :src="item.picUrl" alt="">
            <div class="cell-play-btn-1">
              <div class="iconfont">&#xe605;</div>
            </div>
            <div class="content-1"><span>{{ item.copywriter }}</span></div>
            <div class="name-1">{{ item.name }}</div>           
          </div>
          
      </div>
    </div>
    
    <!-- 最新音乐 -->
    <div>
      <div class="recommendTitle"><h3>最新音乐</h3></div>
        <div class="new">
          <div class="newsong" v-for="(item,index) in newsong" :key="index">
            <img class="newsongPicture" :src="item.picUrl" alt="">
            <div class="iconfont cell-play-btn-2">&#xe605;</div>
            <div class="detail">
              <div class="songname">{{item.name}}</div>
              <div class="singer">{{item.song.artists[0].name}}</div>
          </div>
        </div>
      </div>
      
    </div>
    <!-- 推荐MV -->
    <div>
      <div class="recommendTitle"><h3>最新MV</h3></div>
      <div class="mv">
        <div class="newmv" v-for="(item,index) in mv" :key="index">
          <img class="newmvPicture" :src="item.picUrl" alt="">
          <div class="iconfont cell-play-btn-3">&#xe605;</div>
          <div> {{ item.copywriter }} </div>
          <div> {{ item.artistName }} </div>
        </div>
        </div>
    </div>
    <div class="white"></div>
  </div>
</template>

<script>
export default {
    data(){
      return {
        banners: [],
        recommend: [],
        newsong: [],
        mv: []
      }
    },
    
    created(){
      //轮播图
      this.$axios({
        method: 'get',
        url: '/banner'
      }).then(res => {
        this.banners = res.data.banners;
      });

      //推荐歌单
      this.$axios({
        method: 'get',
        url: '/personalized?limit=10'
      }).then(res => {
        this.recommend = res.data.result;
      });

      //最新音乐
      this.$axios({
        method: 'get',
        url: '/personalized/newsong'
      }).then(res => {
        this.newsong = res.data.result;
      });
      
      //最新MV
      this.$axios({
        method: 'get',
        url: '/personalized/mv'
      }).then(res => {
        this.mv = res.data.result;
      });
      
    }
}
</script>

<style>
.discovery-container{
  width: 1000px;
  margin: 0 auto;
}
.banners{
  margin: 20px 0 0 0;
}
.banners .bannersPicture{
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

/* 推荐歌单 */
.recommendTitle{
  margin: 10px ;
  font-size: 20px;
}
.recommend .recommendList {
  display: inline-block;
  width: 180px;
  margin: 0 10px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.recommend .recommendPicture{
  width: 180px;
  height: 180px;
  border-radius: 10px;
}
.recommend .recommendList .cell-play-btn-1{
  position: absolute;
  top: -50px;
  left: 150px;
  color: beige;
}
.recommend .recommendList:hover .cell-play-btn-1{
  top: 150px;
}

.recommend .recommendList .content-1{
  position: absolute;
  box-sizing: border-box;
  top: -120px;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: azure;
  width: 100%;
  
  border-radius: 10px 10px 0 0;
}
.recommend .recommendList:hover .content-1{
  transition: all 0.5s;
  top: 0; 
}

/* 文本超出隐藏且显示省略号 */
.recommend .recommendList .name-1{
  word-break:keep-all;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

/* 最新音乐 */
.new{
  margin: 10px;
}
.newsong {
  display: inline-block;
  width: 490px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.newsong .newsongPicture{
  width: 80px;
  height: 80px;
}
.newsong .cell-play-btn-2{
  font-size: 40px;
  color: beige;
  position: absolute;
  z-index: 99;
  top: -55px;
  left: 20px;
}
.newsong:hover .cell-play-btn-2{
  top: 20px;
}
.newsong .detail{
  display: inline-block;
  position: absolute;
}
.newsong .detail .songname{
  margin: 10px;
}
.newsong .detail .singer{
  margin: 10px;
  color: darkgrey;
  font-size: 12px;
}


/* 最新MV */

.mv {
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
}
.mv .newmv {
  position: relative;
  overflow: hidden;
}
.mv .newmvPicture{
  width: 230px;
  height: 120px;
  border-radius: 10px;
}

.mv .cell-play-btn-3{
  position: absolute;
  top: -315px;
  left: 90px;
  font-size: 50px;
  color: aliceblue;
}
.mv .newmv:hover .cell-play-btn-3{
  top: 35px;
}
.white{
  height: 200px;
}
</style>