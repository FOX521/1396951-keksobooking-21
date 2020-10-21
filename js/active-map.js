'use strict';
(function () {
  let adForm = document.querySelector(`.ad-form`);
  let fieldsetForm = adForm.querySelectorAll(`fieldset`);
  let mainMap = document.querySelector(`.map`);
  let mapPinMain = mapContainer.querySelector(`.map__pin--main`);
  let mapFilters = document.querySelector(`.map__filters`);
  let selectMapFilters = mapFilters.querySelectorAll(`select`);
  let fieldsetMapFilters = mapFilters.querySelectorAll(`fieldset`);

  Window.activeMap = {
    adForm: adForm
  };

  window.disabledMap = function () {
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
  };

  disabledMap();

  mapPinMain.addEventListener(`mousedown`, function handler (evt) {
    if (evt.button === 0) {
      activeMap();
      mapPinMain.removeEventListener(`mousedown`, handler);
    }
  });

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
    window.makePin.makeOffer(dataOffer);
  };
})();
