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
    objectItem.appendChild(picture);
    objectItem.setAttribute(`style`, `left:${newObject.location.x}px; top: ${newObject.location.y}px`);
    objectItem.setAttribute(`data-index`, index);
    return objectItem;
  };
  let makeOffer = function (dataArray) {
    for (let i = 0; i < 5; i++) {
      index = i;
      items[i] = createObj(dataArray[i]);
      mapContainer.appendChild(items[i]);
    }
  };
  window.makePin = {
    makeOffer: makeOffer,
    makeElement: makeElement,
    items: items
  };
})();
