<template>
  <div>
    <table class="el_table">
      <thead>
        <th>歌曲</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr v-for="(item,index) in musicList" :key="index" @click="isplay(item.id)">
          <td>{{ item.name }}</td>

          <td>{{ item.ar[0].name }}</td>

          <td>{{ item.al.name }}</td>

          <td class="time">{{ getTitleTime(item.dt)}}</td>
        </tr>
      </tbody>
    </table>
    <div class="white"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collectList: JSON.parse(localStorage.getItem("collectList")),
      musicList: [],
    };
  },
  //渲染歌单
  created() {
    this.getmusic();
  },
  //点击别的歌单时，能相应地刷新界面
  watch: {
    $route() {
      this.getmusic();
    },
  },
  methods: {
    getmusic() {
      this.$axios({
        method: "get",
        url: "/playlist/detail",
        params: {
          id: this.$route.query.w,
        },
      }).then((res) => {
        this.musicList = res.data.playlist.tracks;
        console.log(this.musicList);
      });
    },

    //播放
    isplay(id) {
      //将歌曲id和歌单信息给Vuex进行管理
      this.$store.commit("getId", id);
      this.$store.commit("getMusics", this.musicList);

      this.$axios({
        method: "get",
        url: "song/url",
        params: {
          id,
        },
      }).then((res) => {
        let url = res.data.data[0].url;
        this.$parent.musicUrl = url;
        this.$vue.$emit("isPlay", 0);
      });
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
  }
}
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
}
th {
  color: #aaaaaa;
  text-align: left;
}
table,
th,
td {
  padding: 5px 20px 5px 10px;
}
.el_table tr:nth-child(2n) {
  background-color: rgb(245, 245, 245);
}
.el_table tr:hover {
  background-color: rgb(235, 235, 235);
}

.white {
  height: 200px;
}
</style>