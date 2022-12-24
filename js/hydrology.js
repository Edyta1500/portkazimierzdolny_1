// Dane hydrologiczne IMGW

'use strict';

const baseUrl = 'https://danepubliczne.imgw.pl/api/data/hydro';

let item = document.createElement('tr');


const getAllStation = async () => {

    try {

        const response = await fetch(baseUrl);

        const data = await response.json();

        return data;

    } catch (err) {

        console.error('próba wyświetlenia danych hydrologicznych nie powiodła się');
    }
};


getAllStation().then(data => {

    data.forEach((element) => {
        
        let opt = document.createElement('option');

        opt.innerHTML = `${element.stacja}`;

        document.querySelector('#stacja').appendChild(opt);



        // dodanie wybranych stacji na stałe do tabeli

        const butChooseSt = document.querySelectorAll(".buttonChooseStacja");

        butChooseSt.forEach((button)=>{
         
            button.addEventListener('click', (e)=>{
            
            let wybrana_stacja = e.target.innerHTML;

            let index_st = data.findIndex(el => el.stacja === wybrana_stacja)
           
          

           item.innerHTML=
            
           ` <td>${data[index_st].stacja}</td>
        
            <td>${data[index_st].rzeka}</td>
           
            <td>${data[index_st].województwo}</td>
            
            <td>${data[index_st].stan_wody} cm</td>
           
            <td>${data[index_st].stan_wody_data_pomiaru}</td>`;
    
            document.querySelector('#table__hydro--wisla').appendChild(item);

            
          })
        });

    });

    const selectStation = document.querySelector('#stacja');
   
    selectStation.addEventListener('change', () => {


        const index = selectStation.selectedIndex - 1;
        

        item.innerHTML =
       
       ` <td>${data[index].stacja}</td>
        
        <td>${data[index].rzeka}</td>
       
        <td>${data[index].województwo}</td>
        
        <td>${data[index].stan_wody} cm</td>
       
        <td>${data[index].stan_wody_data_pomiaru}</td>`;

        document.querySelector('#table__hydro--data').appendChild(item);

        document.querySelector('.option__default').selected = true;

      

    });
   
  

}).catch(err => console.log(err));

const clear = document.querySelector('.clear');

const table = document.querySelector('#table__hydro--data');

clear.addEventListener('click', () => {

    table.innerHTML = '';

});

