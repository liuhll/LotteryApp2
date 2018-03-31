<template>
  <div>
   <group v-for="(helpGroup,index1) in onlineHelps" :title="helpGroup.helpTypeDesc" label-margin-right="2em" label-align="right">
      <div v-for="(item1,index2) in helpGroup.onlineItems" class="help-item-wrapper">
        <cell is-link  
          value-align="left" 
          :arrow-direction="index2 == showIndex ? 'up' : 'down'"
          @click.native="showContent(index2)">{{item1.title}}        
        </cell>
        <!-- <help-content v-for="(item3,index3) in helpGroup.onlineItems"  :content="item3.content" :index="index3"></help-content> -->
       <template v-if="index2 == showIndex">
        <cell-box :border-intent="false" class="sub-item">
          {{item1.content}}
        </cell-box>
       </template>
      </div>
   </group>
  </div>
  
</template>

<script>
import { Grid, GridItem, Group, Cell, CellBox, XButton } from "vux"
import { error } from "util";
export default {
  components: {
    Grid,
    GridItem,
    Group,
    Cell,
    CellBox,
    XButton
  },
  data() {
    return {
      onlineHelps: [],
      showIndex: -1
    };
  },
  methods: {
    showContent(index) {
      if (this.showIndex == -1) {
        this.showIndex = index
      } else if (index == this.showIndex) {
        this.showIndex = -1
      } else {
        this.showIndex = index
      }
    }
  },
  created() {
    this.$store
      .dispatch("LotteryInfo")
      .then(lotteryInfo => {
        this.$vux.loading.show(`正在获取在线帮助`);
        this.$store
          .dispatch("OnlineHelp", { lotteryCode: lotteryInfo.lotteryCode })
          .then(data => {
            this.$vux.loading.hide();
            this.onlineHelps = data
          })
          .catch(error => {
            this.$vux.loading.hide();
            this.$vux.alert.show(`获取在线帮助失败,请稍后尝试`);
          });
      })
      .catch(error => {
        this.$vux.alert.show(error);
        setTimeout(() => {
          this.$router.push({ path: "/login" });
        }, 1500);
      });
  }
};
</script>
<style lang="less">
.app-main {
  margin-bottom: 10px;
  width: 100%;
  font-size: 14px;
}
.weui-cell {
  padding: 8px 12px !important;
  font-size: 13px;
}
.weui-cell__ft {
  color: #111 !important;
  margin-left: 5px;
}
.sub-item {
  color: #666;
  font-size: 13px;
  
}

.help-item-wrapper {
  border-bottom: 1px #eee solid
}
</style>
