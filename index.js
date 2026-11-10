(() => {

  /* ========================================
     HOMEPAGE — MATRIX RAIN ONLY
  ======================================== */

  const rain = document.getElementById('gt-04-rain');

  if (!rain) {
    console.error('Homepage: #gt-04-rain not found.');
    return;
  }

  function createRain() {

    rain.innerHTML = '';

    const count = Math.min(
      Math.ceil(window.innerWidth / 20),
      60
    );

    for (let i = 0; i < count; i++) {

      const col = document.createElement('div');

      col.className = 'gt-04__rain-col';
      col.style.left = (i * 100 / count) + '%';
      col.style.animationDuration = (6 + Math.random() * 10) + 's';
      col.style.animationDelay = (-Math.random() * 10) + 's';
      col.style.opacity = (0.35 + Math.random() * 0.5).toString();

      let str = '';

      for (let j = 0; j < 30; j++) {
        str += (Math.random() < 0.5 ? '1' : '0') + '\n';
      }

      col.textContent = str;
      rain.appendChild(col);
    }
  }

  createRain();

  let resizeTimer;

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(createRain, 200);
  });

})();