
 export function convertToTime(value) {
   let seconds = parseInt(value); // 秒 
   let hour = 0;
   let minute = 0;
   if (seconds > 60) {
       minute = parseInt(seconds / 60);
       seconds = parseInt(seconds % 60); 
   }
   if (minute > 60) {
      hour = parseInt(minute / 60);
      minute = parseInt(minute % 60);
   }
   if (hour < 10 ) {
      hour = '0' + hour; 
   }
   if (minute < 10) {
       minute = `0${minute}`;
   }
   if (seconds < 10) {
    seconds = `0${seconds}`;
   }
   const result = `${hour}:${minute}:${seconds}`
   return result;
}

export function formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
      }
    }
    return fmt
  }
  
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
