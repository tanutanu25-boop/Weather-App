
let darkMode = false;
let chart;


document.body.style.background = "#dff6ff";


let header = document.createElement("header");
header.style.cssText = `
display:flex;
justify-content:space-between;
padding:15px;
background:#ffffffaa;
align-items:center;
`;

let title = document.createElement("h2");
title.innerText = "🌤 Weather App";
title.style.color = "#0a3d62";

let toggleBtn = document.createElement("button");
toggleBtn.innerText = "🌙";
toggleBtn.style.padding = "8px";
toggleBtn.onclick = toggleMode;

header.appendChild(title);
header.appendChild(toggleBtn);
document.body.appendChild(header);


let cloud = document.createElement("div");
cloud.innerText = "☁️";
cloud.style.position = "absolute";
cloud.style.fontSize = "40px";
cloud.style.top = "80px";
cloud.style.left = "-100px";
cloud.style.animation = "moveCloud 12s linear infinite";
document.body.appendChild(cloud);


let searchDiv = document.createElement("div");
searchDiv.style.textAlign = "center";
searchDiv.style.margin = "20px";

let input = document.createElement("input");
input.placeholder = "Enter city...";
input.style.padding = "10px";

let btn = document.createElement("button");
btn.innerText = "Search";
btn.style.padding = "10px";
btn.onclick = getWeather;

searchDiv.appendChild(input);
searchDiv.appendChild(btn);
document.body.appendChild(searchDiv);


let card = document.createElement("div");
card.style.cssText = `
width:300px;
margin:auto;
padding:20px;
text-align:center;
background:#ffffffaa;
border-radius:15px;
`;

let cityName = document.createElement("h2");
let temp = document.createElement("h1");
let desc = document.createElement("p");

cityName.innerText = "City";
temp.innerText = "--°C";

card.appendChild(cityName);
card.appendChild(temp);
card.appendChild(desc);

document.body.appendChild(card);

let canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.style.width = "90%";
canvas.style.maxWidth = "500px";
canvas.style.display = "block";
canvas.style.margin = "30px auto";


function toggleMode(){
  darkMode = !darkMode;

  if(darkMode){
    document.body.style.background = "#0a1f44";
    header.style.background = "#001f3f";
    title.style.color = "white";
  } else {
    document.body.style.background = "#dff6ff";
    header.style.background = "#ffffffaa";
    title.style.color = "#0a3d62";
  }
}

async function getWeather(){
  let city = input.value;

  let geo = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
  );
  let geoData = await geo.json();

  if(!geoData.results){
    alert("City not found");
    return;
  }

  let {latitude, longitude, name} = geoData.results[0];

  let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m`;

  let res = await fetch(url);
  let data = await res.json();

  let t = data.current_weather.temperature;

  cityName.innerText = name;
  temp.innerText = t + "°C";

  if(t > 30){
    desc.innerText = "☀ Hot Weather";
    document.body.style.background = "linear-gradient(135deg,#ffeaa7,#fab1a0)";
  }
  else if(t > 20){
    desc.innerText = "🌤 Normal Weather";
  }
  else{
    desc.innerText = "❄ Cold Weather";
  }

 
  let labels = data.hourly.time.slice(0,10).map(t=>t.split("T")[1]);
  let temps = data.hourly.temperature_2m.slice(0,10);

  if(chart) chart.destroy();

  chart = new Chart(canvas, {
    type:"line",
    data:{
      labels:labels,
      datasets:[{
        label:"Temperature",
        data:temps,
        borderColor:"#1e90ff",
        fill:false
      }]
    }
  });
}
