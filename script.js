/* ============================================================
   IPL FAN ZONE — script.js
   ============================================================ */

// ════════════════════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════════════════════

const TEAMS = [
  { id:'csk',  short:'CSK',  name:'Chennai Super Kings',         logo:'<img src="images/csk.jpg" class="logo">', color:'#FDB913', founded:2008, captain:'Ruturaj Gaikwad', coach:'Stephen Fleming',     home:'MA Chidambaram Stadium, Chennai',           titles:5, titlesYears:'2010,2011,2018,2021,2023', w:120, l:68,
    players:['MS Dhoni','Ruturaj Gaikwad','Devon Conway','Ravindra Jadeja','Deepak Chahar','Moeen Ali','Shivam Dube','Matheesha Pathirana'],
    desc:'The most successful franchise in IPL history, known for their "Whistle Podu" fan culture and legendary captain MS Dhoni.' },
  { id:'mi',   short:'MI',   name:'Mumbai Indians',              logo:'<img src="images/mi.jpg" class="logo">', color:'#0263d1ff', founded:2008, captain:'Hardik Pandya',    coach:'Mark Boucher',        home:'Wankhede Stadium, Mumbai',                   titles:5, titlesYears:'2013,2015,2017,2019,2020', w:116, l:72,
    players:['Rohit Sharma','Hardik Pandya','Suryakumar Yadav','Jasprit Bumrah','Tilak Varma','Ishan Kishan','Trent Boult','Kieron Pollard'],
    desc:'The most titled franchise with 5 championships, Mumbai Indians are known for their star-studded squad and die-hard fan following.' },
  { id:'rcb',  short:'RCB',  name:'Royal Challengers Bengaluru', logo:'<img src="images/rcb.jpg" class="logo">', color:'#EC1C24', founded:2008, captain:'Faf du Plessis',   coach:'Andy Flower',         home:'M. Chinnaswamy Stadium, Bengaluru',           titles:1, titlesYears:'2024',                     w:102, l:84,
    players:['Virat Kohli','Faf du Plessis','Glenn Maxwell','Mohammed Siraj','Dinesh Karthik','Rajat Patidar','Cameron Green','Alzarri Joseph'],
    desc:'Home to Virat Kohli, RCB\'s passionate "Ee Sala Cup Namde" fanbase makes them one of the most loved franchises globally.' },
  { id:'kkr',  short:'KKR',  name:'Kolkata Knight Riders',       logo:'<img src="images/kkr.jpg" class="logo">', color:'#4a139cff', founded:2008, captain:'Shreyas Iyer',     coach:'Chandrakant Pandit',  home:'Eden Gardens, Kolkata',                      titles:3, titlesYears:'2012,2014,2024',          w:108, l:76,
    players:['Shreyas Iyer','Andre Russell','Sunil Narine','Rinku Singh','Venkatesh Iyer','Mitchell Starc','Phil Salt','Nitish Rana'],
    desc:'Owned by Shah Rukh Khan, KKR won the 2024 IPL title and are known for their electric atmosphere at Eden Gardens.' },
  { id:'srh',  short:'SRH',  name:'Sunrisers Hyderabad',         logo:'<img src="images/srh.jpg" class="logo">', color:'#F26522', founded:2013, captain:'Pat Cummins',      coach:'Daniel Vettori',      home:'Rajiv Gandhi Intl. Stadium, Hyderabad',      titles:1, titlesYears:'2016',                     w:80,  l:70,
    players:['Pat Cummins','Heinrich Klaasen','Travis Head','Abhishek Sharma','Bhuvneshwar Kumar','Aiden Markram','Washington Sundar','T Natarajan'],
    desc:'Known for their bowling dominance, SRH play high-octane cricket. Travis Head and Abhishek Sharma have been outstanding openers.' },
  { id:'dc',   short:'DC',   name:'Delhi Capitals',              logo:'<img src="images/dc.jpg" class="logo">', color:'#0057A8', founded:2008, captain:'Axar Patel',       coach:'Hemang Badani',       home:'Arun Jaitley Stadium, Delhi',                titles:0, titlesYears:'Yet to win',               w:96,  l:82,
    players:['Axar Patel','David Warner','Rishabh Pant','Anrich Nortje','Mitchell Marsh','Prithvi Shaw','Jake Fraser-McGurk','Kuldeep Yadav'],
    desc:'Formerly Delhi Daredevils, DC have been consistent playoff contenders. Rishabh Pant leads from the front with explosive batting.' },
  { id:'pbks', short:'PBKS', name:'Punjab Kings',                logo:'<img src="images/pbsk.jpg" class="logo">', color:'#ED1B24', founded:2008, captain:'Shikhar Dhawan',   coach:'Trevor Bayliss',      home:'PCA IS Bindra Stadium, Mohali',              titles:0, titlesYears:'Yet to win',               w:90,  l:90,
    players:['Shikhar Dhawan','Sam Curran','Liam Livingstone','Arshdeep Singh','Jonny Bairstow','Matthew Short','Harshal Patel','Kagiso Rabada'],
    desc:'The Kings of Punjab play aggressive cricket. Sam Curran and Liam Livingstone provide match-winning performances.' },
  { id:'rr',   short:'RR',   name:'Rajasthan Royals',            logo:'<img src="images/rr.jpg" class="logo">', color:'#E91E8C', founded:2008, captain:'Sanju Samson',     coach:'Zubin Bharucha',      home:'Sawai Mansingh Stadium, Jaipur',             titles:2, titlesYears:'2008,2022',                w:96,  l:82,
    players:['Sanju Samson','Jos Buttler','Yuzvendra Chahal','Trent Boult','Shimron Hetmyer','R Ashwin','Devdutt Padikkal','Riyan Parag'],
    desc:'The inaugural IPL champions in 2008, Rajasthan Royals are known for discovering raw talent and playing fearless cricket.' },
  { id:'gt',   short:'GT',   name:'Gujarat Titans',              logo:'<img src="images/gt.jpg" class="logo">', color:'#2c2c8aff', founded:2022, captain:'Shubman Gill',     coach:'Ashish Nehra',        home:'Narendra Modi Stadium, Ahmedabad',           titles:1, titlesYears:'2022',                     w:36,  l:18,
    players:['Shubman Gill','Hardik Pandya','Mohammed Shami','Rashid Khan','David Miller','Wriddhiman Saha','Alzarri Joseph','Abhinav Manohar'],
    desc:'The newest franchise to win the IPL title (2022, their debut year), Gujarat Titans play smart, disciplined cricket.' },
  { id:'lsg',  short:'LSG',  name:'Lucknow Super Giants',        logo:'<img src="images/lsg.jpg" class="logo">', color:'#A72B1E', founded:2022, captain:'KL Rahul',         coach:'Justin Langer',       home:'BRSABV Ekana Cricket Stadium, Lucknow',      titles:0, titlesYears:'Yet to win',               w:30,  l:24,
    players:['KL Rahul','Quinton de Kock','Marcus Stoinis','Ravi Bishnoi','Mark Wood','Nicholas Pooran','Deepak Hooda','Mohsin Khan'],
    desc:'One of the newest IPL franchises, LSG have been impressive performers since their debut in IPL 2022, reaching playoffs consistently.' }
];

