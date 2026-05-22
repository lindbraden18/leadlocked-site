(function () {
  // ── Styles ──────────────────────────────────────────────────────────────────
  const css = `
    #ll-chat-btn {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 9998;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: #f97316;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 0 0 rgba(249,115,22,.5);
      animation: ll-ping 2.5s ease-in-out infinite;
      transition: transform .2s, background .2s;
    }
    #ll-chat-btn:hover { background: #fb923c; transform: scale(1.08); }
    #ll-chat-btn svg { width: 26px; height: 26px; fill: #fff; }
    #ll-chat-btn .ll-close-ic { display: none; }
    #ll-chat-btn.open .ll-open-ic { display: none; }
    #ll-chat-btn.open .ll-close-ic { display: block; }
    #ll-chat-btn.open { animation: none; }

    @keyframes ll-ping {
      0%,100% { box-shadow: 0 0 0 0 rgba(249,115,22,.5); }
      50%      { box-shadow: 0 0 0 14px rgba(249,115,22,0); }
    }

    #ll-chat-window {
      position: fixed;
      bottom: 100px;
      right: 28px;
      z-index: 9999;
      width: 370px;
      max-width: calc(100vw - 40px);
      height: 520px;
      max-height: calc(100vh - 130px);
      background: #0f172a;
      border: 1px solid rgba(249,115,22,.2);
      border-radius: 18px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 30px 80px rgba(0,0,0,.6), 0 0 0 1px rgba(249,115,22,.08);
      transform: translateY(20px) scale(.96);
      opacity: 0;
      pointer-events: none;
      transition: transform .25s cubic-bezier(.34,1.56,.64,1), opacity .2s ease;
    }
    #ll-chat-window.open {
      transform: translateY(0) scale(1);
      opacity: 1;
      pointer-events: all;
    }

    #ll-chat-header {
      background: linear-gradient(135deg, #111827 0%, #1a2540 100%);
      border-bottom: 1px solid rgba(249,115,22,.15);
      padding: 14px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }
    .ll-avatar {
      width: 36px; height: 36px; border-radius: 50%;
      background: #f97316;
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; flex-shrink: 0;
    }
    .ll-header-text { flex: 1; }
    .ll-header-text strong {
      display: block; font-family: 'DM Sans', sans-serif;
      font-size: .9rem; color: #f8fafc; font-weight: 600;
    }
    .ll-header-text span {
      font-size: .75rem; color: #22c55e;
      display: flex; align-items: center; gap: 4px;
    }
    .ll-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: #22c55e; display: inline-block;
    }

    #ll-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      scroll-behavior: smooth;
    }
    #ll-messages::-webkit-scrollbar { width: 4px; }
    #ll-messages::-webkit-scrollbar-track { background: transparent; }
    #ll-messages::-webkit-scrollbar-thumb { background: rgba(249,115,22,.3); border-radius: 4px; }

    .ll-msg {
      max-width: 88%;
      padding: 10px 13px;
      border-radius: 14px;
      font-family: 'DM Sans', sans-serif;
      font-size: .84rem;
      line-height: 1.55;
      animation: ll-pop .2s ease;
    }
    @keyframes ll-pop {
      from { transform: translateY(6px); opacity: 0; }
      to   { transform: translateY(0);   opacity: 1; }
    }
    .ll-msg.bot {
      background: #1a2540;
      color: #cbd5e1;
      border: 1px solid rgba(148,163,184,.1);
      align-self: flex-start;
      border-bottom-left-radius: 4px;
    }
    .ll-msg.user {
      background: #f97316;
      color: #fff;
      align-self: flex-end;
      border-bottom-right-radius: 4px;
    }
    .ll-msg a { color: #fb923c; text-decoration: underline; }
    .ll-msg.bot a { color: #f97316; }

    .ll-typing {
      display: flex; gap: 5px; align-items: center;
      padding: 12px 14px;
      background: #1a2540;
      border: 1px solid rgba(148,163,184,.1);
      border-radius: 14px;
      border-bottom-left-radius: 4px;
      align-self: flex-start;
      animation: ll-pop .2s ease;
    }
    .ll-typing span {
      width: 7px; height: 7px; border-radius: 50%;
      background: #94a3b8;
      animation: ll-bounce 1.2s infinite;
    }
    .ll-typing span:nth-child(2) { animation-delay: .2s; }
    .ll-typing span:nth-child(3) { animation-delay: .4s; }
    @keyframes ll-bounce {
      0%,60%,100% { transform: translateY(0); }
      30%          { transform: translateY(-6px); }
    }

    .ll-chips {
      display: flex; flex-wrap: wrap; gap: 6px;
      padding: 0 14px 10px;
      flex-shrink: 0;
    }
    .ll-chip {
      background: transparent;
      border: 1px solid rgba(249,115,22,.35);
      color: #fb923c;
      border-radius: 20px;
      padding: 5px 12px;
      font-size: .78rem;
      font-family: 'DM Sans', sans-serif;
      cursor: pointer;
      transition: background .15s, color .15s;
      white-space: nowrap;
    }
    .ll-chip:hover { background: rgba(249,115,22,.12); color: #f97316; }

    #ll-input-row {
      display: flex;
      gap: 8px;
      padding: 10px 12px 14px;
      border-top: 1px solid rgba(148,163,184,.08);
      flex-shrink: 0;
    }
    #ll-input {
      flex: 1;
      background: #1a2540;
      border: 1px solid rgba(148,163,184,.15);
      border-radius: 10px;
      color: #f8fafc;
      font-family: 'DM Sans', sans-serif;
      font-size: .85rem;
      padding: 9px 12px;
      outline: none;
      resize: none;
      transition: border-color .2s;
    }
    #ll-input:focus { border-color: rgba(249,115,22,.4); }
    #ll-input::placeholder { color: #475569; }
    #ll-send {
      width: 38px; height: 38px;
      background: #f97316;
      border: none; border-radius: 10px;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      align-self: flex-end;
      transition: background .2s, transform .15s;
    }
    #ll-send:hover { background: #fb923c; transform: scale(1.05); }
    #ll-send:disabled { background: #374151; cursor: not-allowed; transform: none; }
    #ll-send svg { width: 18px; height: 18px; fill: #fff; }
  `;

  // ── System prompt ────────────────────────────────────────────────────────────
  const SYSTEM = `You are the LeadLocked AI assistant on leadlocked.ai. You help home service contractors understand the product, pricing, setup, and how it works. Be friendly, concise, and direct. Never be salesy or pushy. Answer questions accurately based on the information below.

ABOUT LEADLOCKED:
LeadLocked automatically sends an AI-written email reply on behalf of a contractor when a homeowner fills out their contact form. It makes sure no lead goes unanswered.

PLANS & PRICING:
- Basic: $49/month — AI reply to every lead, lead stored in dashboard, email notification to contractor, 14-day free trial, no credit card required
- Pro: $149/month — Everything in Basic PLUS: instant SMS alerts to contractor's phone when a lead comes in, human-timed replies (replies delayed to land during business hours so they look human), up to 3 automatic follow-up emails if the lead doesn't respond (follow-ups stop the moment the lead replies), lead reply forwarded directly to contractor's email, SMS notification when a lead replies, full lead history and analytics dashboard, 14-day free trial, no credit card required
- Both plans: 14-day free trial, no credit card required, cancel anytime

HOW IT WORKS:
1. Contractor signs up and gets a unique contact form link
2. They add the form to their website, Google Business page, Facebook, or ads
3. When a homeowner fills out the form, LeadLocked automatically sends an AI-written reply on their behalf within minutes
4. The contractor gets an email notification (Pro gets SMS too)
5. If the lead doesn't respond, Pro plan sends up to 3 follow-up emails automatically
6. When the lead replies, their reply is forwarded directly to the contractor's email (Pro also gets SMS notification)
7. All leads are stored in the contractor's dashboard

SETUP:
- Setup takes less than 1-2 hours
- After signing up, contractor receives their unique form link and dashboard link via email
- They add the form to their website or wherever they get leads
- No coding required

WHO IT'S FOR:
Home service contractors including: HVAC, plumbers, electricians, roofers, painters, landscapers, cleaners, pest control, handymen, flooring, remodelers, and more.

SMART REPLY TIMING (Pro only):
Replies are intentionally delayed to land during business hours. A reply at 2am on Sunday looks robotic. Pro plan times replies to feel like a real person sent them.

FOLLOW-UPS (Pro only):
Up to 3 automatic follow-up emails sent if the lead doesn't respond. Spaced naturally over days. Stop immediately the moment the lead replies.

TRIAL:
14-day free trial on both plans. No credit card required. Cancel anytime via the customer portal.

DEMO:
Contractors can book a free 15-minute demo at: https://calendly.com/2023lindbergb/30min

SIGN UP LINKS:
- Basic trial: https://buy.stripe.com/dRm00j3MyfjGbJKeBGg360h
- Pro trial: https://buy.stripe.com/cNi3cv3MygnK9BC0KQg360g

CONTACT:
- Email: support@leadlocked.ai
- Website: leadlocked.ai

Keep answers short — 2-4 sentences max unless more detail is needed. If someone asks to sign up or start a trial, give them the appropriate link. If someone wants to talk to a human, direct them to support@leadlocked.ai or the demo booking link.`;

  // ── Quick reply chips ────────────────────────────────────────────────────────
  const CHIPS = [
    'How does it work?',
    'Basic vs Pro?',
    'How much does it cost?',
    'How long is setup?',
    'Book a demo',
  ];

  // ── State ────────────────────────────────────────────────────────────────────
  let messages = [];
  let isOpen = false;
  let isLoading = false;

  // ── Build DOM ────────────────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const btn = document.createElement('button');
  btn.id = 'll-chat-btn';
  btn.setAttribute('aria-label', 'Chat with LeadLocked AI');
  btn.innerHTML = `
    <svg class="ll-open-ic" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
    <svg class="ll-close-ic" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
  `;

  const win = document.createElement('div');
  win.id = 'll-chat-window';
  win.setAttribute('role', 'dialog');
  win.setAttribute('aria-label', 'LeadLocked Chat');
  win.innerHTML = `
    <div id="ll-chat-header">
      <div class="ll-avatar">🔒</div>
      <div class="ll-header-text">
        <strong>LeadLocked AI</strong>
        <span><span class="ll-dot"></span> Online — ask me anything</span>
      </div>
    </div>
    <div id="ll-messages"></div>
    <div class="ll-chips" id="ll-chips"></div>
    <div id="ll-input-row">
      <textarea id="ll-input" rows="1" placeholder="Ask a question…" maxlength="500"></textarea>
      <button id="ll-send" aria-label="Send">
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
  `;

  document.body.appendChild(btn);
  document.body.appendChild(win);

  const msgEl = win.querySelector('#ll-messages');
  const chipsEl = win.querySelector('#ll-chips');
  const input = win.querySelector('#ll-input');
  const sendBtn = win.querySelector('#ll-send');

  // ── Chips ────────────────────────────────────────────────────────────────────
  function renderChips() {
    chipsEl.innerHTML = '';
    if (messages.length > 2) return; // hide after conversation starts
    CHIPS.forEach(label => {
      const c = document.createElement('button');
      c.className = 'll-chip';
      c.textContent = label;
      c.onclick = () => sendMessage(label);
      chipsEl.appendChild(c);
    });
  }

  // ── Messages ─────────────────────────────────────────────────────────────────
  function addMessage(role, text) {
    messages.push({ role, content: text });
    const div = document.createElement('div');
    div.className = `ll-msg ${role === 'assistant' ? 'bot' : 'user'}`;
    div.innerHTML = linkify(text);
    msgEl.appendChild(div);
    msgEl.scrollTop = msgEl.scrollHeight;
    renderChips();
  }

  function linkify(text) {
    return text
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  }

  function showTyping() {
    const t = document.createElement('div');
    t.className = 'll-typing';
    t.id = 'll-typing';
    t.innerHTML = '<span></span><span></span><span></span>';
    msgEl.appendChild(t);
    msgEl.scrollTop = msgEl.scrollHeight;
    return t;
  }

  function removeTyping() {
    const t = document.getElementById('ll-typing');
    if (t) t.remove();
  }

  // ── API call ─────────────────────────────────────────────────────────────────
  async function sendMessage(text) {
    text = text.trim();
    if (!text || isLoading) return;

    isLoading = true;
    sendBtn.disabled = true;
    input.value = '';
    input.style.height = 'auto';

    addMessage('user', text);
    const typing = showTyping();

    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages })
      });

      removeTyping();

      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't get a response. Email us at support@leadlocked.ai";
      addMessage('assistant', reply);

    } catch (e) {
      removeTyping();
      addMessage('assistant', "Sorry, something went wrong. Email us at support@leadlocked.ai and we'll get back to you quickly.");
    }

    isLoading = false;
    sendBtn.disabled = false;
    input.focus();
  }

  // ── Toggle ───────────────────────────────────────────────────────────────────
  function toggle() {
    isOpen = !isOpen;
    btn.classList.toggle('open', isOpen);
    win.classList.toggle('open', isOpen);
    if (isOpen) {
      if (messages.length === 0) {
        addMessage('assistant', "Hey! 👋 I'm the LeadLocked AI — ask me anything about how it works, pricing, or setup. I'll give you a straight answer.");
      }
      setTimeout(() => input.focus(), 300);
    }
  }

  btn.addEventListener('click', toggle);

  // ── Send handlers ────────────────────────────────────────────────────────────
  sendBtn.addEventListener('click', () => sendMessage(input.value));
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input.value);
    }
  });

  // Auto-resize textarea
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 100) + 'px';
  });

  renderChips();
})();
