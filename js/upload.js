(function () {
  let cloneBanner;
  const getCloneBanner = function (getId, getElement) {
    let templateBanner = document.querySelector(getId).content;
    let elementBanner = templateBanner.querySelector(getElement);
    cloneBanner = elementBanner.cloneNode(true);
    form.appendChild(cloneBanner);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    let formData = new FormData(form);
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', 'https://21.javascript.pages.academy/keksobooking');
    xhr.send(formData);
    window.disabledMap();
      switch (xhr.status) {
        case  200 :
          getCloneBanner(success, element);
        break;
        case  400 :
          getCloneBanner(error, element);
        break;
        case  500 :
          getCloneBanner(error, element);
        break;
      }
  });
  cloneBanner.addEventListener('click', function (evt) {
    removeClone();
  });

  cloneBanner.addEventListener('keydown', function (evt) {
    if (keyCode === 27) {
      removeClone();
    }
  });

  const removeClone = function (removeElement) {
   removeElement.remove();
  };
})();
