import {deepAssign, isObject, formatTime} from 'helper/utils.js';
import {addClassName, $, addEvent, removeEvent} from 'helper/dom.js';
import Base from './base.js';

/**
 * progressBar 配置
 */

const defaultOption = {
  html: `
    <vision-progressbar-bg></vision-progressbar-bg>
		<vision-progressbar-buffer></vision-progressbar-buffer>
		<vision-progressbar-all></vision-progressbar-all>
		<vision-progressbar-tip></vision-progressbar-tip>
  `,
  defaultEvent: {
    click: 'click',
    mousedown: 'mousedown',
    mouseenter: 'mouseenter'
  }
};

export default class ProgressBar extends Base {
  constructor (parent, option) {
    super(parent);
    this.tag = 'vision-progressbar';
    this.option = deepAssign(defaultOption, isObject(option) ? option : {});
    this.init();
  }

  init () {
    super.create();
    this.$buffer = $('vision-progressbar-buffer', this.$dom);
    this.$all = $('vision-progressbar-all', this.$dom);
    this.$tip = $('vision-progressbar-tip', this.$dom);
    this.$track = $('vision-progressbar-track', this.$dom);
    addClassName(this.$dom, 'flex-item flex-item-free');
  }

  click (e) {
    this.parent.currentTime = e.layerX / this.$dom.offsetWidth * this.parent.duration;
    this.update();
  }

  mousedown (e) {
    this.startX = e.clientX;
    this.startTime = this.parent.currentTime;
    addEvent(window, 'mousemove', this.trans('draging'));
    addEvent(window, 'mouseup', this.trans('dragEnd'));
    addEvent(window, 'contextmenu', this.trans('dragEnd'));
    removeEvent(this.parent.$dom, 'timeupdate', this.trans('update'));
  }

  mouseenter () {
    addEvent(this.$dom, 'mousemove', this.trans('tipDown'));
    addEvent(this.$dom, 'mouseleave', this.trans('tipEnd'));
  }

  /**
   * 缓存进度条更新 progress 事件
   */
  progress () {
    console.log(this)
    const buffer = this.buffered;
    const bufferWidth = buffer / this.parent.currentTime * 100 + '%';
    this.$buffer.css('width', bufferWidth);
  }

  /**
   * requestAnimationFrame 来更新进度条, timeupdate 事件
   */
  update () {
    const timeWidth = this.parent.currentTime ? this.parent.currentTime / this.parent.duration * 100 + '%' : 0;
    this.$all.css('width', timeWidth);
  }

  /**
   * 开始拖拽
   * @param {EventObject} e 鼠标事件
   */
  draging (e) {
    this.endX = e.clientX;
    const dragTime = (this.endX - this.startX) / this.$dom.offsetWidth * this.parent.duration;
    const dragAfterTime = (this.startTime + dragTime).toFixed(2);
    this.parent.currentTime = dragAfterTime < 0 ? 0 : dragAfterTime > this.parent.duration ? this.parent.duration : dragAfterTime;
    this.update();
  }

  /**
   * 结束拖拽
   */
  dragEnd () {
    this.startX = 0;
    this.startTime = 0;
    removeEvent(window, 'mousemove', this.trans('draging'));
    removeEvent(window, 'mouseup', this.trans('dragEnd'));
    removeEvent(window, 'contextmenu', this.trans('dragEnd'));
    addEvent(this.parent.$dom, 'timeupdate', this.trans('update'));
  }

  tipDown (e) {
    addEvent(this.$dom, 'mousemove', this.trans('tipShow'));
    addEvent(this.$dom, 'mouseleave', this.trans('tipEnd'));
  }

  tipShow (e) {
    let time = e.layerX / this.$dom.offsetWidth * this.parent.duration;
    time = time < 0 ? 0 : time > this.parent.duration ? this.parent.duration : time;
    const tipContent = formatTime(time);
    this.$tip.text(tipContent);
    this.$tip.css('display', 'inline-block');
    this.$tip.css('left', `${e.layerX}px`);
  }

  tipEnd (e) {
    removeEvent(this.$dom, 'mousemove', this.trans('tipShow'));
    removeEvent(this.$dom, 'mouseleave', this.trans('tipEnd'));
    this.$tip.css('display', 'none');
  }

}
