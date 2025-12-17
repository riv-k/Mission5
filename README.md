# Mission 5 — Trade Me (Design Challenge Option 1) ✅

**Phase 1 focus:** implement the CLI to seed auction data into MongoDB (Task 5) and build an API to retrieve similar auction items (Task 6).

---

## Table of Contents

- [Project Summary](#project-summary)
- [Quick Start](#quick-start)
- [CLI (Seed / Unseed / Test)](#cli-seed--unseed--test)
- [API (Search / Similar Items)](#api-search--similar-items)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Notes & Tips](#notes--tips)
- [License](#license)

---

## Project Summary 🔍

This repository contains the Phase 1 implementation for the Trade Me design challenge (Design Challenge Option 1). The main coding deliverables in Phase 1 are:

- **Task 5:** A CLI tool to seed and remove sample auction items in a local MongoDB instance.
- **Task 6:** An Express API to query auction items and return results that match a keyword search.

The goal is to provide a minimal, well-documented backend that supports the UI work in later phases.

---

## Quick Start ⚡

### Prerequisites

- Node.js (LTS) and npm
- MongoDB Community Server running locally (do not use Atlas for this mission)
- (Optional) MongoDB Compass for inspecting the database

### Install & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/riv-k/Mission5-P1.git
   cd Mission5-P1
   ```

2. Install dependencies for each package:

   ```bash
   cd api && npm install
   cd ../db-cli && npm install
   ```

3. Make the CLI available globally (so you can run `mission5`):

   ```bash
   # from the db-cli folder
   npm link
   ```

   If you prefer not to link globally you can also run the CLI commands with `node index.js <command>` from `db-cli`.

4. Ensure MongoDB is running locally. The CLI and API will use `mongodb://localhost:27017` by default, and will use the database name `mission5db`. You can override the host/port by setting the `MONGO_URI` env var.

---

## CLI — Seed, Unseed, Test 🧰

This project includes a small command line tool in `db-cli` with the following commands:

- `mission5 seed` — Clears the `AuctionItem` collection and inserts sample seed data (3 items).
- `mission5 unseed` — Removes the seeded data from the `AuctionItem` collection.
- `mission5 test-connection` — Checks connection to the MongoDB instance.
- `mission5 test` — Simple built-in test command.

Example:

```bash
mission5 seed
mission5 test-connection
mission5 unseed
```

Seed data currently includes:
- Vintage Camera
- Antique Vase
- Gaming Console

---

## API — Retrieve Similar Auction Items 🔎

Start the API server:

```bash
cd api
npm start
```

By default the server listens on port `3000`.

### Endpoints

- GET `/api/items`
  - Optional query parameter: `keyword` — case-insensitive search that matches `title` or `description`.
  - Response: `{ auctionItems: [ ... ] }`

Example requests:

```bash
curl http://localhost:3000/api/items
curl "http://localhost:3000/api/items?keyword=Vintage"
```

The search is implemented using MongoDB regex queries via Mongoose.

---

## Testing ✅

Two test suites are included:

- API tests (in `api/tests`):
  ```bash
  cd api
  npm test
  ```
- CLI tests (in `db-cli/tests`):
  ```bash
  cd db-cli
  npm test
  ```

Note: API tests will seed/unseed the database as part of the test flow, and the CLI tests expect the `mission5` command to be available (use `npm link` in `db-cli`).

---

## Project Structure 📁

- `api/` — Express app, routes, and API tests
  - `routes/items.js` — GET `/api/items` with optional `keyword` search
  - `models/AuctionItem.js` — Mongoose schema
- `db-cli/` — CLI to seed/unseed/test the database
  - `commands/seed.js` — seeds `mission5db`/`AuctionItem`
  - `data/seedData.js` — sample seed items
- `README.md` — this file

---

## Notes & Tips 💡

- The code uses `MONGO_URI` if provided; otherwise it defaults to `mongodb://localhost:27017` and uses `mission5db` database.
- If running on Windows PowerShell and you encounter permission issues with `npm link`, open an elevated shell or use `node index.js` to run CLI commands directly.
- The tests are intentionally simple; feel free to extend them for more robust checks (e.g., validating DB name/collection, ensuring no duplication on repeated seeds).

---

## Acknowledgements

- Trade Me design brief (Design Challenge Option 1)
- Recommended README pattern: `othneildrew/Best-README-Template` (used as inspiration)

---

## Author

- @riv-k – Rithvik Sharma

---
