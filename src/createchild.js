// import control from 'control/base.js';
import Play from 'control/play.js';
import Volume from 'control/volume.js';
import ProgressBar from 'control/progressbar.js';
import ProgressTime from 'control/progresstime.js';
import Screen from 'control/screen.js';

/**
 * 1. 将所有的 ui component 输出到 html 结构中
 * 2. 为这些 component 绑定响应的事件
 * @param {*} dom 所有 ui 节点的子容器
 * @param {*} config 关于 ui 的一些列设置
 * @return {Array} 所有子节点
 */

export function createChild (plugin, config) {
  const children = {};
  if(config.play) {
    children.play = new Play(plugin, config.play);
  }
  if(config.volume) {
    children.volume = new Volume(plugin, config.volume);
  }
  if(config.progressBar && !plugin.live) {
    children.progressBar = new ProgressBar(plugin, config.progressBar);
  }
  if(config.progressTime) {
    children.progressTime = new ProgressTime(plugin, config.progressTime);
  }
  if(config.screen) {
    children.screen = new Screen(plugin, config.screen);
  }
  return children;
}
