'use strict';




const hamburger = document.querySelector('#menu');

const nav = document.querySelector('nav');

const link = document.querySelectorAll('.nav__item');

const body = document.querySelector('body');




function closeAll(){
    console.log('klik na body');
    
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




