## Roadmap.sh Project

This project was built as a solution to the [Markdown Note-taking App](https://roadmap.sh/projects/markdown-note-taking-app) project from Roadmap.sh. 

## Features

* Upload Markdown (`.md`) files
* Create and edit Markdown notes
* Check grammar using LanguageTool
* Save and list notes
* Delete notes
* Render Markdown notes as HTML
* Preview Markdown content

## Tech Stack

### Backend

* FastAPI
* SQLAlchemy
* SQLite
* Alembic
* LanguageTool

### Frontend

* React
* Vite
* Tailwind CSS

## Project Structure

```text
├── backend/
│   ├── migrations/
│   └── src/
│       └── markdown_notes/
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
│
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <your-repository-folder>
```

### 2. Backend

```bash
cd backend
uv sync
uv run alembic upgrade head
uv run uvicorn markdown_notes.main:app --reload
```

### 3. Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.


## API Endpoints

| Method   | Endpoint           | Description            |
| -------- | ------------------ | ---------------------- |
| `POST`   | `/notes/`          | Create a note          |
| `GET`    | `/notes/`          | List all notes         |
| `GET`    | `/notes/{id}`      | Get a note             |
| `PUT`    | `/notes/{id}`      | Update a note          |
| `DELETE` | `/notes/{id}`      | Delete a note          |
| `POST`   | `/notes/upload`    | Upload a Markdown file |
| `POST`   | `/notes/grammar`   | Check grammar          |
| `GET`    | `/notes/{id}/html` | Render a note as HTML  |
