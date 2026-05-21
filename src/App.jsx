const css = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap');
  @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --blue: #4f46e5;
    --blue-dark: #3730a3;
    --blue-light: #eef2ff;
    --blue-mid: #c7d2fe;
    --indigo: #6366f1;
    --purple: #8b5cf6;
    --green: #10b981;
    --green-light: #ecfdf5;
    --red: #ef4444;
    --red-light: #fef2f2;
    --amber: #f59e0b;
    --amber-light: #fffbeb;
    --gray-50: #f8fafc;
    --gray-100: #f1f5f9;
    --gray-200: #e2e8f0;
    --gray-300: #cbd5e1;
    --gray-400: #94a3b8;
    --gray-500: #64748b;
    --gray-600: #475569;
    --gray-700: #334155;
    --gray-800: #1e293b;
    --gray-900: #0f172a;
    --radius: 12px;
    --radius-lg: 20px;
    --radius-xl: 28px;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
    --shadow: 0 4px 12px rgba(0,0,0,0.08);
    --shadow-md: 0 8px 24px rgba(0,0,0,0.1);
    --shadow-lg: 0 20px 48px rgba(0,0,0,0.12);
    --shadow-color: 0 8px 24px rgba(79,70,229,0.18);
  }

  body {
    font-family: 'Inter', 'Noto Sans Bengali', sans-serif;
    background: #f0f4ff;
    color: var(--gray-800);
    min-height: 100vh;
    line-height: 1.6;
  }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: var(--gray-100); }
  ::-webkit-scrollbar-thumb { background: var(--gray-300); border-radius: 99px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--gray-400); }

  /* ── NAVBAR ── */
  .navbar {
    background: white;
    border-bottom: 1px solid var(--gray-200);
    padding: 0 24px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 1px 8px rgba(0,0,0,0.06);
  }
  .navbar-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 800;
    font-size: 18px;
    background: linear-gradient(135deg, var(--blue), var(--purple));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    cursor: pointer;
  }
  .navbar-brand i {
    font-size: 26px;
    background: linear-gradient(135deg, var(--blue), var(--purple));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .navbar-actions { display: flex; align-items: center; gap: 10px; }
  .navbar-user {
    display: flex; align-items: center; gap: 8px;
    padding: 6px 12px; border-radius: 99px;
    background: var(--blue-light); color: var(--blue-dark);
    font-size: 13px; font-weight: 500;
  }

  /* ── BUTTONS ── */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 9px 18px;
    border-radius: var(--radius);
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.18s cubic-bezier(.4,0,.2,1);
    text-decoration: none;
    white-space: nowrap;
    font-family: inherit;
    letter-spacing: 0.01em;
  }
  .btn:active { transform: scale(0.97); }
  .btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }
  .btn-primary {
    background: linear-gradient(135deg, var(--blue), var(--indigo));
    color: white;
    box-shadow: 0 4px 12px rgba(79,70,229,0.3);
  }
  .btn-primary:hover:not(:disabled) {
    box-shadow: 0 6px 20px rgba(79,70,229,0.4);
    transform: translateY(-1px);
  }
  .btn-outline {
    background: white;
    color: var(--gray-700);
    border: 1.5px solid var(--gray-200);
    box-shadow: var(--shadow-sm);
  }
  .btn-outline:hover:not(:disabled) { background: var(--gray-50); border-color: var(--gray-300); }
  .btn-danger { background: linear-gradient(135deg, var(--red), #dc2626); color: white; box-shadow: 0 4px 12px rgba(239,68,68,0.3); }
  .btn-danger:hover:not(:disabled) { box-shadow: 0 6px 20px rgba(239,68,68,0.4); transform: translateY(-1px); }
  .btn-success { background: linear-gradient(135deg, var(--green), #059669); color: white; box-shadow: 0 4px 12px rgba(16,185,129,0.3); }
  .btn-success:hover:not(:disabled) { box-shadow: 0 6px 20px rgba(16,185,129,0.4); transform: translateY(-1px); }
  .btn-sm { padding: 6px 12px; font-size: 12px; border-radius: 8px; }
  .btn-ghost { background: transparent; color: var(--gray-500); border: none; box-shadow: none; padding: 7px 10px; border-radius: 8px; }
  .btn-ghost:hover { background: var(--gray-100); color: var(--gray-700); }
  .btn-purple { background: linear-gradient(135deg, var(--purple), #7c3aed); color: white; box-shadow: 0 4px 12px rgba(139,92,246,0.3); }
  .btn-purple:hover:not(:disabled) { box-shadow: 0 6px 20px rgba(139,92,246,0.4); transform: translateY(-1px); }

  /* ── FORM ── */
  .form-group { margin-bottom: 16px; }
  .form-label { display: block; font-size: 13px; font-weight: 600; color: var(--gray-700); margin-bottom: 6px; letter-spacing: 0.02em; }
  .form-input {
    width: 100%;
    padding: 10px 14px;
    border: 1.5px solid var(--gray-200);
    border-radius: var(--radius);
    font-size: 14px;
    font-family: inherit;
    color: var(--gray-800);
    background: white;
    transition: all 0.15s;
    outline: none;
  }
  .form-input:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(79,70,229,0.12); }
  .form-input::placeholder { color: var(--gray-400); }
  textarea.form-input { resize: vertical; min-height: 80px; }
  select.form-input { cursor: pointer; }

  /* ── ALERTS ── */
  .alert { padding: 12px 16px; border-radius: var(--radius); font-size: 13px; font-weight: 500; display: flex; align-items: center; gap: 8px; }
  .alert-error { background: var(--red-light); color: var(--red); border: 1px solid #fecaca; }
  .alert-success { background: var(--green-light); color: #065f46; border: 1px solid #a7f3d0; }
  .alert-info { background: var(--blue-light); color: var(--blue-dark); border: 1px solid var(--blue-mid); }

  /* ── CARD ── */
  .card {
    background: white;
    border-radius: var(--radius-lg);
    border: 1px solid var(--gray-200);
    box-shadow: var(--shadow);
    overflow: hidden;
  }
  .card-header {
    padding: 20px 24px;
    border-bottom: 1px solid var(--gray-100);
    display: flex; align-items: center; gap: 12px;
  }
  .card-body { padding: 24px; }

  /* ── BADGE ── */
  .badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 99px; font-size: 12px; font-weight: 600; }
  .badge-pending { background: var(--amber-light); color: #92400e; }
  .badge-approved { background: var(--green-light); color: #065f46; }
  .badge-rejected { background: var(--red-light); color: var(--red); }
  .badge-blocked { background: #f5f3ff; color: #5b21b6; }

  /* ── MODAL ── */
  .modal-backdrop {
    position: fixed; inset: 0;
    background: rgba(15,23,42,0.5);
    backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.15s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
  .modal {
    background: white;
    border-radius: var(--radius-xl);
    padding: 32px;
    width: 90%;
    max-width: 460px;
    box-shadow: var(--shadow-lg);
    animation: slideUp 0.2s cubic-bezier(.34,1.56,.64,1);
    max-height: 90vh;
    overflow-y: auto;
  }
  .modal-title { font-size: 18px; font-weight: 700; color: var(--gray-900); margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
  .modal-actions { display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap; }

  /* ── APP LAYOUT ── */
  .app-layout { padding: 24px; max-width: 1200px; margin: 0 auto; }

  /* ── SIDEBAR NAV (main app) ── */
  .main-sidebar {
    width: 240px;
    background: white;
    border-right: 1px solid var(--gray-200);
    min-height: calc(100vh - 60px);
    padding: 20px 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 50;
    box-shadow: 2px 0 12px rgba(0,0,0,0.04);
  }
  .sidebar-section-title {
    font-size: 10px;
    font-weight: 700;
    color: var(--gray-400);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 12px 12px 6px;
  }
  .sidebar-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 14px; border-radius: var(--radius);
    font-size: 14px; font-weight: 500;
    color: var(--gray-600);
    cursor: pointer; transition: all 0.15s;
    border: none; background: transparent; width: 100%; text-align: left;
    font-family: inherit;
  }
  .sidebar-item:hover { background: var(--blue-light); color: var(--blue); }
  .sidebar-item.active { background: linear-gradient(135deg, var(--blue-light), #e0e7ff); color: var(--blue); font-weight: 600; }
  .sidebar-item i { font-size: 18px; flex-shrink: 0; }
  .sidebar-excel-item {
    display: flex; align-items: center; gap: 10px;
    padding: 8px 14px; border-radius: var(--radius);
    font-size: 13px; font-weight: 500;
    color: var(--gray-600);
    cursor: pointer; transition: all 0.15s;
    border: none; background: transparent; width: 100%; text-align: left;
    font-family: inherit;
  }
  .sidebar-excel-item:hover { background: var(--blue-light); color: var(--blue); }
  .sidebar-excel-item.active { background: linear-gradient(135deg, var(--blue-light), #e0e7ff); color: var(--blue); font-weight: 600; }
  .sidebar-add-excel {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 14px; border-radius: var(--radius);
    font-size: 13px; font-weight: 600; color: var(--blue);
    cursor: pointer; border: 1.5px dashed var(--blue-mid);
    background: var(--blue-light); margin-top: 4px;
    transition: all 0.15s; width: 100%; font-family: inherit;
  }
  .sidebar-add-excel:hover { background: var(--blue-mid); }
  .main-content { margin-left: 240px; padding: 28px; min-height: calc(100vh - 60px); }

  /* ── DASHBOARD ── */
  .dashboard-header {
    margin-bottom: 28px;
  }
  .dashboard-header h1 {
    font-size: 26px; font-weight: 800; color: var(--gray-900);
    background: linear-gradient(135deg, var(--blue), var(--purple));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .dashboard-header p { font-size: 14px; color: var(--gray-500); margin-top: 4px; }
  .excel-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 18px;
  }
  .excel-card {
    background: white;
    border-radius: var(--radius-lg);
    border: 1px solid var(--gray-200);
    padding: 24px 20px;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(.4,0,.2,1);
    box-shadow: var(--shadow-sm);
    position: relative;
    overflow: hidden;
  }
  .excel-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--blue), var(--purple));
    opacity: 0;
    transition: opacity 0.2s;
  }
  .excel-card:hover { box-shadow: var(--shadow-color); transform: translateY(-3px); border-color: var(--blue-mid); }
  .excel-card:hover::before { opacity: 1; }
  .excel-card-icon {
    width: 52px; height: 52px; border-radius: 14px;
    background: linear-gradient(135deg, var(--blue-light), #e0e7ff);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 14px;
  }
  .excel-card-icon i { font-size: 26px; color: var(--blue); }
  .excel-card-name { font-size: 15px; font-weight: 700; color: var(--gray-800); margin-bottom: 6px; }
  .excel-card-meta { font-size: 12px; color: var(--gray-400); }
  .excel-card-add {
    background: white;
    border: 2px dashed var(--blue-mid);
    border-radius: var(--radius-lg);
    padding: 24px 20px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    min-height: 140px; gap: 10px;
  }
  .excel-card-add:hover { background: var(--blue-light); border-color: var(--blue); }
  .excel-card-add i { font-size: 32px; color: var(--blue); }
  .excel-card-add span { font-size: 14px; font-weight: 600; color: var(--blue); }

  /* ── STEP PAGE ── */
  .step-page { max-width: 780px; margin: 0 auto; }
  .step-header {
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 28px;
  }
  .step-back-btn {
    width: 40px; height: 40px; border-radius: 12px;
    background: white; border: 1.5px solid var(--gray-200);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.15s; flex-shrink: 0;
    box-shadow: var(--shadow-sm);
    font-size: 18px; color: var(--gray-600);
  }
  .step-back-btn:hover { background: var(--blue-light); border-color: var(--blue); color: var(--blue); }
  .step-title { font-size: 22px; font-weight: 800; color: var(--gray-900); }
  .step-subtitle { font-size: 14px; color: var(--gray-500); margin-top: 2px; }

  /* ── COLUMN LIST ── */
  .col-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
  .col-item {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 14px;
    background: var(--gray-50); border: 1px solid var(--gray-200);
    border-radius: var(--radius); transition: all 0.15s;
  }
  .col-item:hover { border-color: var(--blue-mid); background: var(--blue-light); }
  .col-drag { cursor: grab; color: var(--gray-400); font-size: 16px; }
  .col-name { font-weight: 600; font-size: 14px; color: var(--gray-800); flex: 1; }
  .add-col-row { display: flex; gap: 8px; align-items: center; }

  /* ── TABLE ── */
  .data-table-wrap { overflow-x: auto; border-radius: var(--radius-lg); border: 1px solid var(--gray-200); background: white; }
  .data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .data-table th {
    padding: 12px 14px; text-align: left;
    background: white;
    font-weight: 700; font-size: 12px;
    color: var(--gray-700); letter-spacing: 0.03em; text-transform: uppercase;
    border-bottom: 2px solid var(--gray-200);
    white-space: nowrap;
  }
  .data-table td {
    padding: 11px 14px;
    border-bottom: 1px solid var(--gray-100);
    color: var(--gray-700);
    vertical-align: middle;
    background: white;
  }
  .data-table tr:last-child td { border-bottom: none; }
  .data-table tr:hover td { background: var(--gray-50); }

  /* ── EXCEL TAB (Step pages inside excel) ── */
  .excel-step-tabs {
    display: flex; gap: 0;
    border-bottom: 2px solid var(--gray-200);
    margin-bottom: 28px;
  }
  .excel-step-tab {
    padding: 10px 20px; font-size: 14px; font-weight: 600;
    color: var(--gray-500); cursor: pointer; border: none; background: none;
    border-bottom: 2px solid transparent; margin-bottom: -2px;
    transition: all 0.15s; display: flex; align-items: center; gap: 7px;
    font-family: inherit;
  }
  .excel-step-tab.active { color: var(--blue); border-bottom-color: var(--blue); }
  .excel-step-tab:hover:not(.active) { color: var(--gray-700); background: var(--gray-50); }

  /* ── STATS ── */
  .stat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 14px; margin-bottom: 24px; }
  .stat-card {
    background: white; border-radius: var(--radius-lg);
    padding: 18px; border: 1px solid var(--gray-200);
    box-shadow: var(--shadow-sm);
  }
  .stat-value { font-size: 28px; font-weight: 800; color: var(--blue); line-height: 1; }
  .stat-label { font-size: 12px; color: var(--gray-500); margin-top: 6px; font-weight: 500; }

  /* ── ADMIN PANEL ── */
  .admin-wrap { display: flex; min-height: calc(100vh - 60px); }
  .admin-sidebar {
    width: 220px; background: white;
    border-right: 1px solid var(--gray-200);
    padding: 20px 12px; display: flex; flex-direction: column; gap: 4px;
    box-shadow: 2px 0 12px rgba(0,0,0,0.04);
  }
  .admin-content { flex: 1; padding: 28px; background: #f0f4ff; overflow-y: auto; }
  .admin-content h2 { font-size: 20px; font-weight: 800; color: var(--gray-900); margin-bottom: 20px; }
  .user-cards { display: flex; flex-direction: column; gap: 12px; }
  .user-card {
    background: white; border-radius: var(--radius-lg);
    padding: 18px 20px; border: 1px solid var(--gray-200);
    display: flex; align-items: center; gap: 16px;
    box-shadow: var(--shadow-sm); transition: box-shadow 0.15s;
  }
  .user-card:hover { box-shadow: var(--shadow); }
  .user-avatar {
    width: 44px; height: 44px; border-radius: 14px;
    background: linear-gradient(135deg, var(--blue-light), #e0e7ff);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; color: var(--blue); flex-shrink: 0;
  }
  .user-info { flex: 1; min-width: 0; }
  .user-name { font-weight: 700; font-size: 14px; color: var(--gray-800); }
  .user-email { font-size: 12px; color: var(--gray-500); margin-top: 2px; }
  .user-actions { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }

  /* ── HOME PAGE ── */
  .home-page { min-height: 100vh; background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); }
  .hero {
    max-width: 900px; margin: 0 auto; padding: 100px 24px 80px;
    text-align: center;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 7px 18px; border-radius: 99px;
    background: rgba(99,102,241,0.2); border: 1px solid rgba(99,102,241,0.4);
    color: #a5b4fc; font-size: 13px; font-weight: 600; margin-bottom: 28px;
  }
  .hero h1 {
    font-size: 52px; font-weight: 800; line-height: 1.15;
    color: white; margin-bottom: 20px; letter-spacing: -0.02em;
  }
  .hero h1 span {
    background: linear-gradient(135deg, #818cf8, #c084fc);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .hero p { font-size: 18px; color: rgba(255,255,255,0.7); max-width: 560px; margin: 0 auto 36px; line-height: 1.7; }
  .hero-buttons { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .features-section { background: white; padding: 80px 24px; }
  .section-title { font-size: 32px; font-weight: 800; text-align: center; color: var(--gray-900); margin-bottom: 8px; }
  .section-sub { text-align: center; color: var(--gray-500); font-size: 16px; margin-bottom: 52px; }
  .features-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 24px; max-width: 1000px; margin: 0 auto; }
  .feature-card {
    padding: 28px; border-radius: var(--radius-lg);
    background: var(--gray-50); border: 1px solid var(--gray-200);
    transition: all 0.2s;
  }
  .feature-card:hover { box-shadow: var(--shadow-color); transform: translateY(-3px); background: white; border-color: var(--blue-mid); }
  .feature-icon {
    width: 52px; height: 52px; border-radius: 14px;
    background: linear-gradient(135deg, var(--blue-light), #e0e7ff);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 16px;
  }
  .feature-icon i { font-size: 24px; color: var(--blue); }
  .feature-card h3 { font-size: 16px; font-weight: 700; margin-bottom: 8px; color: var(--gray-800); }
  .feature-card p { font-size: 14px; color: var(--gray-500); line-height: 1.6; }
  .demo-section { background: #f0f4ff; padding: 80px 24px; }
  .demo-wrap { max-width: 800px; margin: 0 auto; }
  .demo-screen {
    background: white; border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg); overflow: hidden;
    border: 1px solid var(--gray-200);
  }
  .demo-topbar { background: var(--gray-800); padding: 10px 16px; display: flex; align-items: center; gap: 6px; }
  .demo-dot { width: 12px; height: 12px; border-radius: 50%; }
  .demo-body { padding: 24px; min-height: 180px; }
  .demo-slide { animation: slideIn 0.3s ease; }
  @keyframes slideIn { from { opacity: 0; transform: translateX(12px); } to { opacity: 1; transform: translateX(0); } }
  .cta-section { background: linear-gradient(135deg, var(--blue), var(--purple)); color: white; text-align: center; padding: 80px 24px; }
  .cta-section h2 { font-size: 32px; font-weight: 800; margin-bottom: 14px; }
  .cta-section p { color: rgba(255,255,255,0.8); margin-bottom: 32px; font-size: 16px; }

  /* ── AUTH ── */
  .auth-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #0f0c29, #302b63);
    display: flex; align-items: center; justify-content: center; padding: 24px;
  }
  .auth-card {
    background: white; border-radius: var(--radius-xl);
    padding: 40px; width: 100%; max-width: 420px;
    box-shadow: var(--shadow-lg);
    animation: slideUp 0.25s cubic-bezier(.34,1.56,.64,1);
  }
  .auth-logo { text-align: center; margin-bottom: 28px; }
  .auth-logo i { font-size: 44px; background: linear-gradient(135deg, var(--blue), var(--purple)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .auth-logo h2 { font-size: 22px; font-weight: 800; color: var(--gray-900); margin-top: 10px; }
  .auth-logo p { font-size: 13px; color: var(--gray-500); margin-top: 4px; }

  /* ── SEARCH BAR ── */
  .search-bar {
    display: flex; align-items: center; gap: 10px;
    background: white; border: 1.5px solid var(--gray-200);
    border-radius: var(--radius); padding: 8px 14px;
    transition: all 0.15s;
  }
  .search-bar:focus-within { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(79,70,229,0.12); }
  .search-bar i { color: var(--gray-400); font-size: 16px; }
  .search-bar input { border: none; outline: none; font-size: 14px; color: var(--gray-800); background: transparent; flex: 1; font-family: inherit; }
  .search-bar input::placeholder { color: var(--gray-400); }

  /* ── TABS (filter) ── */
  .filter-tabs { display: flex; gap: 6px; flex-wrap: wrap; }
  .filter-tab {
    padding: 7px 16px; border-radius: 99px;
    font-size: 13px; font-weight: 600; cursor: pointer;
    border: 1.5px solid var(--gray-200); background: white;
    color: var(--gray-600); transition: all 0.15s; font-family: inherit;
  }
  .filter-tab.active { background: var(--blue); color: white; border-color: var(--blue); box-shadow: 0 4px 12px rgba(79,70,229,0.3); }
  .filter-tab:hover:not(.active) { border-color: var(--blue-mid); color: var(--blue); }

  /* ── EMPTY STATE ── */
  .empty-state {
    text-align: center; padding: 60px 24px;
    color: var(--gray-400);
  }
  .empty-state i { font-size: 52px; margin-bottom: 16px; display: block; opacity: 0.5; }
  .empty-state h3 { font-size: 16px; font-weight: 700; color: var(--gray-500); margin-bottom: 6px; }
  .empty-state p { font-size: 13px; }

  /* ── PENDING SCREEN ── */
  .pending-screen {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #0f0c29, #302b63); padding: 24px;
  }
  .pending-card {
    background: white; border-radius: var(--radius-xl);
    padding: 48px 40px; max-width: 420px; width: 100%;
    text-align: center; box-shadow: var(--shadow-lg);
  }
  .pending-icon { font-size: 56px; margin-bottom: 20px; display: block; }
  .pending-card h2 { font-size: 22px; font-weight: 800; color: var(--gray-900); margin-bottom: 12px; }
  .pending-card p { font-size: 14px; color: var(--gray-500); line-height: 1.7; margin-bottom: 24px; }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .main-sidebar { display: none; }
    .main-content { margin-left: 0; padding: 20px 16px; }
    .excel-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
    .hero h1 { font-size: 32px; }
    .admin-sidebar { width: 56px; }
    .sidebar-item span { display: none; }
    .user-card { flex-wrap: wrap; }
  }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function useMounted() {
  const ref = useRef(true);
  useEffect(() => () => { ref.current = false; }, []);
  return ref;
}

// ─── Demo Animation Component ─────────────────────────────────────────────────
function DemoAnimation() {
  const [slide, setSlide] = useState(0);
  const slides = [
    {
      label: "ধাপ ১ — কলাম সেটআপ",
      content: (
        <div>
          <p style={{ fontSize: 13, color: "var(--gray-500)", marginBottom: 12 }}>
            আপনার প্রয়োজনীয় কলামগুলো তৈরি করুন
          </p>
          {[
            ["শিক্ষার্থীর নাম", "text"],
            ["শ্রেণি", "text"],
            ["রোল নম্বর", "number"],
            ["ছবি", "image"],
          ].map(([name, type], i) => (
            <div key={i} className="demo-col-row">
              <span className="demo-col-pill">{name}</span>
              <span style={{ fontSize: 11, color: "var(--gray-400)" }}>— {type}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "ধাপ ২ — ডেটা এন্ট্রি",
      content: (
        <div>
          <p style={{ fontSize: 13, color: "var(--gray-500)", marginBottom: 12 }}>
            ফর্মে ডেটা পূরণ করুন
          </p>
          <div className="demo-form-row">
            {[
              ["শিক্ষার্থীর নাম", "রাহেলা বেগম"],
              ["শ্রেণি", "দশম"],
              ["রোল নম্বর", "১২৩৪"],
              ["পিতার নাম", "করিম সাহেব"],
            ].map(([label, val]) => (
              <div key={label} className="demo-field">
                <label>{label}</label>
                <div className="demo-field-box">{val}</div>
              </div>
            ))}
          </div>
          <button
            className="btn btn-primary btn-sm"
            style={{ marginTop: 4 }}
          >
            <i className="ti ti-plus" /> এন্ট্রি যোগ করুন
          </button>
        </div>
      ),
    },
    {
      label: "ধাপ ৩ — ডেটা ও ডাউনলোড",
      content: (
        <div>
          <p style={{ fontSize: 13, color: "var(--gray-500)", marginBottom: 12 }}>
            সমস্ত ডেটা দেখুন এবং Excel ডাউনলোড করুন
          </p>
          <table className="demo-table">
            <thead>
              <tr>
                <th>#</th>
                <th>নাম</th>
                <th>শ্রেণি</th>
                <th>রোল</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["১", "রাহেলা বেগম", "দশম", "১২৩৪"],
                ["২", "করিম মিয়া", "নবম", "৫৬৭৮"],
                ["৩", "সুমি আক্তার", "দশম", "৯১০১"],
              ].map((r) => (
                <tr key={r[0]}>
                  {r.map((c, i) => <td key={i}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success btn-sm" style={{ marginTop: 12 }}>
            <i className="ti ti-file-excel" /> Excel ডাউনলোড
          </button>
        </div>
      ),
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 3500);
    return () => clearInterval(t);
  }, []); // eslint-disable-line

  return (
    <div className="demo-section">
      <div className="demo-wrap">
        <h2 className="section-title">কীভাবে কাজ করে</h2>
        <p className="section-sub">মাত্র তিনটি ধাপে Excel ডেটা এন্ট্রি করুন</p>
        <div className="demo-screen">
          <div className="demo-topbar">
            <div className="demo-dot" style={{ background: "#ef4444" }} />
            <div className="demo-dot" style={{ background: "#f59e0b" }} />
            <div className="demo-dot" style={{ background: "#22c55e" }} />
            <span style={{ marginLeft: 12, fontSize: 12, color: "#9ca3af" }}>
              Excel Data Entry App
            </span>
          </div>
          <div className="demo-body">
            <div className="demo-step-label">{slides[slide].label}</div>
            <div key={slide} className="demo-step active">
              {slides[slide].content}
            </div>
          </div>
        </div>
        <div className="demo-progress">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`demo-dot-nav ${i === slide ? "active" : ""}`}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
function HomePage({ onLogin, onRegister }) {
  const features = [
    {
      icon: "ti-columns",
      title: "কাস্টম কলাম তৈরি",
      desc: "আপনার প্রয়োজন অনুযায়ী যেকোনো কলাম তৈরি করুন — টেক্সট, নম্বর, তারিখ, ছবি।",
    },
    {
      icon: "ti-files",
      title: "একাধিক Excel ফাইল",
      desc: "একসাথে অনেক Excel ফাইল তৈরি করুন এবং যেকোনো সময় পরিবর্তন করুন।",
    },
    {
      icon: "ti-cloud",
      title: "ক্লাউড সিঙ্ক",
      desc: "সব ডেটা ক্লাউডে সেভ হয়। যেকোনো ডিভাইস থেকে একই ডেটা অ্যাক্সেস করুন।",
    },
    {
      icon: "ti-users",
      title: "মাল্টি-ইউজার",
      desc: "অনেক ব্যবহারকারী আলাদা আলাদাভাবে তাদের নিজস্ব ডেটা এন্ট্রি করতে পারবে।",
    },
    {
      icon: "ti-file-excel",
      title: "Excel ডাউনলোড",
      desc: "এক ক্লিকে সম্পূর্ণ ডেটা Excel ফরম্যাটে ডাউনলোড করুন।",
    },
    {
      icon: "ti-shield-check",
      title: "Admin অ্যাপ্রুভাল",
      desc: "Admin অনুমোদনের পরেই ব্যবহারকারী অ্যাপ ব্যবহার করতে পারবে।",
    },
  ];

  const steps = [
    {
      n: "১",
      title: "রেজিস্ট্রেশন করুন",
      desc: "আপনার নাম, ইমেইল ও পাসওয়ার্ড দিয়ে নতুন অ্যাকাউন্ট তৈরি করুন।",
    },
    {
      n: "২",
      title: "Admin অনুমোদনের অপেক্ষা করুন",
      desc: "Admin আপনার অ্যাকাউন্ট যাচাই করে অনুমোদন দেবে।",
    },
    {
      n: "৩",
      title: "লগইন করুন",
      desc: "অনুমোদন পেলে লগইন করুন এবং ডেটা এন্ট্রি শুরু করুন।",
    },
    {
      n: "৪",
      title: "Excel তৈরি করুন",
      desc: "কলাম সেটআপ করুন, ডেটা এন্ট্রি করুন এবং Excel ডাউনলোড করুন।",
    },
  ];

  return (
    <div>
      <div className="hero">
        <h1>📊 Excel ডেটা এন্ট্রি অ্যাপ</h1>
        <p>
          যেকোনো জায়গা থেকে, যেকোনো ডিভাইস থেকে সহজে ডেটা এন্ট্রি করুন এবং Excel
          ফরম্যাটে ডাউনলোড করুন।
        </p>
        <div className="hero-btns">
          <button className="btn btn-white" onClick={onRegister}>
            <i className="ti ti-user-plus" /> বিনামূল্যে শুরু করুন
          </button>
          <button className="btn btn-outline-white" onClick={onLogin}>
            <i className="ti ti-login" /> লগইন করুন
          </button>
        </div>
      </div>

      <div className="features">
        <h2 className="section-title">কেন এই অ্যাপ ব্যবহার করবেন?</h2>
        <p className="section-sub">সহজ, দ্রুত এবং নিরাপদ ডেটা ম্যানেজমেন্ট</p>
        <div className="features-grid">
          {features.map((f) => (
            <div key={f.icon} className="feature-card">
              <div className="feature-icon">
                <i className={`ti ${f.icon}`} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <DemoAnimation />

      <div className="steps-section">
        <h2 className="section-title">কীভাবে শুরু করবেন</h2>
        <p className="section-sub">চারটি সহজ ধাপ অনুসরণ করুন</p>
        <div className="steps-list">
          {steps.map((s) => (
            <div key={s.n} className="step-item">
              <div className="step-num">{s.n}</div>
              <div className="step-content">
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-section">
        <h2>এখনই শুরু করুন</h2>
        <p>বিনামূল্যে অ্যাকাউন্ট তৈরি করুন এবং ডেটা এন্ট্রি শুরু করুন।</p>
        <button className="btn btn-white" onClick={onRegister}>
          <i className="ti ti-rocket" /> রেজিস্ট্রেশন করুন
        </button>
      </div>
    </div>
  );
}

// ─── Auth Page ────────────────────────────────────────────────────────────────
function AuthPage({ initialMode = "login", onBack }) {
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const mounted = useMounted();

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    setError(""); setSuccess("");
    if (!form.email || !form.password) { setError("ইমেইল ও পাসওয়ার্ড দিন"); return; }

    if (mode === "register") {
      if (!form.name.trim()) { setError("নাম দিন"); return; }
      if (form.password !== form.confirm) { setError("পাসওয়ার্ড মিলছে না"); return; }
      if (form.password.length < 6) { setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে"); return; }
    }

    setLoading(true);
    if (mode === "login") {
      const { error: err } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (!mounted.current) return;
      if (err) setError("লগইন ব্যর্থ: " + err.message);
    } else if (mode === "register") {
      const { data, error: signUpErr } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.name } },
      });
      if (!mounted.current) return;
      if (signUpErr) { setError("রেজিস্ট্রেশন ব্যর্থ: " + signUpErr.message); setLoading(false); return; }
      // Insert pending profile
      if (data.user) {
        await supabase.from("user_profiles").upsert({
          user_id: data.user.id,
          email: form.email,
          full_name: form.name,
          status: "pending",
          created_at: new Date().toISOString(),
        }, { onConflict: "user_id" });
      }
      setSuccess("রেজিস্ট্রেশন সফল! Admin অনুমোদনের পর লগইন করতে পারবেন। ইমেইল যাচাই করুন।");
    } else {
      const { error: err } = await supabase.auth.resetPasswordForEmail(form.email, { redirectTo: "https://easyexcel.vercel.app" });
      if (!mounted.current) return;
      if (err) setError(err.message);
      else setSuccess("পাসওয়ার্ড রিসেট লিংক ইমেইলে পাঠানো হয়েছে।");
    }
    if (mounted.current) setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {onBack && (
          <button className="btn btn-ghost btn-sm" style={{ marginBottom: 12 }} onClick={onBack}>
            <i className="ti ti-arrow-left" /> হোমে ফিরুন
          </button>
        )}
        <div className="auth-logo">
          <i className="ti ti-file-spreadsheet" />
          <h2>Excel ডেটা এন্ট্রি অ্যাপ</h2>
          <p>যেকোনো জায়গা থেকে ডেটা এন্ট্রি করুন</p>
        </div>

        <div className="auth-tabs">
          {[["login", "লগইন"], ["register", "নতুন অ্যাকাউন্ট"]].map(([m, label]) => (
            <button
              key={m}
              className={`auth-tab ${mode === m ? "active" : ""}`}
              onClick={() => { setMode(m); setError(""); setSuccess(""); }}
            >
              {label}
            </button>
          ))}
        </div>

        {error && <div className="alert alert-error"><i className="ti ti-alert-circle" />{error}</div>}
        {success && <div className="alert alert-success"><i className="ti ti-circle-check" />{success}</div>}

        {mode !== "forgot" && (
          <>
            {mode === "register" && (
              <div className="form-group">
                <label className="form-label">পূর্ণ নাম</label>
                <input className="form-input" placeholder="আপনার নাম লিখুন" value={form.name} onChange={set("name")} />
              </div>
            )}
            <div className="form-group">
              <label className="form-label">ইমেইল</label>
              <input className="form-input" type="email" placeholder="আপনার ইমেইল" value={form.email} onChange={set("email")}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()} />
            </div>
            <div className="form-group">
              <label className="form-label">পাসওয়ার্ড</label>
              <input className="form-input" type="password" placeholder="পাসওয়ার্ড" value={form.password} onChange={set("password")}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()} />
            </div>
            {mode === "register" && (
              <div className="form-group">
                <label className="form-label">পাসওয়ার্ড নিশ্চিত করুন</label>
                <input className="form-input" type="password" placeholder="আবার পাসওয়ার্ড দিন" value={form.confirm} onChange={set("confirm")}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()} />
              </div>
            )}
            <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleSubmit} disabled={loading}>
              {loading ? <><span className="spinner" style={{ width: 16, height: 16 }} /> অপেক্ষা করুন...</>
                : mode === "login" ? <><i className="ti ti-login" /> লগইন করুন</>
                : <><i className="ti ti-user-plus" /> অ্যাকাউন্ট তৈরি করুন</>}
            </button>
            {mode === "login" && (
              <button className="btn btn-ghost" style={{ width: "100%", marginTop: 8 }}
                onClick={() => { setMode("forgot"); setError(""); setSuccess(""); }}>
                পাসওয়ার্ড ভুলে গেছেন?
              </button>
            )}
          </>
        )}

        {mode === "forgot" && (
          <>
            <div className="form-group">
              <label className="form-label">ইমেইল</label>
              <input className="form-input" type="email" placeholder="আপনার ইমেইল" value={form.email} onChange={set("email")} autoFocus />
            </div>
            <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleSubmit} disabled={loading}>
              {loading ? "পাঠানো হচ্ছে..." : "রিসেট লিংক পাঠান"}
            </button>
            <button className="btn btn-ghost" style={{ width: "100%", marginTop: 8 }}
              onClick={() => { setMode("login"); setError(""); setSuccess(""); }}>
              <i className="ti ti-arrow-left" /> লগইনে ফিরুন
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Admin Panel ──────────────────────────────────────────────────────────────
function AdminPanel({ user, onLogout }) {
  const [tab, setTab] = useState("pending");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("user_profiles").select("*").order("created_at", { ascending: false });
    setUsers(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  const updateStatus = async (userId, status) => {
    await supabase.from("user_profiles").update({ status, updated_at: new Date().toISOString() }).eq("user_id", userId);
    loadUsers();
  };

  const [pwModal, setPwModal] = useState(null);
  const [newPw, setNewPw] = useState("");
  const [pwLoading, setPwLoading] = useState(false);

  const changePassword = async () => {
    if (!newPw || newPw.length < 6) { alert("পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে"); return; }
    setPwLoading(true);
    // Use Supabase admin API via service role - requires Edge Function
    // Fallback: send reset email
    const { error } = await supabase.auth.resetPasswordForEmail(pwModal.email, {
      redirectTo: "https://easyexcel.vercel.app",
    });
    setPwLoading(false);
    if (error) alert("ব্যর্থ: " + error.message);
    else { alert(pwModal.email + " এ পাসওয়ার্ড রিসেট লিংক পাঠানো হয়েছে।"); setPwModal(null); setNewPw(""); }
  };


  const filtered = users.filter((u) => {
    if (tab === "pending") return u.status === "pending";
    if (tab === "approved") return u.status === "approved";
    if (tab === "all") return true;
    return false;
  });

  const counts = {
    pending: users.filter((u) => u.status === "pending").length,
    approved: users.filter((u) => u.status === "approved").length,
    total: users.length,
  };

  return (
    <>
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <i className="ti ti-file-spreadsheet" />
          <span>Excel App — Admin</span>
        </div>
        <div className="navbar-actions">
          <span style={{ fontSize: 13, color: "var(--gray-500)" }}>
            <i className="ti ti-user" /> {user.email}
          </span>
          <button className="btn btn-outline btn-sm" onClick={() => setActiveTab(null)}>
            <i className="ti ti-layout-dashboard" /> ড্যাশবোর্ড
          </button>
          <button className="btn btn-outline btn-sm" onClick={onLogout}>
            <i className="ti ti-logout" /> লগআউট
          </button>
        </div>
      </nav>

      <div className="admin-layout">
        <aside className="admin-sidebar">
          {[
            ["pending", "ti-clock", "অপেক্ষমান"],
            ["approved", "ti-circle-check", "অনুমোদিত"],
            ["all", "ti-users", "সব ইউজার"],
          ].map(([id, icon, label]) => (
            <button
              key={id}
              className={`sidebar-item ${tab === id ? "active" : ""}`}
              onClick={() => setTab(id)}
            >
              <i className={`ti ${icon}`} />
              <span>{label}</span>
            </button>
          ))}
        </aside>

        <main className="admin-main">
          <div className="page-title">Admin প্যানেল</div>
          <div className="page-sub">ইউজার অনুমোদন ও ম্যানেজ করুন</div>

          <div className="stat-grid">
            {[
              { label: "মোট ইউজার", val: counts.total, icon: "ti-users", bg: "#eff6ff", color: "#2563eb" },
              { label: "অপেক্ষমান", val: counts.pending, icon: "ti-clock", bg: "#fffbeb", color: "#d97706" },
              { label: "অনুমোদিত", val: counts.approved, icon: "ti-circle-check", bg: "#f0fdf4", color: "#16a34a" },
            ].map((s) => (
              <div key={s.label} className="stat-card">
                <div className="stat-icon" style={{ background: s.bg, color: s.color }}>
                  <i className={`ti ${s.icon}`} />
                </div>
                <div className="stat-val">{s.val}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {loading ? (
            <div className="full-center" style={{ minHeight: 200 }}>
              <span className="spinner" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="table-wrap">
              <div className="empty-state">
                <i className="ti ti-users" />
                <p>কোনো ইউজার নেই</p>
              </div>
            </div>
          ) : (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>নাম</th>
                    <th>ইমেইল</th>
                    <th>রেজিস্ট্রেশন</th>
                    <th>স্ট্যাটাস</th>
                    <th>অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => (
                    <tr key={u.user_id}>
                      <td style={{ fontWeight: 500 }}>{u.full_name || "—"}</td>
                      <td>{u.email}</td>
                      <td style={{ fontSize: 13, color: "var(--gray-400)" }}>
                        {new Date(u.created_at).toLocaleDateString("bn-BD")}
                      </td>
                      <td>
                        <span className={`badge badge-${u.status}`}>
                          {u.status === "pending" && "অপেক্ষমান"}
                          {u.status === "approved" && "অনুমোদিত"}
                          {u.status === "rejected" && "বাতিল"}
                          {u.status === "blocked" && "ব্লক"}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 6 }}>
                          {u.status !== "approved" && (
                            <button className="btn btn-success btn-sm" onClick={() => updateStatus(u.user_id, "approved")}>
                              <i className="ti ti-check" /> অনুমোদন
                            </button>
                          )}
                          {u.status !== "rejected" && (
                            <button className="btn btn-danger btn-sm" onClick={() => updateStatus(u.user_id, "rejected")}>
                              <i className="ti ti-x" /> বাতিল
                            </button>
                          )}
                          {u.status !== "blocked" && (
                            <button className="btn btn-sm" style={{background:"#7c3aed",color:"white"}} onClick={() => updateStatus(u.user_id, "blocked")}>
                              <i className="ti ti-ban" /> ব্লক
                            </button>
                          )}
                          {u.status === "blocked" && (
                            <button className="btn btn-success btn-sm" onClick={() => updateStatus(u.user_id, "approved")}>
                              <i className="ti ti-lock-open" /> আনব্লক
                            </button>
                          )}
                          <button className="btn btn-outline btn-sm" onClick={() => { setPwModal({user_id: u.user_id, email: u.email}); setNewPw(""); }}>
                            <i className="ti ti-key" /> পাসওয়ার্ড পরিবর্তন
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>

    {/* Password Change Modal */}
    {pwModal && (
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000}}>
        <div style={{background:"white",borderRadius:12,padding:32,width:360,boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
          <h3 style={{marginBottom:8,fontSize:18,fontWeight:700}}>পাসওয়ার্ড পরিবর্তন</h3>
          <p style={{fontSize:13,color:"#6b7280",marginBottom:20}}>{pwModal.email}</p>
          <input
            type="password"
            placeholder="নতুন পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)"
            value={newPw}
            onChange={e => setNewPw(e.target.value)}
            style={{width:"100%",padding:"10px 12px",border:"1px solid #d1d5db",borderRadius:8,fontSize:14,marginBottom:16,boxSizing:"border-box"}}
          />
          <div style={{display:"flex",gap:8}}>
            <button className="btn btn-primary" style={{flex:1}} onClick={changePassword} disabled={pwLoading}>
              {pwLoading ? "পাঠানো হচ্ছে..." : "রিসেট লিংক পাঠান"}
            </button>
            <button className="btn btn-outline" style={{flex:1}} onClick={() => setPwModal(null)}>বাতিল</button>
          </div>
          <p style={{fontSize:12,color:"#9ca3af",marginTop:12,textAlign:"center"}}>User এর email এ একটি reset link পাঠানো হবে</p>
        </div>
      </div>
    )}
  </>
  );
}

// ─── Excel Tab Store ──────────────────────────────────────────────────────────
function useExcelStore(user, excelId) {
  const [columns, setColumns] = useState([]);
  const [entries, setEntries] = useState([]);
  const [dupCheck, setDupCheck] = useState(false);
  const [primaryCol, setPrimaryCol] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user || !excelId) return;
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      const [cfg, ents] = await Promise.all([
        supabase.from("form_configs").select("*").eq("user_id", user.id).eq("form_id", excelId).single(),
        supabase.from("entries").select("*").eq("user_id", user.id).eq("form_id", excelId).order("serial_no", { ascending: true }),
      ]);
      if (cancelled) return;
      if (cfg.data) {
        setColumns(cfg.data.columns || []);
        setDupCheck(cfg.data.duplicate_check || false);
        setPrimaryCol(cfg.data.primary_column || "");
      } else {
        setColumns([]); setDupCheck(false); setPrimaryCol("");
      }
      setEntries((ents.data || []).map((r) => ({ ...r.data, __serial: r.serial_no, __id: r.id })));
      setLoading(false);
    };
    load();
    return () => { cancelled = true; };
  }, [user, excelId]);

  const saveConfig = useCallback(async (cols, dup, prim) => {
    if (!user) return;
    await supabase.from("form_configs").upsert({
      user_id: user.id, form_id: excelId,
      columns: cols, duplicate_check: dup, primary_column: prim,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id,form_id" });
  }, [user, excelId]);

  const addColumn = useCallback(async (name, type, minDigits, maxDigits) => {
    if (!name.trim()) return { error: "কলামের নাম লিখুন" };
    if (columns.find((c) => c.name === name.trim())) return { error: "এই নামের কলাম আছে" };
    const col = { id: Date.now(), name: name.trim(), type };
    if (type === "number" && (minDigits || maxDigits)) {
      if (minDigits) col.minDigits = parseInt(minDigits);
      if (maxDigits) col.maxDigits = parseInt(maxDigits);
    }
    const newCols = [...columns, col];
    setColumns(newCols);
    await saveConfig(newCols, dupCheck, primaryCol);
    return { ok: true };
  }, [columns, dupCheck, primaryCol, saveConfig]);

  const removeColumn = useCallback(async (id) => {
    const col = columns.find((c) => c.id === id);
    const newCols = columns.filter((c) => c.id !== id);
    const newPrim = col && primaryCol === col.name ? "" : primaryCol;
    setColumns(newCols);
    if (newPrim !== primaryCol) setPrimaryCol(newPrim);
    await saveConfig(newCols, dupCheck, newPrim);
  }, [columns, primaryCol, dupCheck, saveConfig]);

  const updateColumnType = useCallback(async (id, type) => {
    const newCols = columns.map((c) => (c.id === id ? { ...c, type } : c));
    setColumns(newCols);
    await saveConfig(newCols, dupCheck, primaryCol);
  }, [columns, dupCheck, primaryCol, saveConfig]);

  const reorderColumns = useCallback(async (from, to) => {
    const next = [...columns];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setColumns(next);
    await saveConfig(next, dupCheck, primaryCol);
  }, [columns, dupCheck, primaryCol, saveConfig]);

  const handleSetDupCheck = useCallback(async (val) => {
    setDupCheck(val);
    const newPrim = val ? primaryCol : "";
    if (!val) setPrimaryCol("");
    await saveConfig(columns, val, newPrim);
  }, [columns, primaryCol, saveConfig]);

  const handleSetPrimaryCol = useCallback(async (col) => {
    setPrimaryCol(col);
    await saveConfig(columns, dupCheck, col);
  }, [columns, dupCheck, saveConfig]);

  const addEntry = useCallback(async (formValues) => {
    if (dupCheck && primaryCol) {
      const newVal = (formValues[primaryCol] || "").toString().trim().toLowerCase();
      if (newVal && entries.some((e) => (e[primaryCol] || "").toString().trim().toLowerCase() === newVal)) {
        return { duplicate: true, field: primaryCol };
      }
    }
    setSaving(true);
    const serial = entries.length + 1;
    const { data, error } = await supabase.from("entries").insert({
      user_id: user.id, form_id: excelId, serial_no: serial, data: formValues,
    }).select().single();
    if (error) { setSaving(false); return { error: error.message }; }
    setEntries((prev) => [...prev, { ...formValues, __serial: serial, __id: data.id }]);
    setSaving(false);
    return { ok: true, serial };
  }, [entries, dupCheck, primaryCol, user, excelId]);

  const deleteEntry = useCallback(async (idx) => {
    const entry = entries[idx];
    if (!entry?.__id) return;
    await supabase.from("entries").delete().eq("id", entry.__id);
    const next = entries.filter((_, i) => i !== idx);
    await Promise.all(next.map((e, i) =>
      supabase.from("entries").update({ serial_no: i + 1 }).eq("id", e.__id)
    ));
    setEntries(next.map((e, i) => ({ ...e, __serial: i + 1 })));
  }, [entries]);

  const updateEntry = useCallback(async (idx, updatedValues) => {
    const entry = entries[idx];
    if (!entry?.__id) return;
    const { error } = await supabase.from("entries").update({ data: updatedValues }).eq("id", entry.__id);
    if (!error) {
      setEntries((prev) => prev.map((e, i) => i === idx ? { ...e, ...updatedValues } : e));
    }
    return { error };
  }, [entries]);


  const clearAll = useCallback(async () => {
    setColumns([]); setEntries([]); setPrimaryCol(""); setDupCheck(false);
    if (!user) return;
    await supabase.from("entries").delete().eq("user_id", user.id).eq("form_id", excelId);
    await supabase.from("form_configs").delete().eq("user_id", user.id).eq("form_id", excelId);
  }, [user, excelId]);

  const loadTemplate = useCallback(async (tpl) => {
    const templates = {
      student: [
        { id: 1, name: "শিক্ষার্থীর নাম", type: "text" },
        { id: 2, name: "শ্রেণি", type: "text" },
        { id: 3, name: "রোল নম্বর", type: "number" },
        { id: 4, name: "পিতার নাম", type: "text" },
        { id: 5, name: "মোবাইল", type: "text" },
        { id: 6, name: "ছবি", type: "image" },
      ],
      employee: [
        { id: 1, name: "কর্মচারীর নাম", type: "text" },
        { id: 2, name: "পদবি", type: "text" },
        { id: 3, name: "বিভাগ", type: "text" },
        { id: 4, name: "যোগদানের তারিখ", type: "date" },
        { id: 5, name: "বেতন", type: "number" },
        { id: 6, name: "ছবি", type: "image" },
      ],
      product: [
        { id: 1, name: "পণ্যের নাম", type: "text" },
        { id: 2, name: "পণ্য কোড", type: "text" },
        { id: 3, name: "মূল্য", type: "number" },
        { id: 4, name: "পরিমাণ", type: "number" },
        { id: 5, name: "বিবরণ", type: "textarea" },
        { id: 6, name: "ছবি", type: "image" },
      ],
    };
    const cols = templates[tpl] || [];
    setColumns(cols); setEntries([]); setPrimaryCol(""); setDupCheck(false);
    if (!user) return;
    await supabase.from("entries").delete().eq("user_id", user.id).eq("form_id", excelId);
    await saveConfig(cols, false, "");
  }, [user, excelId, saveConfig]);

  return {
    columns, entries, dupCheck, primaryCol, loading, saving,
    addColumn, removeColumn, updateColumnType, reorderColumns,
    setDupCheck: handleSetDupCheck, setPrimaryCol: handleSetPrimaryCol,
    addEntry, deleteEntry, updateEntry, clearAll, loadTemplate,
  };
}

// ─── Step One: Column Setup ───────────────────────────────────────────────────
function StepOne({ store, onNext }) {
  const { columns, addColumn, removeColumn, updateColumnType, reorderColumns, loadTemplate } = store;
  const [name, setName] = useState("");
  const [type, setType] = useState("text");
  const [minDigits, setMinDigits] = useState("");
  const [maxDigits, setMaxDigits] = useState("");
  const [err, setErr] = useState("");
  const [dragIdx, setDragIdx] = useState(null);

  const handleAdd = async () => {
    const res = await addColumn(name, type, minDigits, maxDigits);
    if (res.error) setErr(res.error);
    else { setName(""); setMinDigits(""); setMaxDigits(""); setErr(""); }
  };

  const TYPES = [
    { value: "text", label: "টেক্সট" },
    { value: "number", label: "সংখ্যা" },
    { value: "date", label: "তারিখ" },
    { value: "textarea", label: "বড় টেক্সট" },
    { value: "image", label: "ছবি" },
    { value: "email", label: "ইমেইল" },
    { value: "phone", label: "ফোন নম্বর" },
    { value: "boolean", label: "হ্যাঁ/না" },
  ];
  const typeLabel = (v) => TYPES.find(t => t.value === v)?.label || v;

  return (
    <div>
      <div className="panel">
        <div className="panel-title"><i className="ti ti-layout-columns" /> কলাম সেটআপ</div>
        <p style={{ fontSize: 13, color: "var(--gray-500)", marginBottom: 16 }}>
          আপনার Excel এর কলামগুলো এখানে তৈরি করুন। টেনে এনে ক্রম পরিবর্তন করুন।
        </p>

        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--gray-600)", marginBottom: 8 }}>
          টেমপ্লেট ব্যবহার করুন:
        </p>
        <div className="template-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 16 }}>
          {[
            ["student", "ti-school", "শিক্ষার্থী"],
            ["employee", "ti-briefcase", "কর্মচারী"],
            ["product", "ti-package", "পণ্য"],
          ].map(([key, icon, label]) => (
            <button key={key} className="template-card" onClick={() => loadTemplate(key)}>
              <i className={`ti ${icon}`} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {columns.length === 0 ? (
          <div className="empty-state" style={{ padding: "24px" }}>
            <i className="ti ti-table-plus" />
            <p>এখনো কোনো কলাম নেই। নিচে থেকে যোগ করুন।</p>
          </div>
        ) : (
          <div>
            {columns.map((col, i) => (
              <div
                key={col.id}
                className="col-row"
                draggable
                onDragStart={() => setDragIdx(i)}
                onDragOver={(e) => { e.preventDefault(); }}
                onDrop={() => { if (dragIdx !== null && dragIdx !== i) reorderColumns(dragIdx, i); setDragIdx(null); }}
              >
                <span className="col-drag"><i className="ti ti-grip-vertical" /></span>
                <span className="col-name">{col.name}</span>
                <span style={{fontSize:11,color:"var(--gray-400)",background:"var(--gray-100)",padding:"2px 6px",borderRadius:4,marginRight:4}}>{typeLabel(col.type)}</span>
                {col.type === "number" && (col.minDigits || col.maxDigits) && (
                  <span style={{fontSize:11,color:"var(--blue)",background:"var(--blue-light)",padding:"2px 6px",borderRadius:4,marginRight:4}}>
                    {col.minDigits && col.maxDigits ? `${col.minDigits}-${col.maxDigits} সংখ্যা` : col.minDigits ? `সর্বনিম্ন ${col.minDigits}` : `সর্বোচ্চ ${col.maxDigits}`}
                  </span>
                )}
                <select
                  className="form-input"
                  style={{ width: 110, padding: "4px 8px", fontSize: 12 }}
                  value={col.type}
                  onChange={(e) => updateColumnType(col.id, e.target.value)}
                >
                  {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
                <button className="btn btn-ghost btn-sm" style={{ color: "var(--red)", padding: "4px 8px" }}
                  onClick={() => removeColumn(col.id)}>
                  <i className="ti ti-trash" />
                </button>
              </div>
            ))}
          </div>
        )}

        {err && <div className="alert alert-error" style={{ marginTop: 8 }}><i className="ti ti-alert-circle" />{err}</div>}

        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <div className="add-col-row">
            <input
              className="form-input"
              placeholder="কলামের নাম"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <select className="form-input" style={{ width: 120 }} value={type} onChange={(e) => setType(e.target.value)}>
              {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
            <button className="btn btn-primary" onClick={handleAdd}>
              <i className="ti ti-plus" /> যোগ
            </button>
          </div>
          {type === "number" && (
            <div style={{display:"flex",gap:8,alignItems:"center",padding:"10px 12px",background:"var(--blue-light)",borderRadius:8,border:"1px solid var(--blue-mid)"}}>
              <span style={{fontSize:13,color:"var(--blue)",fontWeight:600,whiteSpace:"nowrap"}}><i className="ti ti-ruler-2" /> সংখ্যার সীমা:</span>
              <input
                className="form-input"
                style={{width:100}}
                type="number"
                placeholder="সর্বনিম্ন সংখ্যা"
                value={minDigits}
                onChange={e => setMinDigits(e.target.value)}
                min={1}
              />
              <span style={{color:"var(--gray-400)"}}>—</span>
              <input
                className="form-input"
                style={{width:100}}
                type="number"
                placeholder="সর্বোচ্চ সংখ্যা"
                value={maxDigits}
                onChange={e => setMaxDigits(e.target.value)}
                min={1}
              />
              <span style={{fontSize:12,color:"var(--gray-500)"}}>(খালি রাখলে কোনো সীমা থাকবে না)</span>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="btn btn-primary" onClick={onNext} disabled={columns.length === 0}>
          পরবর্তী ধাপ <i className="ti ti-arrow-right" />
        </button>
      </div>
    </div>
  );
}

// ─── Step Two: Data Entry ─────────────────────────────────────────────────────
function StepTwo({ store, onBack, onViewData }) {
  const { columns, addEntry, saving, dupCheck, primaryCol, setDupCheck, setPrimaryCol } = store;
  const [formValues, setFormValues] = useState(() => {
    const init = {};
    // auto-fill date columns with today
    return init;
  });
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const init = {};
    columns.forEach(col => {
      if (col.type === "date") init[col.name] = new Date().toISOString().split("T")[0];
    });
    setFormValues(init);
  }, []); // eslint-disable-line

  const handleSubmit = async () => {
    setMsg(null);
    // Validate: all fields required
    for (const col of columns) {
      const val = formValues[col.name];
      if (col.type === "image") continue; // image optional
      if (!val || val.toString().trim() === "") {
        setMsg({ type: "error", text: `"${col.name}" পূরণ করা আবশ্যক!` });
        return;
      }
      // Phone: must be exactly 11 digits
      if (col.type === "phone") {
        const digits = val.toString().replace(/\D/g, "");
        if (digits.length !== 11) {
          setMsg({ type: "error", text: `"${col.name}" অবশ্যই ১১ সংখ্যার হতে হবে!` });
          return;
        }
      }
      // Number: check min/max digit length
      if (col.type === "number" && (col.minDigits || col.maxDigits)) {
        const dlen = val.toString().replace(/[^0-9]/g, "").length;
        if (col.minDigits && dlen < col.minDigits) {
          setMsg({ type: "error", text: `"${col.name}" u09b8u09b0u09cdu09acu09a8u09bfu09aeu09cdu09a8 ${col.minDigits} u09b8u0982u0996u09cdu09afu09beu09b0 u09b9u09a4u09c7 u09b9u09acu09c7!` });
          return;
        }
        if (col.maxDigits && dlen > col.maxDigits) {
          setMsg({ type: "error", text: `"${col.name}" u09b8u09b0u09cdu09acu09cbu099au09cdu099a ${col.maxDigits} u09b8u0982u0996u09cdu09afu09beu09b0 u09b9u09a4u09c7 u09b9u09acu09c7!` });
          return;
        }
      }
    }
    // Format phone as text with leading zero for Excel
    const cleanValues = { ...formValues };
    columns.forEach(col => {
      if (col.type === "phone" && cleanValues[col.name]) {
        cleanValues[col.name] = cleanValues[col.name].toString().replace(/\D/g, "");
      }
    });
    const res = await addEntry(cleanValues);
    if (res.duplicate) {
      setMsg({ type: "error", text: `"${res.field}" তে ডুপ্লিকেট এন্ট্রি!` });
    } else if (res.error) {
      setMsg({ type: "error", text: res.error });
    } else {
      setMsg({ type: "success", text: `এন্ট্রি #${res.serial} সফলভাবে যোগ হয়েছে!` });
      // Reset: keep date fields with today's date
      const reset = {};
      columns.forEach(col => {
        if (col.type === "date") reset[col.name] = new Date().toISOString().split("T")[0];
      });
      setFormValues(reset);
    }
  };

  const toBase64 = (file) =>
    new Promise((res) => {
      const r = new FileReader();
      r.onload = () => res(r.result);
      r.readAsDataURL(file);
    });

  return (
    <div>
      <div className="panel">
        <div className="panel-title"><i className="ti ti-forms" /> ডেটা এন্ট্রি</div>

        {msg && (
          <div className={`alert alert-${msg.type}`}>
            <i className={`ti ${msg.type === "error" ? "ti-alert-circle" : "ti-circle-check"}`} />
            {msg.text}
          </div>
        )}

        <div className="entry-grid">
          {columns.map((col) => (
            <div key={col.id} className="form-group">
              <label className="form-label">{col.name}</label>
              {col.type === "textarea" ? (
                <textarea
                  className="form-input"
                  rows={3}
                  style={{ resize: "vertical" }}
                  placeholder={col.name + " লিখুন"}
                  value={formValues[col.name] || ""}
                  onChange={(e) => setFormValues((f) => ({ ...f, [col.name]: e.target.value }))}
                />
              ) : col.type === "image" ? (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-input"
                    style={{ padding: "6px" }}
                    onChange={async (e) => {
                      if (e.target.files[0]) {
                        const b64 = await toBase64(e.target.files[0]);
                        setFormValues((f) => ({ ...f, [col.name]: b64 }));
                      }
                    }}
                  />
                  {formValues[col.name] && (
                    <img src={formValues[col.name]} alt="" style={{ marginTop: 6, width: 60, height: 60, objectFit: "cover", borderRadius: 6, border: "1px solid var(--gray-200)" }} />
                  )}
                </div>
              ) : col.type === "boolean" ? (
                <select
                  className="form-input"
                  value={formValues[col.name] || ""}
                  onChange={(e) => setFormValues((f) => ({ ...f, [col.name]: e.target.value }))}
                >
                  <option value="">বেছে নিন</option>
                  <option value="হ্যাঁ">হ্যাঁ</option>
                  <option value="না">না</option>
                </select>
              ) : col.type === "phone" ? (
                <div>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="০১XXXXXXXXX (১১ সংখ্যা)"
                    maxLength={11}
                    value={formValues[col.name] || ""}
                    onChange={(e) => {
                      const v = e.target.value.replace(/[^0-9]/g, "").slice(0, 11);
                      setFormValues((f) => ({ ...f, [col.name]: v }));
                    }}
                  />
                  <span style={{fontSize:11,color:(formValues[col.name]||"").length===11?"var(--green)":"var(--gray-400)",marginTop:3,display:"block"}}>
                    {(formValues[col.name]||"").length}/১১ সংখ্যা
                  </span>
                </div>
              ) : col.type === "date" ? (
                <div style={{position:"relative"}}>
                  <input
                    type="date"
                    className="form-input"
                    value={formValues[col.name] || ""}
                    onChange={(e) => setFormValues((f) => ({ ...f, [col.name]: e.target.value }))}
                    style={{paddingRight:36}}
                  />
                  <span style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",color:"var(--gray-400)",pointerEvents:"none",fontSize:16}}>
                    <i className="ti ti-calendar" />
                  </span>
                </div>
              ) : (
                <div>
                  <input
                    type={col.type === "number" ? "number" : col.type === "email" ? "email" : "text"}
                    className="form-input"
                    placeholder={col.name + " লিখুন"}
                    value={formValues[col.name] || ""}
                    onChange={(e) => setFormValues((f) => ({ ...f, [col.name]: e.target.value }))}
                  />
                  {col.type === "number" && (col.minDigits || col.maxDigits) && (
                    <span style={{fontSize:11,color:"var(--gray-400)",marginTop:3,display:"block"}}>
                      {col.minDigits && col.maxDigits
                        ? `${col.minDigits} থেকে ${col.maxDigits} সংখ্যার মধ্যে হতে হবে`
                        : col.minDigits ? `সর্বনিম্ন ${col.minDigits} সংখ্যা`
                        : `সর্বোচ্চ ${col.maxDigits} সংখ্যা`}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16, padding: "12px", background: "var(--gray-50)", borderRadius: "var(--radius)", border: "1px solid var(--gray-200)" }}>
          <input
            type="checkbox"
            id="dupCheck"
            checked={dupCheck}
            onChange={(e) => setDupCheck(e.target.checked)}
            style={{ cursor: "pointer" }}
          />
          <label htmlFor="dupCheck" style={{ fontSize: 13, cursor: "pointer", color: "var(--gray-700)", fontWeight: 500 }}>
            ডুপ্লিকেট চেক করুন
          </label>
          {dupCheck && (
            <select
              className="form-input"
              style={{ width: "auto", fontSize: 13, padding: "4px 8px" }}
              value={primaryCol}
              onChange={(e) => setPrimaryCol(e.target.value)}
            >
              <option value="">কলাম বেছে নিন</option>
              {columns.filter((c) => c.type !== "image").map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          )}
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
            {saving ? <><span className="spinner" style={{ width: 16, height: 16 }} /> সেভ হচ্ছে...</>
              : <><i className="ti ti-plus" /> এন্ট্রি যোগ করুন</>}
          </button>
          <button className="btn btn-outline" onClick={onViewData}>
            <i className="ti ti-table" /> ডেটা দেখুন
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn btn-outline" onClick={onBack}>
          <i className="ti ti-arrow-left" /> পেছনে
        </button>
      </div>
    </div>
  );
}

// ─── Step Three: Data & Download ──────────────────────────────────────────────
function StepThree({ store, tabName, onBack, onAddEntry }) {
  const { columns, entries, deleteEntry, updateEntry, clearAll } = store;
  const [confirmClear, setConfirmClear] = useState(false);
  const [search, setSearch] = useState("");
  const [editModal, setEditModal] = useState(null); // {idx, values}
  const [editValues, setEditValues] = useState({});
  const [editSaving, setEditSaving] = useState(false);
  const [dlModal, setDlModal] = useState(false);
  const [orientation, setOrientation] = useState("portrait");
  const [dlFont, setDlFont] = useState("Arial");
  const [dlFontSize, setDlFontSize] = useState(11);

  const FONTS = ["Arial","Times New Roman","Courier New","Georgia","Verdana","Tahoma","Trebuchet MS"];

  const openEdit = (idx) => {
    setEditValues({ ...entries[idx] });
    setEditModal({ idx });
  };

  const saveEdit = async () => {
    setEditSaving(true);
    await updateEntry(editModal.idx, editValues);
    setEditSaving(false);
    setEditModal(null);
  };

  const toBase64Edit = (file) => new Promise((res) => {
    const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(file);
  });

  const downloadPDF = () => {
    const isLandscape = orientation === "landscape";
    const cols = columns.filter(c => c.type !== "image");
    const html = `<html><head><style>
      @page { size: ${isLandscape ? "A4 landscape" : "A4 portrait"}; margin: 10mm; }
      body { font-family: "${dlFont}", sans-serif; font-size: ${dlFontSize}px; }
      h2 { text-align: center; margin-bottom: 10px; font-size: ${dlFontSize + 4}px; font-family: "${dlFont}"; }
      table { width: 100%; border-collapse: collapse; font-family: "${dlFont}"; }
      th { background: #f8f9fa; color: #1e293b; padding: 7px 6px; text-align: left; border: 1px solid #dee2e6; font-weight: bold; font-size: ${dlFontSize}px; }
      td { padding: 6px; border: 1px solid #dee2e6; font-size: ${dlFontSize}px; }
      tr:nth-child(even) td { background: #f8f9fa; }
    </style></head><body>
    <h2>${tabName || "ডেটা"}</h2>
    <table><thead><tr><th>#</th>${cols.map(c => `<th>${c.name}</th>`).join("")}</tr></thead><tbody>
    ${entries.map((e, i) => `<tr><td>${i+1}</td>${cols.map(c => `<td>${e[c.name] ?? ""}</td>`).join("")}</tr>`).join("")}
    </tbody></table></body></html>`;
    const w = window.open("", "_blank");
    w.document.write(html);
    w.document.close();
    setTimeout(() => { w.print(); }, 400);
  };

  const downloadWord = () => {
    const isLandscape = orientation === "landscape";
    const cols = columns.filter(c => c.type !== "image");
    const orientStr = isLandscape
      ? `<w:pgSz w:w="16838" w:h="11906" w:orient="landscape"/>`
      : `<w:pgSz w:w="11906" w:h="16838"/>`;
    const szVal = dlFontSize * 2;

    const rows = entries.map((e, i) =>
      `<w:tr>${["#", ...cols.map(c => c.name)].map((_, ci) => {
        const val = ci === 0 ? String(i+1) : (e[cols[ci-1]?.name] ?? "");
        return `<w:tc><w:p><w:r><w:rPr><w:rFonts w:ascii="${dlFont}" w:hAnsi="${dlFont}"/><w:sz w:val="${szVal}"/></w:rPr><w:t>${String(val).replace(/&/g,"&amp;").replace(/</g,"&lt;")}</w:t></w:r></w:p></w:tc>`;
      }).join("")}</w:tr>`
    ).join("");

    const headerRow = `<w:tr>${["#", ...cols.map(c=>c.name)].map(h =>
      `<w:tc><w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="F1F5F9"/></w:tcPr><w:p><w:r><w:rPr><w:b/><w:rFonts w:ascii="${dlFont}" w:hAnsi="${dlFont}"/><w:sz w:val="${szVal}"/></w:rPr><w:t>${h}</w:t></w:r></w:p></w:tc>`
    ).join("")}</w:tr>`;

    const xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:body><w:sectPr>${orientStr}<w:pgMar w:top="720" w:right="720" w:bottom="720" w:left="720"/></w:sectPr>
<w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/><w:rFonts w:ascii="${dlFont}" w:hAnsi="${dlFont}"/><w:sz w:val="${szVal+4}"/></w:rPr><w:t>${tabName||"ডেটা"}</w:t></w:r></w:p>
<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/><w:tblBorders>
<w:top w:val="single"/><w:left w:val="single"/><w:bottom w:val="single"/><w:right w:val="single"/><w:insideH w:val="single"/><w:insideV w:val="single"/>
</w:tblBorders></w:tblPr>${headerRow}${rows}</w:tbl>
</w:body></w:document>`;

    const blob = new Blob([xml], {type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${tabName||"data"}.docx`; a.click();
  };

  const filtered = entries.filter((e) =>
    columns.some((c) => (e[c.name] || "").toString().toLowerCase().includes(search.toLowerCase()))
  );

  const downloadExcel = () => {
    const ws_data = [
      ["#", ...columns.map((c) => c.name)],
      ...entries.map((e, i) => [i + 1, ...columns.map((c) => {
        if (c.type === "image") return e[c.name] ? "[ছবি]" : "";
        return e[c.name] ?? "";
      })]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    // Force phone columns to text format to preserve leading zero
    columns.forEach((c, ci) => {
      if (c.type === "phone") {
        entries.forEach((_, ri) => {
          const cellRef = XLSX.utils.encode_cell({ r: ri + 1, c: ci + 1 });
          if (ws[cellRef]) ws[cellRef].t = "s";
        });
      }
    });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, tabName || "Sheet1");
    XLSX.writeFile(wb, `${tabName || "data"}.xlsx`);
  };

  return (
    <div>
      <div className="panel">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
          <div className="panel-title" style={{ margin: 0 }}>
            <i className="ti ti-table" /> ডেটা ({entries.length}টি রেকর্ড)
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <input
              className="form-input"
              style={{ width: 200 }}
              placeholder="খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-success" onClick={downloadExcel} disabled={entries.length === 0}>
              <i className="ti ti-file-excel" /> Excel
            </button>
            <button className="btn btn-outline" onClick={() => setDlModal("pdf")} disabled={entries.length === 0}
              style={{borderColor:"#dc2626",color:"#dc2626"}}>
              <i className="ti ti-file-type-pdf" /> PDF
            </button>
            <button className="btn btn-outline" onClick={() => setDlModal("word")} disabled={entries.length === 0}
              style={{borderColor:"#2563eb",color:"#2563eb"}}>
              <i className="ti ti-file-word" /> Word
            </button>
            <button className="btn btn-outline" onClick={onAddEntry}>
              <i className="ti ti-plus" /> এন্ট্রি যোগ
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => setConfirmClear(true)}>
              <i className="ti ti-trash" />
            </button>
          </div>
        </div>

        {entries.length === 0 ? (
          <div className="empty-state">
            <i className="ti ti-database" />
            <p>কোনো ডেটা নেই। ডেটা এন্ট্রি করুন।</p>
          </div>
        ) : (
          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  {columns.map((c) => <th key={c.id}>{c.name}</th>)}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((entry, idx) => (
                  <tr key={entry.__id || idx}>
                    <td style={{ color: "var(--gray-400)", fontWeight: 600 }}>{entry.__serial}</td>
                    {columns.map((c) => (
                      <td key={c.id}>
                        {c.type === "image" && entry[c.name] ? (
                          <img src={entry[c.name]} alt="" style={{ width: 36, height: 36, objectFit: "cover", borderRadius: 4, border: "1px solid var(--gray-200)" }} />
                        ) : (
                          <span style={{ fontSize: 13 }}>{entry[c.name] ?? "—"}</span>
                        )}
                      </td>
                    ))}
                    <td>
                      <div style={{display:"flex",gap:4}}>
                        <button className="btn btn-ghost btn-sm" style={{ color: "var(--blue)" }}
                          onClick={() => openEdit(entries.indexOf(entry))}>
                          <i className="ti ti-edit" />
                        </button>
                        <button className="btn btn-ghost btn-sm" style={{ color: "var(--red)" }}
                          onClick={() => deleteEntry(entries.indexOf(entry))}>
                          <i className="ti ti-trash" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn btn-outline" onClick={onBack}>
          <i className="ti ti-arrow-left" /> পেছনে
        </button>
      </div>

      {confirmClear && (
        <div className="modal-backdrop" onClick={() => setConfirmClear(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">সব ডেটা মুছবেন?</div>
            <p style={{ fontSize: 14, color: "var(--gray-500)" }}>
              এই Excel এর সব ডেটা ও কলাম স্থায়ীভাবে মুছে যাবে। এই কাজ ফিরিয়ে আনা যাবে না।
            </p>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setConfirmClear(false)}>বাতিল</button>
              <button className="btn btn-danger" onClick={async () => { await clearAll(); setConfirmClear(false); }}>
                হ্যাঁ, মুছে ফেলুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download Modal */}
      {dlModal && (
        <div className="modal-backdrop" onClick={() => setDlModal(false)}>
          <div className="modal" style={{maxWidth:520}} onClick={e => e.stopPropagation()}>
            <div className="modal-title"><i className="ti ti-download" style={{color:"var(--blue)"}} /> ডাউনলোড সেটিংস</div>

            <div className="form-group">
              <label className="form-label">পেজের অভিমুখ</label>
              <div style={{display:"flex",gap:10}}>
                {["portrait","landscape"].map(o => (
                  <label key={o} style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",padding:"10px 16px",border:`2px solid ${orientation===o?"var(--blue)":"var(--gray-200)"}`,borderRadius:10,flex:1,justifyContent:"center",background:orientation===o?"var(--blue-light)":"white",transition:"all .15s"}}>
                    <input type="radio" name="orientation" value={o} checked={orientation===o} onChange={() => setOrientation(o)} style={{display:"none"}} />
                    <i className={`ti ${o==="portrait"?"ti-rectangle-vertical":"ti-rectangle-landscape"}`} style={{fontSize:20,color:orientation===o?"var(--blue)":"var(--gray-400)"}} />
                    <span style={{fontWeight:600,color:orientation===o?"var(--blue)":"var(--gray-600)"}}>{o==="portrait"?"পোর্ট্রেট":"ল্যান্ডস্কেপ"}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{display:"flex",gap:12}}>
              <div className="form-group" style={{flex:2}}>
                <label className="form-label">ফন্ট</label>
                <select className="form-input" value={dlFont} onChange={e => setDlFont(e.target.value)}>
                  {FONTS.map(f => <option key={f.value} value={f.value} style={{fontFamily:f.value}}>{f.label}</option>)}
                </select>
              </div>
              <div className="form-group" style={{flex:1}}>
                <label className="form-label">ফন্ট সাইজ</label>
                <select className="form-input" value={dlFontSize} onChange={e => setDlFontSize(Number(e.target.value))}>
                  {[8,9,10,11,12,13,14,16,18].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div style={{padding:"10px 14px",background:"var(--gray-50)",borderRadius:8,fontSize:13,color:"var(--gray-500)",marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
              <i className="ti ti-info-circle" />
              প্রিভিউ: <span style={{fontFamily:dlFont,fontSize:dlFontSize}}>{tabName} — নমুনা টেক্সট</span>
            </div>

            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setDlModal(false)}>বাতিল</button>
              <button className="btn btn-danger" onClick={() => { downloadPDF(); setDlModal(false); }}>
                <i className="ti ti-file-type-pdf" /> PDF
              </button>
              <button className="btn btn-primary" onClick={() => { downloadWord(); setDlModal(false); }}>
                <i className="ti ti-file-word" /> Word
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="modal-backdrop" onClick={() => setEditModal(null)}>
          <div className="modal" style={{maxWidth:500,width:"90%"}} onClick={e => e.stopPropagation()}>
            <div className="modal-title"><i className="ti ti-edit" /> ডেটা সম্পাদনা</div>
            <div style={{maxHeight:400,overflowY:"auto",marginBottom:16}}>
              {columns.map(col => (
                <div key={col.id} className="form-group" style={{marginBottom:12}}>
                  <label className="form-label">{col.name}</label>
                  {col.type === "boolean" ? (
                    <select className="form-input" value={editValues[col.name]||""} onChange={e => setEditValues(v => ({...v,[col.name]:e.target.value}))}>
                      <option value="">বেছে নিন</option>
                      <option value="হ্যাঁ">হ্যাঁ</option>
                      <option value="না">না</option>
                    </select>
                  ) : col.type === "textarea" ? (
                    <textarea className="form-input" rows={3} value={editValues[col.name]||""} onChange={e => setEditValues(v => ({...v,[col.name]:e.target.value}))} />
                  ) : col.type === "image" ? (
                    <div>
                      <input type="file" accept="image/*" className="form-input" style={{padding:6}} onChange={async e => {
                        if(e.target.files[0]) { const b64 = await toBase64Edit(e.target.files[0]); setEditValues(v => ({...v,[col.name]:b64})); }
                      }} />
                      {editValues[col.name] && <img src={editValues[col.name]} alt="" style={{marginTop:6,width:60,height:60,objectFit:"cover",borderRadius:6}} />}
                    </div>
                  ) : col.type === "phone" ? (
                    <div>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="০১XXXXXXXXX (১১ সংখ্যা)"
                        maxLength={11}
                        value={editValues[col.name]||""}
                        onChange={e => {
                          const v = e.target.value.replace(/[^0-9]/g,"").slice(0,11);
                          setEditValues(prev => ({...prev,[col.name]:v}));
                        }}
                      />
                      <span style={{fontSize:11,color:(editValues[col.name]||"").length===11?"var(--green)":"var(--gray-400)",marginTop:3,display:"block"}}>
                        {(editValues[col.name]||"").length}/১১ সংখ্যা
                      </span>
                    </div>
                  ) : (
                    <input
                      type={col.type==="number"?"number":col.type==="date"?"date":col.type==="email"?"email":"text"}
                      className="form-input"
                      value={editValues[col.name]||""}
                      onChange={e => setEditValues(v => ({...v,[col.name]:e.target.value}))}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setEditModal(null)}>বাতিল</button>
              <button className="btn btn-primary" onClick={saveEdit} disabled={editSaving}>
                {editSaving ? "সংরক্ষণ হচ্ছে..." : <><i className="ti ti-check" /> সংরক্ষণ</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Excel Tab ────────────────────────────────────────────────────────────────
function ExcelTab({ user, excelId, tabName, onBack }) {
  const store = useExcelStore(user, excelId);
  const [step, setStep] = useState(1);

  if (store.loading) {
    return (
      <div className="full-center" style={{ minHeight: 300 }}>
        <span className="spinner" />
        <span style={{ fontSize: 14, color: "var(--gray-400)" }}>লোড হচ্ছে...</span>
      </div>
    );
  }

  return (
    <div className="app-content">
      {/* Back button + title */}
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:24}}>
        <button className="step-back-btn" onClick={onBack} title="ড্যাশবোর্ডে ফিরুন">
          <i className="ti ti-arrow-left" />
        </button>
        <div>
          <div className="step-title">{tabName}</div>
          <div className="step-subtitle">ডেটা এন্ট্রি ফর্ম</div>
        </div>
      </div>

      <div className="stepper">
        {[
          { n: 1, icon: "ti-layout-columns", label: "কলাম সেটআপ" },
          { n: 2, icon: "ti-forms", label: "ডেটা এন্ট্রি" },
          { n: 3, icon: "ti-table", label: "ডেটা ও ডাউনলোড" },
        ].map((s, i, arr) => (
          <span key={s.n} style={{ display: "flex", alignItems: "center", flex: i < arr.length - 1 ? "1" : "0" }}>
            <button
              className={`step-btn ${step === s.n ? "active" : step > s.n ? "done" : ""}`}
              onClick={() => {
                if (s.n < step) setStep(s.n);
                else if (s.n === 2 && store.columns.length > 0) setStep(2);
                else if (s.n === 3 && store.entries.length > 0) setStep(3);
              }}
            >
              <span className="step-icon">
                {step > s.n
                  ? <i className="ti ti-check" />
                  : <i className={`ti ${s.icon}`} />}
              </span>
              {s.label}
            </button>
            {i < arr.length - 1 && (
              <span className={`step-line ${step > s.n ? "done" : ""}`} style={{ flex: 1 }} />
            )}
          </span>
        ))}
      </div>

      {step === 1 && <StepOne store={store} onNext={() => setStep(2)} />}
      {step === 2 && <StepTwo store={store} onBack={() => setStep(1)} onViewData={() => setStep(3)} />}
      {step === 3 && <StepThree store={store} tabName={tabName} onBack={() => setStep(2)} onAddEntry={() => setStep(2)} />}
    </div>
  );
}

// ─── Main App (for approved users) ───────────────────────────────────────────
function MainApp({ user, onLogout }) {
  const [tabs, setTabs] = useState(() => {
    const saved = localStorage.getItem(`excel_tabs_${user.id}`);
    if (saved) {
      try { return JSON.parse(saved); } catch { }
    }
    return [{ id: "default", name: "Excel ১" }];
  });
  const [activeTab, setActiveTab] = useState(null); // null = show dashboard
  const [renamingId, setRenamingId] = useState(null);
  const [renameVal, setRenameVal] = useState("");
  const [newTabModal, setNewTabModal] = useState(false);
  const [newTabName, setNewTabName] = useState("");

  useEffect(() => {
    localStorage.setItem(`excel_tabs_${user.id}`, JSON.stringify(tabs));
  }, [tabs, user.id]);

  const addTab = (name) => {
    const newId = `excel_${Date.now()}`;
    const newName = name || `Excel ${tabs.length + 1}`;
    setTabs((t) => [...t, { id: newId, name: newName }]);
    setActiveTab(newId);
    setNewTabModal(false);
    setNewTabName("");
  };

  const removeTab = (id) => {
    if (tabs.length === 1) return;
    setTabs((t) => t.filter((tab) => tab.id !== id));
    if (activeTab === id) setActiveTab(tabs.find((t) => t.id !== id)?.id || tabs[0].id);
  };

  const startRename = (tab) => {
    setRenamingId(tab.id);
    setRenameVal(tab.name);
  };

  const commitRename = () => {
    if (renameVal.trim()) {
      setTabs((t) => t.map((tab) => tab.id === renamingId ? { ...tab, name: renameVal.trim() } : tab));
    }
    setRenamingId(null);
  };

  const currentTab = tabs.find((t) => t.id === activeTab);

  return (
    <div style={{minHeight:"100vh",background:"#f0f4ff"}}>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-brand" onClick={() => setActiveTab(null)}>
          <i className="ti ti-file-spreadsheet" />
          <span>EasyExcel</span>
        </div>
        <div className="navbar-actions">
          <div className="navbar-user">
            <i className="ti ti-user-circle" style={{fontSize:16}} />
            {user.email}
          </div>
          <button className="btn btn-outline btn-sm" onClick={onLogout}>
            <i className="ti ti-logout" /> লগআউট
          </button>
        </div>
      </nav>

      <div style={{display:"flex"}}>
        {/* SIDEBAR */}
        <aside className="main-sidebar">
          <div className="sidebar-section-title">মেনু</div>
          <button className={`sidebar-item ${!activeTab ? "active" : ""}`} onClick={() => setActiveTab(null)}>
            <i className="ti ti-layout-dashboard" />
            <span>ড্যাশবোর্ড</span>
          </button>
          <button className="sidebar-item" onClick={() => setNewTabModal(true)}>
            <i className="ti ti-file-plus" />
            <span>নতুন Excel তৈরি</span>
          </button>

          <div className="sidebar-section-title" style={{marginTop:8}}>আমার Excel</div>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`sidebar-excel-item ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              title={tab.name}
            >
              <i className="ti ti-table" style={{fontSize:15,flexShrink:0}} />
              <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{tab.name}</span>
            </button>
          ))}
          <button className="sidebar-add-excel" onClick={() => setNewTabModal(true)}>
            <i className="ti ti-plus" />
            <span>নতুন যোগ করুন</span>
          </button>
        </aside>

        {/* MAIN CONTENT */}
        <main className="main-content">
          {activeTab ? (
            <ExcelTab
              key={activeTab}
              user={user}
              excelId={activeTab}
              tabName={currentTab?.name || "data"}
              onBack={() => setActiveTab(null)}
            />
          ) : (
            /* DASHBOARD */
            <div>
              <div className="dashboard-header">
                <h1>স্বাগতম! 👋</h1>
                <p>আপনার Excel ফাইলগুলো এখানে দেখুন। যেকোনো Excel-এ ক্লিক করে ডেটা এন্ট্রি শুরু করুন।</p>
              </div>

              <div className="stat-grid" style={{marginBottom:28}}>
                <div className="stat-card">
                  <div className="stat-value">{tabs.length}</div>
                  <div className="stat-label">মোট Excel</div>
                </div>
              </div>

              <div className="excel-grid">
                {tabs.map(tab => (
                  <div key={tab.id} className="excel-card" onClick={() => setActiveTab(tab.id)}>
                    <div className="excel-card-icon">
                      <i className="ti ti-table" />
                    </div>
                    <div className="excel-card-name">{tab.name}</div>
                    <div className="excel-card-meta">ক্লিক করে ডেটা এন্ট্রি করুন</div>
                  </div>
                ))}
                <div className="excel-card-add" onClick={() => setNewTabModal(true)}>
                  <i className="ti ti-plus" />
                  <span>নতুন Excel তৈরি করুন</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* NEW EXCEL MODAL */}
      {newTabModal && (
        <div className="modal-backdrop" onClick={() => setNewTabModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title">
              <i className="ti ti-file-plus" style={{color:"var(--blue)"}} />
              নতুন Excel তৈরি করুন
            </div>
            <div className="form-group">
              <label className="form-label">Excel-এর নাম দিন</label>
              <input
                className="form-input"
                placeholder="যেমন: ছাত্র তালিকা, কর্মচারী রেজিস্টার..."
                value={newTabName}
                onChange={e => setNewTabName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addTab(newTabName.trim() || `Excel ${tabs.length + 1}`)}
                autoFocus
              />
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => setNewTabModal(false)}>বাতিল</button>
              <button className="btn btn-primary" onClick={() => addTab(newTabName.trim() || `Excel ${tabs.length + 1}`)}>
                <i className="ti ti-plus" /> তৈরি করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [page, setPage] = useState("home"); // home | login | register

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) { setProfile(null); return; }
    setProfileLoading(true);
    supabase.from("user_profiles").select("*").eq("user_id", user.id).single()
      .then(({ data }) => {
        if (data) setProfile(data);
        else {
          // Auto-create profile if missing (e.g. admin)
          const isAdmin = user.email === ADMIN_EMAIL;
          const prof = { user_id: user.id, email: user.email, full_name: user.user_metadata?.full_name || "", status: isAdmin ? "approved" : "pending", created_at: new Date().toISOString() };
          supabase.from("user_profiles").upsert(prof, { onConflict: "user_id" });
          setProfile(prof);
        }
        setProfileLoading(false);
      });
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setPage("home");
  };

  // Loading
  if (authLoading || (user && profileLoading)) {
    return (
      <>
        <style>{css}</style>
        <nav className="navbar">
          <div className="navbar-brand"><i className="ti ti-file-spreadsheet" /><span>Excel ডেটা এন্ট্রি</span></div>
        </nav>
        <div className="full-center"><span className="spinner" /><span style={{ fontSize: 14, color: "var(--gray-400)" }}>লোড হচ্ছে...</span></div>
      </>
    );
  }

  const isAdmin = user && user.email === ADMIN_EMAIL;

  // Admin
  if (user && isAdmin) {
    return (
      <>
        <style>{css}</style>
        <AdminPanel user={user} onLogout={handleLogout} />
      </>
    );
  }

  // Logged in but pending/rejected
  if (user && profile && profile.status !== "approved") {
    return (
      <>
        <style>{css}</style>
        <nav className="navbar">
          <div className="navbar-brand"><i className="ti ti-file-spreadsheet" /><span>Excel ডেটা এন্ট্রি</span></div>
          <div className="navbar-actions">
            <button className="btn btn-outline btn-sm" onClick={handleLogout}><i className="ti ti-logout" /> লগআউট</button>
          </div>
        </nav>
        <div className="pending-notice">
          <div className="pending-card">
            {profile.status === "rejected" ? (
              <>
                <i className="ti ti-x-circle" style={{ color: "var(--red)" }} />
                <h2>অ্যাকাউন্ট বাতিল</h2>
                <p>আপনার অ্যাকাউন্ট Admin কর্তৃক বাতিল করা হয়েছে। বিস্তারিত জানতে Admin এর সাথে যোগাযোগ করুন।</p>
              </>
            ) : profile.status === "blocked" ? (
              <>
                <i className="ti ti-ban" style={{ color: "#7c3aed" }} />
                <h2>অ্যাকাউন্ট ব্লক</h2>
                <p>আপনার অ্যাকাউন্ট Admin কর্তৃক ব্লক করা হয়েছে। বিস্তারিত জানতে Admin এর সাথে যোগাযোগ করুন।</p>
              </>
            ) : (
              <>
                <i className="ti ti-clock" />
                <h2>অনুমোদনের অপেক্ষায়</h2>
                <p>আপনার অ্যাকাউন্ট তৈরি হয়েছে। Admin অনুমোদন দিলে আপনি ব্যবহার করতে পারবেন। কিছুক্ষণ অপেক্ষা করুন।</p>
              </>
            )}
            <button className="btn btn-outline" onClick={handleLogout}><i className="ti ti-logout" /> লগআউট</button>
          </div>
        </div>
      </>
    );
  }

  // Approved user — main app
  if (user && profile && profile.status === "approved") {
    return (
      <>
        <style>{css}</style>
        <MainApp user={user} onLogout={handleLogout} />
      </>
    );
  }

  // Not logged in — home or auth pages
  return (
    <>
      <style>{css}</style>
      <nav className="navbar">
        <div className="navbar-brand" onClick={() => setPage("home")}>
          <i className="ti ti-file-spreadsheet" />
          <span>Excel ডেটা এন্ট্রি</span>
        </div>
        <div className="navbar-actions">
          {page !== "login" && (
            <button className="btn btn-outline btn-sm" onClick={() => setPage("login")}>
              <i className="ti ti-login" /> লগইন
            </button>
          )}
          {page !== "register" && (
            <button className="btn btn-primary btn-sm" onClick={() => setPage("register")}>
              <i className="ti ti-user-plus" /> রেজিস্ট্রেশন
            </button>
          )}
        </div>
      </nav>

      {page === "home" && (
        <HomePage
          onLogin={() => setPage("login")}
          onRegister={() => setPage("register")}
        />
      )}
      {page === "login" && <AuthPage initialMode="login" onBack={() => setPage("home")} />}
      {page === "register" && <AuthPage initialMode="register" onBack={() => setPage("home")} />}
    </>
  );
}
