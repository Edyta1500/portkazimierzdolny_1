export class Cookies{

    constructor(){
        this.checkCookieEnabled();
    }
    //sprawszanie,  czy jest włączona obsługa ciasteczek -jeżeli są wyłączone to wyskakuje alert
    checkCookieEnabled(){
       
        if(!navigator.cookieEnabled){
            alert('Masz wyłączoną obsługę ciasteczek');
            return;
        }

    }
//tworzenie ciasteczka i umieszczanie go
    setCookie(options){
        const option = {
            name: options.name || 'test',
            value: options.value || ' wartość teststowa',
            days: options.days,
            domain: options.domain,
            path: options.path,
            secure: options.secure,
        } 

        const cookieName = encodeURIComponent(option.name);
        
        const cookieVal = encodeURIComponent(option.value);

        const cookieSettingsTab = [];
        
        cookieSettingsTab.push(`${cookieName} = ${cookieVal}`);


        if(typeof option.days === 'number'){

            const date = new Date();

            date.setTime(date.getTime() + (option.days * 24 * 60 * 60 * 1000));

            cookieSettingsTab.push(`expires = ${date.toGMTString()}`);

        
        }

        if(option.path){

            cookieSettingsTab.push(`path= ${option.path}`);
        }

        if(option.domain){
            cookieSettingsTab.push(`path = ${option.domain}`);

        }
        if(option.secure){
            cookieSettingsTab.push(`secure = ${option.secure}`);
        }

        document.cookie = cookieSettingsTab.join(';');

        
    
    }
//pobieranie ciasteczka
    getCookie(name){
        if(document.cookie != '') {

            const cookies = document.cookie.split(/; */);

            for(let i = 0; cookies.length; i++){
                const cookieName = cookies[i].split('=')[0];
                const cookieVal = cookies[i].split('=')[1];

                if(cookieName === decodeURIComponent(name)){
                    return cookieVal;
                }
            }
        }
    }



//usunięcie ciasteczka przez jego antydatowanie
    removeCookie(name){
        this.setCookie({
            name: name,
            days:-1,
        })
    }


}
