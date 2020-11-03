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
  let isfeatures = {
    isWifi: false,
    isDish: false,
    isWasher: false,
    isElevator: false,
    isCondi: false,
    isParking: false
  };

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
    if (isfeatures.isWifi) {
      rank = offer.offer.features.includes(`wifi`) ? rank * 2 : 0;
    }
    if (isfeatures.isDish) {
      rank = offer.offer.features.includes(`dishwasher`) ? rank * 2 : 0;
    }
    if (isfeatures.isWasher) {
      rank = offer.offer.features.includes(`washer`) ? rank * 2 : 0;
    }
    if (isfeatures.isElevator) {
      rank = offer.offer.features.includes(`elevator`) ? rank * 2 : 0;
    }
    if (isfeatures.isCondi) {
      rank = offer.offer.features.includes(`conditioner`) ? rank * 2 : 0;
    }
    if (isfeatures.isParking) {
      rank = offer.offer.features.includes(`parking`) ? rank * 2 : 0;
    }

    return rank;
  };

  function debounce(cb) {
    let count = false;
    return function (evt) {
      if (count) {
        clearTimeout(count);
      }
      count = setTimeout(cb.bind(this, evt), 1000);
    };
  }

  const makeNewElements = function () {
    window.upload.removeClonePin();
    window.cards.closeCards();
    window.makePin.makeOffer(window.sortOffer);
    window.cards.getClone(window.sortOffer);
    window.cards.closeCards();
  };

  const getSortOffer = function () {
    window.sortOffer = [];
    window.sortOffer = window.DATA_OFFER.filter((el) => getRank(el) > 0);
    makeNewElements();
  };

  mapFilters.addEventListener(`change`, debounce(function (evt) {
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
        isfeatures.isWifi = evt.target.checked;
        break;
      case checkboxDish:
        isfeatures.isDish = evt.target.checked;
        break;
      case checkboxWasher:
        isfeatures.isWasher = evt.target.checked;
        break;
      case checkboxElevator:
        isfeatures.isElevator = evt.target.checked;
        break;
      case checkboxCondi:
        isfeatures.isCondi = evt.target.checked;
        break;
      case checkboxParking:
        isfeatures.isParking = evt.target.checked;
        break;
    }
    getSortOffer();
  }));
})();
