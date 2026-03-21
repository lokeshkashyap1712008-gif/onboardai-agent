🚀 OnboardAI — Intelligent Skill Gap Analyzer

OnboardAI is an AI-powered system that analyzes a user’s resume against a job description, identifies missing skills, and generates a structured learning roadmap with clear reasoning.

📌 Overview

Finding the right skills to learn for a job role is often confusing and manual. OnboardAI solves this by automating:

Skill extraction from resumes
Requirement extraction from job descriptions
Gap analysis
Personalized roadmap generation
Transparent decision explanation

The system combines AI with structured logic to produce reliable and interpretable results.

⚙️ How It Works
User provides:
Resume text
Job description
The system processes the input through multiple stages:
Resume Agent → Extracts skills and levels
JD Agent → Extracts required skills
Gap Agent → Identifies missing skills
Graph Engine → Adds skill dependencies
Level Engine → Adapts based on user level
Path Agent → Generates roadmap
Trace Engine → Explains decisions
Results are:
Returned via API
Stored in database
🧠 Key Features
AI-based skill extraction
Job requirement analysis
Intelligent gap detection
Graph-based dependency mapping
Level-aware learning paths
Decision trace (explainability)
Live agent streaming (step-by-step execution)
Persistent storage using database
🏗️ Architecture
Frontend (React)
        ↓
FastAPI Backend
        ↓
AI Agents Layer
        ↓
Logic Layer (Graph + Level)
        ↓
Supabase Database
🛠️ Tech Stack

Backend

FastAPI
Python

AI

Hugging Face Inference API
Mistral-7B-Instruct

Database

Supabase (PostgreSQL)

Frontend

React.js
Framer Motion

Deployment

Docker
📂 Project Structure
backend/
│
├── app/
│   ├── agents/
│   │   ├── resume_agent.py
│   │   ├── jd_agent.py
│   │   ├── gap_agent.py
│   │   └── path_agent.py
│
│   ├── core/
│   │   ├── orchestrator.py
│   │   ├── orchestrator_stream.py
│   │   ├── graph_engine.py
│   │   ├── level_engine.py
│   │   └── trace_engine.py
│
│   ├── utils/
│   │   ├── formatter.py
│   │   └── llm.py
│
│   ├── db.py
│   ├── config.py
│   └── main.py
│
├── requirements.txt
├── Dockerfile
└── .env
🚀 Getting Started
1. Clone the repository
git clone https://github.com/your-username/onboardai.git
cd onboardai/backend
2. Create virtual environment
python -m venv venv
venv\Scripts\activate
3. Install dependencies
pip install -r requirements.txt
4. Setup environment variables

Create .env file:

HF_API_KEY=your_huggingface_key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_key
5. Run the server
uvicorn app.main:app --reload
6. Open API docs
http://127.0.0.1:8000/docs
🔌 API Endpoints
POST /analyze

Returns full analysis:

{
  "skills": [],
  "required_skills": [],
  "gaps": [],
  "roadmap": [],
  "decision_trace": []
}
POST /analyze-stream

Streams execution steps in real-time.

🐳 Docker Setup
docker build -t onboardai-backend .
docker run -d -p 8000:8000 \
-e HF_API_KEY=your_key \
-e SUPABASE_URL=your_url \
-e SUPABASE_KEY=your_key \
onboardai-backend
📊 Example Use Case

Input:

Resume:

Experience with Figma and UI design

Job Description:

Looking for a Product Designer skilled in UX research and prototyping

Output:

Skills → Figma, UI Design
Gaps → UX Research, Prototyping
Roadmap → Structured steps
Trace → Explanation of decisions
🔍 What Makes It Different
Not just an AI wrapper
Combines AI + logic + structured reasoning
Provides explainable results
Works across domains (tech, design, marketing, etc.)
📈 Future Improvements
Resume file upload (PDF parsing)
Course recommendations
Skill scoring system
Real-time job scraping
Personalized dashboards
📜 License

MIT License

👥 Contributors
Backend & AI: Lokesh Kashyap
Frontend: Bhagatveer Singh
💡 Final Note

This project focuses on building a system that not only generates answers but also explains why those answers were produced.
