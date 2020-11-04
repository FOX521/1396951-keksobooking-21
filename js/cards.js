'use strict';
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

  window.utill.mapContainer.addEventListener(`click`, function (evt) {
    if (evt.target.className === `map__pin` || evt.target.className === `map__pin--img`) {
      window.utill.index = Number(evt.target.getAttribute(`data-index`));
      closeCards();
      if (window.sortOffers) {
        getClone(window.sortOffers);
      }
    } else if (evt.target.className === POPUP_CLOSE) {
      popup = evt.target.closest(`.popup`);
      popup.remove();
    }
  });

  window.utill.mapContainer.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === window.utill.ESC_KEY) {
      closeCards();
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
    newCloneInfo.querySelector(`.popup__description`).textContent = flatElement.offer.description;
    newCloneInfo.querySelector(`.popup__avatar`).setAttribute(`src`, flatElement.author.avatar);
    newCloneInfo.querySelector(`.popup__features`).textContent = ``;

    for (let i = 0; i < flatElement.offer.features.length; i++) {
      let imgFeatures = flatElement.offer.features[i];
      let elrmentFeatures = window.makePin.makeElement(`li`, `popup__feature`);
      elrmentFeatures.setAttribute(`width`, `20`);
      elrmentFeatures.setAttribute(`height`, `20`);
      elrmentFeatures.classList.add(`popup__feature` + `--` + `${imgFeatures}`);
      newCloneInfo.querySelector(`.popup__features`).appendChild(elrmentFeatures);
    }

    newCloneInfo.querySelector(`.popup__photo`).remove();

    for (let i = 0; i < flatElement.offer.photos.length; i++) {
      let photoValue;
      let photoItem = window.makePin.makeElement(`img`, `popup__photo`);
      photoValue = flatElement.offer.photos[i];
      photoItem.setAttribute(`src`, photoValue);
      photoItem.setAttribute(`width`, `45`);
      photoItem.setAttribute(`height`, `40`);
      newCloneInfo.querySelector(`.popup__photos`).appendChild(photoItem);
    }
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
    getClone,
    addInfo,
    flatElement,
    closeCards
  };