const PLAYERS = [
  { name:'Virat Kohli',      team:'RCB',  avatar:'<img src="players/vk.jpg" class="logo">', role:'batsman',      stat:'9,040+ IPL Runs',         tid:'rcb' },
  { name:'MS Dhoni',         team:'CSK',  avatar:'<img src="players/msd.jpg" class="logo">', role:'wicketkeeper', stat:'5,439+ IPL Runs',         tid:'csk' },
  { name:'Rohit Sharma',     team:'MI',   avatar:'<img src="players/rs.jpg" class="logo">', role:'batsman',      stat:'7,267+ IPL Runs',         tid:'mi'  },
  { name:'Jasprit Bumrah',   team:'MI',   avatar:'<img src="players/jb.jpg" class="logo">', role:'bowler',       stat:'170+ IPL Wickets',       tid:'mi'  },
  { name:'Ravindra Jadeja',  team:'RR',  avatar:'<img src="players/rj.jpg" class="logo">', role:'allrounder',   stat:'3,412+ Runs + 177 Wkts',  tid:'rr' },
  { name:'Vaibhav Sooryavanshi',    team:'RR',  avatar:'<img src="players/vs.jpg" class="logo"', role:'batsman',   stat:'776 IPL Runs',        tid:'rr' },
  { name:'Shubman Gill', team:'GT',   avatar:'<img src="players/sg.jpg" class="logo"', role:'batsman',      stat:'732 in IPL',         tid:'gt'  },
  { name:'Sai Sudharsan', team:'GT',   avatar:'<img src="players/ss.jpg" class="logo"', role:'batsman',       stat:'722 IPL Runs',       tid:'gt'  },
  { name:'KL Rahul',         team:'DC',  avatar:'<img src="players/klr.jpg" class="logo"', role:'wicketkeeper', stat:'5,500+ IPL Runs',        tid:'dc' },
  { name:'Abhishek Sharma',      team:'SRH',  avatar:'<img src="players/as.jpg" class="logo"', role:'batsman',       stat:'620+ IPL Runs',     tid:'srh' },
  { name:'Kagiso Rabada',      team:'GT',  avatar:'<img src="players/kr.jpg" class="logo"', role:'bowler',       stat:'25+ IPL Wickets',     tid:'gt' },
  { name:'Mohammed Siraj',     team:'GT',   avatar:'<img src="players/ms.jpg" class="logo"', role:'bowler',      stat:'128+ IPL Wickets',        tid:'gt'  },
  { name:'Yashasvi Jaiswal',      team:'rr',   avatar:'<img src="players/yj.jpg" class="logo"', role:'batsman',       stat:'2,593+ IPL Runs',       tid:'rr'  }
];

const SCHEDULE = [
  { t1:'csk',  t2:'mi',   date:'Mar 21, 2026', time:'7:30 PM IST', venue:'MA Chidambaram Stadium, Chennai',     status:'completed' },
  { t1:'rcb',  t2:'kkr',  date:'Mar 22, 2026', time:'7:30 PM IST', venue:'M. Chinnaswamy Stadium, Bengaluru',   status:'completed' },
  { t1:'srh',  t2:'rr',   date:'Mar 23, 2026', time:'7:30 PM IST', venue:'Rajiv Gandhi Stadium, Hyderabad',     status:'completed' },
  { t1:'dc',   t2:'gt',   date:'Mar 24, 2026', time:'7:30 PM IST', venue:'Arun Jaitley Stadium, Delhi',         status:'completed' },
  { t1:'pbks', t2:'lsg',  date:'Mar 25, 2026', time:'7:30 PM IST', venue:'PCA Stadium, Mohali',                 status:'completed' },

  { t1:'mi',   t2:'rcb',  date:'Apr 10, 2026', time:'7:30 PM IST', venue:'Wankhede Stadium, Mumbai',            status:'upcoming' },
  { t1:'csk',  t2:'srh',  date:'Apr 11, 2026', time:'3:30 PM IST', venue:'MA Chidambaram Stadium, Chennai',     status:'upcoming' },
  { t1:'kkr',  t2:'gt',   date:'Apr 12, 2026', time:'7:30 PM IST', venue:'Eden Gardens, Kolkata',               status:'upcoming' },
  { t1:'rr',   t2:'dc',   date:'Apr 13, 2026', time:'7:30 PM IST', venue:'Sawai Mansingh Stadium, Jaipur',      status:'upcoming' },
  { t1:'lsg',  t2:'pbks', date:'Apr 14, 2026', time:'7:30 PM IST', venue:'Ekana Cricket Stadium, Lucknow',      status:'upcoming' }
];
const CHAMPIONS = [
  {year:2008,champ:'Rajasthan Royals',       runner:'Chennai Super Kings',         venue:'DY Patil Stadium, Mumbai'},
  {year:2009,champ:'Deccan Chargers',        runner:'Royal Challengers Bengaluru', venue:'Wanderers Stadium, SA'},
  {year:2010,champ:'Chennai Super Kings',    runner:'Mumbai Indians',              venue:'DY Patil Stadium, Mumbai'},
  {year:2011,champ:'Chennai Super Kings',    runner:'Royal Challengers Bengaluru', venue:'MA Chidambaram, Chennai'},
  {year:2012,champ:'Kolkata Knight Riders',  runner:'Chennai Super Kings',         venue:'MA Chidambaram, Chennai'},
  {year:2013,champ:'Mumbai Indians',         runner:'Chennai Super Kings',         venue:'Eden Gardens, Kolkata'},
  {year:2014,champ:'Kolkata Knight Riders',  runner:'Kings XI Punjab',             venue:'M. Chinnaswamy, Bengaluru'},
  {year:2015,champ:'Mumbai Indians',         runner:'Chennai Super Kings',         venue:'Eden Gardens, Kolkata'},
  {year:2016,champ:'Sunrisers Hyderabad',    runner:'Royal Challengers Bengaluru', venue:'Chinnaswamy, Bengaluru'},
  {year:2017,champ:'Mumbai Indians',         runner:'Rising Pune Supergiants',     venue:'Rajiv Gandhi Stadium, Hyderabad'},
  {year:2018,champ:'Chennai Super Kings',    runner:'Sunrisers Hyderabad',         venue:'Wankhede Stadium, Mumbai'},
  {year:2019,champ:'Mumbai Indians',         runner:'Chennai Super Kings',         venue:'Rajiv Gandhi Stadium, Hyderabad'},
  {year:2020,champ:'Mumbai Indians',         runner:'Delhi Capitals',              venue:'Dubai International Stadium'},
  {year:2021,champ:'Chennai Super Kings',    runner:'Kolkata Knight Riders',       venue:'Dubai International Stadium'},
  {year:2022,champ:'Gujarat Titans',         runner:'Rajasthan Royals',            venue:'Narendra Modi Stadium, Ahmedabad'},
  {year:2023,champ:'Chennai Super Kings',    runner:'Gujarat Titans',              venue:'Narendra Modi Stadium, Ahmedabad'},
  {year:2024,champ:'Kolkata Knight Riders',  runner:'Sunrisers Hyderabad',         venue:'MA Chidambaram, Chennai'}
];

