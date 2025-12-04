## 1. Project Setup
### 1.a. Prerequisites

- Node.js (with npm installed)
- SQLite (no external installation needed)

Env variables:

- OPENAI_API_KEY=your_key_here (required for voice parsing endpoint)

### 1.b. Installation Steps
**Backend**: made using express-generator.

`cd backend
npm install`

Create a .env file with 

`OPENAI_API_KEY=<your_key_here>`

**Frontend**: created using Vite (React template) + React Router

`cd frontend
npm install`

_Frontend will run on http://localhost:5173, backend on http://localhost:3000._
_DaisyUI was added on top of Tailwind for UI components._

## 2. Tech Stack
### Frontend
- React (Vite)
- Zustand - state management
- Web Speech API - for voice transcription
- DaisyUI + Tailwind CSS - UI components & styling

### Backend
- Express.js (via express-generator)
- SQLite3
- Sequelize ORM

Why SQlite?
- Ideal for structured data + small project (only 1 table for now)

Why Sequelize? 
- Specifically built for SQL databases, and also easy to use.

### AI Provider

- OpenAI GPT-5

Why GPT-5?
Tried 4o, 4o-mini, 5-mini, etc but smaller models struggled with parsing date from human language. GPT-5 gave the most reliable structured JSON output

### UI Libraries
- DaisyUI
- TailwindCSS 
