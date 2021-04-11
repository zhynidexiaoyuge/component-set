<template>
  <div class="home_page_container"></div>
</template>

<script>
import routers from "../../router/routers";
export default {
  name: "home_page",
  data() {
    return {};
  },
  mounted() {
    console.log("组织好的路由数据如下所示");
    console.table(routers);
  },
};
</script>

<style scoped>
.home_page_container {
  width: 100%;
  height: 100%;
  background: url("/image/background.png") no-repeat center;
}
</style>
