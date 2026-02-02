# FullStack Notes

A simple full-stack notes application built with a React + Vite front end and an Express + MongoDB back end. It supports creating, viewing, updating, and deleting notes with API rate limiting backed by Upstash Redis.

## ✨ Features

- CRUD notes workflow (create, read, update, delete)
- Client-side data fetching and caching with React Query
- API rate limiting via Upstash Redis
- Clean, responsive UI powered by Tailwind CSS and DaisyUI

## 🧰 Tech Stack

### Frontend
- **React 19** (UI)
- **Vite** (dev server + build)
- **TypeScript** (type safety)
- **React Router** (routing)
- **TanStack React Query** (data fetching + caching)
- **Axios** (HTTP client)
- **Tailwind CSS + DaisyUI** (styling)

### Backend
- **Node.js + Express** (API server)
- **MongoDB + Mongoose** (database + ODM)
- **Upstash Redis + @upstash/ratelimit** (rate limiting)
- **CORS + dotenv** (config + security)

### Tooling
- **ESLint** (linting)
- **Nodemon** (backend dev reload)

## 🗂️ Project Structure

```
.
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   └── server.js
│   └── package.json
└── frontend
    ├── src
    ├── public
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (LTS recommended)
- **MongoDB** (local or cloud instance)
- **Upstash Redis** (for rate limiting)

### 1) Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2) Configure environment variables

Create `.env` files in **both** `backend` and `frontend`.

#### `backend/.env`

```bash
# Server
PORT=5000
FRONTEND_URL=http://localhost:5173

# Database
MONGO_URI=your_mongodb_connection_string

# Upstash Redis (rate limiting)
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
```

#### `frontend/.env`

```bash
VITE_API_URL=http://localhost:5000
```

### 3) Run the app

```bash
# Terminal 1 - backend
cd backend
npm run dev

# Terminal 2 - frontend
cd ../frontend
npm run dev
```

The frontend will be available at `http://localhost:5173` and the API at `http://localhost:5000`.

## 📡 API Endpoints

All endpoints are prefixed with `/api/notes`:

- `GET /api/notes` — Fetch all notes
- `GET /api/notes/:id` — Fetch a single note
- `POST /api/notes` — Create a note
- `PUT /api/notes/:id` — Update a note
- `DELETE /api/notes/:id` — Delete a note

## 🧪 Useful Scripts

### Backend (`backend/package.json`)
- `npm run dev` — Start dev server with nodemon
- `npm start` — Start production server

### Frontend (`frontend/package.json`)
- `npm run dev` — Start Vite dev server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

## 🧭 Next Steps (Optional)

If this is your first README, here are common sections you can add later:
- **Screenshots / Demo GIFs**
- **Deployment instructions** (e.g., Vercel, Render, Railway)
- **Contribution guidelines**
- **License**

---

If you want anything more specific (like deployment steps or screenshots), just tell me what you’re aiming for and I’ll add it.
