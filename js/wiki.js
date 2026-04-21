// ── VEDIC ASTROLOGY WIKI PAGE ──

const WIKI_TERMS = {
  'Ayanamsa': {
    definition: 'The precession of equinoxes; the difference between tropical and sidereal zodiac positions. In Vedic astrology, ayanamsa adjusts for the backward shift of the zodiac over centuries. This site uses tropical (no ayanamsa).',
    category: 'Zodiacs & Systems'
  },
  'Ascendant (Lagna)': {
    definition: 'The zodiac sign rising on the eastern horizon at the exact time and place of birth. It is the first house of the birth chart and represents the physical body, personality, and life path.',
    category: 'Houses & Placements'
  },
  'Aspect': {
    definition: 'Angular relationship between planets. Major aspects include conjunction (0°), sextile (60°), square (90°), trine (120°), and opposition (180°). Aspects modify how planets interact.',
    category: 'Planetary Relationships'
  },
  'Atmakaraka': {
    definition: 'The planet with the highest longitude in the birth chart; literally "significator of the soul". It reveals the soul\'s purpose and karmic direction in this lifetime.',
    category: 'Advanced Concepts'
  },
  'Bhavas': {
    definition: 'The 12 houses of the zodiac that represent different life areas: 1st = self, 2nd = wealth, 3rd = siblings, 4th = home, 5th = children, 6th = health, 7th = marriage, 8th = death/transformation, 9th = dharma, 10th = career, 11th = gains, 12th = loss/liberation.',
    category: 'Houses & Placements'
  },
  'Choghadiya': {
    definition: 'An ancient time calculation method dividing day and night into 8 parts. Each part is ruled by a planet and has varying auspiciousness levels (Amrit, Labh, Shubh, Kaal).',
    category: 'Auspicious Times'
  },
  'Conjunction': {
    definition: 'When two or more planets occupy the same or nearby zodiacal position. Conjunctions blend the energies of the planets, creating new combined effects.',
    category: 'Planetary Relationships'
  },
  'Dasha': {
    definition: 'Planetary period system used in Vedic astrology to time life events. The most popular is Vimshottari Dasha (120-year cycle divided among 9 planets).',
    category: 'Time Systems'
  },
  'Dosha': {
    definition: 'A flaw or defect in the birth chart. Famous doshas include Mangal Dosha (Mars affliction affecting marriage), Kaal Sarpa Dosha (nodes creating karmic bondage).',
    category: 'Afflictions'
  },
  'Exaltation': {
    definition: 'A zodiac sign where a planet is naturally stronger and more beneficial. For example, the Sun is exalted in Aries, Moon in Taurus, Mars in Capricorn.',
    category: 'Planetary Strengths'
  },
  'Graha': {
    definition: 'Sanskrit term for planet. In Vedic astrology, the 9 grahas are Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Rahu (north node), and Ketu (south node).',
    category: 'Planets'
  },
  'Hora': {
    definition: 'One of 24 hourly divisions of the day. Each hour is ruled by a planet in the Chaldean order. Used to determine auspicious timing for activities.',
    category: 'Auspicious Times'
  },
  'Jataka': {
    definition: 'A natal birth chart in Vedic astrology. It shows the positions of planets at the exact moment of birth and serves as the foundation for all astrological analysis.',
    category: 'Core Concepts'
  },
  'Karana': {
    definition: 'Half of a lunar day (tithi). There are 60 karanas in a 30-day lunar month. Certain karanas like Vishti are considered inauspicious for important activities.',
    category: 'Lunar Cycles'
  },
  'Kundli': {
    definition: 'A birth chart diagram (also called Jataka or Natal Chart) that maps the positions of planets and zodiac signs at the moment of birth. The foundation of Vedic astrological analysis.',
    category: 'Core Concepts'
  },
  'Lagna': {
    definition: 'The Ascendant; the zodiac sign rising at the eastern horizon at birth. It represents the native\'s personality, body, and overall life direction.',
    category: 'Houses & Placements'
  },
  'Mahadasha': {
    definition: 'A major planetary period in Vimshottari Dasha lasting several years. Each Mahadasha brings the influence of its ruling planet into focus.',
    category: 'Time Systems'
  },
  'Mantra': {
    definition: 'Sacred sound vibrations used in Vedic practices. Planetary mantras are chanted to appease or strengthen planets, often recommended based on chart analysis.',
    category: 'Remedies'
  },
  'Muhurta': {
    definition: 'An auspicious time period selected for performing important activities like marriage, starting a business, or housewarming. Determined by analyzing planetary positions.',
    category: 'Auspicious Times'
  },
  'Nakshatra': {
    definition: 'One of 27 lunar mansions that divide the ecliptic. The Moon\'s position among nakshatras is important in Vedic astrology. Each has unique characteristics and ruling deity.',
    category: 'Lunar System'
  },
  'Node (Rahu & Ketu)': {
    definition: 'Rahu (north node) and Ketu (south node) are shadow planets representing karmic points. Rahu brings desires and worldly pursuits; Ketu brings detachment and spiritual inclination.',
    category: 'Planets'
  },
  'Panchanga': {
    definition: 'The five limbs of Vedic timekeeping: Tithi (lunar day), Nakshatra (star), Yoga (conjunction), Karana (half-day), and Vara (day of week). Essential for calculating muhurta.',
    category: 'Time Systems'
  },
  'Rashi': {
    definition: 'A zodiac sign. There are 12 rashis: Aries to Pisces in tropical zodiac. The Rashi where a planet sits shows its basic nature and manifestation.',
    category: 'Zodiacs & Systems'
  },
  'Remedies (Upay)': {
    definition: 'Actions recommended to mitigate negative planetary influences. Include wearing gemstones, chanting mantras, performing pujas, charity, or behavioral adjustments.',
    category: 'Remedies'
  },
  'Retrograde': {
    definition: 'When a planet appears to move backward in the zodiac from Earth\'s perspective. Retrograde planets are considered afflicted and express their energies in unconventional ways.',
    category: 'Planetary Conditions'
  },
  'Samvat': {
    definition: 'Hindu calendar year. Vikram Samvat is one system; Shaka Samvat is another. Used alongside Western calendar in Hindu timekeeping.',
    category: 'Calendars'
  },
  'Sidereal': {
    definition: 'Zodiac system based on actual constellations in the sky. Vedic astrology traditionally uses sidereal zodiac with ayanamsa adjustment. Differs from tropical (Western) zodiac.',
    category: 'Zodiacs & Systems'
  },
  'Significance of Houses': {
    definition: '1st = Self, 2nd = Finances, 3rd = Communication, 4th = Home, 5th = Creativity, 6th = Health, 7th = Marriage, 8th = Transformation, 9th = Philosophy, 10th = Career, 11th = Wishes, 12th = Spirituality.',
    category: 'Houses & Placements'
  },
  'Tithi': {
    definition: 'A lunar day, the period between two consecutive new moons/full moons. There are 30 tithis in a lunar month. Important for timing ceremonies and analyzing chart.',
    category: 'Lunar Cycles'
  },
  'Tropical Zodiac': {
    definition: 'Zodiac system based on the spring equinox as 0° Aries. Used in Western astrology. This site uses tropical zodiac without ayanamsa adjustment.',
    category: 'Zodiacs & Systems'
  },
  'Vara': {
    definition: 'Day of the week. The 7 varas are Sunday (Sun), Monday (Moon), Tuesday (Mars), Wednesday (Mercury), Thursday (Jupiter), Friday (Venus), Saturday (Saturn).',
    category: 'Time Systems'
  },
  'Yoga': {
    definition: 'A conjunction of Sun and Moon longitude expressed as a degree. There are 27 yogas, each with specific qualities. Important in Panchanga calculation.',
    category: 'Conjunctions'
  },
  'Zodiac': {
    definition: 'The celestial band of 360° divided into 12 equal signs of 30° each. It represents the apparent path of the Sun through the sky and serves as the reference frame for all astrology.',
    category: 'Zodiacs & Systems'
  }
};

