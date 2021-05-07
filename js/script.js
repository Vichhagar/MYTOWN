const translate = document.querySelectorAll(".translate");
const shadow = document.querySelector(".shadow");
const content = document.querySelector(".content");
const imgContainer = document.querySelector(".imgContainer");
const section1 = document.querySelector(".section1");
// const opacity = document.querySelectorAll(".opacity");
const border = document.querySelectorAll(".border");

let section1_height = section1.offsetHeight;

const slider = document.querySelector('.slider');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const carousel = document.querySelector('.carousel');

var direction;

next.addEventListener('click', function() {
    carousel.style.justifyContent = `flex-start`;
    slider.style.transform = `translate(-33.33%)`;
    direction = -1;
});

prev.addEventListener('click', function() {
    if (direction === -1) {
        slider.appendChild(slider.firstElementChild);
        direction = 1;
    }
    carousel.style.justifyContent = `flex-end`;
    slider.style.transform = `translate(33.33%)`;
    
});

slider.addEventListener(`transitionend`, function() {
    if(direction === -1) {
        slider.appendChild(slider.firstElementChild);
    } else if (direction === 1) {
        slider.prepend(slider.lastElementChild);
    }
    
    slider.style.transition = `none`;
    slider.style.transform = `translate(0)`;
    setTimeout(function() {
        slider.style.transition = `all 0.5s`;
    })
});


window.addEventListener('scroll', () => {
    let scroll = window.pageYOffset;
    let section1Y = section1.getBoundingClientRect();
    
    translate.forEach(element => {
        let speed = element.dataset.speed;
        element.style.transform = `translateY(${scroll * speed}px)`;
    })

    // opacity.forEach(element => {
    //     element.style.opacity = scroll / (section1Y.top + section1_height)
    // })
    // shadow.style.height =  `${scroll * 0.5 + 150}px`;

    // content.style.transform = `translateY(${scroll / (section1_height + section1Y.top) * -30 + 30}px)`;
    // imgContainer.style.transform = `translateY(${scroll / (section1_height + section1Y.top) * -50 + 50}px)`;

    border.forEach(element => {
        element.style.width = `${scroll / (section1Y.top + section1_height) * 30}%`;
    })
    
})


// Hamburger
const hamburger = document.querySelector('.hamburger-menu');
const navUL = document.getElementById('nav-ul');

hamburger.addEventListener('click', () => {
    navUL.classList.toggle('show');
});

//TYPE WRITER EFFECT

const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

// Type Method
TypeWriter.prototype.type = function() {
    //Current index of word
    const current = this.wordIndex % this.words.length;
    // Get Full text of current word
    const fulltxt = this.words[current];

    //check if deleting
    if(this.isDeleting) {
        //Remove char
        this.txt = fulltxt.substring(0, this.txt.length - 1);
    } else {
        //Add char
        this.txt = fulltxt.substring(0, this.txt.length + 1);
    }

    //Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //Initial Type Speed
    let typeSpeed = 300;

    if (this.isDeleting) {
        typeSpeed /= 3;
    }

    // If word is complete
    if(!this.isDeleting && this.txt === fulltxt) {
        // Make a pause at the end
        typeSpeed = this.wait;
        //set delete to True
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        //Move to the next word
        this.wordIndex++;
        //Pause before start typing
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

//Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //Init Typewriter
    new TypeWriter(txtElement, words, wait);
}

// Smooth-Scroll

// function smoothscroll(target, duration) {
//     var target = document.querySelector(target);
//     var targetPosition = target.getBoundingClientRect().top;
//     var startPosition = window.pageYOffset;
//     var distand = targetPosition - startPosition;
//     var startTime = null;

//     function animation(currentTime) {
//         if(startTime === null) startTime = currentTime;
//         var timeElapsed = currentTime - startTime;
//         var run = ease(timeElapsed, startPosition, distand, duration)
//         window.scrollTo(0, run);
//         if(timeElapsed < duration) requestAnimationFrame(animation);
//     }

//     function ease(t, b, c, d) {
//         t /= d/2;
//         if(t < 1) return c / 2 * t * t + b;
//         t--;
//         return -c / 2 * (t * (t - 2) - 1) + b;
//     }

//     requestAnimationFrame(animation);
// }



// var homePage = document.querySelector('.logo');
// homePage.addEventListener('click', function() {
//     smoothscroll('.container', 1000);
// })

// var famousPlace = document.querySelector('.famous-place');
// famousPlace.addEventListener('click', function() {
//     smoothscroll('.containerTwo', 1000);
// })

// var toDo = document.querySelector('.to-do');
// toDo.addEventListener('click', function() {
//     smoothscroll('.section2', 1000);
//     console.log(toDo);
// })

//Transperent

const navbar = document.querySelector('nav');


document.addEventListener('scroll', () => {
    var scrollPosition = window.scrollY;
    if (`${scrollPosition}` > 300) {
        navbar.style.backgroundColor = '#333';
    } else {
        navbar.style.backgroundColor = 'transparent';
    }
})

// Active Tap


// $(document).ready(function() {
//     $('li').on('click', function() {
//         $(this).siblings().removeClass('active');
//         $(this).addClass('active');
//     })
// })

// Active Tap On Scroll //FIX TMR

const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('nav .container ul li');


window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach( section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if(pageYOffset >= (sectionTop - (sectionHeight/3))) {
            current = section.getAttribute('id');
            console.log(current);
        }
    })

    navLi.forEach( li => {
        li.classList.remove('active');
        if(li.classList.contains(current)) {
            li.classList.add('active');
            console.log("We have "+current);
        }
    })
})

// TMR
Map

// Myanmar 24.302158390431135, 96.79556061519871
function initMap() {
    var options = {
      zoom: 7,
      center: {lat: 24.302158390431135, lng: 96.79556061519871},
      map: map
    }

    
    
    

    var map = new google.maps.Map(
      document.getElementById('map'), options);

    // addMarker({
    //   coord:{lat: 13.581320, lng: 103.853800},
    //   // iconImg: 'http://cdn.onlinewebfonts.com/svg/img_450834.png',
    //   content: '<h1>Siem Reap</h1>'
    // });

    // Bagan 21.17191635910246, 94.85845684621202
    addMarker({
      coord:{lat: 21.17191635910246, lng: 94.85845684621202},
      iconImg: 'map-icon/bagan.png',
      content: '<h1 class="pop-title">Bagan</h1>' + 
      '<a href="places/bagan/blog.html" class="Visit">Visit</a>'
    });

    // Khakaborazi 28.07105278020464, 97.75068236716753
    addMarker({
      coord:{lat: 28.07105278020464, lng: 97.75068236716753},
      iconImg: 'map-icon/Khaka.png',
      content: '<h1 class="pop-title">Khakaborazi</h1>' + 
      '<a href="places/hkakaborazi/kaka.html" class="Visit visit-Khaka">Visit</a>'
    });

    // Inle Lake 20.594063477163633, 96.91090226034628
    addMarker({
      coord:{lat: 20.594063477163633, lng: 96.91090226034628},
      iconImg: 'map-icon/lake.png',
      content: '<h1 class="pop-title">Inle Lake</h1>' + 
      '<a href="places/inlay/inlay.html" class="Visit visit-Inle">Visit</a>'
    });

    function addMarker(props) {
      var marker = new google.maps.Marker({
        position: props.coord,
        icon: props.iconImg,
        map: map,
    });

    if(props.content) {
      var infoWindow = new google.maps.InfoWindow({
        content: props.content
      })

      marker.addListener('click', function() {
        infoWindow.open(map, marker);
    })
  }}}