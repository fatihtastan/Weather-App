const img = document.querySelector("img");
const cityName = document.querySelector(".form-control");
const submit = document.querySelector(".submit");
const renderCondition = document.querySelector(".renderCondition");
let imgSrc;
let dataArr = [];
submit.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=972504508368f4bcc389de16795f2cb4&units=metric`
    );
    response = await response.json();
    let gifResponse = await fetch(
      "https://api.giphy.com/v1/gifs/translate?api_key=bb2006d9d3454578be1a99cfad65913d&s=cat"
    );
    gifResponse = await gifResponse.json();
    console.log(gifResponse);
    imgSrc = gifResponse.data.images.original.url;
    renderAll(response, imgSrc);
  } catch (e) {
    console.log(e);
  }

  // fetch(
  //   `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=972504508368f4bcc389de16795f2cb4&units=metric`
  // )
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     fetch(
  //       "https://api.giphy.com/v1/gifs/translate?api_key=bb2006d9d3454578be1a99cfad65913d&s=cat"
  //     )
  //       .then(function (gifResponse) {
  //         return gifResponse.json();
  //       })
  //       .then(function (gifResponse) {
  //         imgSrc = gifResponse.data.images.original.url;
  //         renderAll(data, imgSrc);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   })
  //   .catch((e) => {
  //     alert("Please control the city name!");
  //   });

  cityName.value = "";
});

const renderAll = (data, imgSrc) => {
  dataArr = [];

  dataArr.push(data.weather[0].main);
  dataArr.push(data.main.temp);
  dataArr.push(data.wind.speed);
  dataArr.push(data.name);
  console.log(dataArr);

  renderCondition.innerHTML = "";
  let div = document.createElement("div");

  div.classList.add("card", "col-6", "bg-transparent", "border-0");
  div.innerHTML = `
  <img src="${imgSrc}" class="card-img-top img-fluid mx-auto " alt="...">
  <div class="card-body text-center ">
      <h5 class="card-title text-primary fw-bold  text-uppercase fs-4">${dataArr[3]}</h5>
  </div>
  <ul class="list-group list-group-flush text-danger fw-bold text-center text-uppercase fs-4">
      <li class="list-group-item border-white border-bottom-4 bg-transparent">Weather Description: ${dataArr[0]}
      </li>
      <li class="list-group-item border-white border-bottom-4 bg-transparent">Temperature: ${dataArr[1]}
      </li>
      <li class="list-group-item mb-2 border-white border-bottom-4 bg-transparent">Wind: ${dataArr[2]}</li>
  </ul>
  `;
  renderCondition.appendChild(div);
};

// fetch(
//   "https://api.giphy.com/v1/gifs/translate?api_key=bb2006d9d3454578be1a99cfad65913d&s=cat"
// )
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (response) {
//     img.src = response.data.images.original.url;
//   })
//   .catch((e) => {
//     console.log(e);
//   });
