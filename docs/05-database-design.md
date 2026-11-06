# SAPHub — Database Design

**Version:** 0.1.0  
**Database:** Supabase PostgreSQL  
**Status:** Database Planning

## 1. Database Objectives

The database must securely store:
- User profiles and verification status
- SAP learning modules and courses
- Chapters and lessons
- Quiz questions and answers
- Quiz attempts and results
- Student learning progress
- Bookmarks
- Interview preparation content
- Community discussions

The design must support future SAP modules without requiring a complete database redesign.

## 2. Database Technology

- PostgreSQL through Supabase
- Supabase Auth for authentication
- Row Level Security (RLS) for data protection
- Database migrations for schema changes

## 3. Main Tables

### 3.1 profiles

Stores additional information about registered users.

| Column | Type | Purpose |
|---|---|---|
| id | UUID | References auth.users |
| full_name | TEXT | User's display name |
| avatar_url | TEXT | Profile image |
| phone_number | TEXT | Verified phone number |
| phone_verified | BOOLEAN | Mobile verification status |
| role | TEXT | Student or administrator |
| created_at | TIMESTAMPTZ | Account creation time |
| updated_at | TIMESTAMPTZ | Last profile update |

### 3.2 modules

Stores SAP technology categories.

| Column | Type | Purpose |
|---|---|---|
| id | UUID | Module identifier |
| name | TEXT | ABAP or HANA |
| slug | TEXT | URL-friendly identifier |
| description | TEXT | Module description |
| is_published | BOOLEAN | Publication status |
| created_at | TIMESTAMPTZ | Creation time |

### 3.3 courses

Stores individual learning courses.

| Column | Type | Purpose |
|---|---|---|
| id | UUID | Course identifier |
| module_id | UUID | Parent module |
| title | TEXT | Course title |
| slug | TEXT | URL-friendly identifier |
| description | TEXT | Course description |
| difficulty | TEXT | Beginner, intermediate, advanced |
| sort_order | INTEGER | Display order |
| is_published | BOOLEAN | Publication status |

### 3.4 chapters

Organizes lessons into chapters.

| Column | Type | Purpose |
|---|---|---|
| id | UUID | Chapter identifier |
| course_id | UUID | Parent course |
| title | TEXT | Chapter title |
| sort_order | INTEGER | Display order |

### 3.5 lessons

Stores lesson metadata and content references.

| Column | Type | Purpose |
|---|---|---|
| id | UUID | Lesson identifier |
| chapter_id | UUID | Parent chapter |
| title | TEXT | Lesson title |
| slug | TEXT | URL-friendly identifier |
| content_path | TEXT | Markdown or MDX content location |
| sort_order | INTEGER | Display order |
| estimated_minutes | INTEGER | Estimated learning time |
| is_published | BOOLEAN | Publication status |

### 3.6 quiz_questions

Stores questions for learning quizzes.

| Column | Type | Purpose |
|---|---|---|
| id | UUID | Question identifier |
| lesson_id | UUID | Related lesson |
| question_text | TEXT | Question |
| options | JSONB | Available choices |
| correct_answer | TEXT | Correct choice identifier |
| explanation | TEXT | Answer explanation |
| difficulty | TEXT | Question difficulty |

Correct answers must never be exposed in public question responses before submission.

### 3.7 quiz_attempts

Stores quiz submissions and results.

| Column | Type | Purpose |
|---|---|---|
| id | UUID | Attempt identifier |
| user_id | UUID | Student identifier |
| lesson_id | UUID | Related lesson |
| score | INTEGER | Score achieved |
| total_questions | INTEGER | Number of questions |
| attempted_at | TIMESTAMPTZ | Submission time |

### 3.8 lesson_progress

Stores each student's lesson progress.

| Column | Type | Purpose |
|---|---|---|
| id | UUID | Record identifier |
| user_id | UUID | Student identifier |
| lesson_id | UUID | Lesson identifier |
| status | TEXT | Not started, in progress, completed |
| completed_at | TIMESTAMPTZ | Completion time |
| updated_at | TIMESTAMPTZ | Last update |

### 3.9 bookmarks

Stores lessons saved by students.

| Column | Type | Purpose |
|---|---|---|
| id | UUID | Bookmark identifier |
| user_id | UUID | Student identifier |
| lesson_id | UUID | Saved lesson |
| created_at | TIMESTAMPTZ | Bookmark time |

## 4. Relationships

- One module can contain multiple courses.
- One course can contain multiple chapters.
- One chapter can contain multiple lessons.
- One lesson can contain multiple quiz questions.
- One student can have multiple quiz attempts.
- One student can have progress records for multiple lessons.
- One student can bookmark multiple lessons.

## 5. Security Requirements

- Use UUID identifiers where appropriate.
- Reference Supabase Auth users through foreign keys.
- Enable RLS on user-specific tables.
- Students can access and modify only their own progress, attempts, and bookmarks.
- Only authorized administrators can manage published learning content.
- Correct quiz answers must be protected from unauthorized client access.
- Never store passwords in application tables.

## 6. Data Integrity

- Use foreign keys for relationships.
- Add unique constraints to course and lesson slugs where appropriate.
- Prevent duplicate bookmarks for the same user and lesson.
- Prevent duplicate progress records for the same user and lesson.
- Add appropriate indexes for frequently queried columns.
- Use timestamps for important records.

## 7. Future Tables

Additional tables may be introduced for:
- Interview questions
- Interview practice attempts
- Community posts
- Comments and replies
- Notifications
- User achievements
- Learning streaks
- Content review history

## 8. Important Implementation Notes

This document describes the initial logical database design. Exact SQL types, constraints, indexes, triggers, RLS policies, and migration scripts will be reviewed before implementation.

The database must be created and modified using version-controlled migrations.