<template>
  <div>
   <group label-margin-right="2em" label-align="right" :title="serviceVersion.appName">
      <cell-box>
        版本: {{clientVersion.versionName}}
      </cell-box>
       <cell-box v-if="isNewest">
        已是最新版本
      </cell-box>
   </group>
  </div>
</template>

<script>

import version from '@/utils/version'
import { Group, CellBox } from 'vux'
export default {
  components: {
    Group,
    CellBox,
  },
  data() {
      return {
          clientVersion: {
              appVersion: 0,
              versionName:''
           },
          serviceVersion: { },
          isNewest: true
      }
  },
  created() {
      this.clientVersion.appVersion = version.appVersion;
      this.clientVersion.versionName = version.versionName;
      let platform =  version.platform 
      this.$store.dispatch('GetAppInfo', { platform: platform}).then(data => {
            this.serviceVersion = data;
            if (this.serviceVersion.appVersion == this.clientVersion.appVersion) {
                this.isNewest = true;
            } else {
                this.isNewest = false;
                let _this = this;
                 _this.$vux.confirm.show({
                  title: '版本更新',
                  content: `检测到新版本${_this.serviceVersion.versionName},是否现在更新?`,
                  onConfirm() {            
                    
                  },
                  onCancel() {
                    
                  }
               });
            }                
        }).catch(error => {
          this.$vux.loading.hide();
          this.$vux.alert.show(error.message); 
        })
  }
}
</script>

<style lang="less">
.app-main {
  margin-bottom:10px;
  width: 100%;
  font-size: 14px;
}
.weui-cells__title {
    font-size: 16px!important;
    color: #444!important;
}

</style>

