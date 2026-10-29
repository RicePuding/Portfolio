// Site enhancements: mobile nav, nav shadow and project filtering.
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  const nav = document.getElementById('mainNav');
  const updateNav = () => { if (nav) nav.classList.toggle('scrolled', window.scrollY > 24); };
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  const menu = document.getElementById('navbarLinks');
  document.querySelectorAll('#navbarLinks a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      if (menu && window.bootstrap && window.bootstrap.Collapse) {
        const instance = window.bootstrap.Collapse.getInstance(menu);
        if (instance) instance.hide();
      }
    });
  });

  const filters = document.querySelectorAll('.project-filter');
  const cards = document.querySelectorAll('.project-item');
  const status = document.getElementById('projectFilterStatus');
  filters.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      let shown = 0;
      cards.forEach(card => {
        const visible = category === 'all' || card.dataset.category === category;
        card.hidden = !visible;
        if (visible) shown++;
      });
      filters.forEach(filter => {
        const selected = filter === button;
        filter.classList.toggle('is-active', selected);
        filter.setAttribute('aria-pressed', String(selected));
      });
      const featuredGroup = document.getElementById('featuredGroup');
      const moreGroup = document.getElementById('moreGroup');
      if (featuredGroup) featuredGroup.hidden = !featuredGroup.querySelector('.project-item:not([hidden])');
      if (moreGroup) moreGroup.hidden = !moreGroup.querySelector('.project-item:not([hidden])');
      if (status) status.textContent = `Showing ${shown} ${shown === 1 ? 'project' : 'projects'}`;
    });
  });
});
