import {deepAssign, isObject} from 'helper/utils.js';
import {addClassName, removeClassName} from 'helper/dom.js';
import Base from './base.js';

/**
 * Screen 配置
 */

const defaultOption = {
  html: `
    <vision-screen-full></vision-screen-full>
    <vision-screen-small></vision-screen-small>
  `,
  defaultEvent: {
    click: 'click'
  }
};

export default class Screen extends Base {
  constructor (parent, option) {
    super(parent);
    this.tag = 'vision-screen';
    this.state = 'small';
    this.option = deepAssign(defaultOption, isObject(option) ? option : {});
    this.init();
  }

  init () {
    super.create();
    this.changeState(this.state);
    addClassName(this.$dom, 'flex-item');
  }

  changeState (state) {
    const removeState = state === 'small' ? 'full' : 'small';
    addClassName(this.parent.$dom, state);
    removeClassName(this.parent.$dom, removeState);
  }

  click () {
    this.state = this.state === 'small' ? 'full' : 'small';
    this.changeState(this.state);
    this.screenChange();
  }

  screenChange () {
    // 辨认 用户浏览器是那种 webkit moz ms
    this.screenAPI = '';
    if(document.webkitCancelFullScreen) {
      this.screenAPI = ['webkitRequestFullScreen', 'webkitCancelFullScreen', 'webkitfullscreenchange', 'webkitFullscreenElement'];
    }else if(document.mozCancelFullScreen) {
      this.screenAPI = ['mozRequestFullScreen', 'mozCancelFullScreen', 'mozfullscreenchange', 'mozFullScreenElement'];
    }else if(document.msExitFullscreen) {
      this.screenAPI = ['msRequestFullscreen', 'msExitFullscreen', 'msfullscreenchange', 'msFullscreenElement'];
    }else if(document.exitFullscreen) {
      this.screenAPI = ['requestFullScreen', 'exitFullscreen', 'fullscreenchange', 'fullscreenElement'];
    }
    if(this.state === 'full') {
      // this.enlargeScreen();
    }else{
      // this.narrowScreen();
    }
  }

}
