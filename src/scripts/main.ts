/* PESOS — client behaviour. Everything is guarded by element presence,
   so this single module is safe to load on every page. */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- theme toggle ---------- */
function initTheme() {
  const root = document.documentElement;
  const btn = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
  const apply = (t: string) => {
    root.setAttribute('data-theme', t);
    try {
      localStorage.setItem('theme', t);
    } catch {}
  };
  btn?.addEventListener('click', () => {
    const cur = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    apply(cur === 'light' ? 'dark' : 'light');
  });
}

/* ---------- sticky nav + mobile drawer ---------- */
function initNav() {
  const nav = document.querySelector('.nav');
  const onScroll = () => nav?.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const toggle = document.querySelector('[data-nav-toggle]');
  const drawer = document.querySelector('.nav__drawer');
  toggle?.addEventListener('click', () => {
    const open = drawer?.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(!!open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  drawer?.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    })
  );

  // active link by path
  const path = location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll<HTMLAnchorElement>('.nav__link, .nav__drawer a').forEach((a) => {
    const href = a.getAttribute('href')?.replace(/\/$/, '') || '/';
    if (href !== '/' && path.startsWith(href)) a.classList.add('is-active');
    if (href === '/' && path === '/') a.classList.add('is-active');
  });
}

/* ---------- scroll reveal ---------- */
function initReveal() {
  const els = document.querySelectorAll<HTMLElement>('.reveal');
  if (!els.length) return;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    els.forEach((e) => e.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  els.forEach((e) => io.observe(e));
}

/* ---------- cursor glow ---------- */
function initGlow() {
  const targets = document.querySelectorAll<HTMLElement>('.card--spotlight, .hero__visual');
  if (!targets.length || reduceMotion) return;
  let raf = 0;
  const move = (el: HTMLElement, e: MouseEvent) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
      raf = 0;
    });
  };
  targets.forEach((el) => el.addEventListener('mousemove', (e) => move(el, e as MouseEvent)));
}

/* ---------- count up ---------- */
function initCount() {
  const els = document.querySelectorAll<HTMLElement>('[data-count]');
  if (!els.length) return;
  const run = (el: HTMLElement) => {
    const raw = el.dataset.count || '0';
    const m = raw.match(/^([\d.]+)(.*)$/);
    if (!m || reduceMotion) {
      el.textContent = raw;
      return;
    }
    const end = parseFloat(m[1]);
    const suffix = m[2];
    const dec = (m[1].split('.')[1] || '').length;
    const dur = 1100;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const val = (end * (1 - Math.pow(1 - p, 3))).toFixed(dec);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((ents) => {
    ents.forEach((en) => {
      if (en.isIntersecting) {
        run(en.target as HTMLElement);
        io.unobserve(en.target);
      }
    });
  });
  els.forEach((e) => io.observe(e));
}

/* ---------- tabs (in-page panels) ---------- */
function initTabs() {
  document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((group) => {
    const tabs = group.querySelectorAll<HTMLButtonElement>('[data-tab]');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
        group
          .querySelectorAll<HTMLElement>('[data-panel]')
          .forEach((p) => (p.hidden = p.dataset.panel !== target));
      });
    });
  });
}

