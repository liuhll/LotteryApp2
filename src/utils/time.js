
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

