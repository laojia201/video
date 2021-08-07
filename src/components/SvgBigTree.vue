<template>
  <div class="svg-tree">
    <bigTree :treeDatas="treeLeftDatas" :options="leftOptions"></bigTree>
    <div class="svg" ref="svg"></div>
    <bigTree :treeDatas="treeRightDatas" :options="rightOptions"></bigTree>
  </div>
</template>
<script>
import BigTree from "@/components/BigTree.vue";

export default {
  name: "SvgBigTree",
  data() {
    return {
      treeLeftDatas: [],
      treeRightDatas: [],
      leftOptions: {},
      rightOptions: {},
      svg: null,
    };
  },
  methods: {},
  mounted() {
    this.svg = this.$refs.svg;
    this.svg.style.width = this.options.svg.width;
  },
  props: {
    treeDatas: Object,
    options: {
      svg: {
        type: Object,
        default: {
          width: "120px",
        },
      },
      dragula: Object,
      tree: Object,
    },
  },
  watch: {
    treeDatas: {
      handler(val) {
        this.treeLeftDatas = val.leftDatas;
        this.treeRightDatas = val.rightDatas;
      },
      immediate: true,
    },
    options: {
      handler(val) {
        if (!val) return;
        this.leftOptions = val.tree.left;
        this.rightOptions = val.tree.right;
      },
      immediate: true,
    },
  },
  components: {
    BigTree,
  },
};
</script>
<style scoped>
.svg-tree {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  /* padding-top: 6rem;
  box-sizing: border-box; */
}
.svg {
  flex-shrink: 0;
}
</style>
