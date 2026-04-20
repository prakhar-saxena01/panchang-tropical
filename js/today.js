// ── TODAY PAGE ──
function renderToday(targetDate) {
  const date = targetDate || AppState.date;
  const jd = Panchang.julianDate(date);
  const sunL = Panchang.sunLongitude(jd);
  const moonL = Panchang.moonLongitude(jd);

  const tithi   = Panchang.getTithi(sunL, moonL);
  const moonNak = Panchang.getNakshatra(moonL);
  const sunNak  = Panchang.getNakshatra(sunL);
  const yoga    = Panchang.getYoga(sunL, moonL);
  const karana  = Panchang.getKarana(sunL, moonL);
  const vaar    = Panchang.VAAR[date.getDay()];
  const vaarEn  = Panchang.VAAR_EN[date.getDay()];
  const samvat  = Panchang.getSamvat(date);
  const ritu    = Panchang.getRitu(date);
  const ayana   = Panchang.getAyana(date);
  const purnimanta = Panchang.getPurnimanta(sunL);
  const amanta     = Panchang.getAmanta(moonL);
  const sunSign    = Panchang.getTropicalSign(sunL);
  const moonSign   = Panchang.getTropicalSign(moonL);
  const sunDeg     = Panchang.getDegInSign(sunL);
  const moonDeg    = Panchang.getDegInSign(moonL);

  const ss = Panchang.getSunriseSet(AppState.lat, AppState.lon, date);
  let sunriseStr = '—', sunsetStr = '—';
  let rahuStr = '—', gulikaStr = '—', yamaStr = '—';

  if (ss) {
    sunriseStr = Panchang.fmt12(ss.sunrise);
    sunsetStr  = Panchang.fmt12(ss.sunset);
    const rahu   = Panchang.getKaal(ss.sunrise, ss.sunset, date.getDay(), 'rahu');
    const gulika = Panchang.getKaal(ss.sunrise, ss.sunset, date.getDay(), 'gulika');
    const yama   = Panchang.getKaal(ss.sunrise, ss.sunset, date.getDay(), 'yama');
    rahuStr   = `${Panchang.fmt12(rahu.start)} – ${Panchang.fmt12(rahu.end)}`;
    gulikaStr = `${Panchang.fmt12(gulika.start)} – ${Panchang.fmt12(gulika.end)}`;
    yamaStr   = `${Panchang.fmt12(yama.start)} – ${Panchang.fmt12(yama.end)}`;
  }

  const dayDur = ss ? Math.round(ss.duration) : '—';
  const yogaClass = yoga.quality === 'good' ? 'card-green' : yoga.quality === 'bad' ? 'card-red' : '';
  const karanaClass = karana.quality === 'bad' ? 'card-red' : '';

  const container = document.getElementById('today-container');
  if (!container) return;

  container.innerHTML = `
    <div class="pill-strip" id="samvat-strip">
      <div class="pill highlight"><strong>${samvat.vikram}</strong> Vikram Samvat</div>
      <div class="pill highlight"><strong>${samvat.shaka}</strong> Shaka Samvat</div>
      <div class="pill">Purnimanta: <strong>${purnimanta}</strong></div>
      <div class="pill">Amanta: <strong>${amanta}</strong></div>
      <div class="pill">Ritu: <strong>${ritu ? ritu.name : ''}</strong> (${ritu ? ritu.en : ''})</div>
      <div class="pill">Ayana: <strong>${ayana}</strong></div>
      <div class="pill">Vaar: <strong>${vaar}</strong></div>
    </div>

    <div class="content">
      <div class="section-head">Sun &amp; Moon Positions</div>
      <div class="grid-2" style="margin-bottom:1.25rem;">
        <div class="luminary-card sun">
          <span class="luminary-symbol">☉</span>
          <div class="luminary-sign">${sunSign}</div>
          <div class="luminary-deg">${sunDeg} &nbsp;·&nbsp; ${sunL.toFixed(2)}° tropical</div>
          <div class="luminary-naksh">
            <strong>${sunNak.name}</strong> Pada ${sunNak.pada} &nbsp;·&nbsp; Lord: ${sunNak.lord}
          </div>
        </div>
        <div class="luminary-card moon">
          <span class="luminary-symbol">☽</span>
          <div class="luminary-sign">${moonSign}</div>
          <div class="luminary-deg">${moonDeg} &nbsp;·&nbsp; ${moonL.toFixed(2)}° tropical</div>
          <div class="luminary-naksh">
            <strong>${moonNak.name}</strong> Pada ${moonNak.pada} &nbsp;·&nbsp; Lord: ${moonNak.lord}
          </div>
        </div>
      </div>

      <div class="section-head">Sunrise &amp; Sunset</div>
      <div class="grid-4" style="margin-bottom:1.25rem;">
        <div class="card card-gold">
          <div class="card-label">Sunrise</div>
          <div class="card-value">${sunriseStr}</div>
          <div class="card-sub">local time</div>
        </div>
        <div class="card">
          <div class="card-label">Sunset</div>
          <div class="card-value">${sunsetStr}</div>
          <div class="card-sub">local time</div>
        </div>
        <div class="card">
          <div class="card-label">Day Duration</div>
          <div class="card-value" style="font-size:18px;">${dayDur === '—' ? '—' : `${Math.floor(dayDur/60)}h ${dayDur%60}m`}</div>
          <div class="card-sub">sunrise to sunset</div>
        </div>
        <div class="card">
          <div class="card-label">Weekday</div>
          <div class="card-value" style="font-size:16px;">${vaarEn}</div>
          <div class="card-sub">${vaar}</div>
        </div>
      </div>

      <div class="section-head">Pañcāṅga — Five Limbs</div>
      <div class="pancha-grid" style="margin-bottom:1.25rem;">
        <div class="pancha-item">
          <div class="pancha-num">I</div>
          <div class="pancha-name">Tithi</div>
          <div class="pancha-value">${tithi.name}</div>
          <div class="pancha-sub">${tithi.paksha}</div>
          <div class="pancha-end">~${tithi.remaining.toFixed(1)}h left</div>
        </div>
        <div class="pancha-item">
          <div class="pancha-num">II</div>
          <div class="pancha-name">Nakshatra</div>
          <div class="pancha-value">${moonNak.name}</div>
          <div class="pancha-sub">Pada ${moonNak.pada}</div>
          <div class="pancha-end">~${moonNak.remaining.toFixed(1)}h left</div>
        </div>
        <div class="pancha-item">
          <div class="pancha-num">III</div>
          <div class="pancha-name">Yoga</div>
          <div class="pancha-value" style="color:${yoga.quality==='good'?'#7abf7a':yoga.quality==='bad'?'#e07070':'var(--gold2)'}">${yoga.name}</div>
          <div class="pancha-sub">No. ${yoga.idx+1}</div>
          <div class="pancha-end" style="color:${yoga.quality==='good'?'#5a8a5a':yoga.quality==='bad'?'#a05050':'var(--text3)'}">${yoga.quality}</div>
        </div>
        <div class="pancha-item">
          <div class="pancha-num">IV</div>
          <div class="pancha-name">Karana</div>
          <div class="pancha-value" style="color:${karana.quality==='bad'?'#e07070':'var(--gold2)'}">${karana.name}</div>
          <div class="pancha-sub">half-tithi</div>
          <div class="pancha-end" style="color:${karana.quality==='bad'?'#a05050':'var(--text3)'}">${karana.quality}</div>
        </div>
        <div class="pancha-item">
          <div class="pancha-num">V</div>
          <div class="pancha-name">Vaar</div>
          <div class="pancha-value" style="font-size:15px;">${vaarEn}</div>
          <div class="pancha-sub">${vaar}</div>
          <div class="pancha-end">${Panchang.VAAR_PLANETS[date.getDay()]}</div>
        </div>
      </div>

      <div class="section-head">Inauspicious Periods</div>
      <div class="grid-3" style="margin-bottom:1.25rem;">
        <div class="card card-red">
          <div class="card-label">Rahu Kaal</div>
          <div class="card-value" style="font-size:15px;">${rahuStr}</div>
          <div class="card-sub">avoid new beginnings</div>
        </div>
        <div class="card">
          <div class="card-label">Gulika Kaal</div>
          <div class="card-value" style="font-size:15px;">${gulikaStr}</div>
          <div class="card-sub">Saturn's malefic period</div>
        </div>
        <div class="card">
          <div class="card-label">Yamaghanta Kaal</div>
          <div class="card-value" style="font-size:15px;">${yamaStr}</div>
          <div class="card-sub">inauspicious for travel</div>
        </div>
      </div>

      <div class="zodiac-note">
        ✦ Tropical (Western) Zodiac · No Ayanamsa · ${AppState.locationName} (${AppState.lat.toFixed(3)}°N, ${AppState.lon.toFixed(3)}°E)
      </div>
    </div>
  `;
}

// Live clock
function startClock() {
  function tick() {
    const now = new Date();
    const cl = document.getElementById('live-clock');
    if (cl) {
      const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
      const ap = h >= 12 ? 'PM' : 'AM';
      cl.textContent = `${h%12||12}:${Panchang.pad(m)}:${Panchang.pad(s)} ${ap}`;
    }
    const dl = document.getElementById('live-date');
    if (dl) {
      const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      dl.textContent = `${days[now.getDay()]}, ${now.getDate()} ${Panchang.MONTHS_EN[now.getMonth()]} ${now.getFullYear()}`;
    }
  }
  tick();
  setInterval(tick, 1000);
}
