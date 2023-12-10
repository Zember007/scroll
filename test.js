
var system=navigator.userAgent.toLowerCase();var delta;var stopScrolled=false;var speedScrollWindow;var inertiaScrollWindow;var speedScrollOther;var inertiaScrollOther;var smoothScroll_window;var smoothScroll_other;if(system.indexOf('windows')!=-1){speedScrollWindow=50;inertiaScrollWindow=30;speedScrollOther=50;inertiaScrollOther=30;}else{speedScrollWindow=10;inertiaScrollWindow=30;speedScrollOther=10;inertiaScrollOther=30;};function init(){smoothScroll_window=new SmoothScroll_window(document,speedScrollWindow,inertiaScrollWindow);document.querySelectorAll('.sm-scroll').forEach(element=>{smoothScroll_other=new SmoothScroll_other(element,speedScrollOther,inertiaScrollOther);});};function SmoothScroll_window(target,speed,smooth){if(target==document){target=document.scrollingElement||document.documentElement||document.body.parentNode||document.body;};let lastY,interval=false,moving=false,pos=target.scrollTop,frame=target===document.body&&document.documentElement?document.documentElement:target;target.addEventListener('wheel',scrolled,{passive:false});target.addEventListener('touchmove',scrolledTouch,{passive:false});target.addEventListener('touchstart',function(e){lastY=e.touches[0].pageY;},{passive:false});interval=false;initInterval();function setNewPositionAndMoving(e,delta){pos+=-delta*speed;pos=Math.max(0,Math.min(pos,target.scrollHeight-frame.clientHeight));if(!moving){update(e);};};function scrolled(e){function normalizeWheelDelta(e){if(e.detail){if(e.wheelDelta){return(e.wheelDelta/e.detail/40)*(e.detail>0?1:-1);};return -e.detail/3;};return e.wheelDelta/120;};e.preventDefault();setNewPositionAndMoving(e,normalizeWheelDelta(e));};function scrolledTouch(e){function getTouchDelta(e){const currentY=e.touches[0].pageY;const deltaY=currentY-lastY;lastY=currentY;return deltaY/2;};e.preventDefault();setNewPositionAndMoving(e,getTouchDelta(e));};function update(e){stopInterval();moving=true;delta=(pos-target.scrollTop)/smooth;if(Math.abs(delta)<1){delta=delta<0?-1:1;};if(stopScrolled==true){if((typeof(e)!='number')&&(e.target.className=='sm-scroll')){moving=true;let nextScroll=e.target.scrollTop+Math.round(delta);if(nextScroll<1){nextScroll=1;};if(nextScroll==e.target.scrollTopMax){nextScroll=e.target.scrollTopMax-1;};e.target.scrollTop=nextScroll;e.stopPropagation();};delta=0;moving=false;initInterval();return;};if((Math.abs(delta)>0)&&(Math.abs(pos-target.scrollTop)<2)){target.scrollTop=pos;moving=false;initInterval();return;};target.scrollTop+=Math.round(delta);requestFrame(update,e);};let oldY;function scrollTo(y){pos=y;oldY=y;if(!moving){requestFrame(update,0);};};let requestFrame=(function(){return(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(func,e){window.setTimeout(func,20);});})();












function initInterval(){
    if(interval!==false){
        return;
    };

    interval=setInterval(function(){
        if (pos!==target.scrollTop){
            pos=target.scrollTop;
        };
    },100);
};

function stopInterval(){
    clearInterval(interval);
    interval=false;
};


let smScroll=0;
document.body.onmouseover=function(ev){
    var elm=ev.target||ev.srcElement;
    if(elm.classList.contains('sm-scroll')){
        if(smScroll==0){
            stopScrolled=true;
            smScroll=1;
        };
    }else{
        if(smScroll==1){                
            stopScrolled=false;
            smScroll=0;
        };
    };
};

return{scrollTo};
};
        
        
        
        
        
        
        
        
        
        
        
        
        

function SmoothScroll_other(target, speed, smooth) {
let lastY,
    interval = false,
    moving = false,
    pos = target.scrollTop,
    frame = target === document.body && document.documentElement ? document.documentElement : target;

target.addEventListener('wheel', scrolled, { passive: false });
target.addEventListener('touchmove', scrolledTouch, { passive: false });
target.addEventListener('touchstart', function (e) { lastY = e.touches[0].pageY; }, { passive: false });

interval = false;
initInterval();

function setNewPositionAndMoving(e, delta) {
    pos += -delta * speed;
    pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight));
    if (!moving) {
        update(e);
    };
}

function scrolled(e) {
    function normalizeWheelDelta(e) {
        if (e.detail) {
            if (e.wheelDelta) {
                return (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1);
            }
            return -e.detail / 3;
        }
        return e.wheelDelta / 120;
    };

    e.preventDefault();
    setNewPositionAndMoving(e, normalizeWheelDelta(e));
};

