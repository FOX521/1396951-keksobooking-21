'use strict';
(function () {
  let mapFilters = document.querySelector(`.map__filters`);
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
  let lowPrice = 10000;
  let middlePrice = 50000;
  let countGuests;
  let countRooms;
  let typeHouse;
  let priceHouse;

  let isFeatures = {
    isWifi: false,
    isDish: false,
    isWasher: false,
    isElevator: false,
    isCondicioner: false,
    isParking: false
  };

  const comparePrice = function (compareValue) {
    if (compareValue < lowPrice) {
      return `low`;
    }
    if (compareValue >= lowPrice && compareValue <= middlePrice) {
      return `middle`;
    }
    if (compareValue > middlePrice) {
      return `high`;
    }
    return undefined;
  };

  const getRank = function (array) {
    let rank = 1;

    if (typeHouse && typeHouse !== `any`) {
      rank = array.offer.type === typeHouse ? rank * 2 : 0;
    }
    if (countRooms && countRooms !== `any`) {
      rank = array.offer.rooms === Number(countRooms) ? rank * 2 : 0;
    }
    if (countGuests && countGuests !== `any`) {
      rank = array.offer.guests === countGuests ? rank * 2 : 0;
    }
    if (priceHouse && priceHouse !== `any`) {
      rank = comparePrice(array.offer.price) === priceHouse ? rank * 2 : 0;
    }
    if (isFeatures.isWifi) {
      rank = array.offer.features.includes(`wifi`) ? rank * 2 : 0;
    }
    if (isFeatures.isDish) {
      rank = array.offer.features.includes(`dishwasher`) ? rank * 2 : 0;
    }
    if (isFeatures.isWasher) {
      rank = array.offer.features.includes(`washer`) ? rank * 2 : 0;
    }
    if (isFeatures.isElevator) {
      rank = array.offer.features.includes(`elevator`) ? rank * 2 : 0;
    }
    if (isFeatures.isCondicionercioner) {
      rank = array.offer.features.includes(`conditioner`) ? rank * 2 : 0;
    }
    if (isFeatures.isParking) {
      rank = array.offer.features.includes(`parking`) ? rank * 2 : 0;
    }
    return rank;
  };

  function doDebounce(cb) {
    let count = false;
    return function (evt) {
      if (count) {
        clearTimeout(count);
      }
      count = setTimeout(cb.bind(this, evt), 1000);
    };
  }

  const makeNewElements = function () {
    try {
      window.upload.removeClonePin();
      window.cards.closeCards();
      window.makePin.makeOffer(window.sortOffers);
      window.cards.getClone(window.sortOffers);
      window.cards.closeCards();
    } catch (err) {

    }
  };

  const getSortOffer = function () {
    window.sortOffers = [];
    window.sortOffers = window.DATA_OFFER.filter((el) => getRank(el) > 0);
    makeNewElements();
  };

  mapFilters.addEventListener(`change`, doDebounce(function (evt) {
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
        isFeatures.isWifi = evt.target.checked;
        break;
      case checkboxDish:
        isFeatures.isDish = evt.target.checked;
        break;
      case checkboxWasher:
        isFeatures.isWasher = evt.target.checked;
        break;
      case checkboxElevator:
        isFeatures.isElevator = evt.target.checked;
        break;
      case checkboxCondi:
        isFeatures.isCondicionercioner = evt.target.checked;
        break;
      case checkboxParking:
        isFeatures.isParking = evt.target.checked;
        break;
    }
    getSortOffer();
  }));
})();
