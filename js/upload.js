'use strict';
(function () {
  let success = `#success`;
  let error = `#error`;
  let element = `div`;
  let cloneBanner;

  form.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    let formData = new FormData(window.form);
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.open(`POST`, `https://21.javascript.pages.academy/keksobooking`);
    xhr.send(formData);
    xhr.addEventListener(`load`, function () {
      switch (xhr.status) {
        case 200:
          getCloneBanner(success, element);
          break;
        case 400:
          getCloneBanner(error, element);
          break;
        case 500:
          getCloneBanner(error, element);
          break;
      }
    });
    window.disabledMap();
  });

  const getCloneBanner = function (getId, getElement) {
    let templateBanner = document.querySelector(getId).content;
    let elementBanner = templateBanner.querySelector(getElement);
    cloneBanner = elementBanner.cloneNode(true);
    form.appendChild(cloneBanner);
    if (getId === error) {
      addListeners(error);
    } else if (getId === success) {
      addListeners(success);
    }
  };

  window.removeClonePin = function () {
    window.makePin.items.forEach((removeElement) => removeElement.remove());
  };

  const addListeners = function (typeMessage) {
    if (typeMessage === error) {
      let buttonAgain = document.querySelector(`.error__button`);
      buttonAgain.addEventListener(`click`, function (evt) {
        evt.preventDefault();
        removePopup(cloneBanner);
      });
    } else if (typeMessage === success) {
      document.addEventListener(`click`, function (evt) {
        evt.preventDefault();
        removePopup(cloneBanner);
      });
      document.addEventListener(`keydown`, function (evt) {
        if (evt.keyCode === 27 || evt.keyCode === 13) {
          evt.preventDefault();
          removePopup(cloneBanner);
        }
      });
    }
    window.removeClonePin();
    window.validateForm.clearForm();
  };

  const removePopup = function (removeElement) {
    removeElement.remove();
  };
})();
