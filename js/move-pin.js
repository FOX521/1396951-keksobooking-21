(function () {
let buttonPin = mapContainer.querySelector('button');

buttonPin.addEventListener('mousedown', function(evt) {
  evt.preventDefault();

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

    let resultTop = Math.floor(buttonPin.offsetTop - shift.y);
    let resultLeft = Math.floor(buttonPin.offsetLeft - shift.x);

    buttonPin.style.top  = resultTop + 'px';
    buttonPin.style.left = resultLeft + 'px';

    window.movePin = {
       resultTop : resultTop,
       resultLeft : resultLeft
    };
  }

  const onMouseUp = function(upEvt) {
   upEvt.preventDefault();

   mapContainer.removeEventListener('mousemove', onMouseMove);
   mapContainer.removeEventListener('mouseup', onMouseUp);
  }

  mapContainer.addEventListener('mousemove', onMouseMove);
  mapContainer.addEventListener('mouseup', onMouseUp);
})
})();
