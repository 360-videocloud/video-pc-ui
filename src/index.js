import {isObject, deepAssign} from 'helper/utils';
import {setStyle} from 'helper/dom';
import './control.css';
import {createChild} from './createchild.js';

/**
 * 插件默认配置
 */
const defaultConfig = {
  play: true, // 底部播放暂停按钮
  volume: true, // 声音控制
  progressBar: true, // 播放进度控制条
  progressTime: true, // 播放时间
  screen: true, // 全屏控制
  // extend: {
  //   xxx: {
  //     position: 'null',
  //   }
  // }
};

const visionControl = {
  name: 'visionControl',
  el: 'vision-control',
  data: {
    children: {}
  },
  create () {
    // this.live = this.$videoConfig.type === 'live';
    const config = isObject(this.$config) ? deepAssign(defaultConfig, this.$config) : defaultConfig;
    // this.$dom.classList.add('vision-ui');
    this.children = createChild(this, config);
  },
  destroy () {
    this.children.map(item => {
      item.destroy();
    });
    this.$dom.parentNode.removeChild(this.$dom);
  },
  inited () {
    for(const i in this.children) {
      this.children[i].allReady();
    }
  },
  events: {
    play () {
      this.children.play && this.children.play.changeState('play');
      this.hideItself();
    },
    pause () {
      this.children.play && this.children.play.changeState('pause');
    },
    load () {
    },
    durationchange () {
      this.children.progressTime && this.children.progressTime.updateTotal();
    },
    timeupdate () {
      this.progressUpdate();
    },
    progress () {
      this.children.progressBar && this.children.progressBar.progress();
    },
    volumechange () {
      this.volumeUpdate();
    },
    keydown (e) {
      e.stopPropagation();
      switch (e.keyCode) {
        case 32: {
          e.preventDefault();
          this.children.play && this.children.play.click();
          break;
        }
        case 37: {
          e.preventDefault();
          const reduceTime = this.currentTime - 10;
          this.currentTime = reduceTime < 0 ? 0 : reduceTime;
          this.progressUpdate();
          break;
        }
        case 39: {
          e.preventDefault();
          const raiseTime = this.currentTime + 10;
          this.currentTime = raiseTime > this.duration ? this.duration : raiseTime;
          this.progressUpdate();
          break;
        }
        case 38: {
          e.preventDefault();
          const raiseVolume = this.volume + 0.1;
          this.volume = raiseVolume > 1 ? 1 : raiseVolume;
          this.volumeUpdate();
          break;
        }
        case 40: {
          e.preventDefault();
          const reduceVolume = this.volume - 0.1;
          this.volume = reduceVolume < 0 ? 0 : reduceVolume;
          this.volumeUpdate();
          break;
        }
        case 27: {
          e.preventDefault();
          this.children.screen && this.children.screen.narrowScreen();
          break;
        }
      }
    },
    mousemove (e) {
      this.showItself();
      this.hideItself();
    }
  },
  methods: {
    progressUpdate () {
      this.children.progressBar && this.children.progressBar.update();
      this.children.progressTime && this.children.progressTime.updatePass();
    },
    volumeUpdate () {
      this.children.volume && this.children.volume.update();
    },
    hideItself () {
      window.clearTimeout(this.timeId);
      this.timeId = setTimeout(() => {
        setStyle(this.$dom, 'display', 'none');
      }, 2000);
    },
    showItself () {
      setStyle(this.$dom, 'display', 'flex');
    }
  }
};

window.visionControl = visionControl;
