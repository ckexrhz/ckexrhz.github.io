(async () => {
  const loadPartial = async (selector, url) => {
    const mount = document.querySelector(selector);
    if (!mount) return;
    try {
      const res = await fetch('/partials/' + url);
      if (!res.ok) throw new Error(res.status + ' ' + res.statusText);
      mount.innerHTML = await res.text();
    } catch (e) {
      console.error('Partial load failed:', url, e);
    }
  };

  await Promise.all([
    // loadPartial('#navbar', 'navbar.html'),
    loadPartial('#footer', 'footer.html'),
  ]);

  // const navRoot = document.querySelector('#navbar');
  // if (navRoot) {
  //   const current = (
  //     location.pathname.split('/').pop() || 'index.html'
  //   ).toLowerCase();
  //   navRoot.querySelectorAll('.navbar .nav-link').forEach((a) => {
  //     const href = (a.getAttribute('href') || '').toLowerCase();
  //     if (href === current) a.setAttribute('aria-current', 'page');
  //     else a.removeAttribute('aria-current');
  //   });
  // }

  // Terminal typing animation
  const terminalText = document.getElementById('i-am');
  if (terminalText) {
    const texts = [
      'a junior web developer',
      'a junior software developer',
      'a software developer',
      'a future engineer',
      'a student',
      '   ',
      'Arthur :)',
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    let deleteSpeed = 50;
    let pauseTime = 2000;
    
    function typeText() {
      const currentText = texts[textIndex];
      
      if (isDeleting) {
        terminalText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = deleteSpeed;
      } else {
        terminalText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
      }
      
      if (!isDeleting && charIndex === currentText.length) {
        if (terminalText.textContent === "Arthur :)") {
          return;
        }
        typeSpeed = pauseTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
      }

      setTimeout(typeText, typeSpeed);
    }
    
    setTimeout(typeText, 1000);
  }
})();
