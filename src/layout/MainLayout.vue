<template>
  <a-layout class="layoutContainer">
    <left-sider></left-sider>
    <a-layout>
      <top-header></top-header>
      <right-content></right-content>
    </a-layout>
  </a-layout>
</template>

<script>
import TopHeader from "./components/TopHeader";
import LeftSider from "./components/LeftSider";
import RightContent from "./components/RightContent";
export default {
  name: "MainLayout",
  components: {
    TopHeader,
    LeftSider,
    RightContent,
  },
  data() {
    return {
      loading: false,
      post: null,
      error: null,
    };
  },
  created() {},
  watch: {
    // '$route': 'fetchData'
  },
  methods: {},
};
</script>

<style scoped>
.layoutContainer {
  height: 100%;
}
</style>
