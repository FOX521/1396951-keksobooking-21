const TITLE_OFFER = ['Хостел для друзей', 'Отель Мэриланд', 'В гостях у бомжа', 'Армейский стиль', 'Гостиница Харакири', 'У троля под мостом', 'Отель съешь собаку', 'Токийский сон'];
const PRICE_OFFER = [1000, 1500, 2000, 2500, 3500, 4000];
const TYPE_OFFER = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
const COUNT_ROOMS_AND_GUESTS = [1, 2, 3, 4];
const CHECKIN_CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const DESCRIPTION = ['Прикольный отель', 'Гостиница что надо', 'Мост на 5 звезд'];
const PHOTO_ROOMS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const getOffer = function() {
    return {
        author: {
            avatar: "./img/avatars/user" + 0 + getRandomInteger(1, 8) + ".png",
        },
        offer: {
            title: getRandomItem(TITLE_OFFER),
            address: 'location.x location.y',
            price: getRandomItem(PRICE_OFFER),
            type: getRandomItem(TYPE_OFFER),
            rooms: getRandomItem(COUNT_ROOMS_AND_GUESTS),
            guests: getRandomItem(COUNT_ROOMS_AND_GUESTS),
            checkin: getRandomItem(CHECKIN_CHECKOUT),
            checkout: getRandomItem(CHECKIN_CHECKOUT),
            features: getRandomItem(FEATURES),
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
const getFlatList = function(count) {
        for (let i = 0; i < count; i++) {
            flatList.push(getOffer();
            }
            return flatList;
        };
        getFlatList(8);
