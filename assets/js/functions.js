

//Animates mobile menu icon when toggled
function myFunction(x) {
    x.classList.toggle("change");
  }


//Accessibility: Toggles state of aria-expanded to true when menu is expanded & toggles button text
var navButton = document.querySelector('.mobile-nav-toggle');
navButton.addEventListener('click', function toggle() {
    let expanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !expanded);
    let menu = document.querySelector('.nav-links-wrapper');
    menu.hidden = !menu.hidden;
    //Toggle button text
    var buttonText = document.querySelector(".btn_text");
    // buttonText.addEventListener('click', function() {
        if (expanded) { 
            buttonText.innerHTML = "Menu";
        }
        else { 
            buttonText.innerHTML = 'Close'; 
        }
});


//Registers clicks outside of .mobile-nav-overlay-wrapper (mobile menu)
$('.mobile-nav-overlay-wrapper').on('click', function(e){
   e.stopPropoagation();
});
//Technical//
//"this stops the event from bubbling up to the body"


//When any of these classes are clicked toggle 'nav-open' (hide & show menu)
$('.mobile-nav-toggle, header .mobile-nav-overlay').on('click', function(){
   $('nav').toggleClass('nav-open');
});
//Since .mobile-nav-overlay is used here, does that mean the above doesn't do the hiding when a click is registered outside of '.mobile-nav-overlay-wrapper'?



//Case study sticky navigation
class StickyNavigation {
    
    constructor() {
        this.currentId = null;
		this.currentTab = null;
		this.tabContainerHeight = 70;
		this.lastScroll = 0;
		let self = this;
		$('.sticky-nav-tab').click(function() { 
			self.onTabClick(event, $(this)); 
		});
		$(window).scroll(() => { this.onScroll(); });
		$(window).resize(() => { this.onResize(); });
	}
	
	onTabClick(event, element) {
		event.preventDefault();
		let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 2;
		$('html, body').animate({ scrollTop: scrollTop }, 600);
	}
	
	onScroll() {
		this.checkHeaderPosition();
    this.findCurrentTabSelector();
		// this.lastScroll = $(window).scrollTop();
	}
	// If I comment this.lastScroll = $(window).scrollTop(); out then it doesn't change when scrolling up, but the slider is off
	
	onResize() {
		if(this.currentId) {
			this.setSliderCss();
		}
	}
	
	checkHeaderPosition() {
		const headerHeight = 75;
		if($(window).scrollTop() > headerHeight) {
			$('.spa-header').addClass('spa-header--scrolled');
		} else {
			$('.spa-header').removeClass('spa-header--scrolled');
		}
		let offset = ($('.sticky-nav-tabs').offset().top + $('.sticky-nav-tabs').height() - this.tabContainerHeight) - headerHeight;
		if($(window).scrollTop() > this.lastScroll && $(window).scrollTop() > offset) {
			$('.spa-header').addClass('spa-header--move-up');
			$('.sticky-nav-tabs-container').removeClass('sticky-nav-tabs-container--top-first');
			$('.sticky-nav-tabs-container').addClass('sticky-nav-tabs-container--top-second');
		} 
		else if($(window).scrollTop() < this.lastScroll && $(window).scrollTop() > offset) {
			$('.spa-header').removeClass('spa-header--move-up');
			$('.sticky-nav-tabs-container').removeClass('sticky-nav-tabs-container--top-second');
			$('.sticky-nav-tabs-container').addClass('sticky-nav-tabs-container--top-first');
		}
		else {
			$('.spa-header').removeClass('spa-header--move-up');
			$('.sticky-nav-tabs-container').removeClass('sticky-nav-tabs-container--top-first');
			$('.sticky-nav-tabs-container').removeClass('sticky-nav-tabs-container--top-second');
		}
	}
	
	findCurrentTabSelector(element) {
		let newCurrentId;
		let newCurrentTab;
		let self = this;
		$('.sticky-nav-tab').each(function() {
			let id = $(this).attr('href');
			let offsetTop = $(id).offset().top - self.tabContainerHeight;
			let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
			if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
				newCurrentId = id;
				newCurrentTab = $(this);
			}
		});
		if(this.currentId != newCurrentId || this.currentId === null) {
			this.currentId = newCurrentId;
			this.currentTab = newCurrentTab;
			this.setSliderCss();
		}
	}
	
	setSliderCss() {
		let width = 0;
		let left = 0;
		if(this.currentTab) {
			width = this.currentTab.css('width');
			left = this.currentTab.offset().left;
		}
		$('.sticky-nav-tab-slider').css('width', width);
		$('.sticky-nav-tab-slider').css('left', left);
	}
	
}

new StickyNavigation();




////////////////////////
//Accessible Accordion
////////////////////////

