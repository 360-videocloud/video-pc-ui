import '../style/pc.css';
import tpl from '../tpl/pc.html';
import _ from '../lib/util.js';
import PcVideo from '../event/pc.js';

class LCplayer {
    constructor (id, options) {
        this.LCplayer = document.getElementById(id);
        this._options = options;
        this._videoSdk = this.LCplayer.querySelector('video');
        this.created();
    }

    created () {
		// 用户是否开启了 control 选项
        if (!this._options.controls) {
            return;
        };

        this._video = this.LCplayer.querySelector('video');

		// 清除 sdk 可能增加的样式
        _.removeAttr(this._video, ['controls', 'autoplay', 'poster', 'width', 'height']);

		// 创建组件
        this.createUI();

		// 初始化
        this.init();
    }

    createUI () {

        const ui = document.createElement('player-ui');

        ui.innerHTML = tpl;

        this.LCplayer.appendChild(ui);

		// 将这些组件都绑定到 this 方便调用
        this.playerUI = document.querySelector('player-ui');

		// key: name, value: selector
        const uiMap = {
            uiLayoutMiddle: 'ui-middle',
            uiTools: 'ui-tools',
            middleTip: 'middle-tip',
            middlePlay: 'middle-play',
            middlePause: 'middle-pause',
            middleLoading: 'middle-loading',
            uiLayoutBottom: 'ui-bottom',
            bottomPlayPause: 'bottom-play-pause',
            bottomPause: 'bottom-pause',
            bottomPlay: 'bottom-play',
            progressTime: 'video-time',
            progressCurrentTime: 'video-time-current',
            progressTotalTime: 'video-time-total',
            progressBar: 'progress-bar',
            progressBarBuffer: 'progress-bar-buffer',
            progressBarTrack: 'progress-bar-track',
            progressBarTip: 'progress-bar-tip',
            progressBarAll: 'progress-bar-all',
            playerVolume: 'player-volume',
            volume: 'volume',
            volumeBar: 'volume-bar',
            volumeBarTrack: 'volume-bar-track',
            volumeBarAll: 'volume-bar-all',
            videoStatus: 'video-status',
            danma: 'player-danma',
            danmaOn: 'player-danma-on',
            danmaOff: 'player-danma-off',
            screen: 'player-screen',
            screenShrink: 'player-screen-shrink',
            screenEnlarge: 'player-screen-enlarge',
        };

        this._ui = {}; // ui 层相关组件
        Object.keys(uiMap).map(item => {
            this._ui[item] = this.playerUI.querySelector(uiMap[item]);
        });
    }

    init () {
        const player = this.LCplayer;
        const video = this._video;
        const options = this._options;

		// player 默认
        _.addClass(player, 'livecloud-player');

		// live or replay
        player.live = options.vtype === 'liveplay';

		// dpr
        player.dpr = player.device === 1 ? window.devicePixelRatio : 1;

		// 初始化字体大小
        player.fontSize = 16;1;

		// 默认声音 30
        player.volumes = [0, 0.3];
        video.volume = 0.3;

		// 默认屏幕
        player.fullscreen = false;

		// player focus
        _.attr(player, 'tabindex', -1);

        this.initUI();

		// 添加事件
        this.event = new PcVideo(this);
        this.event.addAllEvent();
        this.eventMap = this.event.eventMap;
        this.on = this.event.on;
        this.off = this.event.off;
        this.trigger = this.event.trigger;

		// 自动播放
        this._options.autoplay && this.event.pcPlay();

        // 弹幕默认开启
        player.danmaOn = true;

    }

    initUI () {
        const player = this.LCplayer;
        const options = this._options;

		// 播放器组件的 宽／高
        _.css(player, {
            width: options.width,
            height: options.height,
            fontSize: player.fontSize + 'px'
        });

		// 播放器 poster
        options.poster && _.css(this.playerUI, {
            background: `url(${options.poster}) no-repeat center`,
            backgroundSize: '100% 100%'
        });

    }

}
window.LCplayer = LCplayer;
