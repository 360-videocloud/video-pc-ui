import {deepAssign, isObject} from 'helper/utils.js';
import {addClassName, removeClassName} from 'helper/dom.js';
import Base from './base.js';

/**
 * play 配置
 */

const defaultOption = {
  html: `
    <vision-control-state-play></vision-control-state-play>
    <vision-control-state-pause></vision-control-state-pause>
  `,
  defaultEvent: {
    click: 'click'
  }
};

export default class Play extends Base {
  constructor (parent, option) {
    super(parent);
    this.tag = 'vision-control-state';
    this.option = deepAssign(defaultOption, isObject(option) ? option : {});
    this.init();
  }

  init () {
    super.create();
    addClassName(this.$dom, 'flex-item');
    this.changeState('pause');
  }

  changeState (state) {
    const nextState = state === 'play' ? 'pause' : 'play';
    this.state = state;
    addClassName(this.parent.$dom, nextState);
    removeClassName(this.parent.$dom, state);
  }

  click () {
    const nextState = this.state === 'play' ? 'pause' : 'play';
    this.changeState(nextState);
    this.parent.$emit(nextState);
  }
}
