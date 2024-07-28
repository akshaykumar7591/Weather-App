const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
let tempCity = "Rajpura";


const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
// console.log(searchForm);
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");
const errorFound = document.querySelector(".error");
//

const forecast = document.querySelector(".forecast");

//  initially variables need ??

// in starting 

let currentTab = userTab;
const API_KEY = "d665b22c147e650eaaee657942dfbfaf";

currentTab.classList.add("current-tab");
grantAccessContainer.classList.add("active");
// tab switching 

const switchTab = (clickedTab)=>{
    if(clickedTab!=currentTab){
      currentTab.classList.remove("current-tab"); 
      currentTab = clickedTab;
      currentTab.classList.add("current-tab");
    
    if(!searchForm.classList.contains("active")){ // jo current h usme active to hoga
      // mean if active is not this then we willmake this remove others
     // kya search form vala container is invisible , if yes then make it visible

      userInfoContainer.classList.remove("active");
      grantAccessContainer.classList.remove("active");
      searchForm.classList.add("active");
    }

    else{
      // main phle search vale tab tha ab your weather vala active krna hai
      searchForm.classList.remove("active");
      // grantAccessContainer.classList.remove("active");
      userInfoContainer.classList.remove("active");
      getFromeSessionStorage(); // your weather , get your location

    }
  }


}

searchTab.addEventListener("click" , ()=>{
  switchTab(searchTab);
});

userTab.addEventListener("click" , ()=>{
   switchTab(userTab);
});


// check if cordinates are already present in session storage

function getFromeSessionStorage(){
   const localCoordinates = sessionStorage.getItem("user-coordinates");
   if(localCoordinates == false ){
    grantAccessContainer.classList.add("active");
   }
   else{
    const coordinates = JSON.parse(localCoordinates);
    fetchUserWeatherInfo(coordinates);
   }
}

async function fetchUserWeatherInfo(coordinates){
  const {lat , lon}  = coordinates;
  // make grantcontainer invisible
  grantAccessContainer.classList.remove("active");
  // make loader visible
  loadingScreen.classList.add("active");

  // api call
  try{
     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    //  const five = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=51dae9d59c630073adf1b7aea7643973`);
    //  const fiveData = await five.json();

     console.log(response);


     const data = await response.json(); // json  object me convert krta hai , same 

     loadingScreen.classList.remove("active"); //ab muje data milgaya hai remove krdo loadingse
     if(grantAccessContainer.classList.contains("active")){
      grantAccessContainer.classList.remove("active");
     }
     userInfoContainer.classList.add("active");
     errorFound.classList.remove("active");
     tempCity = data;

    //  console.log(fiveData?.list);
    //  fiveData?.list.map((ele , index)=>{
    //   if(index>=5) return;

    // forecast.innerHTML += ` <div class="weather-card">
    //   <div class="card-body" id="hour0">
    //       <h2 class="card-title">Today</h2>
    //       <img src=https://openweathermap.org/img/w/${ele?.weather?.[0]?.icon}.png class="card-img-top" alt="Weather Icon">
    //       <p class="card-text temperature">Temperature: ${ Math.round(ele?.main?.temp - 273.15)} °C</p>
    //       <p class="card-text temp-text">Condition: ${ele>weather?.[0]?.main}</p>
    //    </div>
    //   </div> `


    //  })

     renderWeatherInfo(data);

  }
  catch(err){
   loadingScreen.classList.remove("active");
  }
}

let flag = 1;
// Boolean flags = true;
const tempChoose = document.querySelector("[choose-temp]");

tempChoose.addEventListener('click' , ()=>{
  console.log(" click ed ");
  if(flag==1){
      flag = 2;
      tempChoose.innerText = "Kelvin";
  }else{
    flag = 1;
    tempChoose.innerText = "Celsius";
  }
  renderWeatherInfo(tempCity);

  
})


