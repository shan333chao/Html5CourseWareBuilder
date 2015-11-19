(function($) {
	var defaults = {
		// o: 0,
		speed: 5000,
		fn: function() {}
	};

	function dragFn(obj, opt) {
		this.ever = obj;
		this.ul_length = $(this.ever).children().length;
		this.oxy = opt['o'] || 'x'; // 指定横向或纵向拖动，默认为横向
		// console.log(opt['o'])
		this.s_x = 0; // 鼠标x坐标初始位置
		this.s_y = 0; // 鼠标y坐标初始位置
		this.start_x = 0; // 元素x坐标初始位置
		this.start_y = 0; // 元素y坐标初始位置
		this.end_x = 0; // 元素x坐标结束位置
		this.end_y = 0; // 元素y坐标结束位置
		this.dr = 'x'; // 默认为横向拖动
		this.this_index = 0; // 移动时的图片的索引
		this.drag_flag = false; // 是否是元素按下
		this.steperx = $(this.ever).children().eq(0).outerWidth(true);
		this.stepery = $(this.ever).children().eq(0).outerHeight(true);
		this.fn = opt['fn'];
		this.down = false;
		this.autoTimer = undefined;
		this.timeSpeed = opt['speed'] || 5000; // 动画间隔时间
		this.animateSpeed = this.timeSpeed / 4 >= 500 ? 500 : this.timeSpeed / 4; // 动画运行时间
		this.iconsName = 'iconBtn' + this.oxy;
		this.slideDirection = opt['slideDirection'] || 'left';

		function return_false(e, o1, o2) {
			if (o1) {
				e.preventDefault();
			}
			if (o2) {
				e.stopPropagation();
			}

		}
		if (typeof this.init !== 'function') {
			dragFn.prototype.init = function(o) {
				var $this = this;
				var ul = $($this.ever);

				if ($this.slideDirection === 'right') {
					$this.start_x_right = -($(this.ever).width() - this.steperx);
					ul.css({
						left: $this.start_x_right + 'px'
					});
				}

			};

			// 禁止选择
			dragFn.prototype.noSelect = function(o) {
				$(o).children().on('selectstart', function(e) {
					return_false(e, true, false);
				}).on('dragstart', function(e) {
					return_false(e, true, false);
				});
			};

			// 拖动时的索引
			dragFn.prototype.currentIndex = function(c) {
				var $this = this;

				var t;

				if ($this.slideDirection === 'left') {
					t = c < 0;
				} else if ($this.slideDirection === 'right') {
					t = c > 0;
				}
				if (t) {
					$this.this_index += 1;
				} else {
					$this.this_index -= 1;
				}
				$this.checkIndex();
			};
			dragFn.prototype.checkIndex = function() {
				var $this = this;
				if ($this.this_index <= 0) {
					$this.this_index = 0;
				}
				if ($this.this_index >= $this.ul_length) {
					$this.this_index = $this.ul_length - 1;
				}
			};
			// 获取鼠标位置
			dragFn.prototype.mPostion = function(e) {
				var x, y;
				var e = e || window.event;

				if (!isNaN(parseInt(e.clientX)) && !isNaN(parseInt(e.clientY))) {
					x = e.clientX;
					y = e.clientY;
				} else if (e.originalEvent.targetTouches.length) {
					x = e.originalEvent.targetTouches[0].clientX;
					y = e.originalEvent.targetTouches[0].clientY;
				} else {
					x = e.originalEvent.changedTouches[0].clientX;
					y = e.originalEvent.changedTouches[0].clientY;
				}

				// console.log(x, y)
				this.end_x = x + document.body.scrollLeft + document.documentElement.scrollLeft;
				this.end_y = y + document.body.scrollTop + document.documentElement.scrollTop;
				return {
					x: x + document.body.scrollLeft + document.documentElement.scrollLeft,
					y: y + document.body.scrollTop + document.documentElement.scrollTop
				};
			};
			// 获取指定css样式
			dragFn.prototype.getStyle = function(o, s) {
				var v = "";
				if (document.defaultView && document.defaultView.getComputedStyle) {
					v = document.defaultView.getComputedStyle(o, "").getPropertyValue(s);
				} else if (o.currentStyle) {
					s = s.replace(/\-(\w)/g, function(p1) {
						return p1.toUpperCase();
					});
					v = o.currentStyle[s];
				}
				return v;
			};
			// 创建小圆点
			dragFn.prototype.createIcon = function() {
				var $this = this;
				var html = '';
				html += '<div class="' + $this.iconsName + '"><span class="active pointer0"></span>';
				for (var i = 1; i < $this.ul_length; i++) {
					html += '<span class="pointer' + i + '"></span>';
				}
				html += '</div>';
				// console.log($($this.ever).parent())
				$($this.ever).parent().append(html);
			};
			// 小圆点切换
			dragFn.prototype.iconEvent = function(i) {
				var iconBtn = $(this.ever).parent().children('.' + this.iconsName);
				if (iconBtn.length > 0) {
					iconBtn.children().eq(i).addClass('active').siblings().removeClass('active');
				}
			};
			// 小圆点事件
			dragFn.prototype.createIconEvent = function() {
				var $this = this;
				var icons = $(this.ever).parent().children('.' + $this.iconsName).children('span');
				icons.on('click', function(e) {
					var index = $(this).index();
					$this.this_index = index;
					$this.checkIndex();
					// console.log($this.this_index)
					$this.move();
					return_false(e, true, false);
				});
			};

			// 创建左右按钮
			dragFn.prototype.createPrevNext = function() {
				var $this = this;
				var sbtns = '<div class="btn prev"><a class="hide">&lt;</a></div><div class="btn next"><a class="hide">&gt;</a></div>';
				// console.log(isMobile().any());
				if (isMobile().any()) {
					return false;
				}
				$($this.ever).after(sbtns);
			};
			dragFn.prototype.prevNextEvent = function() {
				var $this = this;
				$($this.ever).parent().on({
					mouseenter: function(e) {
						$('.prev a, .next a').removeClass('hide');
						return_false(e, true, false);
					},
					mouseleave: function(e) {
						$('.prev a, .next a').addClass('hide');
						return_false(e, true, false);
					}
				});

				$('.prev a').on('click', function(e) {
					// var left = parseInt($($this.ever).css('left'));
					// console.log(parseInt(left))
					// $this.currentIndex(left)
					$this.this_index -= 1;
					$this.checkIndex();
					// console.log($this.this_index)
					$this.move();
					return_false(e, true, false);
				});

				$('.next a').on('click', function(e) {
					$this.this_index += 1;
					$this.checkIndex();
					// console.log($this.this_index)
					$this.move();
					return_false(e, true, false);
				});
			};
			// 拖动事件
			dragFn.prototype.dragEvent = function() {
				var $this = this;
				// 鼠标按下
				// $($this.ever).on('mousedown', function(e) {

				// });
				// console.dir($this.ever)
				// $this.ever.addEventListener("touchstart", handleTouchEvent, false);
				// function handleTouchEvent(e){
				//   console.log(e)
				// }
				// 移动端
				if (isMobile().any()) {
					$($this.ever).on({
						touchstart: function(e) {
							mouseDown(e);
							// return_false(e, true, false);
						}
					});
				} else {
					$($this.ever).on({
						mousedown: function(e) {
							mouseDown(e);
							// return_false(e, true, false);
						}
					});
				}

				function mouseDown(e) {
					if ($this.autoTimer) {
						$this.clearTimer();
					}

					$this.down = true;
					$this.drag_flag = true;
					$this.mPostion(e);
					$this.s_x = $this.end_x;
					$this.s_y = $this.end_y;
					// $this.s_x = $this.mPostion(e)['x'];
					// $this.s_y = $this.mPostion(e)['y'];
					$this.start_x = parseInt($this.getStyle($this.ever, 'left'));
					$this.start_y = parseInt($this.getStyle($this.ever, 'top'));

					// css没设置时为parseInt('auto')
					if (isNaN($this.start_x)) {
						// $this.start_x = parseInt($this.ever.offsetLeft);
						$this.start_x = 0;

					}
					if (isNaN($this.start_y)) {
						// $this.start_y = parseInt($this.ever.offsetTop);
						$this.start_y = 0;
					}
					$this.noSelect(document);
				}
				$this.dragMove();
				$this.dragEnd();
			};
			dragFn.prototype.dragMove = function() {
				var $this = this;
				// 鼠标按下不放并且移动
				// $($this.ever).on('mousemove', function(e) {
				//   $this.dragXY(e);
				// });

				if (isMobile().any()) {
					$($this.ever).on({
						touchmove: function(e) {
							$this.dragXY(e);
							$this.dragXY(e);
							// var events = e;
							// $(this).on('touchend', function() {
							//   // console.log(e.originalEvent.targetTouches[0].clientX)
							//   $this.endup(e);
							// });
							return_false(e, true, false);
						}
					});
				} else {
					$($this.ever).on({
						mousemove: function(e) {
							$this.dragXY(e);
							return_false(e, true, false);
						}
					});
				}

			};
			// 元素跟随鼠标移动
			dragFn.prototype.dragXY = function(e) {
				var $this = this;
				// console.log($this.down)
				if (!$this.down) return false;
				var c = $this.dr;
				// console.log($this.mPostion)
				// var n_x = $this.mPostion(e)['x'];
				// var n_y = $this.mPostion(e)['y'];
				$this.mPostion(e);
				var n_x = $this.end_x;
				var n_y = $this.end_y;
				var stepx;
				var stepy;

				if ($this.slideDirection === 'left') {
					stepx = $this.s_x - n_x;
				} else if ($this.slideDirection === 'right') {
					stepx = n_x - $this.s_x;
				}

				stepy = $this.s_y - n_y;

				var a = Math.abs(stepx);
				var b = Math.abs(stepy);
				if (a > b) {
					$this.dr = 'x'; // 横向
				}
				if (a < b) {
					$this.dr = 'y'; // 纵向
				}

				// console.log($this.oxy, $this.dr);
				if ($this.dr === $this.oxy) {

					if ($this.oxy === 'y') {

						$this.ever.style['top'] = $this.start_y - stepy + 'px';
					} else if ($this.oxy === 'x') {
						var movestep;
						if ($this.slideDirection === 'left') {
							movestep = $this.start_x - stepx;
						} else if ($this.slideDirection === 'right') {
							movestep = $this.start_x + stepx;
						}

						$this.ever.style['left'] = movestep + 'px';

					}
					$this.dragEnd();
				}
			};
			// 鼠标放开或者鼠标移出元素时，移出元素上的鼠标移动事件
			dragFn.prototype.dragEnd = function() {
				var $this = this;

				if (isMobile().any()) {
					$($this.ever).on({
						touchend: function(e) {
							// console.log(e.originalEvent.changedTouches[0].clientX)
							$this.endup(e);
							return_false(e, true, false);
						}
					});
				} else {
					$($this.ever).on({
						mouseup: function(e) {
							$this.endup(e);
							return_false(e, true, false);
						},
						mouseout: function(e) {
							$this.endup(e);
							return_false(e, true, false);
						}
					});

				}

			};
			dragFn.prototype.endup = function(e) {
				var $this = this;
				// endup(e);
				// function endup(e) {
				$this.down = false;
				// $(this).off('mousemove', function(e) {
				//   $this.dragXY(e);
				// });
				if (isMobile().any()) {
					$(this).off({
						touchmove: function(e) {
							$this.dragXY(e);
						}
					});
				} else {
					$(this).off({
						mousemove: function(e) {
							$this.dragXY(e);
						}
					});
				}

				flag(e);
				// }

				function flag(e) {
					if ($this.drag_flag) {
						$this.animateEnd(e);
					}
					$this.drag_flag = false;
				}
			};
			dragFn.prototype.move = function(fns) {
				var fns = fns || function() {};
				var $this = this;
				// console.log($($this.ever).is(':animated'))
				if ($($this.ever).is(':animated')) {
					return false;
				}

				if ($this.oxy === 'y') {
					$($this.ever).stop(true, false).animate({
						'top': -($this.this_index * $this.stepery) + 'px'
					}, {
						duration: $this.animateSpeed,
						complete: function() {
							$this.iconEvent($this.this_index);
							fns();
							$this.fn($this.this_index);
						}
					});

				} else if ($this.oxy === 'x') {
					var goend;
					if ($this.slideDirection === 'left') {
						goend = -($this.this_index * $this.steperx);
					} else if ($this.slideDirection === 'right') {
						goend = $this.start_x_right + $this.this_index * $this.steperx;
					}

					$($this.ever).stop(true, false).animate({
						'left': goend + 'px'
					}, {
						duration: $this.animateSpeed,
						complete: function() {
							$this.iconEvent($this.this_index);
							fns();
							$this.fn($this.this_index);
						}
					});

				}
			};
			// 鼠标松开或移出元素后的动画
			dragFn.prototype.animateEnd = function(e) {
				var $this = this;

				// if (!$this.o) {
				// var e_x = $this.mPostion(e)['x'];
				// $this.mPostion(e);
				var e_x = $this.end_x;
				var c_x;
				// if($this.slideDirection === 'left'){
				c_x = e_x - $this.s_x;
				// }else if($this.slideDirection === 'right'){
				//   c_x = e_x - $this.s_x;
				// }

				var e_y = $this.end_y;

				var c_y = e_y - $this.s_y;

				if ($this.oxy === 'x') {
					// if ($this.slideDirection === 'left') {
					if (Math.abs(c_x) > 100) {
						$this.currentIndex(c_x);
						$this.move(function() {
							// $this.setTimer();
						});
					} else {
						$($this.ever).stop(true, false).animate({
							'left': $this.start_x + 'px'
						}, {
							duration: $this.animateSpeed,
							complete: function() {
								// $this.iconEvent($this.this_index);
								// $this.setTimer();
								$this.fn($this.this_index);
							}
						});
					}
					// }else if($this.slideDirection === 'right'){

					// }

				}
				if ($this.oxy === 'y') {
					if (Math.abs(c_y) > 100) {
						$this.currentIndex(c_y);
						$this.move(function() {
							// $this.setTimer();
						});
					} else {

						$($this.ever).stop(true, false).animate({
							'top': $this.start_y + 'px'
						}, {
							duration: $this.animateSpeed,
							complete: function() {
								// $this.iconEvent($this.this_index);
								// $this.setTimer();
								$this.fn($this.this_index);
							}
						});

					}
				}

				// } else {
				//   var e_y = $this.mPostion(e)['y'];
				//   var c = e_y - $this.s_y;
				//   $this.currentIndex(c);
				//   if (Math.abs(c) > 10) {
				//     $($this.ever).animate({
				//       'top': -($this.this_index * $this.steper) + 'px'
				//     }, {
				//       duration: $this.animateSpeed,
				//       complete: function() {
				//         $this.iconEvent($this.this_index);
				//         $this.fn($this.this_index);
				//       }
				//     });
				//   } else {
				//     $($this.ever).animate({
				//       'top': $this.start_x + 'px'
				//     }, {
				//       duration: $this.animateSpeed
				//     });
				//   }
				// }
			};
			// 鼠标滚轮事件
			dragFn.prototype.scrollEvent = function(e) {
				var $this = this;
				if ($this.oxy === 'y' || $this.oxy === 'x') {
					$($this.ever).on('mousewheel', function(e) {
						if ($($this.ever).is(':animated')) {
							return false;
						}
						var dr = {
							x: e.deltaX,
							y: e.deltaY,
							d: e.deltaFactor
						};
						// $this.currentIndex(dr.y);
						if (dr.y > 0) {
							$this.this_index -= 1;
							// 	console.log('up');
						} else {
							// 	console.log('down');
							$this.this_index += 1;
						}
						$this.checkIndex();
						$this.move();
						return_false(e, true, false);
					});
				}
			};
			// // 设置定时器
			// dragFn.prototype.setTimer = function() {
			//   var $this = this;
			//   $this.autoTimer = setInterval(function() {
			//     $this.autoPlay();
			//   }, $this.timeSpeed);
			// };
			// // 清除定时器
			// dragFn.prototype.clearTimer = function() {
			//   clearInterval(this.autoTimer);
			// };
			// // 定时移动
			// dragFn.prototype.autoPlay = function() {
			//   var $this = this;
			//   $this.this_index += 1;
			//   if ($this.this_index > $this.ul_length - 1) {
			//     $this.this_index = 0;
			//   }
			//   $this.move();
			// };
			// 入口
			dragFn.prototype.begin = function() {
				this.init();
				this.createIcon();
				this.createIconEvent();
				this.createPrevNext();
				this.prevNextEvent();
				this.dragEvent();
				this.scrollEvent();
				// this.setTimer();
			};
		} // end if
	}

	$.fn.mdrag = function(option) {
		var options = $.extend(defaults, option);
		return this.each(function() {
			var x = new dragFn(this, options);
			x.begin();
		});
	};
})(jQuery);

