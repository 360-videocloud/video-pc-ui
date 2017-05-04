# 播放器 ui

## 初始化

```
let options = {
}

let player = new LCplayer(id, options);
```

## 目前有的组件
1. 播放
2. 暂停
3. 声音
4. 全屏
5. 进度
6. 直播状态
7. 弹幕开关

## 组件的回调
1. 弹幕开关
```

player.on('danmachange', function() {});

```
2. 视频相关回掉
```

video.addEventListener('play', function() {});
video.addEventListener('pause', function() {});
...

```

## 17.5.4 修改

### pc ui
1. 当鼠标仔进度条上， 音量条上时， 不隐藏bottom volumebar //
2. 页面内的 hover 用 js 来控制， 非 css //
3. ie 9 兼容， ff， safari 兼容
4. 加弹幕开关

### 接下来要做的事情
1. control 模块化， 模块宽度自动化
2. 完善 defaultOption






