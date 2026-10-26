/* ===================================================================
   Nayan A. Pise | Portfolio Scripts
   =================================================================== */

const $ = (id) => document.getElementById(id);
const GITHUB_BASE = "https://github.com/nayan-pise/";

/* -------------------------------------------------------------------
   1. Canvas Ambient Embers & Particle Sparks
   ------------------------------------------------------------------- */
let mouseX = -999, mouseY = -999;

(() => {
  const canvas = $("stars");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];

  const createParticle = (randomY = false) => ({
    x: Math.random() * canvas.width,
    y: randomY ? Math.random() * canvas.height : canvas.height + 15,
    radius: Math.random() * 1.5 + 0.5,
    speedY: Math.random() * 0.45 + 0.15,
    phase: Math.random() * Math.PI * 2,
    flickerSpeed: Math.random() * 0.03 + 0.015,
  });

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = Array.from({ length: 45 }, () => createParticle(true));
  };
  resize();
  window.addEventListener("resize", resize);

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function render(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, idx) => {
      p.y -= p.speedY;
      p.x += Math.sin(time / 1600 + p.phase) * 0.35;

      const dist = Math.hypot(p.x - mouseX, p.y - mouseY);
      const isNear = dist < 180;

      if (p.y < -15) {
        particles[idx] = createParticle(false);
      }

      const alpha = (0.15 + 0.35 * Math.abs(Math.sin(time * p.flickerSpeed + p.phase))) * (isNear ? 1.4 : 0.85);

      ctx.save();
      ctx.globalAlpha = Math.min(alpha, 1);
      ctx.shadowBlur = isNear ? 14 : 4;
      ctx.shadowColor = "#00ffc3";
      ctx.fillStyle = isNear ? "#1cd8d2" : "#00ffc3";

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * (isNear ? 1.6 : 1), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    if (!reducedMotion) requestAnimationFrame(render);
  }
  render(0);
})();

/* -------------------------------------------------------------------
   2. Interactive Flashlight Bloom & Cursor
   ------------------------------------------------------------------- */
(() => {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  const bloom = $("bloom");
  const cur = $("cur");
  if (!bloom || !cur) return;

  let targetX = -999, targetY = -999;
  let curX = -999, curY = -999;
  let scale = 1, targetScale = 1;

  window.addEventListener("pointermove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    mouseX = targetX;
    mouseY = targetY;

    targetScale = e.target.closest("a, button, input, .final-project-card, .tl-node, .sk-btn") ? 1.6 : 1;
  });

  window.addEventListener("pointerdown", () => {
    targetScale = 2.2;
    setTimeout(() => (targetScale = 1), 220);
  });

  function loop() {
    curX += (targetX - curX) * 0.18;
    curY += (targetY - curY) * 0.18;
    scale += (targetScale - scale) * 0.14;

    bloom.style.transform = `translate(${curX - 260}px, ${curY - 260}px) scale(${scale})`;
    cur.style.transform = `translate(${targetX - 5}px, ${targetY - 5}px)`;

    requestAnimationFrame(loop);
  }
  loop();
})();

/* -------------------------------------------------------------------
   3. Navigation, Scroll Spy & Mobile Menu
   ------------------------------------------------------------------- */
const burger = $("burger");
const mobileMenu = $("mobile-menu");
if (burger && mobileMenu) {
  burger.onclick = () => mobileMenu.classList.toggle("open");
  mobileMenu.onclick = () => mobileMenu.classList.remove("open");
}

const navSections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let currentId = "";
  const scrollPos = window.scrollY + 200;

  navSections.forEach((sec) => {
    if (scrollPos >= sec.offsetTop) {
      currentId = sec.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
});

/* -------------------------------------------------------------------
   4. Live Headline Typing Effect
   ------------------------------------------------------------------- */
(() => {
  const typEl = $("typ");
  if (!typEl) return;
  const roles = [
    "AI/ML Engineer",
    "LLM Post-Training & RAG Systems",
    "Full-Stack AI Developer",
    "Autonomous Agent Architect"
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const current = roles[roleIdx];
    charIdx += isDeleting ? -1 : 1;
    typEl.textContent = current.slice(0, charIdx);

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === current.length) {
      isDeleting = true;
      speed = 1800;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 400;
    }
    setTimeout(type, speed);
  }
  type();
})();

