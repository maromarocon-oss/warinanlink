/* =========================================================
 *  割り勘link  —  shared utilities
 *
 *  Data is encoded into the URL fragment (#) so that it is
 *  never sent to any server. The schema is intentionally
 *  short to keep links compact:
 *
 *    {
 *      v:  1,                // schema version
 *      t:  string,           // title
 *      m:  string,           // memo / due note
 *      mode: "single"|"split",
 *      a:  number,           // amount (single mode)
 *      s:  [{n,a}, ...],     // splits (split mode)
 *      p:  {                 // payee
 *        n:  string,         // display name
 *        pp: string,         // PayPay ID
 *        b:  { n, br, t, a, h }   // bank
 *      }
 *    }
 * ========================================================= */

(function (global) {
  'use strict';

  // ---------- base64url codec for UTF-8 JSON ----------
  function b64urlEncode(str) {
    const utf8 = new TextEncoder().encode(str);
    let bin = '';
    for (let i = 0; i < utf8.length; i++) bin += String.fromCharCode(utf8[i]);
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function b64urlDecode(s) {
    let b64 = s.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  function encodeData(data) {
    return b64urlEncode(JSON.stringify(data));
  }
  function decodeData(token) {
    return JSON.parse(b64urlDecode(token));
  }

  // ---------- number / yen formatting ----------
  const yenFmt = new Intl.NumberFormat('ja-JP');
  function yen(n) {
    if (n == null || isNaN(n)) return '—';
    return '¥' + yenFmt.format(Math.round(n));
  }
  function num(n) {
    if (n == null || isNaN(n)) return '—';
    return yenFmt.format(Math.round(n));
  }

  // ---------- toast ----------
  function ensureToastEl() {
    let t = document.getElementById('toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'toast';
      t.className = 'toast';
      document.body.appendChild(t);
    }
    return t;
  }
  let toastTimer = null;
  function toast(msg) {
    const t = ensureToastEl();
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
  }

  // ---------- clipboard ----------
  async function copy(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      return true;
    } catch (e) {
      console.error('copy failed', e);
      return false;
    }
  }

  // ---------- web share ----------
  async function share(opts) {
    if (navigator.share) {
      try {
        await navigator.share(opts);
        return true;
      } catch (e) {
        if (e && e.name !== 'AbortError') console.error('share failed', e);
        return false;
      }
    }
    return false;
  }

  // ---------- URL helpers ----------
  function getHashToken() {
    const h = location.hash.replace(/^#/, '');
    return h || '';
  }
  function getQueryParam(name) {
    return new URLSearchParams(location.search).get(name);
  }
  function buildShareUrl(token) {
    // The publicly shared URL points at p.html with token in fragment.
    const base = location.origin + location.pathname.replace(/[^/]*$/, '');
    return base + 'p.html#' + token;
  }

  // ---------- data validation ----------
  function normalizeData(raw) {
    if (!raw || typeof raw !== 'object') throw new Error('データが空です');
    const d = {
      v: raw.v || 1,
      t: (raw.t || '').toString().slice(0, 80),
      m: (raw.m || '').toString().slice(0, 200),
      mode: raw.mode === 'split' ? 'split' : 'single',
      a: Number(raw.a) || 0,
      s: Array.isArray(raw.s) ? raw.s.map(x => ({
        n: (x.n || '').toString().slice(0, 30),
        a: Math.max(0, Math.round(Number(x.a) || 0))
      })).filter(x => x.n || x.a > 0) : [],
      p: {
        n:  (raw.p && raw.p.n ) ? raw.p.n.toString().slice(0, 40) : '',
        pp: (raw.p && raw.p.pp) ? raw.p.pp.toString().slice(0, 40) : '',
        b:  (raw.p && raw.p.b) ? {
          n:  (raw.p.b.n  || '').toString().slice(0, 30),
          br: (raw.p.b.br || '').toString().slice(0, 30),
          t:  (raw.p.b.t  || '').toString().slice(0, 10),
          a:  (raw.p.b.a  || '').toString().slice(0, 20),
          h:  (raw.p.b.h  || '').toString().slice(0, 40)
        } : null
      }
    };
    if (!d.p.pp && !(d.p.b && d.p.b.a)) {
      throw new Error('PayPay IDか銀行口座のどちらかを入力してください');
    }
    if (d.mode === 'single' && d.a <= 0 && d.s.length === 0) {
      // amount-less is allowed (e.g. "後で精算")
    }
    return d;
  }

  function hasBank(p) {
    return !!(p && p.b && (p.b.n || p.b.br || p.b.a || p.b.h));
  }
  function hasPayPay(p) {
    return !!(p && p.pp);
  }

  // ---------- escapeHtml ----------
  function esc(s) {
    return (s == null ? '' : String(s))
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // ---------- expose ----------
  global.WL = {
    encodeData, decodeData,
    yen, num,
    toast, copy, share,
    getHashToken, getQueryParam, buildShareUrl,
    normalizeData,
    hasBank, hasPayPay,
    esc
  };

})(window);
