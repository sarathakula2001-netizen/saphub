# SAPHub — System Architecture

**Version:** 0.1.0  
**Status:** Architecture Planning

## 1. Architecture Overview

SAPHub will use a modular full-stack architecture built with Next.js, React, TypeScript, and Supabase.

The application will separate:
- User interface
- Application features and business logic
- Authentication
- Database access
- Learning content
- Administration

Each feature should be maintainable and expandable independently.

## 2. High-Level Architecture

```text
                    STUDENT / ADMIN
                           |
                           v
                    NEXT.JS FRONTEND
                           |
              +------------+------------+
              |            |            |
              v            v            v
          AUTH UI      LEARNING UI   ADMIN UI
              |            |            |
              +------------+------------+
                           |
                           v
                  APPLICATION SERVICES
                           |
                           v
                    SUPABASE CLIENT
                           |
              +------------+------------+
              |            |            |
              v            v            v
        SUPABASE AUTH   POSTGRESQL   STORAGE
        Authentication  User Data    Files
```

## 3. Frontend Architecture

**Technologies:** Next.js App Router, React, TypeScript, Tailwind CSS.

Responsibilities:
- Render pages and layouts
- Handle navigation
- Display lessons and code examples
- Manage interactive quizzes
- Display dashboards
- Support responsive design
- Provide dark and light themes

## 4. Backend and Application Logic

Next.js server-side functionality and Supabase will support application operations.

Responsibilities:
- Validate requests
- Retrieve and update learning data
- Enforce access permissions
- Manage user progress
- Process quiz submissions
- Support administrative operations

Sensitive operations must be performed on the server.

## 5. Authentication Architecture

Supabase Auth will handle:
- Email and password authentication
- Email verification
- Google OAuth
- Password recovery
- Session management

A separate verification workflow will handle mobile OTP verification.

Mobile verification status must be checked before granting access to protected learning features.

## 6. Database Architecture

**Database:** Supabase PostgreSQL

Planned data areas:
- User profiles
- Learning modules
- Courses
- Chapters
- Lessons
- Quiz questions
- Quiz attempts
- Learning progress
- Bookmarks
- Interview questions
- Community discussions

Row Level Security (RLS) will protect user-specific records.

## 7. Learning Content Architecture

Learning content will be organized independently from application code.

Initial content modules:
- ABAP
- HANA

Lessons will use structured Markdown or MDX content with metadata.

The platform will support:
- Lesson ordering
- Code examples
- Quizzes
- Previous and next navigation
- Content updates

User progress and quiz attempts will be stored in PostgreSQL.

## 8. Feature-Based Folder Structure

```text
src/
  app/
  components/
  features/
    auth/
    abap/
    hana/
    learning/
    quizzes/
    interviews/
    community/
    dashboard/
  lib/
    supabase/
    utils/
    validations/
  content/
    abap/
    hana/
  config/
  types/
```

Each feature should contain its own components, services, schemas, and types where appropriate.

## 9. Security Architecture

- Use environment variables for secrets.
- Never expose the Supabase service-role key in browser code.
- Apply RLS to protected database tables.
- Validate input on the server.
- Protect administrative routes and operations.
- Rate-limit OTP and verification requests.
- Store no plaintext passwords or OTPs.

## 10. Performance Architecture

- Use server components by default.
- Use client components only when interactivity is needed.
- Lazy-load heavy 3D components.
- Optimize images and fonts.
- Avoid unnecessary database requests.
- Keep mobile performance in mind.

## 11. Deployment Architecture

The planned production setup:
- Frontend: Vercel
- Database and authentication: Supabase
- Source control: GitHub

Deployment will happen only after local testing and explicit approval.

## 12. Architecture Principles

1. Keep features modular.
2. Avoid giant components and files.
3. Separate UI from business logic.
4. Keep secrets on the server.
5. Design for future SAP modules.
6. Prioritize security and maintainability.
7. Test features before integration.