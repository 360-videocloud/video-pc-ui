import _ from '../lib/util.js';

export default class videoEvent {
    constructor (player) {
        this.fns = [];
        this.eventMap = {};
        this._ui = player._ui;
        this._playerUI = player.playerUI;
        this._video = player._video;
        this._videoSdk = player._videoSdk;
        this._LCplayer = player.LCplayer;
        this._options = player._options;

        this._showUiTimer = null;
        this._showTipTimer = null;

		// status 状态管理
        this._LCplayer.playing = false;

        this.baseEvent = [
            [this._video, 'durationchange', 'durationchange'],
            [this._video, 'ended', 'ended'],
            [this._video, 'error', 'error'],
            [this._video, 'timeupdate', 'progressAuto'],
            [this._video, 'playing', 'playing'],
            [this._video, 'waiting', 'waiting'],
            [this._video, 'seeked', 'seeked'],
            [this._video, 'seeking', 'seeking'],
            [this._video, 'progress', 'progress']
        ];
        this.initListener();

    }
    initListener () {
        this.on = function (name, callback) {
            this.eventMap[name] = this.eventMap[name] || [];
            this.eventMap[name].push(callback);
        };
        this.remove = function (name, callback) {
            const index = !this.eventMap[name] ? -1 : this.eventMap[name].indexOf(callback);
            if(index === -1) return;
            this.eventMap[name].splice(index, 1);
        };
        this.trigger = function (name, ...args) {
            if(!this.eventMap[name] || !this.eventMap[name].length) return;
            this.eventMap[name].map(item => {
                item(...args);
            });
        };
    }
    trans (name) {
        this.fns[name] = this.fns[name] || ((...args) => this[name](...args));
        return this.fns[name];
    }
    addEvent (events) {
        events.forEach(item => {
            item[0].addEventListener(item[1], this.trans(item[2]), false);
        });
    }
    removeEvent (events) {
        events.forEach(item => {
            item[0].removeEventListener(item[1], this.trans(item[2]), false);
        });
    }
    // 视频结束事件
    ended () {
        this._video.currentTime = 0;
        this._options.loop && this.play();
        this.progressCss();
        this.initialUI();
    }
	// 视频错误事件
    error () {
        this.initialUI();
    }
    progress () {
		// 某些设备，前几次调用这个方法会报错
        try{
            const buffer = this._video.buffered.end(0);
            _.css(this._ui.progressBarBuffer, {
                width: buffer / this._video.duration * 100 + '%'
            });
        }catch(e) {}

    }
	// 获取到 duration
    durationchange () {
        if(!this._LCplayer.live && this.adjustDuration()) {
            this._LCplayer.first = true;
            return;
        }
		// 设备初始化后掉起的事件不同，此处手动掉起
        this._LCplayer.first && this.playing();
        this._ui.progressTotalTime.textContent = '/' + _.formatTime(this._video.duration);
        this.progressTime();
    }
    adjustDuration () {
		// android 下第一次 duration 可能为 Infinity、0、NaN
        return !this._video.duration || isNaN(this._video.duration) || this._video.duration === Infinity || false;
    }
    playOrPause () {
		// 防止播放器还没有准备好就被操作

        if(this._video.paused) {
            this.play();
        }else{
            this.pause();
        }
    }
    play () {

        this._LCplayer.start = true;
        this._video.currentTime = this._LCplayer.currentTime || this._video.currentTime;

        this._video.play();
        this.progress();
        this._options.poster && _.css(this._playerUI, {
            background: ''
        });
        if(this.adjustDuration()) {
            this.startLoading();
            return;
        }else{
            this.showPause();
            this.showMandB();
            this.hideInitialUI();
        }
    }
    pause () {
        this._video.pause();
        this.initialUI();
    }
    playing () {
		// 针对 android 点击 播放按钮， 会出发 playing 事件
		// ios 下会触发 waiting 事件
        if(!this._LCplayer.live && this.adjustDuration()) {
            return;
        }
        if(this._video.currentTime === this._LCplayer.currentTime) {
            this._LCplayer.currentTime = 0;
        }
		// this._LCplayer.playing = true;
        this.endLoading();
    }
    waiting () {
        this._LCplayer.start && this.startLoading();
    }
    seeking () {
        this._LCplayer.seeking = true;
    }
    seeked () {
        this._LCplayer.seeking = false;
    }
    startLoading () {
        this.clearUITimer();
        this.showMandB();
        this.showLoading();
    }
    endLoading () {
        this.showPause();
        this.hideInitialUI();
    }
    progressAuto () {
        if(this._LCplayer.seeking) {return;}
        if(
			this._LCplayer.currentTime
		) {
            this._video.currentTime = this._LCplayer.currentTime;
            this._LCplayer.currentTime = 0;
        }
        this.progressCss();
    }
	// 显示 隐藏 middle & bottom
    showMandB () {
        this.progressCss();
        _.show([this._ui.uiLayoutMiddle, this._ui.uiLayoutBottom]);
    }
    hideMandB () {
        _.hide([this._ui.uiLayoutMiddle, this._ui.uiLayoutBottom]);
    }
    hideMiddleElems () {
        _.hide([].slice.call(this._ui.uiLayoutMiddle.children));
    }
    showTip () {
        _.show([this._ui.uiTools, this._ui.middleTip]);
    }
    hideTip () {
        _.hide([this._ui.uiTools, this._ui.middleTip]);
    }
    showLoading () {
        this.hideMiddleElems();
        _.show([this._ui.middleLoading]);
    }
    showPlay () {
        this.hideMiddleElems();
        _.hide([this._ui.bottomPause]);
        _.show([this._ui.middlePlay, this._ui.bottomPlay]);
    }
    showPause () {
        this.hideMiddleElems();
        _.hide([this._ui.bottomPlay]);
        _.show([this._ui.middlePause, this._ui.bottomPause]);
    }
    showVolume () {
        const child = [].slice.call(this._ui.volume.children);
        _.hide(child);
        const icon = this._video.volume !== 0 ? this._video.volume !== 1 ? child[1] : child[2] : child[0];
        _.show([icon]);
    }
    progressTime () {
        if(this.adjustDuration()) return;
        this._ui.progressCurrentTime.textContent = _.formatTime(this._video.currentTime);
    }
    progressCss () {
        if(!this._LCplayer.start) {return;}
        const percent = this._video.currentTime ? this._video.currentTime / this._video.duration * 100 + '%' : 0;
        _.css(this._ui.progressBarAll, {
            width: percent
        });
        !this._LCplayer.live && this.progressTime();
    }
    volumeCss () {
        const percent = this._video.volume * 100 + '%';
        _.css(this._ui.volumeBarAll, {
            height: percent
        });
        this.showVolume();
    }
    fullscreenCss (option) {
        _.css(this._LCplayer, {
            position: option.position,
            width: option.width,
            height: option.height,
            fontSize: this._LCplayer.fontSize + 'px'
        });
        // this._LCplayer.volumeBarHeight = 4.8 * this._LCplayer.fontSize;
        this.volumeCss();
        this.progressCss();

    }

    clearUITimer () {
        clearTimeout(this._showUiTimer);
    }
    addUITimer () {
        this._showUiTimer = setTimeout(() => {
            this.hideMandB();
        }, 1500);
    }
    initialUI () {
        this.clearUITimer();
        this.showMandB();
        if(
			!this._video.error &&
			(this._video.paused || this._video.ended)
		) {
            this.showPlay();
        }
    }
	// 隐藏样式
    hideInitialUI () {
        this.clearUITimer();
        this.addUITimer();
    }

}

