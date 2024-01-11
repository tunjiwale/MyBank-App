'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navLinks = document.querySelectorAll('.nav_links');
const nav = document.querySelector('.nav');

   btnScrollTo.addEventListener('click', function() {
   section1.scrollIntoView({behavior : 'smooth'})
   });


//   navLinks.addEventListener('click', function(e){
//   e.preventDefault();
//   console.log(e.target);
//   if(e.target.classList.contains('nav_link')&&!(e.target.classList.contains('btn--show-modal'))){
//   const id = e.target.getAttribute('href');
//   document.querySelector(id).scrollIntoView({behavior : 'smooth'})
//   };
// });
//   console.log(navLinks);

    navLinks.forEach((element) =>
 { element.addEventListener('click', function(e){

  e.preventDefault();
  console.log(e.target);
  if(e.target.classList.contains('nav_link'))
  {const id = e.target.getAttribute('href');
  document.querySelector(id).scrollIntoView({behavior : 'smooth'})
  };
});
});

const tabs = document.querySelectorAll(".operations__tab ");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content ");

  
tabsContainer.addEventListener('click', function(e){
  const click = e.target.closest('.operations__tab');
  console.log('click re:',click);
   console.log('i got clicked');


   if(!click) return;
  
  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  tabsContent.forEach(c=>c.classList.remove('operations__content--active'));
  
  click.classList.add('operations__tab--active');

  document
  .querySelector(`.operations__content--${click.dataset.tab}`)
  .classList.add('operations__content--active');
});
    
const handlehover = function(e) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    
    // console.log(link);
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    
    siblings.forEach(el=>{
      if(el !== link) el.style.opacity = this;
    }
      );
      logo.style.opacity = this;
      }
}

nav.addEventListener('mouseover', handlehover.bind(0.5))

nav.addEventListener('mouseout', handlehover.bind(1))


   //Sticky Event
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords); // To get the current scroll positions(top,left. etc)

// window.addEventListener('scroll', function() {
//   console.log(window.scrollY)

//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//     }
//   })

  //Using Intersection Observer API to implement sticky event
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

  const stickyNav = function(entries) {
  const [entry] = entries;
  // console.log(entry);
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky')
};
  const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold : 0,
    //rootMargin : '-90px'
    rootMargin : `-${navHeight}px`,
  })

 headerObserver.observe(header);

const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const[entry] = entries;

if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
}

const sectionObserver = new IntersectionObserver 
 (revealSection, {
root : null,
threshold : 0.15,
});

allSections.forEach(function (section){
sectionObserver.observe(section);
// section.classList.add('section--hidden');
});

//Lazy loading image-for better performance
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function(entries, observer) {
const [entry] = entries;
if(!entry.isIntersecting) return;
entry.target.src = entry.target.dataset.src; // changimg image to better one
entry.target.addEventListener('load', function(){
  entry.target.classList.remove('lazy-img');
})

observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(
  loadImg, {
    root:null,
    threshold:0,
    rootMargin:'200px',
  })

imgTargets.forEach(img => imgObserver.observe(img));

//Slider
const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');

let curSlide = 0
const maxSlide = slides.lenght;

const goToSlide = function(slide) {
  slides.forEach (
    (s, i) => (s.style.transform = 
  `translateX(${100 * (i - slide)}%)`)
  );
  };

goToSlide(0);

const nextSlide = function() {
  if (curSlide === maxSlide - 1) {
    curSlide = 0
  } else {
    curSlide++;
  }
}

goToSlide(curSlide);

const prevSlide = function() {
  if (curSlide === 0) {
    curSlide = maxSlide - 1
  } else {
    curSlide--;
  }
  goToSlide(curSlide)
}

// btnRight.addEventListener('click', function(){
//   console.log('i got clicked')
// });

// btnLeft.addEventListener('click', function(){
//   console.log('its a click')
// });

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function(e){
  if(e.key === 'arrowLeft') prevSlide();
  e.key === 'arrowRight' && nextSlide();
});



//Alternative way of creating mouseover & mouseout

// nav.addEventListener('mouseover', function(e){
//   if(e.target.classList.contains('nav__link')) {
// const link = e.target;

// console.log(link);
// const siblings = link.closest('.nav').querySelectorAll('.nav__link');
// const logo = link.closest('.nav').querySelector('img');

// siblings.forEach(el=>{
//   if(el !== link) el.style.opacity = 0.5;
// }
//   );
//   logo.style.opacity = 0.5
//   }
// });

// nav.addEventListener('mouseout', function(e){
//   if(e.target.classList.contains('nav__link')) {
// const link = e.target;
// const siblings = link.closest('.nav').querySelectorAll('.nav__link');
// const logo = link.closest('.nav').querySelector('img');

// siblings.forEach(el=> {
//   if(el !== link) el.style.opacity = 1;
// }
//   );
//   logo.style.opacity = 1
//   }
// });

  // const s1coord = section1.getBoundingClientRect();
  // window.scrollTo({
  // left : s1coord.left + window.pageXOffset,
  // top : s1coord.top + window.pageYOffset,
  // behavior : 'smooth'
  
     





const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  console.log(' i dey work: openModal')
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
