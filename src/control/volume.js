import {deepAssign, isObject} from 'helper/utils.js';
import {addClassName, removeClassName, $, addEvent, removeEvent} from 'helper/dom.js';
import Base from './base.js';

/**
 * Volume 配置
 */

const defaultOption = {
  html: `
    <vision-volume-state>
      <vision-volume-state-mute></vision-volume-state-mute>
      <vision-volume-state-low></vision-volume-state-low>
      <vision-volume-state-high></vision-volume-state-high>
    </vision-volume-state>
    <vision-volume-bar>
      <vision-volume-bar-bg></vision-volume-bar-bg>
      <vision-volume-bar-all></vision-volume-bar-all>
    </vision-volume-bar>
  `,
  defaultEvent: {
    click: 'click',
    mousedown: 'mousedown',
    mouseenter: 'mouseenter',
    mouseleave: 'mouseleave'
  }
};

export default class Volume extends Base {
  constructor (parent, option) {
    super(parent);
    this.tag = 'vision-volume';
    this.parent.preVolume = 0;
    this.option = deepAssign(defaultOption, isObject(option) ? option : {});
    this.init();
  }

  allReady () {
    this.update();
  }

  init () {
    super.create();
    this.$state = $('vision-volume-state', this.$dom);
    this.$bar = $('vision-volume-bar', this.$dom);
    this.$all = $('vision-volume-bar-all', this.$dom);
    this.$bg = $('vision-volume-bar-bg', this.$dom);
    addClassName(this.$dom, 'flex-item flex-item-1');
  }

  changeState () {
    if(this.parent.volume === 0) {
      this.state = 'mute';
    }else if(this.parent.volume > 0 && this.parent.volume <= 0.5) {
      this.state = 'low';
    }else if(this.parent.volume > 0.5 && this.parent.volume <= 1) {
      this.state = 'high';
    }
    removeClassName(this.$dom, 'mute low high');
    addClassName(this.$dom, this.state);
  }

  click (e) {
    if(e.path.indexOf(this.$state[0]) !== -1) {
      this.stateClick(e);
    }else if(e.path.indexOf(this.$bar[0]) !== -1) {
      this.barClick(e);
    }
  }

  stateClick () {
    const currentVolume = this.parent.volume;
    this.parent.volume = currentVolume === 0 ? this.parent.preVolume : 0;
    this.parent.preVolume = currentVolume;
    this.changeState();
  }

  barClick (e) {
    const volume = e.layerX / this.$bg[0].offsetWidth;
    this.parent.volume = volume < 0 ? 0 : volume > 1 ? 1 : volume;
    this.update();
  }

  mousedown (e) {
    this.startX = e.clientX;
    this.startVolume = this.parent.volume;
    addEvent(window, 'mousemove', this.trans('draging'));
    addEvent(window, 'mouseup', this.trans('dragEnd'));
    addEvent(window, 'contextmenu', this.trans('dragEnd'));
    removeEvent(this.parent.$dom, 'volumechange', this.trans('update'));
    removeEvent(this.$dom, 'mouseenter', this.trans('mouseenter'));
    removeEvent(this.$dom, 'mouseleave', this.trans('mouseleave'));
  }

  update () {
    this.changeState();
    this.$all.css('width', `${this.parent.volume * 100}%`);
  }

  /**
   * 开始拖拽
   * @param {EventObject} e 鼠标事件
   */
  draging (e) {
    this.endX = e.clientX;
    const dragVolume = (this.endX - this.startX) / this.$dom.offsetWidth;
    const dragAfterVolume = (this.startVolume + dragVolume).toFixed(2);
    this.parent.volume = dragAfterVolume < 0 ? 0 : dragAfterVolume > 1 ? 1 : dragAfterVolume;
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
    addEvent(this.parent.$dom, 'volumechange', this.trans('update'));
    addEvent(this.$dom, 'mouseenter', this.trans('mouseenter'));
    addEvent(this.$dom, 'mouseleave', this.trans('mouseleave'));
  }

  mouseenter () {
    addClassName(this.$dom, 'flex-item-3');
    removeClassName(this.$dom, 'flex-item-1');
    this.$bar.css('display', 'inline-block');
    this.$state.css('width', '30%');
  }

  mouseleave () {
    addClassName(this.$dom, 'flex-item-1');
    removeClassName(this.$dom, 'flex-item-3');
    this.$state.css('width', '100%');
    this.$bar.css('display', 'none');
  }
}