// 判断是否是移动端
function isMobile() {
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i) ? true : false;
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i) ? true : false;
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i) ? true : false;
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
		}
	};
	return isMobile;
}

function setImg() {

	setLi();

	//  changeWH();
	sideBox();

	imgClick();
}

if (!isMobile().any()){
    setPCImg();
}else {
    $(".page img").show();
    setImg();
}

function setPCImg(){
    //检测设备是否为PC
    detectionDevice(function(){
        if (PCClient){
            //设置PC端List
            PCClient.setList();
            //初始化PC端幻灯
            PCClient.initPCSlide();
            //图片点击
            imgClick();
        }
    });
    /*//设置PC端List
    PCClient.setList();
    //初始化PC端幻灯
    PCClient.initPCSlide();
    //图片点击
    imgClick();*/
}

function detectionDevice(callback){
    if (!isMobile().any()){
        //在body上标记pc以应用PC端的样式
        $(document.body).addClass("pc");
        //添加滑动的动画
        $(document.head).append('<link rel="stylesheet" href="css/animation.css"/>')
        //请求PC端脚本
        $.ajax({
            url: "js/pc.js",
            type: "get",
            dataType: "text",
            success: function(data) {
                $(document.body).append("<script type='text/javascript'>" + data + "</script>");
                callback && callback();
            },
            error: function(xhr, message, ex){
                alert(ex.message);
            }
        });
    }
}