/* -------------------------------------------------------------------
   5. Interactive Skills Arc Wheel
   ------------------------------------------------------------------- */
const SKILLS_DATA = [
  ["Py", "Python", "Primary language for ML modeling, PyTorch, LangChain, and high-performance FastAPI backends."],
  ["LC", "LangChain", "Framework for constructing multi-step LLM chains, semantic memory, and tool integration."],
  ["LG", "LangGraph", "Cyclic, stateful multi-agent architectures and autonomous decision-making loops."],
  ["RAG", "RAG Systems", "Retrieval-augmented generation combining vector search, chunking, and embeddings."],
  ["FA", "FastAPI", "High-throughput asynchronous REST APIs for low-latency ML and LLM inference."],
  ["Re", "React.js", "Modern web frontends for AI applications, dashboards, and real-time interaction."],
  ["TF", "TensorFlow", "Deep learning CNNs, image recognition, and model tuning."],
  ["SK", "Scikit-learn", "Statistical modeling, clustering, PCA, Random Forest classification, and fraud detection."],
  ["SQL", "SQL", "Relational database schema architecture, indexing, and high-efficiency querying."],
  ["Dk", "Docker", "Containerizing full-stack microservices, ML dependencies, and reproducible deployments."],
  ["Git", "Git & GitHub", "Collaborative version control, CI/CD automation, and open-source contributions."],
  ["AWS", "AWS & Cloud", "Deploying compute instances (EC2), cloud storage (S3), and Oracle OCI GenAI."]
];

let selectedSkillIdx = 0;
const arcContainer = $("arc-container");

function updateSkillDetail(idx) {
  selectedSkillIdx = idx;
  document.querySelectorAll(".sk-btn").forEach((btn, k) => {
    btn.classList.toggle("active", k === idx);
  });
  const sc = $("sk-center-card");
  if (sc) {
    sc.innerHTML = `
      <b>${SKILLS_DATA[idx][0]}</b>
      <h4>${SKILLS_DATA[idx][1]}</h4>
      <p>${SKILLS_DATA[idx][2]}</p>
    `;
  }
}

function renderSkillsArc() {
  if (!arcContainer) return;
  arcContainer.querySelectorAll(".sk-btn").forEach((e) => e.remove());

  const w = arcContainer.clientWidth;
  const h = arcContainer.clientHeight;
  const radius = Math.min(w / 2 - 45, h * 0.85);

  SKILLS_DATA.forEach((s, idx) => {
    const angle = Math.PI * (1 - idx / (SKILLS_DATA.length - 1));
    const btn = document.createElement("button");
    btn.className = "sk-btn";
    btn.innerHTML = `<b>${s[0]}</b>${s[1]}`;
    btn.style.left = `${w / 2 + Math.cos(angle) * radius}px`;
    btn.style.top = `${h * 0.88 - Math.sin(angle) * radius}px`;

    btn.onclick = btn.onmouseenter = () => updateSkillDetail(idx);
    arcContainer.appendChild(btn);
  });
  updateSkillDetail(selectedSkillIdx);
}

if (arcContainer) {
  renderSkillsArc();
  window.addEventListener("resize", renderSkillsArc);

  setInterval(() => {
    if (!arcContainer.matches(":hover")) {
      updateSkillDetail((selectedSkillIdx + 1) % SKILLS_DATA.length);
    }
  }, 3600);
}

/* -------------------------------------------------------------------
   6. AI Buddy Assistant (Interactive In-Browser Q&A + Voice)
   ------------------------------------------------------------------- */
