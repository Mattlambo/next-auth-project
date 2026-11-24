# TV Fanatic

A full-stack TV show tracking app built with **Next.js**, **TypeScript**, **Prisma**, **PostgreSQL**, and **Tailwind CSS**. Browse trending and top-rated series, search for shows with the TMDB API, and create an account to save favorites and keep a personal watching list.

**Live demo:** https://next-auth-project-vert.vercel.app/
**Demo login:** `user1@gmail.com` / `password123` *(or register your own account)*

![TV Fanatic home page](YOUR_HOME_PAGE_SCREENSHOT_URL)

---

## Why I Built This

I wanted to challenge myself to build a full-stack application that goes beyond displaying data from an external API. TV Fanatic lets users create accounts, interact with TV show data, and maintain their own personalized collections.

It brought together the skills I've been developing (React, Next.js, TypeScript, API integration, authentication, database design, and persistent user data) in a single application built from the ground up.

---

## Features

### Authentication
- User registration with hashed passwords (bcryptjs)
- Secure login and logout
- Protected account pages
- Cookie-based sessions

### TV Discovery
- Search for TV shows
- Browse Trending and Top Rated shows
- View show details: poster, rating, overview, first air date, number of seasons, and current status

### Personal Library
- Add and remove shows from **Favorites**
- Add and remove shows from **Watching**
- Per-user data stored in the database

---

## Tech Stack

| Area | Tools |
| --- | --- |
| Frontend | Next.js (App Router), React, TypeScript, Tailwind CSS |
| Backend | Next.js API Routes, Prisma ORM, bcryptjs |
| Database | PostgreSQL |
| External API | TMDB (The Movie Database) |
| Hosting | Vercel |

I started on SQLite for local development, then migrated to PostgreSQL so user data persists in production.

---

## Project Structure

```
app/
├── api/
│   ├── auth/
│   ├── favorites/
│   ├── watching/
│   └── tv/
├── account/
├── favorites/
├── watching/
├── top-rated/
└── page.tsx

components/
├── auth/
├── shows/
└── navigation/

prisma/
└── schema.prisma
```

---

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   cd YOUR_REPOSITORY
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME"
   TMDB_API_KEY=YOUR_API_KEY
   TMDB_ACCESS_TOKEN=YOUR_ACCESS_TOKEN
   ```

4. Run the database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000).

---

## Screenshots

| Home | Show Details |
| --- | --- |
| ![Home](YOUR_HOME_SCREENSHOT_URL) | ![Details](YOUR_DETAILS_SCREENSHOT_URL) |

| Favorites | Login / Register |
| --- | --- |
| ![Favorites](YOUR_FAVORITES_SCREENSHOT_URL) | ![Login](YOUR_LOGIN_SCREENSHOT_URL) |

---

## What I Learned

- Building a full-stack app with the Next.js App Router and REST-style API routes
- Implementing authentication and authorization with hashed passwords and cookie-based sessions
- Designing a relational database with Prisma and migrating from SQLite to PostgreSQL
- Consuming a third-party API and shaping its data for my UI
- Using TypeScript across components, props, and API responses
- Organizing reusable components and working with Git

**A challenge I solved:** [Add one specific problem you hit, such as a bug, a design decision, or the SQLite-to-Postgres migration, and what you did about it. A real story here is the most memorable part of the README.]

---

## Future Improvements

- User profile page
- Pagination for search results
- Filtering by genre
- Recently viewed shows
- Light/dark theme toggle
- Improved mobile responsiveness
- Unit and integration tests

---

## Acknowledgements

This application uses data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/). This product uses the TMDB API but is not endorsed or certified by TMDB.
