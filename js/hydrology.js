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


        butChooseSt.forEach((button) => {

            button.addEventListener('click', (e) => {

                let wybrana_stacja = e.target.innerHTML;

                let index_st = data.findIndex(el => el.stacja === wybrana_stacja);

               

                const zakresy_stanow = [
                    { stacja: 'Zawichost', sredni: 235, wysoki: 415, ostrzegawczy: 480, alarmowy: 620 },
                    { stacja: 'Annopol', sredni: 220, wysoki: 342, ostrzegawczy: 500, alarmowy: 550 },
                    { stacja: 'Sandomierz', sredni: 105, wysoki: 325, ostrzegawczy: 420, alarmowy: 610 },
                    { stacja: 'Radomysl', sredni: 240, wysoki: 385, ostrzegawczy: 460, alarmowy: 620 },
                    { stacja: 'Koło', sredni: 145, wysoki: 265, ostrzegawczy: 460, alarmowy: 680 }
                ];
                let index_st_zakresy = zakresy_stanow.findIndex(el => el.stacja === wybrana_stacja);
 
                const stany = function () {
                    let st_tab = zakresy_stanow[index_st_zakresy].stacja;
                    let st_wybr = data[index_st].stacja;
                    let stan_wody = data[index_st].stan_wody;
                    let ostrz = zakresy_stanow[index_st_zakresy].ostrzegawczy;
                    let alarm = zakresy_stanow[index_st_zakresy].alarmowy;
                    let wys = zakresy_stanow[index_st_zakresy].wysoki;
                    let sred = zakresy_stanow[index_st_zakresy].sredni;

                    if (st_wybr === st_tab) {
                        if (stan_wody > alarm) {
                            return "alarmowy"
                        }
                        if (stan_wody < alarm && stan_wody >= ostrz) {
                            return "ostrzegawczy";
                        }
                        if (stan_wody < ostrz && stan_wody >= wys) {
                            return "wysoki";
                        }
                        if (stan_wody < wys && stan_wody >= sred) {
                            return "średni";
                        }
                        else {
                            return "niski"
                        };

                    }

                }


                item.innerHTML =

            `<td>${data[index_st].stacja}</td>
        
            <td>${data[index_st].rzeka}</td>
           
            <td>${data[index_st].województwo}</td>
            
            <td>${data[index_st].stan_wody} cm</td>
           
            <td>${data[index_st].stan_wody_data_pomiaru}</td>
            
            <td>${stany()}`;

            
                document.querySelector('#table__hydro--wisla').appendChild(item);

            }
            );

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

