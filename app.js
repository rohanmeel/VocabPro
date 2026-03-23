// VocabPro Mock functionality

// -- Particle Engine (Sakura & Gold Dust) --
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const particleCount = 30; // Amount of particles on screen

  for (let i = 0; i < particleCount; i++) {
    createSingleParticle(container);
  }
}

function createSingleParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'sakura'; // Focus exclusively on peaceful sakura

  // Randomize starting position, animation duration, and delay
  const startX = Math.random() * 100; // 0 to 100vw
  const duration = Math.random() * 5 + 5; // 5 to 10 seconds
  const delay = Math.random() * 5; // 0 to 5 seconds delay
  const size = (Math.random() * 10 + 10); // random sizing

  particle.style.left = `${startX}vw`;
  particle.style.animationDuration = `${duration}s`;
  particle.style.animationDelay = `${delay}s`;

  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  container.appendChild(particle);

  // Re-create particle when animation ends to keep the loop infinite but dynamic
  setTimeout(() => {
    particle.remove();
    createSingleParticle(container);
  }, (duration + delay) * 1000);
}

// Initialize particles on load
window.addEventListener('DOMContentLoaded', createParticles);

// -- Navbar scroll effect --
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  const currentScrollY = window.scrollY;

  if (currentScrollY > 50) {
    navbar.style.background = 'rgba(8, 3, 3, 0.95)';
    navbar.style.boxShadow = '0 4px 20px rgba(143, 172, 145, 0.2)'; // Peaceful Bamboo Green shadow
  } else {
    navbar.style.background = 'rgba(8, 3, 3, 0.8)';
    navbar.style.boxShadow = 'none';
  }

  // Hide on scroll down, show on scroll up
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    navbar.classList.add('nav-hidden');
  } else {
    navbar.classList.remove('nav-hidden');
  }

  lastScrollY = currentScrollY;
});

// -- Auth Modal feature --
const navSigninBtn = document.getElementById('nav-signin-btn');
const authModal = document.getElementById('auth-modal');
const closeModal = document.getElementById('close-modal');
const tabLogin = document.getElementById('tab-login');
const tabSignup = document.getElementById('tab-signup');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

// Show modal
navSigninBtn.addEventListener('click', () => {
  authModal.classList.add('show');
  resetAuthForms();
});

// Close modal
closeModal.addEventListener('click', () => {
  authModal.classList.remove('show');
});

// Close on outside click
window.addEventListener('click', (e) => {
  if (e.target === authModal) {
    authModal.classList.remove('show');
  }
});

// Switch tabs
tabLogin.addEventListener('click', () => {
  tabLogin.classList.add('active');
  tabSignup.classList.remove('active');
  loginForm.classList.add('active');
  signupForm.classList.remove('active');
});

tabSignup.addEventListener('click', () => {
  tabSignup.classList.add('active');
  tabLogin.classList.remove('active');
  signupForm.classList.add('active');
  loginForm.classList.remove('active');
});

// Form reset helper
function resetAuthForms() {
  loginForm.reset();
  signupForm.reset();
  document.getElementById('signup-success-msg').classList.add('hidden');
  document.getElementById('signup-submit-btn').classList.remove('hidden');
}

// Password Generator
const generatePwBtn = document.getElementById('generate-pw-btn');
const signupPassword = document.getElementById('signup-password');

generatePwBtn.addEventListener('click', () => {
  const chars = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    num: '0123456789',
    sym: '!@#$%^&*()_+~`|}{[]:;?><,./-='
  };

  // Guarantee at least one of each mandatory requirement
  let password = '';
  password += chars.upper[Math.floor(Math.random() * chars.upper.length)];
  password += chars.lower[Math.floor(Math.random() * chars.lower.length)];
  password += chars.num[Math.floor(Math.random() * chars.num.length)];
  password += chars.sym[Math.floor(Math.random() * chars.sym.length)];

  const allChars = chars.upper + chars.lower + chars.num + chars.sym;

  // Fill the rest up to 12 chars (safely over the 10 minimum limit)
  for (let i = 4; i < 12; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle string
  password = password.split('').sort(() => 0.5 - Math.random()).join('');

  signupPassword.value = password;

  // Change out type to text momentarily so user can see it
  signupPassword.type = 'text';
  generatePwBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';

  setTimeout(() => {
    signupPassword.type = 'password';
    generatePwBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i>';
  }, 3000);
});

