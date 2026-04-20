// ── TROPICAL PANCHANG ENGINE ──
// All calculations use Tropical (Western) zodiac — NO ayanamsa

const SIGNS = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
const SIGNS_SA = ['मेष','वृष','मिथुन','कर्क','सिंह','कन्या','तुला','वृश्चिक','धनु','मकर','कुम्भ','मीन'];

const NAKSHATRAS = [
  'Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu','Pushya','Ashlesha',
  'Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha',
  'Mula','Purva Ashadha','Uttara Ashadha','Shravana','Dhanishtha','Shatabhisha',
  'Purva Bhadrapada','Uttara Bhadrapada','Revati'
];

const NAKSHATRA_LORDS = ['Ketu','Venus','Sun','Moon','Mars','Rahu','Jupiter','Saturn','Mercury',
  'Ketu','Venus','Sun','Moon','Mars','Rahu','Jupiter','Saturn','Mercury',
  'Ketu','Venus','Sun','Moon','Mars','Rahu','Jupiter','Saturn','Mercury'];

const YOGAS = [
  'Vishkambha','Priti','Ayushman','Saubhagya','Shobhana','Atiganda','Sukarma','Dhriti','Shula',
  'Ganda','Vriddhi','Dhruva','Vyaghata','Harshana','Vajra','Siddhi','Vyatipata','Variyan',
  'Parigha','Shiva','Siddha','Sadhya','Shubha','Shukla','Brahma','Indra','Vaidhriti'
];
const YOGA_GOOD = [1,3,4,5,7,8,10,11,12,15,16,19,20,21,22,23,24,25,26];
const YOGA_BAD  = [0,5,8,13,14,16,18,26];

const KARANAS = ['Kimstughna','Bava','Balava','Kaulava','Taitila','Gara','Vanija','Vishti','Shakuni','Chatushpada','Naga'];
const KARANA_BAD = ['Vishti','Kimstughna'];

const TITHI_NAMES = [
  'Pratipada','Dwitiya','Tritiya','Chaturthi','Panchami','Shashti','Saptami',
  'Ashtami','Navami','Dashami','Ekadashi','Dwadashi','Trayodashi','Chaturdashi'
];

const VAAR = ['Ravivaar','Somvaar','Mangalvaar','Budhvaar','Guruvaar','Shukravaar','Shanivaar'];
const VAAR_EN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const VAAR_PLANETS = ['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn'];

const HORA_SEQUENCE = ['Saturn','Jupiter','Mars','Sun','Venus','Mercury','Moon'];
const HORA_DAY_START = [0,1,2,3,4,5,6]; // Sunday=Sun, Monday=Moon, ...

const PLANETS_HORA = {
  Sun:    { symbol:'☉', color:'#e8c97a' },
  Moon:   { symbol:'☽', color:'#aacce8' },
  Mars:   { symbol:'♂', color:'#e07070' },
  Mercury:{ symbol:'☿', color:'#8acc8a' },
  Jupiter:{ symbol:'♃', color:'#e8d8a0' },
  Venus:  { symbol:'♀', color:'#e8a8c8' },
  Saturn: { symbol:'♄', color:'#a8b8c8' },
};

const RITU_LIST = [
  { months:[2,3], name:'Vasanta', en:'Spring' },
  { months:[4,5], name:'Grishma', en:'Summer' },
  { months:[6,7], name:'Varsha',  en:'Monsoon' },
  { months:[8,9], name:'Sharad',  en:'Autumn' },
  { months:[10,11],name:'Hemanta',en:'Pre-Winter' },
  { months:[0,1], name:'Shishira',en:'Winter' },
];

const LUNAR_MONTHS = ['Chaitra','Vaishakha','Jyeshtha','Ashadha','Shravana','Bhadrapada','Ashwin','Kartika','Margashirsha','Pausha','Magha','Phalguna'];

function julianDate(date) {
  const Y=date.getUTCFullYear(),M=date.getUTCMonth()+1,D=date.getUTCDate();
  const h=date.getUTCHours()+date.getUTCMinutes()/60+date.getUTCSeconds()/3600;
  let A=Math.floor((14-M)/12),y=Y+4800-A,m=M+12*A-3;
  let JDN=D+Math.floor((153*m+2)/5)+365*y+Math.floor(y/4)-Math.floor(y/100)+Math.floor(y/400)-32045;
  return JDN-0.5+h/24;
}

function sunLongitude(jd) {
  const n=jd-2451545.0, T=n/36525;
  const L=((280.46646+36000.76983*T)%360+360)%360;
  const g=((357.52911+35999.05029*T)%360+360)%360*Math.PI/180;
  const C=1.9146*Math.sin(g)+0.019993*Math.sin(2*g)+0.00029*Math.sin(3*g);
  return ((L+C)%360+360)%360;
}