!(function (t, e, a) {
   "use strict";
   var r = {};
   (t.ARIAaccordion = r), (r.NS = "ARIAaccordion"), (r.AUTHOR = "Scott O'Hara"), (r.VERSION = "3.2.1"), (r.LICENSE = "https://github.com/scottaohara/accessible_accordions/blob/master/LICENSE");
   var i = "accordion",
       l = i + "__trigger",
       n = i + "__panel",
       o = "[data-aria-accordion-heading]",
       d = "[data-aria-accordion-panel]",
       c = 0;
   (r.create = function () {
       var t,
           a,
           s,
           u,
           A,
           g,
           h = "none",
           b = e.querySelectorAll("[data-aria-accordion]");
       for (c += 1, g = 0; g < b.length; g++) {
           var f;
           if (
               ((t = b[g]).hasAttribute("id") || (t.id = "acc_" + c + "-" + g),
               t.classList.add(i),
               e.querySelectorAll("#" + t.id + "> li").length
                   ? ((a = e.querySelectorAll("#" + t.id + " li > " + d)), (s = e.querySelectorAll("#" + t.id + " li > " + o)))
                   : ((a = e.querySelectorAll("#" + t.id + " > " + d)), (s = e.querySelectorAll("#" + t.id + " > " + o))),
               t.hasAttribute("data-default") && (h = t.getAttribute("data-default")),
               (A = t.hasAttribute("data-constant")),
               t.hasAttribute("data-multi"),
               t.hasAttribute("data-transition"))
           ) {
               var y = t.querySelectorAll(d);
               for (f = 0; f < y.length; f++) y[f].classList.add(n + "--transition");
           }
           for (
               r.setupPanels(t.id, a, h, A),
                   r.setupHeadingButton(s, A),
                   u = e.querySelectorAll("#" + t.id + "> li").length ? e.querySelectorAll("#" + t.id + " li > " + o + " ." + l) : e.querySelectorAll("#" + t.id + " > " + o + " ." + l),
                   f = 0;
               f < u.length;
               f++
           )
               u[f].addEventListener("click", r.actions), u[f].addEventListener("keydown", r.keytrolls);
       }
   }),
       (r.setupPanels = function (t, e, a, r) {
           var i, l, o, d, c;
           for (i = 0; i < e.length; i++)
               (o = t + "_panel_" + (i + 1)),
                   (d = a),
                   (c = r),
                   (l = e[i]).setAttribute("id", o),
                   s(e[0], !0),
                   l.classList.add(n),
                   "none" !== d && NaN !== parseInt(d) && (d <= 1 ? s(e[0], !1) : d - 1 >= e.length ? s(e[e.length - 1], !1) : s(e[d - 1], !1)),
                   ((c && "none" === d) || NaN === parseInt(d)) && s(e[0], !1);
       }),
       (r.setupHeadingButton = function (t, a) {
           var r, i, n, o, d, c;
           for (c = 0; c < t.length; c++)
               (i = (r = t[c]).nextElementSibling.id),
                   (n = e.getElementById(i).getAttribute("aria-hidden")),
                   (o = e.createElement("button")),
                   (d = r.textContent),
                   (r.innerHTML = ""),
                   r.classList.add("accordion__heading"),
                   o.setAttribute("type", "button"),
                   o.setAttribute("aria-controls", i),
                   o.setAttribute("id", i + "_trigger"),
                   o.classList.add(l),
                   "false" === n ? (u(o, !0), g(o, !0), a && o.setAttribute("aria-disabled", "true")) : (u(o, !1), g(o, !1)),
                   r.appendChild(o),
                   o.appendChild(e.createTextNode(d));
       }),
       (r.actions = function (t) {
           var a,
               i = this.id.replace(/_panel.*$/g, ""),
               n = e.getElementById(this.getAttribute("aria-controls"));
           (a = e.querySelectorAll("#" + i + "> li").length ? e.querySelectorAll("#" + i + " li > " + o + " ." + l) : e.querySelectorAll("#" + i + " > " + o + " ." + l)), t.preventDefault(), r.togglePanel(t, i, n, a);
       }),
       (r.togglePanel = function (t, a, r, i) {
           var l,
               n,
               o = t.target;
           if (
               "true" !== o.getAttribute("aria-disabled") &&
               ((l = o.getAttribute("aria-controls")),
               g(o, "true"),
               "true" === o.getAttribute("aria-expanded") ? (u(o, "false"), s(r, "true")) : (u(o, "true"), s(r, "false"), e.getElementById(a).hasAttribute("data-constant") && A(o, "true")),
               e.getElementById(a).hasAttribute("data-constant") || !e.getElementById(a).hasAttribute("data-multi"))
           )
               for (n = 0; n < i.length; n++) o !== i[n] && (g(i[n], "false"), (l = i[n].getAttribute("aria-controls")), A(i[n], "false"), u(i[n], "false"), s(e.getElementById(l), "true"));
       }),
       (r.keytrolls = function (t) {
           if (t.target.classList.contains(l)) {
               var a,
                   r = t.keyCode || t.which,
                   i = this.id.replace(/_panel.*$/g, "");
               switch (((a = e.querySelectorAll("#" + i + "> li").length ? e.querySelectorAll("#" + i + " li > " + o + " ." + l) : e.querySelectorAll("#" + i + " > " + o + " ." + l)), r)) {
                   case 35:
                       t.preventDefault(), a[a.length - 1].focus();
                       break;
                   case 36:
                       t.preventDefault(), a[0].focus();
               }
           }
       }),
       (r.init = function () {
           r.create();
       });
   var s = function (t, e) {
           t.setAttribute("aria-hidden", e);
       },
       u = function (t, e) {
           t.setAttribute("aria-expanded", e);
       },
       A = function (t, e) {
           t.setAttribute("aria-disabled", e);
       },
       g = function (t, e) {
           t.setAttribute("data-current", e);
       };
   r.init();
})(window, document);



////////////////////////
//Future
////////////////////////
//Using card container as proxy for link = makes entire card clickable and not just link. From: https://inclusive-components.design/cards/ 


/*
Not sure how to implement yet, functionality current written into index.sass

const projects-content-wrapper = document.querySelectorAll('.case-study-preview');  
Array.prototype.forEach.call(projects-content-wrapper, case-study-preview => {  
    let down, up, link = case-study-preview.querySelector('h2 a');
    case-study-preview.onmousedown = () => down = +new Date();
    case-study-preview.onmouseup = () => {
        up = +new Date();
        if ((up - down) < 200) {
            link.click();
        }
    }
});
*/
