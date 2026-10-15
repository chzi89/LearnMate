# LearnMate AI

An AI-powered learning assistant designed to help students across school
grades and learning levels understand topics, practise quizzes, review
mistakes, and decide what to learn next.

> **Status:** Planning / MVP in development. Features described here
> should not be considered implemented until they have been built and
> tested.

## Features planned

-   Grade/learning-level and subject selection.
-   Topic explanations in English or Roman Urdu.
-   AI-generated practice quizzes.
-   Answer feedback and explanations.
-   Basic performance summary and personalized next-step suggestions.
-   Demo mode for trying the interface without an AI API key.

## Tech stack

-   Next.js App Router
-   JavaScript (not TypeScript)
-   React
-   Server-side Next.js Route Handlers
-   An AI model API (provider to be selected)
-   Existing project styling system, with Tailwind CSS optional

## Getting started

### 1. Requirements

Install a current supported Node.js LTS release and npm. You will also
need Git if you plan to use version control.

### 2. Install dependencies

Clone or open the project repository, then run:

``` bash
npm install
```

### 3. Configure environment variables

Create `.env.local` in the project root. The exact variable name depends
on the AI provider selected by the project.

Example:

``` env
AI_API_KEY=replace_with_your_private_api_key
```

Never put a private API key in a `NEXT_PUBLIC_` variable or commit
`.env.local` to Git. If the project uses a provider-specific variable
name, follow the implementation and `.env.example`.

### 4. Start the development server

``` bash
npm run dev
```

Open <http://localhost:3000> in your browser.

### 5. Production build

``` bash
npm run build
npm run start
```

Run only scripts that are defined in the project's `package.json`.

## How the learning flow should work

1.  Select a grade or learning level.
2.  Choose a subject and topic.
3.  Choose an explanation language.
4.  Read the topic explanation.
5.  Attempt the quiz.
6.  Review the score and explanations.
7.  Follow the recommended next learning step.

## Suggested API routes

-   `POST /api/tutor` --- create a level-appropriate topic explanation.
-   `POST /api/quiz` --- generate or evaluate quiz content.

Validate request data and model output on the server. Keep secrets on
the server and handle provider errors without exposing sensitive details
to the browser.

## Project documents

-   [`AGENT.md`](./AGENT.md) --- coding-agent instructions and
    implementation rules.
-   [`PROJECT.md`](./PROJECT.md) --- product requirements, scope,
    milestones, and safeguards.

## Development principles

-   JavaScript only (`.js` / `.jsx`); do not introduce TypeScript or
    `.tsx`.
-   Keep the interface accessible and responsive.
-   Use age-appropriate explanations.
-   Ask for country/curriculum when official curriculum alignment
    matters.
-   Do not invent textbook citations or guarantee answer correctness.
-   Do not store student data unless storage is implemented securely and
    explained to users.
-   Add rate limiting and usage controls before public deployment.
-   Test explanations and quiz scoring across several grades and
    subjects.

## Contributing / solo development

For each milestone: 1. Inspect existing code before editing. 2. Make a
small, focused change. 3. Run lint/build checks that the repository
supports. 4. Test the user flow. 5. Update this README when setup or
implemented features change.

## License

No license has been selected yet. Add a license before inviting public
reuse or accepting external contributions.
