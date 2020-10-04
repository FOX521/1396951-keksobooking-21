(function () {
let titleForm = Window.activeMap.adForm.querySelector('#title');
let addersForm = Window.activeMap.adForm.querySelector('#address');
let roomNumber = Window.activeMap.adForm.querySelector('#room_number');
let countGuests = Window.activeMap.adForm.querySelector('#capacity');
let chooseRoom;
let chooseGuests;

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

roomNumber.addEventListener('change', function (evt) {
  evt.stopPropagation();
  chooseRoom = evt.target.value;
});

countGuests.addEventListener('change', function (evt) {
  evt.stopPropagation();
  chooseGuests = evt.target.value;
});

const compare = function () {
  if(chooseRoom < chooseGuests) {
    roomNumber.setCustomValidity('Колличества комнат не совпадает с колличеством гостей. Измените выбор');
  }
};

})();
