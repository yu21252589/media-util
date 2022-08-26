/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
export default {
  /**
 * @description 时间格式化
 * @param {时间} t : Date
 * @param {要生成的时间格式，如yyyy-MM-dd HH:mm:ss 也可以 YYYY.MM.DD} str : string
 * @returns 格式化后的字符串
 */
  formatDate(t, str) {
    const obj = {
      yyyy: t.getFullYear(),
      yy: `${t.getFullYear()}`.slice(-2),
      M: t.getMonth() + 1,
      MM: `0${t.getMonth() + 1}`.slice(-2),
      d: t.getDate(),
      dd: `0${t.getDate()}`.slice(-2),
      H: t.getHours(),
      HH: `0${t.getHours()}`.slice(-2),
      h: t.getHours() % 12,
      hh: `0${t.getHours() % 12}`.slice(-2),
      m: t.getMinutes(),
      mm: `0${t.getMinutes()}`.slice(-2),
      s: t.getSeconds(),
      ss: `0${t.getSeconds()}`.slice(-2),
      w: ['日', '一', '二', '三', '四', '五', '六'][t.getDay()],
    };
    return str.replace(/([a-z]+)/gi, ($1) => obj[$1]);
  },

  /**
 * @description 将时间秒转换成时分秒
 * @param {时间秒} s ：Number
 * @returns hh:mm:ss格式的时间
 */
  secondsToString(s) {
    if (s === 0) {
      return '0:00';
    }
    if (!s || typeof s !== 'number') {
      return '';
    }
    if (s >= 24 * 3600) {
      return '23:59:59';
    }
    let hour;
    let min;
    let sec;
    if (s > 3600) {
      hour = Math.floor(s / 3600);
      min = Math.floor((s % 3600) / 60);
      sec = s % 60;
    } else if (s > 60) {
      min = Math.floor((s % 3600) / 60);
      sec = s % 60;
    } else {
      sec = s;
    }
    if (hour) {
      return `${hour}:${`0${min}`.slice(-2)}:${`0${sec}`.slice(-2)}`;
    }
    if (min) {
      return `${min}:${`0${sec}`.slice(-2)}`;
    }
    return `0:${`0${sec}`.slice(-2)}`;
  },

  /**
 * @description 将整数转为带单位的字符串
 * @param {整数} value : number
 * @returns 带单位的字符串
 */
  numberFormat(value) {
    if (value < 10000) {
      return Number(value).toLocaleString();
    }
    if (value >= 10000) {
      const param = {};
      const k = 10000;
      const sizes = ['', 'W', '亿', '万亿'];

      if (value < k) {
        param.value = value;
        param.unit = '';
      } else {
        const i = Math.floor(Math.log(value) / Math.log(k));
        param.value = (value / k ** i).toFixed(1);
        param.unit = sizes[i];
      }
      return param.value + param.unit;
    }
    return '--';
  },

};
