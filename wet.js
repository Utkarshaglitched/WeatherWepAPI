
let Searching=document.getElementById('cityname');
let tempdoc=document.getElementById('temperature');
let emote=document.getElementById('Emoji');
let CloudConsidtion=document.getElementById('CloudConsidtion');
let deg1=document.getElementById('degree');
let MaxTemp=document.getElementById('degmax');
let MinTemp=document.getElementById('degmin');
let tempfeeling=document.getElementById('degfeel');
let speeding=document.getElementById('degspeed');
let Thextra=document.getElementById('details');
let Dhundhna=document.getElementById('FindIcon');
let place=document.getElementById('Name');
let xtraDetails=document.getElementById('NewDetails');

let Sunup=document.querySelector('#sunrise p');
let Sundown=document.querySelector('#sunset p');
let Humid=document.querySelector('#Humidity p');
let Sea=document.querySelector('#SeaLevel p');

console.log(Sundown);
let Sflag=true;
Dhundhna.addEventListener('click',()=>{
    if(Sflag){
        Searching.classList.remove("Sclose");
        Searching.classList.add("Sopen");
        Searching.style.display="inline-block";
        
    }
    else{
        Searching.classList.remove("Sopen");
        Searching.classList.add("Sclose");
        setTimeout(()=>{
            Searching.style.display="none";
        },300);

    }
    Sflag=!Sflag;
})
TheWetherFunc=(city)=>{
    let Weather = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b3d5970cbe7d07011610d95be3bf3052&units=metric`);
    
    
    Weather.then((returned) => {
        return returned.json();
    }).then((val) => {
        console.log(val);
        let inTemp=val.main.temp;
        tempdoc.innerText=String(inTemp);
        
        let iconName=val.weather[0].icon;
        emote.style.backgroundImage= `url(https://openweathermap.org/img/wn/${iconName}@2x.png)`;
        emote.style.backgroundSize= "cover";
        let cldcnd=val.weather[0].description;
        CloudConsidtion.innerText=cldcnd;
        Humid.innerText=String(val.main.humidity)+"%";
        Sea.innerText=String(val.main.sea_level)+"hpa";

        let TimeOfSunrise=new Date((val.sys.sunrise)*1000);
        let TimeOfSunset=new Date((val.sys.sunset)*1000);
        Sunup.innerText=TimeOfSunrise.toLocaleTimeString();
        Sundown.innerText=TimeOfSunset.toLocaleTimeString();
        
        xtraDetails.style.display="grid";

        Thextra.style.display="grid";
        deg1.style.display="inline-block";
        MaxTemp.innerText=String(val.main.temp_max)+"°C";
        MinTemp.innerText=String(val.main.temp_min)+"°C";
        tempfeeling.innerText=String(val.main.feels_like)+"°C";
        speeding.innerText=String(val.wind.speed)+"m/s";

        place.innerText=val.name;
    }).catch((err) => {
        console.log(err);
    })
}

document.addEventListener('keydown',(pressed)=>{
    if(pressed.key==="Enter"){
        let cnvrt=String(Searching.value.trim());
        TheWetherFunc(cnvrt);
    }
})


