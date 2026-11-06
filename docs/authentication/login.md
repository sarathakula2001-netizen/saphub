# SAPHub — User Login Workflow

**Version:** 0.1.0  
**Module:** Authentication  
**Status:** Planning

## 1. Objective

Allow registered students and administrators to securely access their SAPHub accounts.

## 2. Login Form

The login page will contain:

| Field | Requirement |
|---|---|
| Email address | Required |
| Password | Required |
| Remember me | Optional |
| Forgot password | Navigation link |
| Google sign-in | Alternative login method |

## 3. Email and Password Login

1. User opens the login page.
2. User enters their registered email and password.
3. Frontend validates the form.
4. Supabase Auth verifies the credentials.
5. Application checks the authenticated session.
6. Application checks whether email verification is complete.
7. Application checks whether mobile verification is complete.
8. User is redirected to the appropriate page.

## 4. Verification Rules

- Unverified email users must complete email verification.
- Users without mobile verification must complete mobile OTP verification.
- Fully verified students can access their dashboard.
- Administrators must pass the appropriate role and permission checks.

Verification status must be checked using trusted server-side data.

## 5. Google Login

1. User selects Continue with Google.
2. Supabase redirects the user through Google OAuth.
3. Google authenticates the user.
4. Supabase establishes the session.
5. Application checks mobile verification.
6. User completes mobile verification if required.
7. User is redirected to the dashboard.

## 6. Error Handling

Display clear messages for:
- Incorrect email or password
- Account not found
- Email not verified
- Mobile number not verified
- Expired session
- Network failure
- Authentication service unavailable

Do not reveal whether an email address belongs to an account when doing so could expose private information.

## 7. Security Requirements

- Use Supabase Auth.
- Never store passwords in application tables.
- Protect authenticated routes.
- Validate sessions on the server.
- Apply rate limiting to login attempts where appropriate.
- Never expose private authentication tokens.
- Enforce administrator permissions server-side.
- Provide secure logout functionality.

## 8. Logout Workflow

1. User selects Logout.
2. Application calls Supabase sign-out.
3. Session is cleared.
4. User is redirected to the login page.
5. Protected pages require authentication again.

## 9. Success Criteria

Login is successful when:
- Valid credentials establish a session.
- Verification requirements are enforced.
- Students can access their dashboard.
- Administrators receive only authorized access.
- Invalid credentials are handled safely.
- Logout ends the authenticated session.