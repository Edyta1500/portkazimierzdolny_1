'use strict';

$(function(){
  
    

    $('header a').on('click', function(e){
       
        e.preventDefault();

        const goToSection = $(this).attr('href');

        // console.log(goToSection);

        $('body, html').animate({

            scrollTop: $(goToSection).offset().top

        }, 500)

    });
   

});