# ⚡ Nayan A. Pise | Portfolio

> **AI/ML Engineer • LLM Post-Training & RAG Systems • Full-Stack AI Developer**  
> B.Tech CSE (AI & ML) @ VIT Bhopal (CGPA: 8.40)

An interactive, responsive personal portfolio with a live rugged stone & floating golden embers background, interactive skills arc, real-time AI portfolio assistant, 3D certifications carousel, and project showcase.

---

## 🚀 Live Deployment Options (Choose any 1)

This project is built to deploy effortlessly on any platform with **zero friction**.

### 🌟 Option 1: GitHub Pages (Recommended — 100% Free, Fastest, Never Sleeps)
1. Initialize & push this repo to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete live portfolio"
   git branch -M main
   git remote add origin https://github.com/nayan-pise/portfolio.git
   git push -u origin main
   ```
2. Go to your repository on GitHub:
   - Click **Settings** ➔ **Pages** (on the left sidebar).
   - Under **Build and deployment** ➔ **Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and `/ (root)`, then click **Save**.
3. **Done!** In ~60 seconds, your site is live at:  
   👉 `https://nayan-pise.github.io/portfolio/` (or `https://nayan-pise.github.io/` if repo is named `nayan-pise.github.io`).

---

### 🌐 Option 2: Render (Free Static Site or Python Web Service)
1. Push your code to GitHub.
2. Sign in to [render.com](https://render.com).
3. Click **New +** ➔ **Static Site**.
4. Connect your GitHub repository `portfolio`.
5. Settings:
   - **Build Command**: *(leave empty)*
   - **Publish Directory**: `.` *(current directory)*
6. Click **Create Static Site**.
7. **Done!** It will deploy instantly with a live `.onrender.com` URL.

---

### 🎈 Option 3: Streamlit Community Cloud
If you prefer launching via Streamlit:
1. Push your code to GitHub (includes `app.py` and `requirements.txt`).
2. Go to [share.streamlit.io](https://share.streamlit.io/) and log in with GitHub.
3. Click **New app** ➔ select your repository ➔ Main file path: `app.py`.
4. Click **Deploy!**

---

### ⚡ Option 4: Vercel (1-Click Deployment)
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **Add New** ➔ **Project** ➔ Import your GitHub repo.
3. Keep default settings and click **Deploy**.

---

## 💻 Running Locally

### Simple Python HTTP Server:
```bash
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

### Or with Streamlit:
```bash
pip install -r requirements.txt
streamlit run app.py
```

---

## 📁 Project Structure

```
nayan-portfolio/
├── index.html            # Main semantic HTML structure
├── style.css             # Theme, animations, 3D carousel, and responsive styles
├── script.js             # Canvas embers, AI buddy, skills arc, filters, modals
├── app.py                # Optional Streamlit launcher
├── requirements.txt      # Python dependencies for Streamlit
├── render.yaml           # One-click Render deployment configuration
├── vercel.json           # One-click Vercel routing configuration
├── .gitignore            # Git ignore file
└── assets/
    ├── bg.png            # Rugged stone texture background
    ├── profile.png       # Profile photograph
    ├── resume.pdf        # Nayan's resume
    ├── project1.png      # AI Mock Interview Platform preview
    ├── project2.png      # Heart Disease Classifier preview
    ├── project3.png      # Signature Forgery Detection preview
    └── project4.png      # Sign-Language Video App preview
```
