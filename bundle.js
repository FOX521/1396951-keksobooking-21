/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!*********************!*\
  !*** ./js/utill.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

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
  }
})()

})();

(() => {
/*!***********************!*\
  !*** ./js/makePin.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

(function () {
  let items = [];
  const makeElement = function (tagName, className) {
    let element = document.createElement(tagName);
    element.classList.add(className);
    return element;
  };

  const createObj = function (newObject) {
    let objectItem = makeElement(`button`, `map__pin`);
    let picture = makeElement(`img`, `map__pin--img`);
    picture.setAttribute(`alt`, newObject.offer.title);
    picture.setAttribute(`src`, newObject.author.avatar);
    picture.setAttribute(`width`, `40`);
    picture.setAttribute(`height`, `40`);
    picture.setAttribute(`data-index`, window.utill.index);
    objectItem.appendChild(picture);
    objectItem.setAttribute(`style`, `left:${newObject.location.x}px; top: ${newObject.location.y}px`);
    objectItem.setAttribute(`data-index`, window.utill.index);
    return objectItem;
  };

  let makeOffer = function (dataArray) {
    const maxCount = dataArray.length >= 5 ? 5 : dataArray.length;
    for (let i = 0; i < maxCount; i++) {
      window.utill.index = i;
      items[i] = createObj(dataArray[i]);
      window.utill.mapContainer.appendChild(items[i]);
    }
  };

  window.makePin = {
    makeOffer: makeOffer,
    makeElement: makeElement,
    items: items
  };
})();

})();

(() => {
/*!**************************!*\
  !*** ./js/active-map.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

(function () {
  let adForm = document.querySelector(`.ad-form`);
  let fieldsetForm = adForm.querySelectorAll(`fieldset`);
  let mainMap = document.querySelector(`.map`);
  let mapPinMain = window.utill.mapContainer.querySelector(`.map__pin--main`);
  let mapFilters = document.querySelector(`.map__filters`);
  let selectMapFilters = mapFilters.querySelectorAll(`select`);
  let fieldsetMapFilters = mapFilters.querySelectorAll(`fieldset`);
  let inputCoords = adForm.querySelector(`#address`);

  const disabledMap = function () {
    for (let i = 0; i < fieldsetForm.length; i++) {
      fieldsetForm[i].setAttribute(`disabled`, `disabled`);
    }
    for (let i = 0; i < selectMapFilters.length; i++) {
      selectMapFilters[i].setAttribute(`disabled`, `disabled`);
    }
    for (let i = 0; i < fieldsetMapFilters.length; i++) {
      fieldsetMapFilters[i].setAttribute(`disabled`, `disabled`);
    }
    mainMap.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);

    mapPinMain.addEventListener(`mousedown`, function handler (evt) {
      if (evt.button === 0) {
        activeMap();
        mapPinMain.removeEventListener(`mousedown`, handler);
      }
    });
  };

  disabledMap();

  mapPinMain.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === 13) {
      activeMap();
    }
  });

  const activeMap = function () {
    mainMap.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    for (let i = 0; i < fieldsetForm.length; i++) {
      fieldsetForm[i].removeAttribute(`disabled`);
    }
    for (let i = 0; i < selectMapFilters.length; i++) {
      selectMapFilters[i].removeAttribute(`disabled`);
    }
    for (let i = 0; i < fieldsetMapFilters.length; i++) {
      fieldsetMapFilters[i].removeAttribute(`disabled`);
    }
    window.makePin.makeOffer(window.DATA_OFFER);
  };


  window.activeMap = {
    adForm: adForm,
    disabledMap: disabledMap
  };
})();

})();

(() => {
/*!************************!*\
  !*** ./js/move-pin.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

(function () {
  let buttonPin = window.utill.mapContainer.querySelector(`button`);
  buttonPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();
    let resultTop = buttonPin.offsetTop;
    let resultLeft = buttonPin.offsetLeft;
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      resultTop = Math.floor(buttonPin.offsetTop - shift.y);
      resultLeft = Math.floor(buttonPin.offsetLeft - shift.x);
      if (!(resultTop < 130 || resultTop > 630)) {
        buttonPin.style.top = resultTop + `px`;
      }
      buttonPin.style.left = resultLeft + `px`;
      window.validateForm.setAdress({
        resultTop,
        resultLeft
      });
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.validateForm.setAdress({
        resultTop,
        resultLeft
      });
      window.utill.mapContainer.removeEventListener(`mousemove`, onMouseMove);
      window.utill.mapContainer.removeEventListener(`mouseup`, onMouseUp);
    };
    
    window.utill.mapContainer.addEventListener(`mousemove`, onMouseMove);
    window.utill.mapContainer.addEventListener(`mouseup`, onMouseUp);
  });
})();

})();

(() => {
/*!*****************************!*\
  !*** ./js/validate-form.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

(function () {
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const MIN_ADDRES_LENGTH = 5;
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

  inputTimeIn.addEventListener('change', function() {
    let selected = this.value;
    inputTimeOut.value = selected;
  });

  inputTimeOut.addEventListener('change', function() {
    let selected = this.value;
    inputTimeIn.value = selected;
  })

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
      };
  };

  inputTypeHouse.addEventListener(`input`, changePriceHouse.bind());

  inputPriceHouse.addEventListener(`input`, function (evt) {
    evt.stopPropagation();
    let valueInput = evt.target.value;
    console.log(valueInput)
    if (valueInput >= MAX_PRICE) {
      inputPriceHouse.setCustomValidity(`Превышена максимальная стоимость!`);
    }
    inputPriceHouse.reportValidity();
  });

  const clearForm = function () {
    window.utill.form.reset();
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

  const setAdress = function (coords) {
    addersForm.setAttribute(`value`, `${coords.resultLeft}px расстояние до острого конца по горизонтали, ${coords.resultTop}px расстояние до острого конца по вертикали`);
  };

  addersForm.addEventListener(`input`, function () {
    let valueLength = addersForm.value.length;
    if (valueLength < MIN_ADDRES_LENGTH) {
      addersForm.setCustomValidity(`Необходимо ` + (MIN_ADDRES_LENGTH - valueLength) + ` символов`);
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
    setAdress: setAdress,
    clearForm: clearForm
  };
})();

})();

(() => {
/*!*********************!*\
  !*** ./js/cards.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

(function () {
  let newCloneElement;
  const POPUP_CLOSE = `popup__close`;
  let popup;
  let flatElement;
  const typeTOFlat = {
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`,
    palace: `Дворец`
  };

  // const featuresTOflat = {
  //   wifi: wifi,
  //   dishwasher: dishwasher,
  //   parking: parking,
  //   washer: parking,
  //   elevator: elevator,
  //   conditioner: conditioner
  // }
  window.utill.mapContainer.addEventListener(`click`, function (evt) {
    if (evt.target.className === `map__pin` || evt.target.className === `map__pin--img`) {
      window.utill.index = Number(evt.target.getAttribute(`data-index`));
      closeCards();
      if (window.sortOffer) {
        getClone(window.sortOffer);
      }
    } else if (evt.target.className === POPUP_CLOSE) {
      popup = evt.target.closest(`.popup`);
      popup.remove();
    }
  });
  const closeCards = function () {
    document.querySelectorAll(`.popup`).forEach((card) => card.remove());
  };
  const addInfo = function (newCloneInfo, dataArray) {
    flatElement = dataArray[window.utill.index];
    newCloneInfo.querySelector(`H3`).textContent = flatElement.offer.title;
    newCloneInfo.querySelector(`.popup__text--address`).textContent = flatElement.offer.address;
    newCloneInfo.querySelector(`.popup__text--price`).textContent = flatElement.offer.price + ` ₽/ночь`;
    newCloneInfo.querySelector(`.popup__type`).textContent = typeTOFlat[flatElement.offer.type];
    newCloneInfo.querySelector(`.popup__text--capacity`).textContent = flatElement.offer.rooms + ` комнаты для ` + flatElement.offer.guests + ` гостей`;
    newCloneInfo.querySelector(`.popup__text--time`).textContent = `Заезд после ` + flatElement.offer.checkin + ` , выезд до ` + flatElement.offer.checkout;
    newCloneInfo.querySelector(`.popup__features`).textContent = flatElement.offer.features;
    newCloneInfo.querySelector(`.popup__description`).textContent = flatElement.offer.description;
    newCloneInfo.querySelector(`.popup__photo`).setAttribute(`src`, window.utill.getRandomItem(flatElement.offer.photos));
    newCloneInfo.querySelector(`.popup__avatar`).setAttribute(`src`, flatElement.author.avatar);
    return newCloneInfo;
  };
  const getClone = function (data) {
    let templateCard = document.querySelector(`#card`).content;
    let element = templateCard.querySelector(`article`);
    let cloneElement = element.cloneNode(true);
    newCloneElement = addInfo(cloneElement, data);
    window.utill.mapContainer.appendChild(newCloneElement);
  };
  window.cards = {
    getClone: getClone,
    addInfo: addInfo,
    flatElement: flatElement,
    closeCards: closeCards
  }
})();

})();

(() => {
/*!********************!*\
  !*** ./js/load.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

(function () {
  let xhr = new XMLHttpRequest();
  const onError = function (error) {
    console.log(error);
  };
  const onSucces = function (animals) {
  };
  xhr.addEventListener(`load`, function () {
    let error;
    switch (xhr.status) {
      case 200:
        onSucces(xhr.response);
        window.DATA_OFFER = JSON.parse(xhr.responseText);
        window.sortOffer = DATA_OFFER;
        break;
      case 400:
        error = `Неверный запрос`;
        break;
      case 401:
        error = `Пользователь не авторизован`;
        break;
      case 404:
        error = `Ничего не найдено`;
        break;
      default:
        error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
    }
    if (error) {
      onError(error);
    }
  });
  xhr.addEventListener(`error`, function () {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });
  xhr.timeout = 5000;
  xhr.open(`GET`, `https://21.javascript.pages.academy/keksobooking/data`);
  xhr.send();
})();

})();

(() => {
/*!**********************!*\
  !*** ./js/upload.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

(function () {
  let success = `#success`;
  let error = `#error`;
  let element = `div`;
  let cloneBanner;

  window.utill.form.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    let formData = new FormData(window.utill.form);
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(`POST`, `https://21.javascript.pages.academy/keksobooking`);
    xhr.send(formData);
    xhr.addEventListener(`load`, function () {
      switch (xhr.status) {
        case 200:
          getCloneBanner(success, element);
          break;
        case 400:
          getCloneBanner(error, element);
          break;
        case 500:
          getCloneBanner(error, element);
          break;
      }
    });
    window.activeMap.disabledMap();
    window.upload.removeClonePin();
    window.cards.closeCards();
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

  const removeClonePin = function () {
    window.makePin.items.forEach((removeElement) => removeElement.remove());
  };

  const closePopup = function () {
    document.addEventListener(`keydown`, function (evt) {
      if (evt.keyCode === 27 || evt.keyCode === 13) {
        evt.preventDefault();
        removePopup(cloneBanner);
      }
    });
    document.addEventListener(`click`, function (evt) {
      evt.preventDefault();
      removePopup(cloneBanner);
    });
  };

  const addListeners = function (typeMessage) {
    if (typeMessage === error) {
      let buttonAgain = document.querySelector(`.error__button`);
      buttonAgain.addEventListener(`click`, function removePopup (evt) {
        evt.preventDefault();
        removePopup(cloneBanner);
      });
      closePopup();
      buttonAgain.removeEventListener(`click`, removePopup);
    } else if (typeMessage === success) {
      closePopup();
    }
    window.upload.removeClonePin();
    window.validateForm.clearForm();
  };

  const removePopup = function (removeElement) {
    removeElement.remove();
  };

  window.upload = {
    removeClonePin: removeClonePin
  }
})();

})();

(() => {
/*!*****************************!*\
  !*** ./js/similar-offer.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

(function () {
  let inputTypeHouse = `housing-type`;
  let inputPriceHouse = `housing-price`;
  let inputCountRooms = `housing-rooms`;
  let inputCountGuests = `housing-guests`;
  let checkboxWifi = `filter-wifi`;
  let checkboxDish = `filter-dishwasher`;
  let checkboxParking = `filter-parking`;
  let checkboxWasher = `filter-washer`;
  let checkboxElevator =`filter-elevator`;
  let checkboxCondi =`filter-conditioner`;
  let mapFilters = document.querySelector(`.map__filters`);
  let countGuests;
  let countRooms;
  let typeHouse;
  let priceHouse;
  let isfeatures = [];

  const comparePrice = function (compareValue) {
    if (compareValue < 10000) {
      return `low`;
    }
    if (compareValue >= 10000 && compareValue <= 50000 ) {
      return `middle`;
    }if (compareValue > 50000) {
      return `high`;
    }
  }

  const getRank = function (offer) {
    let rank = 1;

    if (typeHouse && typeHouse !== 'any') {
      rank = offer.offer.type === typeHouse ? rank * 2 : 0;
    }
    if (countRooms && countRooms !== 'any') {
      rank = offer.offer.rooms === Number(countRooms) ? rank * 2 : 0;
    }
    if (countGuests && countGuests !== 'any') {
      rank = offer.offer.guests === countGuests ? rank * 2 : 0;
    }
    if (priceHouse && priceHouse !== 'any') {
      rank = comparePrice(offer.offer.price) === priceHouse ? rank * 2 : 0;
    }
    return rank;
  };

  const getSortOffer = function () {
    window.sortOffer = [];
    window.sortOffer = window.DATA_OFFER.filter((el) => getRank(el) > 0);
    window.upload.removeClonePin();
    window.cards.closeCards();
    console.log(sortOffer);
    window.makePin.makeOffer(sortOffer);
    window.cards.getClone(sortOffer);
    window.cards.closeCards();
  };

  mapFilters.addEventListener(`change`, function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    let classNameInput = evt.target.id;
    switch (classNameInput) {
      case inputTypeHouse:
        typeHouse = evt.target.value;
      break;
      case inputPriceHouse:
        priceHouse = evt.target.value;
      break;
      case inputCountRooms:
        countRooms = Number(evt.target.value);
      break;
      case inputCountGuests:
        countGuests = Number(evt.target.value);
      break;
      case checkboxWifi:
        isfeatures.push(evt.target.value);
      break;
      case checkboxDish:
        isfeatures.push(evt.target.value);
      break;
      case checkboxWasher:
        isfeatures.push(evt.target.value);
      break;
      case checkboxElevator:
        isfeatures.push(evt.target.value);
      break;
      case checkboxCondi:
        isfeatures.push(evt.target.value);
      break;
      case checkboxParking:
        isfeatures.push(evt.target.value);
      break;

    }
    getSortOffer();
    console.log(isfeatures)
  });
})();

})();

/******/ })()
;