const NEWS = [
  {tag:'Transfer',     title:'IPL 2025 Mega Auction: Top players spark bidding war',              date:'Dec 10, 2024', emoji:'💰', bg:'linear-gradient(135deg,#1a1a2e,#16213e)'},
  {tag:'Records',      title:'Virat Kohli becomes first batter to score 8000 IPL runs',           date:'Apr 5, 2025',  emoji:'🏆', bg:'linear-gradient(135deg,#1a0533,#16213e)'},
  {tag:'Match Report', title:'Jasprit Bumrah\'s devastating spell shatters SRH batting',         date:'Apr 8, 2025',  emoji:'⚡', bg:'linear-gradient(135deg,#0d1b3e,#16213e)'},
  {tag:'Preview',      title:'CSK vs MI: The biggest rivalry in cricket returns',                 date:'May 10, 2025', emoji:'🔥', bg:'linear-gradient(135deg,#1a1a2e,#0d1b3e)'},
  {tag:'Stats',        title:'Rashid Khan reaches 115 IPL wickets milestone',                    date:'Apr 12, 2025', emoji:'🌀', bg:'linear-gradient(135deg,#16213e,#1a0533)'},
  {tag:'Team News',    title:'RR unveil new jersey and squad for IPL 2025 season',               date:'Mar 15, 2025', emoji:'👕', bg:'linear-gradient(135deg,#1a0533,#0d1b3e)'},
  {tag:'Update',       title:'Travis Head smashes fastest IPL fifty in just 14 balls',           date:'Apr 3, 2025',  emoji:'🚀', bg:'linear-gradient(135deg,#1a1a2e,#0d1b3e)'},
  {tag:'Interview',    title:'MS Dhoni confirms IPL 2025 is his final season',                   date:'Jan 22, 2025', emoji:'😢', bg:'linear-gradient(135deg,#1a0533,#16213e)'},
  {tag:'Awards',       title:'Suryakumar Yadav wins IPL Outstanding Batsman award again',        date:'May 2, 2025',  emoji:'🏅', bg:'linear-gradient(135deg,#16213e,#1a1a2e)'}
];

const GALLERY = [
  {emoji:'<img src="players/cskteam.jpg" class="photo">', title:'CSK Team Photo 2024',      sub:'Champions squad',          type:'team',   bg:'linear-gradient(135deg,#FDB91318,#16213e)'},
  {emoji:'<img src="players/mivictory.jpg" class="photo">', title:'MI Victory Lap',           sub:'Wankhede Stadium',         type:'team',   bg:'linear-gradient(135deg,#004BA018,#16213e)'},
  {emoji:'<img src="players/virat.jpg" class="photo">', title:'Virat Kohli Century',      sub:'vs DC — Chinnaswamy',      type:'match',  bg:'linear-gradient(135deg,#EC1C2418,#16213e)'},
  {emoji:'<img src="players/kkrteam.jpg" class="photo">', title:'IPL Trophy 2024',          sub:'KKR lift the title',       type:'trophy', bg:'linear-gradient(135deg,#FFD70018,#16213e)'},
  {emoji:'<img src="players/boomboom.jpg" class="photo">', title:'Bumrah Death Over Magic',  sub:'4 wickets in 1 over',      type:'match',  bg:'linear-gradient(135deg,#004BA018,#16213e)'},
  {emoji:'<img src="players/kkrsquade.jpg" class="photo">', title:'KKR Squad 2024',           sub:'Eden Gardens',             type:'team',   bg:'linear-gradient(135deg,#3A225D18,#16213e)'},
  {emoji:'<img src="players/msdhoni.jpg" class="photo">', title:'MS Dhoni Last Bat',        sub:'Iconic farewell innings',  type:'match',  bg:'linear-gradient(135deg,#FDB91318,#16213e)'},
  {emoji:'<img src="players/2023.jpg" class="photo">', title:'CSK 5th Title',            sub:'IPL 2023 Final',           type:'trophy', bg:'linear-gradient(135deg,#FDB91318,#0a0a0f)'},
  {emoji:'<img src="players/orangearmy.jpg" class="photo">', title:'SRH Orange Army',          sub:'Rajiv Gandhi Stadium',     type:'team',   bg:'linear-gradient(135deg,#F2652218,#16213e)'},
  {emoji:'<img src="players/ar.jpg" class="photo">', title:'Russell 6 Sixes in Over',  sub:'KKR vs PBKS',              type:'match',  bg:'linear-gradient(135deg,#3A225D18,#16213e)'},
  {emoji:'<img src="players/gtteam.jpg" class="photo">', title:'GT Debut Champions',       sub:'IPL 2022 — Ahmedabad',     type:'trophy', bg:'linear-gradient(135deg,#1C1C6C18,#16213e)'},
  {emoji:'<img src="players/rrteam.jpg" class="photo">', title:'RR Home Crowd',            sub:'Jaipur fans in pink',      type:'team',   bg:'linear-gradient(135deg,#E91E8C18,#16213e)'}
];

const QUIZ_QS = [
  {q:'Which team has won the most IPL titles?',                                   opts:['Mumbai Indians','Chennai Super Kings','Both CSK & MI — 5 each','KKR'],             ans:2},
  {q:'Who is the highest run-scorer in IPL history?',                             opts:['Rohit Sharma','MS Dhoni','Suresh Raina','Virat Kohli'],                            ans:3},
  {q:'Which stadium has the largest seating capacity in IPL?',                    opts:['Eden Gardens','Wankhede','Narendra Modi Stadium','MA Chidambaram'],                ans:2},
  {q:'Who were the inaugural IPL champions in 2008?',                             opts:['Mumbai Indians','Chennai Super Kings','Rajasthan Royals','KKR'],                   ans:2},
  {q:'Who holds the record for highest individual score in IPL (175*)?',          opts:['Virat Kohli','AB de Villiers','Chris Gayle','Brendon McCullum'],                   ans:2},
  {q:'In which year did Gujarat Titans win their debut IPL title?',               opts:['2021','2022','2023','2024'],                                                       ans:1},
  {q:'Which bowler has taken the most IPL wickets?',                              opts:['Jasprit Bumrah','Dwayne Bravo','Yuzvendra Chahal','Amit Mishra'],                  ans:2},
  {q:'Which IPL franchise is owned by Shah Rukh Khan?',                          opts:['Mumbai Indians','Delhi Capitals','Kolkata Knight Riders','Punjab Kings'],          ans:2}
];

