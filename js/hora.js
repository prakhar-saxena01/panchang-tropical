// ── HORA PAGE ──
async function renderHora(targetDate) {
  const container = document.getElementById('hora-container');
  if (!container) return;

  const date = targetDate || new Date();
  const ss = await Panchang.getSunriseSet(AppState.lat, AppState.lon, date);
  if (!ss) { container.innerHTML = '<div class="content"><p style="color:var(--text3)">Sunrise data unavailable for this location.</p></div>'; return; }

  // Build 24 horas starting from midnight
  const dayStart = new Date(date); dayStart.setHours(0,0,0,0);
  const dayOfWeek = date.getDay();
  // Day-hour lord for each day: Sun, Mon, Tue, Wed, Thu, Fri, Sat
  const dayLords = [0,1,2,3,4,5,6]; // index into HORA_SEQUENCE
  // Chaldean sequence offset per day
  const offsets  = [0,2,4,6,1,3,5]; // verified Chaldean hora offsets
  const offset   = offsets[dayOfWeek];

  const rows = [];
  for (let i = 0; i < 24; i++) {
    const start = new Date(dayStart.getTime() + i * 3600000);
    const end   = new Date(start.getTime() + 3600000);
    const planet = Panchang.HORA_SEQUENCE[(offset + i) % 7];
    const isCurrent = date >= start && date < end;
    const isDay = start >= ss.sunrise && start < ss.sunset;
    rows.push({ start, end, planet, isCurrent, isDay });
  }

  const tableRows = rows.map(r => {
    const p = Panchang.PLANETS_HORA[r.planet];
    return `
      <tr class="${r.isCurrent ? 'current' : ''}">
        <td>${Panchang.fmt12(r.start)} – ${Panchang.fmt12(r.end)}</td>
        <td class="hora-planet" style="color:${p.color}">${p.symbol} ${r.planet}</td>
        <td style="color:var(--text3)">${r.isDay ? 'Day' : 'Night'}</td>
        <td style="font-size:11px; color:var(--text3)">${r.isCurrent ? '◀ Now' : ''}</td>
      </tr>`;
  }).join('');

  container.innerHTML = `
    <div class="content">
      <div style="margin-bottom:1rem;">
        <label style="font-size:12px;color:var(--text3);margin-right:8px;">Date</label>
        <input type="date" value="${date.toISOString().split('T')[0]}" style="background:var(--bg3);border:1px solid var(--border);border-radius:var(--radius);padding:6px 10px;font-size:13px;font-family:var(--font-body);color:var(--text);outline:none;" onchange="renderHora(new Date(this.value+'T12:00:00'))" />
      </div>
      <div style="margin-bottom:1rem; display:flex; gap:16px; flex-wrap:wrap; font-size:12px; color:var(--text3);">
        ${Object.entries(Panchang.PLANETS_HORA).map(([n,p])=>`<span style="color:${p.color}">${p.symbol} ${n}</span>`).join('')}
      </div>
      <table class="hora-table">
        <thead><tr><th>Time</th><th>Planet (Hora Lord)</th><th>Period</th><th></th></tr></thead>
        <tbody>${tableRows}</tbody>
      </table>
      <div class="zodiac-note" style="margin-top:1rem;">Hora based on Chaldean order · Sunrise ${Panchang.fmt12(ss.sunrise)} · ${AppState.locationName}</div>
    </div>
  `;
}

// ── MUHURTA PAGE ──
function renderMuhurta() {
  const container = document.getElementById('muhurta-container');
  if (!container) return;

  const activities = [
    { key:'marriage',   label:'Marriage / Vivah' },
    { key:'travel',     label:'Travel / Yatra' },
    { key:'business',   label:'Business / New Venture' },
    { key:'purchase',   label:'Purchase / Buying' },
    { key:'medical',    label:'Medical / Surgery' },
    { key:'education',  label:'Education / Study' },
    { key:'griha',      label:'Griha Pravesh (Housewarming)' },
    { key:'naming',     label:'Naming Ceremony (Namakarana)' },
  ];

  container.innerHTML = `
    <div class="content">
      <div class="muhurta-pick">
        <label>Date</label>
        <input type="date" id="muh-date" value="${new Date().toISOString().split('T')[0]}" />
        <label>Activity</label>
        <select id="muh-activity">
          ${activities.map(a=>`<option value="${a.key}">${a.label}</option>`).join('')}
        </select>
        <button class="btn-sm" onclick="calcMuhurta()">Analyse</button>
      </div>
      <div class="muhurta-legend">
        <span><i class="dot-g"></i> Auspicious</span>
        <span><i class="dot-n"></i> Neutral</span>
        <span><i class="dot-b"></i> Inauspicious</span>
      </div>
      <div id="muh-result"></div>
    </div>
  `;
  calcMuhurta();
}

