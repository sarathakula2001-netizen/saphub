# SAPHub — Authentication System

**Version:** 0.1.0  
**Authentication Provider:** Supabase Auth  
**Status:** Authentication Planning

## 1. Objective

Build a secure and user-friendly authentication system for SAPHub.

Students should be able to create accounts, verify their identity, log in, recover passwords, and manage their sessions.

## 2. Authentication Methods

The platform will support:

- Email and password registration
- Email verification
- Google OAuth login
- Mobile number verification using OTP
- Email-based password recovery

## 3. Registration Workflow

1. Student opens the registration page.
2. Student enters full name, email, password, and mobile number.
3. Application validates the submitted information.
4. Supabase Auth creates the account.
5. A verification email is sent.
6. Student verifies their email.
7. Student completes mobile OTP verification.
8. A profile record is created or updated.
9. Student gains access to protected learning features.

Unverified accounts must not receive full student access.

## 4. Login Workflow

1. Student opens the login page.
2. Student enters email and password.
3. Supabase Auth validates the credentials.
4. Application checks email verification status.
5. Application checks mobile verification status.
6. Verified students are redirected to their dashboard.
7. Incomplete verification redirects the student to the appropriate verification page.

## 5. Email Verification

- Use Supabase Auth email verification.
- Send a verification link to the registered email.
- Handle expired and invalid verification links.
- Provide an option to resend verification email.
- Prevent unverified accounts from accessing protected features.

## 6. Mobile OTP Verification

- Student enters their mobile number.
- Application requests an OTP from a trusted verification provider.
- Student enters the received OTP.
- The server validates the OTP.
- Successful verification updates the profile's verification status.

Security requirements:
- OTPs must expire.
- Limit verification attempts.
- Apply resend cooldowns and rate limits.
- Never log or store OTPs in plaintext.
- Do not trust verification status supplied by the browser.

The OTP provider and its integration will be selected before implementation.

## 7. Google OAuth

- Use Supabase Auth with Google as an identity provider.
- Student selects Continue with Google.
- Google authenticates the student.
- Supabase handles the authentication callback.
- Application checks the student's mobile verification status.
- Students without verified mobile numbers must complete mobile verification.

## 8. Forgot Password

1. Student selects Forgot Password.
2. Student enters their registered email.
3. Application requests a password reset email.
4. Student opens the reset link.
5. Student enters a new password.
6. Supabase updates the password.
7. Student returns to the login page.

Invalid and expired reset links must be handled safely.

## 9. Session Management

- Use secure Supabase Auth sessions.
- Support logout.
- Handle expired sessions.
- Protect authenticated routes.
- Redirect unauthenticated users to login.
- Avoid exposing authentication tokens in URLs or logs.

## 10. User Roles

Initial roles:

- Student
- Administrator

Role assignments must be controlled by trusted server-side operations. Users must not be able to promote themselves to administrator.

## 11. Security Requirements

- Never store plaintext passwords.
- Use Supabase Auth for credential management.
- Protect server-side secrets.
- Validate authentication requests.
- Apply rate limits to OTP and password recovery.
- Protect administrative operations.
- Use secure session handling.
- Test common authentication failure scenarios.

## 12. Authentication Pages

Planned routes:

- `/register`
- `/login`
- `/verify-email`
- `/verify-phone`
- `/forgot-password`
- `/reset-password`

## 13. Acceptance Criteria

Authentication will be considered ready when:

- Students can register successfully.
- Email verification works.
- Mobile OTP verification works.
- Google OAuth works.
- Login and logout work.
- Password recovery works.
- Unverified users cannot access protected learning features.
- Student and administrator permissions are enforced.
- Authentication flows have been tested for security.