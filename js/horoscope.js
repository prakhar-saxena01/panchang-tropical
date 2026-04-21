// ── HOROSCOPE CALCULATOR PAGE ──
const HOROSCOPE_PREDICTIONS = {
  Aries: {
    today: "Mars energy brings passion and determination. Focus on action and leadership today.",
    week: "Planetary movements suggest a week of new beginnings. Career matters look favorable.",
    month: "This month brings opportunities for growth and success. Be open to new possibilities.",
    year: "A transformative year ahead. Major changes in personal and professional life."
  },
  Taurus: {
    today: "Venus favors stability and comfort. A good day for financial matters and relationships.",
    week: "Financial gains are possible. Focus on consolidating resources this week.",
    month: "This month emphasizes security and material comfort. Good for savings and investments.",
    year: "A prosperous year with steady growth. Stability in relationships and finances."
  },
  Gemini: {
    today: "Mercury brings communication and intellect to the fore. Good for networking and learning.",
    week: "A week of intellectual pursuits and social connections. Express yourself clearly.",
    month: "This month favors communication, travel, and learning new skills.",
    year: "A year of mental growth and communication. Success through words and intellect."
  },
  Cancer: {
    today: "The Moon influences emotions and home matters. Focus on family and emotional well-being.",
    week: "Domestic matters take priority. A good week for family gatherings and home improvements.",
    month: "This month emphasizes emotional security and family bonds. Nurture relationships.",
    year: "A year focused on home, family, and emotional foundations."
  },
  Leo: {
    today: "The Sun boosts confidence and creativity. A great day for creative and personal projects.",
    week: "Creative energy flows freely. Focus on self-expression and leisure activities.",
    month: "This month brings recognition and appreciation. Pursue creative endeavors.",
    year: "A year of self-expression and personal achievement. Step into the spotlight."
  },
  Virgo: {
    today: "Mercury supports attention to detail and analysis. Good for planning and organizing.",
    week: "A practical week for getting things done. Focus on efficiency and improvement.",
    month: "This month emphasizes organization and improvement. Perfect for planning and analysis.",
    year: "A year of refinement and improvement. Success through attention to detail."
  },
  Libra: {
    today: "Venus brings harmony and beauty. A good day for relationships and aesthetics.",
    week: "A harmonious week. Focus on relationships and creating balance in your life.",
    month: "This month favors relationships and partnerships. Beauty and harmony prevail.",
    year: "A year of balance and relationships. Success through cooperation."
  },
  Scorpio: {
    today: "Pluto brings intensity and transformation. Focus on deep insights and hidden truths.",
    week: "A week of introspection and transformation. Go deeper into important matters.",
    month: "This month brings transformative opportunities. Embrace necessary changes.",
    year: "A transformative year. Release the old and embrace the new."
  },
  Sagittarius: {
    today: "Jupiter brings expansion and optimism. A fortunate day for growth and adventure.",
    week: "An expansive week. Pursue new opportunities and broaden your horizons.",
    month: "This month brings good fortune and expansion. Travel and learning favored.",
    year: "A year of growth, expansion, and good fortune. Pursue your dreams."
  },
  Capricorn: {
    today: "Saturn brings discipline and structure. A good day for serious work and responsibility.",
    week: "A week for solid progress. Focus on building foundations and long-term goals.",
    month: "This month emphasizes responsibility and structure. Work on important projects.",
    year: "A year of achievement through hard work and discipline."
  },
  Aquarius: {
    today: "Uranus brings innovation and change. A day for new ideas and unconventional thinking.",
    week: "An innovative week. Embrace new perspectives and ideas.",
    month: "This month brings fresh perspectives and new connections. Be creative.",
    year: "A year of innovation and progress. Embrace change and new possibilities."
  },
  Pisces: {
    today: "Neptune brings intuition and imagination. Trust your instincts and creative visions.",
    week: "A spiritual and intuitive week. Listen to your inner wisdom.",
    month: "This month emphasizes intuition and creativity. Follow your dreams.",
    year: "A year of spiritual growth and creative expression."
  }
};

function initHoroscopePage() {
  const signSelect = document.getElementById('horo-sign');
  if (signSelect && signSelect.value === '') {
    generateHoroscope();
  }
}

