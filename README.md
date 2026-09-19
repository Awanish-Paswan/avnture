# Avnture Technologies

Production-oriented MERN company website with crawlable React SSR, MongoDB content, a protected admin area, lead capture, blog and portfolio APIs, dynamic sitemap generation, and accessible responsive UI.

## Local setup

1. Copy `.env.example` to `.env` and provide a MongoDB URI and JWT secret.
2. Run `npm install`.
3. Optionally create the first admin with `npm run seed:admin`.
4. Run `npm run dev`.

The Vite frontend runs at `http://localhost:5173` and proxies `/api`, `/robots.txt`, and `/sitemap.xml` to Express on port 5000. Production uses `npm run build` followed by `npm start`; Express serves the built React app and API from one origin.

No portfolio results, offices, reviews, team size, registrations, or contact details are invented. Add verified business contact details through environment variables and genuine projects through the admin/API.
