'use strict';
(function () {
  let items = [];
  const makeElement = function (tagName, className) {
    let element = document.createElement(tagName);
    element.classList.add(className);
    return element;
  };

  const createObj = function (newObject) {
    let objectItem = makeElement(`button`, `map__pin`);
    let picture = makeElement(`img`, `map__pin--img`);
    picture.setAttribute(`alt`, newObject.offer.title);
    picture.setAttribute(`src`, newObject.author.avatar);
    picture.setAttribute(`width`, `40`);
    picture.setAttribute(`height`, `40`);
    picture.setAttribute(`data-index`, window.utill.index);
    objectItem.appendChild(picture);
    objectItem.setAttribute(`style`, `left:${newObject.location.x}px; top: ${newObject.location.y}px`);
    objectItem.setAttribute(`data-index`, window.utill.index);
    objectItem.tabIndex = window.utill.index;
    return objectItem;
  };

  let makeOffer = function (dataArray) {
    const maxCount = dataArray.length >= 5 ? 5 : dataArray.length;
    for (let i = 0; i < maxCount; i++) {
      window.utill.index = i;
      items[i] = createObj(dataArray[i]);
      window.utill.mapContainer.appendChild(items[i]);
    }
  };

  window.makePin = {
    makeElement: makeElement,
    makeOffer: makeOffer,
    items: items
  };
})();
