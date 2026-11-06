# SAPHub — Email Verification Workflow

**Version:** 0.1.0  
**Module:** Authentication  
**Provider:** Supabase Auth  
**Status:** Planning

## 1. Objective

Verify that a student owns the email address provided during registration.

## 2. Verification Process

1. Student registers using an email address and password.
2. Supabase Auth creates the account.
3. Supabase sends a verification email.
4. Student opens the email.
5. Student clicks the verification link.
6. Supabase validates the verification token.
7. The email address is marked as verified.
8. Student returns to SAPHub.
9. Application checks the user's verification status.
10. Student proceeds to mobile verification if it is still pending.

## 3. Verification Email

The email should contain:
- SAPHub branding
- A clear verification message
- A verification link
- Instructions if the link expires
- Support contact information when available

## 4. Verification Link Handling

The application must handle:

- Valid verification links
- Expired verification links
- Invalid verification tokens
- Already verified accounts
- Network or service errors

Never mark an email as verified based only on a browser redirect. Use the authentication provider's verified session and account status.

## 5. Resend Verification Email

1. Student selects Resend Verification Email.
2. Application checks the request.
3. Supabase sends a new verification email.
4. Application displays a confirmation message.

Apply a resend cooldown and rate limits to prevent abuse.

## 6. Access Control

- Unverified users cannot access protected learning features.
- Verified users can continue to mobile verification.
- Fully verified users can access the student dashboard.
- Verification status must be checked on the server.

## 7. Security Requirements

- Use Supabase Auth email verification.
- Do not expose verification tokens in application logs.
- Do not trust client-provided verification status.
- Handle expired and invalid links safely.
- Apply rate limits to resend requests.
- Use HTTPS in production.

## 8. Success Criteria

Email verification is successful when:
- The verification email is delivered.
- A valid link verifies the correct account.
- Expired and invalid links are handled safely.
- Resend functionality works.
- Unverified accounts remain restricted.