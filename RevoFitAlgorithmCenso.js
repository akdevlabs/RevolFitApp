document.addEventListener('touchstart', function (event) {
  if (event.touches.length > 1) {
    event.preventDefault(); // Prevents zooming
  }
}, { passive: false });