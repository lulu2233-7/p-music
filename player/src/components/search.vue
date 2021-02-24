<template>
  <div class="search-container">
      <!-- 搜索关键词 -->
    <h2>{{ $route.query.q }}</h2>
    <div>{{ this.number }}</div>
      <!-- 标签页 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="歌曲" name="first">
            <table class="el_table">
                <thead>
                    <th></th>
                    <th>音乐标题</th>
                    <th>歌手</th>
                    <th>专辑</th>
                    <th>时长</th>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in songList" :key="index" @click="topaly(item.id,index)">
                        <td class="collect">
                            <div class="collect">
                                <div class="iconfont" @click="setcollect(item.id)">&#xe640;</div>
                                <div class="iconfont" @click="clearcollect(item.id)">&#xe60d;</div>
                            </div>
                        </td>

                        <td class="title">
                            <div>
                                {{ item.name }} 
                                <span v-if="item.mvid!=0" class="iconfont">&#xe62c;</span>
                            </div>
                        </td>
                        <td class="singer">{{ item.artists[0].name }}</td>
                        
                        <td class="cd">{{ item.album.name }}</td>
                        <td class="time">{{ getTitleTime(item.duration)}}</td>
                        
                    </tr>
                </tbody>
            </table>
            <div class="page">
                <el-pagination
                background
                layout="prev, pager, next"
                @current-change="handleCurrentChange" 
                :page-size="limit" 
                :current-page='page'
                :total="total">
                </el-pagination>
            </div>
            
                
        </el-tab-pane>
        <el-tab-pane label="歌单" name="second">歌单</el-tab-pane>
        <el-tab-pane label="MV" name="third">MV</el-tab-pane>
    </el-tabs>

    <div class="white"></div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            words:'',
            number:'',
            total:0,
            page: 1,
            limit: 30,
            type:1,
            activeName: 'first',
            songList:[],    //未整理完的数据
            allsongs:[],    //整理完的数据

            collect:1,
            isShow:'',
            
        }
    },
    created(){
        this.getmusic()
    },
    watch: {
        //监听路由变化，因为在result中再次搜索。不会刷新
        $route() {
            this.getmusic() //更新单曲
        }
    },
    
    
    methods:{
        getmusic(){
          this.$axios({
            method:'get',
            url:'/search',
            params:{
                keywords: this.$route.query.q,
                type: 1,
                limit: this.limit,
                offset: (this.page - 1) * this.limit
            }}).then(res => {
                this.songList = res.data.result.songs
                this.total = res.data.result.songCount
                
                //整理数据
                let n = this.songList.length;
                for(let i = 0; i < n; i++){
                    let obj = {};
                    obj.id = this.songList[i].id;
                    obj.song = this.songList[i].name;
                    obj.singer = this.songList[i].artists[0].name;
                    //obj.dt = this.formatDt(arr[i].dt)
                    this.allsongs.push(obj)
                }
            })
        },
        handleCurrentChange(val) {
            this.page = val
            this.getmusic()
            //window.sessionStorage.setItem('search', this.page)
        },
       
        
        topaly(musicId,index){
            
            this.isShow = index
            console.log(index);

            //保存点击歌曲的id以及邻近歌曲
            const that = this.allsongs
            this.$store.commit('getId',musicId)     
            this.$store.commit('getMusics',that)
            
            this.$axios({
                method:'get',
                url:'song/url',
                params:{
                    id:musicId
                }
            }).then(res =>{
                let url = res.data.data[0].url
                this.$parent.musicUrl = url
                this.$vue.$emit("isPlay",0)
            })
        },

        //收藏歌曲
        setcollect(id){
            this.$axios({
            method:'get',
            url:'/playlist/tracks',
            params:{
                op:'add',
                pid:1980225494,
                tracks:id
            }
            }).then(res=>{
                alert("已收藏")
            })
            
        },

      //取消收藏
      clearcollect(id){
        this.$axios({
        method:'get',
        url:'/playlist/tracks',
        params:{
            op:'del',
            pid:1980225494,
            tracks:id
        }
        }).then(res=>{
            alert("已移除")
         })
      },

      //获得总时长
      getTitleTime(time){
        time = time/1000
        var m = parseInt(time / 60);
        var s = parseInt(time % 60);
        m<10?(m="0"+m):m
        s<10?(s="0"+s):s
        return m + ":" + s
      }

    },

    
}
</script>

<style>
.search-container{
  width: 1000px;
  margin: 0 auto;
}

table{
    border-collapse: collapse;
    width: 100%;
}
th{
    color: #aaaaaa;
    text-align:left;
}
table, th, td{
    padding: 5px 20px 5px 10px;
}
.el_table tr:nth-child(2n){
    background-color: rgb(245,245,245);
}
.el_table tr:hover{
    background-color: rgb(235,235,235);
}
.page{
    margin: 30px 300px;
}






.white{
  height: 100px;
}

</style>