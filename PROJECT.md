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
learning goal. It then: 1. Explains the topic at an appropriate level. 2. Creates practice questions. 3. Evaluates submitted answers and
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

- Responsive homepage and learning workspace.
- Grade/level, subject, topic, and language selection.
- AI topic explanation.
- Quiz generation.
- Answer checking and feedback.
- Basic session summary and next-step recommendation.
- Demo/fallback mode when no API key is configured.
- Helpful loading, empty, and error states.

### Not included in the first version

- Payments or subscriptions.
- Public student profiles or social features.
- High-stakes grading or official examination certification.
- Claims of complete curriculum coverage.
- Complex school administration, teacher dashboards, or parent
  portals.
- Persistent student accounts until authentication and privacy
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

- **Frontend:** Next.js App Router with JavaScript and React.
- **Styling:** Use the repository's existing styling system; Tailwind
  CSS is optional.
- **AI:** A server-side AI model API, selected after checking pricing,
  regional availability, and terms.
- **Backend:** Next.js Route Handlers under `app/api/`.
- **Persistence:** Start without a database or use a small, clearly
  documented demo session. Add a database only when progress storage
  is required.
- **Deployment:** Any compatible host that supports the chosen Next.js
  features and environment variables.

Do not commit API keys or other secrets to Git.

## 8. Example AI Output Shape

The server can request a structured response similar to this:

```json
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

```text
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
AGENTS.md
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

- **Incorrect explanations:** test examples, validate structured
  output, and allow feedback.
- **Curriculum mismatch:** ask for country/curriculum when necessary
  and use approved material where possible.
- **Children's privacy:** minimize collected data and review
  applicable requirements before launch.
- **API costs or abuse:** set usage limits and rate limits.
- **Prompt injection:** treat uploaded text and model output as
  untrusted; never execute generated code.
- **Over-reliance on AI:** encourage students to reason and practise,
  not simply copy answers.

## 13. Current Status

The repository contains a working UI prototype and one Gemini-backed tutor
route, with sample tutor replies available when no API key is configured.
The dashboard uses illustrative data; student accounts, saved progress,
AI-generated quizzes, and AI-based answer evaluation are not implemented.
See the README for the current route behavior and development checks. Treat
all preview data as sample data, not as a real student's record.

# Punjab Public High School — Project Documentation

## 1. Project Overview

**Project Name:** Punjab Public High School Website  
**Website Type:** Modern, responsive school website  
**Education Level:** Playgroup to Class 10 (Matric)  
**Framework:** Next.js App Router  
**Language:** JavaScript + JSX  
**Styling:** Existing styling system or Tailwind CSS, based on the current project  
**Primary Goal:** Present the school professionally, build trust with parents, showcase teachers and student achievements, and make admission enquiries easy.

## 2. Design Vision

Build a premium, modern educational website with a welcoming, trustworthy, academic identity.

### Design System

- Primary color: Deep navy blue `#102A43`
- Secondary color: Royal blue `#2457A7`
- Accent color: Warm gold `#D6A84F`
- Background: Soft white `#FFFFFF`
- Alternate background: Light blue-gray `#F3F6FA`
- Text: Dark slate `#243447`
- Border: Soft gray `#E2E8F0`

Use consistent typography, generous spacing, rounded cards, subtle shadows, refined borders, and smooth transitions. Avoid excessive gradients, flashy effects, and generic AI-generated layouts.

## 3. Website Pages

### Home — `/`

- Responsive navigation and school logo.
- Hero section with the heading: “From First Steps to Matric Success.”
- Supporting text highlighting education from Playgroup to Class 10.
- Primary CTA: “Enquire About Admissions.”
- Secondary CTA: “Explore Our School.”
- School introduction and educational stages.
- Why Choose Us section.
- Academic programme cards.
- Teacher and leadership preview.
- Student achievement preview.
- School gallery preview.
- Parent enquiry CTA.
- Complete footer with navigation and verified contact details.

### About Us — `/about`

- School introduction and educational mission.
- Vision, values, discipline, and student development.
- Leadership cards:
  - Abdul Qadeer — Director, M.Sc. Chemistry.
  - Shabir — Sub-Director, M.Sc. Botany.
  - Nasir — Principal, English Teacher.
