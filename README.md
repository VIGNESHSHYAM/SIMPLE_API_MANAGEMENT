## Overview

Simple API Management is a **Next.js 13** application with **MongoDB** as its database, designed to let developers to register, authenticate, and manage custom API endpoints. It provides JWT-based authentication, role-based access control (Developer vs. Viewer), credit-based usage tracking, and a proxy layer for fetching external data resources (e.g., a Flask endpoint) with automatic credit deduction and usage logging.

## Features

- **User Registration & Sign‑In**  
  - **POST** `/api/sign-in`: Register a new user (assigned Developer role).
  - **POST** `/api/login`: Authenticate existing users and issue JWT in an HTTP‑only cookie.

- **Role & Permission Management**  
  - Developer role granted `create-user`, `delete-user`, `view-dashboard`, and API‑management permissions.
  - Permissions defined in `schema/Role.js` and `schema/Permission.js`.

- **API CRUD Operations**  
  - **Create API**  \`POST /api/create\`: Register a new API with a UUID key and initial credit balance.
  - **List APIs**  \`GET /api/list\`: Publicly list all registered APIs (without exposing keys).
  - **Delete API**  \`DELETE /api/{id}\`: Soft‑delete (deactivate) an API; only its creator (Developer) may do so.

- **Credit‑Based Usage & Data Proxy**  
  - **API Usage Middleware**: Intercepts requests to `/api/use/{apiKey}/*`, decrements credits, blocks on zero balance, and logs each call to the `ApiUsage` collection.
  - **Data Proxy**  \`GET /api/use/{apiKey}/data\`: Forwards requests to the configured external endpoint, returns JSON, deducts credits, and records usage.

## Tech Stack

- **Frontend & Server**: Next.js 13 (App Router)
- **Database**: MongoDB via Mongoose (`config/db.js`)
- **Authentication**: JWT (`lib/jwt.ts`) with HTTP‑only cookies
- **Authorization**: Custom middleware & schemas (`schema/*.js`)
- **Security**: bcryptjs for password hashing
- **Keys**: UUIDv4 for API key generation
- **Styling**: Tailwind CSS (`app/globals.css`)

## Installation & Setup

1. **Clone** the repository:
   ```bash
   git clone https://github.com/VIGNESHSHYAM/SIMPLE_API_MANAGEMENT.git
   cd SIMPLE_API_MANAGEMENT
   ```
2. **Install dependencies**:
   ```bash
   npm install    # or yarn install / pnpm install
   ```
3. **Configure environment**: create `.env.local`:
   ```dotenv
   MONGODB_URL=<YOUR_MONGODB_URI>
   JWT_SECRET=<YOUR_JWT_SECRET>
   NODE_ENV=development
   ```
4. **Run development server**:
   ```bash
   npm run dev    # or yarn dev / pnpm dev
   ```
5. Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── app/
│   ├── api/               # REST endpoints (create, list, login, sign-in, delete, use)
│   ├── dashboard/         # Developer/admin UI
│   └── (auth)/            # Auth‑guarded pages
├── config/
│   └── db.js              # MongoDB connection helper
├── lib/                   # JWT & auth utilities
├── schema/                # Mongoose models: Api, ApiUsage, Role, Permission, User
├── public/                # Static assets
├── styles/                # Tailwind config & globals
├── next.config.mjs        # Next.js configuration
├── package.json           # Scripts & metadata
└── README.md              # ← You are here
```

## API Reference

| Method | Endpoint                       | Purpose                                       | Access    |
|--------|--------------------------------|-----------------------------------------------|-----------|
| POST   | `/api/sign-in`                 | Register new user (assign Developer role)     | Public    |
| POST   | `/api/login`                   | Authenticate, return JWT cookie               | Public    |
| POST   | `/api/create`                  | Create a new API (generate UUID key)          | Developer |
| GET    | `/api/list`                    | List all APIs (hide keys)                     | Public    |
| DELETE | `/api/{id}`                    | Soft‑delete an API by ID                      | Developer |
| GET    | `/api/use/{apiKey}/data`       | Proxy to external data source, track usage    | API‑Key   |
| GET/…  | `/api/use/{apiKey}/{action}`   | Other usage actions (credits tracked)         | API‑Key   |

## Scripts

- `npm run dev`  – start development server
- `npm run build`– build for production
- `npm start`    – serve production build

## Contributing

1. Fork the repo and create a branch (`feature/YourFeature`).
2. Commit your changes with descriptive messages.
3. Push and open a Pull Request.
4. Ensure code style (ESLint/Prettier) and add tests for new features.

## License

This project is licensed under the **MIT License**. See [LICENSE](./LICENSE) for full details.

## Maintainer

**VIGNESHSHYAM**  
GitHub: [github.com/VIGNESHSHYAM](https://github.com/VIGNESHSHYAM)

