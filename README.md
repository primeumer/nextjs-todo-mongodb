# Todo List App

A full-stack Todo List application built with Next.js and MongoDB, featuring user authentication and automated testing.

## Features

- User Signup and Login (JWT-based authentication)
- Each user has their own private task list
- Add, complete/undo, and delete tasks
- View completed tasks on a separate page
- Logout functionality
- Mobile responsive design
- Animated background (moving grid pattern)
- Password validation (minimum 8 characters)
- Email format validation
- Unit tests for backend logic, authentication, and frontend components

## Tech Stack

- **Frontend:** Next.js, React, TypeScript
- **Backend:** Next.js API Routes
- **Database:** MongoDB Atlas
- **Authentication:** JWT (JSON Web Tokens), bcryptjs for password hashing
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
    tasks/route.ts        # Protected Tasks API (GET, POST, DELETE, PUT)
  login/page.tsx           # Login page
  signup/page.tsx          # Signup page
  completed/page.tsx       # Completed tasks page
  page.tsx                 # Home page (Todo list)
  page.css                 # Styles
lib/
  mongodb.ts                # Database connection
  auth.ts                   # JWT verification helper
  validators.ts              # Email and password validators
  auth.test.ts               # Tests for auth.ts
  validators.test.ts          # Tests for validators.ts
app/login/page.test.tsx       # Frontend component test
```

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account (free tier works)

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
3. Add `MONGODB_URI` and `JWT_SECRET` as environment variables in Vercel project settings
4. Deploy

## License
This project is for learning purposes.
