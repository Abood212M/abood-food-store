/* =====================================================================
   Abood Food Store — منطق الموقع
   ⚠️ متعدّلش هنا. كل البيانات في js/menu.js
   Security: no innerHTML anywhere (XSS-safe), inputs sanitized, CSP-compatible (no inline JS/CSS)
   ===================================================================== */
(() => {
  'use strict';

  const S = window.STORE;
  if (!S || !Array.isArray(S.items) || !Array.isArray(S.categories)) {
    document.body.textContent = '⚠️ فيه غلطة في ملف js/menu.js (غالباً فاصلة أو قوس ناقص). دوس F12 ثم Console هتلاقي رقم السطر.';
    return;
  }

  /* ---------- النصوص (عربي / English) ---------- */
  const T = {
    ar: {
      skip: 'تخطي إلى المنيو', search: 'ابحث في المنيو… شاورما، برجر، كنافة', best: 'الأكثر طلباً', addToCart: 'أضف للسلة',
      viewCart: 'عرض الطلب', cart: 'طلبك', empty: 'السلة فاضية… اختار أكلتك 😋', subtotal: 'المجموع', discount: 'الخصم',
      delivery: 'التوصيل', free: 'مجاني', total: 'الإجمالي', name: 'الاسم', phone: 'رقم الموبايل',
      address: 'العنوان بالتفصيل', addressPh: 'الشارع، رقم العمارة، الدور، علامة مميزة', note: 'ملاحظات (اختياري)', notePh: 'مثلاً: من غير بصل',
      zone: 'المنطقة / طريقة الاستلام', chooseZone: 'اختار…', branch: 'الفرع', coupon: 'كود خصم', apply: 'تطبيق',
      send: 'إرسال الطلب على واتساب', openNow: 'مفتوح الآن', closedNow: 'مقفول الآن',
      closedMsg: 'المطعم مقفول دلوقتي — تقدر تتفرج على المنيو، والطلب بيفتح الساعة', install: '📲 ثبّت التطبيق',
      iosInstall: 'على الآيفون: دوس زرار المشاركة ⬆️ ثم «إضافة إلى الشاشة الرئيسية»',
      noResults: 'مفيش نتائج… جرّب كلمة تانية', unavailable: 'غير متاح حالياً', extras: 'إضافات', upTo: 'لحد', size: 'الحجم',
      added: 'اتضاف للسلة ✓', maxAddons: 'وصلت للحد الأقصى من الإضافات', errName: 'اكتب اسمك',
      errPhone: 'اكتب رقم موبايل مصري صحيح (11 رقم يبدأ بـ 01)', errAddr: 'اكتب العنوان بالتفصيل', errZone: 'اختار المنطقة أو الاستلام من المطعم',
      couponOk: 'تم تطبيق الكود ✓', couponBad: 'الكود غير صحيح', couponMin: 'الكود ده للطلبات فوق', freeOver: 'توصيل مجاني فوق',
      deliveryFrom: 'التوصيل من', payCash: 'الدفع كاش عند الاستلام', clear: 'تفريغ السلة', clearQ: 'تفريغ السلة بالكامل؟',
      close: 'إغلاق', prev: 'العرض السابق', next: 'العرض التالي', offersLabel: 'العروض', categories: 'أقسام المنيو', orderNow: 'اطلب دلوقتي ←',
      am: 'ص', pm: 'م', confirmNote: 'المطعم هيأكد معاك الطلب والسعر النهائي على واتساب.', increase: 'زيادة', decrease: 'تقليل',
      langBtn: 'EN', footNote: 'اطلب مباشرة من المطعم — بدون عمولات ولا رسوم خدمة', call: '📞 اتصل بالمطعم'
    },
    en: {
      skip: 'Skip to menu', search: 'Search the menu… shawarma, burger, kunafa', best: 'Most ordered', addToCart: 'Add to cart',
      viewCart: 'View order', cart: 'Your order', empty: 'Your cart is empty… pick something tasty 😋', subtotal: 'Subtotal', discount: 'Discount',
      delivery: 'Delivery', free: 'Free', total: 'Total', name: 'Name', phone: 'Mobile number',
      address: 'Detailed address', addressPh: 'Street, building no., floor, landmark', note: 'Notes (optional)', notePh: 'e.g. no onions',
      zone: 'Area / pickup', chooseZone: 'Choose…', branch: 'Branch', coupon: 'Promo code', apply: 'Apply',
      send: 'Send order on WhatsApp', openNow: 'Open now', closedNow: 'Closed now',
      closedMsg: 'We are closed now — browse the menu; ordering opens at', install: '📲 Install app',
      iosInstall: 'On iPhone: tap Share ⬆️ then “Add to Home Screen”',
      noResults: 'No results… try another word', unavailable: 'Unavailable', extras: 'Extras', upTo: 'up to', size: 'Size',
      added: 'Added to cart ✓', maxAddons: 'Maximum extras reached', errName: 'Please enter your name',
      errPhone: 'Enter a valid Egyptian mobile (11 digits starting with 01)', errAddr: 'Please enter your detailed address', errZone: 'Choose your area or pickup',
      couponOk: 'Code applied ✓', couponBad: 'Invalid code', couponMin: 'This code is for orders above', freeOver: 'Free delivery over',
      deliveryFrom: 'Delivery from', payCash: 'Cash on delivery', clear: 'Clear cart', clearQ: 'Clear the whole cart?',
      close: 'Close', prev: 'Previous offer', next: 'Next offer', offersLabel: 'Offers', categories: 'Menu categories', orderNow: 'Order now →',
      am: 'AM', pm: 'PM', confirmNote: 'The restaurant will confirm your order and final price on WhatsApp.', increase: 'Increase', decrease: 'Decrease',
      langBtn: 'عربي', footNote: 'Order directly from the restaurant — no commissions, no service fees', call: '📞 Call the restaurant'
    }
  };

  /* ---------- أدوات ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const PROPS = new Set(['value', 'checked', 'disabled', 'selected']);
  function h(tag, props, ...kids) {
    const el = document.createElement(tag);
    if (props) for (const [k, v] of Object.entries(props)) {
      if (v === null || v === undefined || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else if (PROPS.has(k)) el[k] = v;
      else el.setAttribute(k, v === true ? '' : String(v));
    }
    for (const kid of kids.flat(Infinity)) {
      if (kid === null || kid === undefined || kid === false) continue;
      el.append(kid instanceof Node ? kid : document.createTextNode(String(kid)));
    }
    return el;
  }
   const put = (el, ...kids) => el.replaceChildren(...kids.flat(Infinity).filter(k => k !== null && k !== undefined && k !== false));
  const mem = {
    get(k, d) { try { const v = localStorage.getItem('afs:' + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem('afs:' + k, JSON.stringify(v)); } catch { /* private mode */ } }
  };
  let lang = mem.get('lang', 'ar') === 'en' ? 'en' : 'ar';
  const t = k => (T[lang] && T[lang][k]) || T.ar[k] || k;
  const L = o => (o && typeof o === 'object') ? (o[lang] || o.ar || '') : String(o ?? '');
  const nm = it => (lang === 'en' && it.en) ? it.en : it.ar;
  const ds = it => (lang === 'en' && it.den) ? it.den : (it.dar || '');
  const money = n => `${Math.round(n).toLocaleString('en-US')} ${L(S.currency)}`;
  const reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const toLatin = s => String(s ?? '').replace(/[\u0660-\u0669]/g, d => d.charCodeAt(0) - 0x0660).replace(/[\u06F0-\u06F9]/g, d => d.charCodeAt(0) - 0x06F0);
  const clean = (s, max) => String(s ?? '').replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200F\u202A-\u202E\u2060-\u2069\uFEFF]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
  const norm = s => toLatin(s).toLowerCase().replace(/[\u064B-\u065F\u0670\u0640]/g, '').replace(/[أإآٱ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/ؤ/g, 'و').replace(/ئ/g, 'ي').replace(/\s+/g, ' ').trim();

  /* ---------- البيانات ---------- */
  const ITEMS = new Map();
  for (const it of S.items) {
    if (ITEMS.has(it.id)) console.warn('⚠️ رقم صنف مكرر:', it.id);
    if (!(Number.isFinite(it.price) && it.price >= 0)) console.warn('⚠️ سعر غلط في الصنف:', it.id);
    ITEMS.set(it.id, it);
  }
  const CAT = new Map(S.categories.map(c => [c.id, c]));
  const IDX = new Map(S.items.map(it => { const c = CAT.get(it.cat) || {}; return [it.id, norm([it.ar, it.en, it.dar, it.den, c.ar, c.en].join(' '))]; }));
  const sizeSet = it => (it && it.sizes && S.sizeSets && S.sizeSets[it.sizes]) || null;
  const addonSet = it => (it && it.add && S.addonSets && S.addonSets[it.add]) || null;
  const needsOptions = it => !!(sizeSet(it) || addonSet(it));
  function unitPrice(it, s, adds) {
    let p = it.price;
    const ss = sizeSet(it); if (ss && ss.opts[s]) p += ss.opts[s].add || 0;
    const as = addonSet(it); if (as) for (const a of adds) if (as.opts[a]) p += as.opts[a].price || 0;
    return p;
  }
  const oldUnit = (it, s, adds) => (it.old > it.price) ? unitPrice(it, s, adds) - it.price + it.old : 0;

  /* ---------- مواعيد العمل ---------- */
  const toMin = s => { const [a, b] = String(s).split(':').map(Number); return (a || 0) * 60 + (b || 0); };
  function nowMinutes() {
    try {
      const parts = new Intl.DateTimeFormat('en-GB', { timeZone: S.hours.timezone || 'Africa/Cairo', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
      return (+parts.find(p => p.type === 'hour').value % 24) * 60 + (+parts.find(p => p.type === 'minute').value);
    } catch { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); }
  }
  function isOpen() {
    if (!S.hours || S.hours.alwaysOpen) return true;
    const n = nowMinutes(), o = toMin(S.hours.open), c = toMin(S.hours.close);
    if (o === c) return true;
    return o < c ? (n >= o && n < c) : (n >= o || n < c);
  }
  function fmtTime(s) { const m = toMin(s), hh = Math.floor(m / 60) % 24, mm = m % 60; return `${hh % 12 || 12}:${String(mm).padStart(2, '0')} ${hh >= 12 ? t('pm') : t('am')}`; }

  /* ---------- الحالة ---------- */
  const branches = Array.isArray(S.branches) ? S.branches : [];
  let bIdx = parseInt(mem.get('branch', 0), 10); if (!(bIdx >= 0 && bIdx < branches.length)) bIdx = 0;
  const branch = () => branches[bIdx];
  let zIdx = parseInt(mem.get('zone', -1), 10); if (!(branch() && branch().zones && branch().zones[zIdx])) zIdx = -1;
  let coupon = null;
  const keyOf = l => `${l.id}|${l.s}|${l.a.join(',')}`;
  const lineTotal = l => unitPrice(ITEMS.get(l.id), l.s, l.a) * l.q;
  function loadCart() {
    const raw = mem.get('cart', []);
    if (!Array.isArray(raw)) return [];
    const out = [];
    for (const l of raw.slice(0, 100)) {
      const it = l && ITEMS.get(l.id); if (!it || it.off) continue;
      const ss = sizeSet(it), as = addonSet(it);
      const s = (ss && Number.isInteger(l.s) && ss.opts[l.s]) ? l.s : 0;
      const a = (as && Array.isArray(l.a)) ? [...new Set(l.a.filter(x => Number.isInteger(x) && as.opts[x]))].sort((x, y) => x - y).slice(0, as.max || 99) : [];
      const q = Math.min(50, Math.max(1, parseInt(l.q, 10) || 1));
      out.push({ id: it.id, s, a, q });
    }
    return out;
  }
  let cart = loadCart();
  const cr = mem.get('cust', {}) || {};
  const cust = { name: clean(cr.name, 40), phone: clean(cr.phone, 20), addr: clean(cr.addr, 200) };
  function totals() {
    const sub = cart.reduce((s, l) => s + lineTotal(l), 0);
    const c = coupon ? (S.coupons || []).find(x => x.code === coupon) : null;
    let disc = 0, short = 0;
    if (c) {
      if (sub >= (c.min || 0)) {
        disc = c.type === 'percent' ? Math.round(sub * c.value / 100) : (c.value || 0);
        if (c.maxDiscount) disc = Math.min(disc, c.maxDiscount);
        disc = Math.min(disc, sub);
      } else short = c.min;
    }
    const z = branch() && branch().zones ? branch().zones[zIdx] : null;
    const after = sub - disc;
    let fee = 0;
    if (z && !z.pickup) fee = (S.freeDeliveryOver && after >= S.freeDeliveryOver) ? 0 : (z.fee || 0);
    return { sub, disc, fee, total: after + fee, zone: z, short, c };
  }

  /* ---------- Toast + Dialogs ---------- */
  const toastEl = $('#toast'); let toastTimer;
  function toast(msg, ms = 2200) {
    const host = document.querySelector('dialog[open]') || document.body;
    if (toastEl.parentNode !== host) host.append(toastEl);
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove('show'), ms);
  }
  const showDlg = d => { if (typeof d.showModal === 'function') { if (!d.open) d.showModal(); } else d.setAttribute('open', ''); };
  const closeDlg = d => { if (typeof d.close === 'function') d.close(); else d.removeAttribute('open'); };
  document.querySelectorAll('dialog').forEach(d => d.addEventListener('click', e => { if (e.target === d) closeDlg(d); }));

  /* ---------- الصور ---------- */
  function picture(sources, alt, eager) {
    const img = h('img', { alt: alt || '', decoding: 'async', loading: eager ? 'eager' : 'lazy' });
    let i = 0;
    img.addEventListener('load', () => img.classList.add('ok'));
    img.addEventListener('error', () => { i += 1; if (i < sources.length) img.src = sources[i]; else img.remove(); });
    img.src = sources[0];
    return img;
  }
  const itemSrc = id => { const f = encodeURIComponent(String(id)); return [`images/items/${f}.jpg`, `images/items/${f}.webp`]; };
  function media(it, cls, eager) {
    const c = CAT.get(it.cat);
    return h('div', { class: 'media' + (cls ? ' ' + cls : '') }, h('span', { class: 'ph', 'aria-hidden': 'true', text: (c && c.icon) || '🍽️' }), picture(itemSrc(it.id), nm(it), eager));
  }

  /* ---------- الهيدر ---------- */
  const logo = $('#logo');
  logo.addEventListener('error', () => { logo.hidden = true; });
  if (logo.complete && logo.naturalWidth === 0) logo.hidden = true;
  $('#logoFallback').textContent = String(S.name || 'A').trim().charAt(0).toUpperCase();
  function renderHeader() {
    document.title = S.name;
    $('#storeName').textContent = S.name; logo.alt = S.name;
    $('#tagline').textContent = L(S.tagline);
    const open = isOpen();
    const zones = ((branch() && branch().zones) || []).filter(z => !z.pickup);
    const minFee = zones.length ? Math.min(...zones.map(z => z.fee || 0)) : 0;
    put($('#info'),
      h('span', { class: 'pill' + (open ? '' : ' closed') }, h('span', { class: 'led' }), open ? t('openNow') : t('closedNow')),
      (S.hours && !S.hours.alwaysOpen) ? h('span', { class: 'pill', text: `🕐 ${fmtTime(S.hours.open)} – ${fmtTime(S.hours.close)}` }) : null,
      zones.length ? h('span', { class: 'pill', text: `🛵 ${t('deliveryFrom')} ${money(minFee)}` }) : null,
      S.freeDeliveryOver ? h('span', { class: 'pill', text: `🎁 ${t('freeOver')} ${money(S.freeDeliveryOver)}` }) : null);
    const bar = $('#closedBar'); bar.hidden = open; bar.textContent = open ? '' : `🌙 ${t('closedMsg')} ${fmtTime(S.hours.open)}`;
    $('#footName').textContent = S.name;
    $('#credit').textContent = (S.credit && S.credit.text) || '';
    const wa = String((branch() && branch().whatsapp) || '').replace(/\D/g, '');
    const call = $('#callLink'); if (wa) call.href = 'tel:+' + wa; else call.hidden = true;
  }

  /* ---------- العروض ---------- */
  const track = $('#offTrack'); let offIdx = 0, pausedUntil = 0;
  const hold = () => { pausedUntil = Date.now() + 8000; };
  function markDots() { [...$('#offDots').children].forEach((d, i) => { d.classList.toggle('on', i === offIdx); if (i === offIdx) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); }); }
  function goTo(i, instant) {
    const n = track.children.length; if (!n) return;
    offIdx = ((i % n) + n) % n;
    const left = offIdx * track.clientWidth;
    if (typeof track.scrollTo === 'function') track.scrollTo({ left, behavior: (instant || reduced) ? 'auto' : 'smooth' }); else track.scrollLeft = left;
    markDots();
  }
  function renderOffers() {
    const offers = Array.isArray(S.offers) ? S.offers : [];
    $('#offers').hidden = offers.length === 0;
    $('#offPrev').hidden = $('#offNext').hidden = offers.length < 2;
    track.replaceChildren(...offers.map((o, i) => {
      const slide = h('div', { class: 'slide' + (o.item ? ' clickable' : ''), dir: lang === 'ar' ? 'rtl' : 'ltr', role: 'group', 'aria-roledescription': 'slide', 'aria-label': `${i + 1} / ${offers.length}`, tabindex: o.item ? '0' : null },
        picture([`images/offers/${i + 1}.jpg`, `images/offers/${i + 1}.webp`], '', i === 0),
        h('span', { class: 'slide-emoji', 'aria-hidden': 'true', text: o.emoji || '🔥' }),
        h('div', { class: 'slide-txt' },
          o.tag ? h('span', { class: 'slide-tag', text: L(o.tag) }) : null,
          h('h3', { text: L(o.title) }),
          o.sub ? h('p', { text: L(o.sub) }) : null,
          o.item ? h('span', { class: 'slide-cta', text: t('orderNow') }) : null));
      if (o.item) {
        slide.addEventListener('click', () => openItem(o.item));
        slide.addEventListener('keydown', e => { if (e.key === 'Enter') openItem(o.item); });
      }
      return slide;
    }));
    $('#offDots').replaceChildren(...offers.map((_, i) => h('button', { type: 'button', class: 'dot', 'aria-label': `${t('offersLabel')} ${i + 1}`, onclick: () => { hold(); goTo(i); } })));
    offIdx = 0; track.scrollLeft = 0; markDots();
  }
  let scrollT;
  track.addEventListener('scroll', () => { clearTimeout(scrollT); scrollT = setTimeout(() => { offIdx = Math.round(track.scrollLeft / (track.clientWidth || 1)); markDots(); }, 80); }, { passive: true });
  ['pointerdown', 'touchstart', 'wheel', 'focusin'].forEach(ev => $('#offers').addEventListener(ev, hold, { passive: true }));
  $('#offPrev').addEventListener('click', () => { hold(); goTo(offIdx - 1); });
  $('#offNext').addEventListener('click', () => { hold(); goTo(offIdx + 1); });
  $('#offers').addEventListener('keydown', e => { if (e.key === 'ArrowLeft') { hold(); goTo(offIdx - 1); } else if (e.key === 'ArrowRight') { hold(); goTo(offIdx + 1); } });
  window.addEventListener('resize', () => goTo(offIdx, true));
  if (!reduced) setInterval(() => { if (!document.hidden && Date.now() > pausedUntil && !document.querySelector('dialog[open]')) goTo(offIdx + 1); }, 5000);

  /* ---------- كروت الأصناف ---------- */
  const priceNode = it => h('span', { class: 'price' }, money(it.price), it.old > it.price ? h('s', { class: 'old', text: money(it.old) }) : null);
  function card(it, mini) {
    const off = !!it.off;
    const m = media(it);
    m.append(h('div', { class: 'badges' },
      it.old > it.price ? h('span', { class: 'badge', text: `-${Math.round((1 - it.price / it.old) * 100)}%` }) : null,
      (it.best && !mini) ? h('span', { class: 'badge hot', text: '🔥' }) : null));
    if (off) m.append(h('span', { class: 'off-tag', text: t('unavailable') }));
    const plus = off ? null : h('button', { type: 'button', class: 'plus', 'aria-label': `${t('addToCart')}: ${nm(it)}`, text: '+',
      onclick: e => { e.stopPropagation(); if (needsOptions(it)) openItem(it.id); else addToCart(it.id, 0, [], 1); } });
    const el = h('article', { class: 'card' + (off ? ' off' : '') + (mini ? ' mini' : ''), tabindex: off ? null : '0', 'aria-disabled': off ? 'true' : null },
      m, h('div', { class: 'card-b' }, h('h3', { text: nm(it) }), mini ? null : h('p', { text: ds(it) }), h('div', { class: 'row' }, priceNode(it), plus)));
    if (!off) {
      el.addEventListener('click', () => openItem(it.id));
      el.addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target === el) { e.preventDefault(); openItem(it.id); } });
    }
    return el;
  }
  function renderBest() {
    const list = S.items.filter(i => i.best && !i.off);
    $('#bestList').replaceChildren(...list.map(i => card(i, true)));
    return list.length;
  }

  /* ---------- المنيو + البحث + الأقسام ---------- */
  let spy = null;
  function renderMenu() {
    const q = norm($('#q').value);
    const secs = [], tabs = [];
    let total = 0;
    for (const c of S.categories) {
      const items = S.items.filter(i => i.cat === c.id && (!q || IDX.get(i.id).includes(q)));
      if (!items.length) continue;
      total += items.length;
      secs.push(h('section', { class: 'cat', id: 'cat-' + c.id, 'data-cat': c.id },
        h('h2', { class: 'sec' }, h('span', { 'aria-hidden': 'true', text: c.icon || '' }), ' ', L(c), h('small', { text: String(items.length) })),
        h('div', { class: 'grid' }, items.map(i => card(i)))));
      tabs.push(h('button', { type: 'button', class: 'tab', 'data-cat': c.id, text: `${c.icon || ''} ${L(c)}`, onclick: () => jump(c.id) }));
    }
    $('#sections').replaceChildren(...secs);
    $('#tabs').replaceChildren(...tabs);
    $('#noResults').hidden = total > 0;
    $('#bestSec').hidden = !!q || !S.items.some(i => i.best && !i.off);
    if (tabs[0]) tabs[0].classList.add('on');
    observeSections();
  }
  function jump(id) {
    const sec = document.getElementById('cat-' + id);
    if (sec) sec.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    setActiveTab(id);
  }
  function setActiveTab(id) {
    const tabs = $('#tabs');
    for (const b of tabs.children) {
      const on = b.dataset.cat === id;
      b.classList.toggle('on', on);
      if (on) {
        b.setAttribute('aria-current', 'true');
        const br = b.getBoundingClientRect(), tr = tabs.getBoundingClientRect();
        const d = (br.left + br.width / 2) - (tr.left + tr.width / 2);
        if (Math.abs(d) > 4 && typeof tabs.scrollBy === 'function') tabs.scrollBy({ left: d, behavior: reduced ? 'auto' : 'smooth' });
      } else b.removeAttribute('aria-current');
    }
  }
  function observeSections() {
    if (spy) spy.disconnect();
    if (!('IntersectionObserver' in window)) return;
    spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setActiveTab(e.target.dataset.cat); }), { rootMargin: '-140px 0px -55% 0px' });
    document.querySelectorAll('section.cat').forEach(s => spy.observe(s));
  }
  let qT; $('#q').addEventListener('input', () => { clearTimeout(qT); qT = setTimeout(renderMenu, 120); });

  /* ---------- نافذة الصنف (أحجام + إضافات) ---------- */
  function openItem(id) {
    const it = ITEMS.get(id); if (!it || it.off) return;
    const ss = sizeSet(it), as = addonSet(it), dlg = $('#itemDlg');
    let s = 0, q = 1; const adds = new Set();
    const qv = h('span', { class: 'qv', 'aria-live': 'polite' });
    const addBtn = h('button', { type: 'button', class: 'primary' });
    const refresh = () => {
      qv.textContent = String(q);
      const p = unitPrice(it, s, [...adds]) * q, op = oldUnit(it, s, [...adds]) * q;
      addBtn.replaceChildren(h('span', { text: t('addToCart') }), h('span', null, op ? h('s', { class: 'old light', text: money(op) }) : null, h('b', { text: money(p) })));
    };
    const parts = [media(it, 'dlg-media', true),
      h('div', { class: 'dlg-txt' }, h('h2', { id: 'itemTitle', text: nm(it) }), ds(it) ? h('p', { class: 'muted', text: ds(it) }) : null, priceNode(it))];
    if (ss) parts.push(h('fieldset', { class: 'opt' }, h('legend', { text: L(ss.title) || t('size') }),
      ss.opts.map((o, i) => h('label', { class: 'choice' },
        h('input', { type: 'radio', name: 'size', checked: i === 0, onchange: () => { s = i; refresh(); } }),
        h('span', { class: 'n', text: L(o) }), h('span', { class: 'p', text: o.add ? `+${money(o.add)}` : '' })))));
    if (as) parts.push(h('fieldset', { class: 'opt' }, h('legend', null, t('extras'), as.max ? h('small', { class: 'muted', text: ` (${t('upTo')} ${as.max})` }) : null),
      as.opts.map((o, i) => h('label', { class: 'choice' },
        h('input', { type: 'checkbox', onchange: e => {
          if (e.target.checked) { if (as.max && adds.size >= as.max) { e.target.checked = false; toast(t('maxAddons')); return; } adds.add(i); }
          else adds.delete(i);
          refresh();
        } }),
        h('span', { class: 'n', text: L(o) }), h('span', { class: 'p', text: o.price ? `+${money(o.price)}` : t('free') })))));
    addBtn.addEventListener('click', () => { addToCart(it.id, s, [...adds], q); closeDlg(dlg); });
    const stepper = h('div', { class: 'stepper' },
      h('button', { type: 'button', 'aria-label': t('decrease'), text: '−', onclick: () => { if (q > 1) { q -= 1; refresh(); } } }), qv,
      h('button', { type: 'button', 'aria-label': t('increase'), text: '+', onclick: () => { if (q < 20) { q += 1; refresh(); } } }));
    dlg.setAttribute('aria-labelledby', 'itemTitle');
    dlg.replaceChildren(h('button', { type: 'button', class: 'x', 'aria-label': t('close'), text: '✕', onclick: () => closeDlg(dlg) }),
      h('div', { class: 'sheet-body' }, parts), h('div', { class: 'sheet-foot' }, stepper, addBtn));
    refresh(); showDlg(dlg);
    dlg.querySelector('.sheet-body').scrollTop = 0;
  }

  /* ---------- السلة ---------- */
  function addToCart(id, s, a, q) {
    const it = ITEMS.get(id); if (!it || it.off || cart.length >= 100) return;
    const line = { id, s, a: [...a].sort((x, y) => x - y), q };
    const ex = cart.find(l => keyOf(l) === keyOf(line));
    if (ex) ex.q = Math.min(50, ex.q + q); else cart.push(line);
    saveCart(); toast(`${t('added')} — ${nm(it)}`);
    const bar = $('#cartBar'); bar.classList.remove('bump'); void bar.offsetWidth; bar.classList.add('bump');
  }
  function saveCart() { mem.set('cart', cart); updateBar(); }
  function updateBar() {
    const n = cart.reduce((s, l) => s + l.q, 0);
    $('#cartBar').hidden = n === 0;
    $('#cbCount').textContent = String(n);
    $('#cbTotal').textContent = money(totals().sub);
  }
  $('#cartBar').addEventListener('click', () => { buildCart(); showDlg($('#cartDlg')); });

  let R = null;   // refs to cart form elements
  const field = (label, input) => h('label', { class: 'field' }, h('span', { text: label }), input);
  function buildCart() {
    const dlg = $('#cartDlg');
    const head = h('div', { class: 'sheet-head' }, h('h2', { id: 'cartTitle', text: `🛒 ${t('cart')}` }),
      h('button', { type: 'button', class: 'x inline', 'aria-label': t('close'), text: '✕', onclick: () => closeDlg(dlg) }));
    dlg.setAttribute('aria-labelledby', 'cartTitle');
    if (!cart.length) {
      R = null;
      dlg.replaceChildren(head, h('div', { class: 'sheet-body' }, h('div', { class: 'empty' }, h('div', { text: '🍽️' }), h('p', { text: t('empty') }))));
      return;
    }
    const lines = h('div', { class: 'lines' });
    const sum = h('div', { class: 'summary', 'aria-live': 'polite' });
    const zoneSel = h('select', { onchange: e => { zIdx = parseInt(e.target.value, 10); mem.set('zone', zIdx); e.target.removeAttribute('aria-invalid'); toggleAddr(); renderSummary(); } });
    const branchSel = branches.length > 1 ? h('select', { onchange: e => { bIdx = parseInt(e.target.value, 10) || 0; mem.set('branch', bIdx); zIdx = -1; mem.set('zone', -1); fillZones(); toggleAddr(); renderSummary(); renderHeader(); } },
      branches.map((b, i) => h('option', { value: String(i), selected: i === bIdx, text: L(b) }))) : null;
    const fName = h('input', { type: 'text', autocomplete: 'name', maxlength: '40', value: cust.name });
    const fPhone = h('input', { type: 'tel', inputmode: 'tel', autocomplete: 'tel', maxlength: '16', dir: 'ltr', value: cust.phone });
    const fAddr = h('textarea', { rows: '2', maxlength: '200', autocomplete: 'street-address', placeholder: t('addressPh') }); fAddr.value = cust.addr;
    const fNote = h('textarea', { rows: '2', maxlength: '200', placeholder: t('notePh') });
    [['name', fName], ['phone', fPhone], ['addr', fAddr]].forEach(([k, el]) => el.addEventListener('input', () => { cust[k] = el.value.slice(0, 200); mem.set('cust', cust); el.removeAttribute('aria-invalid'); }));
    const fCoupon = h('input', { type: 'text', maxlength: '20', autocomplete: 'off', autocapitalize: 'characters', spellcheck: 'false', dir: 'ltr', value: coupon || '' });
    fCoupon.addEventListener('keydown', e => { if (e.key === 'Enter') applyCoupon(fCoupon.value); });
    const err = h('p', { class: 'err', role: 'alert' });
    const sendBtn = h('button', { type: 'button', class: 'primary wa', text: `💬 ${t('send')}`, onclick: sendOrder });
    const addrField = field(t('address'), fAddr);
    const body = h('div', { class: 'sheet-body' }, lines,
      h('button', { type: 'button', class: 'linkbtn', text: `🗑️ ${t('clear')}`, onclick: () => { if (window.confirm(t('clearQ'))) { cart = []; coupon = null; saveCart(); buildCart(); } } }),
      branchSel ? field(t('branch'), branchSel) : null,
      field(t('zone'), zoneSel),
      h('div', { class: 'field' }, h('span', { text: t('coupon') }), h('div', { class: 'coupon' }, fCoupon, h('button', { type: 'button', text: t('apply'), onclick: () => applyCoupon(fCoupon.value) }))),
      sum,
      field(t('name'), fName), field(t('phone'), fPhone), addrField, field(t('note'), fNote),
      isOpen() ? null : h('p', { class: 'notice', text: `🌙 ${t('closedMsg')} ${fmtTime(S.hours.open)}` }),
      h('p', { class: 'hint', text: `💵 ${t('payCash')} • ${t('confirmNote')}` }));
    dlg.replaceChildren(head, body, h('div', { class: 'sheet-foot col' }, err, sendBtn));
    R = { lines, sum, zoneSel, addrField, fName, fPhone, fAddr, fNote, fCoupon, err, sendBtn };
    fillZones(); toggleAddr(); renderLines(); renderSummary();
    sendBtn.disabled = !isOpen();
  }
  function fillZones() {
    const zones = (branch() && branch().zones) || [];
    put(R.zoneSel,h('option', { value: '-1', disabled: true, selected: zIdx < 0, text: t('chooseZone') }),
      zones.map((z, i) => h('option', { value: String(i), selected: i === zIdx, text: z.pickup ? L(z) : `${L(z)} — ${money(z.fee || 0)}` })));
    R.zoneSel.value = String(zIdx);
  }
  function toggleAddr() { const z = branch() && branch().zones ? branch().zones[zIdx] : null; R.addrField.hidden = !!(z && z.pickup); }
  function renderLines() {
    R.lines.replaceChildren(...cart.map((l, idx) => {
      const it = ITEMS.get(l.id), ss = sizeSet(it), as = addonSet(it);
      const extra = [ss ? L(ss.opts[l.s]) : '', ...(as ? l.a.map(a => L(as.opts[a])) : [])].filter(Boolean).join(' • ');
      return h('div', { class: 'line' }, media(it, 'thumb'),
        h('div', { class: 'info2' }, h('b', { text: nm(it) }), extra ? h('small', { text: extra }) : null, h('div', { class: 'lt', text: money(lineTotal(l)) })),
        h('div', { class: 'stepper sm' },
          h('button', { type: 'button', 'aria-label': `${t('decrease')}: ${nm(it)}`, text: l.q > 1 ? '−' : '🗑', onclick: () => changeQty(idx, -1) }),
          h('span', { class: 'qv', text: String(l.q) }),
          h('button', { type: 'button', 'aria-label': `${t('increase')}: ${nm(it)}`, text: '+', onclick: () => changeQty(idx, 1) })));
    }));
  }
  function changeQty(idx, d) {
    const l = cart[idx]; if (!l) return;
    l.q += d;
    if (l.q <= 0) cart.splice(idx, 1); else if (l.q > 50) l.q = 50;
    saveCart();
    if (!cart.length) { buildCart(); return; }
    renderLines(); renderSummary();
  }
  function renderSummary() {
    const x = totals();
    const row = (label, val, cls) => h('div', { class: cls || null }, h('span', { text: label }), h('span', { text: val }));
    put(R.sum,
      row(t('subtotal'), money(x.sub)),
      x.c ? row(`${t('discount')} (${x.c.code})`, x.disc ? `− ${money(x.disc)}` : '—', 'disc') : null,
      x.short ? h('p', { class: 'hint', text: `${t('couponMin')} ${money(x.short)}` }) : null,
      row(t('delivery'), !x.zone ? '—' : (x.fee ? money(x.fee) : t('free'))),
      (S.freeDeliveryOver && x.zone && !x.zone.pickup && x.fee) ? h('p', { class: 'hint', text: `🎁 ${t('freeOver')} ${money(S.freeDeliveryOver)}` }) : null,
      row(t('total'), money(x.total), 'tot'));
  }
  function applyCoupon(raw) {
    const code = toLatin(raw).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 20);
    if (!code) { coupon = null; renderSummary(); return; }
    const c = (S.coupons || []).find(x => String(x.code).toUpperCase() === code);
    if (!c) { coupon = null; R.fCoupon.setAttribute('aria-invalid', 'true'); toast(t('couponBad')); }
    else { coupon = c.code; R.fCoupon.removeAttribute('aria-invalid'); R.fCoupon.value = c.code; toast(t('couponOk')); }
    renderSummary();
  }

  /* ---------- إرسال الطلب على واتساب ---------- */
  function fail(el, msg) { R.err.textContent = msg; if (el) { el.setAttribute('aria-invalid', 'true'); el.focus(); } toast(msg, 3000); }
  function sendOrder() {
    if (!R || !cart.length) return;
    R.err.textContent = '';
    if (!isOpen()) return fail(null, `${t('closedMsg')} ${fmtTime(S.hours.open)}`);
    const name = clean(R.fName.value, 40);
    const phone = toLatin(R.fPhone.value).replace(/[^\d+]/g, '').replace(/^\+/, '').replace(/^00/, '').replace(/^20(?=1)/, '0');
    const addr = clean(R.fAddr.value, 200), note = clean(R.fNote.value, 200);
    const x = totals(), z = x.zone;
    if (name.length < 2) return fail(R.fName, t('errName'));
    if (!/^01[0125]\d{8}$/.test(phone)) return fail(R.fPhone, t('errPhone'));
    if (!z) return fail(R.zoneSel, t('errZone'));
    if (!z.pickup && addr.length < 8) return fail(R.fAddr, t('errAddr'));
    const wa = String(branch().whatsapp || '').replace(/\D/g, '');
    if (!/^\d{10,15}$/.test(wa)) return fail(null, 'WhatsApp number misconfigured in menu.js');

    // الرسالة دايماً بالعربي عشان المطعم
    const A = T.ar, m = n => `${Math.round(n).toLocaleString('en-US')} ${S.currency.ar}`;
    const orderNo = 'AFS-' + Date.now().toString(36).slice(-5).toUpperCase();
    const out = [`🧾 طلب جديد — ${S.name}`, `رقم الطلب: ${orderNo}`];
    if (branches.length > 1) out.push(`الفرع: ${branch().ar}`);
    out.push('━━━━━━━━━━━━');
    for (const l of cart) {
      const it = ITEMS.get(l.id), ss = sizeSet(it), as = addonSet(it);
      let s = `• ${l.q} × ${it.ar}`;
      if (ss) s += ` (${ss.opts[l.s].ar})`;
      if (as && l.a.length) s += ` + ${l.a.map(a => as.opts[a].ar).join('، ')}`;
      out.push(`${s} = ${m(lineTotal(l))}`);
    }
    out.push('━━━━━━━━━━━━', `${A.subtotal}: ${m(x.sub)}`);
    if (x.disc) out.push(`${A.discount} (${x.c.code}): − ${m(x.disc)}`);
    out.push(z.pickup ? `🏃 ${z.ar}` : `${A.delivery} (${z.ar}): ${x.fee ? m(x.fee) : A.free}`);
    out.push(`*${A.total}: ${m(x.total)}*`, `💵 ${A.payCash}`, '━━━━━━━━━━━━', `👤 ${name}`, `📞 ${phone}`);
    if (!z.pickup) out.push(`📍 ${addr}`);
    if (note) out.push(`📝 ${note}`);
    cust.name = name; cust.phone = phone; cust.addr = addr; mem.set('cust', cust);
    window.location.href = `https://wa.me/${wa}?text=${encodeURIComponent(out.join('\n'))}`;
  }

  /* ---------- اللغة ---------- */
  function applyStatic() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-t]').forEach(el => { el.textContent = t(el.dataset.t); });
    document.querySelectorAll('[data-tp]').forEach(el => { el.placeholder = t(el.dataset.tp); });
    document.querySelectorAll('[data-ta]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.ta)); });
    $('#langBtn').textContent = t('langBtn');
  }
  function renderAll() { applyStatic(); renderHeader(); renderOffers(); renderBest(); renderMenu(); updateBar(); }
  $('#langBtn').addEventListener('click', () => {
    lang = lang === 'ar' ? 'en' : 'ar'; mem.set('lang', lang);
    document.querySelectorAll('dialog[open]').forEach(closeDlg);
    renderAll();
  });

  /* ---------- التثبيت كتطبيق (PWA) ---------- */
  let deferredPrompt = null;
  const installBtn = $('#installBtn');
  const standalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; installBtn.hidden = false; });
  window.addEventListener('appinstalled', () => { installBtn.hidden = true; deferredPrompt = null; });
  if (isIOS && !standalone) installBtn.hidden = false;
  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) { deferredPrompt.prompt(); try { await deferredPrompt.userChoice; } catch { /* ignore */ } deferredPrompt = null; installBtn.hidden = true; }
    else if (isIOS) toast(t('iosInstall'), 6000);
  });
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }

  /* ---------- تشغيل ---------- */
  renderAll();
  setInterval(() => { renderHeader(); if (R && R.sendBtn.isConnected) R.sendBtn.disabled = !isOpen(); }, 60000);
})();