/* ---------- filters (chips + selects -> cards) ---------- */
function initFilters() {
  document.querySelectorAll<HTMLElement>('[data-filter-root]').forEach((root) => {
    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-item]'));
    const chips = root.querySelectorAll<HTMLButtonElement>('[data-filter]');
    const selects = root.querySelectorAll<HTMLSelectElement>('[data-filter-select]');
    const search = root.querySelector<HTMLInputElement>('[data-filter-search]');
    const countEl = root.querySelector<HTMLElement>('[data-filter-count]');
    const state: Record<string, string> = {};

    const norm = (s: string) => s.trim().toLowerCase().replace(/s$/, '');

    const apply = () => {
      const q = (search?.value || '').trim().toLowerCase();
      let shown = 0;
      cards.forEach((c) => {
        let ok = true;
        for (const key in state) {
          const val = state[key];
          if (!val || norm(val) === 'all' || val.startsWith('__')) continue;
          const cardVal = c.dataset[key] || '';
          const parts = cardVal.split('|').map(norm);
          if (!parts.includes(norm(val))) ok = false;
        }
        if (ok && q) {
          ok = (c.textContent || '').toLowerCase().includes(q);
        }
        c.style.display = ok ? '' : 'none';
        if (ok) shown++;
      });
      if (countEl) countEl.textContent = String(shown);
    };

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const key = chip.dataset.filterKey || 'cat';
        chips.forEach((c) => {
          if ((c.dataset.filterKey || 'cat') === key) c.classList.toggle('is-active', c === chip);
        });
        state[key] = chip.dataset.filter || '';
        apply();
      });
    });
    selects.forEach((sel) => {
      sel.addEventListener('change', () => {
        state[sel.dataset.filterSelect || 'cat'] = sel.value;
        apply();
      });
    });
    search?.addEventListener('input', apply);

    // seed state from any pre-selected chip / select
    chips.forEach((chip) => {
      if (chip.classList.contains('is-active')) {
        state[chip.dataset.filterKey || 'cat'] = chip.dataset.filter || '';
      }
    });
    selects.forEach((sel) => {
      if (sel.value) state[sel.dataset.filterSelect || 'cat'] = sel.value;
    });
    apply();
  });
}

/* ---------- accordion ---------- */
function initAccordion() {
  document.querySelectorAll<HTMLButtonElement>('.accordion__btn').forEach((btn) => {
    const panel0 = btn.nextElementSibling as HTMLElement | null;
    if (panel0 && btn.getAttribute('aria-expanded') === 'true') {
      panel0.style.maxHeight = panel0.scrollHeight + 'px';
    }
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      const panel = btn.nextElementSibling as HTMLElement | null;
      btn.setAttribute('aria-expanded', String(!open));
      if (panel) panel.style.maxHeight = open ? '0px' : panel.scrollHeight + 'px';
    });
  });
}

/* ---------- forms ---------- */
function initForms() {
  document.querySelectorAll<HTMLFormElement>('[data-mock-form]').forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll<HTMLElement>('.field').forEach((field) => {
        const ctrl = field.querySelector<HTMLInputElement>('input,select,textarea');
        if (!ctrl || !ctrl.required) return;
        const bad = !ctrl.value.trim();
        field.classList.toggle('has-error', bad);
        if (bad) valid = false;
      });
      if (!valid) return;

      const ok = form.querySelector<HTMLElement>('.form-success');
      const err = form.querySelector<HTMLElement>('.form-error');
      const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
      const action = form.getAttribute('action');
      err && (err.style.display = 'none');

      // real endpoint (e.g. Formspree) -> actually send it; otherwise this
      // is a static mock and we just show the success state.
      if (action && /^https?:\/\//.test(action)) {
        submitBtn && (submitBtn.disabled = true);
        try {
          const res = await fetch(action, {
            method: form.method || 'POST',
            body: new FormData(form),
            headers: { Accept: 'application/json' },
          });
          if (!res.ok) throw new Error('bad status');
          form.reset();
          if (ok) {
            ok.classList.add('show');
            ok.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
          }
        } catch {
          if (err) {
            err.style.display = '';
            err.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
          }
        } finally {
          submitBtn && (submitBtn.disabled = false);
        }
        return;
      }

      form.reset();
      if (ok) {
        ok.classList.add('show');
        ok.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      }
    });
    form.querySelectorAll<HTMLElement>('input,select,textarea').forEach((ctrl) =>
      ctrl.addEventListener('input', () =>
        ctrl.closest('.field')?.classList.remove('has-error')
      )
    );
    const ta = form.querySelector<HTMLTextAreaElement>('textarea[maxlength]');
    const counter = form.querySelector<HTMLElement>('[data-char-count]');
    if (ta && counter) {
      const upd = () => (counter.textContent = `${ta.value.length} / ${ta.maxLength}`);
      ta.addEventListener('input', upd);
      upd();
    }
  });
}

