/* =========================================================
   OptiCrop — Script.js Code
   ========================================================= */

/* ===== Mobile hamburger menu (X open/close) ===== */
function toggleMenu() {
  const links = document.getElementById('navLinks');
  const burger = document.getElementById('hamburgerBtn');
  links.classList.toggle('open');
  burger.classList.toggle('open');
}
function closeMenu() {
  const links = document.getElementById('navLinks');
  const burger = document.getElementById('hamburgerBtn');
  if (links) links.classList.remove('open');
  if (burger) burger.classList.remove('open');
}

/* ===== Crop Emoji Map (only crops present in Crop_recommendation.csv) ===== */
const cropEmojis = {
  rice: '🌾', maize: '🌽', chickpea: '🫘', kidneybeans: '🫘',
  pigeonpeas: '🌿', mothbeans: '🫘', mungbean: '🫛', blackgram: '🫛',
  lentil: '🌱', pomegranate: '🍎', banana: '🍌', mango: '🥭',
  grapes: '🍇', watermelon: '🍉', muskmelon: '🍈', apple: '🍎',
  orange: '🍊', papaya: '🍈', coconut: '🥥', cotton: '☁️',
  jute: '🌿', coffee: '☕'
};

/* ===== Dataset reference =====*/
const cropCentroids = {
  rice:        { N: 79.89,  P: 47.58,  K: 39.87,  temperature: 23.69, humidity: 82.27, ph: 6.43, rainfall: 236.18 },
  maize:       { N: 77.76,  P: 48.44,  K: 19.79,  temperature: 22.39, humidity: 65.09, ph: 6.25, rainfall: 84.77  },
  chickpea:    { N: 40.09,  P: 67.79,  K: 79.92,  temperature: 18.87, humidity: 16.86, ph: 7.34, rainfall: 80.06  },
  kidneybeans: { N: 20.75,  P: 67.54,  K: 20.05,  temperature: 20.12, humidity: 21.61, ph: 5.75, rainfall: 105.92 },
  pigeonpeas:  { N: 20.73,  P: 67.73,  K: 20.29,  temperature: 27.74, humidity: 48.06, ph: 5.79, rainfall: 149.46 },
  mothbeans:   { N: 21.44,  P: 48.01,  K: 20.23,  temperature: 28.19, humidity: 53.16, ph: 6.83, rainfall: 51.20  },
  mungbean:    { N: 20.99,  P: 47.28,  K: 19.87,  temperature: 28.53, humidity: 85.50, ph: 6.72, rainfall: 48.40  },
  blackgram:   { N: 40.02,  P: 67.47,  K: 19.24,  temperature: 29.97, humidity: 65.12, ph: 7.13, rainfall: 67.88  },
  lentil:      { N: 18.77,  P: 68.36,  K: 19.41,  temperature: 24.51, humidity: 64.80, ph: 6.93, rainfall: 45.68  },
  pomegranate: { N: 18.87,  P: 18.75,  K: 40.21,  temperature: 21.84, humidity: 90.13, ph: 6.43, rainfall: 107.53 },
  banana:      { N: 100.23, P: 82.01,  K: 50.05,  temperature: 27.38, humidity: 80.36, ph: 5.98, rainfall: 104.63 },
  mango:       { N: 20.07,  P: 27.18,  K: 29.92,  temperature: 31.21, humidity: 50.16, ph: 5.77, rainfall: 94.70  },
  grapes:      { N: 23.18,  P: 132.53, K: 200.11, temperature: 23.85, humidity: 81.88, ph: 6.03, rainfall: 69.61  },
  watermelon:  { N: 99.42,  P: 17.00,  K: 50.22,  temperature: 25.59, humidity: 85.16, ph: 6.50, rainfall: 50.79  },
  muskmelon:   { N: 100.32, P: 17.72,  K: 50.08,  temperature: 28.66, humidity: 92.34, ph: 6.36, rainfall: 24.69  },
  apple:       { N: 20.80,  P: 134.22, K: 199.89, temperature: 22.63, humidity: 92.33, ph: 5.93, rainfall: 112.65 },
  orange:      { N: 19.58,  P: 16.55,  K: 10.01,  temperature: 22.77, humidity: 92.17, ph: 7.02, rainfall: 110.47 },
  papaya:      { N: 49.88,  P: 59.05,  K: 50.04,  temperature: 33.72, humidity: 92.40, ph: 6.74, rainfall: 142.63 },
  coconut:     { N: 21.98,  P: 16.93,  K: 30.59,  temperature: 27.41, humidity: 94.84, ph: 5.98, rainfall: 175.69 },
  cotton:      { N: 117.77, P: 46.24,  K: 19.56,  temperature: 23.99, humidity: 79.84, ph: 6.91, rainfall: 80.40  },
  jute:        { N: 78.40,  P: 46.86,  K: 39.99,  temperature: 24.96, humidity: 79.64, ph: 6.73, rainfall: 174.79 },
  coffee:      { N: 101.20, P: 28.74,  K: 29.94,  temperature: 25.54, humidity: 58.87, ph: 6.79, rainfall: 158.07 }
};

const featureScale = { N: 36, P: 32, K: 50, temperature: 5, humidity: 20, ph: 0.8, rainfall: 70 };