function setLi() {
	var w = $(window).width();
	var box = $('#box');
	var ul = box.children('ul');
	var li = ul.children('li');
	var i = 0;
	var l = li.length;
	for (; i < l; i++) {
		$(li[i]).width(w);
	}
	ul.width(w * l);
	// ul.css({left: -w * l + w + 'px'});
}

function sideBox() {
	var l = $('.slide li').length;

	if (l === 1) {
		return false;
	}

	initSideshow();
}

function initSideshow() {
    $('.slide ul').mdrag({
        o: 'x',
        speed: 3000,
        slideDirection: 'right',
        fn: function (i) {
            // console.log(i);

        }
    });
}

function hengshuping() {
	if (window.orientation == 180 || window.orientation == 0) {
		// alert("竖屏状态！")       
	}
	if (window.orientation == 90 || window.orientation == -90) {
		alert("课件不支持横屏模式，请您去微信首页设置['我'-->'设置'-->'通用'-->'开启横屏模式'] 将横屏模式关闭。");
	}
}
if (window.addEventListener){
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);
}
if (window.attachEvent){
    window.attachEvent("onorientationchange" in window ? "orientationchange" : "resize", hengshuping);
}

function imgClick() {
	$.ajax({
		url: "http://app.cjatech.com/WxAPI/api/JSSDK",
		data: {
			appid: "wx23d9b28d7d7d20c3",
			url: location.href
		},
		type: "get",
		cache: false,
		dataType: "jsonp",
		success: function(data) {
			if (data.ErrCode == 0) {
				var config = data.Payload;
				if (typeof(wx) === "undefined"){
                    return;
                }
                wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: config.appid, // 必填，公众号的唯一标识
                    timestamp: config.timestamp, // 必填，生成签名的时间戳
                    nonceStr: config.noncestr, // 必填，生成签名的随机串
                    signature: config.signature, // 必填，签名，见附录1
                    jsApiList: [
                        'checkJsApi',
                        'previewImage',
                        'getNetworkType',
                        'hideOptionMenu',
                        'showOptionMenu',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'closeWindow',
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function() {
                    $('img').on('touchend', function() {
                        console.log($(this).attr('src'));

                        wx.previewImage({
                            current: $(this).attr('src')
                        });
                    });


                    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                });
			}
		},
		error: function() {

		}
	}); 
}