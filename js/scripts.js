'use strict';

import  {InfoCookies} from "./modules/InfoCookies.js";

const infCookie = new InfoCookies;

const closeLink = document.querySelector('.cookies__close a');

closeLink.addEventListener('click', (e) => {

    e.preventDefault();

    infCookie.setCookie();
});



const hamburger = document.querySelector('#menu');

const nav = document.querySelector('nav');

const link = document.querySelectorAll('.nav__item');

const body = document.querySelector('body');

const img = document.querySelectorAll('.site-gallery__photo--min img');

const popup = document.querySelector('.site-gallery__photo--popup');

const popupImg = document.querySelector('.popup__img')

const close = document.querySelector('.material-icons__popup--close');

const back = document.querySelector('.material-icons__popup--back');

const forward = document.querySelector('.material-icons__popup--forward');

let currentImageIndex;

function nextImg(){
   
    
        if(currentImageIndex === img.length-1){
    
            currentImageIndex = 0
     
        }else {
      
            currentImageIndex++;
        }
        popupImg.src = img[currentImageIndex].src;
        
}

function previousImg(){
   
    if(currentImageIndex === 0){
        
        currentImageIndex = img.length-1;

    }else{
        
        currentImageIndex--
    }
    
    popupImg.src = img[currentImageIndex].src;
}

function closeImg(){
    popup.classList.add('popup-disappear');
    setTimeout(()=>{
    popup.classList.add('display-none');
    popup.classList.remove('popup-disappear');
    }, 300);
}

function closeAll(){
    
    
    nav.classList.remove('display-block');
  
    nav.classList.add('display-none');
    
    hamburger.classList.remove('display-none');
      
}

hamburger.addEventListener('click', (e)=>{
    
    e.stopPropagation(); 
   
    nav.classList.remove('display-none');
    
    nav.classList.add('display-block');

    hamburger.classList.add('display-none');

});

body.addEventListener('click', closeAll);

img.forEach((elem, index)=>{
   
    elem.addEventListener('click', (e)=>{
   
        popup.classList.remove('display-none');
   
        popupImg.src = e.target.src;
   
        currentImageIndex = index;
      
    })
});

close.addEventListener('click', closeImg);

forward.addEventListener('click', nextImg);

back.addEventListener('click',previousImg);

document.addEventListener('keydown',(e)=> {
   if(!popup.classList.contains('display-none')){
    if(e.key === 'ArrowRight'){

            nextImg();

    }else if(e.key ==='ArrowLeft'){
        
        previousImg();

    }else if(e.key === 'Escape'){
       
        closeImg();
    }
}

});







