<template>
  <a-layout-header class="header">
    <div class="left-empty"></div>
    <div class="header-right">
      <a-dropdown class="header-right-item">
        <a-avatar
                shape="square"
                size="large"
                :style="{ backgroundColor: color, verticalAlign: 'middle' }"
        >
          {{ getUserName }}
        </a-avatar>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;">个人中心</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">个人设置</a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item>
              <a href="javascript:;">退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script>
export default {
  name: "TopHeader",
  data() {
    return {
      userName: String,
      color: "#00a2ae",
    };
  },
  computed: {
    getUserName() {
      return this.$store.state.user.userName;
    },
  },
};
</script>

<style scoped>
.header {
  position: relative;
  display: flex;
  align-items: center;
  height: 6%;
  padding: 0 21px;
  background: #fff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}

.left-empty {
  flex: 1 1 0%;
}

.header-right {
  display: flex;
  float: right;
  height: 100%;
  margin-left: auto;
  overflow: hidden;
  box-sizing: border-box;
}

  .header-right-item{
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }

</style>
