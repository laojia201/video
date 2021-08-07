<template>
  <div class="big-tree" ref="bigTree">
    <div class="tree-box" ref="treeBox"></div>
    <div class="tree-content" ref="treeContent"></div>
  </div>
</template>
<script>
import {
  rmClass,
  elt,
  on,
  removeChildrenAndAdd,
  off,
  getEleRelativePos,
} from "@/utils/common.js";

export default {
  name: "BigTree",
  data() {
    return {
      bigTree: null,
      treeBox: null,
      treeContent: null,
      viewHeight: 0,
      barOffsetTop: 0,
      barHeight: 0,
    };
  },
  methods: {
    // 初始化滚动条
    initNavBar() {
      let that = this;
      if (!this.isHasNavBar) return;
      this.barHeight =
        Math.floor(
          (this.viewHeight /
            ((this.treeDatas.length * this.options.itemHeight + 4) / 400)) *
            100
        ) / 100;
      let barDom = elt(
        "div",
        "",
        "bar",
        `background:${this.options.navBar.bg};height:${
          this.barHeight > 20 ? this.barHeight : 20
        }px;`
      );
      this.treeBox.style.width = this.options.navBar.width;
      on(this.treeBox, "mousedown", mouseDown);
      removeChildrenAndAdd(this.treeBox, barDom);
      function mouseDown(e) {
        on(document, "mousemove", mouseMove);
        on(document, "mouseup", mouseUp);
      }
      function mouseMove(e) {
        let _pos = getEleRelativePos(that.treeBox);
        if (e.clientY <= 0) {
          that.barOffsetTop = 0;
        } else if (e.clientY - _pos.top >= that.viewHeight - that.barHeight) {
          that.barOffsetTop = that.viewHeight - that.barHeight;
        } else {
          that.barOffsetTop = e.clientY - _pos.top;
        }
        barDom.style.top = that.barOffsetTop + "px";
        that.initContent();
      }
      function mouseUp(e) {
        off(document, "mouseup", mouseUp);
        off(document, "mousemove", mouseMove);
      }
    },
    // 初始化渲染内容
    initContent() {
      let showDOMs = [];
      for (let i = 0; i < this.visibleDatas.length; i++) {
        showDOMs.push(
          elt(
            "span",
            [
              elt("div", this.visibleDatas[i].key + "、", "item-index", ""),
              elt("span", "", "item-padleft"),
              elt("div", this.visibleDatas[i].label, "item-content"),
            ],
            "row",
            `height:${this.options.itemHeight}px;`
          )
        );
      }
      let contentItem = elt(
        "div",
        showDOMs,
        "item-box",
        `transform: translateY(${0}px);margin-right:${
          this.isHasNavBar ? "10px" : 0
        }`
      );
      removeChildrenAndAdd(this.treeContent, contentItem);
    },
    // 页面初始化入口
    init() {
      this.bigTree = this.$refs.bigTree;
      this.treeBox = this.$refs.treeBox;
      this.treeContent = this.$refs.treeContent;
      this.viewHeight = this.treeContent.offsetHeight;
      this.initContent();
      this.initNavBar();
    },
    // 页面大小改变重新渲染
    updatedView() {
      this.init();
      on(window, "resize", (e) => {
        this.init();
      });
    },
  },
  created() {
    // console.log(this.treeDatas);
  },
  mounted() {
    this.updatedView();
  },
  props: {
    treeDatas: {
      type: Array,
      required: true,
      default: [],
    },
    options: {
      type: Object,
      required: false,
      default: {
        navBar: {
          bg: "#ccc",
          width: "10px",
        },
        itemHeight: {
          required: false,
          default: 24,
        },
      },
    },
  },
  computed: {
    isHasNavBar() {
      return (
        this.treeDatas.length * (this.options.itemHeight + 4) > this.viewHeight
      );
    },
    visibleDatas() {
      let showCount = Math.ceil(this.viewHeight / this.options.itemHeight);
      let visibleData = [];
      let start = Math.ceil(
        (this.barOffsetTop * (this.treeDatas.length - showCount)) /
          (this.viewHeight - this.barHeight)
      );
      visibleData = this.treeDatas.slice(start, start + showCount + 1);
      // console.log(this.barOffsetTop, start);
      return visibleData;
    },
  },
};
</script>
<style scoped>
.big-tree {
  flex: 1;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
}
.tree-box {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  z-index: 1000;
}
.tree-box >>> .bar {
  border-radius: 6px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
.tree-content {
  width: 100%;
  height: 100%;
  position: relative;
  user-select: none;
  overflow-y: hidden;
}
.tree-content >>> .content,
.tree-content >>> .item-box {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
.tree-content >>> .row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.tree-content >>> .item-content {
  flex: 1;
}
</style>
