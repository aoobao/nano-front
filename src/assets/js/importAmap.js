let _callback = null

window.__AMAP_CALLBACK = function () {
  // console.log('加载高德地图成功')
  typeof _callback === 'function' && _callback()
}

const AMAP_KEY = '239a9ac2323397ea0490622bb2971915' // 高德webjs应用key
const VERSION = '1.4.14'
let isLoad = false

export default function requireAMap(callback) {
  _callback = callback
  if (!isLoad) {
    isLoad = true
    let url = `https://webapi.amap.com/maps?v=${VERSION}&key=${AMAP_KEY}&callback=__AMAP_CALLBACK`;

    let jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = url;

    document.head.appendChild(jsapi);
  } else {
    // 暂时直接回调
    window.__AMAP_CALLBACK()
  }

}
