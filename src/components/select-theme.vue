
<template>
  <div class="select_theme_box">
    <div class="select_thme_title">{{ inputName }}</div>
    <ul class="menu_list">
      <li v-for="(t, i) in menuList" :key="'menu' + i" @click="changeTheme(t)">{{ t.label }}</li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: ["select_theme"],
  data() {
    return {
      inputName: "默认主题",
      menuList: window.globalConfig.themes
    };
  },
  methods: {
    ...mapMutations("theme", ["setTheme"]),
    changeTheme(params) {
      this.inputName = params.label;
      this.setTheme(params.name);
    }
  }
};
</script>

<style lang="scss" scoped>
.select_theme_box {
  box-sizing: border-box;
  position: absolute;
  z-index: 99;
  top: 10px;
  right: 100px;
  width: 100px;
  height: 28px;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  cursor: pointer;
  div.select_thme_title {
    box-sizing: border-box;
    width: 90px;
    height: 100%;
    text-align: center;
    background: transparent;
    color: #fff;
    user-select: none;
    line-height: 28px;
  }
  ul.menu_list {
    width: 100%;
    padding: 4px 0px;
    li {
      width: 100%;
      height: 26px;
      line-height: 26px;
      text-align: center;
      &:hover {
        background: #00b7ff;
      }
    }
  }
}
</style>
