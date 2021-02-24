/* 管理下一曲、上一曲的 */

import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

//2.创建插件
const store = new Vuex.Store({
    state:{
        id: 0,
        index: 1,
        allMusic:[],
    },
    mutations:{
        getId(state, musicId){
            state.id = musicId
        },
        getMusics(state,that){
            state.allMusic = that
        },
        changeIndex(state,getposition){
            state.index = getposition
        },
        increment(state){
            state.index++
        },
        decrement(state){
            state.index--
        },
    },
    actions:{},
    getters:{},
    modules:{}
})

//3.导出store独享
export default store