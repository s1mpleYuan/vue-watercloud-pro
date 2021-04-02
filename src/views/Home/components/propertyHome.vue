<template>
  <div class="index-container">
    <div class="enter-box">
      <div
        class="row"
        v-for="(item, i) in boxUIList"
        :key="i"
        :style="{ height: getRowHeight() }"
      >
        <div
          class="col"
          v-for="(col, i2) in item"
          :key="i2"
          :style="{ width: getColWidth(item, col) }"
        >
          <div :class="['title', col.className]" 
          @mouseenter="col.contentShow = true">
            <span>
              {{ col.name }}
            </span>
          </div>
          <transition name="el-zoom-in-center">
            <div
              v-show="col.contentShow"
              class="layer transition-box"
              v-html="col.content"
              @mouseleave="col.contentShow = false"
            ></div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { property } from '@/views/Home/box';
export default {
  name: 'PropertyHome',
  data() {
    return {
      // 卡片渲染列表数组
      boxUIList: [],
      avatarUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    };
  },
  created() {
    for (let i = 0; i < property.length; i++) {
      const row = property.filter((item) => item.row == i + 1);
      if (row.length && row.length > 0) {
        this.boxUIList.push(row);
      } else {
        break;
      }
    }
    // this.boxUIList = property;
  },
  methods: {
    layerShow(col) {
      col.contentShow = true;
    },
    layerHide(col) {
      col.contentShow = false;
    },
    // 根据渲染列表计算row的高度
    getRowHeight() {
      const num = this.boxUIList.length || 0;
      return 100 / num + '%';
    },
    // 计算当前box宽度
    getColWidth(item, col) {
      const ratioArr = [];
      item.forEach((ele) => {
        if (ele.ratio) {
          ratioArr.push(ele.ratio);
        }
      });
      const total = ratioArr.reduce((total, num) => {
        return total + num;
      }, 0);
      return (100 / total) * col.ratio + '%';
    },
  },
};
</script>

<style lang="less" scoped>
.index-container {
  width: 100%;
  height: 100%;
  flex: 1;
  .enter-box {
    width: 100%;
    height: 100%;
    .row {
      display: block;
      width: 100%;
      .col {
        float: left;
        display: block;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
        .title {
          border-radius: 6px;
          background-color: #fff;
          color: #fff;
          height: 100%;
          text-align: center;
          span {
            position: relative;
            top: 20%;
            font-size: 24px;
          }
        }
        .layer {
          border-radius: 6px;
          position: relative;
          top: -100%;
          height: 0;
          background-color: rgba(0, 0, 0, 0.9);
          color: #fff;
          width: 100%;
          height: 100%;
          display: inline-block;
          text-align: center;
          cursor: pointer;
        }
        .show {
          height: 100%;
        }
      }
    }
  }
}
.operator {
  background: url(../../../assests/images/home/operator.jpg);
  background-size: 100%;
}
.archives {
  background: url(../../../assests/images/home/archives.jpg);
  background-size: 100%;
}
</style>