const KNOWLEDGE_BASE = {
  projects: "Top projects from Nayan's resume: (1) VoiceHealth - React Native (Expo) app using Gemini 1.5 Flash native audio understanding to log health metrics (hydration, sleep, habits, nutrition) from 1 spoken sentence with Supabase; (2) InterviewIQ - Full-stack mock interview platform with Gemini AI resume question generator, Monaco live code editor, automated JSON grading, and proctoring; (3) SignBridge - Real-time sign-language video calling with WebRTC, SocketIO, and MediaPipe hand-landmark classification.",
  experience: "Nayan has completed impactful industry internships: (1) LLM Post-Training Intern at Ethara.ai (Feb 2026 – June 2026), tuning LLMs via SFT and RLHF to mitigate hallucinations (90% precision improvement) and designing prompt architectures boosting color-picker selection accuracy by 40%; (2) ML Engineer Intern at CodSoft (Nov 2025 – Dec 2025), building 3 production pipelines (Fraud, Spam, Churn) over 15,000+ records and cutting false positives by 15% with 94% reliability.",
  skills: "Technical Skills directly from Nayan's resume: Foundational CS (DS&A, OOP, OS, Networks, DBMS, SQL/NoSQL), Languages (Python, C++, SQL, HTML/CSS), Generative AI & LLMs (LangChain, LangGraph, RAG, Prompt Engineering, Agentic AI, Vector DBs, LLMOps), Web & Analytics (FastAPI, Flask, React.js, Express.js, Node.js, Next.js, TensorFlow, Scikit-learn, Pandas, NumPy, Power BI), Testing (TDD, PyTest), DevOps (CI/CD, Docker, Git, AWS EC2/S3, Azure, GCP).",
  achievements: "Certifications: UMich Applied ML in Python, Google IT Support Professional, NPTEL Cloud Computing (Top 5%), Oracle OCI AI/GenAI. Hackathons: EY Techathon 6.0 Top 100 teams nationally (5000+), Adobe Hackathon Top 50 teams nationally (6000+), and Tata Imagination Challenge (Qualified Round 2).",
  education: "B.Tech in Computer Science and Engineering (AI & ML) at Vellore Institute of Technology (VIT Bhopal), maintaining a strong 8.40/10 CGPA (Sep 2023 – March 2027).",
  contact: "Email: nayan.pise8347@gmail.com | Phone: +91-9834794289 | GitHub: github.com/nayan-pise | LinkedIn: linkedin.com/in/nayan-pise",
  resume: "You can download Nayan's official resume by clicking 'My Resume' or 'Resume' in the navigation bar!",
  ethara: "At Ethara.ai (Feb 2026 – June 2026), Nayan tuned LLMs for video workflows via Supervised Fine-Tuning (SFT) and RLHF across multiple iterations, evaluating outputs to mitigate hallucinations and raising model precision by 90%. He also created a prompt system boosting high-accuracy color picker selections by 40%.",
  codsoft: "At CodSoft (Nov 2025 – Dec 2025), Nayan engineered 3 scalable Python pipelines (Fraud, Spam, Churn) for 15,000+ records (20% data quality gain) and tuned Random Forest classifiers to cut false positives by 15% with 94% detection reliability."
};

const KEYWORD_MAP = [
  [["project", "built", "work", "portfolio", "app", "model"], "projects"],
  [["experience", "intern", "internship", "job", "work history"], "experience"],
  [["skill", "tech", "stack", "language", "framework", "tool"], "skills"],
  [["achiev", "award", "hackathon", "ey", "tata", "adobe", "rank"], "achievements"],
  [["educat", "college", "vit", "bhopal", "cgpa", "study", "degree"], "education"],
  [["contact", "email", "reach", "hire", "phone", "linkedin", "message"], "contact"],
  [["resume", "cv", "pdf", "download"], "resume"],
  [["ethara", "sft", "rlhf", "llm fine-tuning"], "ethara"],
  [["codsoft", "fraud", "churn", "spam"], "codsoft"]
];

function getBotReply(query) {
  const q = query.toLowerCase();
  for (const [triggers, topic] of KEYWORD_MAP) {
    if (triggers.some((word) => q.includes(word))) {
      return KNOWLEDGE_BASE[topic];
    }
  }
  return "I'm Nayan's AI buddy! I can answer anything about his projects, internships (Ethara.ai, CodSoft), tech stack, hackathon awards, education at VIT Bhopal, or how to contact him. What would you like to know?";
}