const FAQS = [
  {q:'When does IPL 2025 start?',           a:'IPL 2025 began on March 22, 2025, with CSK taking on MI in the opening match at Wankhede Stadium.'},
  {q:'How many teams play in the IPL?',     a:'There are 10 teams competing in IPL 2025: CSK, MI, RCB, KKR, SRH, DC, PBKS, RR, GT and LSG.'},
  {q:'How can I buy IPL match tickets?',    a:'Tickets are available on BookMyShow, Paytm Insider, and the official BCCI website. Prices vary by venue and stand.'},
  {q:'Where can I watch IPL live?',         a:'IPL 2025 is broadcast on Star Sports network. Live streaming is available on JioCinema (free in India).'},
  {q:'Who won the most Player of the Match awards?', a:'Chris Gayle and AB de Villiers hold the record with 22 Player of the Match awards each in IPL history.'}
];

const TICKER_ITEMS = [
  '🏏 <b>Virat Kohli</b> scores 82* vs MI — RCB win by 6 wickets',
  '⚡ <b>Jasprit Bumrah</b> takes 4/18 — MI thrash DC by 45 runs',
  '🏆 <b>KKR</b> defend 180 — remain top of the table',
  '📊 <b>Travis Head</b> hits fastest IPL fifty in 14 balls',
  '🎯 <b>Rashid Khan</b> 3/16 as GT restrict CSK to 147',
  '🔥 <b>Ruturaj Gaikwad</b> scores century — CSK post 213/4',
  '📅 Next: <b>MI vs RCB</b> — May 10, 7:30 PM IST at Wankhede',
  '📅 Next: <b>CSK vs SRH</b> — May 11, 3:30 PM IST at Chennai'
];

// ════════════════════════════════════════════════════════════
// LOGIN
// ════════════════════════════════════════════════════════════

function initParticles() {
  const c = document.getElementById('login-particles');
  if (!c) return;
  for (let i = 0; i < 55; i++) {
    const p = document.createElement('div');
    p.className = 'lp-particle';
    const sz = Math.random() * 5 + 2;
    p.style.cssText = `
      left:${Math.random()*100}%;width:${sz}px;height:${sz}px;
      animation-duration:${Math.random()*8+5}s;
      animation-delay:${Math.random()*12}s;
      opacity:${Math.random()*.6+.15};
      background:${Math.random()>.5?'#FFD700':'#FF6B00'};
    `;
    c.appendChild(p);
  }
}

function renderLoginTeams() {
  const box = document.getElementById('lp-teams');
  if (!box) return;
  TEAMS.forEach(t => {
    const d = document.createElement('div');
    d.className = 'lp-team-card';
    d.style.borderColor = t.color + '44';
    d.innerHTML = `
      <span class="ltc-logo">${t.logo}</span>
      <div class="ltc-short" style="color:${t.color}">${t.short}</div>
      <div class="ltc-name">${t.name}</div>
      <div class="ltc-year">Since ${t.founded}</div>
    `;
    box.appendChild(d);
  });
}

function handleLogin(e) {
  e.preventDefault();
  const name  = document.getElementById('lf-name').value.trim();
  const phone = document.getElementById('lf-phone').value.trim();
  let ok = true;

  const en = document.getElementById('err-name');
  const ep = document.getElementById('err-phone');

  if (!name || name.length < 2) {
    en.textContent = 'Please enter a valid name (min 2 characters).'; ok = false;
  } else { en.textContent = ''; }

  if (!phone || !/^\d{10}$/.test(phone)) {
    ep.textContent = 'Enter a valid 10-digit mobile number.'; ok = false;
  } else { ep.textContent = ''; }

  if (!ok) return;

  sessionStorage.setItem('ipl_user', JSON.stringify({ name, phone }));
  enterSite(name);
}

function enterSite(name) {
  const lp = document.getElementById('login-page');
  const ms = document.getElementById('main-site');
  lp.style.transition = 'opacity .65s ease';
  lp.style.opacity = '0';
  setTimeout(() => {
    lp.classList.add('hidden');
    ms.classList.remove('hidden');
    ms.style.opacity = '0';
    ms.style.transition = 'opacity .5s ease';
    // Set nav badge
    const nu = document.getElementById('nav-user');
    if (nu && name) {
      nu.innerHTML = `<span class="nu-avatar">👤</span><span class="nu-name">${name}</span>`;
    }
    setTimeout(() => { ms.style.opacity = '1'; }, 30);
    initScrollAnimations();
  }, 660);
}

// ════════════════════════════════════════════════════════════
// NAVBAR
// ════════════════════════════════════════════════════════════

function initNavbar() {
  const nb = document.getElementById('navbar');
  const nl = document.getElementById('nav-links');
  const hb = document.getElementById('hamburger');

  window.addEventListener('scroll', () => {
    if (nb) nb.classList.toggle('scrolled', window.scrollY > 50);
    const ids = ['home','about','players','schedule','stats','news','gallery','fanzone','contact'];
    ids.forEach(id => {
      const el = document.getElementById(id);
      const lk = document.querySelector(`.nl[href="#${id}"]`);
      if (!el || !lk) return;
      const r = el.getBoundingClientRect();
      if (r.top <= 90 && r.bottom >= 90) {
        document.querySelectorAll('.nl').forEach(l => l.classList.remove('active'));
        lk.classList.add('active');
      }
    });
  });

  if (hb) hb.addEventListener('click', () => nl.classList.toggle('open'));
  document.querySelectorAll('.nl').forEach(l => l.addEventListener('click', () => nl.classList.remove('open')));
}

// ════════════════════════════════════════════════════════════
// TICKER
// ════════════════════════════════════════════════════════════

function renderTicker() {
  const t = document.getElementById('ticker-track');
  if (!t) return;
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  t.innerHTML = items.map(i => `<span class="ti">${i} &nbsp;•&nbsp;</span>`).join('');
}

// ════════════════════════════════════════════════════════════
// ABOUT TEAMS
// ════════════════════════════════════════════════════════════

function renderAboutTeams() {
  const g = document.getElementById('about-teams-grid');
  if (!g) return;
  TEAMS.forEach(t => {
    const d = document.createElement('div');
    d.className = 'about-team-card fu';
    d.style.setProperty('--tc', t.color);
    d.innerHTML = `
      <span class="atc-logo">${t.logo}</span>
      <div class="atc-short" style="color:${t.color}">${t.short}</div>
      <div class="atc-name">${t.name}</div>
      <div class="atc-year">Since ${t.founded}</div>
      <div class="atc-titles">🏆 Titles: <b>${t.titles}</b></div>
      <button class="atc-btn" onclick="openTeamModal('${t.id}')">View Details</button>
    `;
    g.appendChild(d);
  });
}

