'use strict';
(function () {
  let inputTypeHouse = `housing-type`;
  let inputPriceHouse = `housing-price`;
  let inputCountRooms = `housing-rooms`;
  let inputCountGuests = `housing-guests`;
  let checkboxWifi = `filter-wifi`;
  let checkboxDish = `filter-dishwasher`;
  let checkboxParking = `filter-parking`;
  let checkboxWasher = `filter-washer`;
  let checkboxElevator = `filter-elevator`;
  let checkboxCondi = `filter-conditioner`;
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
    if (compareValue >= 10000 && compareValue <= 50000) {
      return `middle`;
    }
    if (compareValue > 50000) {
      return `high`;
    }
    return undefined;
  };

  const getRank = function (offer) {
    let rank = 1;

    if (typeHouse && typeHouse !== `any`) {
      rank = offer.offer.type === typeHouse ? rank * 2 : 0;
    }
    if (countRooms && countRooms !== `any`) {
      rank = offer.offer.rooms === Number(countRooms) ? rank * 2 : 0;
    }
    if (countGuests && countGuests !== `any`) {
      rank = offer.offer.guests === countGuests ? rank * 2 : 0;
    }
    if (priceHouse && priceHouse !== `any`) {
      rank = comparePrice(offer.offer.price) === priceHouse ? rank * 2 : 0;
    }
    return rank;
  };

  const getSortOffer = function () {
    window.sortOffer = [];
    window.sortOffer = window.DATA_OFFER.filter((el) => getRank(el) > 0);
    window.upload.removeClonePin();
    window.cards.closeCards();
    window.makePin.makeOffer(window.sortOffer);
    window.cards.getClone(window.sortOffer);
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
  });
})();
