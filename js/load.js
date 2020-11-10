'use strict';
const onError = function () {
};
let RESPONSE_TIMEOUT = 5000;
let xhr = new XMLHttpRequest();
let success = `#success`;
let error = `#error`;
let element = `div`;
let cloneBanner;
const loadData = function () {
  xhr.addEventListener(`load`, function () {
    let errorMessage;
    switch (xhr.status) {
      case window.utill.StatusCode.OK:
        window.DATA_OFFER = JSON.parse(xhr.responseText);
        window.sortOffers = window.DATA_OFFER;
        break;
      case window.utill.StatusCode.BAD_REQUEST:
        errorMessage = `Неверный запрос`;
        break;
      case window.utill.StatusCode.NOT_AUTORIZATION:
        errorMessage = `Пользователь не авторизован`;
        break;
      case window.utill.StatusCode.NOT_FOUND:
        errorMessage = `Ничего не найдено`;
        break;
      default:
        errorMessage = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
    }
    if (errorMessage) {
      onError(errorMessage);
    }
  });
  xhr.addEventListener(`errorMessage`, function () {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });
  xhr.timeout = RESPONSE_TIMEOUT;
  xhr.open(`GET`, `https://21.javascript.pages.academy/keksobooking/data`);
  xhr.send();
};

const removeClonePin = function () {
  window.makePin.items.forEach((removeElement) => removeElement.remove());
};

window.utill.form.addEventListener(`submit`, function (evt) {
  evt.preventDefault();
  let formData = new FormData(window.utill.form);
  let xhrequest = new XMLHttpRequest();
  xhrequest.responseType = `json`;
  xhrequest.open(`POST`, `https://21.javascript.pages.academy/keksobooking`);
  xhrequest.send(formData);
  xhrequest.addEventListener(`load`, function () {
    switch (xhrequest.status) {
      case window.utill.StatusCode.OK:
        getCloneBanner(success, element);
        break;
      case window.utill.StatusCode.BAD_REQUEST:
        getCloneBanner(error, element);
        break;
      case window.utill.StatusCode.NOT_AVILABLE:
        getCloneBanner(error, element);
        break;
    }
  });
  window.activeMap.disabledMap();
  window.cards.closeCards();
  window.validateForm.clearForm();
});

const getCloneBanner = function (getId, getElement) {
  let templateBanner = document.querySelector(getId).content;
  let elementBanner = templateBanner.querySelector(getElement);
  cloneBanner = elementBanner.cloneNode(true);
  window.utill.form.appendChild(cloneBanner);
  if (getId === error) {
    addListeners(error);
  } else if (getId === success) {
    addListeners(success);
  }
};

const removePopup = function (removeElement) {
  removeElement.remove();
};

const closePopup = function () {
  document.addEventListener(`keydown`, function onKeyDownPopupClose(evt) {
    if (evt.keyCode === window.utill.ESC_KEY || evt.keyCode === window.utill.ENTER_KEY) {
      evt.preventDefault();
      removePopup(cloneBanner);
      window.validateForm.clearForm();
      document.removeEventListener(`keydown`, onKeyDownPopupClose);
    }
  });

  document.addEventListener(`click`, function onClickPopupClose(evt) {
    evt.preventDefault();
    removePopup(cloneBanner);
    window.validateForm.clearForm();
    document.removeEventListener(`click`, onClickPopupClose);
  });
};

const addListeners = function (typeMessage) {
  closePopup();
  if (typeMessage === error) {
    let buttonAgain = document.querySelector(`.error__button`);
    buttonAgain.addEventListener(`click`, function (evt) {
      evt.preventDefault();
      closePopup();
    });
  } else if (typeMessage === success) {
    closePopup();
  }
  window.load.removeClonePin();
};

window.load = {
  removeClonePin,
  loadData
};
