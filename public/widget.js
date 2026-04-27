/**
 * RedForge AI Chatbot Widget v2.0
 * 
 * Snippet yang dioptimalkan untuk kompatibilitas universal.
 * Cukup tempelkan di website manapun:
 * <script src="https://redforge.vercel.app/widget.js" data-bot-id="YOUR_BOT_ID" async></script>
 */
(function() {
  'use strict';

  // ========== GUARD: Cegah double-load ==========
  if (window.__REDFORGE_LOADED__) return;
  window.__REDFORGE_LOADED__ = true;

  // ========== 1. KONFIGURASI ==========
  var scriptTag = document.currentScript;
  if (!scriptTag) {
    // Fallback untuk browser lama atau async scripts
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
      if (scripts[i].src && scripts[i].src.indexOf('widget.js') !== -1) {
        scriptTag = scripts[i];
        break;
      }
    }
  }

  if (!scriptTag) {
    console.warn('[RedForge] Script tag tidak ditemukan.');
    return;
  }

  var botId = scriptTag.getAttribute('data-bot-id');
  if (!botId) {
    console.warn('[RedForge] Atribut data-bot-id wajib diisi.');
    return;
  }

  var baseUrl;
  try {
    baseUrl = new URL(scriptTag.src).origin;
  } catch (e) {
    console.warn('[RedForge] Gagal membaca URL origin.');
    return;
  }

  // ========== 2. INISIALISASI SETELAH DOM SIAP ==========
  function onReady(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  onReady(function() {
    // Ambil konfigurasi dari API
    fetchConfig(function(config) {
      var botName = config.name || 'Asisten Virtual';
      var botColor = config.brandColor || '#7C3AED';
      buildWidget(botName, botColor);
    });
  });

  // ========== 3. FETCH KONFIGURASI ==========
  function fetchConfig(callback) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', baseUrl + '/api/chatbot/' + botId + '/config', true);
      xhr.timeout = 5000; // Timeout 5 detik
      xhr.onload = function() {
        if (xhr.status === 200) {
          try {
            var data = JSON.parse(xhr.responseText);
            callback(data);
          } catch (e) {
            callback({});
          }
        } else {
          callback({});
        }
      };
      xhr.onerror = function() { callback({}); };
      xhr.ontimeout = function() { callback({}); };
      xhr.send();
    } catch (e) {
      callback({});
    }
  }

  // ========== 4. BUILD WIDGET ==========
  function buildWidget(botName, botColor) {
    // --- CSS (semua gunakan !important untuk menghindari konflik dengan CSS host) ---
    var css = ''
      + '#rf-root{position:fixed!important;bottom:24px!important;right:24px!important;z-index:2147483647!important;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,sans-serif!important;font-size:14px!important;line-height:1.5!important;box-sizing:border-box!important;direction:ltr!important;}'
      + '#rf-root *{box-sizing:border-box!important;margin:0!important;padding:0!important;border:none!important;outline:none!important;text-decoration:none!important;list-style:none!important;}'
      + '#rf-bubble{width:60px!important;height:60px!important;border-radius:50%!important;background:' + botColor + '!important;color:#fff!important;display:flex!important;align-items:center!important;justify-content:center!important;cursor:pointer!important;box-shadow:0 4px 16px rgba(0,0,0,0.2)!important;transition:transform 0.2s ease,box-shadow 0.2s ease!important;}'
      + '#rf-bubble:hover{transform:scale(1.08)!important;box-shadow:0 6px 24px rgba(0,0,0,0.25)!important;}'
      + '#rf-bubble svg{width:28px!important;height:28px!important;pointer-events:none!important;}'
      + '#rf-window{display:none!important;position:absolute!important;bottom:72px!important;right:0!important;width:370px!important;max-width:calc(100vw - 32px)!important;height:520px!important;max-height:calc(100vh - 100px)!important;background:#fff!important;border-radius:16px!important;box-shadow:0 12px 48px rgba(0,0,0,0.2)!important;flex-direction:column!important;overflow:hidden!important;border:1px solid #e5e7eb!important;}'
      + '#rf-window.rf-open{display:flex!important;}'
      + '#rf-header{background:' + botColor + '!important;color:#fff!important;padding:14px 16px!important;font-weight:600!important;font-size:15px!important;display:flex!important;justify-content:space-between!important;align-items:center!important;}'
      + '#rf-header span{color:#fff!important;font-weight:600!important;font-size:15px!important;}'
      + '#rf-close{cursor:pointer!important;background:none!important;color:#fff!important;font-size:22px!important;line-height:1!important;width:28px!important;height:28px!important;display:flex!important;align-items:center!important;justify-content:center!important;border-radius:50%!important;transition:background 0.15s!important;}'
      + '#rf-close:hover{background:rgba(255,255,255,0.2)!important;}'
      + '#rf-msgs{flex:1!important;padding:16px!important;overflow-y:auto!important;display:flex!important;flex-direction:column!important;gap:10px!important;background:#f9fafb!important;}'
      + '.rf-m{max-width:85%!important;padding:10px 14px!important;border-radius:12px!important;font-size:14px!important;line-height:1.5!important;word-wrap:break-word!important;white-space:pre-wrap!important;color:#111827!important;}'
      + '.rf-u{background:' + botColor + '!important;color:#fff!important;align-self:flex-end!important;border-bottom-right-radius:4px!important;}'
      + '.rf-a{background:#fff!important;color:#111827!important;align-self:flex-start!important;border-bottom-left-radius:4px!important;border:1px solid #e5e7eb!important;}'
      + '#rf-form{padding:12px!important;background:#fff!important;border-top:1px solid #e5e7eb!important;display:flex!important;gap:8px!important;}'
      + '#rf-input{flex:1!important;padding:10px 14px!important;border:1px solid #d1d5db!important;border-radius:24px!important;font-size:14px!important;font-family:inherit!important;color:#111827!important;background:#fff!important;-webkit-appearance:none!important;}'
      + '#rf-input:focus{border-color:' + botColor + '!important;box-shadow:0 0 0 2px ' + botColor + '33!important;}'
      + '#rf-input::placeholder{color:#9ca3af!important;}'
      + '#rf-send{background:' + botColor + '!important;color:#fff!important;border-radius:50%!important;width:40px!important;height:40px!important;min-width:40px!important;cursor:pointer!important;display:flex!important;align-items:center!important;justify-content:center!important;transition:opacity 0.15s!important;}'
      + '#rf-send:hover{opacity:0.9!important;}'
      + '#rf-send svg{width:18px!important;height:18px!important;pointer-events:none!important;}'
      + '@media(max-width:480px){#rf-root{bottom:12px!important;right:12px!important;}#rf-window{bottom:68px!important;width:calc(100vw - 24px)!important;height:calc(100vh - 90px)!important;right:-12px!important;border-radius:12px!important;}#rf-bubble{width:52px!important;height:52px!important;}}';

    var styleEl = document.createElement('style');
    styleEl.setAttribute('data-redforge', 'true');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    // --- HTML via DOM ---
    var root = document.createElement('div');
    root.id = 'rf-root';

    // Chat Window
    var win = document.createElement('div');
    win.id = 'rf-window';

    var header = document.createElement('div');
    header.id = 'rf-header';
    var title = document.createElement('span');
    title.textContent = botName;
    var closeBtn = document.createElement('button');
    closeBtn.id = 'rf-close';
    closeBtn.setAttribute('aria-label', 'Tutup chat');
    closeBtn.innerHTML = '&#x2715;';
    header.appendChild(title);
    header.appendChild(closeBtn);

    var msgs = document.createElement('div');
    msgs.id = 'rf-msgs';
    var welcome = document.createElement('div');
    welcome.className = 'rf-m rf-a';
    welcome.textContent = 'Halo! Ada yang bisa saya bantu hari ini?';
    msgs.appendChild(welcome);

    var form = document.createElement('form');
    form.id = 'rf-form';
    form.setAttribute('autocomplete', 'off');
    var input = document.createElement('input');
    input.id = 'rf-input';
    input.type = 'text';
    input.placeholder = 'Ketik pertanyaan Anda...';
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('autocorrect', 'off');
    input.setAttribute('spellcheck', 'false');
    var send = document.createElement('button');
    send.id = 'rf-send';
    send.type = 'submit';
    send.setAttribute('aria-label', 'Kirim pesan');
    send.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
    form.appendChild(input);
    form.appendChild(send);

    win.appendChild(header);
    win.appendChild(msgs);
    win.appendChild(form);

    // Bubble
    var bubble = document.createElement('div');
    bubble.id = 'rf-bubble';
    bubble.setAttribute('aria-label', 'Buka chat');
    bubble.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';

    root.appendChild(win);
    root.appendChild(bubble);
    document.body.appendChild(root);

    // ========== 5. INTERAKSI ==========
    var history = [];
    var isStreaming = false;

    bubble.addEventListener('click', function() {
      win.classList.add('rf-open');
      bubble.style.display = 'none';
      input.focus();
    });

    closeBtn.addEventListener('click', function() {
      win.classList.remove('rf-open');
      bubble.style.display = 'flex';
    });

    // Tutup saat klik di luar widget (opsional, UX friendly)
    document.addEventListener('click', function(e) {
      if (win.classList.contains('rf-open') && !root.contains(e.target)) {
        win.classList.remove('rf-open');
        bubble.style.display = 'flex';
      }
    });

    function addMsg(role, text) {
      var el = document.createElement('div');
      el.className = 'rf-m ' + (role === 'user' ? 'rf-u' : 'rf-a');
      el.textContent = text;
      msgs.appendChild(el);
      msgs.scrollTop = msgs.scrollHeight;
      return el;
    }

    function clean(str) {
      return str
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/^#{1,6}\s/gm, '')
        .replace(/`/g, '');
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (isStreaming) return;

      var text = input.value.trim();
      if (!text) return;

      addMsg('user', text);
      input.value = '';
      history.push({ role: 'user', content: text });

      var aiEl = addMsg('ai', 'Mengetik...');
      isStreaming = true;
      send.style.opacity = '0.5';

      streamChat(aiEl, function() {
        isStreaming = false;
        send.style.opacity = '1';
      });
    });

    // ========== 6. STREAMING CHAT ==========
    function streamChat(aiEl, onDone) {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', baseUrl + '/api/chat', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.timeout = 30000;

        var aiText = '';
        var lastIndex = 0;

        xhr.onprogress = function() {
          var newData = xhr.responseText.substring(lastIndex);
          lastIndex = xhr.responseText.length;
          aiText += newData;
          aiEl.textContent = clean(aiText);
          msgs.scrollTop = msgs.scrollHeight;
        };

        xhr.onload = function() {
          if (xhr.status === 200) {
            aiText = xhr.responseText;
            aiEl.textContent = clean(aiText);
            history.push({ role: 'assistant', content: aiText });
          } else {
            aiEl.textContent = 'Maaf, terjadi kesalahan. Silakan coba lagi.';
          }
          msgs.scrollTop = msgs.scrollHeight;
          onDone();
        };

        xhr.onerror = function() {
          aiEl.textContent = 'Maaf, tidak dapat terhubung ke server.';
          onDone();
        };

        xhr.ontimeout = function() {
          aiEl.textContent = 'Maaf, koneksi timeout. Silakan coba lagi.';
          onDone();
        };

        xhr.send(JSON.stringify({
          chatbotId: botId,
          messages: history
        }));

      } catch (err) {
        aiEl.textContent = 'Maaf, terjadi kesalahan pada sistem.';
        onDone();
      }
    }
  }

})();
