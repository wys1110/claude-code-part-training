(() => {
  'use strict';

  const slides = Array.from(document.querySelectorAll('.slide'));
  if (!slides.length) return;

  const cleanTitle = (slide, index) => {
    const heading = slide.querySelector('h1, h2, h3');
    const title = (heading?.innerText || heading?.textContent || '')
      .replace(/\s+/g, ' ')
      .trim();
    return title || `Slide ${index + 1}`;
  };

  const style = document.createElement('style');
  style.textContent = `
    .contents-btn{position:fixed;right:132px;top:18px;z-index:120;border:1px solid rgba(68,217,255,.5);border-radius:3px;background:rgba(6,19,15,.94);color:var(--neon-cyan,#44d9ff);padding:7px 13px;font:600 12px var(--mono,monospace);cursor:pointer;box-shadow:0 0 18px rgba(68,217,255,.08)}
    .contents-btn:hover,.contents-btn:focus-visible{background:rgba(68,217,255,.12);outline:2px solid rgba(68,217,255,.55);outline-offset:2px}
    .contents-overlay{position:fixed;inset:0;z-index:1000;display:none;align-items:center;justify-content:center;padding:20px;background:rgba(1,5,4,.88);backdrop-filter:blur(10px)}
    .contents-overlay.open{display:flex}
    .contents-panel{width:min(860px,100%);max-height:min(88vh,820px);overflow:hidden;border:1px solid rgba(68,217,255,.45);border-radius:6px;background:#06130f;box-shadow:0 0 60px rgba(68,217,255,.14);color:var(--terminal-ink,#eafff1)}
    .contents-header{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:20px 22px;border-bottom:1px solid rgba(68,217,255,.24);background:#071a14}
    .contents-heading{margin:0;color:var(--neon-green,#5cff95);font:700 22px var(--mono,monospace);letter-spacing:.06em}
    .contents-meta{margin-top:5px;color:var(--terminal-muted,#8aa89a);font:12px var(--mono,monospace)}
    .contents-close{display:grid;place-items:center;width:38px;height:38px;border:1px solid rgba(255,107,122,.42);border-radius:3px;background:rgba(255,107,122,.08);color:var(--neon-red,#ff6b7a);font:700 22px/1 var(--mono,monospace);cursor:pointer}
    .contents-close:hover,.contents-close:focus-visible{background:rgba(255,107,122,.16);outline:2px solid rgba(255,107,122,.48);outline-offset:2px}
    .contents-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;max-height:calc(min(88vh,820px) - 98px);overflow-y:auto;padding:18px 20px 24px;scrollbar-color:rgba(68,217,255,.45) transparent}
    .contents-item{display:grid;grid-template-columns:38px minmax(0,1fr);align-items:start;gap:10px;width:100%;border:1px solid rgba(68,217,255,.16);border-radius:4px;background:rgba(2,8,6,.72);padding:11px 12px;color:var(--terminal-ink,#eafff1);text-align:left;cursor:pointer}
    .contents-item:hover,.contents-item:focus-visible{border-color:rgba(92,255,149,.5);background:rgba(92,255,149,.08);outline:none}
    .contents-item.active{border-color:rgba(92,255,149,.62);background:linear-gradient(90deg,rgba(92,255,149,.14),rgba(2,8,6,.78));box-shadow:inset 3px 0 0 var(--neon-green,#5cff95)}
    .contents-number{color:var(--neon-cyan,#44d9ff);font:700 12px/1.45 var(--mono,monospace)}
    .contents-title{color:inherit;font:600 14px/1.45 var(--body,system-ui,sans-serif)}
    body.contents-open{overflow:hidden}
    @media(max-width:760px){.contents-btn{right:124px;padding-inline:10px;font-size:11px}.contents-overlay{padding:10px}.contents-panel{max-height:92vh}.contents-header{padding:16px}.contents-heading{font-size:19px}.contents-list{grid-template-columns:1fr;max-height:calc(92vh - 86px);padding:12px}.contents-item{grid-template-columns:34px minmax(0,1fr);padding:10px}.contents-title{font-size:13px}}
    @media print{.contents-btn,.contents-overlay{display:none!important}}
  `;
  document.head.appendChild(style);

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'contents-btn';
  button.textContent = 'CONTENTS';
  button.setAttribute('aria-haspopup', 'dialog');
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', 'contents-overlay');

  const overlay = document.createElement('div');
  overlay.id = 'contents-overlay';
  overlay.className = 'contents-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'contents-heading');
  overlay.innerHTML = `
    <div class="contents-panel">
      <div class="contents-header">
        <div>
          <h2 class="contents-heading" id="contents-heading">CONTENTS</h2>
          <div class="contents-meta">73 slides · click a title to jump</div>
        </div>
        <button type="button" class="contents-close" aria-label="Close contents">×</button>
      </div>
      <div class="contents-list" role="list"></div>
    </div>
  `;

  const list = overlay.querySelector('.contents-list');
  const closeButton = overlay.querySelector('.contents-close');
  const itemButtons = slides.map((slide, index) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'contents-item';
    item.setAttribute('role', 'listitem');
    item.dataset.index = String(index);
    item.innerHTML = `<span class="contents-number">${String(index + 1).padStart(2, '0')}</span><span class="contents-title"></span>`;
    item.querySelector('.contents-title').textContent = cleanTitle(slide, index);
    list.appendChild(item);
    return item;
  });

  document.body.append(button, overlay);

  const getCurrentIndex = () => Math.max(0, slides.findIndex((slide) => slide.classList.contains('active')));

  const refreshActiveItem = () => {
    const currentIndex = getCurrentIndex();
    itemButtons.forEach((item, index) => item.classList.toggle('active', index === currentIndex));
    return itemButtons[currentIndex];
  };

  const openContents = () => {
    overlay.classList.add('open');
    document.body.classList.add('contents-open');
    button.setAttribute('aria-expanded', 'true');
    const activeItem = refreshActiveItem();
    requestAnimationFrame(() => {
      activeItem?.scrollIntoView({ block: 'center' });
      activeItem?.focus({ preventScroll: true });
    });
  };

  const closeContents = ({ restoreFocus = true } = {}) => {
    overlay.classList.remove('open');
    document.body.classList.remove('contents-open');
    button.setAttribute('aria-expanded', 'false');
    if (restoreFocus) button.focus({ preventScroll: true });
  };

  const jumpTo = (targetIndex) => {
    const currentIndex = getCurrentIndex();
    if (targetIndex === currentIndex) return;
    const key = targetIndex > currentIndex ? 'ArrowRight' : 'ArrowLeft';
    for (let step = 0; step < Math.abs(targetIndex - currentIndex); step += 1) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
    }
  };

  button.addEventListener('click', () => {
    overlay.classList.contains('open') ? closeContents() : openContents();
  });
  closeButton.addEventListener('click', () => closeContents());
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeContents();
  });
  list.addEventListener('click', (event) => {
    const item = event.target.closest('.contents-item');
    if (!item) return;
    const targetIndex = Number(item.dataset.index);
    closeContents({ restoreFocus: false });
    jumpTo(targetIndex);
  });

  overlay.addEventListener('touchstart', (event) => event.stopPropagation(), { passive: true });
  overlay.addEventListener('touchend', (event) => event.stopPropagation(), { passive: true });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay.classList.contains('open')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeContents();
      return;
    }
    if (event.key.toLowerCase() === 'c' && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      event.stopImmediatePropagation();
      overlay.classList.contains('open') ? closeContents() : openContents();
      return;
    }
    if (!overlay.classList.contains('open')) return;
    if (event.key === 'Tab') {
      const focusable = [closeButton, ...itemButtons];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === ' ') {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
})();