function renderWeatherInfo(weatherInfo){
   const cityName = document.querySelector("[data-cityName]");
   const countryIcon = document.querySelector("[data-countryIcon]");
   const desc = document.querySelector("[data-weatherDesc]");
   const weatherIcon = document.querySelector("[data-weatherIcon]");
   const temp = document.querySelector("[data-temp]");
   const windspeed = document.querySelector("[data-windspeed]");
   const humidity = document.querySelector("[data-humidity]");

   const cloudiness = document.querySelector("[data-cloudiness]");
   const feelsLike = document.querySelector("[data-feelLike]");
   const MaxTemp = document.querySelector("[data-tempMax]");
   const MinTemp = document.querySelector("[data-tempMin]");
  //   fetch values from weather info
  // agr optional chaining operator  json k andr vo property already h to return krdega
  // agr nhi h to undefined return krege na ki error
  // optianal chainging operator -> ?. whey we use see
  // eg -> const check  = obj.first.second // if this doesn't exist then it will give error because there might 
  // be possiblity that in first place obj.first never exist so how u are calling obj.first.second 
  // correct version->   obj.first && obj.first.second // now it will check that either obj.first exist or not if not then 
  // return undefined or null to save from error
  // but this will be leanthy use oco : ->      obj.first?.second; // fi not exist return undefined

   cityName.innerText = weatherInfo?.name;
   countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
   desc.innerText = weatherInfo?.weather?.[0]?.description;
   weatherIcon.src=`https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;

console.log(flag+ + " ");
if(flag==2){
   temp.innerText = Math.round(weatherInfo?.main?.temp- 273.15 ) + " °C";
  //  console.log(weatherInfo?.main?.feels_like)
   feelsLike.innerText = Math.round(weatherInfo?.main?.feels_like- 273.15 ) + " °C";
   MaxTemp.innerText = Math.round(weatherInfo?.main?.temp_max- 273.15 ) + " °C";
   MinTemp.innerText = Math.round(weatherInfo?.main?.temp_min- 273.15 ) + " °C";
  

}else{
  temp.innerText = (weatherInfo?.main?.temp) + " °K";
  //  console.log(we.main?.feels_like)
   feelsLike.innerText = (weatherInfo?.main?.feels_like) + " °K";
   MaxTemp.innerText = (weatherInfo?.main?.temp_max) + " °K";
   MinTemp.innerText = (weatherInfo?.main?.temp_min) + " °K";
}
  // setTimeout(()=>{
  //   if((weatherInfo?.main?.temp- 273.15)>=37 || (weatherInfo?.main?.temp)>=310 ){
  //     alert("temp too high !!!")
  //   }

  // },1000)

   windspeed.innerText = weatherInfo?.wind?.speed + " m/s";
   humidity.innerText = weatherInfo?.main?.humidity + " %";
   cloudiness.innerText = weatherInfo?.clouds?.all + " %";


   //

}

// 
function getLocation(){
  console.log("hei");
  if(navigator.geolocation){
    console.log("enter");
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  else{
    alert("no location ");
  }
  // grantAccessContainer.style.display="none";
}

function showPosition(position){
  console.log("position -> ");
  const userCoordinates = {
    lat : position.coords.latitude , 
    lon: position.coords.longitude ,
  }
  console.log(userCoordinates);
  sessionStorage.setItem("user-coordinates" , JSON.stringify(userCoordinates));
  fetchUserWeatherInfo(userCoordinates);
}

const grantAccessButton = document.querySelector("[data-grantAccess]");

grantAccessButton.addEventListener("click" , getLocation);
// 

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("click" , (e)=>{
  e.preventDefault();
  console.log("haha " , searchForm);
  let cityName = searchInput.value;

  if(cityName==="") return;
  else{

    fetchSearchWeatherInfo(cityName);
  }
});

async function fetchSearchWeatherInfo(city){

  loadingScreen.classList.add("active");
  userInfoContainer.classList.remove("active");
  grantAccessContainer.classList.remove("active");

  try{
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    const data = await response.json();

    if(data.cod == '404'){
      errorFound.classList.add("active");
      loadingScreen.classList.remove("active");
      return;
    }
    loadingScreen.classList.remove("active");
    errorFound.classList.remove("active");
    userInfoContainer.classList.add("active");
    tempCity=data;
    renderWeatherInfo(data)
  }
  catch(er){
    alert(er);
  }

}

setInterval(()=>{
  // console.log(" dek h");
  renderWeatherInfo(tempCity);
} , 50000);