document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages = document.querySelectorAll("img.lazy");    
    var lazyloadThrottleTimeout;
    
    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    
      
      lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function(img) {
              if(img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
              }
          });
          if(lazyloadImages.length == 0) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
      }, 20);
    }
    
    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  });
  
setInterval(() => {
    const heroimages=[
    "http://localhost:3000/img/sooter map delivery.png","http://localhost:3000/img/courierguy.gif",
    "http://localhost:3000/img/Scootyguy.gif","http://localhost:3000/img/truck.gif","http://localhost:3000/img/cycle.gif"];
    let heroimage=heroimages[Math.floor(Math.random() * heroimages.length)];
    document.getElementById("hero").src=heroimage;
    const aboutimages=["http://localhost:3000/img/about1 (1).png","http://localhost:3000/img/meet.png","http://localhost:3000/img/team2.png","http://localhost:3000/img/team.png","http://localhost:3000/img/meet2.png"];
    let aboutimage=aboutimages[Math.floor(Math.random() * aboutimages.length)];
    document.getElementById("abouthero").src=aboutimage;


}, 4500);


const openers= document.getElementsByClassName('opener');
const slides = document.getElementsByClassName('slide');
const icons = document.getElementsByClassName('plusicon');

for (let i = 0; i < openers.length; i++) {
    openers[i].addEventListener('click',()=>{
        icons[i].classList.toggle("fa-minus");
        if ( slides[i].style.display != "none") {
        slides[i].style.display="none"
       }else{
        slides[i].style.display="flex"
       }
    })
}

const onMenu=(checkbox)=>{
    if(checkbox.checked == true){
        document.getElementById("navhead").style.left=0
        document.querySelectorAll(".checkbtn i")[0].classList.toggle("fa-times")
        document.querySelectorAll(".checkbtn i")[0].classList.toggle("fa-bars")
    }else{
        document.getElementById("navhead").style.left = "-100%"
        document.querySelectorAll(".checkbtn i")[0].classList.toggle("fa-bars")
        document.querySelectorAll(".checkbtn i")[0].classList.toggle("fa-times")
   }
}

let serviceArray=document.getElementsByClassName("service-item")
setInterval(() => {
    serviceArray[0].classList.toggle("none");
    serviceArray[1].classList.toggle("none");
    serviceArray[3].classList.toggle("none");
    serviceArray[4].classList.toggle("none");
}, 3000);