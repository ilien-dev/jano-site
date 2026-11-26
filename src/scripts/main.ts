const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const es = document.documentElement.lang === 'es';
const T = es ? { copy: 'Copiar', copied: 'Copiado' } : { copy: 'Copy', copied: 'Copied' };
const BG = { light: '#F5F7FB', dark: '#0E1526' };

/* ---------- theme: light, dark or follow the system ---------- */
type Choice = 'light' | 'dark' | 'system';
const sysLight = window.matchMedia('(prefers-color-scheme: light)');
const root = document.documentElement;
const tsw = $('#tsw');
const tswBtns = $$<HTMLButtonElement>('[data-theme-choice]');
const tmBtn = $<HTMLButtonElement>('#tm-btn');
function setMenu(open: boolean, focusBtn = false) {
  if (!tsw || !tmBtn) return;
  tsw.dataset.menu = open ? 'open' : 'closed';
  tmBtn.setAttribute('aria-expanded', String(open));
  if (open) (tswBtns.find((b) => b.getAttribute('aria-checked') === 'true') ?? tswBtns[0])?.focus();
  else if (focusBtn) tmBtn.focus();
}
tmBtn?.addEventListener('click', () => setMenu(tsw?.dataset.menu !== 'open'));
document.addEventListener('click', (e) => {
  if (tsw?.dataset.menu === 'open' && !tsw.contains(e.target as Node)) setMenu(false);
});
tsw?.addEventListener('keydown', (e) => {
  if (tsw.dataset.menu !== 'open') return;
  const i = tswBtns.indexOf(document.activeElement as HTMLButtonElement);
  if (e.key === 'Escape') {
    e.preventDefault();
    setMenu(false, true);
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    const n = tswBtns.length;
    tswBtns[(i + (e.key === 'ArrowDown' ? 1 : n - 1) + n) % n]?.focus();
  } else if (e.key === 'Home' || e.key === 'End') {
    e.preventDefault();
    tswBtns[e.key === 'Home' ? 0 : tswBtns.length - 1]?.focus();
  } else if (e.key === 'Tab') {
    setMenu(false);
  }
});
const choice = (): Choice => (root.dataset.theme === 'light' || root.dataset.theme === 'dark' ? root.dataset.theme : 'system');
const resolved = (): 'light' | 'dark' => {
  const c = choice();
  return c === 'system' ? (sysLight.matches ? 'light' : 'dark') : c;
};
function applyTheme() {
  const c = choice();
  const t = resolved();
  if (tsw) tsw.dataset.choice = c;
  const name = tswBtns.find((b) => b.dataset.themeChoice === c)?.textContent?.trim() ?? c;
  tmBtn?.setAttribute('aria-label', `${tmBtn.dataset.label ?? 'Theme'}: ${name}`);
  for (const b of tswBtns) b.setAttribute('aria-checked', String(b.dataset.themeChoice === c));
  for (const m of $$<HTMLMetaElement>('meta[name="theme-color"]')) {
    // With no choice, each meta keeps its own media query; a choice pins both.
    m.content = c === 'system' ? (m.media.includes('light') ? BG.light : BG.dark) : BG[t];
  }
  // Every README picture has a dark and a light face; show the one that matches the page.
  for (const im of $$<HTMLImageElement>('img[data-scene]')) {
    const src = `/scenes/${im.dataset.scene}-${t}.svg`;
    if (!im.src.endsWith(src)) im.src = src;
  }
}
for (const b of tswBtns) {
  b.addEventListener('click', () => {
    const c = (b.dataset.themeChoice ?? 'system') as Choice;
    if (c === 'system') delete root.dataset.theme;
    else root.dataset.theme = c;
    try {
      if (c === 'system') localStorage.removeItem('theme');
      else localStorage.setItem('theme', c);
    } catch {
      /* storage blocked: the choice lasts for this visit */
    }
    applyTheme();
    setMenu(false, true);
  });
}
sysLight.addEventListener('change', applyTheme);
applyTheme();

/* ---------- copy buttons ---------- */
for (const btn of $$<HTMLButtonElement>('[data-copy]')) {
  let timer = 0;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy ?? '');
    } catch {
      /* clipboard blocked: still show feedback */
    }
    const lbl = btn.querySelector('.lbl');
    if (lbl) lbl.textContent = T.copied;
    btn.classList.remove('done');
    void btn.offsetWidth;
    btn.classList.add('done');
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      if (lbl) lbl.textContent = T.copy;
      btn.classList.remove('done');
    }, 1600);
  });
}

/* ---------- install tabs ---------- */
const tabs = $$<HTMLButtonElement>('[data-tab-btn]');
function selectTab(name: string, focus = false) {
  for (const t of tabs) {
    const on = t.dataset.tabBtn === name;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    const panel = document.getElementById(t.getAttribute('aria-controls') ?? '');
    if (panel) {
      panel.dataset.active = String(on);
      panel.inert = !on;
    }
    if (on && focus) t.focus();
  }
}
for (const t of tabs) {
  t.addEventListener('click', () => selectTab(t.dataset.tabBtn ?? 'plugin'));
  t.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const i = tabs.indexOf(t);
    const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
    selectTab(next.dataset.tabBtn ?? 'plugin', true);
  });
}

/* ---------- the front pages Jano made: one project at a time ---------- */
const projBtns = $$<HTMLButtonElement>('[data-proj]');
for (const b of projBtns) {
  b.addEventListener('click', () => {
    for (const o of projBtns) {
      const on = o === b;
      o.setAttribute('aria-pressed', String(on));
      const panel = document.getElementById(o.getAttribute('aria-controls') ?? '');
      if (panel) {
        panel.dataset.active = String(on);
        if (on) panel.scrollTop = 0;
      }
    }
  });
}

/* ---------- before / after: flips by itself until the visitor picks ---------- */
const ba = $('#ba-root');
const baBtns = $$<HTMLButtonElement>('[data-ba]');
let baTouched = false;
function setAfter(after: boolean) {
  if (!ba) return;
  ba.dataset.after = String(after);
  for (const b of baBtns) b.setAttribute('aria-pressed', String(b.dataset.ba === String(after)));
}
for (const b of baBtns) {
  b.addEventListener('click', () => {
    baTouched = true;
    setAfter(b.dataset.ba === 'true');
  });
}
if (ba && !reduced) {
  let visible = false;
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(ba);
  window.setInterval(() => {
    if (!baTouched && visible && !document.hidden) setAfter(ba.dataset.after !== 'true');
  }, 4200);
}

/* ---------- entrance for browsers without scroll-driven animations ---------- */
if (!CSS.supports('animation-timeline: view()')) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  for (const el of $$('.reveal')) io.observe(el);
}
