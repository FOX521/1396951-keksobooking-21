'use strict';
(function () {
let buttonPin = mapContainer.querySelector('button');

buttonPin.addEventListener('mousedown', function(evt) {
  evt.preventDefault();

  let resultTop = buttonPin.offsetTop;
  let resultLeft = buttonPin.offsetLeft;

  let startCoords = {
    x : evt.clientX,
    y : evt.clientY
  };

  const onMouseMove = function(moveEvt) {
    moveEvt.preventDefault();

    let shift = {
      x : startCoords.x - moveEvt.clientX,
      y : startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x : moveEvt.clientX,
      y : moveEvt.clientY
    };

    resultTop = Math.floor(buttonPin.offsetTop - shift.y);
    resultLeft = Math.floor(buttonPin.offsetLeft - shift.x);
    buttonPin.style.top  = resultTop + 'px';
    buttonPin.style.left = resultLeft + 'px';
    window.validateForm.setAdress({resultTop, resultLeft});
  }

  const onMouseUp = function(upEvt) {
   upEvt.preventDefault();
   window.validateForm.setAdress({resultTop, resultLeft});
   mapContainer.removeEventListener('mousemove', onMouseMove);
   mapContainer.removeEventListener('mouseup', onMouseUp);
  }

  mapContainer.addEventListener('mousemove', onMouseMove);
  mapContainer.addEventListener('mouseup', onMouseUp);
})
})();
