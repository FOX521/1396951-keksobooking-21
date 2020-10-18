'use strict';
(function() {
    let newCloneElement;
    const POPUP_CLOSE = 'popup__close';
    let popup;
    let index;

    const typeTOFlat  = {
        flat : 'Квартира',
        house : 'Дом',
        bungalow : 'Бунгало',
        palace : 'Дворец'
    }

    mapContainer.addEventListener('click', function(evt) {
        if (evt.target.className === 'map__pin' || evt.target.className === 'map__pin--img') {
            index = Number(evt.target.getAttribute('data-index'));
            closeCards();
            getClone('#card', 'article');
        } else if (evt.target.className === POPUP_CLOSE) {
            popup = evt.target.closest('.popup');
            popup.remove();
        }
    });
    const closeCards = function() {
        document.querySelectorAll('.popup').forEach((card) => card.remove())
    }
    window.addInfo = function(newCloneInfo) {
        let flatElement = dataOffer[index];
        newCloneInfo.querySelector('H3').textContent = flatElement.offer.title;
        newCloneInfo.querySelector('.popup__text--address').textContent = flatElement.offer.address;
        newCloneInfo.querySelector('.popup__text--price').textContent = flatElement.offer.price + ' ₽/ночь';
        newCloneInfo.querySelector('.popup__type').textContent = typeTOFlat[flatElement.offer.type];
        newCloneInfo.querySelector('.popup__text--capacity').textContent = flatElement.offer.rooms + ' комнаты для ' + flatElement.offer.guests + ' гостей';
        newCloneInfo.querySelector('.popup__text--time').textContent = 'Заезд после ' + flatElement.offer.checkin + ' , выезд до ' + flatElement.offer.checkout;
        newCloneInfo.querySelector('.popup__features').textContent = flatElement.offer.features;
        newCloneInfo.querySelector('.popup__description').textContent = flatElement.offer.description;
        newCloneInfo.querySelector('.popup__photo').setAttribute('src', getRandomItem(flatElement.offer.photos));
        newCloneInfo.querySelector('.popup__avatar').setAttribute('src', flatElement.author.avatar);
        return newCloneInfo;
    }
    window.getClone = function(getId, getElement) {
        let templateCard = document.querySelector(getId).content;
        let element = templateCard.querySelector(getElement);
        let cloneElement = element.cloneNode(true);
        newCloneElement = addInfo(cloneElement);
        mapContainer.appendChild(newCloneElement);
    };
})();
