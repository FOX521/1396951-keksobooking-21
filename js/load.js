'use strict';
(function() {
    let xhr = new XMLHttpRequest();
    const onError = function(error) {
        console.log(error);
    };
    const onSucces = function(animals) {
    };
    xhr.addEventListener('load', function() {
        let error;
        switch (xhr.status) {
            case 200:
                onSucces(xhr.response);
                window.dataOffer = JSON.parse(xhr.responseText);
                break;
            case 400:
                error = 'Неверный запрос';
                break;
            case 401:
                error = 'Пользователь не авторизован';
                break;
            case 404:
                error = 'Ничего не найдено';
                break;
            default:
                error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
        }
        if (error) {
            onError(error);
        }
    });
    xhr.addEventListener('error', function() {
        onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function() {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 5000
    xhr.open('GET', 'https://21.javascript.pages.academy/keksobooking/data');
    xhr.send();
})();
