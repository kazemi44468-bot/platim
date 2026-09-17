(() => {
  const faDigits = value => String(value).replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
  const persianize = root => {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (node.parentElement?.closest('script,style,code,pre')) return;
      if (/\d/.test(node.nodeValue)) node.nodeValue = faDigits(node.nodeValue);
    });
    root.querySelectorAll('input,textarea,option,[data-number]').forEach(el => {
      if ('value' in el && /\d/.test(el.value)) el.value = faDigits(el.value);
      if (el.textContent && /\d/.test(el.textContent)) el.textContent = faDigits(el.textContent);
    });
  };
  const menuButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('#mobile-menu');
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'بستن منو' : 'باز کردن منو');
    });
  }
  document.querySelectorAll('.nav-trigger').forEach(trigger => {
    trigger.addEventListener('click', event => {
      event.stopPropagation();
      const parent = trigger.closest('.nav-dropdown');
      document.querySelectorAll('.nav-dropdown.open').forEach(item => { if (item !== parent) item.classList.remove('open'); });
      parent.classList.toggle('open');
    });
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.nav-dropdown')) document.querySelectorAll('.nav-dropdown.open').forEach(item => item.classList.remove('open'));
  });
  const backTop = document.querySelector('.back-to-top');
  if (backTop) {
    const toggle = () => backTop.classList.toggle('visible', window.scrollY > 500);
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
  persianize(document.body);
  const observer = new MutationObserver(mutations => mutations.forEach(m => m.addedNodes.forEach(node => { if (node.nodeType === 1) persianize(node); })));
  observer.observe(document.body, { childList: true, subtree: true });
})();