const buddyMsgs = $("buddy-messages");
const buddyForm = $("buddy-form");
const buddyInput = $("buddy-input");
const buddyClear = $("buddy-clear");
const buddyChips = $("buddy-chips");

function appendBuddyMsg(text, isUser = false) {
  if (!buddyMsgs) return;
  const row = document.createElement("div");
  row.className = `buddy-row ${isUser ? "user" : "bot"}`;
  row.innerHTML = `<div class="buddy-bubble">${text}</div>`;
  buddyMsgs.appendChild(row);
  buddyMsgs.scrollTop = buddyMsgs.scrollHeight;
}

function initBuddy() {
  if (!buddyMsgs) return;
  buddyMsgs.innerHTML = "";
  appendBuddyMsg("🙏 Namaste! I'm Nayan's AI Assistant. Ask me anything about his projects, skills, internships, or achievements!");
}

function handleBuddyAsk(text) {
  if (!text || !text.trim()) return;
  appendBuddyMsg(text, true);
  setTimeout(() => {
    const reply = getBotReply(text);
    appendBuddyMsg(reply, false);

    // Natural Voice TTS if supported
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(reply.slice(0, 160));
        utter.rate = 1.05;
        window.speechSynthesis.speak(utter);
      } catch (err) {
        console.warn("Speech synthesis error:", err);
      }
    }
  }, 350);
}

if (buddyForm) {
  buddyForm.onsubmit = (e) => {
    e.preventDefault();
    if (buddyInput) {
      handleBuddyAsk(buddyInput.value);
      buddyInput.value = "";
    }
  };
}
if (buddyClear) buddyClear.onclick = initBuddy;

if (buddyChips) {
  const chips = ["Projects", "Internships", "Skills", "Achievements", "Contact"];
  buddyChips.innerHTML = chips.map((c) => `<button type="button" class="buddy-chip">${c}</button>`).join("");
  buddyChips.onclick = (e) => {
    if (e.target.tagName === "BUTTON") {
      handleBuddyAsk(e.target.textContent);
    }
  };
}
initBuddy();

/* -------------------------------------------------------------------
   7. Projects Showcase & Filter (Sparsh Style .final-project-card)
   ------------------------------------------------------------------- */
