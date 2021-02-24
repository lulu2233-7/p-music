<template>
  <div id="app">
    <the-header></the-header>
    <the-body></the-body>
    <the-login></the-login>
  </div>
</template>

<script>
import Header from './views/Header'
import Body from './views/Body'
import Login from './views/Login'

export default {
  data(){
    return{

    }
  },
  name:'app',
  components:{
    'theHeader':Header,
    'theBody':Body,
    'theLogin':Login
  }
}
</script>

<style>

</style>