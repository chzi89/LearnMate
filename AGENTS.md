# Master UI/UX Redesign Prompt — Punjab Public High School

Act as a world-class web designer, senior Next.js developer, and educational brand designer.

Redesign and implement the complete Punjab Public High School website. The result should feel like a premium, modern school website built by a professional agency—not a generic template.

## Project Context

- School: Punjab Public High School
- Education: Playgroup to Class 10 (Matric)
- Framework: Next.js App Router
- Language: JavaScript and JSX only
- Styling: Use the existing styling system where practical.
- Audience: Parents, students, teachers, and prospective families in Pakistan.
- Main goals: Establish trust, communicate educational offerings, highlight staff and verified achievements, and make admission enquiries simple.

Read `project.md` and `AGENT.md` before making changes. Inspect the existing project before writing code.

## Creative Direction

Create a distinctive, polished educational identity.

### Visual Style

Use a deep navy, royal blue, white, and restrained gold palette. The website should feel confident, welcoming, clean, academic, and trustworthy.

Build a consistent visual system featuring:

- Strong but readable typography.
- Spacious section layouts.
- Refined page introductions.
- Carefully composed photographic sections.
- Modern, responsive cards.
- Consistent buttons and form fields.
- Subtle shadows and elegant borders.
- Smooth transitions and restrained motion.
- Clear hierarchy between headings, descriptions, and actions.

Use real school imagery when available. If photos are missing, use tasteful placeholders or initials-based avatars. Never fabricate real staff or student photographs.

## Make Every Page Interactive

### Home Page

Create a visually engaging hero with the heading:

**“From First Steps to Matric Success”**

Supporting text should explain that the school provides education from Playgroup through Class 10.

Include:

- Clear admission-enquiry and explore-school actions.
- Academic stage cards.
- School introduction.
- Why Choose Us section.
- Leadership/staff preview.
- Student achievements preview.
- Gallery preview.
- Final admission-enquiry CTA.

Use a balanced composition with real photography if available, a strong heading, and a clear path to the next action.

### About Page

Create a polished introduction, school mission and values, leadership profiles, teaching staff cards, and Class 9 achievement section.

Leadership:

- Abdul Qadeer — Director, M.Sc. Chemistry.
- Shabir — Sub-Director, M.Sc. Botany.
- Nasir — Principal, English Teacher.

Teaching staff:

- Ajiba Rasool — designation pending confirmation.
- Shabir Ahmed — Urdu Teacher.
- Habib ur Rehman — Pakistan Studies Teacher.
- Mufti Umer — Islamic Studies / Tarjuma Teacher.
- Mufti Abdul Hameed — Islamic Studies / Tarjuma Teacher.
- Ansar Shehzad — Computer Teacher, M.S. IT.

Class 9 achievement draft:

- 1st — Zain ul Abedain.
- 2nd — Subhan Irfan.
- 3rd — Farhan.

Make profile cards visually consistent and responsive. Use tasteful hover interactions and optional accessible detail links if meaningful. Do not add fake biographies, qualifications, or photographs.

### Academics Page

Present four clear stages:

- Early Years: Playgroup, Nursery, Kindergarten.
- Primary: Classes 1–5.
- Middle: Classes 6–8.
- Secondary: Classes 9–10.

Use visually distinct cards and concise descriptions of educational progression. Do not claim unsupported curriculum details or facilities.

### Admissions Page

Build an accessible, polished enquiry experience.

Include:

- Admission information for Playgroup through Class 10.
- Parent/guardian name.
- Contact number.
- Desired class.
- Optional message.
- Field validation.
- Clear error, loading, and success states.

Only claim that an enquiry was sent when it was actually processed. If no backend exists, provide a clearly identified demo state or prepare the form for backend integration.

### Results Page

Present verified academic achievements with clear visual hierarchy. Highlight the supplied Class 9 position holders without inventing marks, percentages, examination year, official board ranks, or certificates.

### Gallery Page

Build a responsive photo grid with optional category filtering and an accessible image preview. Use genuine school photos only. Ensure the page still looks intentional when images are unavailable.

### Contact Page

Display only verified contact details. Add accessible enquiry forms, useful contact links, and a map only when a confirmed location is available.

## Functional Requirements

- Responsive desktop navigation and accessible mobile menu.
- Consistent header and footer across pages.
- Working internal links and buttons.
- Subtle scroll-reveal animations.
- Respect `prefers-reduced-motion`.
- Interactive cards only when interaction adds value.
- Accessible gallery preview.
- Keyboard navigation and focus states.
- Form validation and feedback.
- No fake counters, fake testimonials, or decorative controls that do nothing.

## Technical Requirements

- Use Next.js App Router, JavaScript, and JSX only.
- Reuse the existing project architecture.
- Keep components modular and reusable.
- Store repeated staff, academic, and achievement content in JavaScript data files.
- Prefer server components unless interactivity requires a client component.
- Use `"use client"` only when needed.
- Avoid unnecessary dependencies.
- Avoid hydration errors and layout shifts.
- Add page-specific metadata and appropriate SEO descriptions.
- Optimize image sizes and loading.
- Preserve working application functionality.

## Responsive Quality

Test mobile, tablet, laptop, and large desktop layouts. Prevent horizontal scrolling, oversized mobile headings, clipped cards, inaccessible menus, and tiny touch targets.

## Content Accuracy

Never invent:

- School address or phone number.
- Admission dates or fees.
- School history.
- Staff qualifications.
- School facilities.
- Awards or board results.
- Student marks or exam years.
- Testimonials or statistics.

Keep unverified details editable and flag them for review.

## Execution Plan

1. Inspect the current project and its dependencies.
2. Review `project.md` and `AGENT.md`.
3. Create a consistent design system.
4. Implement or improve all required pages.
5. Build reusable UI components.
6. Add real interactions and form validation.
7. Review accessibility, responsive layouts, SEO, and performance.
8. Run lint and production build using the available project scripts.
9. Fix errors caused by the changes.
10. Report what was implemented, which files changed, how to test the website, and which school details still need confirmation.

Do not stop after creating a homepage mockup. Implement a coherent website across all required pages, keeping the existing project stable and maintainable.
