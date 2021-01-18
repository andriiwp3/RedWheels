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
 

!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});

if ($('.platform__items').length > 0) {
   $('.platform__items').slick({
      infinite: false,
      accessibility: false,
      slidesToShow: 2,
      autoplaySpeed: 3000,  

      prevArrow: $('.platform__arrow_prev'),
      nextArrow: $('.platform__arrow_next'),
      responsive: [
         {
            breakpoint: 991.98,
            settings: {
               slidesToShow: 1,
            },
         },
      ],
   })
}


const gallery = () => {
   const gallery = document.querySelector('._gal')
   const current = gallery.querySelector('.gallery__current img')
   const slides = gallery.querySelectorAll('.gallery__slide')
   const arrows = gallery.querySelectorAll('.gallery__arrow')
   let activeSlide = 0

   arrows.forEach(arrow => {
      arrow.addEventListener('click', () => {
         if (arrow.classList.contains('gallery__arrow_next')) {
            if (activeSlide < slides.length) {
               activeSlide < slides.length - 1
                  ? activeSlide++
                  : (activeSlide = 0)
               const nextSlide = slides[activeSlide].querySelector('img')
               const currentPath = current.src
               changeSlide(nextSlide.src, current)
               changeSlide(currentPath, nextSlide)
            }
         } else {
            if (activeSlide >= 0) {
					console.log(activeSlide);
               activeSlide > 0
                  ? activeSlide--
                  : activeSlide = slides.length - 1
               const nextSlide = slides[activeSlide].querySelector('img')
               const currentPath = current.src
               changeSlide(nextSlide.src, current)
               changeSlide(currentPath, nextSlide)
            }
         }
      })
   })
   const changeSlide = (path, elem) => {
      elem.src = `${path}`
   }
}
gallery()
 
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