- Teaching staff cards:
  - Ajiba Rasool — designation to be confirmed.
  - Shabir Ahmed — Urdu Teacher.
  - Habib ur Rehman — Pakistan Studies Teacher.
  - Mufti Umer — Islamic Studies / Tarjuma Teacher.
  - Mufti Abdul Hameed — Islamic Studies / Tarjuma Teacher.
  - Ansar Shehzad — Computer Teacher, M.S. IT.
- Class 9 achievement section:
  - 1st: Zain ul Abedain.
  - 2nd: Subhan Irfan.
  - 3rd: Farhan.
- Use verified photographs when available; otherwise use initials-based avatars.
- Keep staff roles and student results easy to update.

### Academics — `/academics`

- Early Years: Playgroup, Nursery, Kindergarten.
- Primary Education: Classes 1–5.
- Middle Education: Classes 6–8.
- Secondary Education: Classes 9–10.
- Explain learning objectives and academic progression.
- Use clear cards, subject highlights, and age-appropriate descriptions.
- Do not advertise unverified programmes or facilities.

### Admissions — `/admissions`

- Admission information for Playgroup through Class 10.
- General enquiry form with parent name, contact number, desired class, and message.
- Form validation and success/error feedback.
- Explain that submitting an enquiry does not automatically confirm admission.
- Add verified admission requirements and dates only when supplied by the school.
- Connect the form to a backend only if the project supports it; otherwise clearly label it as a demo.

### Results & Achievements — `/results`

- Class-wise academic achievement sections.
- Class 9 position holders.
- Editable achievement data.
- Display examination year and marks only when verified.
- Avoid fabricated board affiliations, results, statistics, or awards.

### Gallery — `/gallery`

- Responsive image grid.
- Optional category filters.
- Lightbox or accessible image preview.
- Real school photographs only.
- Use placeholders until genuine photographs are provided.

### Contact Us — `/contact`

- Verified school address, phone number, email, and opening hours.
- Contact form with validation.
- Optional map integration if the exact school location is provided.
- WhatsApp contact link only when a verified number is supplied.
- Friendly confirmation and error states.

## 4. Interactive Features

- Sticky navigation with mobile menu.
- Active navigation states.
- Smooth scrolling where appropriate.
- Subtle reveal-on-scroll animations.
- Hover effects on cards and buttons.
- Accessible gallery previews.
- Form validation and clear feedback.
- Clickable telephone, email, and WhatsApp links when verified.
- Reduced-motion support.
- Loading, empty, and error states where applicable.

Interactions must be functional, not merely decorative.

## 5. Responsive Requirements

Support mobile phones, tablets, laptops, and large desktop screens.

- Mobile-first layouts.
- No horizontal overflow.
- Touch-friendly buttons.
- Responsive grids and images.
- Readable text at all sizes.
- Navigation must remain usable on small screens.

## 6. SEO and Accessibility

- Unique page title and meta description for every page.
- Semantic HTML and logical heading hierarchy.
- Descriptive image alt text.
- Keyboard navigation and visible focus indicators.
- Accessible forms and sufficient color contrast.
- Open Graph metadata where appropriate.
- Sitemap and robots configuration where appropriate.
- Optimize images, fonts, JavaScript, and page loading.

## 7. Content Rules

- The school serves Playgroup through Class 10 only.
- Do not mention college, intermediate, or university programmes.
- Do not invent school history, awards, teacher qualifications, fees, facilities, contact details, or admission dates.
- Treat the supplied teacher and topper details as editable draft content until verified.
- Preserve correct spelling of staff and student names.
- Use genuine school branding and photographs when available.

## 8. Technical Requirements

- Use Next.js App Router and JavaScript/JSX.
- Reuse shared components and existing project conventions.
- Keep navigation, footer, buttons, typography, spacing, and colors consistent.
- Store repeated staff, academic, and achievement content in reusable JavaScript data files.
- Use reusable components for cards, sections, forms, and page layouts.
- Do not introduce TypeScript.
- Do not replace the entire project or remove working functionality without a reason.
- Avoid unnecessary packages and animations that harm performance.

## 9. Definition of Done

- Every navigation link leads to the correct page.
- All pages use the same design system.
- Mobile and desktop layouts work correctly.
- Forms validate input and provide clear feedback.
- No fabricated school information appears.
- No broken images, links, or console errors remain.
- Lint and production build pass using the project's existing setup.
- The website is ready for school review before publication.
