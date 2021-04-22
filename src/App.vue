<template>
  <router-view />
</template>

<script>
  // import store from "./store";
  export default {
    name: "App",
    // 先采用存入localStorage的方法解决Token存放的问题
    // TODO 后应结合异步后台访问
    created() {
      //在页面加载时读取sessionStorage里的状态信息
      if (localStorage.getItem('store')) {
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(localStorage.getItem('store'))));
      }

      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener('beforeunload', () => {
        localStorage.setItem('store', JSON.stringify(this.$store.state));
      });
    }
  };
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
  }
</style>
