<template xmlns:v-if="http://www.w3.org/1999/xhtml">
  <a-layout-sider class="leftSiderContainer"
                  v-model:collapsed="menuStateRef.menuCollapsed.value"
                  collapsible
  >
    <div class="logo">
      <a>
        <img class="logoImgNotCol"
             :src="logoInfo.logoUrl"
             :alt="logoInfo.logoAlt"
             v-if="!menuStateRef.menuCollapsed.value" />
        <img class="logoImgCol"
             :src="logoInfo.logoUrl"
             :alt="logoInfo.logoAlt"
             v-else />
        <h1 v-if="!menuStateRef.menuCollapsed.value">Stock Manager</h1>
      </a>
    </div>
    <a-menu
            theme="dark"
            mode="inline"
            v-model:selectedKeys="menuStateRef.menuSelectedKeys.value"
            @click="handleClick"
    >
      <menu-item
              v-for="(menuItem, index) in menuItems"
              :menu-item="menuItem"
              :key="index"

      ></menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import MenuItem from "./MenuItem";
import { defineComponent, toRefs, getCurrentInstance } from "vue";

export default defineComponent({
  name: "LeftSider",
  components: {
    MenuItem,
  },
  data() {
    return {

    }
  },
  methods: {
    handleClick(e) {
      this.$store.commit('menu/setMenuSelectedKeys', [e.key])
      this.$router.push({path: this.menuItems[e.key].routeTo})
    }
  },
  setup() {
    const { ctx } = getCurrentInstance();

    const menuItems = [
            {
              iconTypes: 0,
              url: "#",
              routeTo: "/home/dashboard",
              itemName: "DashBoard",
            },
            {
              iconTypes: 1,
              url: "#",
              routeTo: "/home/stock",
              itemName: "库存管理",
            },
            {
              iconTypes: 2,
              url: "#",
              routeTo: "/home/order",
              itemName: "订单管理",
            },
            {
              iconTypes: 3,
              url: "#",
              routeTo: "/home/client",
              itemName: "客户管理",
            },
            ]

    const logoInfo = {
      logoUrl: "/static/logo.svg",
      logoAlt: "logo",
    };

    const menuStateRef = toRefs(ctx.$store.getters.menuState)

    const toggleCollapsed = () => {
      ctx.$store.commit('menu/setMenuCollapsed')
    };

    ctx.$router.push({path: menuItems[ctx.$store.getters.menuSelectedKeys[0]].routeTo});

    return {
      logoInfo,
      toggleCollapsed,
      menuStateRef,
      menuItems
    };
  },
});
</script>

<style scoped>
  .leftSiderContainer{

  }

.logo {
  position: relative;
  display: flex;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  justify-content: center;
  min-height: 32px;
  transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.logo h1 {
  display: inline-block;
  height: 32px;
  margin: 0 0 0 12px;
  color: #fff;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  vertical-align: middle;
  animation: pro-layout-title-hide 0.3s;
}

.logoImgNotCol {
  display: inline-block;
  height: 32px;
  vertical-align: middle;
}

  .logoImgCol{
    display: inline-block;
    height: 32px;
    vertical-align: middle;
  }
</style>
