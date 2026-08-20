/* ==========================================================================
   灯 AKARI COFFEE STAND ― Shared front-end logic
   ナビ開閉 / カート(localStorage) / トースト / 商品カード描画
   ========================================================================== */

(function () {
  'use strict';

  const DATA = window.AKARI_DATA || { products: [], menuGroups: [] };
  const CART_KEY = 'akari_cart_v1';

  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  function formatYen(n) {
    return '¥' + Number(n || 0).toLocaleString('ja-JP');
  }

  function getProduct(id) {
    return DATA.products.find(p => p.id === id) || null;
  }

  /* -------------------- cart storage -------------------- */
  function getCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }
  function setCart(lines) {
    localStorage.setItem(CART_KEY, JSON.stringify(lines));
    renderCartBadges();
    renderCartDrawer();
  }
  function addToCart(productId, variantId, qty) {
    const lines = getCart();
    const existing = lines.find(l => l.productId === productId && l.variantId === variantId);
    if (existing) {
      existing.qty += qty;
    } else {
      lines.push({ productId, variantId, qty });
    }
    setCart(lines);
  }
  function removeLine(index) {
    const lines = getCart();
    lines.splice(index, 1);
    setCart(lines);
  }
  function setLineQty(index, qty) {
    const lines = getCart();
    if (!lines[index]) return;
    lines[index].qty = Math.max(1, qty);
    setCart(lines);
  }
  function enrichedLines() {
    return getCart().map((line, index) => {
      const product = getProduct(line.productId);
      if (!product) return null;
      const variant = product.variants.find(v => v.id === line.variantId) || product.variants[0];
      return {
        index, product, variant, qty: line.qty,
        lineTotal: variant.price * line.qty
      };
    }).filter(Boolean);
  }
  function cartCount() {
    return getCart().reduce((s, l) => s + l.qty, 0);
  }
  function cartSubtotal() {
    return enrichedLines().reduce((s, l) => s + l.lineTotal, 0);
  }

  /* -------------------- render: header cart badge -------------------- */
  function renderCartBadges() {
    const count = cartCount();
    $$('.cart-count').forEach(el => {
      el.textContent = String(count);
      el.classList.toggle('is-zero', count === 0);
    });
  }

  /* -------------------- render: cart drawer -------------------- */
  function renderCartDrawer() {
    const body = $('#cartDrawerBody');
    const foot = $('#cartDrawerFoot');
    if (!body) return;
    const lines = enrichedLines();

    if (lines.length === 0) {
      body.innerHTML = '<div class="cart-drawer-empty">カートには何も入っていません。<br>お好きな豆やチャイを探してみてください。</div>';
      if (foot) foot.style.display = 'none';
      return;
    }
    if (foot) foot.style.display = 'block';

    body.innerHTML = lines.map(l => `
      <div class="cart-line" data-index="${l.index}">
        <div class="cart-line-media"></div>
        <div class="cart-line-info">
          <div class="cart-line-name">${l.product.name}</div>
          <div class="cart-line-variant">${l.variant.label} × ${l.qty}</div>
          <div class="cart-line-foot">
            <span class="price">${formatYen(l.lineTotal)}</span>
            <button type="button" class="cart-line-remove" data-remove="${l.index}">削除</button>
          </div>
        </div>
      </div>
    `).join('');

    const subtotalEl = $('#cartSubtotal');
    if (subtotalEl) subtotalEl.textContent = formatYen(cartSubtotal());

    $$('[data-remove]', body).forEach(btn => {
      btn.addEventListener('click', () => removeLine(Number(btn.dataset.remove)));
    });
  }

  /* -------------------- product row markup (spec list, shared) -------------------- */
  function productRowHTML(product) {
    const price = product.variants[0].price;
    const multi = product.variants.length > 1;
    const specs = product.notes.map(n => `<span>${n.label} <b>${n.val}</b></span>`).join('');
    return `
      <a class="spec-row is-${product.category}" href="product.html?id=${product.id}">
        <span class="spec-row-dot" aria-hidden="true"></span>
        <div class="spec-row-main">
          <div class="spec-row-name">${product.name}${product.badge ? `<span class="badge">${product.badge}</span>` : ''}</div>
          <p class="spec-row-lead">${product.lead}</p>
          <div class="spec-row-tags">${specs}</div>
        </div>
        <div class="spec-row-price">${multi ? '<span class="from">from</span>' : ''}${formatYen(price)}</div>
      </a>
    `;
  }

  /* -------------------- toast -------------------- */
  let toastTimer = null;
  function toast(message) {
    let el = $('#akariToast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'akariToast';
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
  }

  /* -------------------- nav / drawer open-close -------------------- */
  function initChrome() {
    // mobile nav
    const navToggle = $('.js-nav-open');
    const navPanel   = $('.nav-mobile');
    if (navToggle && navPanel) {
      navToggle.addEventListener('click', () => navPanel.classList.add('is-open'));
      $$('.js-nav-close', navPanel).forEach(btn => btn.addEventListener('click', () => navPanel.classList.remove('is-open')));
      navPanel.addEventListener('click', (e) => { if (e.target === navPanel) navPanel.classList.remove('is-open'); });
    }
    // cart drawer
    const cartPanel = $('.cart-drawer');
    if (cartPanel) {
      $$('.js-cart-open').forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        cartPanel.classList.add('is-open');
      }));
      $$('.js-cart-close', cartPanel).forEach(btn => btn.addEventListener('click', () => cartPanel.classList.remove('is-open')));
      cartPanel.addEventListener('click', (e) => { if (e.target === cartPanel) cartPanel.classList.remove('is-open'); });
    }
    // active nav link
    const path = location.pathname.split('/').pop() || 'index.html';
    $$('.nav-desktop a, .nav-mobile a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === path) a.classList.add('is-active');
    });
    // footer year
    $$('.js-year').forEach(el => { el.textContent = new Date().getFullYear(); });

    renderCartBadges();
    renderCartDrawer();
  }

  document.addEventListener('DOMContentLoaded', initChrome);

  window.AKARI = {
    DATA, $, $$, formatYen, getProduct,
    getCart, setCart, addToCart, removeLine, setLineQty,
    enrichedLines, cartCount, cartSubtotal,
    renderCartDrawer, renderCartBadges,
    productRowHTML, toast
  };
})();
