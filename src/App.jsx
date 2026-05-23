// Excel Data Entry App — Full Featured Version
import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import * as XLSX from "xlsx";

const SUPABASE_URL = "https://xtgfkriudzwpobkfufow.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0Z2Zrcml1ZHp3cG9ia2Z1Zm93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkwOTIxNDYsImV4cCI6MjA5NDY2ODE0Nn0.47l-Z8hrMmd4X2FlVb-hspkNjxuQ7DCt91EskEGvY1A";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const ADMIN_EMAIL = "mahmud716868@gmail.com";

// ─── Toast ─────────────────────────────────────────────────────────────────────
const ToastCtx = React.createContext(null);
const useToast = () => React.useContext(ToastCtx);
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((msg, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);
  const remove = id => setToasts(t => t.filter(x => x.id !== id));
  const icons = { success: "ti-circle-check", error: "ti-alert-circle", info: "ti-info-circle", warning: "ti-alert-triangle" };
  return (
    <ToastCtx.Provider value={add}>
      {children}
      <div style={{ position:"fixed",bottom:24,right:24,zIndex:9999,display:"flex",flexDirection:"column",gap:10,maxWidth:340 }}>
        {toasts.map(t => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            <i className={`ti ${icons[t.type]||icons.info}`} style={{fontSize:18,flexShrink:0}}/>
            <span style={{flex:1,fontSize:14}}>{t.msg}</span>
            <button onClick={()=>remove(t.id)} style={{background:"none",border:"none",cursor:"pointer",color:"inherit",fontSize:16,opacity:.8,padding:0}}><i className="ti ti-x"/></button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

// ─── Dark Mode ─────────────────────────────────────────────────────────────────
function useDarkMode() {
  const [dark, setDark] = useState(() => localStorage.getItem("dm") === "1");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("dm", dark ? "1" : "0");
  }, [dark]);
  return [dark, setDark];
}

function useMounted() {
  const r = useRef(true);
  useEffect(() => () => { r.current = false; }, []);
  return r;
}

// ─── CSS ───────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
  @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --bg:#f8fafc;--surface:#fff;--surface2:#f1f5f9;--border:#e2e8f0;--border2:#cbd5e1;
    --text:#0f172a;--text2:#334155;--text3:#64748b;--text4:#94a3b8;
    --blue:#2563eb;--blue-light:#eff6ff;--blue-mid:#bfdbfe;
    --green:#16a34a;--green-light:#f0fdf4;--red:#dc2626;--red-light:#fef2f2;
    --amber:#d97706;--amber-light:#fffbeb;--purple:#7c3aed;--purple-light:#f5f3ff;
    --r:10px;--rl:16px;--rxl:20px;
    --sh:0 1px 3px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.05);
    --shm:0 4px 6px rgba(0,0,0,.07),0 2px 4px rgba(0,0,0,.05);
    --shl:0 10px 15px rgba(0,0,0,.07),0 4px 6px rgba(0,0,0,.05);
    --shxl:0 20px 40px rgba(0,0,0,.12);
    --tr:all .2s cubic-bezier(.4,0,.2,1);
  }
  [data-theme="dark"]{
    --bg:#0f172a;--surface:#1e293b;--surface2:#273549;--border:#334155;--border2:#475569;
    --text:#f1f5f9;--text2:#cbd5e1;--text3:#94a3b8;--text4:#64748b;
    --blue-light:#1e3a5f;--blue-mid:#1e40af;--green-light:#052e16;--red-light:#450a0a;
    --amber-light:#431407;--purple-light:#2e1065;
    --sh:0 1px 3px rgba(0,0,0,.3);--shm:0 4px 6px rgba(0,0,0,.3);
    --shl:0 10px 15px rgba(0,0,0,.3);--shxl:0 20px 40px rgba(0,0,0,.5);
  }
  body{font-family:'Inter','Noto Sans Bengali',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;line-height:1.6;transition:background .3s,color .3s}

  .navbar{background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:0 24px;height:64px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:200;box-shadow:0 2px 12px rgba(37,99,235,.35)}
  .navbar-brand{display:flex;align-items:center;gap:10px;font-weight:700;font-size:18px;color:white;cursor:pointer;letter-spacing:-.3px}
  .navbar-brand i{font-size:26px;color:#93c5fd}
  .navbar-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap}

  .btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:var(--r);font-size:14px;font-weight:500;cursor:pointer;border:none;transition:var(--tr);font-family:inherit;text-decoration:none}
  .btn:disabled{opacity:.5;cursor:not-allowed}
  .btn-primary{background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;box-shadow:0 2px 8px rgba(37,99,235,.3)}
  .btn-primary:hover:not(:disabled){background:linear-gradient(135deg,#1d4ed8,#1e40af);transform:translateY(-1px);box-shadow:0 4px 12px rgba(37,99,235,.4)}
  .btn-outline{background:var(--surface);color:var(--text2);border:1.5px solid var(--border);box-shadow:var(--sh)}
  .btn-outline:hover:not(:disabled){background:var(--surface2);transform:translateY(-1px)}
  .btn-danger{background:linear-gradient(135deg,#dc2626,#b91c1c);color:#fff;box-shadow:0 2px 8px rgba(220,38,38,.3)}
  .btn-danger:hover:not(:disabled){transform:translateY(-1px)}
  .btn-success{background:linear-gradient(135deg,#16a34a,#15803d);color:#fff;box-shadow:0 2px 8px rgba(22,163,74,.3)}
  .btn-success:hover:not(:disabled){transform:translateY(-1px)}
  .btn-sm{padding:6px 12px;font-size:13px}
  .btn-ghost{background:transparent;color:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.25);padding:7px 14px}
  .btn-ghost:hover{background:rgba(255,255,255,.15);color:#fff}
  .btn-ghost-dark{background:transparent;color:var(--text3);border:none;padding:6px 10px}
  .btn-ghost-dark:hover{background:var(--surface2);color:var(--text)}
  .btn-icon{width:34px;height:34px;padding:0;justify-content:center;border-radius:10px}

  .back-btn{display:inline-flex;align-items:center;gap:8px;padding:8px 16px;border-radius:var(--r);font-size:14px;font-weight:600;cursor:pointer;border:1.5px solid var(--border);background:var(--surface);color:var(--text2);font-family:inherit;transition:var(--tr);box-shadow:var(--sh);margin-bottom:20px}
  .back-btn:hover{background:var(--blue-light);color:var(--blue);border-color:var(--blue-mid)}

  .form-group{margin-bottom:16px}
  .form-label{display:block;font-size:13px;font-weight:600;color:var(--text2);margin-bottom:6px}
  .form-input{width:100%;padding:10px 14px;border:1.5px solid var(--border);border-radius:var(--r);font-size:14px;font-family:inherit;transition:var(--tr);background:var(--surface);color:var(--text)}
  .form-input:focus{outline:none;border-color:var(--blue);box-shadow:0 0 0 3px rgba(37,99,235,.1)}
  .form-input::placeholder{color:var(--text4)}
  select.form-input{cursor:pointer}
  textarea.form-input{resize:vertical}

  .alert{padding:10px 14px;border-radius:var(--r);font-size:13px;margin-bottom:14px;display:flex;align-items:flex-start;gap:8px}
  .alert-error{background:var(--red-light);color:#991b1b;border:1px solid #fca5a5}
  .alert-success{background:var(--green-light);color:#166534;border:1px solid #86efac}
  .alert-warning{background:var(--amber-light);color:#92400e;border:1px solid #fcd34d}
  .alert-info{background:var(--blue-light);color:#1e40af;border:1px solid var(--blue-mid)}

  .toast{display:flex;align-items:center;gap:10px;padding:13px 16px;border-radius:var(--rl);font-weight:500;box-shadow:var(--shxl);animation:slideUp .3s ease;min-width:220px}
  .toast-success{background:#166534;color:#fff}
  .toast-error{background:#991b1b;color:#fff}
  .toast-info{background:#1e40af;color:#fff}
  .toast-warning{background:#92400e;color:#fff}
  @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

  .badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;font-size:12px;font-weight:600}
  .badge-pending{background:var(--amber-light);color:var(--amber)}
  .badge-approved{background:var(--green-light);color:var(--green)}
  .badge-rejected{background:var(--red-light);color:var(--red)}
  .badge-blocked{background:var(--purple-light);color:var(--purple)}

  .panel{background:var(--surface);border:1px solid var(--border);border-radius:var(--rl);padding:24px;box-shadow:var(--sh);margin-bottom:20px}
  .panel-title{font-size:16px;font-weight:700;color:var(--text);margin-bottom:16px;display:flex;align-items:center;gap:8px}
  .panel-title i{color:var(--blue);font-size:18px}

  .table-wrap{background:var(--surface);border:1px solid var(--border);border-radius:var(--rl);overflow:hidden;box-shadow:var(--sh)}
  .data-table-wrap{overflow-x:auto;border-radius:var(--rl);border:1px solid var(--border)}
  .data-table{width:100%;border-collapse:collapse}
  .data-table th{background:var(--surface2);padding:11px 14px;text-align:left;font-size:12px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.5px;border-bottom:2px solid var(--border);cursor:pointer;white-space:nowrap;user-select:none}
  .data-table th:hover{color:var(--blue)}
  .data-table td{padding:11px 14px;font-size:14px;color:var(--text2);border-bottom:1px solid var(--border);background:var(--surface)}
  .data-table tr:last-child td{border-bottom:none}
  .data-table tr:hover td{background:var(--surface2)}
  .data-table .cb{width:38px}

  .skeleton{background:linear-gradient(90deg,var(--surface2) 25%,var(--border) 50%,var(--surface2) 75%);background-size:200% 100%;animation:shimmer 1.4s infinite;border-radius:6px}
  @keyframes shimmer{to{background-position:-200% 0}}

  .modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:500;display:flex;align-items:center;justify-content:center;padding:24px;backdrop-filter:blur(4px);animation:fadeIn .15s ease}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  .modal{background:var(--surface);border-radius:var(--rxl);padding:28px;width:100%;max-width:460px;box-shadow:var(--shxl);animation:popIn .2s ease;border:1px solid var(--border)}
  @keyframes popIn{from{opacity:0;transform:scale(.94) translateY(12px)}to{opacity:1;transform:scale(1) translateY(0)}}
  .modal-title{font-size:18px;font-weight:700;margin-bottom:16px;color:var(--text);display:flex;align-items:center;gap:8px}
  .modal-title i{color:var(--blue)}
  .modal-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:20px;flex-wrap:wrap}

  .app-header-bar{background:var(--surface);border-bottom:1px solid var(--border);padding:0 20px;display:flex;align-items:center;min-height:50px;box-shadow:0 1px 4px rgba(0,0,0,.04)}
  .excel-tabs-bar{display:flex;align-items:center;gap:2px;overflow-x:auto;flex:1;min-width:0;padding:7px 0}
  .excel-tab{display:flex;align-items:center;gap:6px;padding:7px 13px;border-radius:var(--r);font-size:13px;font-weight:500;cursor:pointer;border:1.5px solid transparent;background:none;color:var(--text3);font-family:inherit;white-space:nowrap;transition:var(--tr);max-width:160px}
  .excel-tab .tab-name{overflow:hidden;text-overflow:ellipsis;max-width:100px}
  .excel-tab:hover{background:var(--surface2);color:var(--text2)}
  .excel-tab.active{background:var(--blue-light);color:var(--blue);border-color:var(--blue-mid);font-weight:600}
  .excel-tab .tab-close{opacity:0;width:16px;height:16px;border-radius:4px;display:flex;align-items:center;justify-content:center;background:none;border:none;color:inherit;cursor:pointer;font-size:12px;padding:0;font-family:inherit;transition:opacity .1s}
  .excel-tab:hover .tab-close{opacity:.7}
  .excel-tab .tab-close:hover{opacity:1;background:rgba(0,0,0,.1)}
  .new-tab-btn{width:30px;height:30px;border-radius:8px;background:none;border:1.5px dashed var(--border2);color:var(--text4);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;transition:var(--tr)}
  .new-tab-btn:hover{border-color:var(--blue);color:var(--blue);background:var(--blue-light)}
  .tab-rename-input{border:none;background:transparent;font-size:13px;font-family:inherit;font-weight:600;color:var(--blue);width:100px;outline:none;padding:0}

  .app-layout{min-height:calc(100vh - 114px);background:var(--bg)}
  .dashboard-wrap{padding:30px 24px;max-width:1100px;margin:0 auto}
  .dashboard-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:14px}
  .dashboard-title{font-size:24px;font-weight:800;color:var(--text);letter-spacing:-.5px}
  .dashboard-sub{font-size:13px;color:var(--text3);margin-top:4px}
  .excel-card-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px}
  .excel-card{background:var(--surface);border-radius:var(--rl);border:1.5px solid var(--border);padding:20px;cursor:pointer;transition:var(--tr);box-shadow:var(--sh);position:relative;overflow:hidden}
  .excel-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--blue),#60a5fa);opacity:0;transition:opacity .2s}
  .excel-card:hover{transform:translateY(-4px);box-shadow:var(--shl);border-color:var(--blue-mid)}
  .excel-card:hover::before{opacity:1}
  .excel-card-icon{width:48px;height:48px;border-radius:13px;background:linear-gradient(135deg,var(--blue-light),#dbeafe);display:flex;align-items:center;justify-content:center;margin-bottom:12px;font-size:22px;color:var(--blue)}
  .excel-card-name{font-weight:700;font-size:15px;color:var(--text);margin-bottom:6px}
  .excel-card-meta{font-size:12px;color:var(--text4);display:flex;align-items:center;gap:6px;flex-wrap:wrap}
  .excel-card-badge{background:var(--blue-light);color:var(--blue);font-size:11px;font-weight:600;padding:2px 8px;border-radius:20px;display:inline-flex;align-items:center;gap:3px}
  .excel-new-card{background:linear-gradient(135deg,var(--blue-light),#dbeafe);border-radius:var(--rl);border:2px dashed #93c5fd;padding:20px;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:138px;transition:var(--tr);gap:8px}
  .excel-new-card:hover{background:#dbeafe;border-color:var(--blue);transform:translateY(-3px)}
  .excel-new-card i{font-size:28px;color:var(--blue)}
  .excel-new-card span{font-weight:700;color:var(--blue);font-size:14px}

  .stepper{display:flex;align-items:center;margin-bottom:22px;background:var(--surface);border:1px solid var(--border);border-radius:var(--rl);padding:14px 20px;box-shadow:var(--sh)}
  .step-btn{display:flex;align-items:center;gap:8px;padding:7px 12px;border-radius:var(--r);background:none;border:none;cursor:pointer;font-size:14px;font-weight:500;color:var(--text4);font-family:inherit;transition:var(--tr)}
  .step-btn.done{color:var(--green);cursor:pointer}
  .step-btn.active{color:var(--blue);background:var(--blue-light)}
  .step-btn .step-icon{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;background:var(--surface2);color:var(--text4);flex-shrink:0}
  .step-btn.done .step-icon{background:var(--green-light);color:var(--green)}
  .step-btn.active .step-icon{background:var(--blue);color:#fff}
  .step-line{flex:1;height:1px;background:var(--border);margin:0 4px}
  .step-line.done{background:var(--green)}

  .col-row{display:flex;align-items:center;gap:8px;padding:10px 14px;border:1.5px solid var(--border);border-radius:var(--r);margin-bottom:8px;background:var(--surface2);transition:var(--tr)}
  .col-row:hover{border-color:var(--border2);background:var(--surface)}
  .col-drag{cursor:grab;color:var(--text4);font-size:16px}
  .add-col-row{display:flex;gap:8px;margin-top:12px}
  .add-col-row .form-input{flex:1}
  .entry-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px}

  .auth-page{min-height:calc(100vh - 64px);display:flex;align-items:center;justify-content:center;padding:24px;background:var(--bg)}
  .auth-card{background:var(--surface);border-radius:var(--rxl);border:1px solid var(--border);padding:36px;width:100%;max-width:430px;box-shadow:var(--shxl)}
  .auth-logo{text-align:center;margin-bottom:24px}
  .auth-logo i{font-size:46px;color:var(--blue)}
  .auth-logo h2{font-size:21px;font-weight:800;margin-top:8px;color:var(--text)}
  .auth-logo p{font-size:13px;color:var(--text3);margin-top:3px}
  .auth-tabs{display:flex;border-bottom:1px solid var(--border);margin-bottom:22px}
  .auth-tab{flex:1;padding:10px;background:none;border:none;border-bottom:2px solid transparent;font-size:14px;font-weight:500;color:var(--text3);cursor:pointer;transition:var(--tr);font-family:inherit;margin-bottom:-1px}
  .auth-tab.active{color:var(--blue);border-bottom-color:var(--blue)}

  .admin-layout{display:flex;min-height:calc(100vh - 64px)}
  .admin-sidebar{width:220px;background:var(--surface);border-right:1px solid var(--border);padding:14px 10px;flex-shrink:0}
  .sidebar-item{display:flex;align-items:center;gap:10px;padding:10px 14px;font-size:14px;font-weight:500;color:var(--text3);cursor:pointer;border:none;background:none;width:100%;text-align:left;font-family:inherit;transition:var(--tr);border-radius:var(--r);margin-bottom:2px}
  .sidebar-item:hover{background:var(--surface2);color:var(--text)}
  .sidebar-item.active{background:var(--blue-light);color:var(--blue);font-weight:600}
  .admin-main{flex:1;padding:26px;overflow-y:auto;background:var(--bg)}
  .page-title{font-size:22px;font-weight:800;color:var(--text);margin-bottom:4px}
  .page-sub{font-size:14px;color:var(--text3);margin-bottom:22px}
  .stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;margin-bottom:24px}
  .stat-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--rl);padding:18px;box-shadow:var(--sh)}
  .stat-val{font-size:28px;font-weight:800;color:var(--text)}
  .stat-label{font-size:13px;color:var(--text3);margin-top:4px}
  .stat-icon{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;margin-bottom:10px}

  .empty-state{text-align:center;padding:56px 24px;color:var(--text4)}
  .empty-state i{font-size:52px;margin-bottom:14px;display:block;opacity:.35}
  .empty-state p{font-size:14px;color:var(--text3)}
  .spinner{display:inline-block;width:22px;height:22px;border:2.5px solid var(--border);border-top-color:var(--blue);border-radius:50%;animation:spin .6s linear infinite}
  @keyframes spin{to{transform:rotate(360deg)}}
  .full-center{min-height:calc(100vh - 64px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;color:var(--text3)}
  .pending-notice{min-height:calc(100vh - 64px);display:flex;align-items:center;justify-content:center;padding:24px}
  .pending-card{background:var(--surface);border-radius:var(--rxl);border:1px solid var(--border);padding:44px 36px;max-width:450px;text-align:center;box-shadow:var(--shxl)}
  .pending-card i{font-size:50px;color:var(--amber);margin-bottom:16px;display:block}
  .pending-card h2{font-size:21px;font-weight:800;margin-bottom:8px;color:var(--text)}
  .pending-card p{font-size:14px;color:var(--text3);margin-bottom:22px;line-height:1.7}

  .template-card{border:1.5px solid var(--border);border-radius:var(--r);padding:13px;cursor:pointer;text-align:center;transition:var(--tr);background:none;font-family:inherit;color:var(--text2)}
  .template-card:hover{border-color:var(--blue);background:var(--blue-light);color:var(--blue);transform:translateY(-2px)}
  .template-card i{font-size:22px;display:block;margin-bottom:5px}
  .template-card span{font-size:13px;font-weight:500}
  .app-content{padding:24px;max-width:1100px;margin:0 auto}

  .dl-section-title{font-size:13px;font-weight:700;color:var(--text3);margin-bottom:8px;display:flex;align-items:center;gap:5px}
  .dl-opt-card{display:flex;align-items:center;gap:8px;cursor:pointer;padding:11px 14px;border:2px solid var(--border);border-radius:var(--r);flex:1;justify-content:center;transition:var(--tr)}
  .dl-opt-card.selected{border-color:var(--blue);background:var(--blue-light)}
  .dl-opt-card i{font-size:20px;color:var(--text4)}
  .dl-opt-card.selected i{color:var(--blue)}
  .dl-opt-card span{font-weight:600;font-size:14px;color:var(--text3)}
  .dl-opt-card.selected span{color:var(--blue)}

  .hero{background:linear-gradient(135deg,#1e40af,#2563eb 50%,#3b82f6);color:#fff;padding:80px 24px;text-align:center}
  .hero h1{font-size:clamp(26px,5vw,50px);font-weight:800;margin-bottom:14px;line-height:1.2}
  .hero p{font-size:17px;opacity:.88;max-width:600px;margin:0 auto 32px}
  .hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
  .btn-white{background:#fff;color:var(--blue);font-weight:700;padding:12px 26px;font-size:15px}
  .btn-white:hover{background:var(--blue-light);transform:translateY(-2px)}
  .btn-outline-white{background:transparent;color:#fff;border:2px solid rgba(255,255,255,.6);padding:12px 26px;font-size:15px;font-weight:600}
  .btn-outline-white:hover{background:rgba(255,255,255,.1)}
  .features{padding:64px 24px;max-width:1100px;margin:0 auto}
  .section-title{text-align:center;font-size:28px;font-weight:800;color:var(--text);margin-bottom:8px}
  .section-sub{text-align:center;color:var(--text3);margin-bottom:42px;font-size:15px}
  .features-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:22px}
  .feature-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--rl);padding:26px;box-shadow:var(--sh);transition:var(--tr)}
  .feature-card:hover{transform:translateY(-3px);box-shadow:var(--shm)}
  .feature-icon{width:50px;height:50px;border-radius:13px;background:var(--blue-light);color:var(--blue);display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:14px}
  .feature-card h3{font-size:15px;font-weight:700;margin-bottom:7px;color:var(--text)}
  .feature-card p{font-size:13px;color:var(--text3);line-height:1.7}
  .cta-section{background:linear-gradient(135deg,#0f172a,#1e3a5f);color:#fff;text-align:center;padding:64px 24px}
  .cta-section h2{font-size:30px;font-weight:800;margin-bottom:10px}
  .cta-section p{color:rgba(255,255,255,.7);margin-bottom:28px;font-size:15px}
  .steps-section{padding:64px 24px;max-width:860px;margin:0 auto}
  .steps-list{display:flex;flex-direction:column}
  .step-item{display:flex;gap:18px;padding:18px 0;position:relative}
  .step-item:not(:last-child)::after{content:'';position:absolute;left:19px;top:50px;width:2px;height:calc(100% - 32px);background:var(--border)}
  .step-num{width:40px;height:40px;border-radius:50%;background:var(--blue);color:#fff;font-weight:700;font-size:15px;display:flex;align-items:center;justify-content:center;flex-shrink:0;z-index:1}
  .step-content h4{font-size:15px;font-weight:700;margin-bottom:3px;color:var(--text)}
  .step-content p{font-size:13px;color:var(--text3)}

  .stats-bar{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:14px}
  .stat-pill{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:5px 13px;font-size:12px;font-weight:600;color:var(--text3);display:flex;align-items:center;gap:5px}
  .stat-pill i{color:var(--blue)}

  .bulk-bar{display:flex;align-items:center;gap:10px;background:var(--blue-light);border:1.5px solid var(--blue-mid);border-radius:var(--r);padding:9px 14px;margin-bottom:10px;flex-wrap:wrap}
  .bulk-count{font-size:14px;font-weight:700;color:var(--blue);flex:1}

  .search-wrap{position:relative}
  .search-wrap i{position:absolute;left:11px;top:50%;transform:translateY(-50%);color:var(--text4);font-size:16px;pointer-events:none}
  .search-wrap .form-input{padding-left:34px}

  .import-drop{border:2px dashed var(--border2);border-radius:var(--rl);padding:26px;text-align:center;cursor:pointer;transition:var(--tr);color:var(--text3)}
  .import-drop:hover,.import-drop.drag-over{border-color:var(--blue);background:var(--blue-light);color:var(--blue)}
  .import-drop i{font-size:30px;display:block;margin-bottom:8px}

  .demo-section{background:var(--surface2);padding:64px 24px}
  .demo-wrap{max-width:780px;margin:0 auto}
  .demo-screen{background:var(--surface);border-radius:var(--rl);border:1px solid var(--border);box-shadow:var(--shl);overflow:hidden}
  .demo-topbar{background:#1e293b;padding:10px 16px;display:flex;align-items:center;gap:8px}
  .demo-dot{width:12px;height:12px;border-radius:50%}
  .demo-body{padding:22px;min-height:260px}
  .demo-step{display:none;animation:fadeSlide .5s ease}
  .demo-step.active{display:block}
  @keyframes fadeSlide{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
  .demo-col-row{display:flex;gap:8px;margin-bottom:8px;align-items:center}
  .demo-col-pill{background:var(--blue-light);color:var(--blue);border-radius:20px;padding:3px 11px;font-size:13px;font-weight:500}
  .demo-form-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}
  .demo-field label{display:block;font-size:12px;color:var(--text3);margin-bottom:3px;font-weight:500}
  .demo-field-box{border:1px solid var(--border);border-radius:7px;padding:7px 11px;font-size:13px;color:var(--text2);background:var(--surface2)}
  .demo-table{width:100%;border-collapse:collapse;font-size:13px}
  .demo-table th{background:var(--surface2);padding:7px 11px;text-align:left;font-weight:700;color:var(--text3);border-bottom:1px solid var(--border)}
  .demo-table td{padding:7px 11px;border-bottom:1px solid var(--border);color:var(--text2)}
  .demo-progress{display:flex;justify-content:center;gap:8px;margin-top:18px}
  .demo-dot-nav{width:8px;height:8px;border-radius:50%;background:var(--border2);cursor:pointer;border:none;transition:background .2s}
  .demo-dot-nav.active{background:var(--blue)}
  .demo-step-label{font-size:12px;font-weight:700;color:var(--blue);text-transform:uppercase;letter-spacing:.5px;margin-bottom:11px}

  kbd{background:var(--surface2);border:1px solid var(--border2);border-radius:5px;padding:2px 6px;font-size:11px;font-family:monospace;color:var(--text3)}

  @media(max-width:640px){
    .admin-sidebar{width:50px}
    .sidebar-item span{display:none}
    .stat-grid{grid-template-columns:1fr 1fr}
    .hero h1{font-size:24px}
    .excel-card-grid{grid-template-columns:1fr 1fr}
    .app-content{padding:14px}
    .dashboard-wrap{padding:18px 14px}
  }
`;

// ─── Demo + HomePage ───────────────────────────────────────────────────────────
function DemoAnimation() {
  const [slide, setSlide] = useState(0);
  const slides = [
    { label:"ধাপ ১ — কলাম সেটআপ", content:(
      <div>
        <p style={{fontSize:13,color:"var(--text3)",marginBottom:10}}>প্রয়োজনীয় কলামগুলো তৈরি করুন</p>
        {[["শিক্ষার্থীর নাম","text"],["শ্রেণি","text"],["রোল নম্বর","number"],["ছবি","image"]].map(([n,t],i)=>(
          <div key={i} className="demo-col-row"><span className="demo-col-pill">{n}</span><span style={{fontSize:11,color:"var(--text4)"}}>— {t}</span></div>
        ))}
      </div>
    )},
    { label:"ধাপ ২ — ডেটা এন্ট্রি", content:(
      <div>
        <p style={{fontSize:13,color:"var(--text3)",marginBottom:10}}>ফর্মে ডেটা পূরণ করুন</p>
        <div className="demo-form-row">
          {[["শিক্ষার্থীর নাম","রাহেলা বেগম"],["শ্রেণি","দশম"],["রোল","১২৩৪"],["পিতার নাম","করিম"]].map(([l,v])=>(
            <div key={l} className="demo-field"><label>{l}</label><div className="demo-field-box">{v}</div></div>
          ))}
        </div>
        <button className="btn btn-primary btn-sm"><i className="ti ti-plus"/> এন্ট্রি যোগ করুন</button>
      </div>
    )},
    { label:"ধাপ ৩ — ডেটা ও ডাউনলোড", content:(
      <div>
        <p style={{fontSize:13,color:"var(--text3)",marginBottom:10}}>ডেটা দেখুন এবং ডাউনলোড করুন</p>
        <table className="demo-table"><thead><tr><th>#</th><th>নাম</th><th>শ্রেণি</th><th>রোল</th></tr></thead>
          <tbody>{[["১","রাহেলা","দশম","১২৩৪"],["২","করিম","নবম","৫৬৭৮"],["৩","সুমি","দশম","৯১০১"]].map(r=><tr key={r[0]}>{r.map((c,i)=><td key={i}>{c}</td>)}</tr>)}</tbody>
        </table>
        <button className="btn btn-success btn-sm" style={{marginTop:10}}><i className="ti ti-file-excel"/> Excel ডাউনলোড</button>
      </div>
    )},
  ];
  useEffect(()=>{const t=setInterval(()=>setSlide(s=>(s+1)%slides.length),3500);return()=>clearInterval(t);},[]);// eslint-disable-line
  return (
    <div className="demo-section">
      <div className="demo-wrap">
        <h2 className="section-title">কীভাবে কাজ করে</h2>
        <p className="section-sub">মাত্র তিনটি ধাপে Excel ডেটা এন্ট্রি করুন</p>
        <div className="demo-screen">
          <div className="demo-topbar">
            {["#ef4444","#f59e0b","#22c55e"].map(c=><div key={c} className="demo-dot" style={{background:c}}/>)}
            <span style={{marginLeft:12,fontSize:12,color:"#9ca3af"}}>Excel Data Entry App</span>
          </div>
          <div className="demo-body">
            <div className="demo-step-label">{slides[slide].label}</div>
            <div key={slide} className="demo-step active">{slides[slide].content}</div>
          </div>
        </div>
        <div className="demo-progress">
          {slides.map((_,i)=><button key={i} className={`demo-dot-nav ${i===slide?"active":""}`} onClick={()=>setSlide(i)}/>)}
        </div>
      </div>
    </div>
  );
}

function HomePage({ onLogin, onRegister }) {
  const features = [
    {icon:"ti-columns",title:"কাস্টম কলাম",desc:"টেক্সট, নম্বর, তারিখ, ছবি — প্রয়োজন অনুযায়ী কলাম তৈরি করুন।"},
    {icon:"ti-files",title:"একাধিক Excel",desc:"একসাথে অনেক Excel ফাইল তৈরি ও ম্যানেজ করুন।"},
    {icon:"ti-cloud",title:"ক্লাউড সিঙ্ক",desc:"যেকোনো ডিভাইস থেকে একই ডেটা অ্যাক্সেস করুন।"},
    {icon:"ti-sort-ascending",title:"Sort & Filter",desc:"যেকোনো কলাম দিয়ে ডেটা সাজান ও ফিল্টার করুন।"},
    {icon:"ti-file-excel",title:"Excel / PDF / Word",desc:"এক ক্লিকে বিভিন্ন ফরম্যাটে ডাউনলোড করুন।"},
    {icon:"ti-shield-check",title:"Admin অ্যাপ্রুভাল",desc:"Admin অনুমোদনের পরেই ব্যবহারকারী অ্যাক্সেস পাবে।"},
  ];
  return (
    <div>
      <div className="hero">
        <h1>📊 Excel ডেটা এন্ট্রি অ্যাপ</h1>
        <p>যেকোনো জায়গা থেকে সহজে ডেটা এন্ট্রি করুন এবং Excel, PDF বা Word ফরম্যাটে ডাউনলোড করুন।</p>
        <div className="hero-btns">
          <button className="btn btn-white" onClick={onRegister}><i className="ti ti-user-plus"/> বিনামূল্যে শুরু করুন</button>
          <button className="btn btn-outline-white" onClick={onLogin}><i className="ti ti-login"/> লগইন করুন</button>
        </div>
      </div>
      <div className="features">
        <h2 className="section-title">কেন এই অ্যাপ ব্যবহার করবেন?</h2>
        <p className="section-sub">সহজ, দ্রুত এবং নিরাপদ ডেটা ম্যানেজমেন্ট</p>
        <div className="features-grid">
          {features.map(f=><div key={f.icon} className="feature-card"><div className="feature-icon"><i className={`ti ${f.icon}`}/></div><h3>{f.title}</h3><p>{f.desc}</p></div>)}
        </div>
      </div>
      <DemoAnimation/>
      <div className="steps-section">
        <h2 className="section-title">কীভাবে শুরু করবেন</h2>
        <p className="section-sub">চারটি সহজ ধাপ অনুসরণ করুন</p>
        <div className="steps-list">
          {[{n:"১",title:"রেজিস্ট্রেশন করুন",desc:"নাম, ইমেইল ও পাসওয়ার্ড দিয়ে অ্যাকাউন্ট তৈরি করুন।"},
            {n:"২",title:"Admin অনুমোদনের অপেক্ষা করুন",desc:"Admin আপনার অ্যাকাউন্ট যাচাই করে অনুমোদন দেবে।"},
            {n:"৩",title:"লগইন করুন",desc:"অনুমোদন পেলে লগইন করুন।"},
            {n:"৪",title:"Excel তৈরি করুন",desc:"কলাম সেটআপ, ডেটা এন্ট্রি এবং ডাউনলোড করুন।"}].map(s=>(
            <div key={s.n} className="step-item"><div className="step-num">{s.n}</div><div className="step-content"><h4>{s.title}</h4><p>{s.desc}</p></div></div>
          ))}
        </div>
      </div>
      <div className="cta-section">
        <h2>এখনই শুরু করুন</h2>
        <p>বিনামূল্যে অ্যাকাউন্ট তৈরি করুন এবং ডেটা এন্ট্রি শুরু করুন।</p>
        <button className="btn btn-white" onClick={onRegister}><i className="ti ti-rocket"/> রেজিস্ট্রেশন করুন</button>
      </div>
    </div>
  );
}

// ─── AuthPage ──────────────────────────────────────────────────────────────────
function AuthPage({ initialMode="login", onBack }) {
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({name:"",email:"",password:"",confirm:""});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const mounted = useMounted();
  const set = k => e => setForm(f=>({...f,[k]:e.target.value}));

  const handleSubmit = async () => {
    setError(""); setSuccess("");
    if (!form.email||!form.password) { setError("ইমেইল ও পাসওয়ার্ড দিন"); return; }
    if (mode==="register") {
      if (!form.name.trim()) { setError("নাম দিন"); return; }
      if (form.password!==form.confirm) { setError("পাসওয়ার্ড মিলছে না"); return; }
      if (form.password.length<6) { setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে"); return; }
    }
    setLoading(true);
    if (mode==="login") {
      const {error:err} = await supabase.auth.signInWithPassword({email:form.email,password:form.password});
      if (!mounted.current) return;
      if (err) { setError("লগইন ব্যর্থ: "+err.message); setLoading(false); }
    } else if (mode==="register") {
      const {data,error:err} = await supabase.auth.signUp({email:form.email,password:form.password,options:{data:{full_name:form.name}}});
      if (!mounted.current) return;
      if (err) { setError("রেজিস্ট্রেশন ব্যর্থ: "+err.message); setLoading(false); return; }
      if (data.user) await supabase.from("user_profiles").upsert({user_id:data.user.id,email:form.email,full_name:form.name,status:"pending",created_at:new Date().toISOString()},{onConflict:"user_id"});
      setSuccess("রেজিস্ট্রেশন সফল! Admin অনুমোদনের পর লগইন করতে পারবেন।");
      setLoading(false);
    } else {
      const {error:err} = await supabase.auth.resetPasswordForEmail(form.email,{redirectTo:"https://easyexcel.vercel.app"});
      if (!mounted.current) return;
      if (err) setError(err.message); else setSuccess("পাসওয়ার্ড রিসেট লিংক ইমেইলে পাঠানো হয়েছে।");
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        {onBack&&<button className="btn btn-ghost-dark btn-sm" style={{marginBottom:12}} onClick={onBack}><i className="ti ti-arrow-left"/> হোমে ফিরুন</button>}
        <div className="auth-logo"><i className="ti ti-file-spreadsheet"/><h2>Excel ডেটা এন্ট্রি অ্যাপ</h2><p>যেকোনো জায়গা থেকে ডেটা এন্ট্রি করুন</p></div>
        <div className="auth-tabs">
          {[["login","লগইন"],["register","নতুন অ্যাকাউন্ট"]].map(([m,label])=>(
            <button key={m} className={`auth-tab ${mode===m?"active":""}`} onClick={()=>{setMode(m);setError("");setSuccess("");}}>{label}</button>
          ))}
        </div>
        {error&&<div className="alert alert-error"><i className="ti ti-alert-circle"/>{error}</div>}
        {success&&<div className="alert alert-success"><i className="ti ti-circle-check"/>{success}</div>}
        {mode!=="forgot"&&(
          <>
            {mode==="register"&&<div className="form-group"><label className="form-label">পূর্ণ নাম</label><input className="form-input" placeholder="আপনার নাম" value={form.name} onChange={set("name")}/></div>}
            <div className="form-group"><label className="form-label">ইমেইল</label><input className="form-input" type="email" placeholder="আপনার ইমেইল" value={form.email} onChange={set("email")} onKeyDown={e=>e.key==="Enter"&&handleSubmit()}/></div>
            <div className="form-group"><label className="form-label">পাসওয়ার্ড</label><input className="form-input" type="password" placeholder="পাসওয়ার্ড" value={form.password} onChange={set("password")} onKeyDown={e=>e.key==="Enter"&&handleSubmit()}/></div>
            {mode==="register"&&<div className="form-group"><label className="form-label">পাসওয়ার্ড নিশ্চিত করুন</label><input className="form-input" type="password" placeholder="আবার পাসওয়ার্ড দিন" value={form.confirm} onChange={set("confirm")} onKeyDown={e=>e.key==="Enter"&&handleSubmit()}/></div>}
            <button className="btn btn-primary" style={{width:"100%"}} onClick={handleSubmit} disabled={loading}>
              {loading?<><span className="spinner" style={{width:16,height:16}}/> অপেক্ষা করুন...</>:mode==="login"?<><i className="ti ti-login"/> লগইন করুন</>:<><i className="ti ti-user-plus"/> অ্যাকাউন্ট তৈরি করুন</>}
            </button>
            {mode==="login"&&<button className="btn btn-ghost-dark" style={{width:"100%",marginTop:8}} onClick={()=>{setMode("forgot");setError("");setSuccess("");}}>পাসওয়ার্ড ভুলে গেছেন?</button>}
          </>
        )}
        {mode==="forgot"&&(
          <>
            <div className="form-group"><label className="form-label">ইমেইল</label><input className="form-input" type="email" placeholder="আপনার ইমেইল" value={form.email} onChange={set("email")} autoFocus/></div>
            <button className="btn btn-primary" style={{width:"100%"}} onClick={handleSubmit} disabled={loading}>{loading?"পাঠানো হচ্ছে...":"রিসেট লিংক পাঠান"}</button>
            <button className="btn btn-ghost-dark" style={{width:"100%",marginTop:8}} onClick={()=>{setMode("login");setError("");setSuccess("");}}><i className="ti ti-arrow-left"/> লগইনে ফিরুন</button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── AdminPanel ────────────────────────────────────────────────────────────────
function AdminPanel({ user, onLogout }) {
  const [tab, setTab] = useState("pending");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pwModal, setPwModal] = useState(null);
  const [newPw, setNewPw] = useState("");
  const [pwLoading, setPwLoading] = useState(false);
  const toast = useToast();

  const loadUsers = useCallback(async () => {
    setLoading(true);
    const {data} = await supabase.from("user_profiles").select("*").order("created_at",{ascending:false});
    setUsers(data||[]); setLoading(false);
  }, []);
  useEffect(()=>{loadUsers();},[loadUsers]);

  const updateStatus = async (userId, status) => {
    await supabase.from("user_profiles").update({status,updated_at:new Date().toISOString()}).eq("user_id",userId);
    toast(`স্ট্যাটাস আপডেট: ${status==="approved"?"অনুমোদিত":status==="rejected"?"বাতিল":"ব্লক"}`,"success");
    loadUsers();
  };

  const filtered = users.filter(u=>tab==="pending"?u.status==="pending":tab==="approved"?u.status==="approved":true);
  const counts = {pending:users.filter(u=>u.status==="pending").length,approved:users.filter(u=>u.status==="approved").length,total:users.length};

  return (
    <>
    <div>
      <nav className="navbar">
        <div className="navbar-brand"><i className="ti ti-file-spreadsheet"/><span>Excel App — Admin</span></div>
        <div className="navbar-actions">
          <span style={{fontSize:13,color:"rgba(255,255,255,.75)",display:"flex",alignItems:"center",gap:4}}><i className="ti ti-user-circle" style={{fontSize:16}}/>{user.email.split("@")[0]}</span>
          <button className="btn btn-ghost btn-sm" onClick={onLogout}><i className="ti ti-logout"/> লগআউট</button>
        </div>
      </nav>
      <div className="admin-layout">
        <aside className="admin-sidebar">
          {[["pending","ti-clock","অপেক্ষমান"],["approved","ti-circle-check","অনুমোদিত"],["all","ti-users","সব ইউজার"]].map(([id,icon,label])=>(
            <button key={id} className={`sidebar-item ${tab===id?"active":""}`} onClick={()=>setTab(id)}>
              <i className={`ti ${icon}`}/><span>{label}</span>
              {id==="pending"&&counts.pending>0&&<span style={{marginLeft:"auto",background:"var(--red)",color:"#fff",borderRadius:20,fontSize:11,fontWeight:700,padding:"1px 7px"}}>{counts.pending}</span>}
            </button>
          ))}
        </aside>
        <main className="admin-main">
          <div className="page-title">Admin প্যানেল</div>
          <div className="page-sub">ইউজার অনুমোদন ও ম্যানেজ করুন</div>
          <div className="stat-grid">
            {[{label:"মোট ইউজার",val:counts.total,icon:"ti-users",bg:"var(--blue-light)",color:"var(--blue)"},
              {label:"অপেক্ষমান",val:counts.pending,icon:"ti-clock",bg:"var(--amber-light)",color:"var(--amber)"},
              {label:"অনুমোদিত",val:counts.approved,icon:"ti-circle-check",bg:"var(--green-light)",color:"var(--green)"}].map(s=>(
              <div key={s.label} className="stat-card"><div className="stat-icon" style={{background:s.bg,color:s.color}}><i className={`ti ${s.icon}`}/></div><div className="stat-val">{s.val}</div><div className="stat-label">{s.label}</div></div>
            ))}
          </div>
          {loading ? <div className="full-center" style={{minHeight:200}}><span className="spinner"/></div>
          : filtered.length===0 ? <div className="table-wrap"><div className="empty-state"><i className="ti ti-users"/><p>কোনো ইউজার নেই</p></div></div>
          : <div className="table-wrap"><table className="data-table">
              <thead><tr><th>নাম</th><th>ইমেইল</th><th>তারিখ</th><th>স্ট্যাটাস</th><th>অ্যাকশন</th></tr></thead>
              <tbody>{filtered.map(u=>(
                <tr key={u.user_id}>
                  <td style={{fontWeight:600}}>{u.full_name||"—"}</td>
                  <td style={{fontSize:13}}>{u.email}</td>
                  <td style={{fontSize:13,color:"var(--text4)"}}>{new Date(u.created_at).toLocaleDateString("bn-BD")}</td>
                  <td><span className={`badge badge-${u.status}`}>{u.status==="pending"?"অপেক্ষমান":u.status==="approved"?"অনুমোদিত":u.status==="rejected"?"বাতিল":"ব্লক"}</span></td>
                  <td><div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                    {u.status!=="approved"&&<button className="btn btn-success btn-sm" onClick={()=>updateStatus(u.user_id,"approved")}><i className="ti ti-check"/> অনুমোদন</button>}
                    {u.status!=="rejected"&&<button className="btn btn-danger btn-sm" onClick={()=>updateStatus(u.user_id,"rejected")}><i className="ti ti-x"/> বাতিল</button>}
                    {u.status!=="blocked"?<button className="btn btn-sm" style={{background:"var(--purple)",color:"#fff"}} onClick={()=>updateStatus(u.user_id,"blocked")}><i className="ti ti-ban"/> ব্লক</button>
                    :<button className="btn btn-success btn-sm" onClick={()=>updateStatus(u.user_id,"approved")}><i className="ti ti-lock-open"/> আনব্লক</button>}
                    <button className="btn btn-outline btn-sm" onClick={()=>{setPwModal({user_id:u.user_id,email:u.email});setNewPw("");}}><i className="ti ti-key"/> পাসওয়ার্ড</button>
                  </div></td>
                </tr>
              ))}</tbody>
            </table></div>}
        </main>
      </div>
    </div>
    {pwModal&&<div className="modal-backdrop" onClick={()=>setPwModal(null)}><div className="modal" onClick={e=>e.stopPropagation()}>
      <div className="modal-title"><i className="ti ti-key"/> পাসওয়ার্ড রিসেট</div>
      <p style={{fontSize:13,color:"var(--text3)",marginBottom:14}}>{pwModal.email} এ পাসওয়ার্ড রিসেট লিংক পাঠানো হবে।</p>
      <div className="form-group"><label className="form-label">নতুন পাসওয়ার্ড (রেফারেন্স)</label><input className="form-input" type="password" placeholder="কমপক্ষে ৬ অক্ষর" value={newPw} onChange={e=>setNewPw(e.target.value)} autoFocus/></div>
      <div className="modal-actions">
        <button className="btn btn-outline" onClick={()=>setPwModal(null)}>বাতিল</button>
        <button className="btn btn-primary" disabled={pwLoading} onClick={async()=>{
          if (!newPw||newPw.length<6){toast("কমপক্ষে ৬ অক্ষর","error");return;}
          setPwLoading(true);
          const {error} = await supabase.auth.resetPasswordForEmail(pwModal.email,{redirectTo:"https://easyexcel.vercel.app"});
          setPwLoading(false);
          if(error)toast("ব্যর্থ: "+error.message,"error");
          else{toast("রিসেট লিংক পাঠানো হয়েছে","success");setPwModal(null);setNewPw("");}
        }}>{pwLoading?"পাঠানো হচ্ছে...":"রিসেট লিংক পাঠান"}</button>
      </div>
    </div></div>}
    </>
  );
}

// ─── Excel Store ───────────────────────────────────────────────────────────────
function useExcelStore(user, excelId) {
  const [columns, setColumns] = useState([]);
  const [entries, setEntries] = useState([]);
  const [dupCheck, setDupCheckState] = useState(false);
  const [primaryCol, setPrimaryColState] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const mounted = useMounted();

  const saveConfig = useCallback(async (cols, dup, prim) => {
    if (!user) return;
    await supabase.from("excel_configs").upsert({user_id:user.id,form_id:excelId,columns:cols,dup_check:dup,primary_col:prim,updated_at:new Date().toISOString()},{onConflict:"user_id,form_id"});
  }, [user, excelId]);

  useEffect(()=>{
    if (!user){setLoading(false);return;}
    (async()=>{
      setLoading(true);
      const [cfgRes,entRes] = await Promise.all([
        supabase.from("excel_configs").select("*").eq("user_id",user.id).eq("form_id",excelId).single(),
        supabase.from("entries").select("*").eq("user_id",user.id).eq("form_id",excelId).order("serial",{ascending:true}),
      ]);
      if (!mounted.current) return;
      if (cfgRes.data){setColumns(cfgRes.data.columns||[]);setDupCheckState(cfgRes.data.dup_check||false);setPrimaryColState(cfgRes.data.primary_col||"");}
      if (entRes.data) setEntries(entRes.data.map(e=>({...e.data,__id:e.id,__serial:e.serial})));
      setLoading(false);
    })();
  },[user,excelId,mounted]);

  const addColumn = useCallback(async(name,type,minD,maxD)=>{
    if (!name.trim()) return {error:"কলামের নাম দিন"};
    if (columns.find(c=>c.name===name.trim())) return {error:"এই নামে কলাম আছে"};
    const newCols=[...columns,{id:Date.now(),name:name.trim(),type,minDigits:minD||"",maxDigits:maxD||""}];
    setColumns(newCols); await saveConfig(newCols,dupCheck,primaryCol); return {};
  },[columns,dupCheck,primaryCol,saveConfig]);

  const removeColumn = useCallback(async(id)=>{
    const newCols=columns.filter(c=>c.id!==id);
    setColumns(newCols); await saveConfig(newCols,dupCheck,primaryCol);
  },[columns,dupCheck,primaryCol,saveConfig]);

  const updateColumnType = useCallback(async(id,type)=>{
    const newCols=columns.map(c=>c.id===id?{...c,type}:c);
    setColumns(newCols); await saveConfig(newCols,dupCheck,primaryCol);
  },[columns,dupCheck,primaryCol,saveConfig]);

  const reorderColumns = useCallback(async(from,to)=>{
    const arr=[...columns];const[item]=arr.splice(from,1);arr.splice(to,0,item);
    setColumns(arr); await saveConfig(arr,dupCheck,primaryCol);
  },[columns,dupCheck,primaryCol,saveConfig]);

  const setDupCheck = useCallback(async(v)=>{setDupCheckState(v);await saveConfig(columns,v,primaryCol);},[columns,primaryCol,saveConfig]);
  const setPrimaryCol = useCallback(async(v)=>{setPrimaryColState(v);await saveConfig(columns,dupCheck,v);},[columns,dupCheck,saveConfig]);

  const addEntry = useCallback(async(values)=>{
    if (!user) return {error:"লগইন করুন"};
    if (dupCheck&&primaryCol) {
      const dup=entries.find(e=>String(e[primaryCol]||"").toLowerCase()===String(values[primaryCol]||"").toLowerCase());
      if (dup) return {duplicate:true,field:primaryCol};
    }
    setSaving(true);
    const serial=(entries.length>0?Math.max(...entries.map(e=>e.__serial||0)):0)+1;
    const {data,error}=await supabase.from("entries").insert({user_id:user.id,form_id:excelId,serial,data:values}).select().single();
    if (!mounted.current) return {};
    setSaving(false);
    if (error) return {error:error.message};
    setEntries(prev=>[...prev,{...values,__id:data.id,__serial:serial}]);
    return {serial};
  },[user,excelId,entries,dupCheck,primaryCol,mounted]);

  const deleteEntry = useCallback(async(idx)=>{
    const e=entries[idx];
    await supabase.from("entries").delete().eq("id",e.__id);
    setEntries(prev=>prev.filter((_,i)=>i!==idx));
  },[entries]);

  const deleteEntries = useCallback(async(ids)=>{
    await supabase.from("entries").delete().in("id",ids);
    setEntries(prev=>prev.filter(e=>!ids.includes(e.__id)));
  },[]);

  const updateEntry = useCallback(async(idx,values)=>{
    const e=entries[idx];
    const clean={...values};delete clean.__id;delete clean.__serial;
    await supabase.from("entries").update({data:clean}).eq("id",e.__id);
    setEntries(prev=>prev.map((en,i)=>i===idx?{...clean,__id:en.__id,__serial:en.__serial}:en));
  },[entries]);

  const clearAll = useCallback(async()=>{
    if (!user) return;
    await Promise.all([
      supabase.from("entries").delete().eq("user_id",user.id).eq("form_id",excelId),
      supabase.from("excel_configs").delete().eq("user_id",user.id).eq("form_id",excelId),
    ]);
    setColumns([]);setEntries([]);setDupCheckState(false);setPrimaryColState("");
  },[user,excelId]);

  const loadTemplate = useCallback(async(tpl)=>{
    const T={
      student:[{id:1,name:"শিক্ষার্থীর নাম",type:"text"},{id:2,name:"শ্রেণি",type:"text"},{id:3,name:"রোল নম্বর",type:"number"},{id:4,name:"পিতার নাম",type:"text"},{id:5,name:"মোবাইল",type:"phone"},{id:6,name:"ছবি",type:"image"}],
      employee:[{id:1,name:"কর্মচারীর নাম",type:"text"},{id:2,name:"পদবি",type:"text"},{id:3,name:"বিভাগ",type:"text"},{id:4,name:"যোগদানের তারিখ",type:"date"},{id:5,name:"বেতন",type:"number"},{id:6,name:"ছবি",type:"image"}],
      product:[{id:1,name:"পণ্যের নাম",type:"text"},{id:2,name:"পণ্য কোড",type:"text"},{id:3,name:"মূল্য",type:"number"},{id:4,name:"পরিমাণ",type:"number"},{id:5,name:"বিবরণ",type:"textarea"},{id:6,name:"ছবি",type:"image"}],
    };
    const cols=T[tpl]||[];
    setColumns(cols);setEntries([]);setPrimaryColState("");setDupCheckState(false);
    if (user) {
      await supabase.from("entries").delete().eq("user_id",user.id).eq("form_id",excelId);
      await saveConfig(cols,false,"");
    }
  },[user,excelId,saveConfig]);

  const importEntries = useCallback(async(rows)=>{
    if (!user||!rows.length) return 0;
    setSaving(true);
    let serial=(entries.length>0?Math.max(...entries.map(e=>e.__serial||0)):0);
    const added=[];
    for (const row of rows) {
      serial++;
      const {data}=await supabase.from("entries").insert({user_id:user.id,form_id:excelId,serial,data:row}).select().single();
      if (data) added.push({...row,__id:data.id,__serial:serial});
    }
    setEntries(prev=>[...prev,...added]);
    setSaving(false);
    return added.length;
  },[user,excelId,entries]);

  return {columns,entries,dupCheck,primaryCol,loading,saving,addColumn,removeColumn,updateColumnType,reorderColumns,setDupCheck,setPrimaryCol,addEntry,deleteEntry,deleteEntries,updateEntry,clearAll,loadTemplate,importEntries};
}

// ─── StepOne ───────────────────────────────────────────────────────────────────
function StepOne({ store, onNext }) {
  const {columns,addColumn,removeColumn,updateColumnType,reorderColumns,loadTemplate}=store;
  const [name,setName]=useState(""); const [type,setType]=useState("text");
  const [minD,setMinD]=useState(""); const [maxD,setMaxD]=useState("");
  const [err,setErr]=useState(""); const [dragIdx,setDragIdx]=useState(null);
  const TYPES=[{value:"text",label:"টেক্সট"},{value:"number",label:"সংখ্যা"},{value:"date",label:"তারিখ"},{value:"textarea",label:"বড় টেক্সট"},{value:"image",label:"ছবি"},{value:"email",label:"ইমেইল"},{value:"phone",label:"ফোন নম্বর"},{value:"boolean",label:"হ্যাঁ/না"}];
  const tLabel=v=>TYPES.find(t=>t.value===v)?.label||v;
  const handleAdd=async()=>{
    const res=await addColumn(name,type,minD,maxD);
    if(res.error)setErr(res.error);else{setName("");setMinD("");setMaxD("");setErr("");}
  };
  return (
    <div>
      <div className="panel">
        <div className="panel-title"><i className="ti ti-layout-columns"/> কলাম সেটআপ</div>
        <p style={{fontSize:13,color:"var(--text3)",marginBottom:14}}>প্রয়োজনীয় কলামগুলো তৈরি করুন। টেনে এনে ক্রম পরিবর্তন করতে পারবেন।</p>
        <p style={{fontSize:13,fontWeight:700,color:"var(--text3)",marginBottom:8}}>টেমপ্লেট ব্যবহার করুন:</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:18}}>
          {[["student","ti-school","শিক্ষার্থী"],["employee","ti-briefcase","কর্মচারী"],["product","ti-package","পণ্য"]].map(([k,ic,lb])=>(
            <button key={k} className="template-card" onClick={()=>loadTemplate(k)}><i className={`ti ${ic}`}/><span>{lb}</span></button>
          ))}
        </div>
        {columns.length===0?<div className="empty-state" style={{padding:22}}><i className="ti ti-table-plus"/><p>এখনো কোনো কলাম নেই। নিচে থেকে যোগ করুন।</p></div>
        :<div>{columns.map((col,i)=>(
          <div key={col.id} className="col-row" draggable onDragStart={()=>setDragIdx(i)} onDragOver={e=>e.preventDefault()} onDrop={()=>{if(dragIdx!==null&&dragIdx!==i)reorderColumns(dragIdx,i);setDragIdx(null);}}>
            <span className="col-drag"><i className="ti ti-grip-vertical"/></span>
            <span style={{flex:1,fontSize:14,fontWeight:500,color:"var(--text2)"}}>{col.name}</span>
            <span style={{fontSize:11,color:"var(--text4)",background:"var(--surface2)",padding:"2px 7px",borderRadius:5,marginRight:4}}>{tLabel(col.type)}</span>
            {col.type==="number"&&(col.minDigits||col.maxDigits)&&<span style={{fontSize:11,color:"var(--blue)",background:"var(--blue-light)",padding:"2px 7px",borderRadius:5,marginRight:4}}>{col.minDigits&&col.maxDigits?`${col.minDigits}-${col.maxDigits}`:col.minDigits?`≥${col.minDigits}`:`≤${col.maxDigits}`}</span>}
            <select className="form-input" style={{width:110,padding:"4px 8px",fontSize:12}} value={col.type} onChange={e=>updateColumnType(col.id,e.target.value)}>{TYPES.map(t=><option key={t.value} value={t.value}>{t.label}</option>)}</select>
            <button className="btn btn-ghost-dark btn-sm" style={{color:"var(--red)",padding:"4px 8px"}} onClick={()=>removeColumn(col.id)}><i className="ti ti-trash"/></button>
          </div>
        ))}</div>}
        {err&&<div className="alert alert-error" style={{marginTop:8}}><i className="ti ti-alert-circle"/>{err}</div>}
        <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:12}}>
          <div className="add-col-row">
            <input className="form-input" placeholder="কলামের নাম" value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleAdd()}/>
            <select className="form-input" style={{width:130}} value={type} onChange={e=>setType(e.target.value)}>{TYPES.map(t=><option key={t.value} value={t.value}>{t.label}</option>)}</select>
            <button className="btn btn-primary" onClick={handleAdd}><i className="ti ti-plus"/> যোগ</button>
          </div>
          {type==="number"&&<div style={{display:"flex",gap:8,alignItems:"center",padding:"10px 12px",background:"var(--blue-light)",borderRadius:8,border:"1px solid var(--blue-mid)"}}>
            <span style={{fontSize:13,color:"var(--blue)",fontWeight:700,whiteSpace:"nowrap"}}><i className="ti ti-ruler-2"/> সংখ্যার সীমা:</span>
            <input className="form-input" style={{width:90}} type="number" placeholder="সর্বনিম্ন" value={minD} onChange={e=>setMinD(e.target.value)} min={1}/>
            <span style={{color:"var(--text4)"}}>—</span>
            <input className="form-input" style={{width:90}} type="number" placeholder="সর্বোচ্চ" value={maxD} onChange={e=>setMaxD(e.target.value)} min={1}/>
          </div>}
        </div>
      </div>
      <div style={{display:"flex",justifyContent:"flex-end"}}>
        <button className="btn btn-primary" onClick={onNext} disabled={columns.length===0}>পরবর্তী ধাপ <i className="ti ti-arrow-right"/></button>
      </div>
    </div>
  );
}

// ─── StepTwo ───────────────────────────────────────────────────────────────────
function StepTwo({ store, onBack, onViewData }) {
  const {columns,addEntry,saving,dupCheck,primaryCol,setDupCheck,setPrimaryCol}=store;
  const [vals,setVals]=useState({});
  const [msg,setMsg]=useState(null);
  const toast=useToast();

  useEffect(()=>{
    const init={};
    columns.forEach(c=>{if(c.type==="date")init[c.name]=new Date().toISOString().split("T")[0];});
    setVals(init);
  },[]); // eslint-disable-line

  useEffect(()=>{
    const h=e=>{if((e.ctrlKey||e.metaKey)&&e.key==="Enter")handleSubmit();};
    window.addEventListener("keydown",h);
    return ()=>window.removeEventListener("keydown",h);
  },[vals]); // eslint-disable-line

  const toBase64=f=>new Promise(r=>{const rd=new FileReader();rd.onload=()=>r(rd.result);rd.readAsDataURL(f);});

  const handleSubmit=async()=>{
    setMsg(null);
    for (const col of columns) {
      const v=vals[col.name];
      if(col.type==="image")continue;
      if(!v||v.toString().trim()===""){setMsg({type:"error",text:`"${col.name}" পূরণ করা আবশ্যক!`});return;}
      if(col.type==="phone"){const d=v.toString().replace(/\D/g,"");if(d.length!==11){setMsg({type:"error",text:`"${col.name}" অবশ্যই ১১ সংখ্যার হতে হবে!`});return;}}
      if(col.type==="number"&&(col.minDigits||col.maxDigits)){
        const dl=v.toString().replace(/[^0-9]/g,"").length;
        if(col.minDigits&&dl<col.minDigits){setMsg({type:"error",text:`"${col.name}" সর্বনিম্ন ${col.minDigits} সংখ্যার হতে হবে!`});return;}
        if(col.maxDigits&&dl>col.maxDigits){setMsg({type:"error",text:`"${col.name}" সর্বোচ্চ ${col.maxDigits} সংখ্যার হতে হবে!`});return;}
      }
    }
    const clean={...vals};
    columns.forEach(c=>{if(c.type==="phone"&&clean[c.name])clean[c.name]=clean[c.name].toString().replace(/\D/g,"");});
    const res=await addEntry(clean);
    if(res.duplicate){setMsg({type:"error",text:`"${res.field}" তে ডুপ্লিকেট এন্ট্রি!`});}
    else if(res.error){setMsg({type:"error",text:res.error});}
    else{
      toast(`✓ এন্ট্রি #${res.serial} সফলভাবে যোগ হয়েছে!`,"success");
      setMsg({type:"success",text:`এন্ট্রি #${res.serial} সফলভাবে যোগ হয়েছে!`});
      const reset={};
      columns.forEach(c=>{if(c.type==="date")reset[c.name]=new Date().toISOString().split("T")[0];});
      setVals(reset);
    }
  };

  return (
    <div>
      <div className="panel">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:8}}>
          <div className="panel-title" style={{margin:0}}><i className="ti ti-forms"/> ডেটা এন্ট্রি</div>
          <span style={{fontSize:12,color:"var(--text4)"}}><kbd>Ctrl</kbd> + <kbd>Enter</kbd> — এন্ট্রি যোগ করুন</span>
        </div>
        {msg&&<div className={`alert alert-${msg.type}`}><i className={`ti ${msg.type==="error"?"ti-alert-circle":"ti-circle-check"}`}/>{msg.text}</div>}
        <div className="entry-grid">
          {columns.map(col=>(
            <div key={col.id} className="form-group">
              <label className="form-label">{col.name}</label>
              {col.type==="textarea"?<textarea className="form-input" rows={3} placeholder={col.name+" লিখুন"} value={vals[col.name]||""} onChange={e=>setVals(f=>({...f,[col.name]:e.target.value}))}/>
              :col.type==="image"?<div>
                  <input type="file" accept="image/*" className="form-input" style={{padding:6}} onChange={async e=>{if(e.target.files[0]){const b=await toBase64(e.target.files[0]);setVals(f=>({...f,[col.name]:b}));}}}/>
                  {vals[col.name]&&<img src={vals[col.name]} alt="" style={{marginTop:5,width:56,height:56,objectFit:"cover",borderRadius:8,border:"1px solid var(--border)"}}/>}
                </div>
              :col.type==="boolean"?<select className="form-input" value={vals[col.name]||""} onChange={e=>setVals(f=>({...f,[col.name]:e.target.value}))}><option value="">বেছে নিন</option><option value="হ্যাঁ">হ্যাঁ</option><option value="না">না</option></select>
              :col.type==="phone"?<div>
                  <input type="tel" className="form-input" placeholder="০১XXXXXXXXX (১১ সংখ্যা)" maxLength={11} value={vals[col.name]||""} onChange={e=>{const v=e.target.value.replace(/[^0-9]/g,"").slice(0,11);setVals(f=>({...f,[col.name]:v}));}}/>
                  <span style={{fontSize:11,color:(vals[col.name]||"").length===11?"var(--green)":"var(--text4)",marginTop:3,display:"block"}}>{(vals[col.name]||"").length}/১১</span>
                </div>
              :col.type==="date"?<div style={{position:"relative"}}><input type="date" className="form-input" value={vals[col.name]||""} onChange={e=>setVals(f=>({...f,[col.name]:e.target.value}))}/></div>
              :<div>
                  <input type={col.type==="number"?"number":col.type==="email"?"email":"text"} className="form-input" placeholder={col.name+" লিখুন"} value={vals[col.name]||""} onChange={e=>setVals(f=>({...f,[col.name]:e.target.value}))}/>
                  {col.type==="number"&&(col.minDigits||col.maxDigits)&&<span style={{fontSize:11,color:"var(--text4)",marginTop:3,display:"block"}}>{col.minDigits&&col.maxDigits?`${col.minDigits}–${col.maxDigits} সংখ্যা`:col.minDigits?`সর্বনিম্ন ${col.minDigits}`:`সর্বোচ্চ ${col.maxDigits}`}</span>}
                </div>}
            </div>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginTop:14,padding:12,background:"var(--surface2)",borderRadius:"var(--r)",border:"1px solid var(--border)"}}>
          <input type="checkbox" id="dupChk" checked={dupCheck} onChange={e=>setDupCheck(e.target.checked)} style={{cursor:"pointer"}}/>
          <label htmlFor="dupChk" style={{fontSize:13,cursor:"pointer",color:"var(--text2)",fontWeight:500}}>ডুপ্লিকেট চেক করুন</label>
          {dupCheck&&<select className="form-input" style={{width:"auto",fontSize:13,padding:"4px 8px"}} value={primaryCol} onChange={e=>setPrimaryCol(e.target.value)}><option value="">কলাম বেছে নিন</option>{columns.filter(c=>c.type!=="image").map(c=><option key={c.id} value={c.name}>{c.name}</option>)}</select>}
        </div>
        <div style={{display:"flex",gap:10,marginTop:14}}>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={saving}>{saving?<><span className="spinner" style={{width:16,height:16}}/> সেভ হচ্ছে...</>:<><i className="ti ti-plus"/> এন্ট্রি যোগ করুন</>}</button>
          <button className="btn btn-outline" onClick={onViewData}><i className="ti ti-table"/> ডেটা দেখুন</button>
        </div>
      </div>
      <button className="back-btn" onClick={onBack}><i className="ti ti-arrow-left"/> পেছনে</button>
    </div>
  );
}

// ─── StepThree ─────────────────────────────────────────────────────────────────
function StepThree({ store, tabName, onBack, onAddEntry }) {
  const {columns,entries,deleteEntry,deleteEntries,updateEntry,clearAll,importEntries,saving}=store;
  const [confirmClear,setConfirmClear]=useState(false);
  const [search,setSearch]=useState("");
  const [sortCol,setSortCol]=useState("");
  const [sortDir,setSortDir]=useState("asc");
  const [editModal,setEditModal]=useState(null);
  const [editVals,setEditVals]=useState({});
  const [editSaving,setEditSaving]=useState(false);
  const [dlModal,setDlModal]=useState(false);
  const [orientation,setOrientation]=useState("portrait");
  const [fontFamily,setFontFamily]=useState("Arial, sans-serif");
  const [fontSize,setFontSize]=useState("11");
  const [selectedIds,setSelectedIds]=useState(new Set());
  const [importModal,setImportModal]=useState(false);
  const [importDrag,setImportDrag]=useState(false);
  const [importRows,setImportRows]=useState(null);
  const [importLoading,setImportLoading]=useState(false);
  const toast=useToast();

  const FONTS=[
    {value:"Arial, sans-serif",label:"Arial"},
    {value:"'Times New Roman', serif",label:"Times New Roman"},
    {value:"Georgia, serif",label:"Georgia"},
    {value:"'Noto Sans Bengali', sans-serif",label:"Noto Sans Bengali"},
    {value:"Verdana, sans-serif",label:"Verdana"},
    {value:"'Courier New', monospace",label:"Courier New"},
  ];
  const FSIZES=["8","9","10","11","12","13","14","16","18","20"];

  const filtered=useMemo(()=>{
    let arr=entries.filter(e=>!search||columns.some(c=>(e[c.name]||"").toString().toLowerCase().includes(search.toLowerCase())));
    if(sortCol)arr=[...arr].sort((a,b)=>{
      const va=String(a[sortCol]||"").toLowerCase(),vb=String(b[sortCol]||"").toLowerCase();
      return sortDir==="asc"?va.localeCompare(vb,undefined,{numeric:true}):vb.localeCompare(va,undefined,{numeric:true});
    });
    return arr;
  },[entries,columns,search,sortCol,sortDir]);

  const handleSort=col=>{if(sortCol===col)setSortDir(d=>d==="asc"?"desc":"asc");else{setSortCol(col);setSortDir("asc");}};

  const numStats=useMemo(()=>columns.filter(c=>c.type==="number").map(c=>{
    const vs=entries.map(e=>parseFloat(e[c.name])).filter(v=>!isNaN(v));
    if(!vs.length)return null;
    return {name:c.name,sum:vs.reduce((a,b)=>a+b,0).toFixed(2),avg:(vs.reduce((a,b)=>a+b,0)/vs.length).toFixed(2)};
  }).filter(Boolean),[entries,columns]);

  const allSelected=filtered.length>0&&filtered.every(e=>selectedIds.has(e.__id));
  const toggleAll=()=>{if(allSelected)setSelectedIds(new Set());else setSelectedIds(new Set(filtered.map(e=>e.__id)));};
  const toggleOne=id=>setSelectedIds(prev=>{const s=new Set(prev);s.has(id)?s.delete(id):s.add(id);return s;});

  const bulkDelete=async()=>{
    if(!selectedIds.size)return;
    await deleteEntries([...selectedIds]);
    toast(`${selectedIds.size}টি এন্ট্রি মুছে ফেলা হয়েছে`,"success");
    setSelectedIds(new Set());
  };

  const openEdit=idx=>{setEditVals({...entries[idx]});setEditModal({idx});};
  const saveEdit=async()=>{
    setEditSaving(true);
    await updateEntry(editModal.idx,editVals);
    setEditSaving(false);setEditModal(null);
    toast("এন্ট্রি আপডেট হয়েছে ✓","success");
  };
  const toB64=f=>new Promise(r=>{const rd=new FileReader();rd.onload=()=>r(rd.result);rd.readAsDataURL(f);});

  const handleImportFile=async file=>{
    if(!file)return;
    const data=await file.arrayBuffer();
    const wb=XLSX.read(data);
    const ws=wb.Sheets[wb.SheetNames[0]];
    const rows=XLSX.utils.sheet_to_json(ws,{defval:""});
    setImportRows(rows);
  };

  const confirmImport=async()=>{
    if(!importRows?.length)return;
    setImportLoading(true);
    const cols=columns.map(c=>c.name);
    const mapped=importRows.map(row=>{const obj={};cols.forEach(c=>{obj[c]=row[c]!==undefined?String(row[c]):"";});return obj;});
    const count=await importEntries(mapped);
    setImportLoading(false);setImportModal(false);setImportRows(null);
    toast(`${count}টি এন্ট্রি import হয়েছে!`,"success");
  };

  const dlExcel=()=>{
    const ws_data=[["#",...columns.map(c=>c.name)],...entries.map((e,i)=>[i+1,...columns.map(c=>c.type==="image"?e[c.name]?"[ছবি]":"":e[c.name]??"")])];
    const ws=XLSX.utils.aoa_to_sheet(ws_data);
    const wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,tabName||"Sheet1");
    XLSX.writeFile(wb,`${tabName||"data"}.xlsx`);
    toast("Excel ডাউনলোড শুরু হয়েছে","success");
  };

  const dlPDF=()=>{
    const isL=orientation==="landscape";
    const cols=columns.filter(c=>c.type!=="image");
    const fS=parseInt(fontSize)||11;
    const html=`<html><head><style>@page{size:${isL?"A4 landscape":"A4 portrait"};margin:12mm}body{font-family:${fontFamily};font-size:${fS}px;color:#1e293b}h2{text-align:center;margin-bottom:10px;font-size:${Math.round(fS*1.4)}px;font-weight:700}p.m{text-align:right;font-size:${fS-2}px;color:#94a3b8;margin-bottom:6px}table{width:100%;border-collapse:collapse}th{background:white;color:#334155;padding:${Math.round(fS*.6)}px;text-align:left;border:1px solid #e2e8f0;font-weight:700;font-size:${fS-1}px;text-transform:uppercase}td{padding:${Math.round(fS*.5)}px;border:1px solid #e2e8f0;color:#334155;background:white}</style></head><body><h2>${tabName||"ডেটা"}</h2><p class="m">মোট রেকর্ড: ${entries.length} | ${new Date().toLocaleDateString("bn-BD")}</p><table><thead><tr><th>#</th>${cols.map(c=>`<th>${c.name}</th>`).join("")}</tr></thead><tbody>${entries.map((e,i)=>`<tr><td>${i+1}</td>${cols.map(c=>`<td>${e[c.name]??""}</td>`).join("")}</tr>`).join("")}</tbody></table></body></html>`;
    const w=window.open("","_blank");
    if(w){w.document.write(html);w.document.close();w.focus();setTimeout(()=>w.print(),500);}
    setDlModal(false);toast("PDF প্রিন্ট উইন্ডো খোলা হয়েছে","info");
  };

  const dlWord=()=>{
    const isL=orientation==="landscape";
    const cols=columns.filter(c=>c.type!=="image");
    const fS=parseInt(fontSize)*2||22;
    const orientStr=isL?`<w:pgSz w:w="16838" w:h="11906" w:orient="landscape"/>`:`<w:pgSz w:w="11906" w:h="16838"/>`;
    const hRow=`<w:tr>${["#",...cols.map(c=>c.name)].map(h=>`<w:tc><w:p><w:r><w:rPr><w:b/><w:sz w:val="${fS}"/></w:rPr><w:t>${h}</w:t></w:r></w:p></w:tc>`).join("")}</w:tr>`;
    const rows=entries.map((e,i)=>`<w:tr>${["#",...cols.map(c=>c.name)].map((_,ci)=>{const v=ci===0?String(i+1):(e[cols[ci-1]?.name]??"");return `<w:tc><w:p><w:r><w:rPr><w:sz w:val="${fS}"/></w:rPr><w:t>${String(v).replace(/&/g,"&amp;").replace(/</g,"&lt;")}</w:t></w:r></w:p></w:tc>`;}).join("")}</w:tr>`).join("");
    const xml=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:sectPr>${orientStr}<w:pgMar w:top="720" w:right="720" w:bottom="720" w:left="720"/></w:sectPr><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="${Math.round(fS*1.4)}"/></w:rPr><w:t>${tabName||"ডেটা"}</w:t></w:r></w:p><w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/><w:tblBorders><w:top w:val="single"/><w:left w:val="single"/><w:bottom w:val="single"/><w:right w:val="single"/><w:insideH w:val="single"/><w:insideV w:val="single"/></w:tblBorders></w:tblPr>${hRow}${rows}</w:tbl></w:body></w:document>`;
    const blob=new Blob([xml],{type:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"});
    const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`${tabName||"data"}.docx`;a.click();
    setDlModal(false);toast("Word ফাইল ডাউনলোড হচ্ছে","success");
  };

  return (
    <div>
      <div className="panel">
        {/* Header row */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,flexWrap:"wrap",gap:8}}>
          <div className="panel-title" style={{margin:0}}><i className="ti ti-table"/> ডেটা ({entries.length}টি রেকর্ড)</div>
          <div style={{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center"}}>
            <div className="search-wrap"><i className="ti ti-search"/><input className="form-input" style={{width:180}} placeholder="খুঁজুন..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
            <button className="btn btn-outline btn-sm" onClick={()=>{setImportModal(true);setImportRows(null);}}><i className="ti ti-file-import"/> Import</button>
            <button className="btn btn-success btn-sm" onClick={dlExcel} disabled={!entries.length}><i className="ti ti-file-excel"/> Excel</button>
            <button className="btn btn-sm" style={{background:"white",color:"#dc2626",border:"1.5px solid #dc2626"}} onClick={()=>setDlModal(true)} disabled={!entries.length}><i className="ti ti-file-type-pdf"/> PDF/Word</button>
            <button className="btn btn-outline btn-sm" onClick={onAddEntry}><i className="ti ti-plus"/> এন্ট্রি যোগ</button>
            <button className="btn btn-danger btn-sm btn-icon" onClick={()=>setConfirmClear(true)} title="সব মুছুন"><i className="ti ti-trash"/></button>
          </div>
        </div>

        {/* Stats */}
        {numStats.length>0&&<div className="stats-bar">{numStats.map(s=><div key={s.name} className="stat-pill"><i className="ti ti-sum"/>{s.name}: যোগ {s.sum} | গড় {s.avg}</div>)}</div>}

        {/* Bulk bar */}
        {selectedIds.size>0&&<div className="bulk-bar"><span className="bulk-count"><i className="ti ti-checkbox" style={{marginRight:4}}/>{selectedIds.size}টি নির্বাচিত</span><button className="btn btn-danger btn-sm" onClick={bulkDelete}><i className="ti ti-trash"/> মুছুন</button><button className="btn btn-outline btn-sm" onClick={()=>setSelectedIds(new Set())}>বাতিল</button></div>}

        {!entries.length?<div className="empty-state"><i className="ti ti-database"/><p>কোনো ডেটা নেই।</p><button className="btn btn-primary btn-sm" style={{marginTop:12}} onClick={onAddEntry}><i className="ti ti-plus"/> প্রথম এন্ট্রি যোগ করুন</button></div>
        :<div className="data-table-wrap"><table className="data-table">
          <thead><tr>
            <th className="cb"><input type="checkbox" checked={allSelected} onChange={toggleAll} style={{cursor:"pointer"}}/></th>
            <th onClick={()=>handleSort("__serial")} style={{cursor:"pointer"}}># <i className={`ti ${sortCol==="__serial"?sortDir==="asc"?"ti-sort-ascending":"ti-sort-descending":"ti-selector"}`} style={{fontSize:11,opacity:.6}}/></th>
            {columns.map(c=><th key={c.id} onClick={()=>c.type!=="image"&&handleSort(c.name)} style={{cursor:c.type==="image"?"default":"pointer"}}>
              {c.name}{c.type!=="image"&&<i className={`ti ${sortCol===c.name?sortDir==="asc"?"ti-sort-ascending":"ti-sort-descending":"ti-selector"}`} style={{fontSize:11,marginLeft:4,opacity:.6}}/>}
            </th>)}
            <th style={{width:80}}>অ্যাকশন</th>
          </tr></thead>
          <tbody>{filtered.map((entry,idx)=>(
            <tr key={entry.__id||idx} style={selectedIds.has(entry.__id)?{background:"var(--blue-light)"}:{}}>
              <td><input type="checkbox" checked={selectedIds.has(entry.__id)} onChange={()=>toggleOne(entry.__id)} style={{cursor:"pointer"}}/></td>
              <td style={{color:"var(--text4)",fontWeight:600,fontSize:13}}>{entry.__serial}</td>
              {columns.map(c=><td key={c.id}>
                {c.type==="image"&&entry[c.name]?<img src={entry[c.name]} alt="" style={{width:40,height:40,objectFit:"cover",borderRadius:7,border:"1px solid var(--border)"}}/>
                :<span style={{fontSize:13}}>{entry[c.name]??"—"}</span>}
              </td>)}
              <td><div style={{display:"flex",gap:4}}>
                <button className="btn btn-ghost-dark btn-sm" style={{color:"var(--blue)",padding:"4px 8px"}} onClick={()=>openEdit(entries.indexOf(entry))}><i className="ti ti-edit"/></button>
                <button className="btn btn-ghost-dark btn-sm" style={{color:"var(--red)",padding:"4px 8px"}} onClick={async()=>{await deleteEntry(entries.indexOf(entry));toast("এন্ট্রি মুছে ফেলা হয়েছে","success");}}><i className="ti ti-trash"/></button>
              </div></td>
            </tr>
          ))}</tbody>
        </table></div>}
      </div>

      <button className="back-btn" onClick={onBack}><i className="ti ti-arrow-left"/> পেছনে</button>

      {/* Confirm Clear */}
      {confirmClear&&<div className="modal-backdrop" onClick={()=>setConfirmClear(false)}><div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-title" style={{color:"var(--red)"}}><i className="ti ti-alert-triangle"/> সব ডেটা মুছবেন?</div>
        <p style={{fontSize:14,color:"var(--text3)"}}>এই Excel এর সব ডেটা ও কলাম স্থায়ীভাবে মুছে যাবে।</p>
        <div className="modal-actions"><button className="btn btn-outline" onClick={()=>setConfirmClear(false)}>বাতিল</button><button className="btn btn-danger" onClick={async()=>{await clearAll();setConfirmClear(false);toast("সব ডেটা মুছে ফেলা হয়েছে","success");}}>হ্যাঁ, মুছে ফেলুন</button></div>
      </div></div>}

      {/* Download Modal */}
      {dlModal&&<div className="modal-backdrop" onClick={()=>setDlModal(false)}><div className="modal" style={{maxWidth:480}} onClick={e=>e.stopPropagation()}>
        <div className="modal-title"><i className="ti ti-download"/> ডাউনলোড সেটিংস</div>
        <div className="dl-section-title"><i className="ti ti-typography"/> ফন্ট নির্বাচন করুন</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
          <div><label className="form-label" style={{fontSize:12}}>ফন্ট ফ্যামিলি</label><select className="form-input" style={{fontSize:13}} value={fontFamily} onChange={e=>setFontFamily(e.target.value)}>{FONTS.map(f=><option key={f.value} value={f.value}>{f.label}</option>)}</select></div>
          <div><label className="form-label" style={{fontSize:12}}>ফন্ট সাইজ</label><select className="form-input" style={{fontSize:13}} value={fontSize} onChange={e=>setFontSize(e.target.value)}>{FSIZES.map(s=><option key={s} value={s}>{s}px</option>)}</select></div>
        </div>
        <div className="dl-section-title"><i className="ti ti-layout-board"/> পেজের অভিমুখ</div>
        <div style={{display:"flex",gap:12,marginBottom:14}}>
          {[{val:"portrait",icon:"ti-rectangle-vertical",label:"পোর্ট্রেট"},{val:"landscape",icon:"ti-rectangle-landscape",label:"ল্যান্ডস্কেপ"}].map(o=>(
            <div key={o.val} className={`dl-opt-card ${orientation===o.val?"selected":""}`} onClick={()=>setOrientation(o.val)}><i className={`ti ${o.icon}`}/><span>{o.label}</span></div>
          ))}
        </div>
        <div style={{background:"var(--surface2)",borderRadius:8,padding:"9px 13px",fontSize:12,color:"var(--text3)",marginBottom:4,border:"1px solid var(--border)"}}>
          <i className="ti ti-eye" style={{marginRight:5}}/> প্রিভিউ: <span style={{fontFamily,fontSize:`${fontSize}px`,color:"var(--text)",fontWeight:600}}>বাংলা English ১২৩</span>
        </div>
        <div className="modal-actions">
          <button className="btn btn-outline" style={{marginRight:"auto"}} onClick={()=>setDlModal(false)}><i className="ti ti-arrow-left"/> বাতিল</button>
          <button className="btn btn-danger" onClick={dlPDF}><i className="ti ti-file-type-pdf"/> PDF</button>
          <button className="btn btn-primary" onClick={dlWord}><i className="ti ti-file-word"/> Word</button>
        </div>
      </div></div>}

      {/* Import Modal */}
      {importModal&&<div className="modal-backdrop" onClick={()=>{setImportModal(false);setImportRows(null);}}><div className="modal" style={{maxWidth:520}} onClick={e=>e.stopPropagation()}>
        <div className="modal-title"><i className="ti ti-file-import"/> CSV / Excel Import</div>
        {!importRows?(<div className={`import-drop ${importDrag?"drag-over":""}`}
          onDragOver={e=>{e.preventDefault();setImportDrag(true);}} onDragLeave={()=>setImportDrag(false)}
          onDrop={e=>{e.preventDefault();setImportDrag(false);const f=e.dataTransfer.files[0];if(f)handleImportFile(f);}}
          onClick={()=>document.getElementById("impFile").click()}>
          <i className="ti ti-cloud-upload"/>
          <p style={{fontWeight:600,marginBottom:3}}>ফাইল টেনে আনুন অথবা ক্লিক করুন</p>
          <p style={{fontSize:12}}>সাপোর্টেড: .xlsx, .xls, .csv</p>
          <input id="impFile" type="file" accept=".xlsx,.xls,.csv" style={{display:"none"}} onChange={e=>{if(e.target.files[0])handleImportFile(e.target.files[0]);}}/>
        </div>):(
          <div>
            <p style={{fontSize:13,color:"var(--text3)",marginBottom:10}}><i className="ti ti-eye" style={{marginRight:4}}/>প্রথম ৫টি রেকর্ডের প্রিভিউ:</p>
            <div style={{overflowX:"auto",border:"1px solid var(--border)",borderRadius:8,marginBottom:12}}>
              <table className="data-table" style={{minWidth:280}}>
                <thead><tr>{columns.map(c=><th key={c.id}>{c.name}</th>)}</tr></thead>
                <tbody>{(importRows||[]).slice(0,5).map((row,i)=><tr key={i}>{columns.map(c=><td key={c.id} style={{fontSize:12}}>{String(row[c.name]||"")}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <p style={{fontSize:13,color:"var(--text3)"}}><i className="ti ti-info-circle" style={{marginRight:4}}/>মোট {importRows.length}টি রেকর্ড import হবে।</p>
          </div>
        )}
        <div className="modal-actions">
          <button className="btn btn-outline" onClick={()=>{setImportModal(false);setImportRows(null);}}>বাতিল</button>
          {importRows&&<button className="btn btn-primary" onClick={confirmImport} disabled={importLoading||saving}>{importLoading||saving?<><span className="spinner" style={{width:16,height:16}}/> Import হচ্ছে...</>:<><i className="ti ti-check"/> Import করুন ({importRows.length}টি)</>}</button>}
        </div>
      </div></div>}

      {/* Edit Modal */}
      {editModal&&<div className="modal-backdrop" onClick={()=>setEditModal(null)}><div className="modal" style={{maxWidth:500}} onClick={e=>e.stopPropagation()}>
        <div className="modal-title"><i className="ti ti-edit"/> ডেটা সম্পাদনা</div>
        <div style={{maxHeight:380,overflowY:"auto",marginBottom:14}}>
          {columns.map(col=>(
            <div key={col.id} className="form-group" style={{marginBottom:10}}>
              <label className="form-label">{col.name}</label>
              {col.type==="boolean"?<select className="form-input" value={editVals[col.name]||""} onChange={e=>setEditVals(v=>({...v,[col.name]:e.target.value}))}><option value="">বেছে নিন</option><option value="হ্যাঁ">হ্যাঁ</option><option value="না">না</option></select>
              :col.type==="textarea"?<textarea className="form-input" rows={3} value={editVals[col.name]||""} onChange={e=>setEditVals(v=>({...v,[col.name]:e.target.value}))}/>
              :col.type==="image"?<div><input type="file" accept="image/*" className="form-input" style={{padding:6}} onChange={async e=>{if(e.target.files[0]){const b=await toB64(e.target.files[0]);setEditVals(v=>({...v,[col.name]:b}));}}}/>{editVals[col.name]&&<img src={editVals[col.name]} alt="" style={{marginTop:5,width:56,height:56,objectFit:"cover",borderRadius:8}}/>}</div>
              :col.type==="phone"?<div><input type="tel" className="form-input" maxLength={11} value={editVals[col.name]||""} onChange={e=>{const v=e.target.value.replace(/[^0-9]/g,"").slice(0,11);setEditVals(p=>({...p,[col.name]:v}));}}/><span style={{fontSize:11,color:(editVals[col.name]||"").length===11?"var(--green)":"var(--text4)",marginTop:2,display:"block"}}>{(editVals[col.name]||"").length}/১১</span></div>
              :<input type={col.type==="number"?"number":col.type==="date"?"date":col.type==="email"?"email":"text"} className="form-input" value={editVals[col.name]||""} onChange={e=>setEditVals(v=>({...v,[col.name]:e.target.value}))}/>}
            </div>
          ))}
        </div>
        <div className="modal-actions"><button className="btn btn-outline" onClick={()=>setEditModal(null)}>বাতিল</button><button className="btn btn-primary" onClick={saveEdit} disabled={editSaving}>{editSaving?"সংরক্ষণ হচ্ছে...":<><i className="ti ti-check"/> সংরক্ষণ</>}</button></div>
      </div></div>}
    </div>
  );
}

// ─── ExcelTab + MainApp + Root App ─────────────────────────────────────────────
function ExcelTab({ user, excelId, tabName, onBack }) {
  const store=useExcelStore(user,excelId);
  const [step,setStep]=useState(1);

  if (store.loading) {
    return (
      <div style={{padding:28}}>
        <div style={{display:"flex",gap:12,marginBottom:20}}>
          {[1,2,3].map(i=><div key={i} className="skeleton" style={{height:18,flex:1,borderRadius:20}}/>)}
        </div>
        {[1,2,3,4,5].map(i=><div key={i} className="skeleton" style={{height:44,marginBottom:10,borderRadius:10}}/>)}
      </div>
    );
  }

  return (
    <div className="app-content">
      <button className="back-btn" onClick={onBack}><i className="ti ti-arrow-left"/> ড্যাশবোর্ডে ফিরুন</button>
      <div className="stepper">
        {[{n:1,icon:"ti-layout-columns",label:"কলাম সেটআপ"},{n:2,icon:"ti-forms",label:"ডেটা এন্ট্রি"},{n:3,icon:"ti-table",label:"ডেটা ও ডাউনলোড"}].map((s,i,arr)=>(
          <span key={s.n} style={{display:"flex",alignItems:"center",flex:i<arr.length-1?"1":"0"}}>
            <button className={`step-btn ${step===s.n?"active":step>s.n?"done":""}`}
              onClick={()=>{if(s.n<step)setStep(s.n);else if(s.n===2&&store.columns.length>0)setStep(2);else if(s.n===3&&store.entries.length>0)setStep(3);}}>
              <span className="step-icon">{step>s.n?<i className="ti ti-check"/>:<i className={`ti ${s.icon}`}/>}</span>
              <span style={{display:"block"}}>{s.label}</span>
            </button>
            {i<arr.length-1&&<span className={`step-line ${step>s.n?"done":""}`} style={{flex:1}}/>}
          </span>
        ))}
      </div>
      {step===1&&<StepOne store={store} onNext={()=>setStep(2)}/>}
      {step===2&&<StepTwo store={store} onBack={()=>setStep(1)} onViewData={()=>setStep(3)}/>}
      {step===3&&<StepThree store={store} tabName={tabName} onBack={()=>setStep(2)} onAddEntry={()=>setStep(2)}/>}
    </div>
  );
}

function MainApp({ user, onLogout }) {
  const [tabs,setTabs]=useState(()=>{
    const s=localStorage.getItem(`et_${user.id}`);
    if(s){try{return JSON.parse(s);}catch{}}
    return [{id:"default",name:"Excel ১"}];
  });
  const [activeTab,setActiveTab]=useState(null);
  const [renamingId,setRenamingId]=useState(null);
  const [renameVal,setRenameVal]=useState("");
  const [newTabModal,setNewTabModal]=useState(false);
  const [newTabName,setNewTabName]=useState("");
  const [dark,setDark]=useDarkMode();
  const [countCache,setCountCache]=useState({});

  useEffect(()=>{localStorage.setItem(`et_${user.id}`,JSON.stringify(tabs));},[tabs,user.id]);

  // Load entry counts for dashboard
  useEffect(()=>{
    if(activeTab)return;
    tabs.forEach(async tab=>{
      const {count}=await supabase.from("entries").select("*",{count:"exact",head:true}).eq("user_id",user.id).eq("form_id",tab.id);
      setCountCache(p=>({...p,[tab.id]:count||0}));
    });
  },[tabs,user,activeTab]); // eslint-disable-line

  const addTab=name=>{
    const id=`excel_${Date.now()}`;
    setTabs(t=>[...t,{id,name:name||`Excel ${tabs.length+1}`}]);
    setActiveTab(id);setNewTabModal(false);setNewTabName("");
  };
  const removeTab=id=>{
    if(tabs.length===1)return;
    setTabs(t=>t.filter(tab=>tab.id!==id));
    if(activeTab===id)setActiveTab(null);
  };
  const startRename=tab=>{setRenamingId(tab.id);setRenameVal(tab.name);};
  const commitRename=()=>{
    if(renameVal.trim())setTabs(t=>t.map(tab=>tab.id===renamingId?{...tab,name:renameVal.trim()}:tab));
    setRenamingId(null);
  };
  const currentTab=tabs.find(t=>t.id===activeTab);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand" onClick={()=>setActiveTab(null)}><i className="ti ti-file-spreadsheet"/><span>Excel ডেটা এন্ট্রি</span></div>
        <div className="navbar-actions">
          {activeTab&&<button className="btn btn-ghost btn-sm" onClick={()=>setActiveTab(null)}><i className="ti ti-layout-dashboard"/> ড্যাশবোর্ড</button>}
          <button className="btn btn-ghost btn-sm" onClick={()=>setNewTabModal(true)}><i className="ti ti-plus"/> নতুন Excel</button>
          <div style={{width:1,height:22,background:"rgba(255,255,255,.2)"}}/>
          <button className="btn btn-ghost btn-sm btn-icon" onClick={()=>setDark(d=>!d)} title={dark?"লাইট মোড":"ডার্ক মোড"}><i className={`ti ${dark?"ti-sun":"ti-moon"}`}/></button>
          <span style={{fontSize:13,color:"rgba(255,255,255,.75)",display:"flex",alignItems:"center",gap:4}}><i className="ti ti-user-circle" style={{fontSize:16}}/>{user.email.split("@")[0]}</span>
          <button className="btn btn-ghost btn-sm" onClick={onLogout}><i className="ti ti-logout"/> লগআউট</button>
        </div>
      </nav>

      <div className="app-header-bar">
        <div className="excel-tabs-bar">
          <button className={`excel-tab ${activeTab===null?"active":""}`} onClick={()=>setActiveTab(null)}>
            <i className="ti ti-layout-dashboard" style={{fontSize:14}}/><span className="tab-name">হোম</span>
          </button>
          {tabs.map(tab=>(
            <div key={tab.id} className={`excel-tab ${activeTab===tab.id?"active":""}`} onClick={()=>setActiveTab(tab.id)} onDoubleClick={()=>startRename(tab)} title="ডাবল ক্লিক করে নাম পরিবর্তন">
              <i className="ti ti-file-spreadsheet" style={{fontSize:14,flexShrink:0}}/>
              {renamingId===tab.id?<input className="tab-rename-input" value={renameVal} autoFocus onChange={e=>setRenameVal(e.target.value)} onBlur={commitRename} onKeyDown={e=>{if(e.key==="Enter")commitRename();if(e.key==="Escape")setRenamingId(null);e.stopPropagation();}} onClick={e=>e.stopPropagation()}/>:<span className="tab-name">{tab.name}</span>}
              {tabs.length>0&&<button className="tab-close" onClick={e=>{e.stopPropagation();removeTab(tab.id);}}><i className="ti ti-x"/></button>}
            </div>
          ))}
          <button className="new-tab-btn" onClick={()=>setNewTabModal(true)} title="নতুন Excel"><i className="ti ti-plus"/></button>
        </div>
      </div>

      <div className="app-layout">
        {activeTab?(
          <ExcelTab key={activeTab} user={user} excelId={activeTab} tabName={currentTab?.name||"data"} onBack={()=>setActiveTab(null)}/>
        ):(
          <div className="dashboard-wrap">
            <div className="dashboard-header">
              <div>
                <div className="dashboard-title">আপনার Excel ফাইলগুলো</div>
                <div className="dashboard-sub">ক্লিক করে খুলুন · ডাবল ক্লিক করে নাম পরিবর্তন করুন</div>
              </div>
              <button className="btn btn-primary" onClick={()=>setNewTabModal(true)}><i className="ti ti-plus"/> নতুন Excel তৈরি করুন</button>
            </div>
            <div className="excel-card-grid">
              {tabs.map(tab=>(
                <div key={tab.id} className="excel-card" onClick={()=>setActiveTab(tab.id)}>
                  <div className="excel-card-icon"><i className="ti ti-file-spreadsheet"/></div>
                  <div className="excel-card-name">{tab.name}</div>
                  <div className="excel-card-meta">
                    {countCache[tab.id]!==undefined&&<span className="excel-card-badge"><i className="ti ti-database"/>{countCache[tab.id]}টি রেকর্ড</span>}
                    <span>ক্লিক করুন →</span>
                  </div>
                </div>
              ))}
              <div className="excel-new-card" onClick={()=>setNewTabModal(true)}><i className="ti ti-plus"/><span>নতুন Excel তৈরি করুন</span></div>
            </div>
          </div>
        )}
      </div>

      {newTabModal&&<div className="modal-backdrop" onClick={()=>setNewTabModal(false)}><div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-title"><i className="ti ti-file-plus"/> নতুন Excel তৈরি করুন</div>
        <div className="form-group"><label className="form-label">Excel-এর নাম</label>
          <input className="form-input" placeholder="যেমন: ছাত্র তালিকা, কর্মচারী রেজিস্টার..." value={newTabName} onChange={e=>setNewTabName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addTab(newTabName.trim()||`Excel ${tabs.length+1}`)} autoFocus/>
        </div>
        <div className="modal-actions"><button className="btn btn-outline" onClick={()=>setNewTabModal(false)}>বাতিল</button><button className="btn btn-primary" onClick={()=>addTab(newTabName.trim()||`Excel ${tabs.length+1}`)}><i className="ti ti-plus"/> তৈরি করুন</button></div>
      </div></div>}
    </div>
  );
}

// ─── Root ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [user,setUser]=useState(null);
  const [authLoading,setAuthLoading]=useState(true);
  const [profile,setProfile]=useState(null);
  const [profileLoading,setProfileLoading]=useState(false);
  const [page,setPage]=useState("home");

  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{setUser(session?.user??null);setAuthLoading(false);});
    const {data:{subscription}}=supabase.auth.onAuthStateChange((_,session)=>{setUser(session?.user??null);});
    return()=>subscription.unsubscribe();
  },[]);

  useEffect(()=>{
    if(!user){setProfile(null);return;}
    setProfileLoading(true);
    supabase.from("user_profiles").select("*").eq("user_id",user.id).single().then(({data})=>{
      if(data)setProfile(data);
      else{
        const isAdmin=user.email===ADMIN_EMAIL;
        const p={user_id:user.id,email:user.email,full_name:user.user_metadata?.full_name||"",status:isAdmin?"approved":"pending",created_at:new Date().toISOString()};
        supabase.from("user_profiles").upsert(p,{onConflict:"user_id"});
        setProfile(p);
      }
      setProfileLoading(false);
    });
  },[user]);

  const handleLogout=async()=>{await supabase.auth.signOut();setProfile(null);setPage("home");};
  const isAdmin=user&&user.email===ADMIN_EMAIL;

  const wrap=(children)=>(
    <ToastProvider><style>{css}</style>{children}</ToastProvider>
  );

  if(authLoading||(user&&profileLoading)) return wrap(
    <>
      <nav className="navbar"><div className="navbar-brand"><i className="ti ti-file-spreadsheet"/><span>Excel ডেটা এন্ট্রি</span></div></nav>
      <div className="full-center"><span className="spinner"/><span style={{fontSize:14,color:"var(--text3)"}}>লোড হচ্ছে...</span></div>
    </>
  );

  if(user&&isAdmin) return wrap(<AdminPanel user={user} onLogout={handleLogout}/>);

  if(user&&profile&&profile.status!=="approved") return wrap(
    <>
      <nav className="navbar"><div className="navbar-brand"><i className="ti ti-file-spreadsheet"/><span>Excel ডেটা এন্ট্রি</span></div><div className="navbar-actions"><button className="btn btn-ghost btn-sm" onClick={handleLogout}><i className="ti ti-logout"/> লগআউট</button></div></nav>
      <div className="pending-notice"><div className="pending-card">
        {profile.status==="rejected"?<><i className="ti ti-x-circle" style={{color:"var(--red)"}}/><h2>অ্যাকাউন্ট বাতিল</h2><p>Admin কর্তৃক বাতিল করা হয়েছে।</p></>
        :profile.status==="blocked"?<><i className="ti ti-ban" style={{color:"var(--purple)"}}/><h2>অ্যাকাউন্ট ব্লক</h2><p>Admin কর্তৃক ব্লক করা হয়েছে।</p></>
        :<><i className="ti ti-clock"/><h2>অনুমোদনের অপেক্ষায়</h2><p>অ্যাকাউন্ট তৈরি হয়েছে। Admin অনুমোদন দিলে ব্যবহার করতে পারবেন।</p></>}
        <button className="btn btn-outline" onClick={handleLogout}><i className="ti ti-logout"/> লগআউট</button>
      </div></div>
    </>
  );

  if(user&&profile?.status==="approved") return wrap(<MainApp user={user} onLogout={handleLogout}/>);

  return wrap(
    <>
      <nav className="navbar">
        <div className="navbar-brand" onClick={()=>setPage("home")}><i className="ti ti-file-spreadsheet"/><span>Excel ডেটা এন্ট্রি</span></div>
        <div className="navbar-actions">
          {page!=="login"&&<button className="btn btn-ghost btn-sm" onClick={()=>setPage("login")}><i className="ti ti-login"/> লগইন</button>}
          {page!=="register"&&<button className="btn btn-outline btn-sm" style={{background:"white",color:"var(--blue)",borderColor:"white"}} onClick={()=>setPage("register")}><i className="ti ti-user-plus"/> রেজিস্ট্রেশন</button>}
        </div>
      </nav>
      {page==="home"&&<HomePage onLogin={()=>setPage("login")} onRegister={()=>setPage("register")}/>}
      {page==="login"&&<AuthPage initialMode="login" onBack={()=>setPage("home")}/>}
      {page==="register"&&<AuthPage initialMode="register" onBack={()=>setPage("home")}/>}
    </>
  );
}
