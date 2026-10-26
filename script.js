/* ===================================================================
   Nayan A. Pise | Portfolio Scripts
   =================================================================== */

const $ = (id) => document.getElementById(id);
const GITHUB_BASE = "https://github.com/nayan-pise/";

/* -------------------------------------------------------------------
   1. Canvas Embers & Ambient Floating Sparks
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
    particles = Array.from({ length: 48 }, () => createParticle(true));
  };
  resize();
  window.addEventListener("resize", resize);

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function render(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, idx) => {
      p.y -= p.speedY;
      p.x += Math.sin(time / 1600 + p.phase) * 0.35;

      // Mouse proximity interaction
      const dist = Math.hypot(p.x - mouseX, p.y - mouseY);
      const isNear = dist < 180;

      if (p.y < -15) {
        particles[idx] = createParticle(false);
      }

      const alpha = (0.15 + 0.35 * Math.abs(Math.sin(time * p.flickerSpeed + p.phase))) * (isNear ? 1.4 : 0.85);

      ctx.save();
      ctx.globalAlpha = Math.min(alpha, 1);
      ctx.shadowBlur = isNear ? 12 : 4;
      ctx.shadowColor = "#f59e0b";
      ctx.fillStyle = isNear ? "#fef08a" : "#f59e0b";

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * (isNear ? 1.6 : 1), 0, Math.PI * 2);
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

    // Hover scale up on interactive elements
    targetScale = e.target.closest("a, button, input, .project-card, .tl-node, .sk-btn") ? 1.6 : 1;
  });

  window.addEventListener("pointerdown", () => {
    targetScale = 2.2;
    setTimeout(() => (targetScale = 1), 220);
  });

  function loop() {
    curX += (targetX - curX) * 0.18;
    curY += (targetY - curY) * 0.18;
    scale += (targetScale - scale) * 0.14;

    bloom.style.transform = `translate(${curX - 250}px, ${curY - 250}px) scale(${scale})`;
    cur.style.transform = `translate(${targetX - 5}px, ${targetY - 5}px)`;

    requestAnimationFrame(loop);
  }
  loop();
})();

/* -------------------------------------------------------------------
   3. Header Navigation, Scroll Spy & Mobile Menu
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
    "LLM & RAG Systems Builder",
    "Full-Stack AI Developer",
    "Agentic Workflow Specialist"
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
      speed = 1800; // Pause at end of text
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 400; // Pause before typing next
    }
    setTimeout(type, speed);
  }
  type();
})();

/* -------------------------------------------------------------------
   5. Interactive Skills Arc Wheel
   ------------------------------------------------------------------- */
const SKILLS_DATA = [
  ["Py", "Python", "My primary language for ML pipelines, LLMs, FastAPI, and data manipulation."],
  ["LC", "LangChain", "Framework for building multi-step LLM chains, agentic workflows, and integrations."],
  ["LG", "LangGraph", "Constructing cyclic, stateful multi-agent architectures and reliable autonomous loops."],
  ["RAG", "RAG Systems", "Retrieval-augmented generation combining vector search, chunking, and embeddings."],
  ["FA", "FastAPI", "Building high-performance, asynchronous REST APIs for ML and LLM inference."],
  ["Re", "React.js", "Modern web frontends for AI applications, dashboards, and real-time interaction."],
  ["TF", "TensorFlow", "Deep learning model development, CNNs, image recognition, and model tuning."],
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

  // Auto-advance skills if user isn't hovering
  setInterval(() => {
    if (!arcContainer.matches(":hover")) {
      updateSkillDetail((selectedSkillIdx + 1) % SKILLS_DATA.length);
    }
  }, 3600);
}

/* -------------------------------------------------------------------
   6. AI Buddy Assistant (Interactive In-Browser Q&A)
   ------------------------------------------------------------------- */
