document.addEventListener('DOMContentLoaded', () => {
   let animItems = document.querySelectorAll('._anim-items')

if (animItems.length > 0) {
   window.addEventListener('scroll', animOnScroll)
   function animOnScroll(params) {
      for (let index = 0; index < animItems.length; index++) {
         const animItem = animItems[index]
         const animItemHeight = animItem.offsetHeight
         const animItemOffset = offset(animItem).top
         let animStart = 4
         if (animItem.classList.contains('_anim-all')) animStart = 1
         if (animItem.classList.contains('_anim-half')) animStart = 2
			if (animItem.classList.contains('_anim-custom')) animStart = +animItem.dataset.anim

         let animItemPoint = window.innerHeight - animItemHeight / animStart

         if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart
         }

         if (
            pageYOffset > animItemOffset - animItemPoint &&
            pageYOffset < animItemOffset + animItemHeight
         ) {
            animItem.classList.add('_in-sight')
         } else {
            if (animItem.classList.contains('_anim-hide')) {
               animItem.classList.remove('_in-sight')
            }
         }
      }
   }
   function offset(el) {
      const rect = el.getBoundingClientRect(),
         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
         scrollTop = window.pageYOffset || document.documentElement.scrollTop
      return {
         top: rect.top + scrollTop,
         left: rect.left + scrollLeft,
      }
   }
   setTimeout(function () {
      animOnScroll()
   }, 500)
}

;(() => {
   window.addEventListener('scroll', () => {
		let header = document.querySelector('.header');
		if(window.scrollY > 50) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	})
})()

$(document).ready(function () {
   $('.goto').click(function () {
      var el = $(this).attr('href').replace('#', '')
      var offset = 0
      $('body,html').animate(
         {
            scrollTop: $('.' + el).offset().top + offset - $('header').height(),
         },
         700,
         function () {},
      )

      if ($('.menu__body').hasClass('active')) {
         $('.menu__body,.icon-menu').removeClass('active')
			$('body').removeClass('lock')
			$('.header__logo').removeClass('active')
      }
      return false
   })
})

;(() => {
   let iconsMenu = document.querySelectorAll('.icon-menu')
   let menuBody = document.querySelector('.menu__body')
   let body = document.querySelector('body')
   let headerLogo = document.querySelector('.header__logo')
   if (iconsMenu.length > 0) {
      iconsMenu.forEach(burger => {
         burger.addEventListener('click', function () {
            if (menuBody.classList.contains('active')) {
               iconsMenu.forEach(icon => {
                  icon.classList.remove('active')
               })
               body.classList.remove('lock')
               menuBody.classList.remove('active')
               headerLogo.classList.remove('active')
            } else {
					iconsMenu.forEach(icon => {
                  icon.classList.add('active')
               })
               body.classList.add('lock')
               menuBody.classList.add('active')
               headerLogo.classList.add('active')
				}
         })
      })
   }
})()

$('.pl').click(function (event) {
   var pl = $(this).attr('href').replace('#', '')
   popupOpen(pl)
   return false
})
function popupOpen(pl) {
   $('.popup').removeClass('active').hide()
   setTimeout(function () {
      $('body').addClass('lock')
   }, 300)

   history.pushState('', '', '#' + pl)
   $('.popup-' + pl)
      .fadeIn(300)
      .delay(300)
      .addClass('active')

   if ($('.popup-' + pl).find('.slick-slider').length > 0) {
      $('.popup-' + pl)
         .find('.slick-slider')
         .slick('setPosition')
   }
}
function popupClose() {
   $('.popup').removeClass('active').fadeOut(300)
   if (!$('.menu__body').hasClass('active')) {
      $('body').removeClass('lock')
   }
   history.pushState('', '', window.location.href.split('#')[0])
}
$('.popup-close,.popup__close').click(function (event) {
   popupClose()
   return false
})
$('.popup').click(function (e) {
   if (
      !$(e.target).is('.popup>.popup__container *') ||
      $(e.target).is('.popup-close') ||
      $(e.target).is('.popup__close')
   ) {
      popupClose()
      return false
   }
})
$(document).on('keydown', function (e) {
   if (e.which == 27) {
      popupClose()
   }
})
$(window).scroll(function () {
   if ($(window).scrollTop() + $(window).height() == $(document).height()) {
      popupOpen('offer')
   }
})

function calcRevenue(scNumber, revenuePerSc) {
   if (!scNumber) {
      scNumber = +document.querySelector('._sc-number').textContent
   }
   if (!revenuePerSc) {
      revenuePerSc = +document.querySelector('._revenue-per-sc').textContent
   }

   return (scNumber * revenuePerSc * 30).toFixed()
}

function calcCosts(scNumber, revenue = calcRevenue()) {
   if (!scNumber) {
      scNumber = +document.querySelector('._sc-number').textContent
   }

   const costPerScooter = 1781
   const varCosts = scNumber * costPerScooter

   const fixedCosts = 222000

   let royalty
   if ((revenue / scNumber) * 0.15 > 700) {
      royalty = revenue * 0.15
   } else {
      royalty = 700 * scNumber
   }

   const costs = varCosts + fixedCosts + royalty

   return costs.toFixed()
}

function calcProfit(revenue = calcRevenue(), costs = calcCosts()) {
   return (revenue - costs).toFixed()
}

function calcPayback(scNumber, profit = calcProfit()) {
   if (!scNumber) {
      scNumber = +document.querySelector('._sc-number').textContent
   }
   let payback

   if (profit > 0) {
      const scPrice = 53000 * scNumber
      const startupCosts = 90000

      payback = ((scPrice + startupCosts) / profit).toFixed()
   } else {
      payback = 'нет'
   }

   return payback
}

function changeInfo() {
   const costsBlock = document.querySelector('.calc__res_costs span')
   const paybackBlock = document.querySelector('.calc__res_payback span')
   const profitBlock = document.querySelector('.calc__sum span')

   const scNumber = +document.querySelector('._sc-number').textContent
   const revenuePerSc = +document.querySelector('._revenue-per-sc').textContent

   const revenue = calcRevenue(scNumber, revenuePerSc)
   const costs = calcCosts(scNumber, revenue)
   const profit = calcProfit(revenue, costs)
   const payback = calcPayback(scNumber, profit)

   costsBlock.textContent = `${costs}`
   paybackBlock.textContent = `${payback}`
   profitBlock.textContent = `${profit} руб / мес`
}
changeInfo()

!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("rangeSlider",[],e):"object"==typeof exports?exports.rangeSlider=e():t.rangeSlider=e()}(window,function(){return function(i){var n={};function s(t){if(n[t])return n[t].exports;var e=n[t]={i:t,l:!1,exports:{}};return i[t].call(e.exports,e,e.exports,s),e.l=!0,e.exports}return s.m=i,s.c=n,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(i,n,function(t){return e[t]}.bind(null,n));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=1)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.uuid=function(){var t=function(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)};return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()},e.delay=function(t,e){for(var i=arguments.length,n=Array(2<i?i-2:0),s=2;s<i;s++)n[s-2]=arguments[s];return setTimeout(function(){return t.apply(null,n)},e)},e.debounce=function(n){var s=1<arguments.length&&void 0!==arguments[1]?arguments[1]:100;return function(){for(var t=arguments.length,e=Array(t),i=0;i<t;i++)e[i]=arguments[i];return n.debouncing||(n.lastReturnVal=n.apply(window,e),n.debouncing=!0),clearTimeout(n.debounceTimeout),n.debounceTimeout=setTimeout(function(){n.debouncing=!1},s),n.lastReturnVal}};var n=e.isString=function(t){return t===""+t},r=(e.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)},e.isNumberLike=function(t){return null!=t&&(n(t)&&isFinite(parseFloat(t))||isFinite(t))});e.getFirsNumberLike=function(){for(var t=arguments.length,e=Array(t),i=0;i<t;i++)e[i]=arguments[i];if(!e.length)return null;for(var n=0,s=e.length;n<s;n++)if(r(e[n]))return e[n];return null},e.isObject=function(t){return"[object Object]"===Object.prototype.toString.call(t)},e.simpleExtend=function(t,e){var i={};for(var n in t)i[n]=t[n];for(var s in e)i[s]=e[s];return i},e.between=function(t,e,i){return t<e?e:i<t?i:t}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}}(),l=s(i(2)),h=s(i(0));function s(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e}i(3);var o=new RegExp("/[\\n\\t]/","g"),u="rangeSlider",d=l.supportsRange(),f={polyfill:!0,root:document,rangeClass:"rangeSlider",disabledClass:"rangeSlider--disabled",fillClass:"rangeSlider__fill",bufferClass:"rangeSlider__buffer",handleClass:"rangeSlider__handle",startEvent:["mousedown","touchstart","pointerdown"],moveEvent:["mousemove","touchmove","pointermove"],endEvent:["mouseup","touchend","pointerup"],min:null,max:null,step:null,value:null,buffer:null,stick:null,borderRadius:10,vertical:!1},r=!1,a=function(){function a(t,e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a);var i=void 0,n=void 0,s=void 0;if(a.instances.push(this),this.element=t,this.options=h.simpleExtend(f,e),this.polyfill=this.options.polyfill,this.vertical=this.options.vertical,this.onInit=this.options.onInit,this.onSlide=this.options.onSlide,this.onSlideStart=this.options.onSlideStart,this.onSlideEnd=this.options.onSlideEnd,this.onSlideEventsCount=-1,this.isInteractsNow=!1,this.needTriggerEvents=!1,this._addVerticalSlideScrollFix(),this.polyfill||!d){this.options.buffer=this.options.buffer||parseFloat(this.element.getAttribute("data-buffer")),this.identifier="js-"+u+"-"+h.uuid(),this.min=h.getFirsNumberLike(this.options.min,parseFloat(this.element.getAttribute("min")),0),this.max=h.getFirsNumberLike(this.options.max,parseFloat(this.element.getAttribute("max")),100),this.value=h.getFirsNumberLike(this.options.value,this.element.value,parseFloat(this.element.value||this.min+(this.max-this.min)/2)),this.step=h.getFirsNumberLike(this.options.step,parseFloat(this.element.getAttribute("step"))||(i=1)),this.percent=null,h.isArray(this.options.stick)&&1<=this.options.stick.length?this.stick=this.options.stick:(n=this.element.getAttribute("stick"))&&1<=(s=n.split(" ")).length&&(this.stick=s.map(parseFloat)),this.stick&&1===this.stick.length&&this.stick.push(1.5*this.step),this._updatePercentFromValue(),this.toFixed=this._toFixed(this.step);var r=void 0;this.container=document.createElement("div"),l.addClass(this.container,this.options.fillClass),r=this.vertical?this.options.fillClass+"__vertical":this.options.fillClass+"__horizontal",l.addClass(this.container,r),this.handle=document.createElement("div"),l.addClass(this.handle,this.options.handleClass),r=this.vertical?this.options.handleClass+"__vertical":this.options.handleClass+"__horizontal",l.addClass(this.handle,r),this.range=document.createElement("div"),l.addClass(this.range,this.options.rangeClass),this.range.id=this.identifier;var o=t.getAttribute("title");o&&0<o.length&&this.range.setAttribute("title",o),this.options.bufferClass&&(this.buffer=document.createElement("div"),l.addClass(this.buffer,this.options.bufferClass),this.range.appendChild(this.buffer),r=this.vertical?this.options.bufferClass+"__vertical":this.options.bufferClass+"__horizontal",l.addClass(this.buffer,r)),this.range.appendChild(this.container),this.range.appendChild(this.handle),r=this.vertical?this.options.rangeClass+"__vertical":this.options.rangeClass+"__horizontal",l.addClass(this.range,r),h.isNumberLike(this.options.value)&&(this._setValue(this.options.value,!0),this.element.value=this.options.value),h.isNumberLike(this.options.buffer)&&this.element.setAttribute("data-buffer",this.options.buffer),h.isNumberLike(this.options.min)&&this.element.setAttribute("min",""+this.min),h.isNumberLike(this.options.max),this.element.setAttribute("max",""+this.max),(h.isNumberLike(this.options.step)||i)&&this.element.setAttribute("step",""+this.step),l.insertAfter(this.element,this.range),l.setCss(this.element,{position:"absolute",width:"1px",height:"1px",overflow:"hidden",opacity:"0"}),this._handleDown=this._handleDown.bind(this),this._handleMove=this._handleMove.bind(this),this._handleEnd=this._handleEnd.bind(this),this._startEventListener=this._startEventListener.bind(this),this._changeEventListener=this._changeEventListener.bind(this),this._handleResize=this._handleResize.bind(this),this._init(),window.addEventListener("resize",this._handleResize,!1),l.addEventListeners(this.options.root,this.options.startEvent,this._startEventListener),this.element.addEventListener("change",this._changeEventListener,!1)}}return n(a,[{key:"update",value:function(t,e){return e&&(this.needTriggerEvents=!0),h.isObject(t)&&(h.isNumberLike(t.min)&&(this.element.setAttribute("min",""+t.min),this.min=t.min),h.isNumberLike(t.max)&&(this.element.setAttribute("max",""+t.max),this.max=t.max),h.isNumberLike(t.step)&&(this.element.setAttribute("step",""+t.step),this.step=t.step,this.toFixed=this._toFixed(t.step)),h.isNumberLike(t.buffer)&&this._setBufferPosition(t.buffer),h.isNumberLike(t.value)&&this._setValue(t.value)),this._update(),this.onSlideEventsCount=0,this.needTriggerEvents=!1,this}},{key:"destroy",value:function(){var e=this;l.removeAllListenersFromEl(this,this.options.root),window.removeEventListener("resize",this._handleResize,!1),this.element.removeEventListener("change",this._changeEventListener,!1),this.element.style.cssText="",delete this.element[u],this.range&&this.range.parentNode.removeChild(this.range),(a.instances=a.instances.filter(function(t){return t!==e})).some(function(t){return t.vertical})||this._removeVerticalSlideScrollFix()}},{key:"_toFixed",value:function(t){return(t+"").replace(".","").length-1}},{key:"_init",value:function(){this.onInit&&"function"==typeof this.onInit&&this.onInit(),this._update(!1)}},{key:"_updatePercentFromValue",value:function(){this.percent=(this.value-this.min)/(this.max-this.min)}},{key:"_startEventListener",value:function(t,e){var i=this,n=t.target,s=!1;(1===t.which||"touches"in t)&&(l.forEachAncestors(n,function(t){return s=t.id===i.identifier&&!l.hasClass(t,i.options.disabledClass)},!0),s&&this._handleDown(t,e))}},{key:"_changeEventListener",value:function(t,e){if(!e||e.origin!==this.identifier){var i=t.target.value,n=this._getPositionFromValue(i);this._setPosition(n)}}},{key:"_update",value:function(t){var e=this.vertical?"offsetHeight":"offsetWidth";this.handleSize=l.getDimension(this.handle,e),this.rangeSize=l.getDimension(this.range,e),this.maxHandleX=this.rangeSize-this.handleSize,this.grabX=this.handleSize/2,this.position=this._getPositionFromValue(this.value),this.element.disabled?l.addClass(this.range,this.options.disabledClass):l.removeClass(this.range,this.options.disabledClass),this._setPosition(this.position),this.options.bufferClass&&this.options.buffer&&this._setBufferPosition(this.options.buffer),this._updatePercentFromValue(),!1!==t&&l.triggerEvent(this.element,"change",{origin:this.identifier})}},{key:"_addVerticalSlideScrollFix",value:function(){this.vertical&&!r&&(document.addEventListener("touchmove",a._touchMoveScrollHandler,{passive:!1}),r=!0)}},{key:"_removeVerticalSlideScrollFix",value:function(){document.removeEventListener("touchmove",a._touchMoveScrollHandler),r=!1}},{key:"_handleResize",value:function(){var t=this;return h.debounce(function(){h.delay(function(){t._update()},300)},50)()}},{key:"_handleDown",value:function(t){if(this.isInteractsNow=!0,t.preventDefault(),l.addEventListeners(this.options.root,this.options.moveEvent,this._handleMove),l.addEventListeners(this.options.root,this.options.endEvent,this._handleEnd),!(-1<(" "+t.target.className+" ").replace(o," ").indexOf(this.options.handleClass))){var e=this.range.getBoundingClientRect(),i=this._getRelativePosition(t),n=this.vertical?e.bottom:e.left,s=this._getPositionFromNode(this.handle)-n,r=i-this.grabX;this._setPosition(r),s<=i&&i<s+2*this.options.borderRadius&&(this.grabX=i-s),this._updatePercentFromValue()}}},{key:"_handleMove",value:function(t){var e=this._getRelativePosition(t);this.isInteractsNow=!0,t.preventDefault(),this._setPosition(e-this.grabX)}},{key:"_handleEnd",value:function(t){t.preventDefault(),l.removeEventListeners(this.options.root,this.options.moveEvent,this._handleMove),l.removeEventListeners(this.options.root,this.options.endEvent,this._handleEnd),l.triggerEvent(this.element,"change",{origin:this.identifier}),(this.isInteractsNow||this.needTriggerEvents)&&(this.onSlideEnd&&"function"==typeof this.onSlideEnd&&this.onSlideEnd(this.value,this.percent,this.position),this.vertical&&(a.slidingVertically=!1)),this.onSlideEventsCount=0,this.isInteractsNow=!1}},{key:"_setPosition",value:function(t){var e,i=void 0,n=void 0,s=void 0,r=this._getValueFromPosition(h.between(t,0,this.maxHandleX));this.stick&&((n=r%(s=this.stick[0]))<(i=this.stick[1]||.1)?r-=n:Math.abs(s-n)<i&&(r=r-n+s)),e=this._getPositionFromValue(r),this.vertical?(this.container.style.height=e+this.grabX+"px",this.handle.style.webkitTransform="translateY(-"+e+"px)",this.handle.style.msTransform="translateY(-"+e+"px)",this.handle.style.transform="translateY(-"+e+"px)"):(this.container.style.width=e+this.grabX+"px",this.handle.style.webkitTransform="translateX("+e+"px)",this.handle.style.msTransform="translateX("+e+"px)",this.handle.style.transform="translateX("+e+"px)"),this._setValue(r),this.position=e,this.value=r,this._updatePercentFromValue(),(this.isInteractsNow||this.needTriggerEvents)&&(this.onSlideStart&&"function"==typeof this.onSlideStart&&0===this.onSlideEventsCount&&this.onSlideStart(this.value,this.percent,this.position),this.onSlide&&"function"==typeof this.onSlide&&this.onSlide(this.value,this.percent,this.position),this.vertical&&(a.slidingVertically=!0)),this.onSlideEventsCount++}},{key:"_setBufferPosition",value:function(t){var e=!0;if(isFinite(t))t=parseFloat(t);else{if(!h.isString(t))return void console.warn("New position must be XXpx or XX%");0<t.indexOf("px")&&(e=!1),t=parseFloat(t)}if(isNaN(t))console.warn("New position is NaN");else if(this.options.bufferClass){var i=e?t:t/this.rangeSize*100;i<0&&(i=0),100<i&&(i=100),this.options.buffer=i;var n=this.options.borderRadius/this.rangeSize*100,s=i-n;s<0&&(s=0),this.vertical?(this.buffer.style.height=s+"%",this.buffer.style.bottom=.5*n+"%"):(this.buffer.style.width=s+"%",this.buffer.style.left=.5*n+"%"),this.element.setAttribute("data-buffer",i)}else console.warn("You disabled buffer, it's className is empty")}},{key:"_getPositionFromNode",value:function(t){for(var e=this.vertical?this.maxHandleX:0;null!==t;)e+=this.vertical?t.offsetTop:t.offsetLeft,t=t.offsetParent;return e}},{key:"_getRelativePosition",value:function(t){var e=this.range.getBoundingClientRect(),i=this.vertical?e.bottom:e.left,n=0,s=this.vertical?"pageY":"pageX";return void 0!==t[s]?n=t.touches&&t.touches.length?t.touches[0][s]:t[s]:void 0!==t.originalEvent?void 0!==t.originalEvent[s]?n=t.originalEvent[s]:t.originalEvent.touches&&t.originalEvent.touches[0]&&void 0!==t.originalEvent.touches[0][s]&&(n=t.originalEvent.touches[0][s]):t.touches&&t.touches[0]&&void 0!==t.touches[0][s]?n=t.touches[0][s]:!t.currentPoint||void 0===t.currentPoint.x&&void 0===t.currentPoint.y||(n=this.vertical?t.currentPoint.y:t.currentPoint.x),this.vertical&&(n-=window.pageYOffset),this.vertical?i-n:n-i}},{key:"_getPositionFromValue",value:function(t){var e=(t-this.min)/(this.max-this.min)*this.maxHandleX;return isNaN(e)?0:e}},{key:"_getValueFromPosition",value:function(t){var e=t/(this.maxHandleX||1),i=this.step*Math.round(e*(this.max-this.min)/this.step)+this.min;return Number(i.toFixed(this.toFixed))}},{key:"_setValue",value:function(t,e){(t!==this.value||e)&&(this.element.value=t,this.value=t,l.triggerEvent(this.element,"input",{origin:this.identifier}))}}],[{key:"create",value:function(t,i){var e=function(t){var e=t[u];e||(e=new a(t,i),t[u]=e)};t.length?Array.prototype.slice.call(t).forEach(function(t){e(t)}):e(t)}},{key:"_touchMoveScrollHandler",value:function(t){a.slidingVertically&&t.preventDefault()}}]),a}();(e.default=a).version="0.4.11",a.dom=l,a.functions=h,a.instances=[],a.slidingVertically=!1,t.exports=e.default},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.supportsRange=e.removeAllListenersFromEl=e.removeEventListeners=e.addEventListeners=e.insertAfter=e.triggerEvent=e.forEachAncestors=e.removeClass=e.addClass=e.hasClass=e.setCss=e.getDimension=e.getHiddenParentNodes=e.isHidden=e.detectIE=void 0;var s=function(t){{if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e}}(i(0));var r="eventListenerList",n=(e.detectIE=function(){var t=window.navigator.userAgent,e=t.indexOf("MSIE ");if(0<e)return parseInt(t.substring(e+5,t.indexOf(".",e)),10);if(0<t.indexOf("Trident/")){var i=t.indexOf("rv:");return parseInt(t.substring(i+3,t.indexOf(".",i)),10)}var n=t.indexOf("Edge/");return 0<n&&parseInt(t.substring(n+5,t.indexOf(".",n)),10)})(),o=!(!window.PointerEvent||n)&&{passive:!1},a=e.isHidden=function(t){return 0===t.offsetWidth||0===t.offsetHeight||!1===t.open},h=e.getHiddenParentNodes=function(t){for(var e=[],i=t.parentNode;i&&a(i);)e.push(i),i=i.parentNode;return e},l=(e.getDimension=function(t,e){var i=h(t),n=i.length,s=[],r=t[e],o=function(t){void 0!==t.open&&(t.open=!t.open)};if(n){for(var a=0;a<n;a++)s.push({display:i[a].style.display,height:i[a].style.height,overflow:i[a].style.overflow,visibility:i[a].style.visibility}),i[a].style.display="block",i[a].style.height="0",i[a].style.overflow="hidden",i[a].style.visibility="hidden",o(i[a]);r=t[e];for(var l=0;l<n;l++)o(i[l]),i[l].style.display=s[l].display,i[l].style.height=s[l].height,i[l].style.overflow=s[l].overflow,i[l].style.visibility=s[l].visibility}return r},e.setCss=function(t,e){for(var i in e)t.style[i]=e[i];return t.style},e.hasClass=function(t,e){return new RegExp(" "+e+" ").test(" "+t.className+" ")});e.addClass=function(t,e){l(t,e)||(t.className+=" "+e)},e.removeClass=function(t,e){var i=" "+t.className.replace(/[\t\r\n]/g," ")+" ";if(l(t,e)){for(;0<=i.indexOf(" "+e+" ");)i=i.replace(" "+e+" "," ");t.className=i.replace(/^\s+|\s+$/g,"")}},e.forEachAncestors=function(t,e,i){for(i&&e(t);t.parentNode&&!e(t);)t=t.parentNode;return t},e.triggerEvent=function(t,e,i){if(!s.isString(e))throw new TypeError("event name must be String");if(!(t instanceof HTMLElement))throw new TypeError("element must be HTMLElement");e=e.trim();var n=document.createEvent("CustomEvent");n.initCustomEvent(e,!1,!1,i),t.dispatchEvent(n)},e.insertAfter=function(t,e){return t.parentNode.insertBefore(e,t.nextSibling)},e.addEventListeners=function(e,t,i){t.forEach(function(t){e[r]||(e[r]={}),e[r][t]||(e[r][t]=[]),e.addEventListener(t,i,o),e[r][t].indexOf(i)<0&&e[r][t].push(i)})},e.removeEventListeners=function(i,t,n){t.forEach(function(t){var e=void 0;i.removeEventListener(t,n,!1),i[r]&&i[r][t]&&-1<(e=i[r][t].indexOf(n))&&i[r][t].splice(e,1)})},e.removeAllListenersFromEl=function(e,t){if(t[r]){for(var i in t[r])t[r][i].forEach(n,{eventName:i,el:t});t[r]={}}function n(t){t===e._startEventListener&&this.el.removeEventListener(this.eventName,t,!1)}},e.supportsRange=function(){var t=document.createElement("input");return t.setAttribute("type","range"),"text"!==t.type}},function(t,e,i){}])});
//# sourceMappingURL=range-slider.min.js.map
const instance = (input, value, min = 100, max = 700) => ({
   polyfill: true, // Boolean, if true, custom markup will be created
   rangeClass: 'rangeSlider',
   fillClass: 'rangeSlider__fill',
   handleClass: 'rangeSlider__handle',
   min,
   max,
   step: 1,
   value,
   borderRadius: 25,
   onSlide: value => onSlide(value, input),
})
const onSlide = (value, input) => {
   const blockWithCurrent = input
      .closest('.calc__range')
      .querySelector('.calc__current')
   blockWithCurrent.textContent = value
	changeInfo()
}

