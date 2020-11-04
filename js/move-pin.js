'use strict';
  const LIMIT_TOP = 130;
  const LIMIT_BOTTOM = 630;
  let buttonPin = window.utill.mapContainer.querySelector(`.map__pin--main`);
  buttonPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();
    let resultTop = buttonPin.offsetTop;
    let resultLeft = buttonPin.offsetLeft;
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      resultTop = Math.floor(buttonPin.offsetTop - shift.y);
      resultLeft = Math.floor(buttonPin.offsetLeft - shift.x);
      if (!(resultTop < LIMIT_TOP || resultTop > LIMIT_BOTTOM)) {
        buttonPin.style.top = resultTop + `px`;
      }
      buttonPin.style.left = resultLeft + `px`;
      window.validateForm.setAdress({
        resultTop,
        resultLeft
      });
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.validateForm.setAdress({
        resultTop,
        resultLeft
      });
      window.utill.mapContainer.removeEventListener(`mousemove`, onMouseMove);
      window.utill.mapContainer.removeEventListener(`mouseup`, onMouseUp);
    };

    window.utill.mapContainer.addEventListener(`mousemove`, onMouseMove);
    window.utill.mapContainer.addEventListener(`mouseup`, onMouseUp);
  });
