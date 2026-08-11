Why I Built This

I built TV Fanatic to challenge myself to create a full-stack application that goes beyond displaying data from an external API. I wanted to build an application where users could create accounts, interact with TV show data, and maintain their own personalized collections.

The project gave me the opportunity to bring together many of the skills I've been developing—including React, Next.js, TypeScript, API integration, authentication, database design, and persistent user data—into a single application built from the ground up.

# TV Fanatic
link: https://next-auth-project-gfpp9n2f9-matt-lamberts-projects-5e480e01.vercel.app/favs

A full-stack TV show tracking application built with **Next.js**, **TypeScript**, **Prisma**, and **Tailwind CSS**. Browse trending and top-rated television series, search for shows using the TMDB API, and create a personalized account to save your favorite shows and maintain a watching list.


<img width="1888" height="743" alt="image" src="https://github.com/user-attachments/assets/4fbd7fd2-acc8-49ee-813f-13bdf0c14fc9" />
<img width="1887" height="747" alt="image" src="https://github.com/user-attachments/assets/57f39331-5635-4592-b7ee-d5edb8fd5b14" />


---

## Features

### Authentication

* User registration
* Secure login and logout
* Protected account pages
* Cookie-based authentication

### TV Discovery

* Search for TV shows
* Browse Trending shows
* Browse Top Rated shows
* View show information including:

  * Poster
  * Rating
  * Overview
  * First air date
  * Number of seasons
  * Current status

### Personal Library

* Add shows to Favorites
* Remove shows from Favorites
* Add shows to Watching
* Remove shows from Watching
* Personalized data stored for each user

---

## Tech Stack

### Frontend

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes
* Prisma ORM
* PostgreSQL
* bcryptjs

### External APIs

* TMDB (The Movie Database) API

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

## Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

Install dependencies:

```bash
npm install
```

Create a `.env` file with your environment variables:

```env
DATABASE_URL="file:./dev.db"

TMDB_API_KEY=YOUR_API_KEY
TMDB_ACCESS_TOKEN=YOUR_ACCESS_TOKEN
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Start the development server:

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## Screenshots

Add screenshots here, for example:

* Home Page
* Search Results
* Show Details
* Favorites
* Watching
* Login/Register

---

## What I Learned

This project helped me gain experience with:

* Building a full-stack application using Next.js App Router
* Creating REST API endpoints
* User authentication and authorization
* Cookie-based sessions
* Database design with Prisma
* Working with relational data
* Consuming third-party APIs
* TypeScript in a production-style application
* Component organization and reusable UI
* Git and version control

---

## Future Improvements

* User profile page
* Pagination for search results
* Filtering by genre
* Recently viewed shows
* Light/Dark theme toggle
* Improved mobile responsiveness
* Unit and integration tests
* PostgreSQL deployment for production

---

## Built With

* Next.js
* React
* TypeScript
* Tailwind CSS
* Prisma
* SQLite
* TMDB API

---

## Acknowledgements

This application uses data provided by **The Movie Database (TMDB)**.

https://www.themoviedb.org/

This product uses the TMDB API but is not endorsed or certified by TMDB.
