<template>
  <div class="history-opt-wrapper">
    <button type="button" class="btn btn-lottery-date">选择日期</button>
  </div>
</template>

<style lang="less" scoped>
.history-opt-wrapper {
    height: 30px;
    line-height: 30px;
    text-align: right;
    background-color: #ffecf5;
    position: fixed;
    top: 35px;
    right: 0;
    left: 0;
    z-index: 1
    }
.history-opt-wrapper .btn {
    border : none;
    background: none;
    outline: none;
}
.history-opt-wrapper .btn:focus {
    outline : 0
}

.history-opt-wrapper  .btn-lottery-date {
  background-color :#ea0000;
   border-radius :10px;
   width :120px;
   height :25px;
   line-height :25px;
   vertical-align :middle;
   margin-right :10px;
   color :#fff;
}
.history-opt-wrapper  .btn-lottery-date:active {
   background-color :#ae0000;
   color :#ffd306;
 }
     

</style>