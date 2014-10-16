slideshow.js
============

Simple Slide Show widget to cycle through a collection of ```div``` elements.

Usage
-----

###HTML

```html
<div id="frame">
	<div id="slideshow"><!-- this is a bare container -->
		<div>one</div>
		<div>two</div>
		<div>three</div>
		<div>four</div>
		<div>five</div>
		<div>six</div>
	</div>
<div>
```

1. Develop a collection of ```div``` elements.
2. Wrap inside a ```div``` element (```id="slideshow"``` above).
3. The outer ```div``` is optional, and only for your layout.

###JavaScript

In HTML:

```html
<script type="text/javascript" src="slideshow.js"></script>
```

In your JavaScript code:

```js
window.onload=init;
function init() {
	var options={
		"method":		"fade,both",
		"timing":		"3000,1000,20",
		"hover":		false,
		"click":		true,
		"onstart":		undefined,
		"onstop":		undefined,
		"start":		true,
		"restart":		false,
	};
	var doit=slideShow('div#slideshow',options);
}
```

1. The first parameter is a CSS-style selector for the div which contains your slides.
2. The second parameter is itself optional. The values above are all defaults.
3. The return value is a function which you can call to start or stop the slide show.

####Method

The method value is constructed as follows:

	"method":	"effect,direction"
	
The effect is one of the following. The direction is optional; the first in the list is the default.

| Effect		| Meaning 				| Possible Directions |
| :----------	| :-------------------	| :------------------ |
| fade			| Fade in or out			| both in out none    |
| cover		| Slide over previous	| left right up down  |
| carousel	| Push aside previous	| left right up down  |

####Timing

The timing value takes the following form:

	"timing":	"delay,duration,steps"
	
The duration and steps are optional; if included, they must be in the correct order.

| Parameter	| Meaning 					| Default |
| :----------	| :-----------------------	| :------ |
| delay		| Time between slides (ms)	| 3000    |
| delay		| Duration of effect (ms)	| 1000    |
| steps		| No of steps for effect	| 20      |


To Do
-----

1.	Fade through black (both, using mask)
2.	Allow alternative to divs
3.	Automatically create inner div for styling
4.	Ensure that duration<=delay
5. Test whether fadeout is working with IE
6. Allow carousel to work with one long div, in sections
7. Allow carousel to display more than one div
8. Ajax Support

Good grief! This is getting out of hand … ?

Disclaimer
----------

Usual stuff:

* This product does what it does and doesn’t do what it doesn‘t do. E & OE
* It probably won’t break anything, but if it does, it’s all lies I tell you, it wasn’t me, it was someone who looks like me, I’ve never heard of the place, I don’t know what you’re talking about, and, if you’re talking about Room 403, I’ve never heard if it.


