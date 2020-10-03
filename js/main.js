let mapContainer = document.querySelector('.map__pins');
let mapPin = mapContainer.querySelector('.map__pins');
let offWidth = Math.floor(mapContainer.offsetWidth);
const TITLE_OFFER = ['Хостел для друзей', 'Отель Мэриланд','В гостях у бомжа', 'Армейский стиль', 'Гостиница Харакири', 'У троля под мостом', 'Отель съешь собаку', 'Токийский сон'];
const PRICE_OFFER = [1000, 1500, 2000, 2500, 3500, 4000];
const TYPE_OFFER = [ 'Дворец', 'Квартира', 'Дом', 'Бунгало'];
const COUNT_ROOMS_AND_GUESTS = [1, 2, 3, 4];
const CHECKIN_CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const DESCRIPTION = ['Прикольный отель', 'Гостиница что надо', 'Мост на 5 звезд'];
const PHOTO_ROOMS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const getRandomInteger = function (min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

const  getRandomItem = function(list) {
  const maxIndex = list.length - 1;
  const randomIndex = getRandomInteger(0, maxIndex);
  return list[randomIndex];
}

const getOffer = function () {
  return {
      author: {
        avatar:  "./img/avatars/user" + 0 + getRandomInteger(1, 8) + ".png",
    },
    offer: {
        title: getRandomItem(TITLE_OFFER),
        address: 'location.x location.y',
        price: getRandomItem(PRICE_OFFER),
        type: getRandomItem(TYPE_OFFER),
        rooms: getRandomItem(COUNT_ROOMS_AND_GUESTS),
        guests: getRandomItem(COUNT_ROOMS_AND_GUESTS),
        checkin: getRandomItem(CHECKIN_CHECKOUT),
        checkout:  getRandomItem(CHECKIN_CHECKOUT),
        features:  getRandomItem(FEATURES),
        description: getRandomItem(DESCRIPTION),
        photos: getRandomItem(PHOTO_ROOMS),
    },
    location: {
        x: getRandomInteger(1, offWidth),
        y: getRandomInteger(130, 630),
    }
  }
}

const flatList = [];

const getFlatList = function (count) {
  for ( let i = 0; i < count; i++) {
    flatList.push(getOffer());
  }
  return flatList;
};


getFlatList(8);

const makeElement = function (tagName, className) {
  let element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

const createObj = function (newObject) {
  let objectItem = makeElement('button','map__pin');
  let picture = makeElement('img');
  picture.setAttribute('alt', newObject.offer.title)
  picture.setAttribute('src', newObject.author.avatar);
  picture.setAttribute('width', '40');
  picture.setAttribute('height', '40');
  objectItem.appendChild(picture);
  objectItem.setAttribute('style', `left:${newObject.location.x}px; top: ${newObject.location.y}px`);
  return objectItem;
}

for (let i =0; i < flatList.length; i++) {
  let item = createObj(flatList[i]);
  mapContainer.appendChild(item);
}

const addInfo = function (newCloneInfo) {
let flatElement = flatList[0];
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

const getClone = function (getId, getElement) {
  let templateCard = document.querySelector(getId).content;
  let element = templateCard.querySelector(getElement);
  let cloneElement = element.cloneNode(true);
  let newCloneElement = addInfo(cloneElement);
  mapContainer.appendChild(newCloneElement);
}

getClone('#card', 'article');


