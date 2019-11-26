/* Custom-Video */
/* writing date : 2019-11-22 */
/* writer : Cho Seonghyun */
/* Depend on JQuery  */

(function($){

	'use strict';

	var defualt = {
		//user settings
		width: "600px",
		height: "auto",
		poster: false,
		auto: false,
		loop: false,
		controls: true,
		play: true,
		stop: true,
		vol: true,
		full_screen: true,
		play_bar: true,
		play_text: "재생",
		pause_text: "일시정지",
		stop_text: "정지",
		vol_on_text: "소리켜짐",
		vol_off_text: "음소거",
		full_screen_on_text: '전체화면',
		full_screen_off_text: '전체화면축소',
		play_img: './custom-video-icon/play.png',
		pause_img: './custom-video-icon/pause.png',
		stop_img: './custom-video-icon/stop.png',
		vol_on_img: './custom-video-icon/vol_on.png',
		vol_off_img: './custom-video-icon/vol_off.png',
		full_screen_on_img: './custom-video-icon/full_screen_on.png',
		full_screen_off_img: './custom-video-icon/full_screen_off.png',
	}
	$.fn.CustomVideo = function(options){

		var video = this;
		var settings = $.extend({},defualt,options);

		var init = function(){
			setup();
		}

		var setup = function(){
			video.attr("preload","auto");

			video.css({
				"vertical-align":"top",
				"width":"100%",
				"height":"100%",
			}).wrap("<div id='custom-video'>");

			video.parent("#custom-video").css({
				"overflow":"hidden",
				"position":"relative",
				"background":"#000",
				"margin":"0 auto"
			}).width(settings.width).height(settings.height);

			video.on('contextmenu', function(e){
				e.preventDefault();
				e.stopPropagation();
			});

			if(settings.poster){
				video.attr('poster',settings.poster);
			}

			if(settings.auto){
				auto();
			} else {
				video.prop('autoplay',false);
			}

			if(settings.loop){
				loop();
			} else {
				video.prop('loop',false);
			}

			if(settings.controls){
				controls();
			} else {
				video.prop('controls',false);
			}

		}
		var auto = function(){
			video.prop("autoplay",true);
		}
		var loop =function(){
			video.prop("loop",true);
		}
		var controls = function(){
			
			if(settings.controls){

				video.prop("controls", false);
				video.parent().append("<div class='video-controls'></div>");
				
				var controls = video.parent().find(".video-controls");
				
				controls.css({
					"position":"absolute",
					"bottom":"0",
					"left":"0",
					"right":"0",
					"padding": 15,
					"transition":"all 0.3s"
				});
				
				if(settings.play){
					if(settings.auto){
						controls.append("<button class='video-controls-play'>"+settings.pause_text+"</button>");
						controls.find(".video-controls-play").css({
							"background":"url("+settings.pause_img+") no-repeat center center / cover"
						});
					} else {
						controls.append("<button class='video-controls-play'>"+settings.play_text+"</button>");
						controls.find(".video-controls-play").css({
							"background":"url("+settings.play_img+") no-repeat center center / cover"
						});
					}
	
					controls.find(".video-controls-play").on('click',function(){
						if(video[0].paused){
							video[0].play();
							this.innerHTML=settings.pause_text;
							$(this).css({
								"background":"url("+settings.pause_img+") no-repeat center center / cover"
							});
						} else {
							video[0].pause();
							this.innerHTML=settings.play_text;
							$(this).css({
								"background":"url("+settings.play_img+") no-repeat center center / cover"
							});
						}
					});
					controls.find(".video-controls-play").css({
						"vertical-align":"middle",
						"margin-right": 10,
					});

					video.on('ended', function(){
						controls.css({
							"opacity":1
						});

						controls.find(".video-controls-play").text(settings.play_text);
						controls.find(".video-controls-play").css({
							"background":"url("+settings.play_img+") no-repeat center center / cover"
						});
						
					});
				}
				if(settings.stop){
					controls.append("<button class='video-controls-stop'>"+settings.stop_text+"</button>");

					controls.find(".video-controls-stop").on('click',function(){
						video[0].currentTime = 0;
						video[0].pause();
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
						if(video[0].volume == 0){
							video[0].volume = 1;
							this.innerHTML=settings.vol_on_text;
							$(this).css({
								"background":"url("+settings.vol_on_img+") no-repeat center center / cover"
							});
						} else {
							video[0].volume = 0;
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
					var customVideo = document.getElementById("custom-video");
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

							video.parent().css({
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
							video.parent().css({
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
							video.parent().css({
								"width":settings.width,
								"height":settings.height
							});
							
						}
					}
				}
				if(settings.play_bar){

					var isPlay = settings.auto;

					video.on("loadeddata", function(){
						var time = Math.round(video[0].duration);
						var current = Math.round(video[0].currentTime);

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

						$(video).on('timeupdate', function(){
							playBarTimer(time, current);
						});


						controls.find(".video-controls-play").on('click',function(){
							if(video[0].paused){
								isPlay = false;
							} else {
								isPlay = true;
							}
						});

						controls.find(".video-controls-stop").on('click',function(){
							current = 0;
							isPlay = false;
							controls.find(".video-controls-play-bar").find("time").html(getTime(current)+" / "+getTime(time)).end().find(".play-bar > span").stop().animate({"width":current/time*100+"%"},250);
						});

						controls.find(".video-controls-play-bar").find(".play-bar").on("click", function(e){
							var playX = $(this).parent().width();
							var pointX = e.offsetX / playX;

							if((time * pointX.toFixed(2)) < video[0].buffered.end(0)){

								pointX = Math.round(time * pointX.toFixed(2));
								
								video[0].currentTime = pointX;

								controls.find(".video-controls-play-bar").find("time").html(getTime(pointX)+" / "+getTime(time)).end().find(".play-bar > span").stop().animate({"width":pointX/time*100+"%"},250);

							}
						});

					});

					video.on('ended', function(){
						isPlay = false;
					});

					function playBarTimer(time, current){
						if(isPlay){
							current = Math.round(video[0].currentTime);
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
					if(!video[0].paused){
						controls.css({
							"opacity":0
						});
					} else {
						controls.css({
							"opacity":1
						});
					}
				});

				video.parent().on("mouseover", function(){
					controls.css({
						"opacity":1
					});
				});

				video.parent().on("mouseleave", function(){
					if(!video[0].paused){
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

				video.parent().on("mousemove", function(e){

					var isFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
						(document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
						(document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
						(document.msFullscreenElement && document.msFullscreenElement !== null);

					controls.css({
						"opacity":1
					});

					clearTimeout(movetimer);
					movetimer = setTimeout(function(){
						if(isFullScreen && !video[0].paused && e.offsetY > controls.height()){
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
})(jQuery);