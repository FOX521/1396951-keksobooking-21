'use strict';
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
        case window.utill.StatusCode.OK:
          getCloneBanner(success, element);
          break;
        case window.utill.StatusCode.BAD_REQUEST:
          getCloneBanner(error, element);
          break;
        case window.utill.StatusCode.NOT_AVILABLE:
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
      if (evt.keyCode === window.utill.ESC_KEY || evt.keyCode === window.utill.ENTER_KEY) {
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
      buttonAgain.addEventListener(`click`, function removePopup(evt) {
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
    removeClonePin
  };
})();