const PROJECTS = [
  {
    title: "VoiceHealth - Voice AI Health App",
    category: "AI & LLM",
    description: "Devised a React Native (Expo) Android app using Gemini 1.5 Flash native audio understanding to log health data (hydration, sleep, habits, nutrition) from a single spoken sentence with zero manual entry, backed by a dynamic NativeWind dashboard and Supabase sync.",
    repo: "CalmHealthApp",
    tags: ["React Native", "Gemini 1.5 Flash", "Supabase", "NativeWind", "Voice AI"],
    image: ""
  },
  {
    title: "InterviewIQ - Enterprise Mock Interview Platform",
    category: "AI & LLM",
    description: "Developed a full-stack platform with 3 interview modes generating tailored questions from candidate resumes via Gemini AI, an embedded Monaco live coding editor with time-complexity analysis and automated JSON-based grading, STAR-method behavioral rounds, and 3 enterprise proctoring controls.",
    repo: "AI-mock-interview-enterprices-platform",
    tags: ["Gemini AI", "Monaco Editor", "Flask", "SQLite", "Proctoring"],
    image: "assets/project1.png"
  },
  {
    title: "SignBridge - Real-Time Sign-Language Video Calling",
    category: "AI & LLM",
    description: "Deployed a real-time peer-to-peer video calling web app using SocketIO and WebRTC. Trained a MediaPipe hand-landmark classifier to detect sign-language gestures live on-screen, and implemented speech-to-sign via Web Speech API.",
    repo: "Sign-Bridge-2.0-Updated-version-",
    tags: ["WebRTC", "MediaPipe", "SocketIO", "Web Speech API", "Computer Vision"],
    image: "assets/project4.png"
  },
  {
    title: "Signature Forgery Detection",
    category: "Computer Vision & ML",
    description: "Built a deep Convolutional Neural Network (CNN) trained on 1,000+ images, attaining 96% detection rate with inference speed optimized to under 200ms.",
    repo: "-Signature-Forgery-Detection",
    tags: ["TensorFlow", "CNN", "OpenCV", "Deep Learning"],
    image: "assets/project3.png"
  },
  {
    title: "Heart Disease Prediction System",
    category: "Computer Vision & ML",
    description: "Clinical predictive modeling analyzing 4,000+ patient records, achieving 92% diagnostic accuracy with 25% dimensionality reduction via PCA.",
    repo: "-Heartbeat-Sound-Classifier-Flask-",
    tags: ["Python", "Scikit-learn", "Pandas", "PCA"],
    image: "assets/project2.png"
  },
  {
    title: "AI Data Analyst Agent",
    category: "AI & LLM",
    description: "Automated data exploration and insight assistant that takes raw CSV/Excel files and generates interactive charts, SQL queries, and trend summaries.",
    repo: "AI-Data-analyst",
    tags: ["Python", "LLMs", "Pandas", "DataViz"],
    image: ""
  },
  {
    title: "RAG Document Q&A System",
    category: "AI & LLM",
    description: "High-accuracy retrieval-augmented question answering engine over proprietary PDF manuals using vector embeddings and chunk-level reranking.",
    repo: "RAG-Based-question-and-answering-system",
    tags: ["RAG", "LangChain", "Vector DB", "Embeddings"],
    image: ""
  },
  {
    title: "Automated B2B Revenue Engine",
    category: "Web & Automation",
    description: "Multi-agent autonomous pipeline orchestrating prospect enrichment, personalized outreach drafting, and CRM sync for B2B revenue workflows.",
    repo: "-The-Automated-B2B-Revenue-Engine",
    tags: ["Automation", "Agents", "APIs", "Python"],
    image: ""
  },
  {
    title: "VLA Inference Engine",
    category: "AI & LLM",
    description: "High-throughput inference pipeline for Vision-Language-Action (VLA) robotics and multimodal decision-making models.",
    repo: "vla-inference-engine",
    tags: ["VLA", "Multimodal", "Python", "Inference"],
    image: ""
  },
  {
    title: "Vedaz LLM Fine-Tuning",
    category: "AI & LLM",
    description: "Supervised fine-tuning (SFT) and evaluation framework on open-source weights (Llama/Mistral) for domain-specific conversation.",
    repo: "vedaz-llm-finetuning",
    tags: ["SFT", "LoRA", "HuggingFace", "PyTorch"],
    image: ""
  },
  {
    title: "Closira AI Support Simulation",
    category: "AI & LLM",
    description: "Multi-agent role-playing environment simulating real-world customer escalations, automated triage, and SLA resolution.",
    repo: "Closira-AI-Customer-Support-Simulation-",
    tags: ["AI Agents", "Simulation", "LLMs"],
    image: ""
  },
  {
    title: "Sentinel Forensics Dashboard",
    category: "Web & Automation",
    description: "Real-time threat monitoring and forensic log analysis system with interactive alert visualizations.",
    repo: "Sentinal-",
    tags: ["Forensics", "Python", "Security"],
    image: ""
  },
  {
    title: "QuickVoice Open Source Contribution",
    category: "Web & Automation",
    description: "Contributed features and performance improvements to the QuickVoice open source speech toolkit.",
    repo: "QuickVoice",
    tags: ["Open Source", "Audio", "Python"],
    image: ""
  },
  {
    title: "GrowEasy Bulk CSV Importer",
    category: "Web & Automation",
    description: "High-throughput CSV import engine with streaming validation, database batching, and error recovery.",
    repo: "groweasy-csv-importer",
    tags: ["Express.js", "CSV", "Batching", "Web"],
    image: ""
  },
  {
    title: "Binance Testnet CLI Trader",
    category: "Web & Automation",
    description: "CLI trading utility communicating with the Binance Testnet for order execution, book checks, and risk limits.",
    repo: "binance-testnet-cli",
    tags: ["Python", "CLI", "Crypto API"],
    image: ""
  }
];