function ruleBasedPredict(n, p, k, temp, humidity, ph, rainfall) {
  const input = { N: n, P: p, K: k, temperature: temp, humidity: humidity, ph: ph, rainfall: rainfall };
  let best = null, bestDist = Infinity, secondBestDist = Infinity;

  for (const crop in cropCentroids) {
    const c = cropCentroids[crop];
    let distSq = 0;
    for (const key in c) {
      const diff = (input[key] - c[key]) / featureScale[key];
      distSq += diff * diff;
    }
    const dist = Math.sqrt(distSq);
    if (dist < bestDist) { secondBestDist = bestDist; bestDist = dist; best = crop; }
    else if (dist < secondBestDist) { secondBestDist = dist; }
  }

  const margin = secondBestDist === Infinity ? 1 : (secondBestDist - bestDist) / (secondBestDist + 0.001);
  let confidence = Math.round(60 + margin * 39);
  confidence = Math.max(60, Math.min(99, confidence));
  return { crop: best, confidence: confidence };
}

function getSeason(temp, rainfall) {
  if (temp >= 30 && rainfall >= 150) return 'Rainy (Kharif) 🌧️';
  if (temp >= 25 && rainfall < 150) return 'Summer (Zaid) ☀️';
  if (temp < 15) return 'Winter (Rabi) ❄️';
  return 'Spring 🌸';
}

/* ===== Field validation helper ===== */
function validateField(id, min, max) {
  const input = document.getElementById(id);
  const errorEl = document.getElementById(id + '-error');
  const val = parseFloat(input.value);
  const valid = !isNaN(val) && val >= min && val <= max;
  if (errorEl) errorEl.style.display = valid ? 'none' : 'block';
  input.style.borderColor = valid ? '' : '#c0392b';
  return valid;
}

/* ===== Predict button (used on prediction.html) ===== */
function predictCrop() {
  const fields = [
    ['nitrogen', 0, 140], ['phosphorous', 5, 145], ['potassium', 5, 205],
    ['temperature', 8, 45], ['humidity', 14, 100], ['ph', 3.5, 10], ['rainfall', 20, 300]
  ];

  let allValid = true;
  fields.forEach(([id, min, max]) => {
    if (!validateField(id, min, max)) allValid = false;
  });

  if (!allValid) {
    showToast('⚠️ Please check the highlighted fields', true);
    return;
  }

  const n  = parseFloat(document.getElementById('nitrogen').value);
  const p  = parseFloat(document.getElementById('phosphorous').value);
  const k  = parseFloat(document.getElementById('potassium').value);
  const t  = parseFloat(document.getElementById('temperature').value);
  const h  = parseFloat(document.getElementById('humidity').value);
  const ph = parseFloat(document.getElementById('ph').value);
  const rf = parseFloat(document.getElementById('rainfall').value);

  const prediction = ruleBasedPredict(n, p, k, t, h, ph, rf);
  const crop = prediction.crop;
  const confidence = prediction.confidence + '%';
  const season = getSeason(t, rf);

  const data = { n, p, k, t, h, ph, rf, crop, confidence, season };
  sessionStorage.setItem('opticrop_result', JSON.stringify(data));

  window.location.href = 'result.html';
}

/* ===== Load result (used on result.html) ===== */
function loadResult() {
  const raw = sessionStorage.getItem('opticrop_result');
  if (!raw) {
    window.location.href = 'prediction.html';
    return;
  }
  const data = JSON.parse(raw);
  const emoji = cropEmojis[data.crop] || '🌱';
  const cropDisplay = data.crop.charAt(0).toUpperCase() + data.crop.slice(1);

  document.getElementById('res-crop').textContent = cropDisplay;
  document.getElementById('res-conf').textContent = data.confidence;
  document.getElementById('res-season').textContent = data.season;
  document.getElementById('res-emoji').textContent = emoji;

  document.getElementById('r-n').textContent  = data.n  + ' mg/kg';
  document.getElementById('r-p').textContent  = data.p  + ' mg/kg';
  document.getElementById('r-k').textContent  = data.k  + ' mg/kg';
  document.getElementById('r-t').textContent  = data.t  + ' °C';
  document.getElementById('r-h').textContent  = data.h  + ' %';
  document.getElementById('r-ph').textContent = data.ph;
  document.getElementById('r-rf').textContent = data.rf + ' mm';
}

/* ===== Contact form (used on contact.html) ===== */
function sendMessage() {
  const name = document.getElementById('c-name').value.trim();
  const email = document.getElementById('c-email').value.trim();
  const msg = document.getElementById('c-msg').value.trim();

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  let ok = true;
  if (!name) { document.getElementById('c-name-error').style.display = 'block'; ok = false; }
  else { document.getElementById('c-name-error').style.display = 'none'; }

  if (!emailValid) { document.getElementById('c-email-error').style.display = 'block'; ok = false; }
  else { document.getElementById('c-email-error').style.display = 'none'; }

  if (!msg) { document.getElementById('c-msg-error').style.display = 'block'; ok = false; }
  else { document.getElementById('c-msg-error').style.display = 'none'; }

  if (!ok) { showToast('⚠️ Please fill in all fields correctly', true); return; }

  document.getElementById('c-name').value = '';
  document.getElementById('c-email').value = '';
  document.getElementById('c-msg').value = '';
  showToast('✅ Message sent successfully!');
}

/* ===== Toast (shared) ===== */
function showToast(msg, isError) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.classList.toggle('error', !!isError);
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

/* ===== Highlight active nav link + close menu on link click ===== */
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
    a.addEventListener('click', closeMenu);
  });
});
