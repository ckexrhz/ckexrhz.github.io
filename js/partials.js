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
})();
