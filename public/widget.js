/**
 * RedForge AI Chatbot Widget v3.0 — Premium Edition
 * <script src="https://redforge.vercel.app/widget.js" data-bot-id="YOUR_BOT_ID" async></script>
 */
(function() {
  'use strict';
  if (window.__REDFORGE_LOADED__) return;
  window.__REDFORGE_LOADED__ = true;

  var scriptTag = document.currentScript;
  if (!scriptTag) {
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
      if (scripts[i].src && scripts[i].src.indexOf('widget.js') !== -1) {
        scriptTag = scripts[i]; break;
      }
    }
  }
  if (!scriptTag) return;

  var botId = scriptTag.getAttribute('data-bot-id');
  if (!botId) { console.warn('[RedForge] data-bot-id missing'); return; }

  var baseUrl;
  try { baseUrl = new URL(scriptTag.src).origin; } catch(e) { return; }

  function onReady(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  onReady(function() {
    fetchConfig(function(config) {
      var botName = config.name || 'Asisten Virtual';
      var botColor = config.brandColor || '#7C3AED';
      buildWidget(botName, botColor);
    });
  });

  function fetchConfig(cb) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', baseUrl + '/api/chatbot/' + botId + '/config', true);
      xhr.timeout = 5000;
      xhr.onload = function() {
        if (xhr.status === 200) { try { cb(JSON.parse(xhr.responseText)); } catch(e) { cb({}); } }
        else cb({});
      };
      xhr.onerror = xhr.ontimeout = function() { cb({}); };
      xhr.send();
    } catch(e) { cb({}); }
  }

  // Helper: lighten/darken color
  function adjustColor(hex, percent) {
    var num = parseInt(hex.replace('#',''), 16);
    var r = Math.min(255, Math.max(0, (num >> 16) + Math.round(2.55 * percent)));
    var g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + Math.round(2.55 * percent)));
    var b = Math.min(255, Math.max(0, (num & 0x0000FF) + Math.round(2.55 * percent)));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  function buildWidget(botName, botColor) {
    var colorLight = adjustColor(botColor, 25);
    var colorDark = adjustColor(botColor, -15);

    var css = ''
      // === KEYFRAMES ===
      + '@keyframes rf-slideUp{from{opacity:0;transform:translateY(16px) scale(0.96)}to{opacity:1;transform:translateY(0) scale(1)}}'
      + '@keyframes rf-fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}'
      + '@keyframes rf-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}'
      + '@keyframes rf-dot{0%,80%,100%{opacity:0.3;transform:scale(0.8)}40%{opacity:1;transform:scale(1)}}'
      + '@keyframes rf-glow{0%,100%{box-shadow:0 0 0 0 ' + botColor + '55}50%{box-shadow:0 0 0 10px ' + botColor + '00}}'

      // === ROOT ===
      + '#rf-root{position:fixed!important;bottom:24px!important;right:24px!important;z-index:2147483647!important;font-family:"Inter",system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif!important;font-size:14px!important;line-height:1.5!important;box-sizing:border-box!important;direction:ltr!important;}'
      + '#rf-root *{box-sizing:border-box!important;margin:0!important;padding:0!important;border:none!important;outline:none!important;}'

      // === BUBBLE ===
      + '#rf-bubble{width:62px!important;height:62px!important;border-radius:50%!important;background:linear-gradient(135deg,' + botColor + ',' + colorDark + ')!important;color:#fff!important;display:flex!important;align-items:center!important;justify-content:center!important;cursor:pointer!important;box-shadow:0 6px 24px ' + botColor + '44,0 2px 8px rgba(0,0,0,0.12)!important;transition:all 0.3s cubic-bezier(0.4,0,0.2,1)!important;animation:rf-glow 2.5s ease-in-out infinite!important;}'
      + '#rf-bubble:hover{transform:scale(1.1) rotate(-5deg)!important;box-shadow:0 8px 32px ' + botColor + '66,0 4px 12px rgba(0,0,0,0.15)!important;}'
      + '#rf-bubble svg{width:28px!important;height:28px!important;pointer-events:none!important;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.2))!important;}'

      // === BADGE ===
      + '#rf-badge{position:absolute!important;top:-2px!important;right:-2px!important;width:16px!important;height:16px!important;background:#22c55e!important;border-radius:50%!important;border:2.5px solid #fff!important;animation:rf-pulse 2s ease-in-out infinite!important;}'

      // === CHAT WINDOW ===
      + '#rf-window{display:none!important;position:absolute!important;bottom:76px!important;right:0!important;width:380px!important;max-width:calc(100vw - 32px)!important;height:540px!important;max-height:calc(100vh - 100px)!important;background:#fff!important;border-radius:20px!important;box-shadow:0 20px 60px rgba(0,0,0,0.2),0 0 0 1px rgba(0,0,0,0.05)!important;flex-direction:column!important;overflow:hidden!important;animation:rf-slideUp 0.3s cubic-bezier(0.4,0,0.2,1) forwards!important;}'
      + '#rf-window.rf-open{display:flex!important;}'

      // === HEADER ===
      + '#rf-header{background:linear-gradient(135deg,' + botColor + ' 0%,' + colorDark + ' 100%)!important;color:#fff!important;padding:16px 20px!important;display:flex!important;align-items:center!important;gap:12px!important;position:relative!important;overflow:hidden!important;}'
      + '#rf-header::before{content:""!important;position:absolute!important;top:-30px!important;right:-30px!important;width:100px!important;height:100px!important;border-radius:50%!important;background:rgba(255,255,255,0.08)!important;pointer-events:none!important;}'
      + '#rf-header::after{content:""!important;position:absolute!important;bottom:-20px!important;left:40%!important;width:60px!important;height:60px!important;border-radius:50%!important;background:rgba(255,255,255,0.05)!important;pointer-events:none!important;}'
      + '#rf-avatar{width:40px!important;height:40px!important;border-radius:12px!important;background:rgba(255,255,255,0.2)!important;display:flex!important;align-items:center!important;justify-content:center!important;font-size:20px!important;flex-shrink:0!important;backdrop-filter:blur(4px)!important;}'
      + '#rf-hinfo{flex:1!important;min-width:0!important;}'
      + '#rf-hname{font-weight:700!important;font-size:15px!important;color:#fff!important;display:block!important;}'
      + '#rf-hstatus{font-size:11px!important;color:rgba(255,255,255,0.75)!important;display:flex!important;align-items:center!important;gap:5px!important;margin-top:2px!important;}'
      + '#rf-hstatus::before{content:""!important;width:7px!important;height:7px!important;border-radius:50%!important;background:#4ade80!important;display:inline-block!important;}'
      + '#rf-close{cursor:pointer!important;background:rgba(255,255,255,0.12)!important;color:#fff!important;font-size:18px!important;width:32px!important;height:32px!important;display:flex!important;align-items:center!important;justify-content:center!important;border-radius:10px!important;transition:background 0.2s!important;flex-shrink:0!important;}'
      + '#rf-close:hover{background:rgba(255,255,255,0.25)!important;}'

      // === MESSAGES ===
      + '#rf-msgs{flex:1!important;padding:16px!important;overflow-y:auto!important;display:flex!important;flex-direction:column!important;gap:6px!important;background:linear-gradient(180deg,#f8fafc 0%,#f1f5f9 100%)!important;scroll-behavior:smooth!important;}'
      + '#rf-msgs::-webkit-scrollbar{width:5px!important;}#rf-msgs::-webkit-scrollbar-track{background:transparent!important;}#rf-msgs::-webkit-scrollbar-thumb{background:#cbd5e1!important;border-radius:10px!important;}'
      + '.rf-m{max-width:88%!important;width:fit-content!important;padding:12px 16px!important;font-size:14px!important;line-height:1.6!important;word-wrap:break-word!important;overflow-wrap:break-word!important;word-break:break-word!important;white-space:pre-wrap!important;animation:rf-fadeIn 0.25s ease-out forwards!important;}'
      + '.rf-u{background:linear-gradient(135deg,' + botColor + ',' + colorDark + ')!important;color:#fff!important;align-self:flex-end!important;border-radius:18px 18px 4px 18px!important;box-shadow:0 2px 8px ' + botColor + '33!important;}'
      + '.rf-a{background:#fff!important;color:#1e293b!important;align-self:flex-start!important;border-radius:18px 18px 18px 4px!important;box-shadow:0 1px 4px rgba(0,0,0,0.06)!important;border:1px solid #e2e8f0!important;}'

      // === TYPING INDICATOR ===
      + '.rf-typing{display:flex!important;align-items:center!important;gap:4px!important;padding:12px 18px!important;align-self:flex-start!important;}'
      + '.rf-dot{width:8px!important;height:8px!important;border-radius:50%!important;background:' + botColor + '!important;animation:rf-dot 1.2s ease-in-out infinite!important;}'
      + '.rf-dot:nth-child(2){animation-delay:0.15s!important;}'
      + '.rf-dot:nth-child(3){animation-delay:0.3s!important;}'

      // === INPUT AREA ===
      + '#rf-form{padding:12px 16px!important;background:#fff!important;border-top:1px solid #f1f5f9!important;display:flex!important;gap:8px!important;align-items:center!important;}'
      + '#rf-input{flex:1!important;padding:11px 16px!important;border:1.5px solid #e2e8f0!important;border-radius:24px!important;font-size:13.5px!important;font-family:inherit!important;color:#1e293b!important;background:#f8fafc!important;transition:all 0.2s!important;-webkit-appearance:none!important;}'
      + '#rf-input:focus{border-color:' + botColor + '!important;background:#fff!important;box-shadow:0 0 0 3px ' + botColor + '1a!important;}'
      + '#rf-input::placeholder{color:#94a3b8!important;}'
      + '#rf-send{background:linear-gradient(135deg,' + botColor + ',' + colorDark + ')!important;color:#fff!important;border-radius:50%!important;width:40px!important;height:40px!important;min-width:40px!important;cursor:pointer!important;display:flex!important;align-items:center!important;justify-content:center!important;transition:all 0.2s!important;box-shadow:0 2px 8px ' + botColor + '33!important;}'
      + '#rf-send:hover{transform:scale(1.08)!important;box-shadow:0 4px 12px ' + botColor + '44!important;}'
      + '#rf-send:disabled{opacity:0.5!important;cursor:not-allowed!important;transform:none!important;}'
      + '#rf-send svg{width:18px!important;height:18px!important;pointer-events:none!important;}'

      // === FOOTER ===
      + '#rf-footer{padding:6px!important;text-align:center!important;background:#fff!important;}'
      + '#rf-footer a{font-size:10.5px!important;color:#94a3b8!important;text-decoration:none!important;transition:color 0.15s!important;}'
      + '#rf-footer a:hover{color:' + botColor + '!important;}'

      // === MOBILE ===
      + '@media(max-width:480px){#rf-root{bottom:12px!important;right:12px!important;}#rf-window{bottom:72px!important;width:calc(100vw - 24px)!important;height:calc(100vh - 96px)!important;right:-12px!important;border-radius:16px!important;}#rf-bubble{width:54px!important;height:54px!important;}}';

    var styleEl = document.createElement('style');
    styleEl.setAttribute('data-redforge', 'true');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    // ===== BUILD DOM =====
    var root = document.createElement('div');
    root.id = 'rf-root';

    // Chat Window
    var win = document.createElement('div');
    win.id = 'rf-window';

    // Header
    var header = document.createElement('div');
    header.id = 'rf-header';

    var avatar = document.createElement('div');
    avatar.id = 'rf-avatar';
    avatar.textContent = '🤖';

    var hinfo = document.createElement('div');
    hinfo.id = 'rf-hinfo';
    var hname = document.createElement('span');
    hname.id = 'rf-hname';
    hname.textContent = botName;
    var hstatus = document.createElement('span');
    hstatus.id = 'rf-hstatus';
    hstatus.textContent = 'Online sekarang';
    hinfo.appendChild(hname);
    hinfo.appendChild(hstatus);

    var closeBtn = document.createElement('button');
    closeBtn.id = 'rf-close';
    closeBtn.setAttribute('aria-label', 'Tutup');
    closeBtn.innerHTML = '&#x2715;';

    header.appendChild(avatar);
    header.appendChild(hinfo);
    header.appendChild(closeBtn);

    // Messages
    var msgs = document.createElement('div');
    msgs.id = 'rf-msgs';
    var welcome = document.createElement('div');
    welcome.className = 'rf-m rf-a';
    welcome.textContent = 'Halo! 👋 Selamat datang. Ada yang bisa saya bantu hari ini?';
    msgs.appendChild(welcome);

    // Input
    var form = document.createElement('form');
    form.id = 'rf-form';
    form.setAttribute('autocomplete', 'off');
    var input = document.createElement('input');
    input.id = 'rf-input';
    input.type = 'text';
    input.placeholder = 'Tulis pesan...';
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('autocorrect', 'off');
    input.setAttribute('spellcheck', 'false');
    var send = document.createElement('button');
    send.id = 'rf-send';
    send.type = 'submit';
    send.setAttribute('aria-label', 'Kirim');
    send.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
    form.appendChild(input);
    form.appendChild(send);

    // Footer
    var footer = document.createElement('div');
    footer.id = 'rf-footer';
    var flink = document.createElement('a');
    flink.href = baseUrl;
    flink.target = '_blank';
    flink.rel = 'noopener';
    flink.textContent = '⚡ Powered by RedForge';
    footer.appendChild(flink);

    win.appendChild(header);
    win.appendChild(msgs);
    win.appendChild(form);
    win.appendChild(footer);

    // Bubble
    var bubble = document.createElement('div');
    bubble.id = 'rf-bubble';
    bubble.setAttribute('aria-label', 'Chat');
    bubble.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
    var badge = document.createElement('div');
    badge.id = 'rf-badge';
    bubble.appendChild(badge);

    root.appendChild(win);
    root.appendChild(bubble);
    document.body.appendChild(root);

    // ===== INTERACTIONS =====
    var history = [];
    var isStreaming = false;

    bubble.addEventListener('click', function() {
      win.classList.add('rf-open');
      bubble.style.display = 'none';
      setTimeout(function() { input.focus(); }, 300);
    });

    closeBtn.addEventListener('click', function() {
      win.classList.remove('rf-open');
      bubble.style.display = 'flex';
    });

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

    function showTyping() {
      var el = document.createElement('div');
      el.className = 'rf-typing';
      el.id = 'rf-typing';
      for (var i = 0; i < 3; i++) {
        var dot = document.createElement('div');
        dot.className = 'rf-dot';
        el.appendChild(dot);
      }
      msgs.appendChild(el);
      msgs.scrollTop = msgs.scrollHeight;
      return el;
    }

    function removeTyping() {
      var t = document.getElementById('rf-typing');
      if (t) t.remove();
    }

    function clean(str) {
      return str.replace(/\*\*/g,'').replace(/\*/g,'').replace(/^#{1,6}\s/gm,'').replace(/`/g,'');
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (isStreaming) return;
      var text = input.value.trim();
      if (!text) return;

      addMsg('user', text);
      input.value = '';
      history.push({ role: 'user', content: text });

      isStreaming = true;
      send.disabled = true;
      var typingEl = showTyping();

      streamChat(function(aiEl) {
        removeTyping();
        return aiEl;
      }, function() {
        isStreaming = false;
        send.disabled = false;
      });
    });

    function streamChat(onStart, onDone) {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', baseUrl + '/api/chat', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.timeout = 30000;

        var aiText = '';
        var lastIndex = 0;
        var aiEl = null;

        xhr.onprogress = function() {
          if (!aiEl) {
            removeTyping();
            aiEl = addMsg('ai', '');
          }
          var newData = xhr.responseText.substring(lastIndex);
          lastIndex = xhr.responseText.length;
          aiText += newData;
          aiEl.textContent = clean(aiText);
          msgs.scrollTop = msgs.scrollHeight;
        };

        xhr.onload = function() {
          removeTyping();
          if (xhr.status === 200) {
            aiText = xhr.responseText;
            if (!aiEl) aiEl = addMsg('ai', '');
            aiEl.textContent = clean(aiText);
            history.push({ role: 'assistant', content: aiText });
          } else {
            if (!aiEl) aiEl = addMsg('ai', '');
            aiEl.textContent = 'Maaf, terjadi kesalahan. Silakan coba lagi.';
          }
          msgs.scrollTop = msgs.scrollHeight;
          onDone();
        };

        xhr.onerror = function() {
          removeTyping();
          var el = addMsg('ai', 'Maaf, tidak dapat terhubung ke server.');
          onDone();
        };

        xhr.ontimeout = function() {
          removeTyping();
          addMsg('ai', 'Maaf, koneksi timeout. Silakan coba lagi.');
          onDone();
        };

        xhr.send(JSON.stringify({ chatbotId: botId, messages: history }));
      } catch(err) {
        removeTyping();
        addMsg('ai', 'Maaf, terjadi kesalahan pada sistem.');
        onDone();
      }
    }
  }
})();
