import {deepAssign, isObject, formatTime} from 'helper/utils.js';
import {addClassName, $} from 'helper/dom.js';
import Base from './base.js';

/**
 * progressTime 配置
 */

const defaultOption = {
  html: `
    <vision-progresstime-pass>00:00</vision-progresstime-pass>
    <vision-progresstime-total>
      <span>/</span>
      <vision-progresstime-total-value>00:00</vision-progresstime-total-value>
    </vision-progresstime-total>
  `,
  defaultEvent: {}
};

export default class ProgressTime extends Base {
  constructor (parent, option) {
    super(parent);
    this.tag = 'vision-progresstime';
    this.option = deepAssign(defaultOption, isObject(option) ? option : {});
    this.init();
  }

  init () {
    super.create();
    this.$total = $('vision-progresstime-total-value', this.$dom);
    this.$pass = $('vision-progresstime-pass', this.$dom);
    addClassName(this.$dom, 'flex-item flex-item-3');
  }

  updatePass () {
    this.$pass.text(formatTime(this.parent.currentTime));
  }

  updateTotal () {
    this.$total.text(formatTime(this.parent.duration));
  }
}