function openTeamModal(id) {
  const t = TEAMS.find(x => x.id === id);
  if (!t) return;
  document.getElementById('team-modal-body').innerHTML = `
    <div class="tm-body">
      <div class="tm-head">
        <span class="tm-logo">${t.logo}</span>
        <div>
          <div class="tm-name" style="color:${t.color}">${t.name}</div>
          <div class="tm-sub">${t.short} · IPL Franchise</div>
          <span class="tm-since" style="background:${t.color}20;color:${t.color};border:1px solid ${t.color}44">Since ${t.founded}</span>
        </div>
      </div>
      <p class="tm-desc">${t.desc}</p>
      <div class="tm-info">
        <div class="tm-ic"><div class="tm-ic-lbl">Captain</div><div class="tm-ic-val">👑 ${t.captain}</div></div>
        <div class="tm-ic"><div class="tm-ic-lbl">Head Coach</div><div class="tm-ic-val">🧠 ${t.coach}</div></div>
        <div class="tm-ic"><div class="tm-ic-lbl">Home Ground</div><div class="tm-ic-val">🏟️ ${t.home}</div></div>
        <div class="tm-ic"><div class="tm-ic-lbl">IPL Titles</div><div class="tm-ic-val">🏆 ${t.titles} (${t.titlesYears})</div></div>
      </div>
      <div class="tm-players-title">KEY PLAYERS</div>
      <div class="player-chips">${t.players.map(p=>`<span class="pc">🏏 ${p}</span>`).join('')}</div>
    </div>
  `;
  document.getElementById('team-modal-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeTeamModal() {
  document.getElementById('team-modal-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

// ════════════════════════════════════════════════════════════
// PLAYERS
// ════════════════════════════════════════════════════════════

function renderPlayers(filter = 'all') {
  const g = document.getElementById('players-grid');
  if (!g) return;
  g.innerHTML = '';
  const list = filter === 'all' ? PLAYERS : PLAYERS.filter(p => p.role === filter);
  const roleMap = { batsman:'r-bat', bowler:'r-bowl', allrounder:'r-ar', wicketkeeper:'r-wk' };
  const roleLabel = { batsman:'Batsman', bowler:'Bowler', allrounder:'All-Rounder', wicketkeeper:'Wicket-Keeper' };
  list.forEach((p, i) => {
    const tm = TEAMS.find(t => t.id === p.tid);
    const d = document.createElement('div');
    d.className = 'player-card fu';
    d.style.animationDelay = `${i * .04}s`;
    d.innerHTML = `
      <div class="pc-avatar">${p.avatar}</div>
      <div class="pc-name">${p.name}</div>
      <div class="pc-team" style="color:${tm?.color||'#FFD700'}">${p.team}</div>
      <span class="pc-role ${roleMap[p.role]}">${roleLabel[p.role]}</span>
      <div class="pc-stat"><b>${p.stat}</b></div>
    `;
    g.appendChild(d);
  });
  setTimeout(() => g.querySelectorAll('.fu').forEach(el => el.classList.add('visible')), 80);
}

function filterPlayers(role, btn) {
  document.querySelectorAll('#player-filters .fb').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderPlayers(role);
}

// ════════════════════════════════════════════════════════════
// SCHEDULE
// ════════════════════════════════════════════════════════════



// ===============================
// IPL 2026 LIVE DATE
// ===============================

const LIVE_DATE = "2026-03-28";

function getMatchStatus(matchDate) {

    const match = new Date(matchDate);
    const live = new Date(LIVE_DATE);

    match.setHours(0,0,0,0);
    live.setHours(0,0,0,0);

    if(match < live){
        return "completed";
    }
    else if(match.getTime() === live.getTime()){
        return "live";
    }
    else{
        return "upcoming";
    }
}


function renderSchedule(filter = "all") {

    const g = document.getElementById("schedule-grid");

    if(!g) return;

    g.innerHTML = "";


    const list = SCHEDULE.filter(m=>{

        m.status = getMatchStatus(m.date);

        if(filter === "all"){
            return true;
        }

        return m.status === filter;

    });


    list.forEach(m=>{

        const t1 = TEAMS.find(t=>t.id === m.t1);
        const t2 = TEAMS.find(t=>t.id === m.t2);


        const card = document.createElement("div");

        card.className = "match-card fu";


        card.innerHTML = `

        <div class="mt">

            <div class="mt-logo">
                ${t1.logo}
            </div>

            <div class="mt-name" style="color:${t1.color}">
                ${t1.short}
            </div>

        </div>


        <div class="mv">

            <div class="mv-vs">
                VS
            </div>

            <div class="mv-date">
                📅 ${m.date}
                <br>
                🕐 ${m.time}
            </div>

            <div class="mv-venue">
                📍 ${m.venue}
            </div>

            <span class="ms ms-${m.status}">
                ${
                    m.status === "live"
                    ? "🔴 LIVE"
                    : m.status === "upcoming"
                    ? "⏳ UPCOMING"
                    : "✅ COMPLETED"
                }
            </span>

        </div>


        <div class="mt">

            <div class="mt-logo">
                ${t2.logo}
            </div>

            <div class="mt-name" style="color:${t2.color}">
                ${t2.short}
            </div>

        </div>

        `;


        g.appendChild(card);

    });



    setTimeout(()=>{

        g.querySelectorAll(".fu")
        .forEach(el=>{
            el.classList.add("visible");
        });

    },80);

}



function filterSchedule(filter,btn){

    document
    .querySelectorAll("#schedule .fb")
    .forEach(button=>{
        button.classList.remove("active");
    });


    btn.classList.add("active");

    renderSchedule(filter);

}



document.addEventListener("DOMContentLoaded",()=>{

    renderSchedule("all");

});
// ════════════════════════════════════════════════════════════
// STATISTICS
// ════════════════════════════════════════════════════════════

function renderStats() {
  // Stat cards
  const cards = [
    {icon:'🏆', val:'5',      lbl:'Most IPL Titles',       name:'CSK & MI (5 each)'},
    {icon:'🏏', val:'8,004',  lbl:'Most IPL Runs',         name:'Virat Kohli'},
    {icon:'⚡', val:'205+',   lbl:'Most IPL Wickets',      name:'Yuzvendra Chahal'},
    {icon:'💥', val:'175*',   lbl:'Highest Individual Score', name:'Chris Gayle vs PWI'},
    {icon:'🔥', val:'₹109.4M',lbl:'Highest Auction Bid',   name:'Mitchell Starc (2024)'},
    {icon:'👥', val:'1B+',    lbl:'Global Fan Following',  name:'IPL 2024 Season'}
  ];
  const sg = document.getElementById('stats-cards');
  if (sg) cards.forEach(s => {
    const d = document.createElement('div');
    d.className = 'stat-card fu';
    d.innerHTML = `<div class="sc-icon">${s.icon}</div><div class="sc-val">${s.val}</div><div class="sc-lbl">${s.lbl}</div><div class="sc-name">${s.name}</div>`;
    sg.appendChild(d);
  });

  // Win/Loss
  const wg = document.getElementById('wl-grid');
  if (wg) TEAMS.forEach(t => {
    const total = t.w + t.l;
    const pct = Math.round((t.w / total) * 100);
    const d = document.createElement('div');
    d.className = 'wl-card fu';
    d.innerHTML = `
      <div class="wl-team">
        <span class="wl-logo">${t.logo}</span>
        <span class="wl-name" style="color:${t.color}">${t.short}</span>
      </div>
      <div class="wl-bar-wrap"><div class="wl-bar" style="width:${pct}%"></div></div>
      <div class="wl-stats"><span>W: <b>${t.w}</b></span><span>Win%: <b>${pct}%</b></span><span>L: <b>${t.l}</b></span></div>
    `;
    wg.appendChild(d);
  });

  // Champions table
  const tb = document.getElementById('champs-tbody');
  if (tb) CHAMPIONS.slice().reverse().forEach(c => {
    const r = document.createElement('tr');
    r.innerHTML = `<td>${c.year}</td><td>🏆 ${c.champ}</td><td>${c.runner}</td><td>${c.venue}</td>`;
    tb.appendChild(r);
  });
}

// ════════════════════════════════════════════════════════════
// NEWS
// ════════════════════════════════════════════════════════════

// function renderNews() {
//   const g = document.getElementById('news-grid');
//   if (!g) return;
//   NEWS.forEach(n => {
//     const d = document.createElement('div');
//     d.className = 'news-card fu';
//     d.innerHTML = `
//       <div class="nc-img" style="background:${n.bg}">${n.emoji}</div>
//       <div class="nc-body">
//         <span class="nc-tag">${n.tag}</span>
//         <div class="nc-title">${n.title}</div>
//         <div class="nc-date">📅 ${n.date}</div>
//       </div>
//     `;
//     g.appendChild(d);
//   });
// }



const latestNews = [
{
title:"IPL 2026 Season Begins with a Grand Opening Ceremony",
date:"March 28, 2026",
image:"latest news/ceremony.jpg",
description:"The 19th edition of the IPL kicks off with spectacular performances and an exciting opening match.",
content:`
<p>The IPL 2026 season began with a grand opening ceremony featuring live music, fireworks and exciting performances. Thousands of fans witnessed the spectacular event before the opening match officially started the tournament.</p>
`
},

{
title:"Virat Kohli Leads RCB to a Thrilling Victory",
date:"April 2, 2026",
image:"latest news/vk-trophy.jpg",
description:"Royal Challengers Bengaluru defeated Chennai Super Kings by 7 wickets in a high-scoring encounter.",
content:`
<p>Virat Kohli played another memorable innings to guide Royal Challengers Bengaluru to victory. His calm batting and experience helped RCB comfortably chase the target in front of a packed stadium.</p>
`
},

{
title:"Shubman Gill Scores the First Century of IPL 2026",
date:"April 8, 2026",
image:"latest news/sg-century.jpg",
description:"The Gujarat Titans captain smashed a magnificent 108* to guide his team to victory.",
content:`
<p>Shubman Gill became the first player to score a century in IPL 2026. His unbeaten knock entertained fans and helped Gujarat Titans secure an important win.</p>
`
},

{
title:"Mumbai Indians Continue Their Winning Streak",
date:"April 15, 2026",
image:"latest news/mi-trophy.jpg",
description:"Mumbai Indians registered their fifth consecutive win and climbed to the top four.",
content:`
<p>Mumbai Indians continued their excellent form with another dominant performance. Their batting and bowling departments worked together perfectly to register five wins in a row.</p>
`
},

{
title:"Sunrisers Hyderabad Set New Team Total Record",
date:"April 20, 2026",
image:"latest news/srh-hightotal.jpg",
description:"SRH posted a massive 278/4, the highest total of the IPL 2026 season.",
content:`
<p>Sunrisers Hyderabad created history by scoring the highest team total of IPL 2026. Their explosive batting display thrilled cricket fans across the world.</p>
`
},

{
title:"Playoff Race Heats Up as League Stage Nears End",
date:"May 15, 2026",
image:"latest news/playoff-race.jpg",
description:"Five teams remain in contention for the final four playoff spots.",
content:`
<p>The race for the IPL 2026 playoffs became more exciting as several teams fought for qualification. Every remaining match became crucial in deciding the top four.</p>
`
},

{
title:"Jasprit Bumrah Becomes the Leading Wicket-Taker",
date:"May 18, 2026",
image:"latest news/jb-wicket.jpg",
description:"Mumbai Indians pace spearhead Jasprit Bumrah claimed his 25th wicket of the season to top the Purple Cap standings.",
content:`
<p>Jasprit Bumrah delivered another outstanding bowling performance and became the highest wicket-taker of IPL 2026 with accurate yorkers and match-winning spells.</p>
`
},

{
title:"Yashasvi Jaiswal Fires Rajasthan Royals into the Playoffs",
date:"May 20, 2026",
image:"latest news/yj-playoff.jpg",
description:"A blistering 92-run knock from Yashasvi Jaiswal helped Rajasthan Royals secure a crucial playoff berth.",
content:`
<p>Yashasvi Jaiswal played a fearless innings to guide Rajasthan Royals into the playoffs. His attacking stroke play delighted fans and sealed a memorable victory.</p>
`
},

{
title:"KL Rahul Stars in a Match-Winning Chase for LSG",
date:"May 22, 2026",
image:"latest news/klu.jpg",
description:"Lucknow Super Giants chased down 198 with ease as KL Rahul remained unbeaten with a classy half-century.",
content:`
<p>KL Rahul anchored the chase brilliantly as Lucknow Super Giants comfortably reached the target. His leadership and batting proved decisive in the victory.</p>
`
},

{
title:"Royal Challengers Bengaluru Finish League Stage on Top",
date:"May 24, 2026",
image:"latest news/rcb-win.jpg",
description:"RCB ended the league stage as table toppers after defeating Mumbai Indians in their final group match.",
content:`
<p>Royal Challengers Bengaluru finished at the top of the IPL 2026 points table after a remarkable league campaign filled with consistent performances.</p>
`
},

{
title:"IPL 2026 Qualifier 1 Set for a High-Voltage Clash",
date:"May 26, 2026",
image:"latest news/qualifier-1.jpg",
description:"The top two teams prepare for an exciting Qualifier 1 as fans eagerly await another blockbuster encounter.",
content:`
<p>The first Qualifier promises an intense battle between two of the strongest teams of IPL 2026. The winner will book a direct place in the grand final.</p>
`
},

{
title:"Fans Gear Up for the IPL 2026 Grand Finale",
date:"May 31, 2026",
image:"latest news/final.jpg",
description:"Cricket fans across the world are ready for the IPL 2026 Final, featuring spectacular entertainment and an unforgettable championship battle.",
content:`
<p>The IPL 2026 Final is expected to attract millions of viewers worldwide. Fans are excited for the championship clash and the closing ceremony celebrations.</p>
`
}
];

const newsGrid = document.getElementById("news-grid");


latestNews.forEach((news, index) => {
  newsGrid.innerHTML += `
    <div class="news-card">
      <img src="${news.image}" alt="${news.title}" class="news-image">

      <div class="news-content">
        <span class="news-date">📅 ${news.date}</span>

        <h3>${news.title}</h3>

        <p>${news.description}</p>

        <button class="news-btn" onclick="openNews(${index})">
          Read More
        </button>

      </div>
    </div>
  `;
});

function openNews(index){

document.getElementById("popupTitle").innerHTML=latestNews[index].title;

document.getElementById("popupBody").innerHTML=`
<img src="${latestNews[index].image}" class="popup-image">

<p><strong>📅 ${latestNews[index].date}</strong></p>

${latestNews[index].content}
`;

document.getElementById("newsPopup").style.display="flex";

}

function closeNews(){

document.getElementById("newsPopup").style.display="none";

}

// ════════════════════════════════════════════════════════════
// GALLERY
// ════════════════════════════════════════════════════════════

function renderGallery(filter = 'all') {
  const g = document.getElementById('gallery-grid');
  if (!g) return;
  g.innerHTML = '';
  const list = filter === 'all' ? GALLERY : GALLERY.filter(x => x.type === filter);
  list.forEach((item, i) => {
    const d = document.createElement('div');
    d.className = 'gc fu';
    d.style.animationDelay = `${i * .05}s`;
    d.innerHTML = `
      <div class="gc-img" style="background:${item.bg}">${item.emoji}</div>
      <span class="gc-badge">${item.type}</span>
      <div class="gc-overlay">
        <div class="gc-ov-title">${item.title}</div>
        <div class="gc-ov-sub">${item.sub}</div>
      </div>
    `;
    g.appendChild(d);
  });
  setTimeout(() => g.querySelectorAll('.fu').forEach(el => el.classList.add('visible')), 80);
}

function filterGallery(f, btn) {

    // Remove active class from all gallery buttons
    document.querySelectorAll('#gallery .fb').forEach(b => {
        b.classList.remove('active');
    });

    // Highlight clicked button
    if (btn) {
        btn.classList.add('active');
    }

    // Render gallery
    renderGallery(f);
}

// ════════════════════════════════════════════════════════════
// POLL
// ════════════════════════════════════════════════════════════

let pollVotes = {};
let pollVoted = false;

function initPoll() {
  TEAMS.forEach(t => { pollVotes[t.id] = Math.floor(Math.random() * 220 + 40); });
  renderPoll();
}

function renderPoll() {
  const box = document.getElementById('poll-box');
  if (!box) return;
  const total = Object.values(pollVotes).reduce((a,b) => a+b, 0);
  box.innerHTML = '';
  TEAMS.forEach(t => {
    const pct = Math.round((pollVotes[t.id] / total) * 100);
    const d = document.createElement('div');
    d.className = 'poll-opt' + (pollVoted ? ' voted' : '');
    d.innerHTML = `
      <div class="poll-lbl">
        <div class="poll-ti"><span class="poll-logo">${t.logo}</span><span class="poll-nm">${t.name}</span></div>
        <span class="poll-pct">${pollVoted ? pct+'%' : 'Vote'}</span>
      </div>
      <div class="poll-bg"><div class="poll-fill" style="width:${pollVoted ? pct : 0}%"></div></div>
    `;
    if (!pollVoted) {
      d.addEventListener('click', () => {
        pollVotes[t.id]++;
        pollVoted = true;
        renderPoll();
      });
    }
    box.appendChild(d);
  });
}

// ════════════════════════════════════════════════════════════
// COMMENTS
// ════════════════════════════════════════════════════════════

let comments = [
  { name:'Rohan M.',   text:'CSK will always be my team! Dhoni is a legend forever 🦁🏆', time:'2 hrs ago' },
  { name:'Priya S.',   text:'RCB fans never give up! Ee Sala Cup Namde! 🔴',               time:'4 hrs ago' },
  { name:'Arjun K.',   text:'KKR 2024 was brilliant. Rinku Singh is a superstar!',         time:'1 day ago' }
];

function renderComments() {
  const l = document.getElementById('comments-list');
  if (!l) return;
  if (!comments.length) { l.innerHTML = '<p style="color:var(--text2);font-size:.82rem;text-align:center;padding:16px">Be the first to comment!</p>'; return; }
  l.innerHTML = comments.map(c => `
    <div class="cmt-item">
      <div class="cmt-author">👤 ${c.name}</div>
      <div class="cmt-body">${c.text}</div>
      <div class="cmt-time">${c.time}</div>
    </div>
  `).join('');
  l.scrollTop = 0;
}

function postComment() {
  const n = document.getElementById('cm-name').value.trim();
  const t = document.getElementById('cm-text').value.trim();
  if (!n || !t) { alert('Please enter your name and comment.'); return; }
  comments.unshift({ name: n, text: t, time: 'Just now' });
  document.getElementById('cm-name').value = '';
  document.getElementById('cm-text').value = '';
  renderComments();
}

// ════════════════════════════════════════════════════════════
// QUIZ
// ════════════════════════════════════════════════════════════

let qIdx = 0, qScore = 0, qAnswered = false;

function initQuiz() { qIdx = 0; qScore = 0; renderQuiz(); }

function renderQuiz() {
  const box = document.getElementById('quiz-box');
  if (!box) return;
  if (qIdx >= QUIZ_QS.length) {
    const pct = Math.round((qScore / QUIZ_QS.length) * 100);
    const msg = pct === 100 ? 'Perfect! You\'re an IPL legend! 🏆' : pct >= 75 ? 'Excellent cricket knowledge! 🏏' : pct >= 50 ? 'Good effort! Keep watching IPL! 🌟' : 'Try again, cricket fan! 😊';
    box.innerHTML = `<div style="text-align:center;padding:16px"><div style="font-size:2.6rem;margin-bottom:8px">🎉</div><div class="quiz-score-big">${qScore}/${QUIZ_QS.length}</div><p style="color:var(--text2);font-size:.86rem;margin-bottom:14px">${msg}</p><button class="quiz-next" onclick="initQuiz()">Play Again 🔄</button></div>`;
    return;
  }
  const q = QUIZ_QS[qIdx];
  qAnswered = false;
  box.innerHTML = `
    <div style="font-size:.72rem;color:var(--text2);margin-bottom:6px">Q${qIdx+1}/${QUIZ_QS.length} · Score: ${qScore}</div>
    <div class="quiz-q">${q.q}</div>
    <div class="quiz-opts">${q.opts.map((o,i)=>`<button class="quiz-o" onclick="answerQuiz(${i})">${o}</button>`).join('')}</div>
    <div id="quiz-res" class="quiz-res" style="display:none"></div>
    <button id="quiz-nb" class="quiz-next" onclick="nextQuiz()" style="display:none">Next ➡️</button>
  `;
}

function answerQuiz(sel) {
  if (qAnswered) return;
  qAnswered = true;
  const q = QUIZ_QS[qIdx];
  document.querySelectorAll('.quiz-o').forEach((b, i) => {
    b.disabled = true;
    if (i === q.ans) b.classList.add('correct');
    else if (i === sel) b.classList.add('wrong');
  });
  const res = document.getElementById('quiz-res');
  if (sel === q.ans) {
    qScore++;
    res.textContent = '✅ Correct!';
    res.style.color = '#00c864';
  } else {
    res.textContent = `❌ Wrong! Answer: ${q.opts[q.ans]}`;
    res.style.color = '#ff5050';
  }
  res.style.display = 'block';
  document.getElementById('quiz-nb').style.display = 'inline-block';
}

function nextQuiz() { qIdx++; renderQuiz(); }

// ════════════════════════════════════════════════════════════
// POINTS TABLE
// ════════════════════════════════════════════════════════════

// function renderPointsTable() {
//   const tb = document.getElementById('points-tbody');
//   if (!tb) return;
//   const pts = TEAMS.map(t => {
//     const p = Math.min(t.w + t.l, 14);
//     const w = Math.round(p * (t.w / (t.w + t.l)));
//     const l = p - w;
//     const nrr = (Math.random() * 2 - 0.8).toFixed(3);
//     return { ...t, p, w, l, nrr, pts: w * 2 };
//   }).sort((a, b) => b.pts - a.pts || parseFloat(b.nrr) - parseFloat(a.nrr));

//   pts.forEach((t, i) => {
//     const r = document.createElement('tr');
//     if (i < 4) r.style.background = 'rgba(255,215,0,.05)';
//     r.innerHTML = `<td>${i+1}</td><td> ${t.name}</td><td>${t.p}</td><td>${t.w}</td><td>${t.l}</td><td style="color:${parseFloat(t.nrr)>=0?'#00c864':'#ff5050'}">${parseFloat(t.nrr)>=0?'+':''}${t.nrr}</td><td style="color:var(--gold);font-weight:700">${t.pts}</td>`;
//     tb.appendChild(r);
//   });
// }


function renderPointsTable() {

    const tb = document.getElementById("points-tbody");
    tb.innerHTML = "";

    const points = [
        {team:"Royal Challengers Bengaluru", p:14, w:10, l:4, nrr:"+0.982", pts:20},
        {team:"Gujarat Titans", p:14, w:8, l:6, nrr:"+0.425", pts:16},
        {team:"Sunrisers Hyderabad", p:14, w:7, l:7, nrr:"+0.225", pts:14},
        {team:"Rajasthan Royals", p:14, w:5, l:9, nrr:"+0.125", pts:10},
        {team:" Punjab Kings", p:14, w:7, l:7, nrr:"+0.120", pts:14},
        {team:"Chennai Super Kings", p:14, w:11, l:3, nrr:"+1.245", pts:22},
        {team:"Mumbai Indians", p:14, w:9, l:5, nrr:"+1.785", pts:18},
        {team:"Kolkata Knight Riders", p:14, w:9, l:5, nrr:"+1.620", pts:18},
        {team:"Delhi Capitals", p:14, w:3, l:11, nrr:"-1.248", pts:6},
        {team:"Lucknow Super Giants", p:14, w:6, l:8, nrr:"-0.152", pts:12},
    ];

    points.forEach((t,index)=>{

        const row=document.createElement("tr");

        if(index<4){
            row.style.background="rgba(255,215,0,.08)";
        }

        row.innerHTML=`
            <td>${index+1}</td>
            <td>${t.team}</td>
            <td>${t.p}</td>
            <td>${t.w}</td>
            <td>${t.l}</td>
            <td style="color:${t.nrr.startsWith('+') ? '#00c864' : '#ff5050'}">${t.nrr}</td>
            <td style="color:gold;font-weight:bold">${t.pts}</td>
        `;

        tb.appendChild(row);

    });

}

// ════════════════════════════════════════════════════════════
// LIVE SCORE
// ════════════════════════════════════════════════════════════

function renderLiveScore() {
  const box = document.getElementById('live-score-box');
  if (!box) return;
  box.innerHTML = `
    <div class="live-card">
      <div class="lc-head">
        <div class="lc-match">
          <span style="font-size:2rem">
             <img src="images/mi.jpg" class="team-logo" alt="Team Logo">
          </span>
          <div>
            <div class="lc-team">Mumbai Indians</div>
            <div class="lc-score">186/4</div>
            <div class="lc-overs">18.2 overs</div>
          </div>
        </div>
        <span class="lc-badge">🔴 LIVE</span>
        <div class="lc-match">
          <div style="text-align:right">
            <div class="lc-team">Royal Challengers Bengaluru</div>
            <div class="lc-score">Yet to bat</div>
            <div class="lc-overs">Target: TBD</div>
          </div>
          <span style="font-size:2rem">
               <img src="images/rcb.jpg" class="team-logo" alt="Team Logo">
          </span>
        </div>
      </div>
      <div class="lc-commentary">
        <div class="lc-ball">18.2 · Bumrah to Kohli — <b style="color:var(--gold)">SIX!</b> Over mid-on, 186/4</div>
        <div class="lc-ball">18.1 · Bumrah to Kohli — <b>1 run</b>, pushed to covers</div>
        <div class="lc-ball">17.6 · Boult to SKY — <b style="color:#ff5050">OUT! Caught at deep mid-wicket</b></div>
        <div class="lc-ball">17.5 · Boult to SKY — <b style="color:var(--gold)">FOUR!</b> Sliced over point, 179/3</div>
      </div>
    </div>
  `;
}

// ════════════════════════════════════════════════════════════
// FAQ
// ════════════════════════════════════════════════════════════

function renderFAQ() {
  const l = document.getElementById('faq-list');
  if (!l) return;
  FAQS.forEach(f => {
    const d = document.createElement('div');
    d.className = 'faq-item';
    d.innerHTML = `
      <div class="faq-q" onclick="toggleFAQ(this)">${f.q}<span>+</span></div>
      <div class="faq-a">${f.a}</div>
    `;
    l.appendChild(d);
  });
}

function toggleFAQ(el) {
  const item = el.parentElement;
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!wasOpen) item.classList.add('open');
}

// ════════════════════════════════════════════════════════════
// CONTACT
// ════════════════════════════════════════════════════════════

function submitContact(e) {
  e.preventDefault();
  document.getElementById('contact-form').reset();
  const s = document.getElementById('cf-success');
  s.classList.remove('hidden');
  setTimeout(() => s.classList.add('hidden'), 4000);
}

// ════════════════════════════════════════════════════════════
// SCROLL ANIMATIONS
// ════════════════════════════════════════════════════════════

function initScrollAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fu').forEach(el => obs.observe(el));
}

// ════════════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // Login page
  initParticles();
  renderLoginTeams();

  // Check existing session
  const saved = sessionStorage.getItem('ipl_user');
  if (saved) {
    const u = JSON.parse(saved);
    enterSite(u.name);
  }

  // Pre-render all sections
  renderTicker();
  renderAboutTeams();
  renderPlayers('all');
  renderSchedule('all');
  renderStats();
  // renderNews();
  renderGallery('all');
  initPoll();
  renderComments();
  initQuiz();
  renderPointsTable();
  renderLiveScore();
  renderFAQ();
  initNavbar();

  // Keyboard ESC closes modal
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeTeamModal(); });
});

// Open booking popup
function openBooking() {
  document.getElementById("bookingPopup").classList.add("active");
}

// Close booking popup
function closeBooking() {
  document.getElementById("bookingPopup").classList.remove("active");
}

// Form submit handler
function bookTicket(event) {
  event.preventDefault();

  alert("🎟️ Ticket Booked Successfully!");

  // close popup after booking
  closeBooking();

  // optional: reset form
  event.target.reset();
}