function generateHoroscope() {
  const sign = document.getElementById('horo-sign')?.value;
  const range = document.getElementById('horo-range')?.value || 'today';
  const container = document.getElementById('horoscope-container');

  if (!sign) {
    container.innerHTML = '<div class="content"><p style="color:var(--text3);text-align:center;padding:40px;">Select your zodiac sign to see horoscope predictions</p></div>';
    return;
  }

  const pred = HOROSCOPE_PREDICTIONS[sign];
  if (!pred) return;

  const today = new Date();
  let dateRange = 'Today';
  let prediction = pred.today;
  let startDate = new Date(today);
  let endDate = new Date(today);

  if (range === 'week') {
    dateRange = 'This Week';
    prediction = pred.week;
    endDate.setDate(endDate.getDate() + 7);
  } else if (range === 'month') {
    dateRange = 'This Month';
    prediction = pred.month;
    endDate.setMonth(endDate.getMonth() + 1);
  } else if (range === 'year') {
    dateRange = 'This Year';
    prediction = pred.year;
    endDate.setFullYear(endDate.getFullYear() + 1);
  }

  const signIndex = SIGNS.indexOf(sign);
  const signIcon = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'][signIndex] || '';

  container.innerHTML = `
    <div class="content">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:1.5rem;">
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-lg);padding:2rem;text-align:center;">
          <div style="font-size:48px;margin-bottom:12px;">${signIcon}</div>
          <div style="font-family:var(--font-display);font-size:32px;color:var(--gold2);margin-bottom:8px;">${sign}</div>
          <div style="color:var(--text3);font-size:12px;text-transform:uppercase;letter-spacing:1px;">Sun Sign Horoscope</div>
        </div>

        <div style="background:var(--bg3);border:1px solid var(--border);border-radius:var(--radius-lg);padding:2rem;display:flex;flex-direction:column;justify-content:center;">
          <div style="font-size:12px;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Period</div>
          <div style="font-family:var(--font-display);font-size:28px;color:var(--gold2);margin-bottom:12px;">${dateRange}</div>
          <div style="font-size:12px;color:var(--text3);">
            ${Panchang.fmt12(startDate)} - ${Panchang.fmt12(endDate)}<br>
            Duration: ${getDurationText(range)}
          </div>
        </div>
      </div>

      <div style="background:linear-gradient(135deg,var(--bg2) 0%,var(--bg3) 100%);border:1px solid var(--border);border-radius:var(--radius-lg);padding:2rem;margin-bottom:1.5rem;border-left:4px solid var(--gold);">
        <div style="font-size:12px;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">Prediction</div>
        <div style="font-size:16px;color:var(--text);line-height:1.8;font-style:italic;">
          "${prediction}"
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:1.5rem;">
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem;">
          <div style="font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Lucky Color</div>
          <div style="font-size:14px;font-weight:bold;color:var(--text);">${getLuckyColor(sign)}</div>
        </div>
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem;">
          <div style="font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Lucky Number</div>
          <div style="font-size:14px;font-weight:bold;color:var(--text);">${getLuckyNumber(sign)}</div>
        </div>
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem;">
          <div style="font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Lucky Gem</div>
          <div style="font-size:14px;font-weight:bold;color:var(--text);">${getLuckyGem(sign)}</div>
        </div>
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);padding:1.5rem;">
          <div style="font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Lucky Day</div>
          <div style="font-size:14px;font-weight:bold;color:var(--text);">${getLuckyDay(sign)}</div>
        </div>
      </div>

      <div style="padding:1rem;background:var(--bg3);border-radius:var(--radius);font-size:12px;color:var(--text3);border:1px solid var(--border);">
        <strong>Note:</strong> This horoscope is based on Sun sign astrology (tropical zodiac). For detailed predictions, consult a professional Jyotishi. Predictions are general and should be combined with your complete birth chart analysis.
      </div>
    </div>
  `;
}

function getDurationText(range) {
  const texts = {
    today: '24 hours',
    week: '7 days',
    month: '30 days',
    year: '365 days'
  };
  return texts[range] || '24 hours';
}

function getLuckyColor(sign) {
  const colors = {
    Aries: 'Red', Taurus: 'Green', Gemini: 'Yellow', Cancer: 'White',
    Leo: 'Gold', Virgo: 'Green', Libra: 'Blue', Scorpio: 'Crimson',
    Sagittarius: 'Purple', Capricorn: 'Brown', Aquarius: 'Blue', Pisces: 'Sea Green'
  };
  return colors[sign] || 'Gold';
}

function getLuckyNumber(sign) {
  const numbers = {
    Aries: '9', Taurus: '6', Gemini: '5', Cancer: '2',
    Leo: '1', Virgo: '5', Libra: '6', Scorpio: '8',
    Sagittarius: '3', Capricorn: '8', Aquarius: '4', Pisces: '7'
  };
  return numbers[sign] || '1';
}

function getLuckyGem(sign) {
  const gems = {
    Aries: 'Ruby', Taurus: 'Diamond', Gemini: 'Emerald', Cancer: 'Pearl',
    Leo: 'Ruby', Virgo: 'Emerald', Libra: 'Diamond', Scorpio: 'Topaz',
    Sagittarius: 'Topaz', Capricorn: 'Blue Sapphire', Aquarius: 'Blue Sapphire', Pisces: 'Yellow Sapphire'
  };
  return gems[sign] || 'Ruby';
}

function getLuckyDay(sign) {
  const days = {
    Aries: 'Tuesday', Taurus: 'Friday', Gemini: 'Wednesday', Cancer: 'Monday',
    Leo: 'Sunday', Virgo: 'Wednesday', Libra: 'Friday', Scorpio: 'Tuesday',
    Sagittarius: 'Thursday', Capricorn: 'Saturday', Aquarius: 'Saturday', Pisces: 'Thursday'
  };
  return days[sign] || 'Sunday';
}
