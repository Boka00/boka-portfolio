(function () {
  try {
    var saved = localStorage.getItem('boka-portfolio-theme');
    var theme = saved === 'light' || saved === 'dark' ? saved : 'dark';
    var root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    var meta = document.getElementById('meta-theme-color');
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#0A0A0F' : '#F8FAFC');
    }
  } catch (_err) {
    document.documentElement.classList.add('dark');
  }
})();

