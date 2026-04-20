// ── LOCATION & STATE ──

window.AppState = {
  lat: 25.3176,
  lon: 82.9739,
  locationName: 'Varanasi, India',
  date: new Date(),
};

async function geocodeCity(query) {
  try {
    const r = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`);
    const d = await r.json();
    if (d && d.length > 0) {
      return { lat: parseFloat(d[0].lat), lon: parseFloat(d[0].lon), name: d[0].display_name.split(',').slice(0,2).join(',').trim() };
    }
  } catch(e) {}
  return null;
}

async function setLocationFromInput(val) {
  val = val.trim();
  if (!val) return;
  const parts = val.split(',');
  if (parts.length === 2 && !isNaN(parseFloat(parts[0])) && !isNaN(parseFloat(parts[1]))) {
    AppState.lat = parseFloat(parts[0]);
    AppState.lon = parseFloat(parts[1]);
    AppState.locationName = `${parseFloat(parts[0]).toFixed(3)}°, ${parseFloat(parts[1]).toFixed(3)}°`;
    refreshAll();
    updateLocDisplay();
    return;
  }
  const result = await geocodeCity(val);
  if (result) {
    AppState.lat = result.lat;
    AppState.lon = result.lon;
    AppState.locationName = result.name;
    refreshAll();
    updateLocDisplay();
  } else {
    alert('Location not found. Try "City, Country" or "lat,lon".');
  }
}

function autoLocate() {
  if (!navigator.geolocation) { alert('Geolocation not supported.'); return; }
  navigator.geolocation.getCurrentPosition(async pos => {
    AppState.lat = pos.coords.latitude;
    AppState.lon = pos.coords.longitude;
    try {
      const r = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${AppState.lat}&lon=${AppState.lon}&format=json`);
      const d = await r.json();
      AppState.locationName = d.address?.city || d.address?.town || d.address?.village || 'Your Location';
    } catch(e) { AppState.locationName = 'Your Location'; }
    refreshAll();
    updateLocDisplay();
  }, () => alert('Could not get location. Enter a city manually.'));
}

function updateLocDisplay() {
  document.querySelectorAll('.loc-input').forEach(el => el.value = AppState.locationName);
  const mini = document.getElementById('loc-mini');
  if (mini) mini.textContent = AppState.locationName;
}

function refreshAll() {
  if (typeof renderToday === 'function') renderToday();
  if (typeof renderCalendar === 'function') renderCalendar();
  if (typeof renderHora === 'function') renderHora();
}

// Global location search handler
window.handleLocSearch = async function(inputId) {
  const el = document.getElementById(inputId);
  if (el) await setLocationFromInput(el.value);
};

window.handleAutoLocate = autoLocate;
