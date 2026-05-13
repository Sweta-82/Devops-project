<div align="center">
  

  # ⚡ SkillSync
  
  **GenAI-powered interview preparation platform with resume analysis and mock interview generation.**

  <p align="center">
    <a href="https://skillsync-a2t0.onrender.com/" target="_blank">Live Demo</a> •
    <a href="#-local-setup">Installation</a> •
    <a href="#-docker-setup">Docker</a>
  </p>

  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
  ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
  ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
</div>

<br />

## 📖 About SkillSync

SkillSync is an intelligent platform designed to bridge the gap between job descriptions and candidates' current skill sets. By simply uploading a resume and pasting a job description, SkillSync leverages the **Gemini AI API** to provide an instant ATS-style analysis, customized interview questions (technical & behavioral), and a structured preparation roadmap.

---

## ✨ Core Features

- **🔐 User Authentication**: Secure login and registration with JWT and protected routes.
- **📄 Resume Analysis**: Upload PDF resumes and match them directly against targeted job descriptions.
- **🤖 AI Interview Generation**: Automatically generates tailored technical and behavioral interview questions using Gemini API.
- **📊 Detailed Reporting**: Visual report generation highlighting skill gaps, match percentages, and preparation roadmaps.
- **🐳 Dockerized Architecture**: Containerized backend for seamless deployment and consistency across environments.
- **⚙️ CI/CD Pipeline**: Fully automated testing, Docker builds, and deployments via GitHub Actions and Render.

---

## 🛠️ Technology Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS
- React Router (Protected Routing)

**Backend:**
- Node.js & Express.js
- MongoDB Atlas (Database)
- JWT (Authentication)

**AI & External Services:**
- Google Gemini API (AI Analysis)

**DevOps & Infrastructure:**
- Docker & Docker Hub
- GitHub Actions (CI/CD)
- Render (Hosting)

---

## 🏗️ CI/CD Pipeline & Architecture

The application utilizes a modern, automated deployment pipeline:
1. **Push/Merge** to the `main` branch triggers **GitHub Actions**.
2. GitHub Actions runs a continuous integration workflow to **build the Docker image**.
3. The built image is automatically pushed to **Docker Hub** (`sweta82/skillsync-backend:latest`).
4. **Render** detects the newly pushed image and triggers an **Auto Deploy**, updating the live server with zero downtime.

---

## 🐳 Docker Setup

The fastest way to get the backend running is via Docker. The image is publicly available on Docker Hub.

```bash
# Pull the latest image
docker pull sweta82/skillsync-backend:latest

# Run the container (Ensure you pass the required environment variables)
docker run \
  -e MONGO_URI="your_mongodb_connection_string" \
  -e JWT_SECRET="your_jwt_secret" \
  -e GOOGLE_API_KEY="your_gemini_api_key" \
  -p 3000:3000 \
  sweta82/skillsync-backend:latest
```

---

## ⚙️ Local Setup

If you prefer to run the application locally without Docker, follow these steps:

### Prerequisites
- Node.js (v18+)
- MongoDB connection URI
- Google Gemini API Key

### 1. Clone the repository
```bash
git clone https://github.com/Sweta-82/Devops-project.git
cd skillsync
```

### 2. Backend Setup
```bash
cd backend
npm install
# Create a .env file based on the Environment Variables section below
npm run start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=3000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret_key
GOOGLE_API_KEY=your_gemini_api_key
```

*(Note: The frontend may also require variables like `VITE_API_URL` depending on your local config.)*

---

## 📂 Project Structure

```text
skillsync/
├── .github/
│   └── workflows/          # CI/CD GitHub Actions configurations
├── backend/                # Node.js Express server
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # Express routes
│   │   ├── middlewares/    # Auth & validation
│   │   └── services/       # AI & business logic
│   ├── Dockerfile
│   └── package.json
└── frontend/               # React Vite application
    ├── src/
    │   ├── features/       # Feature-based modular architecture (auth, interview, landing)
    │   ├── components/     # Shared UI components
    │   └── hooks/          # Custom React hooks
    └── package.json
```


## 🚀 Future Scope

- **Mock Video Interviews:** Integration of WebRTC for real-time video interview practice with AI feedback.
- **Enhanced AI Feedback:** Deeper, line-by-line resume critique and rewrite suggestions.
- **Kubernetes Orchestration:** Migrating from single container deployment to a scalable K8s cluster.

---

<div align="center">
  <b>Built with ❤️ by <a href="https://github.com/sweta82">Sweta Kumari</a></b>
</div>