function initWikiPage() {
  renderWiki();
}

function renderWiki() {
  const container = document.getElementById('wiki-container');
  if (!container) return;

  const html = Object.entries(WIKI_TERMS)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([term, data]) => `
      <div class="wiki-card" style="break-inside:avoid;margin-bottom:1.5rem;padding:1.25rem;background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-lg);">
        <div style="font-size:13px;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">${data.category}</div>
        <div style="font-family:var(--font-display);font-size:18px;color:var(--gold2);margin-bottom:10px;font-weight:500;">${term}</div>
        <div style="font-size:13px;color:var(--text2);line-height:1.7;">${data.definition}</div>
      </div>
    `)
    .join('');

  container.innerHTML = html;
}

function filterWikiTerms() {
  const searchInput = document.getElementById('wiki-search')?.value.toLowerCase() || '';
  const container = document.getElementById('wiki-container');
  if (!container) return;

  if (!searchInput) {
    renderWiki();
    return;
  }

  const filtered = Object.entries(WIKI_TERMS)
    .filter(([term, data]) => 
      term.toLowerCase().includes(searchInput) || 
      data.definition.toLowerCase().includes(searchInput) ||
      data.category.toLowerCase().includes(searchInput)
    )
    .sort((a, b) => a[0].localeCompare(b[0]));

  const html = filtered
    .map(([term, data]) => `
      <div class="wiki-card" style="break-inside:avoid;margin-bottom:1.5rem;padding:1.25rem;background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-lg);">
        <div style="font-size:13px;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">${data.category}</div>
        <div style="font-family:var(--font-display);font-size:18px;color:var(--gold2);margin-bottom:10px;font-weight:500;">${term}</div>
        <div style="font-size:13px;color:var(--text2);line-height:1.7;">${data.definition}</div>
      </div>
    `)
    .join('');

  container.innerHTML = html || '<div style="text-align:center;padding:40px;color:var(--text3);">No terms found matching your search.</div>';
}
