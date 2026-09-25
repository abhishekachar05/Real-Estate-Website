export default function getStatusPage() {

  const startTime = process.uptime();
  const nodeVersion = process.version;
  const environment = process.env.NODE_ENV || 'development';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Propert-E API</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏠</text></svg>">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background:#FAF8F4;min-height:100vh;padding:24px;line-height:1.6;color:#374151}
    .dash{max-width:960px;margin:0 auto}

    /* Header */
    .hdr{background:#221410;color:#fff;padding:36px 32px;border-radius:14px 14px 0 0;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
    .hdr h1{font-size:1.6rem;font-weight:700;letter-spacing:.3px}
    .hdr .sub{font-size:.85rem;opacity:.7;margin-top:4px}
    .badge{display:inline-flex;align-items:center;gap:8px;background:rgba(34,197,94,.12);color:#4ade80;padding:6px 14px;border-radius:20px;font-weight:600;font-size:.82rem;border:1px solid rgba(34,197,94,.25)}
    .dot{width:7px;height:7px;background:#4ade80;border-radius:50%;animation:pulse 2s infinite}
    @keyframes pulse{0%{box-shadow:0 0 0 0 rgba(74,222,128,.6)}70%{box-shadow:0 0 0 8px rgba(74,222,128,0)}100%{box-shadow:0 0 0 0 rgba(74,222,128,0)}}

    /* Cards */
    .body{background:#fff;padding:28px 32px;border-bottom:1px solid #E6E0DA}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin-bottom:28px}
    .card{background:#FAF8F4;border:1px solid #E6E0DA;border-radius:10px;padding:18px}
    .card .lbl{font-size:.72rem;text-transform:uppercase;letter-spacing:.06em;color:#9CA3AF;font-weight:600;margin-bottom:6px}
    .card .val{font-size:1.35rem;font-weight:700;color:#221410}
    .card .desc{font-size:.78rem;color:#9CA3AF;margin-top:4px}

    /* Endpoints */
    .section-title{font-size:1rem;font-weight:700;color:#221410;margin-bottom:16px}
    .ep{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:#FAF8F4;border-radius:8px;border-left:3px solid #D4755B;margin-bottom:8px;transition:background .15s}
    .ep:hover{background:#F2EFE9}
    .ep-left{display:flex;align-items:center;gap:12px}
    .method{font-family:'SF Mono',Monaco,'Cascadia Code',monospace;font-size:.7rem;padding:3px 7px;border-radius:4px;font-weight:700;text-transform:uppercase}
    .m-get{background:#dcfce7;color:#166534}.m-post{background:#dbeafe;color:#1e40af}.m-put{background:#fef3c7;color:#92400e}.m-del{background:#fee2e2;color:#dc2626}
    .path{font-family:'SF Mono',Monaco,monospace;font-size:.82rem;color:#374151}
    .ep-desc{font-size:.78rem;color:#9CA3AF}

    /* Features */
    .features{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;margin-top:16px}
    .feat{display:flex;align-items:center;gap:8px;padding:10px 14px;background:#FAF8F4;border:1px solid #E6E0DA;border-radius:8px;font-size:.82rem;color:#221410}

    /* Footer */
    .ftr{background:#221410;color:rgba(255,255,255,.6);padding:20px 32px;border-radius:0 0 14px 14px;font-size:.78rem;text-align:center}
    .ftr a{color:#D4755B;text-decoration:none;font-weight:500}
    .ftr a:hover{text-decoration:underline}

    @media(max-width:640px){.hdr{flex-direction:column;text-align:center}.body{padding:20px 16px}.grid{grid-template-columns:1fr 1fr}.ep{flex-direction:column;align-items:flex-start;gap:6px}}
  </style>
</head>
<body>
  <div class="dash">

    <!-- Header -->
    <div class="hdr">
      <div>
        <h1>Propert-E API</h1>
        <p class="sub">Real Estate Platform Backend</p>
      </div>
      <div class="badge"><span class="dot"></span> Online</div>
    </div>

    <!-- Stats -->
    <div class="body">
      <div class="grid">
        <div class="card">
          <div class="lbl">Uptime</div>
          <div class="val">${Math.floor(startTime / 3600)}h ${Math.floor((startTime % 3600) / 60)}m</div>
          <div class="desc">Server running time</div>
        </div>
        <div class="card">
          <div class="lbl">Environment</div>
          <div class="val">${environment}</div>
          <div class="desc">Deployment mode</div>
        </div>
        <div class="card">
          <div class="lbl">Node.js</div>
          <div class="val">${nodeVersion}</div>
          <div class="desc">Runtime version</div>
        </div>
        <div class="card">
          <div class="lbl">Server Time</div>
          <div class="val">${new Date().toLocaleTimeString()}</div>
          <div class="desc">${new Date().toLocaleDateString()}</div>
        </div>
      </div>

      <!-- Endpoints -->
      <p class="section-title">API Endpoints</p>

      <div class="ep"><div class="ep-left"><span class="method m-get">GET</span><span class="path">/api/products/list</span></div><span class="ep-desc">Property listings</span></div>
      <div class="ep"><div class="ep-left"><span class="method m-post">POST</span><span class="path">/api/users/register</span></div><span class="ep-desc">User registration</span></div>
      <div class="ep"><div class="ep-left"><span class="method m-post">POST</span><span class="path">/api/users/login</span></div><span class="ep-desc">User authentication</span></div>
      <div class="ep"><div class="ep-left"><span class="method m-get">GET</span><span class="path">/api/appointments</span></div><span class="ep-desc">Property viewings</span></div>
      <div class="ep"><div class="ep-left"><span class="method m-get">GET</span><span class="path">/api/news</span></div><span class="ep-desc">News &amp; newsletters</span></div>
      <div class="ep"><div class="ep-left"><span class="method m-post">POST</span><span class="path">/api/forms</span></div><span class="ep-desc">Contact form</span></div>
      <div class="ep"><div class="ep-left"><span class="method m-get">GET</span><span class="path">/api/admin/dashboard</span></div><span class="ep-desc">Admin dashboard</span></div>
      <div class="ep"><div class="ep-left"><span class="method m-post">POST</span><span class="path">/api/ai/analysis</span></div><span class="ep-desc">AI property analysis</span></div>
      <div class="ep"><div class="ep-left"><span class="method m-get">GET</span><span class="path">/api/locations</span></div><span class="ep-desc">Location search</span></div>
      <div class="ep"><div class="ep-left"><span class="method m-get">GET</span><span class="path">/health</span></div><span class="ep-desc">Health check</span></div>
      <div class="ep" style="margin-bottom:28px"><div class="ep-left"><span class="method m-get">GET</span><span class="path">/status</span></div><span class="ep-desc">System status (JSON)</span></div>

      <!-- Features -->
      <p class="section-title">Platform Features</p>
      <div class="features">
        <div class="feat"><span>🏘️</span> Property Management</div>
        <div class="feat"><span>🔐</span> JWT Authentication</div>
        <div class="feat"><span>🤖</span> AI Property Analysis</div>
        <div class="feat"><span>📧</span> Email Notifications</div>
        <div class="feat"><span>📊</span> Admin Dashboard</div>
        <div class="feat"><span>🔍</span> Advanced Search</div>
        <div class="feat"><span>📱</span> Mobile Responsive</div>
        <div class="feat"><span>📅</span> Appointment Scheduling</div>
      </div>
    </div>

    <!-- Footer -->
    <div class="ftr">
      <p>&copy; ${new Date().getFullYear()} Propert-E &nbsp;|&nbsp;
        <a href="/health">Health</a> &nbsp;|&nbsp;
        <a href="/status">Status</a> &nbsp;|&nbsp;
        <a href="https://buildestate.vercel.app" target="_blank">Website</a> &nbsp;|&nbsp;
        <a href="https://github.com/abhishekachar05/Real-Estate-Website" target="_blank">GitHub</a>
      </p>
      <p style="margin-top:8px;opacity:.6">Express.js &middot; MongoDB &middot; Last refresh: ${new Date().toLocaleString()}</p>
    </div>
  </div>

  <script>
    setTimeout(()=>location.reload(),30000);
    document.querySelectorAll('.ep').forEach(el=>{
      el.style.cursor='pointer';
      el.addEventListener('click',function(){
        const p=this.querySelector('.path').textContent;
        const m=this.querySelector('.method').textContent.trim();
        if(m==='GET'&&(p==='/health'||p==='/status'))window.open(p,'_blank');
      });
    });
  </script>
</body>
</html>`;
};