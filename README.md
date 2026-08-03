# Todo List App

A full-stack Todo List application built with Next.js and MongoDB, featuring user authentication, AI-powered task refinement, and automated testing.

## Features

- User Signup and Login (JWT-based authentication)
- Each user has their own private task list
- Add, complete/undo, and delete tasks
- View completed tasks on a separate page
- Logout functionality
- Mobile responsive design
- Password validation (minimum 8 characters)
- Email format validation
- **AI-powered task refinement (Gemini API)** — rewrite your task text using one of four actions:
  - **Format** — make the text well-structured and grammatically correct
  - **Casual** — rewrite in a more natural, conversational tone
  - **Summary** — shorten the text while keeping key information
  - **Enhance** — improve clarity and readability without changing meaning
- Unit tests for backend logic, authentication, and frontend components

## Tech Stack

- **Frontend:** Next.js, React, TypeScript
- **Backend:** Next.js API Routes
- **Database:** MongoDB Atlas
- **Authentication:** JWT (JSON Web Tokens), bcryptjs for password hashing
- **AI:** Google Gemini API (`@google/generative-ai`)
- **Testing:** Vitest, React Testing Library
- **Icons:** lucide-react
- **Hosting:** Vercel

## Project Structure

```
app/
  api/
    auth/
      signup/route.ts    # Signup API
      login/route.ts     # Login API
      logout/route.ts    # Logout API
    ai/
      refine/route.ts     # Gemini AI text refinement API
    tasks/route.ts        # Protected Tasks API (GET, POST, DELETE, PUT)
  login/page.tsx           # Login page
  signup/page.tsx          # Signup page
  completed/page.tsx       # Completed tasks page
  page.tsx                 # Home page (Todo list + AI actions)
  page.css                 # Styles
lib/
  mongodb.ts                # Database connection
  auth.ts                   # JWT verification helper
  validators.ts              # Email and password validators
  auth.test.ts                # Tests for auth.ts
  validators.test.ts           # Tests for validators.ts
app/login/page.test.tsx        # Frontend component test
```

## How AI Refinement Works

1. The user types a task and clicks one of the AI action buttons (Format, Casual, Summary, Enhance).
2. The frontend sends the task text and the selected action name to `/api/ai/refine`.
3. The backend decides which prompt to send to Gemini based on the action (the frontend has no knowledge of the prompt itself).
4. Gemini returns the rewritten text, which replaces the text in the input box.

This design makes it easy to add new AI actions in the future (e.g. Professional, Translate, Fix Grammar) — only the backend prompt logic needs to change.

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account (free tier works)
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd <project-folder>
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Running Tests

This project uses Vitest for unit testing. To run all tests:

```bash
npm test
```

Tests cover:
- Email and password validation logic (`lib/validators.test.ts`)
- JWT authentication logic (`lib/auth.test.ts`)
- Login page component rendering and input behavior (`app/login/page.test.tsx`)

## Deployment

This app is deployed on [Vercel](https://vercel.com). To deploy your own:

1. Push your code to GitHub
2. Import the repository on Vercel
3. Add `MONGODB_URI`, `JWT_SECRET`, and `GEMINI_API_KEY` as environment variables in Vercel project settings
4. Deploy

## License

This project is for learning purposes.
