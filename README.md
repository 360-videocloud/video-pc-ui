# 针对 pc 端 h5 播放器的 ui

本文首先对市场上主流播放器的 ui 组件进行对比分析，找出大多数播放器最常用的 ui 组件，最为官方组件。

## 对比分析

### 数据表格

| name | components | context-menu |
| ---- | :--------: | :----------: |
| bilibili-vod | bottom-play-pause, middle-play-pause, loading, progress-bar, progress-time, mute, volume-bar(hover, vertical), video-quality, danma-on-off, cycle, wide-screen, full-screen | video-console-info, playbackRate, player-mirror, copyright |
| bilibili-live | bottom-play-pause, loading, live-duration, mute, volume-bar(horizontal), video-quality, player-change(h5, flash), cdn-change, refresh, danma-setting, danma-on-off, wide-screen, full-screen | danma-piece-opt(del, report, copy, shield), cdn-change, video-console-info, copyright |
| youtube-vod | bottom-play-pause, middle-play-pause, loading,next-video, mute, volume-bar(horizontal), progress-bar(up-line),  progress-time, subtitle, setting(quality, playbackRate, autoplay), wide-screen, full-screen | |
| youtube-live | bottom-play-pause, middle-play-pause, loading, mute, volume-bar(hove, horizontal), subtitle, setting(quality, playbackRate, autoplay), wide-screen, full-screen | |
| iqiyi-vod | bottom-play-pause, next-video, mute, volume-bar(vertical), progress-time, wide-screen, full-screen | |
| youku-live | bottom-play-pause, middle-play-pause, loading, refresh, mute, volume-bar(horizontal), setting, wide-screen, full-screen | |
| youku-vod | bottom-play-pause, middle-play-pause, loading, next-video, progress-time, danma, progress-bar(up-line), mute, volume-bar(horizontal), quality, setting, full-screen | |

### 结论

1. 实现方式是， 自定义的配置表， 给组件设置 true/false 来控制组件的显示与否

```javascript

let defaultComponents = {
  centerPlay: true,
  // ...
}

```

1. 最基本组件（精简模式）

* bottom-play-pause
* middle-play-pause
* loading
* mute
* volume-bar(vertical)
* progress-bar(inline-line)
* progress-time
* full-screen

1. 官方扩展组件

1. 用户自定义组件

## 组件类型及设计

### 主要定义

1. 通过切换父类来控制子组件的显示

```html
<style>
  .play-button,
  .pause-button{
    display: none;
  }
  .state-play .play-button{
    display: inline-block;
  }
  .state-pause .pause-button{
    display: inline-block;
  }
</style>

<div class="h5-videoplayer state-play">
  <span class="play-button"></span>
  <span class="pause-button"></span>
</div>

```

## 重点／难点

### Component Factory

所有 ui 组件均是由，这个方法构造出来的，不仅内部使用构造官方组件， 也可以暴漏给用户来创造用户自定义组件。(参考 videojs 的实现方式)

### 兼容性检测／总结／hack

### controlbar 布局设置

## videojs 学习

### 制造组件的工厂方法

### 每个组件的实现方式（逻辑）