const scootersNumberInput = document.querySelector('#scootersNumber')
rangeSlider.create(scootersNumberInput, instance(scootersNumberInput, 400))

const revenuePerScooterInput = document.querySelector('#revenuePerScooter')
rangeSlider.create(revenuePerScooterInput, instance(revenuePerScooterInput, 450, 200))

$(document).ready(function () {
   $('select').select2({
      minimumResultsForSearch: -1,
   })
   $('select').on('select2:opening', function (e) {
      this.closest('.form__input_select').classList.add('active')
   })
   $('select').on('select2:closing', function (e) {
      this.closest('.form__input_select').classList.remove('active')
   })
})

const forms = () => {
   const forms = document.forms

   for (let i = 0; i < forms.length; i++) {
      const form = forms[i]

      form.addEventListener('submit', e => {
         e.preventDefault()
         sendForm(form)
      })
   }

   async function sendForm(form) {
      let formMessage = form.querySelector('.form__message')
      formMessage.textContent = ''

      let error = validateForm(form)

      let formData = new FormData(form)

      if (error === 0) {
         form.classList.add('_sending')
         let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData,
         })
         if (response.ok) {
            let result = await response.json()
            popupOpen('succes')
            form.reset()
            form.classList.remove('_sending')
         } else {
            popupOpen('fail')
            form.classList.remove('_sending')
         }
      } else {
         formMessage.textContent =
            'Ошибка в одном или нескольких полях, проверьте коректность введенных данных'
         formMessage.classList.add('active')
      }
   }

   function validateForm(form) {
      let error = 0
      const formReq = form.querySelectorAll('._req')

      for (let i = 0; i < formReq.length; i++) {
         const input = formReq[i]
         removeFormError(input)
         if (input.classList.contains('_email')) {
            if (!validateEmail(input)) {
               addFormError(input)
               error++
            }
         } else if (input.classList.contains('_phone')) {
            if (!validatePhone(input)) {
               addFormError(input)
               error++
            }
         } else if (input.classList.contains('_select')) {
            if (input.value === 'default') {
               addFormError(input)
               error++
            }
         } else {
            if (input.value.trim().length <= 1) {
               addFormError(input)
               error++
            }
         }
      }

      return error
   }

   function addFormError(input) {
      input.parentElement.classList.add('_error')
      input.classList.add('_error')
   }
   function removeFormError(input) {
      input.parentElement.classList.remove('_error')
      input.classList.remove('_error')
   }

   function validateEmail(input) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(input.value).toLowerCase())
   }
   function validatePhone(input) {
      const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      return re.test(String(input.value).toLowerCase())
   }
}
forms()

$(document).ready(function () {
   $.each($('.spoller.active'), function (index, val) {
      $(this).next().show()
   })
   $('body').on('click', '.spoller', function (event) {
      if ($(this).hasClass('mob') && !isMobile.any()) {
         return false
      }

      if ($(this).parents('.one').length > 0) {
         $(this)
            .parents('.one')
            .find('.spoller')
            .not($(this))
            .removeClass('active')
            .next()
            .slideUp(300)
         $(this)
            .parents('.one')
            .find('.spoller')
            .not($(this))
            .parent()
            .removeClass('active')
      }

      if ($(this).hasClass('closeall') && !$(this).hasClass('active')) {
         $.each(
            $(this).closest('.spollers').find('.spoller'),
            function (index, val) {
               $(this).removeClass('active')
               $(this).next().slideUp(300)
            },
         )
      }
      $(this)
         .toggleClass('active')
         .next()
         .slideToggle(300, function (index, val) {
            if ($(this).parent().find('.slick-slider').length > 0) {
               $(this).parent().find('.slick-slider').slick('setPosition')
            }
         })
      return false
   })
})
	
})
