(() => {
  'use strict';
  const doc = document.documentElement;
  doc.classList.add('js');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const TG = 'https://t.me/dolepp';
  const MAIL = 'makarenkoae11@yandex.ru';

  /* toast */
  const toastEl = $('#toast');
  let toastT;
  const toast = (msg) => {
    toastEl.textContent = msg;
    toastEl.classList.add('on');
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove('on'), 3200);
  };

  /* reveal on scroll */
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal, .timeline').forEach((el) => io.observe(el));

  /* hero videos: play only when visible */
  const loops = $$('#reel, #phoneLoop');
  if (!reduce) {
    const vio = new IntersectionObserver((es) => es.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting) v.play().catch(() => {}); else v.pause();
    }), { threshold: 0.25 });
    loops.forEach((v) => vio.observe(v));
  }

  /* works: filter */
  const works = $$('.work');
  const btns = $$('.fbtn');
  btns.forEach((b) => b.addEventListener('click', () => {
    const f = b.dataset.filter;
    btns.forEach((x) => { x.classList.toggle('is-on', x === b); x.setAttribute('aria-selected', x === b); });
    works.forEach((w) => {
      const show = f === 'all' || w.dataset.cat === f;
      if (show) { w.hidden = false; requestAnimationFrame(() => w.classList.remove('is-out')); }
      else { w.classList.add('is-out'); setTimeout(() => { if (w.classList.contains('is-out')) w.hidden = true; }, 280); }
    });
  }));

  /* works: hover preview (desktop only, loaded lazily) */
  if (fine && !reduce) {
    works.forEach((w) => {
      const media = $('.work__media', w);
      const v = $('video', w);
      let loaded = false;
      w.addEventListener('mouseenter', () => {
        if (!loaded) { v.src = w.dataset.src; loaded = true; }
        v.play().then(() => media.classList.add('is-live')).catch(() => {});
      });
      w.addEventListener('mouseleave', () => {
        media.classList.remove('is-live');
        setTimeout(() => { if (!media.classList.contains('is-live')) v.pause(); }, 260);
      });
    });
  }

  /* modal player */
  const modal = $('#modal');
  const box = $('#modalBox');
  const mv = $('#modalVideo');
  const mt = $('#modalTitle');
  let opener = null;
  const open = (w) => {
    opener = document.activeElement;
    box.classList.toggle('is-v', w.dataset.orient === 'v');
    mt.textContent = w.dataset.title;
    mv.src = w.dataset.src;
    mv.poster = $('img', w).src;
    modal.hidden = false;
    doc.style.overflow = 'hidden';
    mv.play().catch(() => {});
    $('.modal__x').focus({ preventScroll: true });
  };
  const close = () => {
    mv.pause();
    mv.removeAttribute('src');
    mv.load();
    modal.hidden = true;
    doc.style.overflow = '';
    if (opener) opener.focus({ preventScroll: true });
  };
  works.forEach((w) => $('.work__btn', w).addEventListener('click', () => open(w)));
  modal.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) close(); });
  document.addEventListener('keydown', (e) => {
    if (modal.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'Tab') {
      const f = $$('button, a[href], video', modal).filter((x) => !x.hidden);
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* service links preselect the order form */
  $$('[data-pick]').forEach((a) => a.addEventListener('click', () => {
    const r = $(`input[name="type"][value="${a.dataset.pick}"]`);
    if (r) r.checked = true;
  }));

  /* brief builder */
  const form = $('#brief');
  const hint = $('#briefHint');
  const mailBtn = $('#sendMail');
  const val = (n) => (form.querySelector(`input[name="${n}"]:checked`) || {}).value || '';
  const compose = () => {
    const have = $$('input[name="have"]:checked', form).map((i) => i.value).join(', ') || 'уточню в переписке';
    const note = form.elements.note.value.trim();
    return [
      'Здравствуйте! Хочу заказать монтаж.',
      `Что нужно: ${val('type')}`,
      `Длительность: ${val('len')}`,
      `Срок: ${val('when')}`,
      `Что уже есть: ${have}`,
      note ? `Пожелания: ${note}` : '',
      '',
      'Расскажите, как будем работать и сколько это стоит?'
    ].filter((l, i, a) => l !== '' || a[i - 1] !== '').join('\n');
  };
  const syncMail = () => {
    mailBtn.href = `mailto:${MAIL}?subject=${encodeURIComponent('Заказ монтажа')}&body=${encodeURIComponent(compose())}`;
  };
  form.addEventListener('input', syncMail);
  syncMail();
  const copy = async (text) => {
    try { await navigator.clipboard.writeText(text); return true; }
    catch (_) {
      const t = document.createElement('textarea');
      t.value = text; t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (__) { /* noop */ }
      t.remove();
      return ok;
    }
  };
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = compose();
    window.open(`${TG}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    copy(text).then((ok) => {
      const m = ok ? 'Текст скопирован. Вставьте его в чат Telegram' : 'Откройте чат и опишите задачу своими словами';
      hint.textContent = m;
      toast(m);
    });
  });

  /* copy email */
  const cm = $('#copyMail');
  if (cm) cm.addEventListener('click', () => copy(MAIL).then((ok) => toast(ok ? 'Почта скопирована' : MAIL)));

  /* sticky mobile CTA: after hero, hidden near final block */
  const mbar = $('#mbar');
  const hero = $('.hero');
  const final = $('#contact');
  const order = $('#order');
  const state = { hero: true, final: false, order: false };
  const upd = () => mbar.classList.toggle('on', !state.hero && !state.final && !state.order && modal.hidden);
  const mio = new IntersectionObserver((es) => es.forEach((e) => {
    state[e.target === hero ? 'hero' : e.target === final ? 'final' : 'order'] = e.isIntersecting;
    upd();
  }), { threshold: 0.05 });
  [hero, final, order].forEach((el) => mio.observe(el));

  /* lightweight click tracking hook (no external analytics): window.dataLayer if present */
  $$('[data-cta]').forEach((a) => a.addEventListener('click', () => {
    if (window.dataLayer) window.dataLayer.push({ event: 'cta_click', place: a.dataset.cta });
  }));
})();
