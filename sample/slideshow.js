/*	Slide Show
	================================================

	Usage:

		<script type="text/javascript" src="slideshow.js"></script>

		<script type="text/javascript">
			if(window.addEventListener) window.addEventListener('load',init,false);
			else window.attachEvent('onload',init);

			function init() {
				var options= {
						"method":		"fade,both",
						"timing":		"3000,1000,20",
						"hover":		false,
						"click":		true,
						"onstart":		undefined,
						"onstop":		undefined,
						"start":		true,
						"restart":		false,
				}
				var doit=slideShow('div#slideshow',options);
			}
		</script>

	================================================ */

	function slideShow(container,options) {
		/*	Options
			======================================== */
			options=options||{};
			options.method=options.method||'fade';
			options.timing=options.timing||'3000,1000,20';
			options.restart=!!options.restart;
			options.hover=!!options.hover;
			options.click=!!options.click;

			//	Timing: delay=3000,duration=1000,steps=20
				var timing=options.timing.split(/\s*,\s*/);
				var delay=timing[0]||3000;
				var duration=timing[1]||1000;
				var steps=timing[2]||20;

			//	Method: method=fade,direction
				var method=options.method.split(/,\s*/);
				var action=method[0]||'fade';
				var direction;
				switch(action) {
					case 'cover':
					case 'carousel':
						direction=method[1]||'left';
						break;
					case 'fade':
						/* falls through */
					default:
						direction=method[1]||'both';
				}

		/*	Other Variables
			======================================== */

			var doit;
			var previous, next;
			var style;

			var variation;
			var i,
				slide=0,
				slideTimer=null,
				inTimer=null,
				outTimer=null;

		/*	Container Element
			======================================== */
			//	var div=document.querySelector(container);

			container=document.querySelector(container);
			var slides=container.querySelectorAll('div');

			//	container=document.createElement('div');
			//	container=div;
			//	for(i=0;i<slides.length;i++) {//>
			//		container.appendChild(div.removeChild(slides[i]));
			//	}

			container.style.overflow='hidden';
			if (window.getComputedStyle) style=getComputedStyle(container, null);
			else style=container.currentStyle;
			if(style.position=='static') container.style.position='relative';

		/*	Individual Slides
			======================================== */

			//	var mask=document.createElement('div');
			//	mask.style.cssText='background-color: black;';
			//	container.appendChild(mask);

			for(i=0;i<slides.length;i++) slides[i].style.position='absolute'; // >

		/*	Select Effect Function
			======================================== */

			switch(action) {
				// also set doit here
				case 'cover':
					variation=null;
					method=doSlideIn;
					break;
				case 'carousel':
					variation='carousel';
					method=doSlideIn;
					break;
				case 'fade':
					/* falls through */
				default:
					method=doFade;
			}

		/*	Starting
			======================================== */

			if(options.click) container.onclick=doStart;
			if(options.hover) container.onmouseover=container.onmouseout=doStart;

			if(options.start) start();

			return start;

			function doStart() {
				start();
			}

			function start(go) {
				if(go===undefined) go=!slideTimer;
				else go=!!go;
				if(go) method(true);
				else {
					window.clearInterval(slideTimer);
					slideTimer=null;
					if(inTimer) {
						window.clearInterval(inTimer);
						outTimer=null;
					}
					if(outTimer) {
						window.clearInterval(outTimer);
						outTimer=null;
					}
				}
			}

		/*	Cover & Carousel
			======================================== */

			function doSlideIn(init) {
				var bound, edge, step;

				if(init) {
					if(options.restart) slide=0;
					for(var i=0;i<slides.length;i++) {
						slides[i].style.display='block';
						slides[i].style.zIndex=1000;
						slides[i].style.opacity=1;
						slides[i].style.filter='alpha(opacity=100)';
					}
					slides[0].style.zIndex=2001;
					slideTimer=window.setInterval(method,delay);
					return;
				}

				previous=slide;
				slide++;
				slide%=slides.length;
				next=slide;

				for(var i=0;i<slides.length;i++)
					if(i!=previous&&i!=next) slides[i].style.zIndex=1000;

				previous=slides[previous];
				previous.style.zIndex=2000;
				next=slides[next];
				next.style.zIndex=2002;


				switch(direction) {
					case 'up':
						bound=container.clientTop;
						edge=container.clientHeight;
						next.style.top=container.clientHeight+'px';
						step=-container.clientHeight/steps;
						doit=slideUp;
						break;
					case 'down':
						bound=container.clientTop;
						edge=-container.offsetHeight;
						next.style.top=container.clientTop-container.clientHeight+'px';
						step=container.clientHeight/steps;
						doit=slideDown;
						break;

					case 'right':
						bound=container.clientLeft;
						edge=-container.offsetWidth;
						next.style.left=container.clientLeft-container.clientWidth+'px';
						step=container.clientWidth/steps;
						doit=slideRight;
						break;
					case 'left':
						/* falls through */
					default:
						bound=container.clientLeft;
						edge=container.offsetWidth;
						next.style.left=container.clientWidth+'px';
						step=-container.clientWidth/steps;
						doit=slideLeft;
				}

				inTimer=window.setInterval(doit,duration/steps);
/*
				function slideAll() {
					return function() {
						edge+=step;
						if(data.first<=data.second) {
							next.style[data.style]=data.end+'px';
							window.clearInterval(inTimer);
							inTimer=null;
						}
						else {
							if(variation=='carousel') previous.style[data.style]=edge+data.size+'px';
							next.style[data.style]=edge+'px';
						}
					};
				}
*/
				function slideLeft() {
					edge+=step;
					if(edge<=bound) {
						next.style.left=0+'px';
						window.clearInterval(inTimer);
						inTimer=null;
					}
					else {
						if(variation=='carousel') previous.style.left=edge-container.clientWidth+'px';
						next.style.left=edge+'px';
					}
				}
				function slideRight() {
					edge+=step;
					if(edge>=bound) {
						next.style.left=bound+'px';
						window.clearInterval(inTimer);
						inTimer=null;
					}
					else {
						if(variation=='carousel') previous.style.left=edge+container.clientWidth+'px';
						next.style.left=edge+'px';
					}
				}
				function slideUp() {
					edge+=step;
					if(edge<=bound) {
						next.style.top=0+'px';
						window.clearInterval(inTimer);
						inTimer=null;
					}
					else {
						if(variation=='carousel') previous.style.top=edge-container.clientHeight+'px';
						next.style.top=edge+'px';
					}
				}
				function slideDown() {
					edge+=step;
					if(edge>=bound) {
						next.style.top=bound+'px';
						window.clearInterval(inTimer);
						inTimer=null;
					}
					else {
						if(variation=='carousel') previous.style.top=edge+container.clientHeight+'px';
						next.style.top=edge+'px';
					}
				}
			}

			function doFade(now) {
				//	mask.style.zIndex=2001;
				if(now) {
					if(options.restart) slide=0;

					for(i=0;i<slides.length;i++) {
						slides[i].style.left=container.clientLeft+'px';
						slides[i].style.top=container.clientTop+'px';
					}

					switch(direction) {
						case 'in':
							doit=doFadeIn;
							break;
						case 'out':
							doit=doFadeOut;
							break;
						case 'none':
							doit=doFadeNone;
							break;
						case 'both':
							/* falls through */
						default:
							doit=doFadeBoth;
					}

					slides[slide].style.zIndex=2002;
					slideTimer=window.setInterval(method,delay);
					return;
				}

				if(inTimer) {
					window.clearInterval(inTimer);
					inTimer=null;
				}
				if(outTimer) {
					window.clearInterval(outTimer);
					outTimer=null;
				}

				previous=slide;

				slide++;
				slide%=slides.length;
				next=slide;

				for(i=0;i<slides.length;i++) {
					if(i!=previous&&i!=next) {
						slides[i].style.zIndex=1000;
						slides[i].style.opacity=0;
						slides[i].style.filter='alpha(opacity=0)';
					}
					else slides[i].display='block';
				}

				previous=slides[previous];
				previous.style.zIndex=2000;
				next=slides[next];
				next.style.zIndex=2002;
				previous.style.opacity=next.style.opacity=1;
				previous.style.filter=next.style.filter='alpha(opacity=1)';

				doit();

				function doFadeIn() {
					fadeIn(next);
				}

				function doFadeOut() {
					next.style.zIndex=2000;
					previous.style.zIndex=2002;
					fadeOut(previous,function() {
						previous.style.zIndex=2000;
						next.style.zIndex=2002;
					});
				}

				function doFadeNone() {
					//	this will do it ?
				}

				function doFadeBoth() {
					fadeOut(previous);
					fadeIn(next);
				}

				function fadeIn(element,callback) {
					var opacity;
					if(!inTimer) {
//						element.style.display='block';
						opacity=element.style.opacity=0;
						element.style.filter='alpha(opacity=0)';
						inTimer=window.setInterval(fade,duration/steps);
					}
					function fade() {
						opacity+=1/steps;
						if(opacity>=1) {
							element.style.opacity=1;
							element.style.filter='alpha(opacity=100)';
							window.clearInterval(inTimer);
							inTimer=null;
							if(callback) callback();
						}
						else {
							element.style.opacity=opacity;
							element.style.filter='alpha(opacity='+Math.round(opacity*100)+')';
						}
					}
				}
				function fadeOut(element,callback) {
					var opacity;
					if(!outTimer) {
						opacity=element.style.opacity=1;
						element.style.filter='alpha(opacity=100)';
						outTimer=window.setInterval(fade,duration/steps);
					}
					function fade() {
						opacity-=1/steps;
						if(opacity<=0) {
							window.clearInterval(outTimer);
							outTimer=null;
							element.style.opacity=0;
							element.style.filter='alpha(opacity=0)';
							if(callback) callback();
						}
						else {
							element.style.opacity=opacity;
							element.style.filter='alpha(opacity='+opacity*100+')';
						}
					}
				}
			}
	}