// Password Validation Rule
function validatePassword(pw) {
  const hasUpper = /[A-Z]/.test(pw);
  const hasLower = /[a-z]/.test(pw);
  const hasNum = /[0-9]/.test(pw);
  const hasSym = /[^A-Za-z0-9]/.test(pw);
  return pw.length >= 10 && hasUpper && hasLower && hasNum && hasSym;
}

// Handle Sign Up
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const password = signupPassword.value;
  if (!validatePassword(password)) {
    alert("Password does not meet requirements. It needs 10+ characters, 1 uppercase, 1 lowercase, 1 number, and 1 symbol.");
    return;
  }

  // Generate 12-digit account number (100000000000 to 999999999999)
  const accountNum = Math.floor(Math.random() * 900000000000) + 100000000000;

  document.getElementById('account-number-display').innerText = accountNum;
  document.getElementById('signup-submit-btn').classList.add('hidden');
  document.getElementById('signup-success-msg').classList.remove('hidden');
});

// Proceeds to login
document.getElementById('proceed-login-btn').addEventListener('click', () => {
  tabLogin.click();
  document.getElementById('login-identifier').value = document.getElementById('account-number-display').innerText;
});

// Handle Login Mock
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const ident = document.getElementById('login-identifier').value;
  navSigninBtn.innerHTML = `<i class="fa-solid fa-user"></i> ${ident}`;
  authModal.classList.remove('show');
});


// -- Translator feature --
const swapBtn = document.getElementById('swap-lang');
const sourceLang = document.getElementById('source-lang');
const targetLang = document.getElementById('target-lang');
const sourceText = document.getElementById('source-text');
const targetText = document.getElementById('target-text');

swapBtn.addEventListener('click', () => {
  const tempLang = sourceLang.value;
  sourceLang.value = targetLang.value;
  targetLang.value = tempLang;

  const tempText = sourceText.value;
  if (targetText.innerText !== 'Translation will appear here...' && targetText.innerText !== '') {
    sourceText.value = targetText.innerText;
    targetText.innerText = tempText || 'Translation will appear here...';
  }
});

