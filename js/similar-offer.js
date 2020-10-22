'use strict';
(function () {
  let inputTypeHouse = document.querySelector(`#housing-type`);
  let inputPriceHouse = document.querySelector(`#housing-price`) ;
  let inputCountRooms = document.querySelector(`#housing-rooms`);
  let inputCountGuests = document.querySelector(`#housing-guests`);
  let mapFilters = document.querySelector(`.map__filters`);
  let countGuests;
  let countRooms;
  let typeHouse;
  let priceHouse;
  let sortOffer =  window.dataOffer;

  const getRank = function () {
    let rank = 0;

    if (window.dataOffer.type === typeHouse) {
      rank += 4;
    }
    if (window.dataOffer.rooms === countRooms) {
      rank += 3;
    }
    if (window.dataOffer.guests === countGuests) {
      rank += 2;
    }
    if (window.dataOffer.price === priceHouse) {
      rank += 1;
    }
    console.log(rank);
  };

  const getSortOffer = function () {
    let sortOffer = [];
    sortOffer = window.dataOffer;
    sortOffer.sort(function (a, b) {
      let rankDiff = getRank(b) - getRank(a);
      return rankDiff;
    });
    console.log(sortOffer)
    window.makePin.makeOffer(sortOffer);

  };


  mapFilters.addEventListener(`change`, function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
    let classNameInput = evt.target.id;
    switch (classNameInput) {
      case `housing-type`:
        typeHouse = evt.target.value;
      break;
      case `housing-price`:
        priceHouse = evt.target.value;
      break;
      case `housing-rooms`:
        countRooms = evt.target.value;
      break;
      case `housing-guests`:
        countGuests = evt.target.value;
      break;
      default:
    }
    getSortOffer();
  });
})();
