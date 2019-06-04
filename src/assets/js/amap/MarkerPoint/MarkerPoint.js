import './MarkerPoint.scss'

import Overlays from '../Overlays'
/**
 * opt:
 * map
 * position // 坐标
 * zIndex
 * extData
 * imageSrc : './images/point3d.png'
 * imageWidth : 52
 * imageHeight : 96
 *
 * className 标记点自定义class
 * click, 点击事件
 * mouseover, 鼠标移入事件
 * mouseout 鼠标移出事件
 */
export default class MarkerPoint extends Overlays {
  constructor(opt) {
    super(opt)
    this._clickHandle = this._clickHandle.bind(this)
    this._mouseOut = this._mouseOut.bind(this)
    this._mouseOver = this._mouseOver.bind(this)
    this._initialize(opt || {})
  }
  _initialize(opt) {
    this._imageSrc = opt.imageSrc || './images/point3d.png'
    this._imageWidth = opt.imageWidth || 52
    this._imageHeight = opt.imageHeight || 96
    this._className = opt.className || ''
    this._

    this._click = opt.click
    this._mouseover = opt.mouseover
    this._mouseout = opt.mouseout

    this._createMarker()
  }

  _clickHandle(e) {
    typeof this._click === 'function' &&
      this._click.call(this, this.getExtData(), e)
  }
  _mouseOut(e) {
    typeof this._mouseout === 'function' &&
      this._mouseout.call(this, this.getExtData(), e)
  }
  _mouseOver(e) {
    typeof this._mouseover === 'function' &&
      this._mouseover.call(this, this.getExtData(), e)
  }

  _createMarker() {
    let height = this._imageHeight
    let width = this._imageWidth

    let dom = this._dom = this._createElement()
    dom.body.addEventListener('mouseenter', this._mouseOver)
    dom.body.addEventListener('mouseleave', this._mouseOut)
    dom.body.addEventListener('click', this._clickHandle)

    let marker = new AMap.Marker({
      position: this.getPosition(),
      offset: new AMap.Pixel(-width / 2, -height),
      content: dom.body,
      zIndex: this.getzIndex()
    })

    this.setOverlays(marker)
  }

  _createElement() {
    let height = this._imageHeight
    let width = this._imageWidth
    let body = document.createElement('div')
    body.className = '__amap_markerpoint_body ' + this._className
    body.style.height = height + 'px'
    body.style.width = width + 'px'

    // 设置图片背景
    body.style.backgroundImage = `url('${this._imageSrc}')`

    return {
      body
    }
  }
}
