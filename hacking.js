
(() => {

  /* ========================================
     CONFIGURATION
  ======================================== */

  const CHARS = '01$#[]{}|<>ABCDEFabcdef∅∑∆πΩ';

  // Change this if your homepage has another filename.
  const HOMEPAGE_URL = 'index.html';

  const RESULTS = {
    granted: {
      word: 'ACCESS GRANTED',
      status: '[ ENCRYPTION DECODED ]'
    },

    denied: {
      word: 'ACCESS DENIED',
      status: '[ SECURITY PROTOCOL ACTIVATED. ]'
    }
  };


  /* ========================================
     ELEMENTS
  ======================================== */

  const root = document.getElementById('gt-04-root');
  const rain = document.getElementById('gt-04-rain');

  const textEl = document.getElementById('gt-04-text');
  const statusEl = document.getElementById('gt-04-status');

  const btn = document.getElementById('gt-04-btn');
  const serverBtn = document.getElementById('gt-04-server');


  // Stop if the HTML elements are missing.
  if (!root || !rain || !textEl || !statusEl || !btn || !serverBtn) {
    console.error('Authentication terminal: missing HTML elements.');
    return;
  }


  /* ========================================
     TIMERS
  ======================================== */

  let scrambleTimer = null;
  let connectTimer = null;


  /* ========================================
     MATRIX RAIN
  ======================================== */

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

      col.style.animationDuration =
        (6 + Math.random() * 10) + 's';

      col.style.animationDelay =
        (-Math.random() * 10) + 's';

      col.style.opacity =
        (0.1 + Math.random() * 0.35).toString();

      let str = '';

      for (let j = 0; j < 30; j++) {
        str += (Math.random() < 0.5 ? '1' : '0') + '\n';
      }

      col.textContent = str;

      rain.appendChild(col);
    }
  }

  createRain();


  /* ========================================
     THEME
  ======================================== */

  function setTheme(state) {

    root.classList.remove(
      'is-scanning',
      'is-granted',
      'is-denied'
    );

    root.classList.add('is-' + state);
  }


  /* ========================================
     RESET
  ======================================== */

  function resetServerBtn() {

    clearTimeout(connectTimer);

    serverBtn.disabled = false;
    serverBtn.hidden = true;

    serverBtn.textContent = '▶ ACCESS SERVER';
  }


  /* ========================================
     AUTHENTICATION SCRAMBLE
  ======================================== */

  function scramble(outcome) {

    const result = RESULTS[outcome];

    clearInterval(scrambleTimer);

    resetServerBtn();

    btn.disabled = true;

    textEl.classList.remove(
      'fx-granted',
      'fx-denied'
    );

    setTheme('scanning');

    statusEl.textContent = '[ AUTHENTICATING... ]';

    const word = result.word;
    const len = word.length;

    const total = len * 5;

    let iter = 0;

    scrambleTimer = setInterval(() => {

      let output = '';

      for (let i = 0; i < len; i++) {

        if (word[i] === ' ') {
          output += ' ';
        }

        else if (iter / 5 > i) {
          output += word[i];
        }

        else {
          output += CHARS[
            Math.floor(Math.random() * CHARS.length)
          ];
        }
      }

      textEl.textContent = output;

      if (iter >= total) {

        clearInterval(scrambleTimer);

        textEl.textContent = word;

        statusEl.textContent = result.status;

        setTheme(outcome);

        // Reveal access button only if granted.
        if (outcome === 'granted') {
          serverBtn.hidden = false;
        }

        void textEl.offsetWidth;

        textEl.classList.add('fx-' + outcome);

        btn.disabled = false;
      }

      iter++;

    }, 40);
  }


  /* ========================================
     RUN AUTHENTICATION
  ======================================== */

  function run() {

    clearInterval(scrambleTimer);

    resetServerBtn();

    const outcome = Math.random() < 0.5
      ? 'granted'
      : 'denied';

    scramble(outcome);
  }


  /* ========================================
     ACCESS SERVER
  ======================================== */

  function accessServer() {

    if (serverBtn.disabled || serverBtn.hidden) {
      return;
    }

    clearTimeout(connectTimer);

    serverBtn.disabled = true;

    serverBtn.textContent = 'CONNECTING...';

    statusEl.textContent =
      '[ CONNECTING TO SERVER... ]';

    connectTimer = setTimeout(() => {

      serverBtn.textContent = '✔ CONNECTED';

      statusEl.textContent =
        '[ SERVER CONNECTED — REDIRECTING... ]';

      // Redirect to the homepage.
      setTimeout(() => {

        window.location.href = HOMEPAGE_URL;

      }, 1000);

    }, 1500);
  }


  /* ========================================
     BUTTON EVENTS
  ======================================== */

  btn.addEventListener('click', run);

  serverBtn.addEventListener('click', accessServer);


  /* ========================================
     RESPONSIVE RAIN
  ======================================== */

  let resizeTimer;

  window.addEventListener('resize', () => {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(createRain, 200);

  });


  /* ========================================
     INITIAL START
  ======================================== */

  setTimeout(run, 600);

})();
