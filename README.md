# Data Dashboard - MERN Stack

This project is a full-stack MERN assignment built from the dataset in `docs/reference_schema.json` and the UI reference in `docs/image.png`.

For more details see `INFO.md`.

It contains:
- `backend/` for the Node.js + Express + Local MongoDB
- `frontend/` for the React + Vite UI
- `docs/` for the reference dataset and reference image

## Tech Stack

- MongoDB
- Express.js
- React.js
- Node.js
- Recharts for the frontend bar chart

## Project Structure

```text
Task1/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── services/
└── docs/
    ├── image.png
    └── reference_schema.json
```

## Requirements

- Node.js 18+ recommended
- npm
- MongoDB running locally

## Backend Setup

1. Go to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create your environment file:

```bash
cp .env.example .env
```

4. Use these values in `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/task1
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

5. Start the backend server:

```bash
npm start
```

Backend runs on:

```text
http://localhost:5000
```

Health check:

```text
GET http://localhost:5000/health
```

## Seed the Reference Data

After the backend is running, seed MongoDB from the provided JSON file:

```bash
curl -X POST http://localhost:5000/api/v1/seed/reference-data
```

This imports data from:

```text
docs/reference_schema.json
```

## Frontend Setup

1. Open a new terminal and go to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## Full Run Order

Use this order when running the project from scratch:

1. Start MongoDB
2. Start backend from `backend/`
3. Seed data with `POST /api/v1/seed/reference-data`
4. Start frontend from `frontend/`
5. Open `http://localhost:5173`

## Build Commands

### Frontend production build

```bash
cd frontend
npm run build
```

### Backend

```bash
cd backend
npm start
```

## Troubleshooting

### Frontend shows loading or error state

Check:

- backend is running on port `5000`
- MongoDB is running
- data has been seeded

### Backend fails to connect

Check:

- MongoDB service is started
- `MONGODB_URI` is correct in `backend/.env`

### No data visible in UI

Seed the data again:

```bash
curl -X POST http://localhost:5000/api/v1/seed/reference-data
```