function scrolledTouch(e) {
    function getTouchDelta(e) {
        const currentY = e.touches[0].pageY;
        const deltaY = currentY - lastY;
        lastY = currentY;
        return deltaY / 2;
    };

    e.preventDefault();
    setNewPositionAndMoving(e, getTouchDelta(e));
};


function update(e) {
    stopInterval();

    moving = true;
    delta = (pos - target.scrollTop) / smooth;

    if (Math.abs(delta) < 1) {
        delta = delta < 0 ? -1 : 1;
    };           

    if (Math.abs(delta) > 0 && Math.abs(pos - target.scrollTop) < 2) {
        target.scrollTop = pos;
        moving = false;
        initInterval();
        return;
    };

    target.scrollTop += Math.round(delta);
    requestFrame(update, e);
};

function scrollTo(y) {
    pos = y;
    if (!moving) {
        requestFrame(update, 0);
    };
};

let requestFrame = (function () {
    return (window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (func, e) {
            window.setTimeout(func, 20);
        });
})();

function initInterval() {
    if (interval !== false){
        return;
    };

    interval = setInterval(function () {
        if (pos !== target.scrollTop) {
            pos = target.scrollTop;
        };
    }, 100);
};

function stopInterval() {
    clearInterval(interval);
    interval = false;
};

return { scrollTo };
};
window.addEventListener('DOMContentLoaded',init);
var keys={37:1,38:1,39:1,40:1};
function preventDefault(e){
e.preventDefault();
};
function preventDefaultForScrollKeys(e){
if(keys[e.keyCode]){
    preventDefault(e);
    return false;
};
};
var supportsPassive=false;
try{
window.addEventListener('preload',null,Object.defineProperty({},'passive',{get:function(){supportsPassive=true;}}));
}catch(e){};
var wheelOpt=supportsPassive?{passive:false}:false;
var wheelEvent='onwheel' in document.createElement('div')?'wheel':'mousewheel';
function disableScroll(){
window.addEventListener('DOMMouseScroll',preventDefault,false);
window.addEventListener(wheelEvent,preventDefault,wheelOpt);
window.addEventListener('touchmove',preventDefault,wheelOpt);
window.addEventListener('keydown',preventDefaultForScrollKeys,false);
stopScrolled=true;
};
function enableScroll(){
window.removeEventListener('DOMMouseScroll',preventDefault,false);
window.removeEventListener(wheelEvent,preventDefault,wheelOpt);
window.removeEventListener('touchmove',preventDefault,wheelOpt);
window.removeEventListener('keydown',preventDefaultForScrollKeys,false);
stopScrolled=false;
};
        
        enableScroll();

        
        
        
        var fN = 'Генерация чисел от ';
var sN = '\x52\x61\x6e\x64\x6f\x6d\x4d\x2e\x72\x75';
var timed;
var dateTimed;
var hTimed;
var mTimed;
var sTimed;

function rSN(dD1, b, a) {
    return dD1.substring(b + (-~[]), dD1.length - (a + 1 ^ 5 ^ '\x35'));
};

function eSN(dD2, b, a) {
    return dD2.substring(b + (-~[]), dD2.length - (a + 1 ^ '\x33' ^ 3));
};

function cSN(dD2, b, a) {
    return dD2.substring(b + (-~[]), dD2.length - (a + 1 ^ '\x39' ^ 9));
};

function pSN(dD2, b, a) {
    return dD2.substring(b + (-~[]), dD2.length - (a + 1 ^ '\x39' ^ 9));
};

function getMainDate() {
    timed = document.getElementById('date-time').textContent;
    dateTimed = timed.substring(0, 11);
    dateTimed = dateTimed.substring(0, 6) + dateTimed.substring(dateTimed.length - 3);
    hTimed = timed.substring(11, 13);
    mTimed = timed.substring(14, 16);
    sTimed = timed.substring(17, 19);
};

let jqueryLibrary = document.createElement('script');
jqueryLibrary.src = '/assets/jquery.min.js';
document.head.appendChild(jqueryLibrary);
setTimeout(function() {
    let scriptLibrary = document.createElement('script');
    scriptLibrary.src = '/assets/number.min.js';
    document.head.appendChild(scriptLibrary);
}, 500);
let noticeEl = document.getElementById('notice');
let backgroundEl = document.getElementById('background');
let errorEl = document.getElementById('error');
let bluredEl = document.getElementById('blured');
noticeEl.style.height = screenH + 1 + 'px';
backgroundEl.style.height = screenH + 1 + 'px';
errorEl.style.height = screenH + 1 + 'px';
bluredEl.style.height = screenH + 1 + 'px';
        

    