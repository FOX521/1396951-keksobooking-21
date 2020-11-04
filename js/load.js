'use strict';
(function () {
  const onError = function (error) {
    console.log(error);
  };
  let xhr = new XMLHttpRequest();
  xhr.addEventListener(`load`, function () {
    let error;
    switch (xhr.status) {
      case window.utill.StatusCode.OK:
        window.DATA_OFFER = JSON.parse(xhr.responseText);
        window.sortOffers = window.DATA_OFFER;
        break;
      case window.utill.StatusCode.BAD_REQUEST:
        error = `Неверный запрос`;
        break;
      case window.utill.StatusCode.NOT_AUTORIZATION:
        error = `Пользователь не авторизован`;
        break;
      case window.utill.StatusCode.NOT_FOUND:
        error = `Ничего не найдено`;
        break;
      default:
        error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
    }
    if (error) {
      onError(error);
    }
  });
  xhr.addEventListener(`error`, function () {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });
  xhr.timeout = 5000;
  xhr.open(`GET`, `https://21.javascript.pages.academy/keksobooking/data`);
  xhr.send();
})();
