<template>
  <div>
    <h1 class="mod-title">
        <span class="ico_log ico-3"></span>
    </h1>
    <div class="mod-ct">
        <div class="order">
        </div>
        <div class="amount" id="money">￥ {{payinfo.realPrice}}</div>
         <div class="qrcode-img-wrapper" data-role="qrPayImgWrapper">
            <div data-role="qrPayImg" class="qrcode-img-area">
                <div class="ui-loading qrcode-loading" data-role="qrPayImgLoading" style="display: none;"></div>
                <div style="position: relative;display: inline-block;">
                    <img  id="show_qrcode" width="250" height="180" :src="payinfo.qrCodeImageAddress" style="display: block;">
                    <img onclick="$('#use').hide()" id="use" src="../../../assets/images/pay/logo_weixin.png"
                         style="position: absolute;top: 50%;left: 50%;width:32px;height:32px;margin-left: -16px;margin-top: -20px">
                   
                    
                    <div id="qrcode" style = "display: none;"></div>
                    <canvas id="imgCanvas" width="310" height="270" style = "display: none;"></canvas>
                </div>
            </div>
        </div>

        <div class ="payweixinbtn" style="padding-top: 15px;"><a :href="downImgLink" target="_blank" id="downloadbtn" class="btn btn-primary">1.先保存二维码到手机</a></div>
        
        <div class ="payweixinbtn" style="padding-top: 15px;" ><a href="weixin://" class="btn btn-primary">2.打开微信，扫一扫本地图片</a></div>
         <div class="time-item" style = "padding-top: 10px">
            <div class="time-item"><h1>订单:{{orderNo}}</h1> </div>
            <strong id="hour_show">0时</strong>
            <strong id="minute_show">0分</strong>
            <strong id="second_show">0秒</strong>
        </div>
        <div class="tip">
            <div class="ico-scan"></div>
            <div class="tip-text">
                <p id="showtext">请保存二维码到手机<br>微信扫一扫点右上角-从相册选取</p>
            </div>
        </div>    
    </div>
  </div>
</template>

<script>
export default {
  props: {
    payinfo: {
        type: Object
    },
    orderNo: {
        type: String
    }
  },
  computed: {
      downImgLink() {
          return `http://pay.paysapi.com/get_code_image?url=${this.payinfo.qrCode}`
      }
  }
}
</script>

<style lang="less" scoped>
html {
    font-size: 62.5%;
    font-family: 'helvetica neue', tahoma, arial, 'hiragino sans gb', 'microsoft yahei', 'Simsun', sans-serif
}

body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, button, textarea, p, blockquote, th, td, hr {
    margin: 0;
    padding: 0px 2px;
}

body {
    line-height: 1.333;
    font-size: 12px
}

h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
    font-family: arial, 'hiragino sans gb', 'microsoft yahei', 'Simsun', sans-serif
}

input, textarea, select, button {
    font-size: 12px;
    font-weight: normal
}

input[type="button"], input[type="submit"], select, button {
    cursor: pointer
}

table {
    border-collapse: collapse;
    border-spacing: 0
}

address, caption, cite, code, dfn, em, th, var {
    font-style: normal;
    font-weight: normal
}

li {
    list-style: none
}

caption, th {
    text-align: left
}

q:before, q:after {
    content: ''
}

abbr, acronym {
    border: 0;
    font-variant: normal
}

sup {
    vertical-align: text-top
}

sub {
    vertical-align: text-bottom
}

fieldset, img, a img, iframe {
    border-width: 0;
    border-style: none
}

img {
    -ms-interpolation-mode: bicubic
}

textarea {
    overflow-y: auto
}

legend {
    color: #000
}

a:link, a:visited {
    text-decoration: none
}

hr {
    height: 0
}

label {
    cursor: pointer
}

a {
    color: #328CE5
}

a:hover {
    color: #2b8ae8;
    text-decoration: none
}

a:focus {
    outline: none
}

body, .body {
    background: #f7f7f7;
    height: 100%;
    max-width: 640px;
    min-width: 300px;
    min-height: 100%;

    margin: 0 auto;
}

.mod-title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    background: #fff
}

.ico_log {
    display: inline-block;
    width: 130px;
    height: 38px;
    vertical-align: middle;
    margin-right: 7px
}

.mod-title .text {
    font-size: 20px;
    color: #333;
    font-weight: normal;
    vertical-align: middle
}

.ico_log {
    display: inline-block;
    width: 130px;
    height: 38px;
    vertical-align: middle;
    margin-right: 7px
}

.ico-3 {
    background: url("../../../assets/images/pay/logo_weixin.jpg") no-repeat;
    background-size:cover;
}

.mod-ct {
    min-width: 300px;
    max-width: 640px;
    margin: 0 auto;
    margin-top: 15px;
    margin-bottom: 15px;
    padding-bottom: 10px;
    background: #fff url("../../../assets/images/pay/wave.png") top center repeat-x;
    text-align: center;
    color: #333;
    border: 1px solid #e5e5e5;
    border-top: none
}

.mod-ct .order {
    font-size: 20px;
    padding-top: 8px
}

.mod-ct .amount {
    font-size: 25px;
    margin-top: 7px
}

.mod-ct .qr-image {
    margin-top: 20px
}

.mod-ct .qr-image img {
    width: 230px;
    height: 230px
}

.mod-ct .detail {
    margin-top: 10px;
    padding-top: 0px;
    padding-bottom: 10px;

}

