'use strict';
(function () {
  const CLICK_KEY = 0;
  const ENTER_KEY = 13;
  const ESC_KEY = 27;
  let form = document.querySelector(`.ad-form`);
  let mapContainer = document.querySelector(`.map__pins`);
  let index;
  let offWidth = Math.floor(mapContainer.offsetWidth);
  let StatusCode = {
    OK: 200,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    NOT_AUTORIZATION: 401,
    NOT_AVILABLE: 500
  };


  const getRandomInteger = function (min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  const getRandomItem = function (list) {
    const maxIndex = list.length - 1;
    const randomIndex = getRandomInteger(0, maxIndex);
    return list[randomIndex];

  };
  window.utill = {
    CLICK_KEY,
    ENTER_KEY,
    ESC_KEY,
    form,
    mapContainer,
    index,
    offWidth,
    getRandomInteger,
    getRandomItem,
    StatusCode
  };
})();
