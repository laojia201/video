<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import SvgBigTree from "@/components/SvgBigTree.vue";

export default {
  data() {
    return {
      treeDatas: {
        leftDatas: [],
        rightDatas: [],
        mapRelations: [],
      },
      options: {
        svg: {
          width: "120px",
        },
        dragula: {},
        tree: {
          left: {
            navBar: {
              bg: "rgba(0, 0, 0, 0.5)",
              width: "10px",
            },
            itemHeight: 24,
          },
          right: {
            navBar: {
              bg: "rgba(0, 0, 0, 0.5)",
              width: "10px",
            },
            itemHeight: 24,
          },
        },
      },
    };
  },
  created() {
    let nums = 100000;
    for (let i = 0; i < nums; i++) {
      this.treeDatas.leftDatas.push({
        label: new Date().getTime() + i,
        key: i,
      });
      this.treeDatas.rightDatas.push({
        label: new Date().getTime() + i,
        key: i,
      });
    }
  },
  components: {
    SvgBigTree,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
