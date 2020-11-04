'use strict';
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

    mapPinMain.addEventListener(`click`, function onMapPinMainClick(evt) {
      if (evt.button === window.utill.CLICK_KEY) {
        activeMap();
        mapPinMain.removeEventListener(`click`, onMapPinMainClick);
      }
    });
  };

  disabledMap();

  mapPinMain.addEventListener(`keydown`, function onMapPinMainKeydown(evt) {
    if (evt.keyCode === window.utill.ENTER_KEY) {
      mapPinMain.removeEventListener(`keydown`, onMapPinMainKeydown);
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