const KNOWLEDGE_BASE = {
  projects: "Highlights include VoiceHealth (voice-logged health dashboard with Gemini 1.5 Flash), InterviewIQ (AI mock interview platform with Gemini & Monaco code editor), SignBridge (sign-language video calls via WebRTC & MediaPipe), plus an AI Data Analyst, RAG Q&A Engine, and Signature Forgery Detection CNN. Check out the Projects section below!",
  experience: "Nayan has gained rich real-world experience across 4 internships: (1) AI Sales Intern at Huntfortomorrow, (2) AI Web Developer Intern at Inambiguous Foundation, (3) LLM Post-Training Intern at Ethara.ai (tuned LLMs with SFT/RLHF; boosted prompt accuracy by 40%), and (4) ML Engineer Intern at CodSoft (built 3 production ML pipelines with 15% false positive reduction).",
  skills: "His core technical arsenal includes: Python, C/C++, SQL, LangChain, LangGraph, RAG, FastAPI, Flask, React.js, Next.js, TensorFlow, Scikit-learn, Pandas, Docker, Git, AWS (EC2/S3), and Oracle OCI Generative AI.",
  achievements: "Nayan is a Tata Imagination Challenge Semifinalist, EY Techathon 6.0 Top 100 National Finalist (out of 5,000+ teams), Adobe Hackathon Top 50 National Finalist (out of 6,000+ teams), and an open-source contributor to QuickVoice.",
  education: "He is a final-year B.Tech in Computer Science Engineering (AI & ML) student at Vellore Institute of Technology (VIT Bhopal), maintaining a strong CGPA of 8.40/10.",
  contact: "You can reach Nayan directly via email at nayan.pise8347@gmail.com, explore his GitHub at github.com/nayan-pise, or connect on LinkedIn at linkedin.com/in/nayan-pise-94a62a346/.",
  resume: "You can view or download Nayan's full resume right from the hero buttons or by clicking 'Download Resume' above!",
  ethara: "At Ethara.ai, Nayan specialized in LLM post-training using Supervised Fine-Tuning (SFT) and Reinforcement Learning from Human Feedback (RLHF). He engineered a smart prompt system for a video color-picker tool that raised model accuracy by 40%.",
  codsoft: "At CodSoft, Nayan engineered 3 scalable ML pipelines (Fraud, Spam, Churn) over 15,000+ records, cutting false positives by 15% with optimized Random Forest classifiers."
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

const chatMsgs = $("chat-messages");
const chatForm = $("chat-form");
const chatInput = $("chat-input");
const chatClear = $("chat-clear");
const chatChips = $("chat-chips");

function appendMsg(text, isUser = false) {
  if (!chatMsgs) return;
  const msgDiv = document.createElement("div");
  msgDiv.className = `chat-msg${isUser ? " user" : ""}`;
  msgDiv.textContent = text;
  chatMsgs.appendChild(msgDiv);
  chatMsgs.scrollTop = chatMsgs.scrollHeight;
}

function initChat() {
  if (!chatMsgs) return;
  chatMsgs.innerHTML = "";
  appendMsg("👋 Hi! I'm Nayan's AI Assistant. Ask me anything about his projects, skills, internships, or achievements!");
}

function handleUserAsk(text) {
  if (!text || !text.trim()) return;
  appendMsg(text, true);
  setTimeout(() => {
    appendMsg(getBotReply(text), false);
  }, 350);
}

if (chatForm) {
  chatForm.onsubmit = (e) => {
    e.preventDefault();
    if (chatInput) {
      handleUserAsk(chatInput.value);
      chatInput.value = "";
    }
  };
}
if (chatClear) chatClear.onclick = initChat;

if (chatChips) {
  const chips = ["Projects", "Internships", "Skills", "Achievements", "Contact"];
  chatChips.innerHTML = chips.map((c) => `<button type="button">${c}</button>`).join("");
  chatChips.onclick = (e) => {
    if (e.target.tagName === "BUTTON") {
      handleUserAsk(e.target.textContent);
    }
  };
}
initChat();

/* -------------------------------------------------------------------
   7. Projects Showcase & Filter
   ------------------------------------------------------------------- */
const PROJECTS = [
  {
    title: "AI Mock Interview System",
    category: "AI & LLM",
    description: "Enterprise mock interview platform with Gemini resume-based question generation, Monaco code editor, STAR behavioural round, and candidate scoring.",
    repo: "AI-mock-interview-enterprices-platform",
    tags: ["Gemini 1.5", "Flask", "Monaco Editor", "NLP"],
    image: "assets/project1.png"
  },
  {
    title: "Heart Disease Prediction System",
    category: "Computer Vision & ML",
    description: "Clinical predictive model analyzing 4,000+ patient records, achieving 92% diagnostic accuracy with 25% dimensionality reduction via PCA.",
    repo: "-Heartbeat-Sound-Classifier-Flask-",
    tags: ["Python", "Scikit-learn", "Pandas", "PCA"],
    image: "assets/project2.png"
  },
  {
    title: "Signature Forgery Detection",
    category: "Computer Vision & ML",
    description: "Deep CNN classifier trained on 1,000+ signature pairs, attaining 96% detection rate with inference speed under 200ms.",
    repo: "-Signature-Forgery-Detection",
    tags: ["TensorFlow", "CNN", "OpenCV", "Deep Learning"],
    image: "assets/project3.png"
  },
  {
    title: "SignBridge - Sign Language Video Call",
    category: "AI & LLM",
    description: "Real-time WebRTC video calling platform with MediaPipe hand-gesture classification translating American Sign Language to speech & text in real-time.",
    repo: "Sign-Bridge-2.0-Updated-version-",
    tags: ["WebRTC", "MediaPipe", "Socket.IO", "Computer Vision"],
    image: "assets/project4.png"
  },
  {
    title: "VoiceHealth AI Dashboard",
    category: "AI & LLM",
    description: "Health logging application that extracts hydration, sleep, habits, and nutrition from a single spoken voice command using Gemini audio understanding.",
    repo: "",
    tags: ["React Native", "Gemini Audio", "Supabase", "NativeWind"],
    image: ""
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
      : `<div class="project-placeholder-banner" style="background: linear-gradient(135deg, hsl(${(idx * 53 + 140) % 360} 45% 22%), hsl(${(idx * 53 + 200) % 360} 55% 10%))">
          ${proj.title[0]}
          <span class="project-idx-badge">${String(idx + 1).padStart(2, "0")}</span>
        </div>`;

    return `
      <div class="project-card">
        <div class="project-img-box">${banner}</div>
        <div class="project-body">
          <span class="project-cat">${proj.category}</span>
          <h4>${proj.title}</h4>
          <p>${proj.description}</p>
          <div class="project-tags">
            ${proj.tags.map((t) => `<span class="project-tag">${t}</span>`).join("")}
          </div>
          <div class="project-actions">
            <a href="${ghUrl}" target="_blank" rel="noopener noreferrer" class="project-btn-gh">GitHub ↗</a>
            <button class="project-btn-detail" data-idx="${PROJECTS.indexOf(proj)}">Details</button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  // Attach modal trigger listeners
  document.querySelectorAll(".project-btn-detail").forEach((btn) => {
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
          <a class="btn-primary" href="${ghUrl}" target="_blank" rel="noopener noreferrer">View on GitHub ↗</a>
          <button class="btn-secondary" onclick="document.getElementById('project-dialog').close()">Close</button>
        </div>
      `;
      projectDialog.showModal();
    };
  });
}

// Dialog backdrop click to dismiss
if (projectDialog) {
  projectDialog.onclick = (e) => {
    if (e.target === projectDialog) projectDialog.close();
  };
}

// Project Filter Buttons
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
  ["Internet of Things (IoT)", "NPTEL • Elite + Gold", "Advanced certification in sensor networks, embedded protocols, and IoT data processing.", "IoT"],
  ["Oracle OCI GenAI Professional", "Oracle Cloud", "Architecting Generative AI applications, embeddings, and enterprise LLM solutions on OCI.", "OCI AI"],
  ["Oracle OCI AI Foundations", "Oracle Cloud", "Foundational AI principles, computer vision, natural language processing, and cloud services.", "Oracle"],
  ["Applied Machine Learning in Python", "University of Michigan", "Practical ML pipelines with Scikit-learn: classification, regression, and model evaluation.", "UMich"],
  ["Tata Imagination Challenge", "Semifinalist", "Selected among national semifinalists for innovative technology-driven problem solving.", "Tata"],
  ["EY Techathon 6.0", "Top 100 Nationally", "Selected in Top 100 teams nationally out of 5,000+ participating engineering teams.", "EY"],
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
