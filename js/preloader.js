(async () => {
  const BASE = '/partials/';

  const loadPartial = async (selector, file) => {
    const mount = document.querySelector(selector);
    if (!mount) return null;
    const res = await fetch(BASE + file);
    if (!res.ok) {
      console.error('Partial load failed:', file, res.status);
      return null;
    }
    mount.innerHTML = await res.text();
    return mount.firstElementChild;
  };

  const KEY = 'preloader:v1';
  const hasFlag = () => {
    try {
      return !!localStorage.getItem(KEY);
    } catch {
      return document.cookie.includes(KEY + '=1');
    }
  };
  const setFlag = () => {
    try {
      localStorage.setItem(KEY, '1');
    } catch {
      document.cookie = `${KEY}=1; path=/; max-age=31536000`;
    }
  };

  if (!hasFlag()) {
    const root = await loadPartial('#preloader', 'preloader.html');
    const el = root?.classList?.contains('site-preloader')
      ? root
      : document.querySelector('#preloader .site-preloader');

    const hide = () => {
      if (!el) return setFlag();
      el.classList.add('is-hidden');
      el.addEventListener('transitionend', () => el.remove(), { once: true });
      setFlag();
    };

    window.addEventListener('load', hide, { once: true });
    setTimeout(hide, 4000);
  }
})();
