'use strict';
(function () {
  let form = document.querySelector(`.ad-form`);
  let mapContainer = document.querySelector(`.map__pins`);
  let index;
  let offWidth = Math.floor(mapContainer.offsetWidth);


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
    form: form,
    mapContainer: mapContainer,
    index: index,
    offWidth: offWidth,
    getRandomInteger: getRandomInteger,
    getRandomItem: getRandomItem
  };
})();
