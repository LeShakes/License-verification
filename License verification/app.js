/* =============================================
   DMPR Licence Verification Portal — app.js
   ============================================= */

const DATA = [
  { "Company Name": "Dell",        "License ID": 99976, "Permit Number": 200912, "License Type": "Mining Right"       },
  { "Company Name": "Acer",        "License ID": 95453, "Permit Number": 264809, "License Type": "Prospecting Right"  },
  { "Company Name": "Adidas",      "License ID": 91264, "Permit Number": 277879, "License Type": "Reclamation Permit" },
  { "Company Name": "Nike",        "License ID": 99090, "Permit Number": 211274, "License Type": "Mining Permit"      },
  { "Company Name": "Total Sports","License ID": 98889, "Permit Number": 223546, "License Type": "Prospecting Right"  },
  { "Company Name": "DMPR",        "License ID": 97859, "Permit Number": 272563, "License Type": "Mining Right"       }
];

function doSearch() {
  const q = document.getElementById('search-input').value.trim();
  if (!q) { clearResult(); return; }

  // Exact match on name, licence ID, or permit number
  const match = DATA.find(d =>
    d["Company Name"].toLowerCase() === q.toLowerCase() ||
    String(d["License ID"]) === q ||
    String(d["Permit Number"]) === q
  );

  if (match) {
    showValid(match);
    return;
  }

  // Partial / fuzzy match
  const partial = DATA.find(d =>
    d["Company Name"].toLowerCase().includes(q.toLowerCase()) ||
    String(d["License ID"]).includes(q) ||
    String(d["Permit Number"]).includes(q)
  );

  if (partial) {
    showValid(partial);
  } else {
    showFake(q);
  }
}

function showValid(r) {
  const panel = document.getElementById('result-panel');
  const now   = new Date().toLocaleDateString('en-ZA', { day: '2-digit', month: 'long', year: 'numeric' });

  panel.style.display = 'block';
  panel.innerHTML = `
    <div class="result-card is-valid">
      <div class="result-header">
        <div class="status-icon">✅</div>
        <div>
          <div class="status-title">Licence Verified — Authentic</div>
          <div class="status-desc">This licence is registered and valid in the DMPR database.</div>
        </div>
      </div>
      <div class="result-body">
        <div class="field">
          <label>Company / Holder Name</label>
          <value>${r['Company Name']}</value>
        </div>
        <div class="field">
          <label>Licence ID</label>
          <value>${r['License ID']}</value>
        </div>
        <div class="field">
          <label>Permit Number</label>
          <value>${r['Permit Number']}</value>
        </div>
        <div class="field">
          <label>Licence Type</label>
          <value><span class="type-badge">${r['License Type']}</span></value>
        </div>
      </div>
      <div class="result-footer">
        🔒 Verified against the official DMPR register &nbsp;·&nbsp; Checked on ${now}
      </div>
    </div>`;

  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showFake(q) {
  const panel = document.getElementById('result-panel');
  const now   = new Date().toLocaleDateString('en-ZA', { day: '2-digit', month: 'long', year: 'numeric' });

  panel.style.display = 'block';
  panel.innerHTML = `
    <div class="result-card is-invalid">
      <div class="result-header">
        <div class="status-icon">🚫</div>
        <div>
          <div class="status-title">Licence Not Found — Potentially Fraudulent</div>
          <div class="status-desc">No record matching <strong>"${q}"</strong> exists in the DMPR licence database.</div>
        </div>
      </div>
      <div class="result-body" style="grid-template-columns:1fr;">
        <div class="field">
          <label>Query Submitted</label>
          <value>${q}</value>
        </div>
        <p style="font-size:13px;color:#5A6A7A;line-height:1.6;margin-top:4px;">
          This licence could not be verified. It may be <strong>fraudulent, expired, or not yet captured</strong>.
          If you suspect fraud, please report it immediately to <strong>enquiries@dmpr.gov.za</strong>
          or call <strong>012 444 3000</strong>.
        </p>
      </div>
      <div class="result-footer" style="color:#C0392B;">
        ⚠️ Not found in official DMPR register &nbsp;·&nbsp; Checked on ${now}
      </div>
    </div>`;

  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function clearResult() {
  const panel = document.getElementById('result-panel');
  panel.style.display = 'none';
  panel.innerHTML = '';
}

// Allow Enter key to trigger search
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('search-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') doSearch();
  });
});
