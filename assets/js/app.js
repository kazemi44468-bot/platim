(() => {
  const root = (() => {
    const p = location.pathname;
    if (location.hostname.endsWith('github.io') && p.startsWith('/platim/')) return '/platim/';
    return document.body.dataset.root || '/';
  })();
  const faDigits = value => String(value).replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
  const persianize = rootNode => {
    if (!rootNode) return;
    const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (node.parentElement?.closest('script,style,code,pre')) return;
      if (/\d/.test(node.nodeValue)) node.nodeValue = faDigits(node.nodeValue);
    });
    rootNode.querySelectorAll('input,textarea,option,[data-number]').forEach(el => {
      if ('value' in el && /\d/.test(el.value)) el.value = faDigits(el.value);
      if (el.textContent && /\d/.test(el.textContent)) el.textContent = faDigits(el.textContent);
    });
  };
  const normalizeLinks = rootNode => {
    if (root === '/') return;
    rootNode.querySelectorAll('[href],[src]').forEach(el => {
      ['href','src'].forEach(attr => {
        const value = el.getAttribute(attr);
        if (!value || !value.startsWith('/') || value.startsWith('//') || value.startsWith(root)) return;
        el.setAttribute(attr, root.replace(/\/$/, '') + value);
      });
    });
  };
  const loadShared = async () => {
    const load = async (file, selector, position) => {
      try {
        const response = await fetch(`${root}components/${file}`, { cache: 'no-store' });
        if (!response.ok) return;
        const html = await response.text();
        const current = document.querySelector(selector);
        if (current) current.outerHTML = html;
        else document.body.insertAdjacentHTML(position, html);
        const inserted = document.querySelector(selector);
        if (inserted) normalizeLinks(inserted);
      } catch (error) {
        console.warn('Platim shared component:', error);
      }
    };
    await load('header.html', '.site-header', 'afterbegin');
    await load('footer.html', '.site-footer', 'beforeend');
    if (!document.querySelector('script[src*="components/loader.js"]')) {
      const loader = document.createElement('script');
      loader.src = `${root}components/loader.js`;
      loader.defer = true;
      document.head.appendChild(loader);
    }
  };
  const start = async () => {
    if (!document.body.dataset.sharedReady) {
      document.body.dataset.sharedReady = 'true';
      await loadShared();
    }
    persianize(document.body);
    const observer = new MutationObserver(mutations => mutations.forEach(m => m.addedNodes.forEach(node => {
      if (node.nodeType === 1) persianize(node);
    })));
    observer.observe(document.body, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
