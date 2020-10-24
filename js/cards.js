'use strict';
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
