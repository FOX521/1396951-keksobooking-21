'use strict';
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MIN_ADDRESS_LENGTH = 5;
const MAX_ADDRES_LENGTH = 30;
const MAX_PRICE = 1000000;
let resetForm = document.querySelector(`.ad-form__reset`);
let titleForm = window.activeMap.adForm.querySelector(`#title`);
let addersForm = window.activeMap.adForm.querySelector(`#address`);
let roomNumber = window.activeMap.adForm.querySelector(`#room_number`);
let countGuests = window.activeMap.adForm.querySelector(`#capacity`);
let inputTypeHouse = window.activeMap.adForm.querySelector(`#type`);
let inputPriceHouse = window.activeMap.adForm.querySelector(`#price`);
let inputTimeIn = window.activeMap.adForm.querySelector(`#timein`);
let inputTimeOut = window.activeMap.adForm.querySelector(`#timeout`);
let chooseRoom = Number(roomNumber.value);
let chooseGuests = Number(countGuests.value);

inputTimeIn.addEventListener(`change`, function () {
  inputTimeOut.value = inputTimeIn.value;
});

inputTimeOut.addEventListener(`change`, function () {
  inputTimeIn.value = inputTimeOut.value;
});

const changePriceHouse = function (evt) {
  evt.stopPropagation();
  let valueInput = evt.target.value;
  switch (valueInput) {
    case `bungalow`:
      inputPriceHouse.setAttribute(`placeholder`, `0`);
      break;
    case `flat`:
      inputPriceHouse.setAttribute(`placeholder`, `1000`);
      break;
    case `house`:
      inputPriceHouse.setAttribute(`placeholder`, `5000`);
      break;
    case `palace`:
      inputPriceHouse.setAttribute(`placeholder`, `10 000`);
      break;
  }
};

inputTypeHouse.addEventListener(`input`, changePriceHouse.bind());

inputPriceHouse.addEventListener(`input`, function (evt) {
  evt.stopPropagation();
  let valueInput = evt.target.value;
  if (valueInput >= MAX_PRICE) {
    inputPriceHouse.setCustomValidity(`Превышена максимальная стоимость!`);
  }
  inputPriceHouse.reportValidity();
});

const clearForm = function () {
  window.choisePhoto.imgAvatar.setAttribute(`src`, `img/muffin-grey.svg`);
  addersForm.setAttribute(`value`, ` `);
  window.utill.form.reset();
  window.activeMap.mapPinMain.setAttribute(`style`, `left: 570px; top: 375px;`);
  window.load.removeClonePin();
  window.cards.closeCards();
  window.activeMap.disabledMap();
  let imgFlat = window.choisePhoto.containerImgFlat.querySelector(`img`);
  if (imgFlat) {
    imgFlat.remove();
  }
};

resetForm.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  clearForm();
});

titleForm.addEventListener(`input`, function () {
  let valueLength = titleForm.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    titleForm.setCustomValidity(`Необходимо ` + (MIN_TITLE_LENGTH - valueLength) + ` символов`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleForm.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_TITLE_LENGTH) + ` символы`);
  } else {
    titleForm.setCustomValidity(``);
  }
  titleForm.reportValidity();
});

const getCoords = function (coords) {
  addersForm.setAttribute(`value`, `${coords.resultLeft}px , ${coords.resultTop}px`);
};

addersForm.addEventListener(`input`, function () {
  let valueLength = addersForm.value.length;
  if (valueLength < MIN_ADDRESS_LENGTH) {
    addersForm.setCustomValidity(`Необходимо ` + (MIN_ADDRESS_LENGTH - valueLength) + ` символов`);
  } else if (valueLength > MAX_ADDRES_LENGTH) {
    addersForm.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_ADDRES_LENGTH) + ` символы`);
  } else {
    addersForm.setCustomValidity(``);
  }
  addersForm.reportValidity();
});

roomNumber.addEventListener(`input`, function (evt) {
  evt.stopPropagation();
  chooseRoom = Number(evt.target.value);
  compare();
  roomNumber.reportValidity();
});

countGuests.addEventListener(`input`, function (evt) {
  evt.stopPropagation();
  chooseGuests = Number(evt.target.value);
  compare();
  countGuests.reportValidity();
});

const compare = function () {
  roomNumber.setCustomValidity(``);
  if (chooseRoom < chooseGuests) {
    roomNumber.setCustomValidity(`Колличества комнат не совпадает с колличеством гостей. Измените выбор`);
  }
};

window.validateForm = {
  getCoords,
  clearForm
};
