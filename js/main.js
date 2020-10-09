'use strict';
const MIN_TITLE_LENGTH = 10;
const MAX_TITLE_LENGTH = 50;
const MIN_ADDRES_LENGTH = 5;
const MAX_ADDRES_LENGTH = 20;
let mapContainer = document.querySelector('.map__pins');
let form = document.querySelector('.ad-form');
let offWidth = Math.floor(mapContainer.offsetWidth);
let index;
let dataOffer = [];

const getRandomInteger = function (min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

const  getRandomItem = function(list) {
  const maxIndex = list.length - 1;
  const randomIndex = getRandomInteger(0, maxIndex);
  return list[randomIndex];
}