/* ---------- calendar ---------- */
function initCalendar() {
  const root = document.querySelector<HTMLElement>('[data-calendar]');
  if (!root) return;
  const events: { iso: string; title: string; type: string; time: string; location: string }[] =
    JSON.parse(root.dataset.events || '[]');
  const grid = root.querySelector<HTMLElement>('[data-cal-grid]')!;
  const label = root.querySelector<HTMLElement>('[data-cal-label]')!;
  const panel = root.querySelector<HTMLElement>('[data-cal-panel]')!;
  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December',
  ];
  let view = new Date(2026, 8, 1);
  let selected = '2026-09-14';

  const iso = (y: number, m: number, d: number) =>
    `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  const renderPanel = () => {
    const evs = events.filter((e) => e.iso === selected);
    const d = new Date(selected + 'T00:00:00');
    const head = `<div class="eyebrow" style="margin-bottom:6px">Selected date</div>
      <div class="h3" style="margin-bottom:14px">${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}</div>`;
    if (!evs.length) {
      panel.innerHTML = head + `<p class="muted" style="font-size:.88rem">No events on this date.</p>`;
      return;
    }
    panel.innerHTML =
      head +
      evs
        .map(
          (e) => `<div class="card" style="margin-bottom:10px">
        <span class="tag tag--neon">${e.type}</span>
        <div class="h3" style="margin:8px 0 4px">${e.title}</div>
        <div class="muted mono" style="font-size:.78rem">${e.time} · ${e.location}</div>
      </div>`
        )
        .join('') + `<p class="muted" style="font-size:.8rem">${evs.length} event(s) on this date</p>`;
  };

  const render = () => {
    const y = view.getFullYear();
    const m = view.getMonth();
    label.textContent = `${monthNames[m]} ${y}`;
    const first = new Date(y, m, 1).getDay();
    const days = new Date(y, m + 1, 0).getDate();
    let html = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
      .map((d) => `<div class="cal__dow">${d}</div>`)
      .join('');
    for (let i = 0; i < first; i++) html += `<span class="cal__day is-empty"></span>`;
    for (let d = 1; d <= days; d++) {
      const id = iso(y, m, d);
      const has = events.some((e) => e.iso === id);
      html += `<button class="cal__day${has ? ' has-event' : ''}${
        id === selected ? ' is-selected' : ''
      }" data-iso="${id}">${d}</button>`;
    }
    grid.innerHTML = html;
    grid.querySelectorAll<HTMLButtonElement>('.cal__day[data-iso]').forEach((btn) =>
      btn.addEventListener('click', () => {
        selected = btn.dataset.iso!;
        render();
        renderPanel();
      })
    );
  };

  root.querySelector('[data-cal-prev]')?.addEventListener('click', () => {
    view = new Date(view.getFullYear(), view.getMonth() - 1, 1);
    render();
  });
  root.querySelector('[data-cal-next]')?.addEventListener('click', () => {
    view = new Date(view.getFullYear(), view.getMonth() + 1, 1);
    render();
  });

  render();
  renderPanel();
}

/* ---------- toggle groups (e.g. All Projects / My Contributions) ---------- */
function initToggleGroups() {
  document.querySelectorAll<HTMLElement>('[data-toggle-group]').forEach((g) => {
    const btns = g.querySelectorAll<HTMLButtonElement>('button');
    btns.forEach((b) =>
      b.addEventListener('click', () =>
        btns.forEach((x) => x.classList.toggle('is-active', x === b))
      )
    );
  });
}

function boot() {
  initTheme();
  initNav();
  initReveal();
  initGlow();
  initCount();
  initTabs();
  initFilters();
  initAccordion();
  initForms();
  initCalendar();
  initToggleGroups();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