.mod-ct .detail .arrow .ico-arrow {
    display: inline-block;
    width: 20px;
    height: 11px;
    background: url("../../../assets/images/pay/wechat-pay.png") -25px -100px no-repeat
}

.mod-ct .detail .detail-ct {
    display: none;
    font-size: 12px;
    text-align: right;
    line-height: 28px
}

.mod-ct .detail .detail-ct dt {
    float: left
}

.mod-ct .detail-open {
    border-top: 1px solid #e5e5e5
}

.mod-ct .detail .arrow {
    padding: 6px 34px;
    border: 1px solid #e5e5e5
}

.mod-ct .detail .arrow .ico-arrow {
    display: inline-block;
    width: 20px;
    height: 11px;
    background: url("../../../assets/images/pay/wechat-pay.png") -25px -100px no-repeat
}

.mod-ct .detail-open .arrow .ico-arrow {
    display: inline-block;
    width: 20px;
    height: 11px;
    background: url("../../../assets/images/pay/wechat-pay.png") 0 -100px no-repeat
}

.mod-ct .detail-open .detail-ct {
    display: block
}

.mod-ct .tip {
    margin-top: 20px;    
    border-top: 1px dashed #e5e5e5;
    padding: 10px 0;
    position: relative
}

.mod-ct .tip .ico-scan {
    display: inline-block;
    width: 56px;
    height: 55px;
    background: url("../../../assets/images/pay/wechat-pay.png") 0 0 no-repeat;
    vertical-align: middle;
    *display: inline;
    *zoom: 1
}

.mod-ct .tip .tip-text {
    display: inline-block;
    vertical-align: middle;
    text-align: left;
    margin-left: 23px;
    font-size: 16px;
    line-height: 28px;
    *display: inline;
    *zoom: 1
}

.mod-ct .tip .dec {
    display: inline-block;
    width: 22px;
    height: 45px;
    background: url("../../../assets/images/pay/wechat-pay.png") 0 -55px no-repeat;
    position: absolute;
    top: -23px
}

.mod-ct .tip .dec-left {
    background-position: 0 -55px;
    left: -136px
}

.mod-ct .tip .dec-right {
    background-position: -25px -55px;
    right: -136px
}

.foot {
    text-align: center;
    margin: 30px auto;
    color: #888888;
    font-size: 12px;
    line-height: 20px;
    font-family: "simsun"
}

.copyRight {
    text-align: center;
    color: #888888;
    margin-bottom: 1px;
}

.copyRight a {
    color: #888888;
}

h1 {
    font-family: "微软雅黑";
    font-size: 15px;
    margin: 5px 0;
    padding-bottom: 2px;
    letter-spacing: 2px;
}

.time-item strong {
    background: #3ec742;
    color: #fff;
    line-height: 25px;
    font-size: 15px;
    font-family: Arial;
    padding: 0 10px;
    margin-right: 10px;
    border-radius: 5px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.item-title {
    background: none;
    line-height: 25px;
    font-size: 24px;
    padding: 0 10px;
    float: left;
}

.paybtn{
    display: inline-block;
    width: 100%;
    height: 80px;
    vertical-align: middle;
    padding-top: 10%;
    margin-right: 7px
}


.submit_alipay {
	font-size:16px;
	font-family:Arial;
	font-weight:normal;
	-moz-border-radius:5px;
	-webkit-border-radius:5px;
	border-radius:5px;
	border:1px solid #84bbf3;
	padding:9px 76px;
	text-decoration:none;
	background:-moz-linear-gradient( center top, #79bbff 105%, #378de5 0% );
	background:-ms-linear-gradient( top, #79bbff 105%, #378de5 0% );
	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#79bbff', endColorstr='#378de5');
	background:-webkit-gradient( linear, left top, left bottom, color-stop(105%, #79bbff), color-stop(0%, #378de5) );
	background-color:#79bbff;
	color:#ffffff;
	display:inline-block;
	text-shadow:1px 1px 0px #528ecc;
 	-webkit-box-shadow: 0px 0px 0px 0px #bbdaf7;
 	-moz-box-shadow: 0px 0px 0px 0px #bbdaf7;
 	box-shadow: 0px 0px 0px 0px #bbdaf7;
}.submit_alipay:active {
	position:relative;
	top:1px;
}

.btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.42857143;
    text-align: center;
    width:80%;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
  }
  .btn:focus,
  .btn:active:focus,
  .btn.active:focus {
    outline: thin dotted;
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
  }
  .btn:hover,
  .btn:focus {
    color: #333;
    text-decoration: none;
  }
  .btn:active,
  .btn.active {
    background-image: none;
    outline: 0;
    -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
            box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
  }
  .btn.disabled,
  .btn[disabled],
  fieldset[disabled] .btn {
    pointer-events: none;
    cursor: not-allowed;
    filter: alpha(opacity=65);
    -webkit-box-shadow: none;
            box-shadow: none;
    opacity: .65;
  }

.btn-primary {
    color: #fff;
    background-color: #428bca;
    border-color: #357ebd;
  }
  .btn-primary:hover,
  .btn-primary:focus,
  .btn-primary:active,
  .btn-primary.active,
  .open > .dropdown-toggle.btn-primary {
    color: #fff;
    background-color: #3071a9;
    border-color: #285e8e;
  }
  .btn-primary:active,
  .btn-primary.active,
  .open > .dropdown-toggle.btn-primary {
    background-image: none;
  }

  .btn-primary .badge {
    color: #428bca;
    background-color: #fff;
  }
</style>
