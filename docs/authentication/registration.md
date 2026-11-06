# SAPHub — User Registration Workflow

**Version:** 0.1.0  
**Module:** Authentication  
**Status:** Planning

## 1. Objective

Allow new students to create a SAPHub account using their name, email address, password, and mobile number.

## 2. Registration Form

The registration page will contain:

| Field | Requirement |
|---|---|
| Full name | Required |
| Email address | Required, valid email |
| Password | Required, secure password |
| Confirm password | Must match password |
| Mobile number | Required, valid phone number |
| Terms acceptance | Required |

## 3. Registration Process

1. Student opens the registration page.
2. Student enters the required details.
3. Frontend validates the form.
4. Server validates the submitted data.
5. Supabase Auth creates the user account.
6. Supabase sends an email verification link.
7. Student verifies the email address.
8. Student completes mobile OTP verification.
9. The profile is marked as verified.
10. Student is redirected to the dashboard.

## 4. Validation Rules

- Full name cannot be empty.
- Email must have a valid format.
- Password must satisfy the configured password policy.
- Confirm password must match.
- Mobile number must have a valid format.
- Terms acceptance is mandatory.
- Duplicate accounts must be handled safely.

## 5. Error Handling

Display clear messages for:
- Invalid email address
- Weak password
- Password mismatch
- Existing account
- Network failure
- Email verification failure
- OTP verification failure

Do not expose sensitive internal errors to users.

## 6. Security

- Use Supabase Auth for account credentials.
- Never store plaintext passwords.
- Never store OTPs in plaintext.
- Apply rate limits to registration and verification.
- Validate all submitted data on the server.
- Do not trust verification status from the browser.
- Protect user profile records with RLS.

## 7. Success Criteria

Registration is successful when:
- The account is created.
- The verification email is sent.
- Email verification succeeds.
- Mobile verification succeeds.
- The student can access protected learning features.