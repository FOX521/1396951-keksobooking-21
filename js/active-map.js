'use strict';
(function () {
  let adForm = document.querySelector(`.ad-form`);
  let fieldsetForm = adForm.querySelectorAll(`fieldset`);
  let mainMap = document.querySelector(`.map`);
  let mapPinMain = window.utill.mapContainer.querySelector(`.map__pin--main`);
  let mapFilters = document.querySelector(`.map__filters`);
  let selectMapFilters = mapFilters.querySelectorAll(`select`);
  let fieldsetMapFilters = mapFilters.querySelectorAll(`fieldset`);

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

    mapPinMain.addEventListener(`click`, function handler(evt) {
      if (evt.button === 0) {
        activeMap();
        mapPinMain.removeEventListener(`click`, handler);
      }
    });
  };

  disabledMap();

  mapPinMain.addEventListener(`keydown`, function choiseEnt(evt) {
    if (evt.keyCode === 13) {
      mapPinMain.removeEventListener(`keydown`, choiseEnt);
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
    adForm,
    disabledMap
  };
})();
