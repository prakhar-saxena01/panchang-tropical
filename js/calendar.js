// ── CALENDAR PAGE ──
let calYear, calMonth;

function renderCalendar(y, m) {
  const container = document.getElementById('cal-container');
  if (!container) return;

  const now = new Date();
  calYear  = y !== undefined ? y : now.getFullYear();
  calMonth = m !== undefined ? m : now.getMonth();

  const firstDay = new Date(calYear, calMonth, 1);
  const lastDay  = new Date(calYear, calMonth+1, 0);
  const startDow = firstDay.getDay();

  container.innerHTML = `
    <div class="content">
      <div class="cal-header">
        <h2>${Panchang.MONTHS_EN[calMonth]} ${calYear}</h2>
        <div class="cal-nav">
          <button class="cal-btn" onclick="renderCalendar(${calMonth===0?calYear-1:calYear},${calMonth===0?11:calMonth-1})">← Prev</button>
          <button class="cal-btn" onclick="renderCalendar(${now.getFullYear()},${now.getMonth()})">Today</button>
          <button class="cal-btn" onclick="renderCalendar(${calMonth===11?calYear+1:calYear},${calMonth===11?0:calMonth+1})">Next →</button>
        </div>
      </div>
      <div class="cal-grid" id="cal-grid"></div>
      <div id="cal-day-detail" style="margin-top:1.5rem;"></div>
    </div>
  `;

  const grid = document.getElementById('cal-grid');
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  dayNames.forEach(dn => {
    const el = document.createElement('div');
    el.className = 'cal-day-name';
    el.textContent = dn;
    grid.appendChild(el);
  });

  // Fill leading empty cells
  for (let i = 0; i < startDow; i++) {
    const prev = new Date(calYear, calMonth, -startDow+i+1);
    const cell = buildCell(prev, true);
    grid.appendChild(cell);
  }

  // Fill month days
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(calYear, calMonth, d);
    const cell = buildCell(date, false);
    if (d === now.getDate() && calMonth === now.getMonth() && calYear === now.getFullYear()) {
      cell.classList.add('today');
    }
    grid.appendChild(cell);
  }

  // Trailing cells
  const total = startDow + lastDay.getDate();
  const remainder = total % 7 === 0 ? 0 : 7 - (total % 7);
  for (let i = 1; i <= remainder; i++) {
    const next = new Date(calYear, calMonth+1, i);
    const cell = buildCell(next, true);
    grid.appendChild(cell);
  }
}

function buildCell(date, otherMonth) {
  const jd = Panchang.julianDate(new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 6)));
  const sunL  = Panchang.sunLongitude(jd);
  const moonL = Panchang.moonLongitude(jd);
  const tithi  = Panchang.getTithi(sunL, moonL);
  const naksh  = Panchang.getNakshatra(moonL);

  const cell = document.createElement('div');
  cell.className = 'cal-cell' + (otherMonth?' other-month':'') +
    (tithi.name==='Purnima'?' purnima':'') +
    (tithi.name==='Amavasya'?' amavasya':'');

  cell.innerHTML = `
    <div class="cal-date">${date.getDate()}</div>
    <div class="cal-tithi">${tithi.name}</div>
    <div class="cal-naksh">${naksh.name.split(' ')[0]}</div>
  `;
  cell.title = `${date.toDateString()} · ${tithi.name} · ${tithi.paksha} · ${naksh.name}`;
  cell.onclick = () => showCalDayDetail(date);
  return cell;
}

function showCalDayDetail(date) {
  const detail = document.getElementById('cal-day-detail');
  if (!detail) return;

  const jd     = Panchang.julianDate(new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 6)));
  const sunL   = Panchang.sunLongitude(jd);
  const moonL  = Panchang.moonLongitude(jd);
  const tithi  = Panchang.getTithi(sunL, moonL);
  const naksh  = Panchang.getNakshatra(moonL);
  const yoga   = Panchang.getYoga(sunL, moonL);
  const karana = Panchang.getKarana(sunL, moonL);
  const vaar   = Panchang.VAAR[date.getDay()];
  const sunSign  = Panchang.getTropicalSign(sunL);
  const moonSign = Panchang.getTropicalSign(moonL);

  // Handle async sunrise/sunset
  Panchang.getSunriseSet(AppState.lat, AppState.lon, date).then(ss => {
    let ssHtml = '';
    if (ss) {
      const rahu = Panchang.getKaal(ss.sunrise, ss.sunset, date.getDay(), 'rahu');
      ssHtml = `
        <div class="card"><div class="card-label">Sunrise</div><div class="card-value" style="font-size:16px;">${Panchang.fmt12(ss.sunrise)}</div></div>
        <div class="card"><div class="card-label">Sunset</div><div class="card-value" style="font-size:16px;">${Panchang.fmt12(ss.sunset)}</div></div>
        <div class="card card-red"><div class="card-label">Rahu Kaal</div><div class="card-value" style="font-size:13px;">${Panchang.fmt12(rahu.start)} – ${Panchang.fmt12(rahu.end)}</div></div>
      `;
    }

    detail.innerHTML = `
      <div style="border:1px solid var(--border2); border-radius:var(--radius-lg); padding:16px 18px; background:var(--bg2);">
        <div style="font-family:var(--font-display); font-size:20px; margin-bottom:12px; color:var(--gold2);">
          ${Panchang.VAAR_EN[date.getDay()]}, ${date.getDate()} ${Panchang.MONTHS_EN[date.getMonth()]} ${date.getFullYear()}
        </div>
        <div class="grid-auto-sm" style="margin-bottom:10px;">
          <div class="card"><div class="card-label">Tithi</div><div class="card-value" style="font-size:16px;">${tithi.name}</div><div class="card-sub">${tithi.paksha}</div></div>
          <div class="card"><div class="card-label">Nakshatra</div><div class="card-value" style="font-size:16px;">${naksh.name}</div><div class="card-sub">Pada ${naksh.pada}</div></div>
          <div class="card"><div class="card-label">Yoga</div><div class="card-value" style="font-size:16px;">${yoga.name}</div></div>
          <div class="card"><div class="card-label">Karana</div><div class="card-value" style="font-size:16px;">${karana.name}</div></div>
          <div class="card"><div class="card-label">Sun in</div><div class="card-value" style="font-size:16px;">${sunSign}</div></div>
          <div class="card"><div class="card-label">Moon in</div><div class="card-value" style="font-size:16px;">${moonSign}</div></div>
          ${ssHtml}
        </div>
      </div>
    `;
  });
}