async function translateText() {
  const text = sourceText.value.trim();
  if (!text) {
    targetText.innerText = 'Please enter text to translate.';
    targetText.style.color = '#ffb7c5'; // Cherry blossom error color
    return;
  }

  targetText.style.color = '#a0a0a0';
  targetText.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Translating the essence...';

  const sLang = sourceLang.value;
  const tLang = targetLang.value;

  try {
    // Calling the free Google Translate API endpoint
    const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sLang}&tl=${tLang}&dt=t&q=${encodeURIComponent(text)}`);
    const data = await response.json();

    let translatedText = '';
    if (data && data[0]) {
      // Loop through translation segments in case of longer sentences
      data[0].forEach(item => {
        if (item[0]) translatedText += item[0];
      });
    }

    if (!translatedText) throw new Error("Translation failed");

    targetText.style.color = '#fdfbf7';

    // Output translation maintaining standard/casual structure for premium UI feel
    targetText.innerHTML = `
        <div style="margin-bottom: 0.8rem;">
            <strong style="color: var(--imperial-gold); font-size: 0.9em; text-transform: uppercase;">Standard (Google Translate API):</strong><br>
            ${translatedText}
        </div>
        <div>
            <strong style="color: var(--text-muted); font-size: 0.8em; font-style: italic;">
              Note: Live Translate APIs provide standardized, direct translations. <br> Use the AI Wordplay below to uncover poetic or conversational nuances!
            </strong>
        </div>
      `;
  } catch (error) {
    console.error("Translation Error: ", error);
    targetText.innerText = 'Translation service currently unavailable. Please try again later.';
    targetText.style.color = '#ffb7c5';
  }
}

// -- AI Wordplay feature --
const chatBox = document.getElementById('chat-box');
const wordplayInput = document.getElementById('wordplay-input');

wordplayInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendWordplay();
  }
});

async function sendWordplay() {
  const text = wordplayInput.value.trim();
  if (!text) return;

  // Add user message to chat
  appendMessage(text, 'user');
  wordplayInput.value = '';

  // Simulate AI "thinking"
  const thinkingId = appendMessage('<i class="fa-solid fa-circle-notch fa-spin"></i> Consulting my ancient dictionary scrolls...', 'ai');

  try {
    // Because unauthenticated third-party LLMs are unreliable (502/404), 
    // the Master relies on reliable ancient scrolls (Free Dictionary API + Wikipedia)
    
    // First, try Free Dictionary API for standard English definitions
    let aiText = '';
    
    try {
      const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(text)}`);
      if (dictRes.ok) {
        const data = await dictRes.json();
        const wordData = data[0];
        const phonetic = wordData.phonetic ? ` (<span style="color: var(--text-muted); font-style: italic;">${wordData.phonetic}</span>)` : '';
        aiText += `<strong style="color: var(--imperial-gold); font-size: 1.1em;">${wordData.word}</strong>${phonetic}<br><br>`;

        let examplesHtml = '';
        let examplesCount = 0;

        wordData.meanings.forEach(meaning => {
          aiText += `<strong style="color: var(--cherry-blossom);">${meaning.partOfSpeech}</strong><ul>`;
          meaning.definitions.slice(0, 2).forEach(def => {
            aiText += `<li style="margin-bottom: 0.5rem;">${def.definition}</li>`;
            if (def.example && examplesCount < 5) {
              examplesHtml += `<li><em>"${def.example}"</em></li>`;
              examplesCount++;
            }
          });
          aiText += `</ul>`;
        });

        if (examplesHtml) {
          aiText += `<br><strong style="color: var(--text-muted);">Everyday usage examples:</strong><ul style="margin-top: 0.5rem;">${examplesHtml}</ul>`;
        }
      } else {
        throw new Error("Not in dictionary");
      }
    } catch (dictError) {
      // If it's not a standard English dictionary word (like a foreign word 'Amor' or phrase), 
      // the Master consults the great encyclopedia scrolls (Wikipedia).

      // Cleanse conversational prompts like "Tell me about the spanish word amor" -> "amor"
      let searchWord = text.replace(/tell me (more )?about the (spanish|japanese|french|german|italian|russian|chinese) word /i, '').trim();
      searchWord = searchWord.replace(/tell me (more )?about /i, '').trim();

      // Guess language code based on user prompt (default 'en' if not specified)
      let langCode = 'en';
      if (/spanish/i.test(text)) langCode = 'es';
      else if (/japanese/i.test(text)) langCode = 'ja';
      else if (/french/i.test(text)) langCode = 'fr';
      else if (/german/i.test(text)) langCode = 'de';
      else if (/italian/i.test(text)) langCode = 'it';
      else if (/russian/i.test(text)) langCode = 'ru';
      else if (/chinese/i.test(text)) langCode = 'zh';

      const wikiRes = await fetch(`https://${langCode}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchWord)}`);
      
      if (!wikiRes.ok) {
         // Fallback to English wiki if foreign wiki fails
         const fallbackRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchWord)}`);
         if (!fallbackRes.ok) throw new Error("Not in Wiki at all");
         
         const wikiData = await fallbackRes.json();
         if (wikiData.type === "disambiguation" || wikiData.type === "no-extract") throw new Error("Wiki ambiguous");
         
         aiText = `<strong style="color: var(--imperial-gold); font-size: 1.1em;">${wikiData.title}</strong><br><br>`;
         aiText += `<p>${wikiData.extract}</p>`;
      } else {
         const wikiData = await wikiRes.json();
         if (wikiData.type === "disambiguation" || wikiData.type === "no-extract") throw new Error("Wiki ambiguous");
         
         aiText = `<strong style="color: var(--imperial-gold); font-size: 1.1em;">${wikiData.title}</strong><br><br>`;
         
         // In a real app, we'd translate the foreign extract, but for Master Xian, explaining it works.
         aiText += `<p>${wikiData.extract}</p>`;
      }
    }

    document.getElementById(thinkingId).remove();
    appendMessage(aiText, 'ai');

  } catch (error) {
    document.getElementById(thinkingId).remove();
    appendMessage(`Alas, the phrase <strong style="color: var(--cherry-blossom);">"${text}"</strong> eludes my current scrolls. The AI service may be overwhelmed or resting. Please try again.`, 'ai');
  }
}

function appendMessage(content, sender) {
  const id = 'msg-' + Date.now();
  const div = document.createElement('div');
  div.id = id;
  div.className = `msg ${sender}-msg`;

  const avatar = sender === 'user' ? 'You' : '仙';

  div.innerHTML = `
    <div class="msg-avatar">${avatar}</div>
    <div class="msg-content">${content}</div>
  `;

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
  return id;
}

// -- Learn Section Path Logic --
const learnModal = document.getElementById('learn-modal');
const closeLearnModalBtn = document.getElementById('close-learn-modal');
const learnLangTitle = document.getElementById('learn-lang-title');
const learnOfficialTitle = document.getElementById('learn-official-title');
const learnOfficialDesc = document.getElementById('learn-official-desc');
const pathDetails = document.getElementById('learning-path-details');
const pathLevelsContainer = document.getElementById('path-levels-container');

// Premium aesthetic background imagery for different cultures
const languageBackgrounds = {
  'Japanese': 'url("https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2070&auto=format&fit=crop")', // Sakura landscape
  'Chinese': 'url("https://4kwallpapers.com/images/walls/thumbs_3t/4772.jpg")', // User provided Red Lantern Street
  'Latin American Spanish': 'url("https://4kwallpapers.com/images/walls/thumbs_3t/14129.jpg")', // User provided Mexico City
  'Russian': 'url("https://images.unsplash.com/photo-1547448415-e9f5b28e570d?q=80&w=2070&auto=format&fit=crop")', // Moscow/Winter aesthetic
  'French': 'url("https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop")', // Paris romantic vibe
  'Italian': 'url("https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?q=80&w=2067&auto=format&fit=crop")', // Italian coast/Rome
  'German': 'url("https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070&auto=format&fit=crop")' // Neuschwanstein Castle/Bavarian Alps
};

let currentSelectedLanguage = '';

function openLearnModal(lang) {
  currentSelectedLanguage = lang;
  learnLangTitle.innerText = lang;

  // Set aesthetic cultural background
  if (languageBackgrounds[lang]) {
    learnModal.style.backgroundImage = languageBackgrounds[lang];
  } else {
    learnModal.style.backgroundImage = 'none';
  }

  // Reset path details view
  pathDetails.classList.add('hidden');
  pathLevelsContainer.innerHTML = '';

  // Update Official Level Title/Desc based on language
  if (lang === 'Japanese') {
    learnOfficialTitle.innerHTML = '<i class="fa-solid fa-certificate"></i> JLPT Levels';
    learnOfficialDesc.innerText = 'Master the Japanese Language Proficiency Test standard levels from N5 to N1.';
  } else if (lang === 'Chinese') {
    learnOfficialTitle.innerHTML = '<i class="fa-solid fa-certificate"></i> HSK Levels';
    learnOfficialDesc.innerText = 'Conquer the Hanyu Shuiping Kaoshi standard levels for Mandarin proficiency.';
  } else {
    // European Languages
    learnOfficialTitle.innerHTML = '<i class="fa-solid fa-certificate"></i> CEFR Levels';
    learnOfficialDesc.innerText = 'Follow the Common European Framework of Reference from A1 to C2.';
  }

  learnModal.classList.add('show');
}

closeLearnModalBtn.addEventListener('click', () => {
  learnModal.classList.remove('show');
});

window.addEventListener('click', (e) => {
  if (e.target === learnModal) {
    learnModal.classList.remove('show');
  }
});

function startLearningPath(type) {
  pathDetails.classList.remove('hidden');
  pathLevelsContainer.innerHTML = ''; // clear old

  let levels = [];

  if (type === 'grade') {
    document.getElementById('path-selection-title').innerText = 'Select Grade Level';
    levels = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];
  } else if (type === 'official') {
    document.getElementById('path-selection-title').innerText = 'Select Official Level';
    if (currentSelectedLanguage === 'Japanese') {
      levels = ['N5 (Beginner)', 'N4 (Basic)', 'N3 (Intermediate)', 'N2 (Advanced)', 'N1 (Fluent)'];
    } else if (currentSelectedLanguage === 'Chinese') {
      levels = ['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4', 'HSK 5', 'HSK 6'];
    } else {
      // European
      levels = ['A1 (Beginner)', 'A2 (Elementary)', 'B1 (Intermediate)', 'B2 (Upper Intermediate)', 'C1 (Advanced)', 'C2 (Mastery)'];
    }
  } else if (type === 'self') {
    document.getElementById('path-selection-title').innerText = 'Tailor Your Curriculum (Select all that apply)';
    levels = [
      { id: 'opt-structured', text: 'Structured Core Lessons' },
      { id: 'opt-pace', text: 'Flexible Pacing' },
      { id: 'opt-volume', text: 'Custom Daily Volume' },
      { id: 'opt-focus', text: 'Specialized Topic Focus' },
      { id: 'opt-goals', text: 'Targeted Milestone Tracking' },
      { id: 'opt-assess', text: 'Adaptive Proficiency Tests' }
    ];
  }

  // Handle building the buttons depending on path type
  if (type === 'self') {
    // Multi-select logic for Self Learning
    const selectedOptions = new Set();

    levels.forEach(lvl => {
      const btn = document.createElement('button');
      btn.className = 'path-lvl-btn';
      btn.innerText = lvl.text;
      btn.onclick = () => {
        if (selectedOptions.has(lvl.id)) {
          selectedOptions.delete(lvl.id);
          btn.classList.remove('selected');
        } else {
          selectedOptions.add(lvl.id);
          btn.classList.add('selected');
        }
      };
      pathLevelsContainer.appendChild(btn);
    });

    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'btn btn-primary';
    confirmBtn.innerText = 'Begin Custom Journey';
    confirmBtn.style.width = '100%';
    confirmBtn.style.marginTop = '1.5rem';
    confirmBtn.onclick = () => {
      if (selectedOptions.size === 0) {
        alert("Please select at least one curriculum option to begin.");
      } else {
        alert(`Curriculum tailored with ${selectedOptions.size} options for ${currentSelectedLanguage}.`);
      }
    };
    pathLevelsContainer.appendChild(confirmBtn);

  } else {
    // Single-select logic for Grade / Official
    levels.forEach(lvl => {
      const btn = document.createElement('button');
      btn.className = 'path-lvl-btn';
      btn.innerText = lvl;
      btn.onclick = () => alert(`Starting ${currentSelectedLanguage} path: ${lvl}`);
      pathLevelsContainer.appendChild(btn);
    });
  }

  // Scroll to the dynamically added content
  pathDetails.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
