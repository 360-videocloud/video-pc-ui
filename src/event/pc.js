 import base from './base.js';
 import _ from '../lib/util.js';

 export default class PcVideo extends base {
     constructor (player) {
         super(player);
         this.baseEvent = this.baseEvent.concat([
            [this._playerUI, 'mouseenter', 'uiMouseEnter'],
            [this._ui.uiLayoutBottom, 'click', 'bottomClick'],
            [this._LCplayer, 'keydown', 'keypress'],
            [this._ui.middlePlay, 'click', 'pcPlay'],
            [this._ui.bottomPlay, 'click', 'pcPlay'],
            [this._ui.middlePause, 'click', 'pause'],
            [this._ui.bottomPause, 'click', 'pause'],
            [this._ui.playerVolume, 'mouseenter', 'volumeAreaEnter'],
            [this._ui.playerVolume, 'mouseleave', 'volumeAreaLeave'],
            [this._ui.volume, 'click', 'muteChange'],
            [this._ui.volumeBar, 'mousedown', 'volumeDown'],
            [this._ui.danma, 'click', 'danmaChange'],
            [this._ui.screen, 'click', 'screenChange'],
            [this._ui.progressBarTrack, 'mouseenter', 'tipDown'],
            [this._ui.progressBarTrack, 'mousedown', 'progressDown'],
            [this._ui.progressBarTrack, 'click', 'progressClick'],
            [this._ui.volumeBarTrack, 'mousedown', 'volumeDown'],
            [this._ui.volumeBarTrack, 'click', 'volumeClick'],
         ]);
     }
     addAllEvent () {
         !this._LCplayer.live ||
			!this._options.srcList ||
			this.baseEvent.push([this._ui.qualityList, 'click', 'qualityChange']);

         !this._LCplayer.live ||
			!this._options.rate ||
			this.baseEvent.push([this._ui.rateList, 'click', 'rateChange']);
         this.addEvent(this.baseEvent);

     }
     bottomClick (e) {
         e.stopPropagation();
     }
     keypress (e) {
         switch (e.keyCode) {
             case 32: {
                 e.preventDefault();
                 this._video.paused ? this.pcPlay() : this.pause();
                 break;
             }

             case 37: {
                 e.preventDefault();
                 const reduceTime = this._video.currentTime - 10;
                 this._video.currentTime = reduceTime < 0 ? 0 : reduceTime;
                 this.showMandB(e);
                 break;
             }
             case 39: {
                 e.preventDefault();
                 const raiseTime = this._video.currentTime + 10;
                 this._video.currentTime = raiseTime > this._video.duration
											? this._video.duration : raiseTime;
                 this.showMandB(e);
                 break;
             }
             case 38: {
                 e.preventDefault();
                 const raiseVolume = this._video.volume + 0.1;
                 this._video.volume = raiseVolume > 1 ? 1 : raiseVolume;
                 this.volumeCss();
                 break;
             }
             case 40: {
                 e.preventDefault();
                 const reduceVolume = this._video.volume - 0.1;
                 this._video.volume = reduceVolume < 0 ? 0 : reduceVolume;
                 this.volumeCss();
                 break;
             }
             case 27: {
                 e.preventDefault();
                 if(this._LCplayer.fullscreen) {
                     this.narrowScreen();
                 }
                 break;
             }
         }
     }

     uiMouseEnter () {
         const arr = [];
         arr.push([this._playerUI, 'mousemove', 'uiMouseMove']);
         arr.push([this._playerUI, 'mouseleave', 'uiMouseLeave']);
         this.addEvent(arr);
     }
     uiMouseMove (e) {
         const stand = !e.movementX && !e.movementY;

         const onBottom = e.path.some(item => {
             return item === this._ui.uiLayoutBottom;
         });

         const onMiddle = e.path.some(item => {
             return item === this._ui.uiLayoutMiddle;
         });

         if(this._LCplayer.start && onBottom) {
             this.clearUITimer();
             this.showMandB();
             return;
         }else if(this._LCplayer.start && onMiddle) {
             this.clearUITimer();
             this.addUITimer();
             return;
         }
         if(!this._LCplayer.start || e.target !== this._playerUI || stand) return;
         this.clearUITimer();
         this._playerUI.x = e.clientX;
         this._playerUI.y = e.clientY;
         this.showMandB();
         this.addUITimer();
     }
     uiMouseLeave () {
         const arr = [];
         arr.push([this._playerUI, 'mousemove', 'showMandB']);
         arr.push([this._playerUI, 'mouseleave', 'uiMouseLeave']);
         this.removeEvent(arr);
     }

     pcPlay () {
         if(this._LCplayer.live) {
             _.show([this._ui.videoStatus]);
         }else{
             _.show([this._ui.progressBar, this._ui.progressTotalTime]);
         }

         this._LCplayer.focus();
         this.play();
     }
     tipDown (e) {
         if(!this._video.duration) return;
         const arr = [];
         arr.push([this._ui.progressBarTrack, 'mousemove', 'tipShow', true]);
         arr.push([this._ui.progressBarTrack, 'mouseleave', 'tipEnd', true]);
         this.addEvent(arr);
     }
     tipShow (e) {
         const progressWidth = this._LCplayer.offsetWidth - 17 * this._LCplayer.fontSize;

         this._ui.progressBarTip.textContent = _.formatTime(e.layerX / progressWidth * this._video.duration);
         _.css(this._ui.progressBarTip, {
             display: 'inline-block',
             left: `${e.layerX - 20}px`
         });
     }
     tipEnd (e) {
         const arr = [];
         arr.push([this._ui.progressBarTrack, 'mousemove', 'tipShow', true]);
         arr.push([this._ui.progressBarTrack, 'mouseleave', 'tipEnd', true]);
         this.removeEvent(arr);
         _.hide([this._ui.progressBarTip]);
     }
     progressDown (e) {
         if(!this._video.duration) {
             return;
         }
         this.progressBall(e);
         this._ui.progressBar.startX = e.clientX;
         this._ui.progressBar.startTime = this._video.currentTime;
         const addArr = [];
         const removeArr = [];
         addArr.push([window, 'mousemove', 'progressDraging']);
         addArr.push([window, 'mouseup', 'progressDragEnd']);
         addArr.push([window, 'contextmenu', 'progressDragEnd']);
         this.addEvent(addArr);
         removeArr.push([this._video, 'timeupdate', 'progressAuto']);
         this.removeEvent(removeArr);
     }
     progressDraging (e) {
         const progressWidth = this._LCplayer.offsetWidth - 17 * this._LCplayer.fontSize;
         this._ui.progressBar.endX = e.clientX;
         const dragX = (this._ui.progressBar.endX - this._ui.progressBar.startX) / progressWidth * this._video.duration;
         const dragAfterTime = (this._ui.progressBar.startTime + dragX).toFixed(2);
         this._video.currentTime = dragAfterTime < 0 ? 0 : dragAfterTime > this._video.duration ? this._video.duration : dragAfterTime;
					// this._LCplayer.currentTime = this._video.currentTime;
         this.progressCss();
     }
     progressDragEnd () {
         const addArr = [];
         const removeArr = [];
         removeArr.push([window, 'mousemove', 'progressDraging']);
         removeArr.push([window, 'mouseup', 'progressDragEnd']);
         removeArr.push([window, 'contextmenu', 'progressDragEnd']);
         this.removeEvent(removeArr);
         addArr.push([this._video, 'timeupdate', 'progressAuto']);
         this.addEvent(addArr);
     }
     progressClick (e) {
         if(!this._video.duration || e.eventType === 'mouseup') {
             return;
         }
         this.progressBall(e);
     }

     progressBall (e) {
         const progressWidth = this._LCplayer.offsetWidth - 17 * this._LCplayer.fontSize;
         this._video.currentTime = e.layerX / progressWidth * this._video.duration;
		// this._LCplayer.currentTime = this._video.currentTime;
         this.progressCss();
     }
     volumeAreaEnter () {
         _.show([this._ui.volumeBar]);
     }
     volumeAreaLeave () {
         _.hide([this._ui.volumeBar]);
     }
     muteChange () {
         this._LCplayer.volumes.push(this._video.volume);
         this._LCplayer.volumes.splice(0, 1);
         if(this._video.volume) {
             this._video.volume = 0;
         }else{
             this._video.volume = this._LCplayer.volumes[0];
         }
         this.volumeCss();
     }
     volumeDown (e) {
         this._ui.volumeBar.startY = e.clientY;
         this.volumeBall(e);
         this._ui.volumeBar.startVolume = this._video.volume;
         const arr = [];
         arr.push([window, 'mousemove', 'volumeDraging']);
         arr.push([window, 'mouseup', 'volumeDragEnd']);
         arr.push([window, 'contextmenu', 'volumeDragEnd']);
         this.addEvent(arr);
     }
     volumeDraging (e) {
         _.show([this._ui.volumeBar]);
         this._ui.volumeBar.endY = e.clientY;
         const volumeBarHeight = 4.8 * this._LCplayer.fontSize;
         const dragY = -(this._ui.volumeBar.endY - this._ui.volumeBar.startY) / volumeBarHeight;
         this._video.volume = this._ui.volumeBar.startVolume + dragY < 0
						? 0 : this._ui.volumeBar.startVolume + dragY > 1
								? 1 : this._ui.volumeBar.startVolume + dragY;
         this.volumeCss();
     }
     volumeDragEnd (e) {
         const arr = [];
         arr.push([window, 'mousemove', 'volumeDraging']);
         arr.push([window, 'mouseup', 'volumeDragEnd']);
         arr.push([window, 'contextmenu', 'volumeDragEnd']);
         this.removeEvent(arr);
     }
     volumeClick (e) {
         this.volumeBall(e);
     }
     volumeBall (e) {
         const volumeBarHeight = 4.8 * this._LCplayer.fontSize;
         const y = 1 - e.layerY / volumeBarHeight;
         this._video.volume = y < 0 ? 0 : y > 1 ? 1 : y;
         this.volumeCss();
     }
     danmaChange () {
         this._LCplayer.danmaOn = !this._LCplayer.danmaOn;
         this.trigger('danmachange', this._LCplayer.danmaOn);
         if(this._LCplayer.danmaOn) {
             _.show([this._ui.danmaOn]);
             _.hide([this._ui.danmaOff]);
         }else{
             _.hide([this._ui.danmaOn]);
             _.show([this._ui.danmaOff]);
         }
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
         if(!this._LCplayer.fullscreen) {
             this.enlargeScreen();
         }else{
             this.narrowScreen();
         }
         this.progressCss();
     }
     enlargeScreen () {
         if(this.screenAPI) {
             this._LCplayer[this.screenAPI[0]]();
             const arr = [];
             arr.push([document, this.screenAPI[2], 'isFull']);
             this.addEvent(arr);
         }else if(window.ActiveXObject) {
             const wscript = new window.ActiveXObject('WScript.Shell');
             if(wscript !== null) {
                 wscript.SendKeys('{F11}');
             }
         }
         _.show([this._ui.screenShrink]);
         _.hide([this._ui.screenEnlarge]);

		// this._LCplayer.fontSize = 30;
         this.fullscreenCss({width: '100%', height: '100%', position: 'fixed'});
         this._LCplayer.fullscreen = true;
     }
     isFull () {
         const curFullElem = document[this.screenAPI[3]];
         if(curFullElem !== this._LCplayer) {
             this.narrowScreen();
         }
     }
     narrowScreen () {
         if(this.screenAPI) {
             document[this.screenAPI[1]]();
             const arr = [];
             arr.push([document, this.screenAPI[2], 'isFull']);
             this.removeEvent(arr);
         }else if(window.ActiveXObject) {
             const wscript = new window.ActiveXObject('WScript.Shell');
             if(wscript !== null) {
                 wscript.SendKeys('{F11}');
             }
         }
         _.show([this._ui.screenEnlarge]);
         _.hide([this._ui.screenShrink]);

		// this._LCplayer.fontSize = 20;
         this.fullscreenCss({width: this._options.width, height: this._options.height, position: 'relative'});
         this._LCplayer.fullscreen = false;
     }

}
