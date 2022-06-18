/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/**
 * @description 时间格式化
 * @param {时间} t : Date
 * @param {要生成的时间格式，如yyyy-MM-dd HH:mm:ss 也可以 YYYY.MM.DD} str : string
 * @returns 格式化后的字符串
 */
export function formatDate(t, str) {
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
}

/**
 * @description 将时间秒转换成时分秒
 * @param {时间秒} s ：Number
 * @returns hh:mm:ss格式的时间
 */
export function secondsToString(s) {
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
}

/**
 * @description 将整数转为带单位的字符串
 * @param {整数} value : number
 * @returns 带单位的字符串
 */
export function numberFormat(value) {
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
}

/**
 * @description 根据时间戳计算 视频发布了多久、评论了多久
 * @param {*} t ：number
 * @returns 时间间隔字符串
 */
export function pastTimeFormat(t) {
  if (!t || typeof t !== 'number') {
    return '';
  }
  const now = new Date().getTime();
  if (now < t) {
    return '';
  }
  if (now - t > 24 * 60 * 60 * 1000) {
    return formatDate(new Date(t), 'yyyy-MM-dd');
  }
  if (now - t > 60 * 60 * 1000) {
    const hour = Math.floor((now - t) / (60 * 60 * 1000));
    return `${hour}小时前`;
  }
  if (now - t > 60 * 1000) {
    const minute = Math.floor((now - t) / (60 * 1000));
    return `${minute}分钟前`;
  }
  return '刚刚';
}

/**
 * @description 去除参数中的空数据（置undefined）
 * @param {参数对象} params0 : object
 * @returns 修改后的参数对象
 */
export function beforeRequest(params0) {
  const params = JSON.parse(JSON.stringify(params0));
  const keys = Object.keys(params);
  keys.forEach((key) => {
    if (params[key] === null || params[key] === '') {
      params[key] = undefined;
    }
  });
  return params;
}
export function beforeRequestNoReturn(params) {
  const keys = Object.keys(params);
  keys.forEach((key) => {
    if (params[key] === null || params[key] === '') {
      params[key] = undefined;
    }
  });
}
/**
 * @description 深拷贝
 * @param {原数据}} target ：any
 * @returns 新数据
 */
export function deepClone(target, map = new WeakMap()) {
  const cloneTarget = Array.isArray(target) ? [] : {};
  // 处理对象（object,arr）- Object进行递归拷贝,arr原值
  if ((typeof target === 'object' || typeof target === 'function') && target !== null) {
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);
    // 对于数组和对象都需要循环遍历赋值（因为是引用数据类型，只有地址值）
    // eslint-disable-next-line
    for (const key in target) {
      // 对象-递归处理-注意通过map闭包引用
      cloneTarget[key] = deepClone(target[key], map);
    }
    return cloneTarget;
  }
  // 非对象 string,num,undefined,func -不处理
  return target;
}

/**
 * @description 事件监听兼容写法
 * @param {dom元素} obj
 * @param {事件名如'scroll'} ev
 * @param {绑定方法} fn
 */
export function addEvent(obj, ev, fn) {
  if (obj.addEventListener) {
    obj.addEventListener(ev, fn, false);
  } else if (obj.attachEvent) {
    obj.attachEvent(`on${ev}`, fn.bind(obj));
  } else {
    obj[`on${ev}`] = fn;
  }
}
/**
 * @description 取消事件监听
 * @param {dom元素} obj
 * @param {事件名如'scroll'} ev
 * @param {绑定方法} fn
 */
export function removeEvent(obj, ev, fn) {
  if (obj.removeEventListener) {
    obj.removeEventListener(ev, fn);
  } else if (obj.detachEvent) {
    obj.detachEvent(`on${ev}`, obj[ev + fn]);
  } else {
    obj[`on${ev}`] = null;
  }
}

/**
 * @description 获取页面缩放百分比
 * @returns 当前页面缩放比例
 */
export function detectZoom() {
  let ratio = 0;
  const { screen } = window;
  const ua = navigator.userAgent.toLowerCase();

  if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio;
    // eslint-disable-next-line no-bitwise
  } else if (~ua.indexOf('msie')) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI;
    }
  } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
    ratio = window.outerWidth / window.innerWidth;
  }

  if (ratio) {
    ratio = Math.round(ratio * 100);
  }
  return ratio;
}

/**
 * @description 导出数据
 * @param {导出链接} url ：string
 * @param {导出参数} params : object
 */
export function exportDataFile(url, params = {}) {
  if (url.endsWith('/')) {
    url = url.slice(0, url.length - 2);
  }
  beforeRequestNoReturn(params);
  let url2 = '';
  Object.keys(params).forEach((k, i) => {
    if (params[k] !== undefined) {
      url2 += `${i === 0 ? '?' : '&'}${k}=${params[k]}`;
    }
  });
  window.open(`${url}${url2}`, '__blank5');
}

/**
 * @description 根据浏览器ua判断当前浏览器是不是IE浏览器
 * @returns true or false
 */
export function isIE() {
  const { userAgent } = navigator; // 取得浏览器的userAgent字符串
  const isIE0 = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; // 判断是否IE<11浏览器
  const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
  return isIE0 || isIE11;
}

/**
 * @description 根据浏览器ua判断当前浏览器是不是IE浏览器
 * @returns true or false
 */
export function stringToArr(str) {
  let arr = [];
  if (str) {
    arr = str.split(',');
  }
  return arr;
}

/**
 * 将字符串输入转为数组
 * @param {*} str 22,22,33
 * @returns  [22,23,33]
 */
export function inputStrToArr (str) {
  if (!str || !str.trim()) {
    return null;
  }
  const temp = str.split(/[\n\s+,，；;]/g);
  for (let i = 0; i < temp.length; i++) {
    if (temp[i] === '') {
      // 删除数组中空值
      temp.splice(i, 1);
      i--;
    }
  }
  return temp;
}
