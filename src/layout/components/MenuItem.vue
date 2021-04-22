<template>
  <a-menu-item>
    <a v-if="menuItem.iconTypes == 0">
      <dashboard-outlined />
      <span class="nav-text">{{ menuItem.itemName }}</span>
    </a>
    <a v-else-if="menuItem.iconTypes == 1">
      <form-outlined />
      <span class="nav-text">{{ menuItem.itemName }}</span>
    </a>
    <a v-else-if="menuItem.iconTypes == 2">
      <table-outlined />
      <span class="nav-text">{{ menuItem.itemName }}</span>
    </a>
    <a v-else-if="menuItem.iconTypes == 3">
      <user-outlined />
      <span class="nav-text">{{ menuItem.itemName }}</span>
    </a>
    <a v-else>
      <upload-outlined />
      <span class="nav-text">{{ menuItem.itemName }}</span>
    </a>
  </a-menu-item>
<!--
  <span v-if="iconTypes === 0"><dashboard-outlined /></span>
  <span v-else-if="iconTypes === 1"><form-outlined /></span>
  <span v-else-if="iconTypes === 2"><table-outlined /></span>
  <span v-else-if="iconTypes === 3"><user-outlined /></span>
  <span v-else><upload-outlined /></span>
-->
</template>

<script>
// import MenuIcon from "../menu/MenuIcon";
import {
  DashboardOutlined,
  FormOutlined,
  TableOutlined,
  UserOutlined,
  UploadOutlined,
} from "@ant-design/icons-vue";
export default {
  name: "MenuItem",
  props: {
    menuItem: {
      iconTypes: Number,
      itemName: null,
    },
  },
  components: {
    // MenuIcon,
    DashboardOutlined,
    FormOutlined,
    TableOutlined,
    UserOutlined,
    UploadOutlined
  },
};
</script>

<style scoped></style>
