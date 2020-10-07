(function () {
  let newCloneElement;
  let mapPins = mapContainer.querySelectorAll('.map__pin');
  const POPUP_CLOSE = 'popup__close';
  const VISUALLY_HIDDEN = 'visually-hidden';
  let index ;

  mapContainer.addEventListener('click', function (evt) {
      index = Number(evt.target.getAttribute('data-index'));
      console.log(index);
      getClone('#card', 'article');
  });

  window.addInfo = function (newCloneInfo) {
    let flatElement = flatList[index];
    newCloneInfo.querySelector('H3').textContent = flatElement.offer.title;
    newCloneInfo.querySelector('.popup__text--address').textContent = flatElement.offer.address;
    newCloneInfo.querySelector('.popup__text--price').textContent = flatElement.offer.price + ' ₽/ночь';
    newCloneInfo.querySelector('.popup__type').textContent = flatElement.offer.type;
    newCloneInfo.querySelector('.popup__text--capacity').textContent = flatElement.offer.rooms + ' комнаты для ' + flatElement.offer.guests + ' гостей';
    newCloneInfo.querySelector('.popup__text--time').textContent = 'Заезд после ' + flatElement.offer.checkin + ' , выезд до ' + flatElement.offer.checkout;
    newCloneInfo.querySelector('.popup__features').textContent =  flatElement.offer.features;
    newCloneInfo.querySelector('.popup__description').textContent = flatElement.offer.description;
    newCloneInfo.querySelector('.popup__photo').setAttribute('src', flatElement.offer.photos);
    newCloneInfo.querySelector('.popup__avatar').setAttribute('src', flatElement.author.avatar);
    return newCloneInfo;
    }

    window.getClone = function (getId, getElement) {
      let templateCard = document.querySelector(getId).content;
      let element = templateCard.querySelector(getElement);
      let cloneElement = element.cloneNode(true);
      newCloneElement = addInfo(cloneElement);
      mapContainer.appendChild(newCloneElement);
    }
})();
