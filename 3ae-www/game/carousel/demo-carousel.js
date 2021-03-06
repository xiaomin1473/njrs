log.info("log init");
/******************************************************************
**                                                               **
**                                                               **
**                      author: sid.tadpole                      **
**                      time:    2019.8.26                       **
**                      path:    NanJing                         **
**                                                               **
**                                                               **
******************************************************************/

/************************ LEARNING_TARGET *************************
** 
** 
**  
**    原型模式
** 
** 
*/

/** 
 *   改版需求
 *   1. 渐隐效果
 *   2. PC端和移动端
 *   3. 上下轮播
 */
var LoopImages = (function(){
    var carousel = function(container, imgArr) {
        var wrapper = document.createElement('div');
        wrapper.style.marginLeft = -container.clientWidth + "px";
        wrapper.style.transition = ".25s all ease-out";
        imgArr.push(imgArr[0]);
        imgArr.unshift(imgArr[imgArr.length-2]);
        imgArr.forEach(function(imgUrl){
            var img = document.createElement('img');
            img.src = imgUrl;
            img.width = container.clientWidth;
            img.height = container.clientHeight;
            wrapper.appendChild(img);
        })
        container.appendChild(wrapper);
    }
    var os = (function checkOS() {
        var _os = Object.create(null, {});
        var ua = navigator.userAgent;
        isWindowsPhone = /(?:Windows Phone)/.test(ua);
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
        isAndroid = /(?:Android)/.test(ua);
        isFireFox = /(?:Firefox)/.test(ua);
        isChrome = /(?:Chrome|CriOS)/.test(ua);
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua));
        isPhone = /(?:iPhone)/.test(ua) && !isTablet;  
        _os.isPc = !isPhone && !isAndroid && !isSymbian;
        _os.isTablet = isTablet;
        return _os;
    })();

    function _loopImages(imgArr, id, arrow) {
        this.container = document.getElementById(id);
        this.imagesArray = imgArr;      // 图片对象
        this.arrow = arrow;             // 箭头
        this.interval = null;           // 定时器
        this.curr = 1;                  // 当前图片
        this.operate = false;           // 操作保护
        this.os = os;                   // 当前系统
    }
    _loopImages.prototype = {
        createImage: function() {
            carousel(this.container, this.imagesArray);
        },
        changeImage: function() {
            log.info("loop changeImage function");
        },
    }
    return _loopImages;
})();

var SlideLoopImage = function(imgArr, container) {
    that = this;
    LoopImages.call(this, imgArr, container);
    // 继承父类的createImage()
    this.createImage.call(this);
    var wrapper = this.container.childNodes[0];
    wrapper.style.width = this.container.clientWidth * this.imagesArray.length + "px";
    wrapper.style.height = this.container.clientHeight;
    wrapper.childNodes.forEach(function(data) {
        data.style.float = "left";
    })
    // 添加动画
    this.animate();

    // 移动端
    if(!this.os.isPc) {
        // 添加触摸事件
        this.addTouch(wrapper);
        // 触摸保护
        (function() {
            var startX, startY, moveEndX, moveEndY, X, Y;
            document.addEventListener("touchstart", function(e) {
                startX = e.changedTouches[0].pageX,
                startY = e.changedTouches[0].pageY;
            });
            document.addEventListener("touchmove", function(e) {
                moveEndX = e.changedTouches[0].pageX,
                moveEndY = e.changedTouches[0].pageY,
                X = moveEndX - startX,
                Y = moveEndY - startY;　
                (Math.abs(X) > Math.abs(Y) && Math.abs(X) > 20) ? that.operate = true : null;
            });
            document.addEventListener("touchend", function() {
            });
        })();
    }
}
SlideLoopImage.prototype = new LoopImages();

SlideLoopImage.prototype.changeImage = function() {
    var wrapper = this.container.childNodes[0];
    if("pre" == arguments[0]) {
        // 判断临界值,并清除动画
        if (this.curr == 1) {
            this.curr = this.imagesArray.length - 1;
            if(wrapper.style.marginLeft == "-320px") {
                // 初始向左时，解决bug
                wrapper.style.marginLeft = -(this.container.clientWidth * this.curr) + 'px';
            } else {
                wrapper.style.marginLeft = -(this.container.clientWidth * (this.curr-1)) +
                (parseInt(wrapper.style.marginLeft.split('px')[0])) + 'px';
            }
            wrapper.style.transitionProperty="none";
        }
        // 根据当前节点位置curr来改变wrapper的margin-left，动画transiton实现
        wrapper.style.marginLeft = -(this.container.clientWidth * --this.curr) + 'px';
        // 添加动画
        wrapper.style.transitionProperty="all";
    } else if("next" == arguments[0]) {
        // 见pre
        if (this.curr == (this.imagesArray.length-2)) {
            wrapper.style.marginLeft = (parseInt(wrapper.style.marginLeft.split('px')[0]) + 
                                    (this.container.clientWidth * this.curr)) + 'px';
            this.curr = 0;
            wrapper.style.transitionProperty="none";
        }
        wrapper.style.marginLeft = -(this.container.clientWidth * ++this.curr) + 'px';
        wrapper.style.transitionProperty="all";
    } else {
        wrapper.style.marginLeft = -(this.container.clientWidth * this.curr) + 'px';
    }
}

SlideLoopImage.prototype.animate = function() {
    that = this;
    this.interval = setInterval(function(){
        that.changeImage('next');
    }, 3000);
}

SlideLoopImage.prototype.addTouch = function(wrapper) {
    var startX, startY, moveEndX, moveEndY, lastMoveX, lastMoveY, X, Y;
    that = this;
    wrapper.addEventListener("touchstart", function(e) {
        clearInterval(that.interval);
        startX = e.changedTouches[0].pageX,
        startY = e.changedTouches[0].pageY;
    });
    wrapper.addEventListener("touchmove", function(e) {
        moveEndX = e.changedTouches[0].pageX;
        moveEndY = e.changedTouches[0].pageY;
        X = moveEndX - lastMoveX;
        Y = moveEndY - lastMoveY;
        lastMoveX = moveEndX;
        lastMoveY = moveEndY;
        if(that.operate) {
            var mLeft = parseInt(wrapper.style.marginLeft.split('px')[0]) + Math.floor(X);
            wrapper.style.marginLeft = mLeft + 'px';
        }
        X = moveEndX - startX;
        Y = moveEndY - startY;
    });
    wrapper.addEventListener("touchend", function() {
        setTimeout(() => {
            if(that.operate) {
                if (Math.abs(X) > Math.abs(Y) && X > 0) {
                    // 前一张
                    Math.abs(X) > (that.container.clientWidth/3)? 
                        that.changeImage('pre') : that.changeImage();
                } else if (Math.abs(X) > Math.abs(Y) && X < 0 ) {
                    // 后一张
                    Math.abs(X) > (that.container.clientWidth/3)? 
                        that.changeImage('next') : that.changeImage();
                }
            }
            // 关闭操作
            that.operate = false;
        }, 0);
        that.animate();
    });
}

var FadeLoopImage = function(imgArr, container, arrow) {
    LoopImages.call(this, imgArr, container);
    this.arrow = arrow;
}

FadeLoopImage.prototype = new LoopImages();

FadeLoopImage.prototype.changeImage = function() {
    if("pre" == arguments[0]) {
        log.info("Pre image function");
    } else if("next" == arguments[0]) {
        log.info("Next image function");
    } else {
        log.info("no change function");
    }
}