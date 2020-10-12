'use strict';
(function () {
let resetForm = document.querySelector('.ad-form__reset');
let titleForm = Window.activeMap.adForm.querySelector('#title');
let addersForm = Window.activeMap.adForm.querySelector('#address');
let roomNumber = Window.activeMap.adForm.querySelector('#room_number');
let countGuests = Window.activeMap.adForm.querySelector('#capacity');
let chooseRoom = Number(roomNumber.value);
let chooseGuests = Number(countGuests.value);

resetForm.addEventListener('click', function (evt) {
  evt.preventDefault();
  window.upload.clearForm();
})

titleForm.addEventListener('input', function () {
  let valueLength = titleForm.value.length;
  if(valueLength < MIN_TITLE_LENGTH) {
    titleForm.setCustomValidity('Необходимо ' + (MIN_TITLE_LENGTH - valueLength) + ' символов');
    } else if (valueLength > MAX_TITLE_LENGTH) {
      titleForm.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' символы');
    } else {
      titleForm.setCustomValidity('');
    }
  titleForm.reportValidity();
 });

 const setAdress = function (coords) {
  addersForm.setAttribute('value', `Координаты вертикально ${coords.resultTop}px Координаты горизонта ${coords.resultLeft}px`);
 }

addersForm.addEventListener('input', function() {
  let valueLength = addersForm.value.length;
  if (valueLength < MIN_ADDRES_LENGTH) {
    addersForm.setCustomValidity('Необходимо ' + (MIN_ADDRES_LENGTH - valueLength) + ' символов');
    }  else if (valueLength > MAX_ADDRES_LENGTH) {
      addersForm.setCustomValidity('Удалите лишние ' + (valueLength - MAX_ADDRES_LENGTH) + ' символы');
    }  else {
      addersForm.setCustomValidity('');
    }
  addersForm.reportValidity();
});

roomNumber.addEventListener('input', function (evt) {
  evt.stopPropagation();
  chooseRoom = Number(evt.target.value);
  compare();
  roomNumber.reportValidity();
});

countGuests.addEventListener('input', function (evt) {
  evt.stopPropagation();
  chooseGuests = Number(evt.target.value);
  compare();
  countGuests.reportValidity();
});

const compare = function () {
  roomNumber.setCustomValidity('');
  if(chooseRoom < chooseGuests) {
    roomNumber.setCustomValidity('Колличества комнат не совпадает с колличеством гостей. Измените выбор');
  }
};

window.validateForm = {
  setAdress
}
})();