const projectsGrid = $("projects-grid");
const projectDialog = $("project-dialog");

function renderProjects(filterCategory = "All") {
  if (!projectsGrid) return;

  const filtered = filterCategory === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filterCategory || (filterCategory === "Featured" && p.image));

  projectsGrid.innerHTML = filtered.map((proj, idx) => {
    const ghUrl = proj.repo ? GITHUB_BASE + proj.repo : GITHUB_BASE;
    const hasImg = Boolean(proj.image);
    const banner = hasImg
      ? `<img src="${proj.image}" alt="${proj.title}" loading="lazy">`
      : `<div class="project-placeholder-banner" style="background: linear-gradient(135deg, hsl(${(idx * 53 + 160) % 360} 55% 18%), hsl(${(idx * 53 + 220) % 360} 65% 10%))">
          ${proj.title[0]}
        </div>`;

    return `
      <div class="final-project-card">
        <div class="final-project-image">
          ${banner}
        </div>
        <div class="final-project-content">
          <span class="project-watermark">${String(idx + 1).padStart(2, "0")}</span>
          <p class="project-category-tag">${proj.category}</p>
          <h3>${proj.title}</h3>
          <p class="project-desc">${proj.description}</p>
          <div class="project-tags-row">
            ${proj.tags.map((t) => `<span class="project-tag-pill">${t}</span>`).join("")}
          </div>
          <div class="final-project-buttons">
            <a href="${ghUrl}" target="_blank" rel="noopener noreferrer" class="btn-project-gh">GitHub ↗</a>
            <button class="btn-project-detail" data-idx="${PROJECTS.indexOf(proj)}">More Details</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  document.querySelectorAll(".btn-project-detail").forEach((btn) => {
    btn.onclick = () => {
      const p = PROJECTS[btn.dataset.idx];
      if (!p || !projectDialog) return;
      const ghUrl = p.repo ? GITHUB_BASE + p.repo : GITHUB_BASE;
      projectDialog.innerHTML = `
        <span class="section-tag">${p.category}</span>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="dialog-tags">
          ${p.tags.map((t) => `<span class="skill-pill">${t}</span>`).join("")}
        </div>
        <div class="hero-actions" style="margin-top:20px;">
          <a class="btn-gradient" href="${ghUrl}" target="_blank" rel="noopener noreferrer">View on GitHub ↗</a>
          <button class="btn-white" onclick="document.getElementById('project-dialog').close()">Close</button>
        </div>
      `;
      projectDialog.showModal();
    };
  });
}

if (projectDialog) {
  projectDialog.onclick = (e) => {
    if (e.target === projectDialog) projectDialog.close();
  };
}

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.onclick = () => {
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProjects(btn.dataset.filter);
  };
});
renderProjects("All");

/* -------------------------------------------------------------------
   8. 3D Certifications Carousel
   ------------------------------------------------------------------- */
const CERTS_DATA = [
  ["Cloud Computing", "NPTEL • Elite + Gold", "Ranked in Top 5% nationally in advanced cloud architecture, virtualization, and distributed systems.", "NPTEL"],
  ["Applied Machine Learning in Python", "University of Michigan", "Practical ML pipelines with Scikit-learn: classification, regression, and model evaluation.", "UMich"],
  ["Oracle OCI GenAI Professional", "Oracle Cloud", "Architecting Generative AI applications, embeddings, and enterprise LLM solutions on OCI.", "OCI AI"],
  ["Oracle OCI AI Foundations", "Oracle Cloud", "Foundational AI principles, computer vision, natural language processing, and cloud services.", "Oracle"],
  ["Google IT Support Professional", "Google", "Professional certificate covering system administration, troubleshooting, and networking.", "Google"],
  ["Tata Imagination Challenge", "Qualified Round 2", "Selected among national qualifiers for innovative technology-driven problem solving.", "Tata"],
  ["EY Techathon 6.0", "Top 100 Nationally", "Selected in Top 100 teams nationally out of 5,000+ participating engineering cohorts.", "EY"],
  ["Adobe Hackathon", "Top 50 Nationally", "Ranked in Top 50 teams across India out of 6,000+ competing engineering cohorts.", "Adobe"]
];

const certsContainer = $("certs-carousel-wrap");
if (certsContainer) {
  certsContainer.innerHTML = CERTS_DATA.map((c) => `
    <div class="cert-card">
      <div class="cert-img-badge">${c[3]}</div>
      <div class="cert-body">
        <h4>${c[0]}</h4>
        <small class="cert-issuer">${c[1]}</small>
        <p class="cert-desc">${c[2]}</p>
      </div>
    </div>
  `).join("");

  let currentCertIdx = 0;
  function updateCarousel() {
    const cards = document.querySelectorAll(".cert-card");
    const len = CERTS_DATA.length;

    cards.forEach((card, idx) => {
      let diff = idx - currentCertIdx;
      diff = ((diff + len * 1.5) % len) - len / 2;
      diff = Math.round(diff);

      const absDiff = Math.abs(diff);
      card.style.transform = `translateX(calc(-50% + ${diff * 200}px)) rotateY(${-diff * 32}deg) scale(${1 - absDiff * 0.12})`;
      card.style.opacity = absDiff > 2 ? 0 : 1 - absDiff * 0.28;
      card.style.zIndex = 10 - absDiff;
      card.style.pointerEvents = absDiff > 2 ? "none" : "auto";
    });
  }

  const prevBtn = $("cert-prev");
  const nextBtn = $("cert-next");
  if (prevBtn) prevBtn.onclick = () => {
    currentCertIdx = (currentCertIdx - 1 + CERTS_DATA.length) % CERTS_DATA.length;
    updateCarousel();
  };
  if (nextBtn) nextBtn.onclick = () => {
    currentCertIdx = (currentCertIdx + 1) % CERTS_DATA.length;
    updateCarousel();
  };
  updateCarousel();
}

/* -------------------------------------------------------------------
   9. Timeline Milestone Curve
   ------------------------------------------------------------------- */
const TIMELINE_DATA = [
  ["2023", "Joined VIT Bhopal", "Started B.Tech in Computer Science Engineering (AI & ML). Built foundational mastery in Data Structures, OOP, and web architecture."],
  ["2025", "ML Engineer Intern at CodSoft", "Engineered 3 scalable production ML pipelines (Fraud, Spam, Churn) over 15,000+ records, cutting false positives by 15%."],
  ["2026", "LLM Post-Training at Ethara.ai", "Mastered Supervised Fine-Tuning (SFT) and RLHF. Engineered prompt architectures lifting video feature accuracy by 40%."],
  ["Now", "AI Sales & Full-Stack AI Builder", "Currently AI Sales Intern at Huntfortomorrow, developing voice/RAG agent systems and building production-ready AI applications."]
];

(() => {
  const path = $("wave-path");
  const nodesGroup = $("timeline-nodes");
  const detailBox = $("timeline-detail");
  if (!path || !nodesGroup || !detailBox) return;

  const pathLen = path.getTotalLength();
  nodesGroup.innerHTML = "";

  TIMELINE_DATA.forEach((item, idx) => {
    const point = path.getPointAtLength((pathLen * idx) / (TIMELINE_DATA.length - 1));
    nodesGroup.insertAdjacentHTML("beforeend", `
      <g class="tl-node" tabindex="0" role="button" aria-label="${item[0]}">
        <circle cx="${point.x}" cy="${point.y}" r="34" />
        <text x="${point.x}" y="${point.y + 5}">${item[0]}</text>
      </g>
    `);
  });

  const nodes = [...nodesGroup.children];
  function setTimelineNode(idx) {
    nodes.forEach((n, k) => n.classList.toggle("active", k === idx));
    detailBox.innerHTML = `
      <h4>${TIMELINE_DATA[idx][1]} (${TIMELINE_DATA[idx][0]})</h4>
      <p>${TIMELINE_DATA[idx][2]}</p>
    `;
  }

  nodes.forEach((node, idx) => {
    node.onclick = () => setTimelineNode(idx);
    node.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") setTimelineNode(idx);
    };
  });
  setTimelineNode(0);
})();