function moonLongitude(jd) {
  const n=jd-2451545.0, T=n/36525;
  const L=((218.3164477+481267.88123421*T)%360+360)%360;
  const D=((297.8501921+445267.1114034*T)%360+360)%360*Math.PI/180;
  const M=((357.5291092+35999.0502909*T)%360+360)%360*Math.PI/180;
  const Mp=((134.9633964+477198.8675055*T)%360+360)%360*Math.PI/180;
  const F=((93.2720950+483202.0175233*T)%360+360)%360*Math.PI/180;
  let lon=L;
  lon+=6.289*Math.sin(Mp)-1.274*Math.sin(2*D-Mp)+0.658*Math.sin(2*D)
      -0.214*Math.sin(2*Mp)-0.185*Math.sin(M)-0.114*Math.sin(2*F)
      +0.059*Math.sin(2*D-2*Mp)+0.057*Math.sin(2*D-M-Mp)
      +0.053*Math.sin(2*D+Mp)+0.046*Math.sin(2*D-M)
      +0.041*Math.sin(Mp-M)-0.034*Math.sin(D)+0.030*Math.sin(Mp+M);
  return ((lon%360)+360)%360;
}

function getTithi(sunL, moonL) {
  const diff=((moonL-sunL)%360+360)%360;
  const tNum=Math.floor(diff/12)+1; // 1-30
  const isShukla=tNum<=15;
  const adj=isShukla?tNum:tNum-15;
  const name=adj<=14?TITHI_NAMES[adj-1]:(isShukla?'Purnima':'Amavasya');
  const paksha=isShukla?'Shukla Paksha':'Krishna Paksha';
  const remaining=(Math.ceil(diff/12)*12-diff)/12*24;
  return { num:tNum, name, paksha, remaining, diff };
}

function getNakshatra(lon) {
  const span=360/27;
  const idx=Math.floor(lon/span)%27;
  const inNaksh=lon%span;
  const pada=Math.floor(inNaksh/(span/4))+1;
  const remaining=(span-inNaksh)/span*24;
  return { name:NAKSHATRAS[idx], pada, idx, lord:NAKSHATRA_LORDS[idx], remaining };
}

function getYoga(sunL, moonL) {
  const combined=((sunL+moonL)%360+360)%360;
  const idx=Math.floor(combined/(360/27))%27;
  const quality=YOGA_GOOD.includes(idx)?'good':YOGA_BAD.includes(idx)?'bad':'neutral';
  return { name:YOGAS[idx], idx, quality };
}

function getKarana(sunL, moonL) {
  const diff=((moonL-sunL)%360+360)%360;
  const karNum=Math.floor(diff/6); // 0-59
  let name;
  if(karNum===0) name=KARANAS[0];
  else {
    const movable=(karNum-1)%7;
    const fixedKar=[8,9,10,0]; // Shakuni, Chatushpada, Naga, Kimstughna cycle for last 4
    if(karNum>=57) name=KARANAS[fixedKar[(karNum-57)%4]];
    else name=KARANAS[1+movable];
  }
  const quality=KARANA_BAD.includes(name)?'bad':'good';
  return { name, quality };
}

function getTropicalSign(lon) { return SIGNS[Math.floor(lon/30)%12]; }
function getDegInSign(lon) {
  const d=lon%30;
  return `${Math.floor(d)}° ${String(Math.floor((d%1)*60)).padStart(2,'0')}'`;
}

function getSunriseSet(lat, lon, date) {
  const JD=julianDate(new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),12)));
  const n=JD-2451545.0, T=n/36525;
  const lw=-lon*Math.PI/180, phi=lat*Math.PI/180;
  const M=((357.5291+0.98560028*n)%360+360)%360*Math.PI/180;
  const C=1.9148*Math.sin(M)+0.02*Math.sin(2*M)+0.0003*Math.sin(3*M);
  const lam=(((57.2958*M*180/Math.PI)+C+180+102.9372)%360+360)%360*Math.PI/180;
  const sinDec=Math.sin(lam)*Math.sin(23.45*Math.PI/180);
  const cosDec=Math.cos(Math.asin(sinDec));
  const cosH=(Math.sin(-0.83*Math.PI/180)-Math.sin(phi)*sinDec)/(Math.cos(phi)*cosDec);
  if(Math.abs(cosH)>1) return null;
  const H=Math.acos(cosH);
  const nApprox=n-lw/(2*Math.PI), J0=Math.round(nApprox)+lw/(2*Math.PI*-1);
  const Jtransit=2451545.0+0.0009-lw/(2*Math.PI)+Math.round(n+lw/(2*Math.PI))*1+0.0053*Math.sin(M)-0.0069*Math.sin(2*lam);
  const Jset=Jtransit+H/(2*Math.PI), Jrise=Jtransit-H/(2*Math.PI);
  const toDate=jd=>{const ms=(jd-2440587.5)*86400000;return new Date(ms);};
  return { sunrise:toDate(Jrise), sunset:toDate(Jset), duration:(Jset-Jrise)*24*60 };
}

