var PCClient = (function(){

    var isIE8 = /ie\s*(8|9)/i.test(window.navigator.userAgent);

    function initPCSlide(animationDuration){
        if (isIE8){
            alert("为了更好的浏览课件，请升级您的浏览器到最新版本。");
        }
        bindMouseWheel();
    }

    function onMouseWheelHandler(e){
        var animationDuration = 1000;
        var e = e || window.event;
        var dr = {
            x: e.deltaX,
            y: e.deltaY,
            d: e.deltaFactor
        };
        if (dr.y > 0) {
            //console.log('up');
            slideDown(animationDuration)
        } else if (dr.y < 0) {
            //console.log('down');
            slideUp(animationDuration)
        }
    }

    function slide(direction, animationDuration){
        var enteringClass = "entering-" + direction, exitingClass = "exiting-" + direction;
        var cssDuration = animationDuration + "ms";
        var $current = $(".page .current"), $next = direction === "down" ? $current.prev() : $current.next();

        if ($next.length == 0) {
            bindMouseWheel();
            return;
        }

        setAnimationDuration([$current, $next], animationDuration);

        $current.addClass(exitingClass);
        $next.addClass(enteringClass);

        setTimeout(function(){

            $current.removeClass("current").removeClass(exitingClass);
            $next.removeClass(enteringClass).addClass("current");

            bindMouseWheel();
        }, animationDuration)

        function setAnimationDuration(elements, animationDuration){
            var durationAttr = ["-webkit-animation-duration", "-moz-animation-duration", "-ms-animation-duration", "animation-duration"];
            durationAttr.forEach(function(attr){
                elements.forEach(function(el){
                    $(el).css(attr, animationDuration);
                })
            })
        }
    }

    function bindMouseWheel(){
        $(document.body).one("mousewheel", onMouseWheelHandler)
    }

    function slideUp(animationDuration){
        if (isIE8){
            compatible.slideUp();
        }else{
            slide("up", animationDuration)
        }
    }

    function slideDown(animationDuration){
        if (isIE8){
            compatible.slideDown();
        }else{
            slide("down", animationDuration)
        }
    }

    var compatible = (function(){

        var slideUp = function(){
            var $current = $(".current"), $next = $current.next();
            if ($next.length == 0){
                bindMouseWheel();
                return;
            }
            $current.animate({
                top: "-100%"
            },{
                duration: 1000,
                complete: function(){
                    $current.css("top", "0");
                    $current.removeClass("current");
                    $next.addClass("current");
                    bindMouseWheel();
                }
            })
        }

        var slideDown = function(){
            var $current = $(".current"), $prev = $current.prev();
            if ($prev.length == 0){
                bindMouseWheel();
                return;
            }
            $(".current").animate({
                top: "100%"
            },{
                duration: 1000,
                complete: function(){
                    $current.css("top", "0");
                    $current.removeClass("current");
                    $prev.addClass("current");
                    bindMouseWheel();
                }
            })
        }

        return {
            slideUp: slideUp,
            slideDown: slideDown
        }

    })()

    function setList(){
        var box = $('#box');
        var ul = box.children('ul');
        var list = ul.children('li');
        var width = document.documentElement.clientWidth;
        var height = document.documentElement.clientHeight;
        if (isIE8){
            list.each(function(idx, li){
                var $li = $(li), $img = $li.find("img");
                $img.css("width", height).css("height", width).css("position", "relative");
                $li.css("position", "absolute");
            })
        }else{
            if ($("#page-size").length == 0){
                $(document.head).append('<style id="page-size">.page li img{width:'+height+'px; height:'+width+'px;}</style>')
            }
        }
        if (!isIE8){
            ul.find("img").css("display", "block")
        }
    }

    return{
        setList: setList,
        initPCSlide: initPCSlide
    }
})()