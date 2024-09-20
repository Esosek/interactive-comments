# Interactive Comments

## Overview

This project is a fullstack application where users can add, edit, delete comments, reply to other user's comments, and upvote or downvote comments. It consists of a **Next.js** frontend and a **Flask** backend with GraphQL and SQLite.

This project is based on the [Frontend Mentor](https://www.frontendmentor.io/) challenge: [Interactive Comments Section](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9/hub).

**Note:** The application is still under development, and some backend features are not yet fully implemented.

## Technologies

### Frontend

- **[Next.js](https://nextjs.org/)**: A React framework that provides server-side rendering and static site generation for improved performance.
- **[Zustand](https://zustand-demo.pmnd.rs/)**: A small, fast, and scalable state management solution for React.
- **[TypeScript](https://www.typescriptlang.org/)**: A typed superset of JavaScript that adds static types for better code quality and error detection.

### Backend

- **[Flask](https://flask.palletsprojects.com/)**: A lightweight WSGI web application framework for Python.
- **[GraphQL](https://graphql.org/)** (via **[Graphene](https://docs.graphene-python.org/en/latest/)**): A query language for APIs, allowing clients to request exactly the data they need.
- **[SQLAlchemy](https://www.sqlalchemy.org/)**: The Python SQL toolkit and Object-Relational Mapping (ORM) library.
- **[SQLite](https://www.sqlite.org/)**: A lightweight, disk-based database that's self-contained and serverless.

## Installation and Running the Project

### Backend

1. Navigate to the `backend` directory.
2. Create a virtual environment:

```bash
python3 -m venv venv
```

3. Activate the virtual environment:

- On macOS/Linux:

```bash
source venv/bin/activate
```

- On Windows:

```bash
venv\Scripts\activate
```

4. Install the backend dependencies from `requirements.txt`:

```bash
pip install -r requirements.txt`
```

5. Start the Flask backend:

```bash
flask run
```

By default, the backend will be accessible at http://127.0.0.1:5000.

### Frontend

1. Navigate to the frontend directory.
2. Install the frontend dependencies:

```bash
npm i
```

3. Create a `.env` file in the `frontend` directory and add the following environment variable, replacing `PATH_TO_BACKEND_API` with the actual backend URL (e.g., `http://127.0.0.1:5000`):

```bash
NEXT_PUBLIC_API_ENDPOINT=PATH_TO_BACKEND_API
```

4. Start the Next.js frontend:

```bash
npm run dev
```

The frontend will be available at http://localhost:3000.

Now, you should have both the frontend and backend running and ready for use!

## Key Features

- **GraphQL API**: Query and mutation support for seamless data interaction between frontend and backend.
- **State Management**: Zustands's fast and scalable approach to state handling within React components.
- **Typed Frontend**: TypeScript ensures type safety and catches potential errors during development.
