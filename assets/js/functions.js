

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
   $('html').toggleClass('nav-open');
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