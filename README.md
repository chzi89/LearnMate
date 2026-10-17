# LearnMate AI

LearnMate is a JavaScript-first Next.js learning assistant prototype. It
provides a tutor workspace, simple subject-based practice questions, and
preview screens for a future student learning product.

## Current implementation

- `/` is a product landing page with links to the tutor and dashboard.
- `/learn` provides a tutor conversation, grade/subject/language choices,
  read-aloud and copy controls, and one sample practice question.
- The tutor uses Gemini 3.8 Flash through Google's Interactions API when
  `GEMINI_API_KEY` is configured. Without a key, it labels and returns
  clearly identified sample demo replies.
- `/dashboard` contains illustrative preview data; it is not connected to
  student accounts or saved results.
- `/quiz` links to the sample practice question in the tutor. Quiz generation
  and AI answer evaluation are not implemented.
- `/progress` and `/settings` explain which features are not available yet.
- Conversations and progress are not saved by LearnMate. Gemini requests set
  `store: false`; review Google's current data handling terms before using
  real student data.

## Requirements

- A supported Node.js LTS release and npm.
- A Gemini API key only if you want live AI responses. The sample tutor mode
  works without one.

## Getting started

Install dependencies:

```bash
npm install
```

Copy `.env.example` to `.env.local`. Set `GEMINI_API_KEY` for live tutoring.
Google sign-in also requires `NEXTAUTH_URL`, a strong random `NEXTAUTH_SECRET`,
and Google OAuth client credentials (`GOOGLE_CLIENT_ID` and
`GOOGLE_CLIENT_SECRET`). Keep all keys server-side; never use a `NEXT_PUBLIC_`
variable or commit `.env.local`.

Start the development server:

```bash
npm run dev
```

Open <http://localhost:3000>.

## Checks

```bash
npm run lint
npm run build
```

## API

- `POST /api/chat` validates the question and tutor preferences, enforces a
  request-size limit, and calls Gemini on the server when configured. It
  returns an explicitly marked demo mode when no key is set.
- Quiz generation/evaluation and progress persistence APIs are not
  implemented.

## Before public deployment

- Add a distributed rate limiter and provider usage limits; the chat endpoint
  can incur API charges.
- Decide authentication and secure persistence before storing progress.
- Review privacy, consent, and safeguarding requirements for the intended
  student age groups and launch regions.
- Test tutor accuracy, prompt-injection handling, and the main learning flow
  with representative grade levels and subjects.
- Add automated tests for API validation and quiz scoring.

## Project documents

- [`AGENTS.md`](./AGENTS.md) contains repository-specific coding guidance.
- [`PROJECT.md`](./PROJECT.md) describes product scope, safeguards, and
  outstanding milestones.
