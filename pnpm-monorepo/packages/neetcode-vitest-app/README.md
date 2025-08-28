# NeetCode 150 — Vitest App

A minimal Vite + React app that lists problems (subset seeded) and lets you:
- Click a problem → read a short description
- See example test cases
- Edit JavaScript in a browser editor and run quick checks
- Also comes with Vitest tests in `src/__tests__` that target `src/solutions/*`

## Get Started

```bash
npm install
npm run dev
# open the URL printed by Vite (usually http://localhost:5173)
```

## Run Terminal Tests

Implement functions in `src/solutions/*.js`, then run:

```bash
npm run test
```

## Add More Problems

- Add entries to `src/data/problems.js` with fields:
  - `slug`, `title`, `difficulty`, `category`, `link`, `description`,
    `fnName`, `signature`, and `tests` array.
- Create matching files:
  - `src/solutions/<slug>.js` exporting the function `fnName`
  - `src/__tests__/<slug>.test.js` (you can copy an existing file as a template)

> Note: This starter seeds a subset of the NeetCode 150 set. You can extend it to the full list.
