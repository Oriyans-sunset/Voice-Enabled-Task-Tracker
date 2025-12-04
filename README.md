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
- Ideal for structured data + small project (only 1 table for now) [discussed below as well]

Why Sequelize? 
- Specifically built for SQL databases, and also easy to use. [discussed below as well]

### AI Provider

- OpenAI GPT-5

Why GPT-5? [discussed below as well]
Tried 4o, 4o-mini, 5-mini, etc but smaller models struggled with parsing date from human language. GPT-5 gave the most reliable structured JSON output

### UI Libraries
- DaisyUI
- TailwindCSS

## 3. API Documentation

**Base URL:** /

### GET /tasks

Fetch all tasks.

Response:
`
[
  {
    "id": 1,
    "title": "Review PR",
    "description": "Check edge cases",
    "status": "todo",
    "priority": "medium",
    "dueDate": "2025-01-03T17:00:00.000Z",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
`

### POST /tasks

Create a task.

Request:
`
{
  "title": "Review login flow",
  "description": "Confirm async validation works",
  "status": "todo",
  "priority": "high",
  "dueDate": "2025-01-04T10:00:00Z"
}
`

Response 201:
`
{ "id": 5, "title": "Review login flow", ... }
`

Error 400:
`
{ "error": "Title is required" }
`

### PATCH /tasks/:id

Partial update for task fields.

Request:
`
{
  "status": "in_progress",
  "priority": "high"
}
`

Response:
`
{ "id": 5, "status": "in_progress", ... }
`

### DELETE /tasks/:id

Removes a task.

Response:
`
204 No Content
`

### POST /transcripts

Parses natural speech into task fields.

Request:
`
{
  "transcript": "remind me to test the dashboard tomorrow at 5 pm"
}
`

Response:
`
{
  "transcript": "remind me to test the dashboard tomorrow at 5 pm",
  "parsed": {
    "title": "Test dashboard",
    "description": "",
    "status": "todo",
    "priority": "medium",
    "dueDate": "2025-01-03T17:00:00Z"
  }
}
`

## 4. Decisions & Assumptions
### 4.a. Key Design Decisions
Database & ORM:
- SQLite chosen for almost zero setup complexity + due to smaller scope of project. SQL based database was preferred because data was structured.

- Sequelize chosen because, it works well with SQLite (their website mentions its built for only SQL databases). It also gives features such as migrations, model validation, query building. (not all of which were implemented but have the option to do so)

- Status/Priority Stored as Strings because SQLite has no native ENUM support (postgres and mysql however do)

- Sequelize maps ENUM → TEXT for SQLite. Therefore, we use lowercase strings ("todo", "in_progress", "done"). Backend validates these values manually.

Backend Defaults:

- Tasks must have a title; fallback added to avoid null titles.

- Status defaults to "todo".

State management:
- Zustand used to centralize: task list, loading & error states, CRUD actions

- Data flow:- fetchTasks -> Zustand -> components

- On create/update/delete → backend call → refetch tasks. Even though this adds more network calls, its the approach. COnfilc resolution wouldve taken too long to implement.

Voice Parsing: 

- Web Speech API handles transcription (free & client-side & supported by most browsers)

- GPT-5 handles: converting raw human language transcript to json for comsumption.

- Heavy prompt editing was required because: smaller models mostly misinterpreted date/time and were inconsistent, GPT-5 offered best replies, while still being relatively cost-effective.

Schema Validation Libraries: **skipped**

- Could have used Zod/Joi

- Opted out for speed & simplicity

## 5. AI Tools Usage
Tools Used: 
- ChatGPT (GPT-5): for researching libraries and packages (daisyUI, sequalize, react-hoook-form (even though not utilised))
- GPT5-codex: used for assisting in generating certain functions and debugging.
- AI assisted in generating boilerplate for the drag and drop of the kanban board as this was my first time implementing such a feature, but I customized and integrated it with my task model and state management.
_ Functions and code made via AI has been marked as such with in-line comments inside the project._
