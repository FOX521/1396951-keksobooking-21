'use strict';
(function () {
  const TYPE_FILES = [`gif`, `jpg`, `jpeg`, `png`];
  let containerPreview = document.querySelector(`.ad-form-header__preview`);
  let imgAvatar = containerPreview.querySelector(`img`);
  let addedFileAvatar = document.querySelector(`.ad-form-header__input`);
  let addedFileFlat = document.querySelector(`.ad-form__input`);
  let containerImgFlat = document.querySelector(`.ad-form__photo`);

  const addImageAvatar = function () {
    let file = addedFileAvatar.files[0];
    let fileName = file.name.toLowerCase();
    let matches = TYPE_FILES.some(function (el) {
      return fileName.endsWith(el);
    });

    if (matches) {
      let reader = new FileReader();

      reader.addEventListener(`load`, function () {
        imgAvatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  const addImageFlat = function () {
    let imgFlat = window.makePin.makeElement(`img`, `undefied`);
    imgFlat.setAttribute(`width`, 70);
    imgFlat.setAttribute(`height`, 70);
    containerImgFlat.appendChild(imgFlat);
    let file = addedFileFlat.files[0];
    let fileName = file.name.toLowerCase();
    let matches = TYPE_FILES.some(function (el) {
      return fileName.endsWith(el);
    });

    if (matches) {
      let reader = new FileReader();

      reader.addEventListener(`load`, function () {
        imgFlat.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };
  addedFileAvatar.addEventListener(`change`, addImageAvatar);
  addedFileFlat.addEventListener(`change`, addImageFlat);
})();
