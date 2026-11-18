interface Project {
  slug: string;
  name: string;
  tag: string;
  alt: string;
  url: string;
}

const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- copy buttons ---------- */
for (const btn of $$<HTMLButtonElement>('[data-copy]')) {
  let timer = 0;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy ?? '');
    } catch {
      /* clipboard blocked: still show feedback */
    }
    btn.textContent = 'Copied';
    btn.classList.remove('done');
    void btn.offsetWidth;
    btn.classList.add('done');
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('done');
    }, 1600);
  });
}

/* ---------- install tabs ---------- */
const seg = $('#seg');
const tabs = $$<HTMLButtonElement>('[data-tab-btn]');
function selectTab(name: string, focus = false) {
  if (!seg) return;
  seg.dataset.tab = name;
  for (const t of tabs) {
    const on = t.dataset.tabBtn === name;
    t.setAttribute('aria-selected', String(on));
    t.tabIndex = on ? 0 : -1;
    const panel = document.getElementById(t.getAttribute('aria-controls') ?? '');
    if (panel) panel.hidden = !on;
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

/* ---------- before / after ---------- */
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
  }, 3800);
}

/* ---------- scroll reveal ---------- */
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

/* ---------- lightbox ---------- */
const projects: Project[] = JSON.parse($('#projects-data')?.textContent ?? '[]');
const dlg = $<HTMLDialogElement>('#lb');
const img = $<HTMLImageElement>('#lb-img');
const body = $('#lb-body');
const modeSeg = $('#lb-mode');
const modeBtns = $$<HTMLButtonElement>('[data-mode]');
let cur = 0;
let mode: 'dark' | 'light' = 'dark';

function render(animate: boolean) {
  const p = projects[cur];
  if (!p || !img) return;
  img.src = `/banners/${p.slug}/hero-${mode}.svg`;
  img.alt = `${p.name} README banner: ${p.alt}`;
  $('#lb-title')!.textContent = p.name;
  $('#lb-tag')!.textContent = p.tag;
  $('#lb-file')!.textContent = `${p.slug} / hero-${mode}.svg`;
  $<HTMLAnchorElement>('#lb-link')!.href = p.url;
  if (modeSeg) modeSeg.dataset.tab = mode;
  for (const b of modeBtns) b.setAttribute('aria-pressed', String(b.dataset.mode === mode));
  if (animate && body) {
    body.classList.remove('lb-swap');
    void body.offsetWidth;
    body.classList.add('lb-swap');
  }
}

function closeDialog() {
  if (!dlg?.open) return;
  if (reduced) return dlg.close();
  dlg.classList.add('closing');
  dlg.addEventListener(
    'animationend',
    () => {
      dlg.classList.remove('closing');
      dlg.close();
    },
    { once: true },
  );
}

for (const card of $$<HTMLButtonElement>('[data-open]')) {
  card.addEventListener('click', () => {
    cur = Number(card.dataset.open);
    render(false);
    dlg?.showModal();
  });
}
for (const b of $$<HTMLButtonElement>('[data-step]')) {
  b.addEventListener('click', () => {
    cur = (cur + Number(b.dataset.step) + projects.length) % projects.length;
    render(true);
  });
}
for (const b of modeBtns) {
  b.addEventListener('click', () => {
    mode = b.dataset.mode === 'light' ? 'light' : 'dark';
    render(true);
  });
}
$('[data-close]')?.addEventListener('click', closeDialog);
dlg?.addEventListener('cancel', (e) => {
  e.preventDefault();
  closeDialog();
});
dlg?.addEventListener('click', (e) => {
  if (e.target === dlg) closeDialog();
});
dlg?.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    if ((e.target as HTMLElement).closest('[data-mode]')) return;
    cur = (cur + (e.key === 'ArrowRight' ? 1 : -1) + projects.length) % projects.length;
    render(true);
  }
});
