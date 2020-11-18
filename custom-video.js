/* Custom-Video */
/* writing day : 2019-11-22 */
/* writer : CSH */

(function($){

	'use strict';

	var defualt = {
		//user settings
		width: "100%",
		height: "inherit",
		poster: false,
		auto: false,
		loop: false,
		controls: true,
		play: true,
		stop: true,
		vol: true,
		play_tooltip: false,
		full_screen: true,
		play_bar: true,
		play_text: "재생",
		pause_text: "일시정지",
		stop_text: "정지",
		vol_on_text: "소리켜짐",
		vol_off_text: "음소거",
		full_screen_on_text: '전체화면',
		full_screen_off_text: '전체화면축소',
		play_img: '/humanframe/global/assets/vendor/custom-video/custom-video-icon/play.png',
		pause_img: '/humanframe/global/assets/vendor/custom-video/custom-video-icon/pause.png',
		stop_img: '/humanframe/global/assets/vendor/custom-video/custom-video-icon/stop.png',
		vol_on_img: '/humanframe/global/assets/vendor/custom-video/custom-video-icon/vol_on.png',
		vol_off_img: '/humanframe/global/assets/vendor/custom-video/custom-video-icon/vol_off.png',
		full_screen_on_img: '/humanframe/global/assets/vendor/custom-video/custom-video-icon/full_screen_on.png',
		full_screen_off_img: '/humanframe/global/assets/vendor/custom-video/custom-video-icon/full_screen_off.png',
	}

	$.fn.CustomVideo = function(options){

		var video = this;
		var settings = $.extend({},defualt,options);

		if(video.length != 0){
			var init = function(){
				for(var i=0; i<video.length; i++){
					setup(video[i]);
				}
			}
	
			var setup = function(e){
				
				$(e).prop("preload","none");
	
				$(e).css({
					"vertical-align":"top",
					"width":"100%",
					"height":"100%",
				}).wrap("<div class='custom-video'>");
	
				$(e).parent().css({
					"overflow":"hidden",
					"position":"relative",
					"background":"#000",
					"margin":"0 auto"
				}).width(settings.width).height(settings.height);
	
				$(e).on('contextmenu', function(e){
					$(e).preventDefault();
					$(e).stopPropagation();
				});
				
				$(e).on("play", function(){
					loading(e);
				});
	
				if(settings.poster){
					$(e).attr('poster',settings.poster);
				}
	
				if(settings.auto){
					auto(e);
				} else {
					$(e).prop('autoplay',false);
				}
	
				if(settings.loop){
					loop(e);
				} else {
					$(e).prop('loop',false);
				}
	
				if(settings.controls){
					controls(e);
				} else {
					$(e).prop('controls',false);
				}
	
			}
	
			var loading = function(e){
				if(!$(e).parent().is(":has(.custum-video-loading)")){
					$(e).parent().append("<div class='custum-video-loading'><div>");
					$(e).parent().find(".custum-video-loading").append("<img src='/humanframe/global/assets/vendor/custom-video/custom-video-icon/loading.svg' alt=''>").css({
						"position":"absolute",
						"top":"50%",
						"left":"50%",
						"transform":"translate(-50%,-50%)"
					});
				}
	
				if($(e)[0].readyState >= 3){
					$(e).parent().find(".custum-video-loading").remove();
				}
	
				$(e).on("canplay", function(){
					$(e).parent().find(".custum-video-loading").remove();
				});
			}
	
			var auto = function(e){
				$(e).prop("autoplay",true);
			}
			var loop =function(e){
				$(e).prop("loop",true);
			}
			var controls = function(e){
				
				if(settings.controls){
	
					$(e).prop("controls", false);
					$(e).parent().append("<div class='video-controls'></div>");
					
					var controls = $(e).parent().find(".video-controls");
					
					controls.css({
						"position":"absolute",
						"bottom":"0",
						"left":"0",
						"right":"0",
						"padding": 15,
						"transition":"all 0.3s"
					});
					
					if(settings.play){
						if(settings.play_tooltip){
							controls.append("<p class='video-tooltip-play'>"+settings.play_tooltip+"</p>");
							controls.find(".video-tooltip-play").css({
								"position":"absolute",
								"bottom":"90px",
								"left":"20px",
								"color":"#fff",
								"font-size":"1.1em",
								"line-height":"1.2",
								"background":"rgba(0,0,0,.8)",
								"padding":"5px 15px",
								"border-radius":"25px"
							});
							controls.find(".video-tooltip-play").prepend("<span></span>");
							controls.find(".video-tooltip-play > span").css({
								"position":"absolute",
								"top":"calc(100% + 9px)",
								"left":"15px",
								"width":"12px",
								"height":"12px",
								"border":"6px solid rgba(0,0,0,.8)",
								"border-bottom":"6px solid transparent",
								"border-right":"6px solid transparent",
								"transform":"scaleY(2.5)",
								"box-sizing":"border-box"
							});
						}
						
						if(settings.auto){
							controls.append("<button class='video-controls-play'>"+settings.pause_text+"</button>");
							controls.find(".video-controls-play").css({
								"background":"url("+settings.pause_img+") no-repeat center center / cover"
							});
							controls.find(".video-tooltip-play").fadeOut(300);
						} else {
							controls.append("<button class='video-controls-play'>"+settings.play_text+"</button>");
							controls.find(".video-controls-play").css({
								"background":"url("+settings.play_img+") no-repeat center center / cover"
							});
						}
		
						controls.find(".video-controls-play").on('click',function(){
							if($(e)[0].paused){
								$(e)[0].play();
								this.innerHTML=settings.pause_text;
								$(this).css({
									"background":"url("+settings.pause_img+") no-repeat center center / cover"
								});
								controls.find(".video-tooltip-play").fadeOut(300);
							} else {
								$(e)[0].pause();
								this.innerHTML=settings.play_text;
								$(this).css({
									"background":"url("+settings.play_img+") no-repeat center center / cover"
								});
								controls.find(".video-tooltip-play").fadeIn(300);
							}
						});
						controls.find(".video-controls-play").css({
							"vertical-align":"middle",
							"margin-right": 10,
						});
	
						$(e).on('ended', function(){
							controls.css({
								"opacity":1
							});
	
							controls.find(".video-controls-play").text(settings.play_text);
							controls.find(".video-controls-play").css({
								"background":"url("+settings.play_img+") no-repeat center center / cover"
							});
							
							controls.find(".video-tooltip-play").fadeIn(300);
							
						});
					}
					if(settings.stop){
						controls.append("<button class='video-controls-stop'>"+settings.stop_text+"</button>");
	
						controls.find(".video-controls-stop").on('click',function(){
							$(e)[0].currentTime = 0;
							$(e)[0].pause();
							controls.find(".video-controls-play").text(settings.play_text);
							controls.find(".video-controls-play").css({
								"background":"url("+settings.play_img+") no-repeat center center / cover"
							});
						});
	
						controls.find(".video-controls-stop").css({
							"background":"url("+settings.stop_img+") no-repeat center center / cover",
						});
	
						controls.find(".video-controls-play").css({
							"background":"url("+settings.play_img+") no-repeat center center / cover"
						});
					}
					if(settings.vol){
						controls.append("<button class='video-controls-volume'>"+settings.vol_on_text+"</button>");
	
						controls.find(".video-controls-volume").on('click',function(){
							if($(e)[0].volume == 0){
								$(e)[0].volume = 1;
								this.innerHTML=settings.vol_on_text;
								$(this).css({
									"background":"url("+settings.vol_on_img+") no-repeat center center / cover"
								});
							} else {
								$(e)[0].volume = 0;
								this.innerHTML=settings.vol_off_text;
								$(this).css({
									"background":"url("+settings.vol_off_img+") no-repeat center center / cover"
								});
							}
						});
	
						controls.find(".video-controls-volume").css({
							"background":"url("+settings.vol_on_img+") no-repeat center center / cover",
							"position":"absolute",
							"right":61,
						});
					}
					if(settings.full_screen){
						var customVideo = $(e)[0].parentNode;
						controls.append("<button class='video-controls-full-screen'>"+settings.full_screen_on_text+"</button>");
	
						controls.find(".video-controls-full-screen").css({
							"background":"url("+settings.full_screen_on_img+") no-repeat center center / cover",
							"position":"absolute",
							"right":15,
						});
	
						controls.find(".video-controls-full-screen").on('click', function(){
							fullScreenHandler();
						});
	
						$(document).on("fullscreenchange webitfullscreenchange mozfullscreenchange msfullscreenchange", function(){
							
							var isFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
							(document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
							(document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
							(document.msFullscreenElement && document.msFullscreenElement !== null);
	
							if(!isFullScreen){
	
								controls.find(".video-controls-full-screen").html(settings.full_screen_off_text).css({
									"background":"url("+settings.full_screen_on_img+") no-repeat center center / cover"
								});
	
								$(e).parent().css({
									"width":settings.width,
									"height":settings.height
								});
	
							}
						});
	
						function fullScreenHandler(){
	
							var isFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
							(document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
							(document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
							(document.msFullscreenElement && document.msFullscreenElement !== null);
	
							if(!isFullScreen){
							
								if ($.isFunction(customVideo.requestFullscreen)) {
									customVideo.requestFullscreen();
								} else if($.isFunction(customVideo.webkitRequestFullscreen)){ //wetkit 
									customVideo.webkitRequestFullScreen();
								} else if($.isFunction(customVideo.mozRequestFullScreen)){ //mozila
									customVideo.mozRequestFullScreen();
								} else if($.isFunction(customVideo.msRequestFullscreen)){ //ms
									customVideo.msRequestFullscreen();
								}
								controls.find(".video-controls-full-screen").html(settings.full_screen_off_text).css({
									"background":"url("+settings.full_screen_off_img+") no-repeat center center / cover"
								});
								$(e).parent().css({
									"width":"100%",
									"height":"100%"
								});
	
							} else {
							
								if($.isFunction(document.exitFullscreen)){
									document.exitFullscreen();
								} else if($.isFunction(document.webkitExitFullscreen)){ //wetkit 
									document.webkitExitFullscreen();
								} else if($.isFunction(document.mozExitFullScreen)){ //mozila
									document.mozExitFullScreen();
								} else if($.isFunction(document.msExitFullscreen)){ //ms
									document.msExitFullscreen();
								}
								controls.find(".video-controls-full-screen").html(settings.full_screen_off_text).css({
									"background":"url("+settings.full_screen_on_img+") no-repeat center center / cover"
								});
								$(e).parent().css({
									"width":settings.width,
									"height":settings.height
								});
								
							}
						}
					}
					if(settings.play_bar){
	
						$(e).on("loadeddata", function(){
							var time = Math.round($(e)[0].duration);
							var current = Math.round($(e)[0].currentTime);
	
							controls.append("<div class='video-controls-play-bar'><div class='play-bar'><span></span><time>"+getTime(current)+" / "+getTime(time)+"</time>");
							controls.find(".video-controls-play-bar").find(".play-bar").css({
								"position":"relative",
								"width":"100%",
								"height": 5,
								"margin-top":10,
								"background":"rgba(255,255,255,.2)",
								"cursor":"pointer",
								"border-radius": 2.5
							}).end().find("time").css({
								"position":"absolute",
								"top":-35,
								"left":100,
								"color":"#fff",
								"font-size": "12px"
							}).end().find(".play-bar > span").css({
								"display":"inline-block",
								"float":"left",
								"background":"#0d7fff",
								"height":"inherit",
								"width":current/time*100+"%",
								"vertical-align":"middle"
							});
	
							$(e).on('timeupdate', function(){
								playBarTimer(time, current);
							});
	
							controls.find(".video-controls-stop").on('click',function(){
								current = 0;
								controls.find(".video-controls-play-bar").find("time").html(getTime(current)+" / "+getTime(time)).end().find(".play-bar > span").stop().animate({"width":current/time*100+"%"},250);
							});
	
							controls.find(".video-controls-play-bar").find(".play-bar").on("click", function(event){
								var playX = $(this).parent().width();
								var pointX = event.offsetX / playX;
	
								pointX = Math.round(time * pointX.toFixed(2));
								
								$(e)[0].currentTime = pointX;

								controls.find(".video-controls-play-bar").find("time").html(getTime(pointX)+" / "+getTime(time)).end().find(".play-bar > span").stop().animate({"width":pointX/time*100+"%"},250);
	
								//}
							});
	
						});
	
						function playBarTimer(time, current){
							if(!$(e)[0].paused){
								current = Math.round($(e)[0].currentTime);
								controls.find(".video-controls-play-bar").find("time").html(getTime(current)+" / "+getTime(time)).end().find(".play-bar > span").stop().animate({"width":current/time*100+"%"},250);
							}
						}
	
						function getTime(seconds){
							var hour, min, sec;
	
							hour = parseInt(seconds/3600);
							min = parseInt((seconds%3600)/60);
							sec = seconds%60;
	
							if(hour.toString().length == 1) hour = "0" + hour;
							if(min.toString().length == 1) min = "0" + min;
							if(sec.toString().length == 1) sec = "0" + sec;
	
							return hour+":"+min+":"+sec;
						}
					}
	
					controls.find("button").css({
						"text-indent":"-9999px",
						"overflow":"hidden",
						"width":"36px",
						"height":"36px",
						"border":"0",
						"cursor":"pointer",
						"vertical-align":"middle",
						"transition":"all 0.15s ease-in"
					});
					controls.find("button").on("click", function(e){
						$(e.target).css({
							"transform":"scale(0.9)"
						});
						setTimeout(function(){
							$(e.target).css({
								"transform":"scale(1.1)"
							});
							setTimeout(function(){
								$(e.target).css({
									"transform":"scale(1)"
								});
							},150);
						},150);
					});
	
					controls.find("button").on("focus", function(){
						controls.css({
							"opacity":1
						});
					});
	
					controls.find("button").on("focusout", function(){
						if(!$(e)[0].paused){
							controls.css({
								"opacity":0
							});
						} else {
							controls.css({
								"opacity":1
							});
						}
					});
	
					$(e).parent().on("mouseover", function(){
						controls.css({
							"opacity":1
						});
					});
	
					$(e).parent().on("mouseleave", function(){
						if(!$(e)[0].paused){
							controls.css({
								"opacity":0
							});
						} else {
							controls.css({
								"opacity":1
							});
						}
					});
					
					var movetimer;
	
					$(e).parent().on("mousemove", function(e){
	
						var isFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
							(document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
							(document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
							(document.msFullscreenElement && document.msFullscreenElement !== null);
	
						controls.css({
							"opacity":1
						});
	
						clearTimeout(movetimer);
						movetimer = setTimeout(function(){
							if(isFullScreen && !$(e)[0].paused && $(e).offsetY > controls.height()){
								controls.css({
									"opacity":0
								});
							}
						}, 3000);
					});
				}
	
			}
			
			
			init();
	
			return this;
		}
	}
})(jQuery);
