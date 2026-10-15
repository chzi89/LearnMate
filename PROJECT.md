# PROJECT.md --- LearnMate AI

## 1. Overview

LearnMate AI is an AI-powered learning assistant designed to help
students across school grades and learning levels understand topics,
practise questions, and improve through personalized feedback.

**Working name:** LearnMate AI\
**Product type:** Web application / AI learning agent\
**Initial audience:** School students; the app should be designed so
that other learning levels can be added later.\
**Initial languages:** English and Roman Urdu\
**Initial developer approach:** Solo developer, JavaScript-first.

## 2. Problem

Students often receive the same explanation regardless of their current
understanding. They may also struggle to identify weak topics or know
what to practise next.

## 3. Proposed Solution

LearnMate AI asks for a student's grade, subject, topic, language, and
learning goal. It then: 1. Explains the topic at an appropriate level.
2. Creates practice questions. 3. Evaluates submitted answers and
explains mistakes. 4. Summarizes strengths and weak areas. 5. Recommends
a next step based on the student's performance.

## 4. Main User Journey

1.  Student opens the app.
2.  Student selects grade/level, subject, topic, and explanation
    language.
3.  Student requests an explanation.
4.  Student reads the explanation and starts a short quiz.
5.  Student submits answers.
6.  The app calculates objective scores where possible and asks the AI
    to explain mistakes.
7.  The app recommends revision, easier practice, harder practice, or
    the next topic.
8.  The student can repeat the cycle.

## 5. MVP Scope

### Included

-   Responsive homepage and learning workspace.
-   Grade/level, subject, topic, and language selection.
-   AI topic explanation.
-   Quiz generation.
-   Answer checking and feedback.
-   Basic session summary and next-step recommendation.
-   Demo/fallback mode when no API key is configured.
-   Helpful loading, empty, and error states.

### Not included in the first version

-   Payments or subscriptions.
-   Public student profiles or social features.
-   High-stakes grading or official examination certification.
-   Claims of complete curriculum coverage.
-   Complex school administration, teacher dashboards, or parent
    portals.
-   Persistent student accounts until authentication and privacy
    requirements are planned.

## 6. AI Agent Behaviour

The agent should behave like a patient tutor, not just a general
chatbot.

It should: - Use simple language appropriate to the chosen level. -
Break complex ideas into manageable steps. - Use examples and short
checks for understanding. - Ask a clarifying question when the topic is
too broad. - Avoid inventing textbook references or official curriculum
claims. - Admit uncertainty and request source material when needed. -
Explain why an answer is incorrect and how to improve it. - Recommend
the next learning step based on evidence from the current session.

The app should validate the agent's output and calculate objective quiz
scores itself where possible. AI-generated feedback should not be
treated as infallible.

## 7. Recommended Technology

-   **Frontend:** Next.js App Router with JavaScript and React.
-   **Styling:** Use the repository's existing styling system; Tailwind
    CSS is optional.
-   **AI:** A server-side AI model API, selected after checking pricing,
    regional availability, and terms.
-   **Backend:** Next.js Route Handlers under `app/api/`.
-   **Persistence:** Start without a database or use a small, clearly
    documented demo session. Add a database only when progress storage
    is required.
-   **Deployment:** Any compatible host that supports the chosen Next.js
    features and environment variables.

Do not commit API keys or other secrets to Git.

## 8. Example AI Output Shape

The server can request a structured response similar to this:

``` json
{
  "topic": "Fractions",
  "level": "Grade 5",
  "language": "Roman Urdu",
  "explanation": "Fraction kisi cheez ke barabar hisson mein se kuch hissa dikhata hai.",
  "keyPoints": [
    "Denominator batata hai total barabar hissay kitne hain.",
    "Numerator batata hai kitne hissay liye gaye hain."
  ],
  "quiz": [
    {
      "question": "1/4 mein denominator kya hai?",
      "options": ["1", "4", "5", "0"],
      "correctAnswer": "4",
      "explanation": "Neeche wala number denominator hota hai."
    }
  ],
  "nextStep": "Give more practice questions"
}
```

This is an example schema, not a claim that the AI will always return
valid JSON. Validate all responses on the server, and do not expose
answer keys before the student submits the quiz.

## 9. Suggested Project Structure

``` text
app/
  layout.js
  page.js
  learn/
    page.js
  api/
    tutor/
      route.js
    quiz/
      route.js
components/
  Header.js
  LearningForm.js
  TutorResponse.js
  QuizCard.js
  ProgressSummary.js
lib/
  ai.js
  prompts.js
  validation.js
public/
  images/
.env.example
.gitignore
AGENT.md
PROJECT.md
README.md
```

Adapt this structure to the actual repository rather than replacing
working files blindly.

## 10. Milestones

### Milestone 1 --- UI prototype

Build the responsive pages and learning form using sample data.

### Milestone 2 --- First AI request

Connect one server-side tutor endpoint and display a safe, validated
explanation.

### Milestone 3 --- Quiz loop

Generate questions, collect answers, calculate score, and explain
mistakes.

### Milestone 4 --- Adaptive next step

Use the result to recommend revision, easier practice, harder practice,
or a new topic.

### Milestone 5 --- Quality and demo

Test multiple grades and subjects, improve error handling, record a
demo, and prepare a pitch deck.

## 11. Success Measures

Track these during testing: - Whether students can complete a learning
session without help. - Correctness of quiz scoring. - Whether
explanations match the selected level. - Whether the next-step
recommendation follows the student's result. - Student-reported clarity
before and after using the app. - Common AI errors and how often the app
recovers gracefully.

Do not claim learning improvement without testing and evidence.

## 12. Risks and Safeguards

-   **Incorrect explanations:** test examples, validate structured
    output, and allow feedback.
-   **Curriculum mismatch:** ask for country/curriculum when necessary
    and use approved material where possible.
-   **Children's privacy:** minimize collected data and review
    applicable requirements before launch.
-   **API costs or abuse:** set usage limits and rate limits.
-   **Prompt injection:** treat uploaded text and model output as
    untrusted; never execute generated code.
-   **Over-reliance on AI:** encourage students to reason and practise,
    not simply copy answers.

## 13. Current Status

Planning document. Features should be marked complete only after
implementation and testing in the actual repository.
