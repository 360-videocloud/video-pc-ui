import {addEvent, removeEvent} from 'helper/dom.js';

export default class Base {
  constructor (parent) {
    this.parent = parent;
    this.fns = [];
    // this.defaultOption = {
    //   html: '',
    //   event: {}
    // };
  }

  create () {
    this.createEl();
    this.addAllEvent();
  }

  allReady () {

  }

  destroy () {
    this.removeAllEvent();
    this.parent.$dom.removeChild(this.$dom);
  }

  createEl () {
    this.$dom = document.createElement(this.tag);
    this.$dom.innerHTML = this.option.html;
    this.parent.$dom.appendChild(this.$dom);
  }

  trans (name) {
    this.fns[name] = this.fns[name] || ((...args) => this[name](...args));
    return this.fns[name];
  }

  addAllEvent () {
    Object.keys(this.option.defaultEvent).forEach(item => {
      addEvent(this.$dom, item, this.trans(this.option.defaultEvent[item]));
    });
    this.option.event && Object.keys(this.option.event).forEach(item => {
      addEvent(this.$dom, item, this.option.event[item]);
    });
  }

  removeAllEvent () {
    Object.keys(this.option.defaultEvent).forEach(item => {
      removeEvent(this.$dom, item, this.trans(this.option.defaultEvent[item]));
    });
    this.option.event && Object.keys(this.option.event).forEach(item => {
      removeEvent(this.$dom, item, this.option.event[item]);
    });
  }
}