function getKaalTime(sunrise, sunset, day, segIndex) {
  const dur=(sunset-sunrise)/8;
  const start=new Date(sunrise.getTime()+segIndex*dur);
  const end=new Date(sunrise.getTime()+(segIndex+1)*dur);
  return {start,end};
}
const RAHU_SEGMENTS = [7,1,6,4,5,3,2]; // Sun-Sat (0-based segment)
const GULIKA_SEGMENTS = [5,4,3,2,1,0,6];
const YAMA_SEGMENTS = [3,2,1,0,5,4,6];

function getKaal(sunrise, sunset, dayOfWeek, type) {
  const segs={rahu:RAHU_SEGMENTS,gulika:GULIKA_SEGMENTS,yama:YAMA_SEGMENTS};
  return getKaalTime(sunrise, sunset, dayOfWeek, segs[type][dayOfWeek]);
}

function getSamvat(date) {
  const y=date.getFullYear(), m=date.getMonth();
  return { vikram:(m>=3)?y+57:y+56, shaka:(m>=3)?y-78:y-79 };
}

function getRitu(date) {
  const m=date.getMonth();
  return RITU_LIST.find(r=>r.months.includes(m));
}

function getAyana(date) {
  const m=date.getMonth(), d=date.getDate();
  if((m>0||(m===0&&d>=14))&&(m<6||(m===6&&d<21))) return 'Uttarayana';
  return 'Dakshinayana';
}

function getPurnimanta(sunL) { return LUNAR_MONTHS[Math.floor(sunL/30)%12]; }
function getAmanta(moonL)    { return LUNAR_MONTHS[Math.floor(moonL/30)%12]; }

function getHoras(date, sunrise, sunset) {
  const horas=[];
  const dayOfWeek=date.getDay();
  const planetIdx=(dayOfWeek+1)%7; // hour 1 planet for day
  const dayStart=new Date(date); dayStart.setHours(0,0,0,0);
  for(let i=0;i<24;i++){
    const start=new Date(dayStart.getTime()+i*3600000);
    const end=new Date(start.getTime()+3600000);
    const seqIdx=(planetIdx*HORA_SEQUENCE.length + i) % HORA_SEQUENCE.length;
    // Chaldean hour sequence: offset by (dayOfWeek*3) % 7
    const offset=(dayOfWeek*3)%7;
    const planet=HORA_SEQUENCE[(offset+i)%7];
    const isDay=start>=sunrise&&start<sunset;
    horas.push({start,end,planet,isDay});
  }
  return horas;
}

function getMuhurtaQuality(date) {
  const jd=julianDate(date);
  const sunL=sunLongitude(jd), moonL=moonLongitude(jd);
  const tithi=getTithi(sunL,moonL);
  const yoga=getYoga(sunL,moonL);
  const karana=getKarana(sunL,moonL);
  const naksh=getNakshatra(moonL);
  const vaar=date.getDay();
  
  let score=5;
  if([0,2,4,6,10,11,12,13].includes(tithi.num-1)) score++;
  if(yoga.quality==='good') score+=2;
  if(yoga.quality==='bad') score-=2;
  if(karana.quality==='bad') score--;
  if([1,2,3,4,5,6,7,12,13,14,16,18,19,20,21,22,26].includes(naksh.idx)) score++;
  if([5,8,9,13,14].includes(naksh.idx)) score--;
  score=Math.max(1,Math.min(10,score));
  return { score, tithi, yoga, karana, naksh };
}

function pad(n){return String(n).padStart(2,'0');}
function fmt12(date){
  let h=date.getHours(),m=date.getMinutes();
  const ap=h>=12?'PM':'AM'; h=h%12||12;
  return `${h}:${pad(m)} ${ap}`;
}
function fmt24(date){ return `${pad(date.getHours())}:${pad(date.getMinutes())}`; }
const MONTHS_EN=['January','February','March','April','May','June','July','August','September','October','November','December'];
const MONTHS_SHORT=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

window.Panchang = {
  julianDate, sunLongitude, moonLongitude, getTithi, getNakshatra, getYoga, getKarana,
  getTropicalSign, getDegInSign, getSunriseSet, getKaal, getSamvat, getRitu, getAyana,
  getPurnimanta, getAmanta, getHoras, getMuhurtaQuality,
  SIGNS, NAKSHATRAS, YOGAS, KARANAS, TITHI_NAMES, VAAR, VAAR_EN, VAAR_PLANETS,
  HORA_SEQUENCE, PLANETS_HORA, LUNAR_MONTHS, MONTHS_EN, MONTHS_SHORT,
  pad, fmt12, fmt24
};