async function calcMuhurta() {
  const dateVal = document.getElementById('muh-date')?.value;
  const actVal  = document.getElementById('muh-activity')?.value;
  const result  = document.getElementById('muh-result');
  if (!result || !dateVal) return;

  const date = new Date(dateVal + 'T12:00:00');
  // Get quality for each hora of the day
  const ss = await Panchang.getSunriseSet(AppState.lat, AppState.lon, date);

  const rows = [];
  for (let h = 0; h < 24; h++) {
    const d = new Date(date); d.setHours(h, 0, 0, 0);
    const q = Panchang.getMuhurtaQuality(d);
    rows.push({ hour: h, date: d, q });
  }

  // Overall day quality
  const dayQ = Panchang.getMuhurtaQuality(date);
  const scoreColor = dayQ.score >= 7 ? '#7abf7a' : dayQ.score >= 5 ? 'var(--gold)' : '#e07070';
  const scoreLabel = dayQ.score >= 7 ? 'Auspicious' : dayQ.score >= 5 ? 'Neutral' : 'Inauspicious';

  const hourRows = rows.map(r => {
    const cls = r.q.score >= 7 ? 'dot-g' : r.q.score >= 5 ? 'dot-n' : 'dot-b';
    const label = r.q.score >= 7 ? 'Auspicious' : r.q.score >= 5 ? 'Neutral' : 'Avoid';
    return `
      <tr>
        <td>${Panchang.fmt12(r.date)}</td>
        <td><span class="${cls}" style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${r.q.score>=7?'var(--green)':r.q.score>=5?'var(--gold)':'var(--red)'};margin-right:6px;"></span>${label}</td>
        <td style="font-size:12px;color:var(--text3)">${r.q.tithi.name}</td>
        <td style="font-size:12px;color:var(--text3)">${r.q.naksh.name}</td>
        <td style="font-size:12px;color:var(--text3)">${r.q.yoga.name}</td>
      </tr>`;
  }).join('');

  result.innerHTML = `
    <div style="display:flex;gap:12px;align-items:center;margin-bottom:1.25rem;padding:14px 18px;background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-lg);">
      <div>
        <div style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--text3);margin-bottom:4px;">Day Score</div>
        <div style="font-family:var(--font-display);font-size:32px;color:${scoreColor};line-height:1;">${dayQ.score}/10</div>
        <div style="font-size:13px;color:${scoreColor};margin-top:2px;">${scoreLabel}</div>
      </div>
      <div style="flex:1;padding-left:1.5rem;border-left:1px solid var(--border);">
        <div class="grid-auto-sm">
          <div><span style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:1px;">Tithi</span><br><span style="color:var(--text2)">${dayQ.tithi.name}</span></div>
          <div><span style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:1px;">Nakshatra</span><br><span style="color:var(--text2)">${dayQ.naksh.name}</span></div>
          <div><span style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:1px;">Yoga</span><br><span style="color:${dayQ.yoga.quality==='good'?'#7abf7a':dayQ.yoga.quality==='bad'?'#e07070':'var(--text2)'}">${dayQ.yoga.name}</span></div>
          <div><span style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:1px;">Karana</span><br><span style="color:${dayQ.karana.quality==='bad'?'#e07070':'var(--text2)'}">${dayQ.karana.name}</span></div>
        </div>
      </div>
    </div>

    <div style="font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--text3);margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid var(--border);">Hourly Breakdown</div>
    <table class="hora-table">
      <thead><tr><th>Hour</th><th>Quality</th><th>Tithi</th><th>Nakshatra</th><th>Yoga</th></tr></thead>
      <tbody>${hourRows}</tbody>
    </table>
    <div class="zodiac-note" style="margin-top:1rem;">Muhurta analysis uses Tropical positions · Scores are indicative · Consult a Jyotishi for formal muhurta</div>
  `;
}

// ── DATE LOOKUP PAGE ──
async function renderDateLookup(dateStr) {
  const container = document.getElementById('date-container');
  if (!container) return;

  const date = dateStr ? new Date(dateStr + 'T12:00:00') : new Date();
  await renderToday(date);

  // Swap into date container
  const todayCont = document.getElementById('today-container');
  if (todayCont) container.innerHTML = todayCont.innerHTML;
}
